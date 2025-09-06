'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/components/providers/auth-provider'
import { useCurrentStudent, useStudentSubjects } from '@/hooks/use-students'
import { useExamResultsByStudent } from '@/hooks/use-exams'

export default function StudentDashboardPage() {
  const { user } = useAuth()
  const { data: student } = useCurrentStudent()
  const { data: results } = useExamResultsByStudent()
  const { data: subjects } = useStudentSubjects(student?.s_id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.first_name}</h1>
        <p className="text-gray-600">Here's a quick overview of your studies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Enrolled Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{subjects?.length || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{results?.slice(0, 3).length || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Level & Section</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{student?.level_name || '-'} / {student?.section_name || '-'}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


