'use client'

import { useCurrentStudent, useStudentSubjects } from '@/hooks/use-students'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function StudentSubjectsPage() {
  const { data: student } = useCurrentStudent()
  const { data: subjects } = useStudentSubjects(student?.s_id)

  const total = subjects?.length || 0
  const withTeacher = (subjects || []).filter(s => s.teacher_name && s.teacher_name.trim() !== '').length
  const withoutTeacher = total - withTeacher

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Subjects</h1>
        <p className="text-gray-600">Subjects assigned to you via Section or Level.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>With Teacher</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{withTeacher}</div>
            <p className="text-sm text-gray-600">Assigned subjects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Without Teacher</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{withoutTeacher}</div>
            <p className="text-sm text-gray-600">Awaiting assignment</p>
          </CardContent>
        </Card>
      </div>

      {(!subjects || subjects.length === 0) ? (
        <div className="text-sm text-gray-600">No subjects found for your section.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((s) => (
            <Card key={s.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{s.subject_name}</span>
                  <Badge variant="secondary">{s.subject_code}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">Teacher</span>
                  <span className="font-medium">{s.teacher_name || 'Not assigned'}</span>
                </div>
                <div className="mt-2 text-xs text-gray-500">Source: {s.source === 'section' ? 'Section' : 'Level'}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}


