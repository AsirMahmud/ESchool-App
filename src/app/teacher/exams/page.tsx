'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import {
  GraduationCap,
  Calendar,
  Clock,
  Users,
  FileText,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Award,
  BarChart3
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// Toast functionality - using simple alerts for now
import { useCurrentTeacher } from '@/hooks/use-teachers'
import { useExams, useCreateExam } from '@/hooks/use-exams'
import { useStudents } from '@/hooks/use-students'

export default function TeacherExamsPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>('')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedExam, setSelectedExam] = useState<any>(null)
  const [examResults, setExamResults] = useState<Record<string, { marks: string; grade: string; remarks: string }>>({})
  
  const toast = (options: { title: string; description: string; variant?: string }) => {
    alert(`${options.title}: ${options.description}`)
  }
  
  const { data: teacher } = useCurrentTeacher()
  const teacherId = teacher?.teacher_id
  const { data: exams, isLoading: examsLoading } = useExams()
  const { data: students } = useStudents()
  const createExamMutation = useCreateExam()

  // Filter exams for teacher's subjects
  const teacherExams = exams?.filter(exam => 
    teacher?.current_subjects?.some(subject => subject.subject_code === exam.subject_code)
  ) || []

  // Group exams by status
  const upcomingExams = teacherExams.filter(exam => new Date(exam.exam_date) > new Date())
  const completedExams = teacherExams.filter(exam => new Date(exam.exam_date) <= new Date())

  const handleCreateExam = async (examData: any) => {
    try {
      await createExamMutation.mutateAsync(examData)
      toast({
        title: "Success",
        description: "Exam created successfully",
      })
      setIsCreateDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create exam",
        variant: "destructive"
      })
    }
  }

  const handleMarkEntry = (studentId: string, field: string, value: string) => {
    setExamResults(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value
      }
    }))
  }

  const calculateGrade = (marks: number, totalMarks: number) => {
    const percentage = (marks / totalMarks) * 100
    if (percentage >= 90) return 'A+'
    if (percentage >= 80) return 'A'
    if (percentage >= 70) return 'B+'
    if (percentage >= 60) return 'B'
    if (percentage >= 50) return 'C+'
    if (percentage >= 40) return 'C'
    return 'F'
  }

  const getStatusBadge = (exam: any) => {
    const examDate = new Date(exam.exam_date)
    const now = new Date()
    
    if (examDate > now) {
      return <Badge variant="outline" className="bg-blue-50 text-blue-700">Upcoming</Badge>
    } else if (exam.status === 'completed') {
      return <Badge variant="outline" className="bg-green-50 text-green-700">Completed</Badge>
    } else {
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Pending</Badge>
    }
  }

  if (examsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading exams...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exams & Grades</h1>
          <p className="text-gray-600">
            Manage exams and enter student marks
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="px-3 py-1">
            {teacherExams.length} Total Exams
          </Badge>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Exam
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Exam</DialogTitle>
                <DialogDescription>
                  Create a new exam for your students
                </DialogDescription>
              </DialogHeader>
              <CreateExamForm 
                teacher={teacher} 
                onSubmit={handleCreateExam}
                isLoading={createExamMutation.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <GraduationCap className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{teacherExams.length}</p>
                <p className="text-sm text-gray-600">Total Exams</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedExams.length}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{upcomingExams.length}</p>
                <p className="text-sm text-gray-600">Upcoming</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{teacher?.current_subjects?.length || 0}</p>
                <p className="text-sm text-gray-600">Subjects</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exams Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming ({upcomingExams.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedExams.length})</TabsTrigger>
          <TabsTrigger value="grading">Grade Entry</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          {upcomingExams.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Upcoming Exams</h3>
                <p className="text-gray-500 text-center max-w-md">
                  You don't have any upcoming exams scheduled. Create a new exam to get started.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {upcomingExams.map((exam) => (
                <Card key={exam.exam_id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{exam.exam_name}</CardTitle>
                        <CardDescription className="mt-1">
                          {exam.subject_name} • {exam.exam_type}
                        </CardDescription>
                      </div>
                      {getStatusBadge(exam)}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{format(new Date(exam.exam_date), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{exam.start_time} - {exam.end_time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-gray-500" />
                        <span>{exam.total_marks} marks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{exam.level_name}</span>
                      </div>
                    </div>

                    {exam.instructions && (
                      <div className="pt-2 border-t">
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {exam.instructions}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          {completedExams.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Completed Exams</h3>
                <p className="text-gray-500 text-center max-w-md">
                  You don't have any completed exams yet. Completed exams will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {completedExams.map((exam) => (
                <Card key={exam.exam_id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{exam.exam_name}</h3>
                        <p className="text-gray-600 mt-1">
                          {exam.subject_name} • {format(new Date(exam.exam_date), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        {getStatusBadge(exam)}
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Total Marks</p>
                          <p className="font-semibold">{exam.total_marks}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Results
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="grading" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Grade Entry</CardTitle>
              <CardDescription>
                Select an exam to enter student marks and grades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="exam-select">Select Exam</Label>
                    <Select onValueChange={(value) => setSelectedExam(teacherExams.find(e => e.exam_id.toString() === value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an exam" />
                      </SelectTrigger>
                      <SelectContent>
                        {teacherExams.map((exam) => (
                          <SelectItem key={exam.exam_id} value={exam.exam_id.toString()}>
                            {exam.exam_name} - {exam.subject_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {selectedExam && (
                  <div className="mt-6">
                    <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold">{selectedExam.exam_name}</h4>
                      <p className="text-sm text-gray-600">
                        Total Marks: {selectedExam.total_marks} | Passing Marks: {selectedExam.passing_marks}
                      </p>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>ID</TableHead>
                          <TableHead>Marks Obtained</TableHead>
                          <TableHead>Grade</TableHead>
                          <TableHead>Remarks</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students?.slice(0, 10).map((student) => {
                          const studentId = student.s_id
                          const result = examResults[studentId] || { marks: '', grade: '', remarks: '' }
                          const marks = parseInt(result.marks) || 0
                          const calculatedGrade = marks > 0 ? calculateGrade(marks, selectedExam.total_marks) : ''
                          
                          return (
                            <TableRow key={studentId}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={student.photo} />
                                    <AvatarFallback>
                                      {student.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium">{student.name}</span>
                                </div>
                              </TableCell>
                              <TableCell className="font-mono text-sm">
                                {student.student_number}
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  placeholder="0"
                                  min="0"
                                  max={selectedExam.total_marks}
                                  value={result.marks}
                                  onChange={(e) => handleMarkEntry(studentId, 'marks', e.target.value)}
                                  className="w-20"
                                />
                              </TableCell>
                              <TableCell>
                                <Badge variant={marks >= selectedExam.passing_marks ? "default" : "destructive"}>
                                  {calculatedGrade || '-'}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Input
                                  placeholder="Add remarks..."
                                  value={result.remarks}
                                  onChange={(e) => handleMarkEntry(studentId, 'remarks', e.target.value)}
                                  className="w-full"
                                />
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline">Save Draft</Button>
                      <Button>Submit Grades</Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Create Exam Form Component
function CreateExamForm({ teacher, onSubmit, isLoading }: any) {
  const [formData, setFormData] = useState({
    exam_name: '',
    exam_type: 'midterm',
    subject: '',
    level: '',
    duration: '',
    total_marks: '',
    passing_marks: '',
    exam_date: '',
    start_time: '',
    end_time: '',
    instructions: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="exam_name">Exam Name</Label>
          <Input
            id="exam_name"
            value={formData.exam_name}
            onChange={(e) => setFormData(prev => ({ ...prev, exam_name: e.target.value }))}
            placeholder="Midterm Examination"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="exam_type">Exam Type</Label>
          <Select value={formData.exam_type} onValueChange={(value) => setFormData(prev => ({ ...prev, exam_type: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="midterm">Midterm</SelectItem>
              <SelectItem value="final">Final</SelectItem>
              <SelectItem value="quiz">Quiz</SelectItem>
              <SelectItem value="assignment">Assignment</SelectItem>
              <SelectItem value="practical">Practical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {teacher?.current_subjects?.map((subject: any) => (
                <SelectItem key={subject.id} value={subject.subject_code}>
                  {subject.subject_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
            placeholder="90"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="total_marks">Total Marks</Label>
          <Input
            id="total_marks"
            type="number"
            value={formData.total_marks}
            onChange={(e) => setFormData(prev => ({ ...prev, total_marks: e.target.value }))}
            placeholder="100"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="passing_marks">Passing Marks</Label>
          <Input
            id="passing_marks"
            type="number"
            value={formData.passing_marks}
            onChange={(e) => setFormData(prev => ({ ...prev, passing_marks: e.target.value }))}
            placeholder="40"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="exam_date">Exam Date</Label>
          <Input
            id="exam_date"
            type="date"
            value={formData.exam_date}
            onChange={(e) => setFormData(prev => ({ ...prev, exam_date: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="start_time">Start Time</Label>
          <Input
            id="start_time"
            type="time"
            value={formData.start_time}
            onChange={(e) => setFormData(prev => ({ ...prev, start_time: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end_time">End Time</Label>
          <Input
            id="end_time"
            type="time"
            value={formData.end_time}
            onChange={(e) => setFormData(prev => ({ ...prev, end_time: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="instructions">Instructions</Label>
        <Textarea
          id="instructions"
          value={formData.instructions}
          onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
          placeholder="Exam instructions for students..."
          rows={3}
        />
      </div>

      <DialogFooter>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Exam'}
        </Button>
      </DialogFooter>
    </form>
  )
}
