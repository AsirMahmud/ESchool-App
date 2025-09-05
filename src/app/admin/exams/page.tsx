'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useExams } from '@/hooks/use-exams'
import { useSubjects } from '@/hooks/use-subjects'
import { useLevels } from '@/hooks/use-levels'
import { useSections } from '@/hooks/use-sections'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Search, Calendar, BookOpen, Users, Clock, Award } from 'lucide-react'
import { format } from 'date-fns'

export default function ExamsPage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [examType, setExamType] = useState('')
  const [status, setStatus] = useState('')
  const [level, setLevel] = useState('')
  const [subject, setSubject] = useState('')

  const { data: exams = [], isLoading } = useExams({
    search,
    exam_type: examType && examType !== 'all' ? examType : undefined,
    status: status && status !== 'all' ? status : undefined,
    level: level && level !== 'all' ? parseInt(level) : undefined,
    subject: subject && subject !== 'all' ? parseInt(subject) : undefined,
  })

  const { data: subjects = [] } = useSubjects()
  const { data: levels = [] } = useLevels()
  const { data: sections = [] } = useSections()

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'final': return 'bg-red-100 text-red-800'
      case 'midterm': return 'bg-orange-100 text-orange-800'
      case 'quiz': return 'bg-blue-100 text-blue-800'
      case 'assignment': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Award className="h-6 w-6" />
            Exams
          </h1>
          <p className="text-muted-foreground">Manage examinations and assessments</p>
        </div>
        <Button onClick={() => router.push('/admin/exams/add')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Exam
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Exams</CardTitle>
          <CardDescription>Search and filter examinations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by exam name, subject..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={examType} onValueChange={setExamType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="midterm">Midterm</SelectItem>
                <SelectItem value="final">Final</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
                <SelectItem value="assignment">Assignment</SelectItem>
                <SelectItem value="project">Project</SelectItem>
                <SelectItem value="practical">Practical</SelectItem>
                <SelectItem value="oral">Oral</SelectItem>
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="postponed">Postponed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {levels.map((l) => (
                  <SelectItem key={l.level_no} value={l.level_no.toString()}>
                    {l.level_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((s, index) => (
                  <SelectItem key={index} value={s.s_code}>
                    {s.s_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exam Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Participants</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8}>Loading...</TableCell>
                  </TableRow>
                ) : exams.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8}>No exams found.</TableCell>
                  </TableRow>
                ) : (
                  exams.map((exam) => (
                    <TableRow 
                      key={exam.exam_id} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => router.push(`/admin/exams/${exam.exam_id}`)}
                    >
                      <TableCell className="font-medium">{exam.exam_name}</TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(exam.exam_type)}>
                          {exam.exam_type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span>{exam.subject_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{exam.level_name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div>{format(new Date(exam.exam_date), 'MMM dd, yyyy')}</div>
                            <div className="text-sm text-muted-foreground">
                              {exam.start_time} - {exam.end_time}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{exam.duration}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(exam.status)}>
                          {exam.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{exam.participant_count}</span>
                        </div>
                      </TableCell>
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