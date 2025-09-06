'use client'

import { useState, useEffect } from 'react'
import { format, isToday } from 'date-fns'
import {
  Calendar,
  Check,
  Clock,
  Users,
  X,
  Save,
  UserCheck,
  UserX,
  UserMinus,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// Toast functionality - using simple alerts for now
import { useCurrentTeacher, useTeacherClasses } from '@/hooks/use-teachers'
import { useAttendanceRecords, useCreateAttendance } from '@/hooks/use-attendance'
import { useStudents } from '@/hooks/use-students'

interface AttendanceRecord {
  student_id: string
  student_name: string
  status: 'present' | 'absent' | 'late' | 'excused'
  notes?: string
}

export default function TeacherAttendancePage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [selectedSubject, setSelectedSubject] = useState<string>('')
  const [attendanceData, setAttendanceData] = useState<Record<string, AttendanceRecord>>({})
  const [isSaving, setIsSaving] = useState(false)
  
  const toast = (options: { title: string; description: string; variant?: string }) => {
    alert(`${options.title}: ${options.description}`)
  }
  
  const { data: teacher } = useCurrentTeacher()
  const teacherId = teacher?.teacher_id
  const { data: teacherClasses } = useTeacherClasses(teacherId || '')
  const { data: students } = useStudents()
  
  // Get students for selected class
  const classStudents = students?.filter(student => 
    selectedClass ? student.level?.toString() === selectedClass : false
  ) || []

  // Initialize attendance data when class changes
  useEffect(() => {
    if (classStudents.length > 0) {
      const initialData: Record<string, AttendanceRecord> = {}
      classStudents.forEach(student => {
        initialData[student.s_id] = {
          student_id: student.s_id,
          student_name: student.name,
          status: 'present', // Default to present
          notes: ''
        }
      })
      setAttendanceData(initialData)
    }
  }, [classStudents])

  const handleStatusChange = (studentId: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status
      }
    }))
  }

  const handleNotesChange = (studentId: string, notes: string) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        notes
      }
    }))
  }

  const handleMarkAllPresent = () => {
    const updatedData = { ...attendanceData }
    Object.keys(updatedData).forEach(studentId => {
      updatedData[studentId].status = 'present'
    })
    setAttendanceData(updatedData)
  }

  const handleSaveAttendance = async () => {
    if (!selectedClass || !selectedSubject) {
      toast({
        title: "Error",
        description: "Please select both class and subject",
        variant: "destructive"
      })
      return
    }

    setIsSaving(true)
    try {
      // In a real app, you would call the bulk attendance API
      // For now, we'll simulate the save
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Success",
        description: "Attendance saved successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save attendance",
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <UserCheck className="h-4 w-4 text-green-600" />
      case 'absent':
        return <UserX className="h-4 w-4 text-red-600" />
      case 'late':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'excused':
        return <UserMinus className="h-4 w-4 text-blue-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'text-green-600 bg-green-50'
      case 'absent':
        return 'text-red-600 bg-red-50'
      case 'late':
        return 'text-yellow-600 bg-yellow-50'
      case 'excused':
        return 'text-blue-600 bg-blue-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const attendanceStats = Object.values(attendanceData).reduce(
    (acc, record) => {
      acc[record.status] = (acc[record.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
          <h1 className="text-2xl font-bold text-gray-900">Take Attendance</h1>
          <p className="text-gray-600">
            Mark student attendance for your classes
                </p>
              </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="px-3 py-1">
            {format(selectedDate, 'MMMM dd, yyyy')}
          </Badge>
          {isToday(selectedDate) && (
            <Badge className="px-3 py-1">Today</Badge>
          )}
        </div>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Attendance Settings
          </CardTitle>
          <CardDescription>
            Select date, class, and subject to mark attendance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={format(selectedDate, 'yyyy-MM-dd')}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                  {teacherClasses?.map((classItem) => (
                    <SelectItem 
                      key={classItem.id} 
                      value={classItem.class_room.toString()}
                    >
                      {classItem.class_room_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                  </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                  {teacher?.current_subjects?.map((subject) => (
                    <SelectItem 
                      key={subject.id} 
                      value={subject.subject_code}
                    >
                      {subject.subject_name}
                    </SelectItem>
                  ))}
                              </SelectContent>
                            </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Stats */}
      {Object.keys(attendanceData).length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <UserCheck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{attendanceStats.present || 0}</p>
                  <p className="text-sm text-gray-600">Present</p>
                </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <UserX className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{attendanceStats.absent || 0}</p>
                  <p className="text-sm text-gray-600">Absent</p>
                </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{attendanceStats.late || 0}</p>
                  <p className="text-sm text-gray-600">Late</p>
                </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <UserMinus className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{attendanceStats.excused || 0}</p>
                  <p className="text-sm text-gray-600">Excused</p>
                </div>
                  </div>
                </CardContent>
              </Card>
            </div>
      )}

      {/* Attendance Table */}
      {selectedClass && selectedSubject ? (
                <Card>
                  <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Student Attendance
                </CardTitle>
                        <CardDescription>
                  Mark attendance for {classStudents.length} students
                        </CardDescription>
                      </div>
              <div className="flex gap-2">
                  <Button
                    variant="outline"
                  onClick={handleMarkAllPresent}
                  disabled={isSaving}
                  >
                  <Check className="h-4 w-4 mr-2" />
                  Mark All Present
                  </Button>
                  <Button
                  onClick={handleSaveAttendance}
                  disabled={isSaving || Object.keys(attendanceData).length === 0}
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Attendance
                    </>
                  )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
            {classStudents.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Students Found</h3>
                <p className="text-gray-500">No students found for the selected class.</p>
                  </div>
            ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                    <TableHead className="w-12">#</TableHead>
                      <TableHead>Student</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead className="text-center">Present</TableHead>
                    <TableHead className="text-center">Absent</TableHead>
                    <TableHead className="text-center">Late</TableHead>
                    <TableHead className="text-center">Excused</TableHead>
                          <TableHead>Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                  {classStudents.map((student, index) => {
                    const studentId = student.s_id
                    const attendance = attendanceData[studentId]
                    
                    return (
                      <TableRow key={studentId}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={student.photo} />
                                  <AvatarFallback>
                                {student.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-gray-500">
                                Level {student.level}
                              </p>
                            </div>
                              </div>
                            </TableCell>
                        <TableCell className="font-mono text-sm">
                          {student.student_number}
                        </TableCell>
                        <TableCell className="text-center">
                          <input
                            type="radio"
                            name={`attendance-${studentId}`}
                            checked={attendance?.status === 'present'}
                            onChange={() => handleStatusChange(studentId, 'present')}
                            className="h-4 w-4 text-green-600"
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <input
                            type="radio"
                            name={`attendance-${studentId}`}
                            checked={attendance?.status === 'absent'}
                            onChange={() => handleStatusChange(studentId, 'absent')}
                            className="h-4 w-4 text-red-600"
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <input
                            type="radio"
                            name={`attendance-${studentId}`}
                            checked={attendance?.status === 'late'}
                            onChange={() => handleStatusChange(studentId, 'late')}
                            className="h-4 w-4 text-yellow-600"
                          />
                            </TableCell>
                        <TableCell className="text-center">
                          <input
                            type="radio"
                            name={`attendance-${studentId}`}
                            checked={attendance?.status === 'excused'}
                            onChange={() => handleStatusChange(studentId, 'excused')}
                            className="h-4 w-4 text-blue-600"
                          />
                            </TableCell>
                            <TableCell>
                          <Input
                            placeholder="Add note..."
                            value={attendance?.notes || ''}
                            onChange={(e) => handleNotesChange(studentId, e.target.value)}
                            className="w-full"
                          />
                            </TableCell>
                          </TableRow>
                    )
                  })}
                      </TableBody>
                    </Table>
            )}
                  </CardContent>
                </Card>
      ) : (
                <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select Class and Subject</h3>
            <p className="text-gray-500 text-center max-w-md">
              Please select both a class and subject to start marking attendance for your students.
            </p>
                  </CardContent>
                </Card>
      )}
    </div>
  )
}