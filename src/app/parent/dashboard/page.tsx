'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/components/providers/auth-provider'
import { useCurrentParent, useParentChildren } from '@/hooks/use-parents'
import { useStudentSubjects } from '@/hooks/use-students'
import { useExamResultsByStudent } from '@/hooks/use-exams'
import { useSearchParams } from 'next/navigation'

export default function ParentDashboardPage() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const selectedChildId = searchParams.get('child')

  const { data: parent } = useCurrentParent()
  const { data: children } = useParentChildren(parent?.p_id)

  const selectedChild = children?.find(child => child.s_id === selectedChildId) || children?.[0]

  // Use existing student hooks with the selected child's ID
  const { data: subjects } = useStudentSubjects(selectedChild?.s_id)
  const { data: results } = useExamResultsByStudent(selectedChild?.s_id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.first_name}
        </h1>
        <p className="text-gray-600">
          {selectedChild
            ? `Monitoring ${selectedChild.name}'s academic progress`
            : 'Select a child to view their information'
          }
        </p>
      </div>

      {selectedChild && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{subjects?.length || 0}</p>
              <p className="text-sm text-gray-600">Active subjects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{results?.slice(0, 3).length || 0}</p>
              <p className="text-sm text-gray-600">Latest assessments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Class Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">
                {selectedChild.level_name || '-'} / {selectedChild.section_name || '-'}
              </p>
              <p className="text-sm text-gray-600">Current level and section</p>
            </CardContent>
          </Card>
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
