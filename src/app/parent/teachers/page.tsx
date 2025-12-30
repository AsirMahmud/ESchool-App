'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useCurrentParent, useParentChildren } from '@/hooks/use-parents'
import { useStudentTeachers } from '@/hooks/use-students'
import { Users, Mail, Phone, BookOpen } from 'lucide-react'

function ParentTeachersContent() {
  const searchParams = useSearchParams()
  const selectedChildId = searchParams.get('child')

  const { data: parent } = useCurrentParent()
  const { data: children } = useParentChildren(parent?.p_id)

  const selectedChild = children?.find(child => child.s_id === selectedChildId) || children?.[0]
  const { data: teachers, isLoading } = useStudentTeachers(selectedChild?.s_id)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teachers</h1>
          <p className="text-gray-600">Loading teachers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Teachers</h1>
        <p className="text-gray-600">
          {selectedChild
            ? `${selectedChild.name}'s teachers`
            : 'Select a child to view their teachers'
          }
        </p>
      </div>

      {selectedChild && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers && teachers.length > 0 ? (
            teachers.map((teacher) => (
              <Card key={teacher.teacher_id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow bg-white">
                <CardHeader className="bg-gray-50/50 border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-14 w-14 ring-2 ring-white shadow-sm">
                      <AvatarFallback className="bg-blue-600 text-white font-bold text-lg">
                        {teacher.teacher_name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <CardTitle className="text-xl font-bold text-gray-900 truncate">
                        {teacher.teacher_name}
                      </CardTitle>
                      <p className="text-sm font-medium text-blue-600">
                        {teacher.subjects?.[0]?.subject_name || 'Teacher'}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 text-sm">
                      <div className="mt-1 bg-purple-50 p-1.5 rounded-md">
                        <BookOpen className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Subjects</p>
                        <p className="text-gray-600">
                          {teacher.subjects?.map(s => s.subject_name).join(', ') || 'General Studies'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        {teacher.section_name || 'All Sections'}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                    <Button
                      variant="default"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      asChild
                    >
                      <a href={`mailto:${teacher.teacher_email}`}>
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                      disabled={!teacher.teacher_phone}
                      asChild
                    >
                      <a href={`tel:${teacher.teacher_phone}`}>
                        <Phone className="mr-2 h-4 w-4" />
                        Call
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full">
              <Card>
                <CardContent className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No teachers found for {selectedChild.name}.</p>
                    <p className="text-sm text-gray-500 mt-2">Teacher information will appear here once assigned.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}

      {!selectedChild && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-gray-600">No children found associated with your account.</p>
              <p className="text-sm text-gray-500 mt-2">Please contact the school administration if this seems incorrect.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default function ParentTeachersPage() {
  return (
    <Suspense fallback={
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teachers</h1>
          <p className="text-gray-600">Loading teachers...</p>
        </div>
      </div>
    }>
      <ParentTeachersContent />
    </Suspense>
  )
}
