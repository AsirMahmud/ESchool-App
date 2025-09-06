'use client'

import { useCurrentStudent } from '@/hooks/use-students'
import { useStudentDiary } from '@/hooks/use-students'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export default function StudentDiaryPage() {
  const { data: student } = useCurrentStudent()
  const { data: diary } = useStudentDiary(student?.s_id || '')

  const stats = (diary || []).reduce(
    (acc, d) => {
      acc.total += 1
      acc.completed += d.is_completed ? 1 : 0
      return acc
    },
    { total: 0, completed: 0 }
  )
  const completion = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0

  const overdue = (diary || []).filter(d => !d.is_completed && new Date(d.due_date) < new Date())
  const upcoming = (diary || []).filter(d => !d.is_completed && new Date(d.due_date) >= new Date())

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Diary</h1>
        <p className="text-gray-600">Homework and assignments from your teachers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-semibold">{completion}%</div>
              <Badge variant={completion >= 60 ? 'default' : 'secondary'}>{stats.completed}/{stats.total} Done</Badge>
            </div>
            <Progress value={completion} className="h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-red-600">{overdue.length}</div>
            <p className="text-sm text-gray-600">Tasks past due date</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{upcoming.length}</div>
            <p className="text-sm text-gray-600">Tasks due soon</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {(diary || []).map((d) => (
          <Card key={d.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="truncate">{d.subject_name}</span>
                <div className="flex items-center gap-2">
                  <Badge variant={d.is_completed ? 'default' : 'secondary'}>{d.is_completed ? 'Done' : 'Pending'}</Badge>
                  <span className="text-sm text-gray-500">Due: {d.due_date}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-700">{d.task}</div>
              {d.feedback && (
                <div className="text-sm text-gray-600 mt-2">Feedback: {d.feedback}</div>
              )}
              {d.grade && (
                <div className="text-sm text-gray-700 mt-2">Grade: {d.grade}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


