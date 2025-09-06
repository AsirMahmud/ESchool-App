'use client'

import { useCurrentStudent, useStudentTeachers } from '@/hooks/use-students'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function StudentTeachersPage() {
  const { data: student } = useCurrentStudent()
  const { data: teachers, isLoading } = useStudentTeachers(student?.s_id)

  // Debug: Log the data to console
  console.log('Student teachers data:', { student: student?.s_id, teachers, isLoading })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Teachers</h1>
          <p className="text-gray-600">Loading your teachers...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Teachers</h1>
        <p className="text-gray-600">Teachers assigned to your section and subjects.</p>
      </div>

      {!teachers || teachers.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500 mb-2">No teachers found</div>
          <div className="text-sm text-gray-400">Teachers will appear here once they are assigned to your section.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teachers.map((teacher, idx) => (
            <Card key={teacher.teacher_id || `teacher_${idx}`} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{teacher.teacher_name || 'Unknown Teacher'}</span>
                  <Badge variant="secondary" className="text-xs">
                    {teacher.subjects.length} subject{teacher.subjects.length !== 1 ? 's' : ''}
                  </Badge>
                </CardTitle>
                {teacher.teacher_email && (
                  <p className="text-sm text-gray-600">{teacher.teacher_email}</p>
                )}
                {teacher.teacher_phone && (
                  <p className="text-sm text-gray-600">{teacher.teacher_phone}</p>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Subjects:</div>
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjects.map((subject, subIdx) => (
                      <Badge key={subIdx} variant="outline" className="text-xs">
                        {subject.subject_name || subject.subject_code || subject.subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}


