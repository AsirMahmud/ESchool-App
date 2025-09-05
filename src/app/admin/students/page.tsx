'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStudents, useDeleteStudent, Student } from '@/hooks/use-students'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { StudentDetails } from '@/components/student-details'
import { StudentActivities } from '@/components/student-activities'
import { StudentDiaryComponent } from '@/components/student-diary'
import { ScholarshipManagement } from '@/components/scholarship-management'
import { StudentAttendance } from '@/components/student-attendance'
import { StudentPayments } from '@/components/student-payments'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  Users, 
  GraduationCap,
  Activity,
  BookOpen,
  Award,
  Loader2,
  AlertCircle,
  Calendar
} from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

export default function StudentsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false)
  const [isDiaryOpen, setIsDiaryOpen] = useState(false)
  const [isScholarshipsOpen, setIsScholarshipsOpen] = useState(false)
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false)
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null)

  const { data: students, isLoading, error } = useStudents()
  const deleteStudent = useDeleteStudent()

  const filteredStudents = students?.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.student_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter
    
    return matchesSearch && matchesStatus
  }) || []

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'graduated': return 'bg-blue-100 text-blue-800'
      case 'transferred': return 'bg-yellow-100 text-yellow-800'
      case 'suspended': return 'bg-orange-100 text-orange-800'
      case 'expelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleEdit = (student: Student) => {
    router.push(`/admin/students/edit/${student.s_id}`)
  }

  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student)
    setIsDetailsOpen(true)
  }

  const handleViewActivities = (student: Student) => {
    setSelectedStudent(student)
    setIsActivitiesOpen(true)
  }

  const handleViewDiary = (student: Student) => {
    setSelectedStudent(student)
    setIsDiaryOpen(true)
  }

  const handleViewScholarships = (student: Student) => {
    setSelectedStudent(student)
    setIsScholarshipsOpen(true)
  }

  const handleViewAttendance = (student: Student) => {
    setSelectedStudent(student)
    setIsAttendanceOpen(true)
  }

  const handleViewPayments = (student: Student) => {
    setSelectedStudent(student)
    setIsPaymentsOpen(true)
  }

  const handleDelete = (student: Student) => {
    setStudentToDelete(student)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (studentToDelete) {
      try {
        await deleteStudent.mutateAsync(studentToDelete.s_id)
        setDeleteDialogOpen(false)
        setStudentToDelete(null)
      } catch (error) {
        console.error('Error deleting student:', error)
      }
    }
  }


  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Failed to load students</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-muted-foreground">
            Manage student records, activities, and academic progress
          </p>
        </div>
        <Button onClick={() => router.push('/admin/students/add')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {students?.filter(s => s.status === 'active').length || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Graduated</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {students?.filter(s => s.status === 'graduated').length || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New This Month</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {students?.filter(s => {
                const enrollDate = new Date(s.enroll_date)
                const now = new Date()
                return enrollDate.getMonth() === now.getMonth() && 
                       enrollDate.getFullYear() === now.getFullYear()
              }).length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="graduated">Graduated</option>
                <option value="transferred">Transferred</option>
                <option value="suspended">Suspended</option>
                <option value="expelled">Expelled</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Students ({filteredStudents.length})</CardTitle>
          <CardDescription>
            A list of all students in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Student Number</TableHead>
                  <TableHead>Level & Section</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Enrolled</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.s_id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={student.photo} />
                          <AvatarFallback>
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-sm">{student.student_number}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{student.level_name}</div>
                        {student.section_name && (
                          <div className="text-muted-foreground">{student.section_name}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(student.status)}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {format(new Date(student.enroll_date), 'MMM dd, yyyy')}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewDetails(student)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(student)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleViewActivities(student)}>
                            <Activity className="mr-2 h-4 w-4" />
                            Activities
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewDiary(student)}>
                            <BookOpen className="mr-2 h-4 w-4" />
                            Diary
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewAttendance(student)}>
                            <Calendar className="mr-2 h-4 w-4" />
                            Attendance
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewPayments(student)}>
                            <Calendar className="mr-2 h-4 w-4" />
                            Payments
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewScholarships(student)}>
                            <Award className="mr-2 h-4 w-4" />
                            Scholarships
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(student)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>


      {/* Student Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
            <DialogDescription>
              Complete information about {selectedStudent?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <StudentDetails
              studentId={selectedStudent.s_id}
              onEdit={() => {
                setIsDetailsOpen(false)
                router.push(`/admin/students/edit/${selectedStudent.s_id}`)
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Student Activities Dialog */}
      <Dialog open={isActivitiesOpen} onOpenChange={setIsActivitiesOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Student Activities</DialogTitle>
            <DialogDescription>
              Manage activities for {selectedStudent?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <StudentActivities
              studentId={selectedStudent.s_id}
              studentName={selectedStudent.name}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Student Diary Dialog */}
      <Dialog open={isDiaryOpen} onOpenChange={setIsDiaryOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Student Diary</DialogTitle>
            <DialogDescription>
              Manage assignments and tasks for {selectedStudent?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <StudentDiaryComponent
              studentId={selectedStudent.s_id}
              studentName={selectedStudent.name}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Student Attendance Dialog */}
      <Dialog open={isAttendanceOpen} onOpenChange={setIsAttendanceOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Attendance Records</DialogTitle>
            <DialogDescription>
              View and manage attendance for {selectedStudent?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <StudentAttendance
              studentId={selectedStudent.s_id}
              studentName={selectedStudent.name}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Student Scholarships Dialog */}
      <Dialog open={isScholarshipsOpen} onOpenChange={setIsScholarshipsOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Scholarship Management</DialogTitle>
            <DialogDescription>
              Manage scholarships for {selectedStudent?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <ScholarshipManagement
              studentId={selectedStudent.s_id}
              studentName={selectedStudent.name}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Student Payments Dialog */}
      <Dialog open={isPaymentsOpen} onOpenChange={setIsPaymentsOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Payments</DialogTitle>
            <DialogDescription>
              Monthly payment status for {selectedStudent?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <StudentPayments
              studentId={selectedStudent.s_id}
              studentName={selectedStudent.name}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Student</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {studentToDelete?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              disabled={deleteStudent.isPending}
            >
              {deleteStudent.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
