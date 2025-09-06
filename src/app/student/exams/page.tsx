'use client'

import { useExams } from '@/hooks/use-exams'
import { useCurrentStudent } from '@/hooks/use-students'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function StudentExamsPage() {
  const { data: student } = useCurrentStudent()
  const { data: exams } = useExams({ level: student?.level, section: student?.section, status: 'scheduled' })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Exam Schedule</h1>
        <p className="text-gray-600">Upcoming exams for your class.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exams?.map((exam) => (
          <Card key={exam.exam_id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{exam.subject_name}</span>
                <span className="text-sm text-gray-500">{exam.exam_type.toUpperCase()}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-700">Date: {exam.exam_date}</div>
              <div className="text-sm text-gray-700">Time: {exam.start_time} - {exam.end_time}</div>
              {exam.class_room_name && (
                <div className="text-sm text-gray-700">Room: {exam.class_room_name}</div>
              )}
              {exam.instructions && (
                <div className="text-sm text-gray-600 mt-2">{exam.instructions}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


