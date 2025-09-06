'use client'

import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCurrentParent, useParentChildren } from '@/hooks/use-parents'
import { useExamsByStudent } from '@/hooks/use-exams'
import { ClipboardCheck, Calendar, Clock, MapPin } from 'lucide-react'
import { format } from 'date-fns'

export default function ParentExamsPage() {
  const searchParams = useSearchParams()
  const selectedChildId = searchParams.get('child')

  const { data: parent } = useCurrentParent()
  const { data: children } = useParentChildren(parent?.p_id)

  const selectedChild = children?.find(child => child.s_id === selectedChildId) || children?.[0]
  const { data: exams, isLoading } = useExamsByStudent(selectedChild?.s_id)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exam Schedule</h1>
          <p className="text-gray-600">Loading exam schedule...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Exam Schedule</h1>
        <p className="text-gray-600">
          {selectedChild
            ? `${selectedChild.name}'s upcoming examinations`
            : 'Select a child to view their exam schedule'
          }
        </p>
      </div>

      {selectedChild && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exams && exams.length > 0 ? (
            exams.map((exam) => (
              <Card key={exam.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <ClipboardCheck className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg">{exam.exam_name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Subject:</span>
                      <Badge variant="outline">{exam.subject_name}</Badge>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{exam.exam_date ? format(new Date(exam.exam_date), 'MMM dd, yyyy') : 'TBA'}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{exam.start_time} - {exam.end_time}</span>
                    </div>

                    {exam.room && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{exam.room}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Marks:</span>
                      <span className="font-semibold">{exam.total_marks}</span>
                    </div>

                    <Badge
                      variant="secondary"
                      className={
                        exam.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                        exam.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {exam.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full">
              <Card>
                <CardContent className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <ClipboardCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No upcoming exams found for {selectedChild.name}.</p>
                    <p className="text-sm text-gray-500 mt-2">Exam schedules will appear here when available.</p>
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
