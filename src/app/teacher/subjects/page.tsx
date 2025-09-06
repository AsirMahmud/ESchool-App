
'use client'
import React from 'react'

import { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Users,
  Calendar,
  Clock,
  FileText,
  Eye,
  ChevronRight,
  GraduationCap,
  Target,
  ClipboardCheck,
  BarChart3,
  UserCheck,
  Phone,
  Mail,
  MapPin,
  Plus,
  Edit,
  Save,
  X,
  Search,
  Filter
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useCurrentTeacher } from '@/hooks/use-teachers'
import { useSubjects } from '@/hooks/use-subjects'
import { useStudentsWithParentsBySection, useStudentsBySection } from '@/hooks/use-students'
import { useClassAttendance, useBulkAttendance } from '@/hooks/use-attendance'
import { useExams, useCreateExam, useExamResults, useCreateExamResult, useUpdateExamResult } from '@/hooks/use-exams'
import { StudentDetails } from '@/components/student-details'
import { StudentAttendance } from '@/components/student-attendance'

// Subject Detail View Component
function SubjectDetailView({ 
  subject, 
  students, 
  studentsLoading, 
  onClose, 
  onMarkAttendance, 
  onEnterGrades,
  activeTab,
  onTabChange,
  selectedDate,
  onDateChange,
  attendanceData
}: {
  subject: any
  students: any[]
  studentsLoading: boolean
  onClose: () => void
  onMarkAttendance: () => void
  onEnterGrades: () => void
  activeTab: string
  onTabChange: (tab: string) => void
  selectedDate: string
  onDateChange: (date: string) => void
  attendanceData?: any
}) {
  const [searchStudents, setSearchStudents] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null)
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false)
  const [studentDialogTab, setStudentDialogTab] = useState<'profile' | 'attendance'>('profile')
  const [attendanceMap, setAttendanceMap] = useState<Record<string, 'present' | 'absent' | 'late' | 'excused'>>({})
  const bulkAttendance = useBulkAttendance()
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null)
  const [marksMap, setMarksMap] = useState<Record<string, string>>({})

  // Exams for this subject; include ones with no section or matching section
  const { data: examsBySubject } = useExams({ subject: subject.subject_code })
  const subjectSectionExams = (examsBySubject || []).filter((ex: any) => !ex.section || ex.section === subject.section_id)
  const selectedExam = subjectSectionExams.find(ex => ex.exam_id === selectedExamId)
  const { data: examResults } = useExamResults(selectedExamId || 0)
  const createExamResult = useCreateExamResult()
  const updateExamResult = useUpdateExamResult()

  // If an exam has its own section, load students for that section
  const { data: examSectionStudents, isLoading: examStudentsLoading } = useStudentsWithParentsBySection(
    selectedExam?.section || undefined
  )
  const displayStudents = selectedExam?.section ? (examSectionStudents || []) : students
  const displayStudentsLoading = selectedExam?.section ? !!examStudentsLoading : studentsLoading
  
  const filteredStudents = displayStudents.filter(student => 
    student.name.toLowerCase().includes(searchStudents.toLowerCase()) ||
    student.student_number.toLowerCase().includes(searchStudents.toLowerCase())
  )

  // Prefill attendance from fetched data for the selected date/subject
  React.useEffect(() => {
    if (attendanceData?.attendance_records && Array.isArray(attendanceData.attendance_records)) {
      const initial: Record<string, 'present' | 'absent' | 'late' | 'excused'> = {}
      attendanceData.attendance_records.forEach((rec: any) => {
        if (rec.student && rec.status) {
          initial[String(rec.student)] = rec.status
        }
      })
      setAttendanceMap(initial)
    } else {
      // reset when no data
      setAttendanceMap({})
    }
  }, [attendanceData])

  // Prefill marks from existing results when exam changes
  React.useEffect(() => {
    if (!selectedExamId || !examResults) {
      setMarksMap({})
      return
    }
    const initial: Record<string, string> = {}
    examResults.forEach((res: any) => {
      if (res.student) initial[String(res.student)] = String(res.marks_obtained ?? '')
    })
    setMarksMap(initial)
  }, [selectedExamId, examResults])

  const handleSaveAttendance = async () => {
    const records = filteredStudents.map((s) => ({
      student: String(s.s_id),
      status: attendanceMap[String(s.s_id)] || 'present',
    }))
    try {
      await bulkAttendance.mutateAsync({
        date: selectedDate,
        subject: subject.subject_code,
        attendance_records: records,
      })
    } catch (e) {
      console.error('Failed to save attendance', e)
    }
  }

  const handleSaveExamResults = async () => {
    if (!selectedExamId || !selectedExam) return
    const existingByStudent: Record<string, any> = {}
    ;(examResults || []).forEach((res: any) => {
      existingByStudent[String(res.student)] = res
    })

    const ops = filteredStudents.map(async (s) => {
      const key = String(s.s_id)
      const marksStr = marksMap[key]
      if (marksStr === undefined || marksStr === '') return null
      const marks = Number(marksStr)
      const existing = existingByStudent[key]
      if (existing) {
        return updateExamResult.mutateAsync({ id: existing.id, marks_obtained: marks } as any)
      }
      return createExamResult.mutateAsync({ exam: selectedExamId, student: key, marks_obtained: marks } as any)
    })
    try {
      await Promise.all(ops)
    } catch (e) {
      console.error('Failed to save exam results', e)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
              {subject.subject_name}
            </CardTitle>
            <CardDescription className="mt-1">
              {subject.subject_code} • {subject.section_name}
            </CardDescription>
          </div>
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Subject Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Subject Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Code:</span>
                    <span className="font-medium">{subject.subject_code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Section:</span>
                    <span className="font-medium">{subject.section_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Started:</span>
                    <span className="font-medium">{new Date(subject.start_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">Active</Badge>
                  </div>
                </CardContent>
              </Card>
              
              {/* Class Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Class Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Students:</span>
                    <span className="font-medium">{students.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Students:</span>
                    <span className="font-medium">{students.filter(s => s.status === 'active').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Age:</span>
                    <span className="font-medium">
                      {students.length > 0 
                        ? Math.round(students.reduce((sum, s) => sum + (s.age || 0), 0) / students.length)
                        : 0} years
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button onClick={() => onTabChange('attendance')} className="justify-start">
                    <ClipboardCheck className="h-4 w-4 mr-2" />
                    Take Attendance
                  </Button>
                  <Button onClick={() => onTabChange('grades')} variant="outline" className="justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Enter Grades
                  </Button>
                  <Button onClick={() => onTabChange('students')} variant="outline" className="justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    View Students
                  </Button>
                  <Link href={`/teacher/diary?subject=${encodeURIComponent(subject.subject_code)}&section=${encodeURIComponent(subject.section_id || '')}`}>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Diary
                    </Button>
                  </Link>
                  <Button variant="outline" className="justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="students" className="space-y-6 mt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search students by name or number..."
                    value={searchStudents}
                    onChange={(e) => setSearchStudents(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </div>
            
            {displayStudentsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading students...</p>
              </div>
            ) : (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Student Number</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Parents</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.s_id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={student.photo} />
                              <AvatarFallback>
                                {student.name.split(' ').map((n: string) => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.gender}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono">{student.student_number}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {student.email && (
                              <div className="flex items-center gap-1 text-sm">
                                <Mail className="h-3 w-3" />
                                {student.email}
                              </div>
                            )}
                            {student.phone && (
                              <div className="flex items-center gap-1 text-sm">
                                <Phone className="h-3 w-3" />
                                {student.phone}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {student.parents?.slice(0, 2).map((parent: any, idx: number) => (
                              <div key={idx} className="text-sm">
                                <span className="font-medium">{parent.parent_name}</span>
                                <span className="text-gray-500 ml-1">({parent.relationship})</span>
                              </div>
                            ))}
                            {student.parents?.length > 2 && (
                              <div className="text-xs text-gray-500">+{student.parents.length - 2} more</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedStudent(student)
                              setStudentDialogTab('profile')
                              setIsStudentDialogOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}

            {/* Student Dialog */}
            <Dialog open={isStudentDialogOpen} onOpenChange={setIsStudentDialogOpen}>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Student Details</DialogTitle>
                  <DialogDescription>
                    View profile and attendance information
                  </DialogDescription>
                </DialogHeader>
                {selectedStudent && (
                  <div className="space-y-6">
                    <Tabs value={studentDialogTab} onValueChange={(v) => setStudentDialogTab(v as any)}>
                      <TabsList>
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="attendance">Attendance</TabsTrigger>
                      </TabsList>
                      <TabsContent value="profile" className="mt-4">
                        <StudentDetails studentId={String(selectedStudent.s_id)} />
                      </TabsContent>
                      <TabsContent value="attendance" className="mt-4">
                        <StudentAttendance studentId={String(selectedStudent.s_id)} studentName={selectedStudent.name} />
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>
          
          <TabsContent value="attendance" className="space-y-6 mt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="attendance-date">Date</Label>
                <Input
                  id="attendance-date"
                  type="date"
                  value={selectedDate}
                  className="mt-1"
                  onChange={(e) => onDateChange(e.target.value)}
                />
              </div>
              <div className="flex items-end gap-2">
                <Button onClick={handleSaveAttendance} disabled={bulkAttendance.isPending}>
                  <ClipboardCheck className="h-4 w-4 mr-2" />
                  {bulkAttendance.isPending ? 'Saving...' : 'Save Attendance'}
                </Button>
                <Button variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Reports
                </Button>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Mark Attendance</CardTitle>
                <CardDescription>For {subject.section_name} on {new Date(selectedDate).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                {displayStudentsLoading ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p>Loading students...</p>
                  </div>
                ) : filteredStudents.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No students found for this section.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Number</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.s_id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={student.photo} />
                                <AvatarFallback>
                                  {student.name.split(' ').map((n: string) => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-sm text-gray-500">{student.gender}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono">{student.student_number}</TableCell>
                          <TableCell>
                            <Select
                              value={attendanceMap[String(student.s_id)] || 'present'}
                              onValueChange={(val) =>
                                setAttendanceMap((prev) => ({ ...prev, [String(student.s_id)]: val as any }))
                              }
                            >
                              <SelectTrigger className="w-[150px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="present">Present</SelectItem>
                                <SelectItem value="absent">Absent</SelectItem>
                                <SelectItem value="late">Late</SelectItem>
                                <SelectItem value="excused">Excused</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="grades" className="space-y-6 mt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="exam">Select Exam</Label>
                <Select value={selectedExamId ? String(selectedExamId) : ''} onValueChange={(v) => setSelectedExamId(Number(v))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder={subjectSectionExams.length ? 'Choose an exam' : 'No exams found for this section'} />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectSectionExams.map((ex) => (
                      <SelectItem key={ex.exam_id} value={String(ex.exam_id)}>
                        {ex.exam_name} • {ex.exam_type} • {new Date(ex.exam_date).toLocaleDateString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end gap-2">
                <Button onClick={handleSaveExamResults} disabled={!selectedExamId}>
                  <Edit className="h-4 w-4 mr-2" />
                  Save Results
                </Button>
                <Button variant="outline" disabled={!selectedExamId}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Reports
                </Button>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Grade Entry</CardTitle>
                <CardDescription>
                  {selectedExam ? (
                    <>Entering results for {selectedExam.exam_name} • {subject.section_name}</>
                  ) : (
                    <>Select an exam to enter results for {subject.section_name}</>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!selectedExamId ? (
                  <div className="text-center py-8 text-gray-500">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>Select an exam above to enter results.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Number</TableHead>
                        <TableHead>Marks ({selectedExam?.total_marks})</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.s_id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={student.photo} />
                                <AvatarFallback>
                                  {student.name.split(' ').map((n: string) => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-sm text-gray-500">{student.gender}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono">{student.student_number}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min={0}
                              max={selectedExam?.total_marks || 100}
                              value={marksMap[String(student.s_id)] ?? ''}
                              onChange={(e) => setMarksMap((prev) => ({ ...prev, [String(student.s_id)]: e.target.value }))}
                              className="w-28"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default function TeacherSubjectsPage() {
  const { data: teacher, isLoading: teacherLoading } = useCurrentTeacher()
  const { data: allSubjects, isLoading: allSubjectsLoading } = useSubjects()
  
  // State management
  const [selectedSubject, setSelectedSubject] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [gradeDialog, setGradeDialog] = useState(false)
  const [attendanceDialog, setAttendanceDialog] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  
  // Get students for selected subject's section
  const { data: sectionStudents, isLoading: studentsLoading } = useStudentsWithParentsBySection(
    selectedSubject?.section_id
  )
  
  // Get attendance data for selected subject
  const { data: attendanceData } = useClassAttendance({
    date: selectedDate,
    section: selectedSubject?.section_id,
    subject: selectedSubject?.subject_code
  })

  if (teacherLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading subjects...</p>
        </div>
      </div>
    )
  }

  // Use teacher.current_subjects instead of separate API call
  const teacherSubjects = teacher?.current_subjects || []
  const activeSubjects = teacherSubjects.filter(subject => subject.is_active) || []
  const inactiveSubjects = teacherSubjects.filter(subject => !subject.is_active) || []
  
  // Filter subjects based on search
  const filteredActiveSubjects = activeSubjects.filter(subject => 
    subject.subject_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.subject_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (subject.section_name && subject.section_name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleSubjectSelect = (subject: any) => {
    setSelectedSubject(subject)
    setActiveTab('overview')
  }

  const handleMarkAttendance = () => {
    setAttendanceDialog(true)
  }

  const handleEnterGrades = () => {
    setGradeDialog(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Subjects</h1>
          <p className="text-gray-600">
            Manage your subjects, students, grades, and attendance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="px-3 py-1">
            {activeSubjects.length} Active Subjects
          </Badge>
          {selectedSubject && (
            <Button variant="outline" onClick={() => setSelectedSubject(null)}>
              <X className="h-4 w-4 mr-2" />
              Close Details
            </Button>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search subjects by name, code, or section..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedSubject ? (
        /* Subject Detail View */
        <SubjectDetailView 
          subject={selectedSubject}
          students={sectionStudents || []}
          studentsLoading={studentsLoading}
          onClose={() => setSelectedSubject(null)}
          onMarkAttendance={handleMarkAttendance}
          onEnterGrades={handleEnterGrades}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          attendanceData={attendanceData}
        />
      ) : (
        /* Subjects Grid */
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Active Subjects ({filteredActiveSubjects.length})</TabsTrigger>
            <TabsTrigger value="inactive">Previous Subjects ({inactiveSubjects.length})</TabsTrigger>
          </TabsList>

        <TabsContent value="active" className="space-y-6">
          {filteredActiveSubjects.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'No Subjects Found' : 'No Active Subjects'}
                </h3>
                <p className="text-gray-500 text-center max-w-md">
                  {searchTerm 
                    ? `No subjects match "${searchTerm}". Try adjusting your search.`
                    : "You don't have any active subjects assigned yet. Contact your administrator to get subjects assigned."
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredActiveSubjects.map((subject) => {
                // Find the full subject details
                const subjectDetails = allSubjects?.find(s => s.s_code === subject.subject_code)
                
                return (
                  <Card key={subject.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                            {subject.subject_name}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            Code: {subject.subject_code}
                            {subject.section_name && (
                              <span className="block text-blue-600">Section: {subject.section_name}</span>
                            )}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Active
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Subject Details */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium">{subjectDetails?.subject_type || 'Not specified'}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Difficulty:</span>
                          <span className="font-medium">{subjectDetails?.difficulty_level || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Started:</span>
                          <span className="font-medium">
                            {new Date(subject.start_date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Subject Description */}
                      {subjectDetails?.description && (
                        <div className="pt-2 border-t">
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {subjectDetails.description}
                          </p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="justify-start"
                          onClick={() => {
                            handleSubjectSelect(subject)
                            setTimeout(() => setActiveTab('students'), 100)
                          }}
                        >
                          <Users className="h-4 w-4 mr-2" />
                          Students
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="justify-start"
                          onClick={() => {
                            handleSubjectSelect(subject)
                            setTimeout(() => setActiveTab('grades'), 100)
                          }}
                        >
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Grades
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="justify-start"
                          onClick={() => {
                            handleSubjectSelect(subject)
                            setTimeout(() => setActiveTab('attendance'), 100)
                          }}
                        >
                          <ClipboardCheck className="h-4 w-4 mr-2" />
                          Attendance
                        </Button>
                        <Link href={`/teacher/diary?subject=${encodeURIComponent(subject.subject_code)}&section=${encodeURIComponent(subject.section_id || '')}`}>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Diary
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="justify-start"
                          onClick={() => handleSubjectSelect(subject)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="inactive" className="space-y-6">
          {inactiveSubjects.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Previous Subjects</h3>
                <p className="text-gray-500 text-center max-w-md">
                  You haven't taught any subjects previously or they haven't been archived yet.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {inactiveSubjects.map((subject) => {
                const subjectDetails = allSubjects?.find(s => s.s_code === subject.subject_code)
                
                return (
                  <Card key={subject.id} className="opacity-75">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-gray-500" />
                            {subject.subject_name}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            Code: {subject.subject_code}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">
                          Inactive
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Period:</span>
                          <span className="font-medium">
                            {new Date(subject.start_date).toLocaleDateString()} - {' '}
                            {subject.end_date ? new Date(subject.end_date).toLocaleDateString() : 'Ongoing'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium">{subjectDetails?.subject_type || 'Not specified'}</span>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full" size="sm" disabled>
                        <Eye className="h-4 w-4 mr-2" />
                        View Archive
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
      )}

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeSubjects.length}</p>
                <p className="text-sm text-gray-600">Active Subjects</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{teacher?.max_classes || 0}</p>
                <p className="text-sm text-gray-600">Max Classes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{teacher?.years_of_experience || 0}</p>
                <p className="text-sm text-gray-600">Years Experience</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <FileText className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{inactiveSubjects.length}</p>
                <p className="text-sm text-gray-600">Previous Subjects</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

