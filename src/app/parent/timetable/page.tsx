'use client'

import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCurrentParent, useParentChildren } from '@/hooks/use-parents'
import { useTimetableByStudent } from '@/hooks/use-timetable'
import { Calendar, Clock, MapPin, User } from 'lucide-react'

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

export default function ParentTimetablePage() {
  const searchParams = useSearchParams()
  const selectedChildId = searchParams.get('child')

  const { data: parent } = useCurrentParent()
  const { data: children } = useParentChildren(parent?.p_id)

  const selectedChild = children?.find(child => child.s_id === selectedChildId) || children?.[0]
  const { data: timetable, isLoading } = useTimetableByStudent(selectedChild?.s_id)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Timetable</h1>
          <p className="text-gray-600">Loading timetable...</p>
        </div>
      </div>
    )
  }

  // Group timetable entries by day
  const groupedTimetable = timetable?.reduce((acc, entry) => {
    const day = entry.day_of_week
    if (!acc[day]) acc[day] = []
    acc[day].push(entry)
    return acc
  }, {} as Record<string, typeof timetable>) || {}

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Timetable</h1>
        <p className="text-gray-600">
          {selectedChild
            ? `${selectedChild.name}'s class schedule`
            : 'Select a child to view their timetable'
          }
        </p>
      </div>

      {selectedChild && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DAYS_OF_WEEK.map((day) => {
            const dayEntries = groupedTimetable[day] || []

            return (
              <Card key={day} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg">{day}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {dayEntries.length > 0 ? (
                    <div className="space-y-3">
                      {dayEntries
                        .sort((a, b) => a.start_time.localeCompare(b.start_time))
                        .map((entry) => (
                          <div key={entry.id} className="border rounded-lg p-3 bg-gray-50">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-sm">{entry.subject_name}</h4>
                              <Badge variant="outline" className="text-xs">
                                {entry.subject_code}
                              </Badge>
                            </div>

                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex items-center space-x-2">
                                <Clock className="h-3 w-3" />
                                <span>{entry.start_time} - {entry.end_time}</span>
                              </div>

                              <div className="flex items-center space-x-2">
                                <User className="h-3 w-3" />
                                <span>{entry.teacher_name || 'TBA'}</span>
                              </div>

                              {entry.room && (
                                <div className="flex items-center space-x-2">
                                  <MapPin className="h-3 w-3" />
                                  <span>{entry.room}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500">No classes scheduled</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
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

