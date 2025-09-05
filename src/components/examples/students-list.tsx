'use client'

import { useStudents, useDeleteStudent } from '@/hooks/use-students'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, Trash2, User } from 'lucide-react'

export default function StudentsList() {
  const { data: students, isLoading, error, refetch } = useStudents()
  const deleteStudent = useDeleteStudent()

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this student?')) {
      deleteStudent.mutate(id)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading students...</span>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 text-red-600">
            <span>Error loading students: {error.message}</span>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!students || students.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          No students found
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Students</h2>
        <Button onClick={() => refetch()}>Refresh</Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {students.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  {student.first_name} {student.last_name}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(student.id)}
                  disabled={deleteStudent.isPending}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-600">
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Phone:</strong> {student.phone}</p>
                <p><strong>Gender:</strong> {student.gender}</p>
                <p><strong>Admission Date:</strong> {new Date(student.admission_date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Class {student.class_id}</Badge>
                <Badge variant="outline">Parent {student.parent_id}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {deleteStudent.isPending && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
          <Card className="p-6">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Deleting student...</span>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}





