'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/components/providers/auth-provider'
import { useCurrentParent, useParentChildren } from '@/hooks/use-parents'
import { useStudentSubjects } from '@/hooks/use-students'
import { useExamResultsByStudent, useExamsByStudent } from '@/hooks/use-exams'
import { useStudentAttendanceSummary } from '@/hooks/use-attendance'
import { useTimetableByStudent } from '@/hooks/use-timetable'
import { useSearchParams } from 'next/navigation'
import {
  BookOpen,
  Calendar,
  Clock,
  GraduationCap,
  TrendingUp,
  AlertCircle,
  Users,
  User
} from 'lucide-react'

function ParentDashboardContent() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const selectedChildId = searchParams.get('child')

  const { data: parent } = useCurrentParent()
  const { data: children } = useParentChildren(parent?.p_id)

  const selectedChild = children?.find(child => child.s_id === selectedChildId) || children?.[0]

  // Data fetching for the selected child
  const { data: subjects } = useStudentSubjects(selectedChild?.s_id)
  const { data: results } = useExamResultsByStudent(selectedChild?.s_id)
  const { data: attendance } = useStudentAttendanceSummary(selectedChild?.s_id || '')
  const { data: upcomingExams } = useExamsByStudent(selectedChild?.s_id || '')
  const { data: timetable } = useTimetableByStudent(selectedChild?.s_id || '')

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const todayClasses = timetable?.filter(t => t.day_of_week === today) || []

  const futureExams = upcomingExams?.filter(e => new Date(e.exam_date) >= new Date())
    .sort((a, b) => new Date(a.exam_date).getTime() - new Date(b.exam_date).getTime())
    .slice(0, 3) || []

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome back, {user?.first_name}
          </h1>
          <p className="text-lg text-gray-600 mt-1">
            {selectedChild
              ? `Monitoring ${selectedChild.name}'s academic progress`
              : 'Select a child to view their information'
            }
          </p>
        </div>
        {selectedChild && (
          <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
            <p className="text-sm font-medium text-blue-800">
              {selectedChild.level_name} • {selectedChild.section_name}
            </p>
          </div>
        )}
      </div>

      {selectedChild ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-blue-50/50 pb-2">
                <CardTitle className="text-sm font-semibold text-blue-700 flex items-center">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Enrolled Subjects
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-4xl font-bold text-gray-900">{subjects?.length || 0}</p>
                <p className="text-xs text-gray-500 mt-1 font-medium italic">Active courses this semester</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-green-50/50 pb-2">
                <CardTitle className="text-sm font-semibold text-green-700 flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Attendance Rate
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-end justify-between mb-2">
                  <p className="text-4xl font-bold text-gray-900">
                    {attendance?.attendance_percentage?.toFixed(1) || 0}%
                  </p>
                </div>
                <Progress value={attendance?.attendance_percentage || 0} className="h-2 bg-green-100" />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500 font-medium">Overall presence record</p>
                  <Link
                    href={`/parent/attendance?child=${selectedChild?.s_id}`}
                    className="text-xs text-green-700 hover:underline font-semibold"
                  >
                    View Details
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-purple-50/50 pb-2">
                <CardTitle className="text-sm font-semibold text-purple-700 flex items-center">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Recent Results
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-4xl font-bold text-gray-900">{results?.length || 0}</p>
                <p className="text-xs text-gray-500 mt-1 font-medium">Graded assessments</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-amber-50/50 pb-2">
                <CardTitle className="text-sm font-semibold text-amber-700 flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  Next Exam
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-lg font-bold text-gray-900 line-clamp-1">
                  {futureExams[0]?.exam_name || 'No upcoming'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {futureExams[0] ? new Date(futureExams[0].exam_date).toLocaleDateString() : 'Take a break!'}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b bg-gray-50/50">
                <CardTitle className="text-lg font-bold flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                  Upcoming Exams
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {futureExams.length > 0 ? (
                  <ul className="divide-y divide-gray-100">
                    {futureExams.map((exam) => (
                      <li key={exam.exam_id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div>
                          <p className="font-semibold text-gray-900">{exam.exam_name}</p>
                          <p className="text-sm text-gray-500">{exam.subject_name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(exam.exam_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </p>
                          <p className="text-xs text-gray-500">{exam.start_time.slice(0, 5)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <AlertCircle className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                    <p>No upcoming exams scheduled.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b bg-gray-50/50">
                <CardTitle className="text-lg font-bold flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-emerald-600" />
                  Today's Timetable
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {todayClasses.length > 0 ? (
                  <ul className="divide-y divide-gray-100">
                    {todayClasses.map((item) => (
                      <li key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div>
                          <p className="font-semibold text-gray-900">{item.subject_name}</p>
                          <p className="text-xs text-gray-500 flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {item.teacher_name || 'TBA'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            {item.start_time.slice(0, 5)} - {item.end_time.slice(0, 5)}
                          </p>
                          <p className="text-xs text-gray-500">{item.room || 'Room TBA'}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <Calendar className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                    <p>No classes scheduled for today.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center py-20">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <Users className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No Child Selected</h3>
            <p className="text-gray-500 mt-2 max-w-sm text-center">
              Please use the sidebar to select a child and view their detailed academic information.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function LoadingState() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      <div className="h-12 w-64 bg-gray-200 rounded mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-gray-100 rounded-xl"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <div className="h-64 bg-gray-100 rounded-xl"></div>
        <div className="h-64 bg-gray-100 rounded-xl"></div>
      </div>
    </div>
  )
}

export default function ParentDashboardPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ParentDashboardContent />
    </Suspense>
  )
}

