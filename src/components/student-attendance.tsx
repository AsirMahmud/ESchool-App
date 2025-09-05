'use client'

import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO } from 'date-fns'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  CalendarIcon,
  Plus,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Clock,
  FileText,
  TrendingUp,
  BarChart3,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  useStudentAttendance,
  useStudentAttendanceSummary,
  useCreateAttendance,
  useUpdateAttendance,
  useDeleteAttendance,
  AttendanceRecord,
  CreateAttendanceData,
  UpdateAttendanceData
} from "@/hooks/use-attendance"

interface StudentAttendanceProps {
  studentId: string
  studentName?: string
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'present':
      return 'bg-green-100 text-green-800 hover:bg-green-200'
    case 'absent':
      return 'bg-red-100 text-red-800 hover:bg-red-200'
    case 'late':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
    case 'excused':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'present':
      return <UserCheck className="h-4 w-4" />
    case 'absent':
      return <UserX className="h-4 w-4" />
    case 'late':
      return <Clock className="h-4 w-4" />
    case 'excused':
      return <FileText className="h-4 w-4" />
    default:
      return null
  }
}

export function StudentAttendance({ studentId, studentName }: StudentAttendanceProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [viewMode, setViewMode] = useState<'calendar' | 'table'>('table')
  const [editingRecord, setEditingRecord] = useState<AttendanceRecord | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // Calculate date range for current month
  const monthStart = startOfMonth(selectedDate)
  const monthEnd = endOfMonth(selectedDate)

  // Fetch attendance data
  const { data: attendanceRecords, isLoading: recordsLoading } = useStudentAttendance(
    studentId,
    {
      start_date: format(monthStart, 'yyyy-MM-dd'),
      end_date: format(monthEnd, 'yyyy-MM-dd')
    }
  )

  const { data: attendanceSummary, isLoading: summaryLoading } = useStudentAttendanceSummary(
    studentId,
    {
      start_date: format(monthStart, 'yyyy-MM-dd'),
      end_date: format(monthEnd, 'yyyy-MM-dd')
    }
  )

  // Mutations
  const createAttendanceMutation = useCreateAttendance()
  const updateAttendanceMutation = useUpdateAttendance()
  const deleteAttendanceMutation = useDeleteAttendance()

  const handleAddAttendance = async (data: CreateAttendanceData) => {
    try {
      // Format the data properly for backend - no subject needed for student attendance
      const formattedData = {
        ...data,
        student: studentId,
        // Convert time format from HH:MM to HH:MM:SS
        check_in_time: data.check_in_time ? `${data.check_in_time}:00` : undefined,
        check_out_time: data.check_out_time ? `${data.check_out_time}:00` : undefined,
        // Remove subject completely for student attendance
        subject: undefined
      }
      
      await createAttendanceMutation.mutateAsync(formattedData)
      setIsAddDialogOpen(false)
    } catch (error) {
      console.error('Failed to add attendance record:', error)
    }
  }

  const handleUpdateAttendance = async (data: UpdateAttendanceData) => {
    try {
      // Format the data properly for backend - no subject needed for student attendance
      const formattedData = {
        ...data,
        // Convert time format from HH:MM to HH:MM:SS
        check_in_time: data.check_in_time ? `${data.check_in_time}:00` : undefined,
        check_out_time: data.check_out_time ? `${data.check_out_time}:00` : undefined,
        // Remove subject completely for student attendance
        subject: undefined
      }
      
      await updateAttendanceMutation.mutateAsync(formattedData)
      setIsEditDialogOpen(false)
      setEditingRecord(null)
    } catch (error) {
      console.error('Failed to update attendance record:', error)
    }
  }

  const handleDeleteAttendance = async (id: number) => {
    try {
      await deleteAttendanceMutation.mutateAsync(id)
    } catch (error) {
      console.error('Failed to delete attendance record:', error)
    }
  }

  // Get calendar days with attendance data
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const attendanceMap = new Map(
    attendanceRecords?.map(record => [record.date, record]) || []
  )

  if (recordsLoading || summaryLoading) {
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
          <h2 className="text-2xl font-bold">Attendance Records</h2>
          {studentName && (
            <p className="text-muted-foreground">for {studentName}</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Select value={viewMode} onValueChange={(value: 'calendar' | 'table') => setViewMode(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="table">Table View</SelectItem>
              <SelectItem value="calendar">Calendar View</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Record
              </Button>
            </DialogTrigger>
            <DialogContent>
              <AttendanceForm
                title="Add Attendance Record"
                onSubmit={handleAddAttendance}
                isLoading={createAttendanceMutation.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      {attendanceSummary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Days</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceSummary.total_days}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{attendanceSummary.present_days}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Absent</CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{attendanceSummary.absent_days}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {attendanceSummary.attendance_percentage.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Month Navigation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{format(selectedDate, 'MMMM yyyy')}</CardTitle>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Change Month
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'table' ? (
            <AttendanceTable
              records={attendanceRecords || []}
              onEdit={(record) => {
                setEditingRecord(record)
                setIsEditDialogOpen(true)
              }}
              onDelete={handleDeleteAttendance}
            />
          ) : (
            <AttendanceCalendar
              days={calendarDays}
              attendanceMap={attendanceMap}
            />
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          {editingRecord && (
            <AttendanceForm
              title="Edit Attendance Record"
              initialData={editingRecord}
              onSubmit={(data) => handleUpdateAttendance({ ...data, id: editingRecord.id })}
              isLoading={updateAttendanceMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface AttendanceTableProps {
  records: AttendanceRecord[]
  onEdit: (record: AttendanceRecord) => void
  onDelete: (id: number) => void
}

function AttendanceTable({ records, onEdit, onDelete }: AttendanceTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No attendance records found for this period
              </TableCell>
            </TableRow>
          ) : (
            records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{format(parseISO(record.date), 'MMM dd, yyyy')}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(record.status)}>
                    {getStatusIcon(record.status)}
                    <span className="ml-1 capitalize">{record.status}</span>
                  </Badge>
                </TableCell>
                <TableCell>{record.check_in_time || '-'}</TableCell>
                <TableCell>{record.check_out_time || '-'}</TableCell>
                <TableCell className="max-w-xs truncate">{record.notes || '-'}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(record)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Attendance Record</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this attendance record? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => onDelete(record.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

interface AttendanceCalendarProps {
  days: Date[]
  attendanceMap: Map<string, AttendanceRecord>
}

function AttendanceCalendar({ days, attendanceMap }: AttendanceCalendarProps) {
  return (
    <div className="grid grid-cols-7 gap-2">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div key={day} className="p-2 text-center font-medium text-sm text-muted-foreground">
          {day}
        </div>
      ))}
      {days.map((day) => {
        const dateStr = format(day, 'yyyy-MM-dd')
        const record = attendanceMap.get(dateStr)
        
        return (
          <div
            key={dateStr}
            className={cn(
              "p-2 text-center text-sm border rounded-md min-h-[40px] flex items-center justify-center",
              record && getStatusColor(record.status)
            )}
          >
            <div>
              <div className="font-medium">{format(day, 'd')}</div>
              {record && (
                <div className="text-xs mt-1">
                  {getStatusIcon(record.status)}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

interface AttendanceFormProps {
  title: string
  initialData?: Partial<AttendanceRecord>
  onSubmit: (data: CreateAttendanceData | UpdateAttendanceData) => void
  isLoading?: boolean
}

function AttendanceForm({ title, initialData, onSubmit, isLoading }: AttendanceFormProps) {
  // Helper function to convert HH:MM:SS to HH:MM for form display
  const formatTimeForForm = (time?: string) => {
    if (!time) return ''
    // If time is in HH:MM:SS format, convert to HH:MM
    return time.length > 5 ? time.substring(0, 5) : time
  }

  const [formData, setFormData] = useState({
    date: initialData?.date || format(new Date(), 'yyyy-MM-dd'),
    status: initialData?.status || 'present',
    check_in_time: formatTimeForForm(initialData?.check_in_time),
    check_out_time: formatTimeForForm(initialData?.check_out_time),
    notes: initialData?.notes || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData as any)
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          Fill in the attendance details below.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="excused">Excused</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="check_in_time">Check In Time</Label>
            <Input
              id="check_in_time"
              type="time"
              value={formData.check_in_time}
              onChange={(e) => setFormData({ ...formData, check_in_time: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="check_out_time">Check Out Time</Label>
            <Input
              id="check_out_time"
              type="time"
              value={formData.check_out_time}
              onChange={(e) => setFormData({ ...formData, check_out_time: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Optional notes about the attendance..."
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Save Record
          </Button>
        </div>
      </form>
    </>
  )
}

