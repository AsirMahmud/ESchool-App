'use client'

import { useCurrentStudent } from '@/hooks/use-students'
import { useClassSchedules, type ClassScheduleItem } from '@/hooks/use-classes'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function StudentTimetablePage() {
  const { data: student } = useCurrentStudent()
  const { data: schedules } = useClassSchedules({ level: student?.level, section: student?.section, is_active: true })

  const days: ClassScheduleItem['day_of_week'][] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  const byDay = (schedules || []).reduce<Record<string, ClassScheduleItem[]>>((acc, item) => {
    if (!acc[item.day_of_week]) acc[item.day_of_week] = []
    acc[item.day_of_week].push(item)
    return acc
  }, {})
  days.forEach(d => {
    if (!byDay[d]) byDay[d] = []
    byDay[d] = byDay[d].sort((a, b) => a.start_time.localeCompare(b.start_time))
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Timetable</h1>
        <p className="text-gray-600">Your enrolled subjects for this term.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {days.map((day) => (
          <Card key={day}>
            <CardHeader>
              <CardTitle className="capitalize">{day}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {byDay[day].length === 0 && (
                <div className="text-sm text-gray-500">No classes</div>
              )}
              {byDay[day].map((item) => (
                <div key={item.id} className="border rounded-md p-2">
                  <div className="font-medium text-gray-900">{item.subject_name}</div>
                  <div className="text-sm text-gray-700">{item.start_time} - {item.end_time}</div>
                  <div className="text-xs text-gray-600">{item.teacher_name}{item.class_room_name ? ` • ${item.class_room_name}` : ''}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


