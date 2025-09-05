'use client'

import { useState } from 'react'
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Plus,
  Search,
  Users,
  UserCheck,
  UserX,
  Clock,
  BarChart3,
  TrendingUp,
  Loader2
} from "lucide-react"
import {
  useAttendanceRecords,
  useAttendanceStatistics,
  useBulkAttendance,
  AttendanceRecord
} from "@/hooks/use-attendance"
import { useStudents } from "@/hooks/use-students"
import { useLevels } from "@/hooks/use-levels"
import { useSections } from "@/hooks/use-sections"

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedLevel, setSelectedLevel] = useState<string>('')
  const [selectedSection, setSelectedSection] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false)

  // Calculate week range
  const weekStart = startOfWeek(selectedDate)
  const weekEnd = endOfWeek(selectedDate)

  // Fetch data
  const { data: students } = useStudents()
  const { data: levels } = useLevels()
  const { data: sections } = useSections()
  
  const { data: attendanceData, isLoading: attendanceLoading } = useAttendanceRecords({
    start_date: format(weekStart, 'yyyy-MM-dd'),
    end_date: format(weekEnd, 'yyyy-MM-dd'),
    level: selectedLevel ? parseInt(selectedLevel) : undefined,
    section: selectedSection ? parseInt(selectedSection) : undefined,
    status: statusFilter !== 'all' ? statusFilter : undefined,
  })

  const { data: statistics, isLoading: statsLoading } = useAttendanceStatistics({
    start_date: format(weekStart, 'yyyy-MM-dd'),
    end_date: format(weekEnd, 'yyyy-MM-dd'),
    level: selectedLevel ? parseInt(selectedLevel) : undefined,
    section: selectedSection ? parseInt(selectedSection) : undefined,
  })

  const bulkAttendanceMutation = useBulkAttendance()

  // Filter students based on search and level/section
  const filteredStudents = students?.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.student_number.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = !selectedLevel || student.level?.toString() === selectedLevel
    const matchesSection = !selectedSection || student.section?.toString() === selectedSection
    
    return matchesSearch && matchesLevel && matchesSection
  }) || []

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

  const handlePreviousWeek = () => {
    setSelectedDate(subWeeks(selectedDate, 1))
  }

  const handleNextWeek = () => {
    setSelectedDate(addWeeks(selectedDate, 1))
  }

  const handleBulkMarkAttendance = async (status: 'present' | 'absent') => {
    if (!filteredStudents.length) return

    try {
      await bulkAttendanceMutation.mutateAsync({
        date: format(selectedDate, 'yyyy-MM-dd'),
        // No subject needed for student attendance
        attendance_records: filteredStudents.map(student => ({
          student: student.s_id,
          status,
          check_in_time: status === 'present' ? '08:00:00' : undefined, // Use HH:MM:SS format
          notes: `Bulk marked as ${status} on ${format(selectedDate, 'MMM dd, yyyy')}`
        }))
      })
      setIsBulkDialogOpen(false)
    } catch (error) {
      console.error('Failed to mark bulk attendance:', error)
    }
  }

  if (attendanceLoading || statsLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Attendance Management</h1>
          <p className="text-muted-foreground">
            Track and manage student attendance records
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={isBulkDialogOpen} onOpenChange={setIsBulkDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Bulk Mark
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Bulk Mark Attendance</DialogTitle>
                <DialogDescription>
                  Mark attendance for all filtered students on {format(selectedDate, 'PPP')}
                </DialogDescription>
              </DialogHeader>
              <div className="flex space-x-2 pt-4">
                <Button
                  onClick={() => handleBulkMarkAttendance('present')}
                  disabled={bulkAttendanceMutation.isPending}
                  className="flex-1"
                >
                  <UserCheck className="h-4 w-4 mr-2" />
                  Mark All Present
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleBulkMarkAttendance('absent')}
                  disabled={bulkAttendanceMutation.isPending}
                  className="flex-1"
                >
                  <UserX className="h-4 w-4 mr-2" />
                  Mark All Absent
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      {statistics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.total_students}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present Rate</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {statistics.present_percentage.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Absent Rate</CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {statistics.absent_percentage.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {statistics.average_attendance.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters and Date Navigation */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Date Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Date Navigation */}
            <div className="md:col-span-2">
              <Label>Week Selection</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Button variant="outline" size="sm" onClick={handlePreviousWeek}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm font-medium text-center flex-1">
                  {format(weekStart, 'MMM dd')} - {format(weekEnd, 'MMM dd, yyyy')}
                </div>
                <Button variant="outline" size="sm" onClick={handleNextWeek}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Search */}
            <div>
              <Label>Search Student</Label>
              <div className="relative mt-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Level Filter */}
            <div>
              <Label>Level</Label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="All levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All levels</SelectItem>
                  {levels?.filter(level => level.level_no != null).map((level) => (
                    <SelectItem key={level.level_no} value={level.level_no.toString()}>
                      {level.level_name || `Level ${level.level_no}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Section Filter */}
            <div>
              <Label>Section</Label>
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="All sections" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All sections</SelectItem>
                  {sections?.filter(section => section.id != null).map((section) => (
                    <SelectItem key={section.id} value={section.id.toString()}>
                      {section.section_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div>
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                  <SelectItem value="excused">Excused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
          <CardDescription>
            Showing attendance records for the selected week and filters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Student Number</TableHead>
                  <TableHead>Level/Section</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData?.results?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No attendance records found for the selected filters
                    </TableCell>
                  </TableRow>
                ) : (
                  attendanceData?.results?.map((record: AttendanceRecord) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.student_name}</TableCell>
                      <TableCell>{record.student_number}</TableCell>
                      <TableCell>
                        {/* You might need to add level/section info to the attendance record */}
                        -
                      </TableCell>
                      <TableCell>{format(new Date(record.date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(record.status)}>
                          {record.status === 'present' && <UserCheck className="h-3 w-3 mr-1" />}
                          {record.status === 'absent' && <UserX className="h-3 w-3 mr-1" />}
                          {record.status === 'late' && <Clock className="h-3 w-3 mr-1" />}
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.check_in_time || '-'}</TableCell>
                      <TableCell>{record.check_out_time || '-'}</TableCell>
                      <TableCell className="max-w-xs truncate">{record.notes || '-'}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

