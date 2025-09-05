'use client'

import { format } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  UserCheck,
  UserX,
  Clock,
  FileText,
  TrendingUp,
  Calendar,
  ArrowRight,
  Loader2
} from "lucide-react"
import { useAttendanceRecords, useAttendanceStatistics } from "@/hooks/use-attendance"
import { useRouter } from 'next/navigation'

interface AttendanceWidgetProps {
  className?: string
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'present':
      return 'bg-green-100 text-green-800'
    case 'absent':
      return 'bg-red-100 text-red-800'
    case 'late':
      return 'bg-yellow-100 text-yellow-800'
    case 'excused':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'present':
      return <UserCheck className="h-3 w-3" />
    case 'absent':
      return <UserX className="h-3 w-3" />
    case 'late':
      return <Clock className="h-3 w-3" />
    case 'excused':
      return <FileText className="h-3 w-3" />
    default:
      return null
  }
}

export function AttendanceWidget({ className }: AttendanceWidgetProps) {
  const router = useRouter()
  const today = format(new Date(), 'yyyy-MM-dd')

  // Get today's attendance records (limited)
  const { data: todayAttendance, isLoading: attendanceLoading } = useAttendanceRecords({
    date: today,
    page_size: 10
  })

  // Get today's statistics
  const { data: todayStats, isLoading: statsLoading } = useAttendanceStatistics({
    start_date: today,
    end_date: today
  })

  if (attendanceLoading || statsLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Today's Attendance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Today's Attendance</span>
          </CardTitle>
          <CardDescription>
            {format(new Date(), 'EEEE, MMMM dd, yyyy')}
          </CardDescription>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => router.push('/admin/attendance')}
        >
          View All
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Stats */}
        {todayStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">
                {todayStats.present_percentage.toFixed(0)}%
              </div>
              <div className="text-xs text-green-700">Present</div>
            </div>
            <div className="text-center p-2 bg-red-50 rounded-lg">
              <div className="text-lg font-bold text-red-600">
                {todayStats.absent_percentage.toFixed(0)}%
              </div>
              <div className="text-xs text-red-700">Absent</div>
            </div>
            <div className="text-center p-2 bg-yellow-50 rounded-lg">
              <div className="text-lg font-bold text-yellow-600">
                {todayStats.late_percentage.toFixed(0)}%
              </div>
              <div className="text-xs text-yellow-700">Late</div>
            </div>
            <div className="text-center p-2 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">
                {todayStats.excused_percentage.toFixed(0)}%
              </div>
              <div className="text-xs text-blue-700">Excused</div>
            </div>
          </div>
        )}

        {/* Recent Records */}
        <div>
          <h4 className="text-sm font-medium mb-2">Recent Records</h4>
          {!todayAttendance?.results?.length ? (
            <div className="text-center py-4 text-muted-foreground text-sm">
              No attendance records for today yet
            </div>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {todayAttendance.results.slice(0, 8).map((record) => (
                <div key={record.id} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                  <div className="flex items-center space-x-2">
                    <div className="text-sm font-medium truncate">
                      {record.student_name}
                    </div>
                    <Badge className={`${getStatusColor(record.status)} text-xs`}>
                      {getStatusIcon(record.status)}
                      <span className="ml-1 capitalize">{record.status}</span>
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {record.check_in_time || 'No time'}
                  </div>
                </div>
              ))}
              {todayAttendance.results.length > 8 && (
                <div className="text-center py-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => router.push('/admin/attendance')}
                  >
                    View {todayAttendance.results.length - 8} more
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => router.push('/admin/attendance')}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Mark Attendance
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.push('/admin/attendance')}
          >
            <TrendingUp className="h-4 w-4 mr-1" />
            Reports
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Compact version for smaller spaces
export function AttendanceWidgetCompact({ className }: AttendanceWidgetProps) {
  const router = useRouter()
  const today = format(new Date(), 'yyyy-MM-dd')

  const { data: todayStats, isLoading } = useAttendanceStatistics({
    start_date: today,
    end_date: today
  })

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="p-4">
          <div className="flex items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Attendance
          </h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.push('/admin/attendance')}
          >
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
        {todayStats ? (
          <div className="grid grid-cols-2 gap-2 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">
                {todayStats.present_percentage.toFixed(0)}%
              </div>
              <div className="text-xs text-muted-foreground">Present</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-600">
                {todayStats.absent_percentage.toFixed(0)}%
              </div>
              <div className="text-xs text-muted-foreground">Absent</div>
            </div>
          </div>
        ) : (
          <div className="text-center text-sm text-muted-foreground">
            No data available
          </div>
        )}
      </CardContent>
    </Card>
  )
}
