'use client'

import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useCurrentParent, useParentChildren } from '@/hooks/use-parents'
import { useStudentTeachers } from '@/hooks/use-students'
import { Users, Mail, Phone, BookOpen } from 'lucide-react'

export default function ParentTeachersPage() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teachers && teachers.length > 0 ? (
            teachers.map((teacher) => (
              <Card key={teacher.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {teacher.first_name?.[0]}{teacher.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {teacher.first_name} {teacher.last_name}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{teacher.employee_id}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <BookOpen className="h-4 w-4" />
                      <span>{teacher.subject_name || 'General'}</span>
                    </div>

                    {teacher.email && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{teacher.email}</span>
                      </div>
                    )}

                    {teacher.phone && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{teacher.phone}</span>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        {teacher.level_name}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {teacher.section_name}
                      </Badge>
                    </div>
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
