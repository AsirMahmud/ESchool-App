'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Edit,
  FileText,
  GraduationCap,
  Mail,
  Phone,
  Plus,
  User,
  XCircle,
} from "lucide-react"
import { useStudentDiaryEntries, useCreateDiaryEntry, useMarkDiaryEntryCompleted } from "@/hooks/use-student-diary"
import { useStudentAttendanceHistory } from "@/hooks/use-attendance"
import { useStudentPayments, useStudentPaymentSummary, useMonthlyPaymentStatus } from "@/hooks/use-student-payments"
import { useSubjectsByLevelAndSection } from "@/hooks/use-level-subjects"

interface StudentDetailsProps {
  student: {
    s_id: string
    student_number: string
    name: string
    email: string
    phone?: string
    gender: string
    date_of_birth: string
    enroll_date: string
    address: string
    status: string
    level?: number
    level_name?: string
    section?: number
    section_name?: string
    department?: number
    department_name?: string
    emergency_contact_name: string
    emergency_contact_phone: string
    medical_conditions?: string
    achievements?: string
    photo?: string
    age?: number
  }
}

export function StudentDetails({ student }: StudentDetailsProps) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [isAddingDiaryEntry, setIsAddingDiaryEntry] = useState(false)

  // Fetch data
  const { data: diaryEntries, isLoading: diaryLoading } = useStudentDiaryEntries({
    student: parseInt(student.s_id),
    overdue: false
  })

  const { data: attendanceHistory } = useStudentAttendanceHistory(student.s_id, {
    date_range: {
      start: new Date(selectedYear, selectedMonth - 1, 1).toISOString().split('T')[0],
      end: new Date(selectedYear, selectedMonth, 0).toISOString().split('T')[0]
    }
  })

  const { data: payments } = useStudentPayments({
    student: parseInt(student.s_id)
  })

  const { data: paymentSummary } = useStudentPaymentSummary(student.s_id)
  const { data: monthlyPayments } = useMonthlyPaymentStatus(student.s_id, selectedYear, selectedMonth)
  const { data: subjects } = useSubjectsByLevelAndSection(student.level, student.section)

  const createDiaryEntryMutation = useCreateDiaryEntry()
  const markCompletedMutation = useMarkDiaryEntryCompleted()

  const handleMarkCompleted = async (entryId: number, grade?: string) => {
    try {
      await markCompletedMutation.mutateAsync({
        id: entryId,
        grade
      })
    } catch (error) {
      console.error('Failed to mark entry as completed:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'graduated': return 'bg-blue-100 text-blue-800'
      case 'transferred': return 'bg-yellow-100 text-yellow-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      case 'expelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      case 'partial': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAttendanceStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800'
      case 'absent': return 'bg-red-100 text-red-800'
      case 'late': return 'bg-yellow-100 text-yellow-800'
      case 'excused': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Student Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={student.photo} />
              <AvatarFallback className="text-lg">
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{student.name}</h2>
                  <p className="text-muted-foreground">ID: {student.student_number}</p>
                </div>
                <Badge className={getStatusColor(student.status)}>
                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{student.email}</span>
                </div>
                {student.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{student.phone}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{student.gender}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Academic Level</p>
                  <p className="text-muted-foreground">
                    {student.level_name} {student.section_name && `- ${student.section_name}`}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Department</p>
                  <p className="text-muted-foreground">{student.department_name || 'Not assigned'}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="diary">Diary</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>Academic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Level:</span>
                  <span>{student.level_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Section:</span>
                  <span>{student.section_name || 'Not assigned'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Department:</span>
                  <span>{student.department_name || 'Not assigned'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Enrollment Date:</span>
                  <span>{format(new Date(student.enroll_date), 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Age:</span>
                  <span>{student.age || 'N/A'} years</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-muted-foreground">Address:</p>
                  <p className="text-sm">{student.address}</p>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Emergency Contact:</span>
                  <span>{student.emergency_contact_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Emergency Phone:</span>
                  <span>{student.emergency_contact_phone}</span>
                </div>
                {student.medical_conditions && (
                  <div>
                    <p className="text-muted-foreground">Medical Conditions:</p>
                    <p className="text-sm">{student.medical_conditions}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {student.achievements && (
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{student.achievements}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Diary Tab */}
        <TabsContent value="diary" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Student Diary & Assignments</h3>
            <Dialog open={isAddingDiaryEntry} onOpenChange={setIsAddingDiaryEntry}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Entry
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Diary Entry</DialogTitle>
                  <DialogDescription>
                    Add a new assignment or task for this student.
                  </DialogDescription>
                </DialogHeader>
                <AddDiaryEntryForm 
                  studentId={parseInt(student.s_id)}
                  onSuccess={() => setIsAddingDiaryEntry(false)}
                />
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="pt-6">
              {diaryLoading ? (
                <div className="text-center py-4">Loading diary entries...</div>
              ) : diaryEntries && diaryEntries.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Task</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {diaryEntries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="font-medium">{entry.subject_name}</TableCell>
                        <TableCell className="max-w-xs truncate">{entry.task}</TableCell>
                        <TableCell>{format(new Date(entry.due_date), 'MMM dd, yyyy')}</TableCell>
                        <TableCell>
                          <Badge variant={entry.is_completed ? "default" : "secondary"}>
                            {entry.is_completed ? 'Completed' : 'Pending'}
                          </Badge>
                        </TableCell>
                        <TableCell>{entry.grade || '-'}</TableCell>
                        <TableCell>
                          {!entry.is_completed && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkCompleted(entry.id)}
                              disabled={markCompletedMutation.isPending}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Mark Complete
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No diary entries found for this student.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Attendance History</h3>
            <div className="flex space-x-2">
              <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {new Date(0, i).toLocaleString('default', { month: 'long' })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 5 }, (_, i) => {
                    const year = new Date().getFullYear() - 2 + i
                    return (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              {attendanceHistory && attendanceHistory.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Check-in Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceHistory.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{format(new Date(record.date), 'MMM dd, yyyy')}</TableCell>
                        <TableCell>{record.subject_name}</TableCell>
                        <TableCell>{record.teacher_name}</TableCell>
                        <TableCell>
                          <Badge className={getAttendanceStatusColor(record.status)}>
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {record.check_in_time ? format(new Date(record.check_in_time), 'HH:mm') : '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No attendance records found for the selected period.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Payment Status</h3>
            <div className="flex space-x-2">
              <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {new Date(0, i).toLocaleString('default', { month: 'long' })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 5 }, (_, i) => {
                    const year = new Date().getFullYear() - 2 + i
                    return (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Payment Summary */}
          {paymentSummary && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Paid</p>
                      <p className="text-2xl font-bold">${paymentSummary.total_paid}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Pending</p>
                      <p className="text-2xl font-bold">${paymentSummary.total_due}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Overdue</p>
                      <p className="text-2xl font-bold">${paymentSummary.total_overdue}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Payment Rate</p>
                      <p className="text-2xl font-bold">{paymentSummary.payment_rate}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <Card>
            <CardContent className="pt-6">
              {monthlyPayments && monthlyPayments.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Payment Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Method</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthlyPayments.map((payment) => (
                      <TableRow key={payment.pay_id}>
                        <TableCell className="font-medium">
                          {payment.payment_type.charAt(0).toUpperCase() + payment.payment_type.slice(1)}
                        </TableCell>
                        <TableCell>${payment.total_amount}</TableCell>
                        <TableCell>{format(new Date(payment.due_date), 'MMM dd, yyyy')}</TableCell>
                        <TableCell>
                          {payment.payment_date ? format(new Date(payment.payment_date), 'MMM dd, yyyy') : '-'}
                        </TableCell>
                        <TableCell>
                          <Badge className={getPaymentStatusColor(payment.status)}>
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{payment.payment_method || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No payment records found for the selected period.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subjects Tab */}
        <TabsContent value="subjects" className="space-y-4">
          <h3 className="text-lg font-medium">Assigned Subjects</h3>
          <Card>
            <CardContent className="pt-6">
              {subjects && subjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{subject.subject_name}</h4>
                          <p className="text-sm text-muted-foreground">{subject.subject_code}</p>
                        </div>
                        {subject.teacher_name && (
                          <Badge variant="outline">{subject.teacher_name}</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No subjects assigned for this level and section.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Simple form component for adding diary entries
function AddDiaryEntryForm({ studentId, onSuccess }: { studentId: number; onSuccess: () => void }) {
  const [task, setTask] = useState('')
  const [subject, setSubject] = useState('')
  const [dueDate, setDueDate] = useState('')
  
  const createMutation = useCreateDiaryEntry()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!task || !subject || !dueDate) return

    try {
      await createMutation.mutateAsync({
        student: studentId,
        subject,
        task,
        due_date: dueDate,
      })
      setTask('')
      setSubject('')
      setDueDate('')
      onSuccess()
    } catch (error) {
      console.error('Failed to create diary entry:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter subject"
          required
        />
      </div>
      <div>
        <Label htmlFor="task">Task</Label>
        <Textarea
          id="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task description"
          required
        />
      </div>
      <div>
        <Label htmlFor="dueDate">Due Date</Label>
        <Input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <DialogFooter>
        <Button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? 'Adding...' : 'Add Entry'}
        </Button>
      </DialogFooter>
    </form>
  )
}
