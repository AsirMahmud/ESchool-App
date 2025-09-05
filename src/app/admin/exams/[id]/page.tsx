'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useExam, useExamResults, useCreateExamResult } from '@/hooks/use-exams'
import { useStudents } from '@/hooks/use-students'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ArrowLeft, Award, Calendar, Clock, BookOpen, Users, Plus, Edit, Trash2 } from 'lucide-react'
import { format } from 'date-fns'

export default function ExamDetailPage() {
  const params = useParams() as { id: string }
  const router = useRouter()
  const id = params?.id
  const [isAddResultOpen, setIsAddResultOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState('')
  const [marks, setMarks] = useState('')
  const [grade, setGrade] = useState('')
  const [remarks, setRemarks] = useState('')

  const { data: exam, isLoading } = useExam(id)
  const { data: results = [] } = useExamResults(id)
  const { data: students = [] } = useStudents()
  const createResult = useCreateExamResult()

  const handleAddResult = async () => {
    if (!selectedStudent || !marks || !grade) return

    await createResult.mutateAsync({
      exam: parseInt(id),
      student: selectedStudent,
      marks_obtained: parseInt(marks),
      grade: grade as any,
      is_passed: parseInt(marks) >= (exam?.passing_marks || 0),
      remarks: remarks || undefined,
    })

    setIsAddResultOpen(false)
    setSelectedStudent('')
    setMarks('')
    setGrade('')
    setRemarks('')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'ongoing': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'postponed': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getGradeColor = (grade: string) => {
    if (['A+', 'A', 'A-'].includes(grade)) return 'bg-green-100 text-green-800'
    if (['B+', 'B', 'B-'].includes(grade)) return 'bg-blue-100 text-blue-800'
    if (['C+', 'C', 'C-'].includes(grade)) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  if (isLoading || !exam) {
    return <div className="container mx-auto py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Award className="h-6 w-6" />
            {exam.exam_name}
          </h1>
          <p className="text-muted-foreground">{exam.subject_name} - {exam.level_name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Exam Details</CardTitle>
            <CardDescription>Basic information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Subject:</span>
              <span>{exam.subject_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Date:</span>
              <span>{format(new Date(exam.exam_date), 'MMM dd, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Time:</span>
              <span>{exam.start_time} - {exam.end_time}</span>
            </div>
            <div>
              <span className="font-medium">Type:</span>
              <Badge className="ml-2">{exam.exam_type}</Badge>
            </div>
            <div>
              <span className="font-medium">Status:</span>
              <Badge className={`ml-2 ${getStatusColor(exam.status)}`}>
                {exam.status}
              </Badge>
            </div>
            <div>
              <span className="font-medium">Marks:</span>
              <span className="ml-2">{exam.passing_marks}/{exam.total_marks}</span>
            </div>
            <div>
              <span className="font-medium">Duration:</span>
              <span className="ml-2">{exam.duration}</span>
            </div>
            {exam.instructions && (
              <div>
                <span className="font-medium">Instructions:</span>
                <p className="text-sm text-muted-foreground mt-1">{exam.instructions}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Exam Results
                  </CardTitle>
                  <CardDescription>Student performance and grades</CardDescription>
                </div>
                <Dialog open={isAddResultOpen} onOpenChange={setIsAddResultOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Result
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Exam Result</DialogTitle>
                      <DialogDescription>
                        Add a student's result for this exam
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Student</label>
                        <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select student" />
                          </SelectTrigger>
                          <SelectContent>
                            {students.map((s) => (
                              <SelectItem key={s.s_id} value={s.s_id}>
                                {s.name} ({s.student_number})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Marks Obtained</label>
                          <Input
                            type="number"
                            value={marks}
                            onChange={(e) => setMarks(e.target.value)}
                            placeholder="Enter marks"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Grade</label>
                          <Select value={grade} onValueChange={setGrade}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select grade" />
                            </SelectTrigger>
                            <SelectContent>
                              {['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'].map((g) => (
                                <SelectItem key={g} value={g}>{g}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Remarks (Optional)</label>
                        <Input
                          value={remarks}
                          onChange={(e) => setRemarks(e.target.value)}
                          placeholder="Teacher remarks"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddResultOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddResult} disabled={!selectedStudent || !marks || !grade}>
                        Add Result
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Student Number</TableHead>
                      <TableHead>Marks</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Remarks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6}>No results yet.</TableCell>
                      </TableRow>
                    ) : (
                      results.map((result) => (
                        <TableRow key={result.id}>
                          <TableCell className="font-medium">{result.student_name}</TableCell>
                          <TableCell>{result.student_number}</TableCell>
                          <TableCell>{result.marks_obtained}/{exam.total_marks}</TableCell>
                          <TableCell>
                            <Badge className={getGradeColor(result.grade)}>
                              {result.grade}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={result.is_passed ? 'default' : 'destructive'}>
                              {result.is_passed ? 'Passed' : 'Failed'}
                            </Badge>
                          </TableCell>
                          <TableCell>{result.remarks || '-'}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
