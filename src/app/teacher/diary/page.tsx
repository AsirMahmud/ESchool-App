'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileText, Users } from 'lucide-react'
import { useCurrentTeacher } from '@/hooks/use-teachers'
import { useStudentDiaryEntries, useCreateDiaryEntry, useUpdateDiaryEntry } from '@/hooks/use-student-diary'
import { useStudentsBySection } from '@/hooks/use-students'

export default function TeacherDiaryPage() {
  const sp = useSearchParams()
  const subjectFromUrl = sp.get('subject') || ''
  const sectionFromUrl = sp.get('section') || ''

  const [selectedSubject, setSelectedSubject] = useState(subjectFromUrl)
  const [selectedSection, setSelectedSection] = useState(sectionFromUrl)
  const [selectedStudent, setSelectedStudent] = useState('')
  const [viewEntry, setViewEntry] = useState<any | null>(null)

  const { data: teacher } = useCurrentTeacher()
  const { data: sectionStudents = [] } = useStudentsBySection(selectedSection || undefined)
  const { data: entries = [] } = useStudentDiaryEntries({
    subject: selectedSubject || undefined,
    student: undefined,
  })

  const filteredEntries = useMemo(() => {
    if (!selectedSection) return entries
    const ids = new Set(sectionStudents.map(s => String(s.s_id)))
    return entries.filter(e => ids.has(String(e.student)))
  }, [entries, sectionStudents, selectedSection])

  const createDiary = useCreateDiaryEntry()
  const updateDiary = useUpdateDiaryEntry()
  const [feedbackEntry, setFeedbackEntry] = useState<any | null>(null)
  const [feedbackText, setFeedbackText] = useState('')
  const [feedbackGrade, setFeedbackGrade] = useState('')

  const handleCreateForStudent = async (payload: { student: string; subject: string; task: string; due_date: string; feedback?: string }) => {
    // Support "All Students" option for the selected section
    if (payload.student === '__all__') {
      const targets = sectionStudents || []
      if (!targets.length) return
      await Promise.all(
        targets.map((s: any) =>
          createDiary.mutateAsync({ ...payload, student: String(s.s_id) })
        )
      )
      return
    }
    await createDiary.mutateAsync(payload)
  }

  // Bulk feedback removed per request

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Section Diary</h1>
          <p className="text-gray-600">Create per-student entries and add feedback</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary">{filteredEntries.length} Entries</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Context</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Subject</Label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {teacher?.current_subjects?.map((s) => (
                  <SelectItem key={s.id} value={s.subject_code}>{s.subject_name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Section</Label>
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger>
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                {Array.from(new Map((teacher?.current_subjects || [])
                  .filter((s: any) => !selectedSubject || s.subject_code === selectedSubject)
                  .map((s: any) => [s.section_id, s.section_name]))).map(([id, name]) => (
                    id ? (
                      <SelectItem key={String(id)} value={String(id)}>{name as any}</SelectItem>
                    ) : null
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Student</Label>
            <Select value={selectedStudent} onValueChange={setSelectedStudent}>
              <SelectTrigger>
                <SelectValue placeholder="Select student" />
              </SelectTrigger>
              <SelectContent>
                {selectedSection && (
                  <SelectItem value="__all__">All Students (section)</SelectItem>
                )}
                {sectionStudents.map((st: any) => (
                  <SelectItem key={st.s_id} value={String(st.s_id)}>{st.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="create">
        <TabsList className="grid grid-cols-1 w-full md:w-auto">
          <TabsTrigger value="create">Create Entry (Per Student)</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <CreatePerStudentForm
            disabled={!selectedSubject || (!selectedStudent && selectedStudent !== '__all__')}
            studentId={selectedStudent}
            subjectCode={selectedSubject}
            onCreate={handleCreateForStudent}
          />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Users className="h-4 w-4" /> Recent Entries</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Feedback</TableHead>
                <TableHead>Due</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.slice(0, 20).map((e) => (
                <TableRow key={e.id}>
                  <TableCell>{e.student_name}</TableCell>
                  <TableCell>{e.subject_name}</TableCell>
                  <TableCell className="truncate max-w-[240px]">{e.task}</TableCell>
                  <TableCell className="truncate max-w-[240px]">{e.feedback || '-'}</TableCell>
                  <TableCell>{format(new Date(e.due_date), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setViewEntry(e)}>View</Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFeedbackEntry(e)
                          setFeedbackText(e.feedback || '')
                          setFeedbackGrade(e.grade || '')
                        }}
                      >
                        Feedback
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!viewEntry} onOpenChange={(open) => !open && setViewEntry(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Diary Entry</DialogTitle>
            <DialogDescription>
              {viewEntry?.student_name} • {viewEntry?.subject_name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Task</Label>
              <div className="mt-1 whitespace-pre-wrap text-sm text-gray-900 border rounded-md p-3 bg-gray-50">
                {viewEntry?.task || '-'}
              </div>
            </div>
            {viewEntry?.feedback && (
              <div>
                <Label>Feedback</Label>
                <div className="mt-1 whitespace-pre-wrap text-sm text-gray-900 border rounded-md p-3 bg-gray-50">
                  {viewEntry.feedback}
                </div>
              </div>
            )}
            {viewEntry?.grade && (
              <div className="text-sm"><strong>Grade:</strong> {viewEntry.grade}</div>
            )}
            <div className="text-sm text-gray-600">
              Due: {viewEntry?.due_date && format(new Date(viewEntry.due_date), 'MMM dd, yyyy')}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewEntry(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Update Feedback Dialog */}
      <Dialog open={!!feedbackEntry} onOpenChange={(open) => !open && setFeedbackEntry(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Feedback for Task</DialogTitle>
            <DialogDescription>
              {feedbackEntry?.student_name} • {feedbackEntry?.subject_name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Feedback</Label>
              <Textarea rows={4} value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} placeholder="Write feedback..." />
            </div>
            <div>
              <Label>Grade (optional)</Label>
              <Input value={feedbackGrade} onChange={(e) => setFeedbackGrade(e.target.value)} placeholder="A, B, C..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFeedbackEntry(null)}>Cancel</Button>
            <Button
              onClick={async () => {
                if (!feedbackEntry) return
                await updateDiary.mutateAsync({ id: feedbackEntry.id, feedback: feedbackText, grade: feedbackGrade || undefined } as any)
                setFeedbackEntry(null)
                setFeedbackText('')
                setFeedbackGrade('')
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function CreatePerStudentForm({ disabled, studentId, subjectCode, onCreate }: { disabled: boolean; studentId: string; subjectCode: string; onCreate: (p: { student: string; subject: string; task: string; due_date: string }) => Promise<void> }) {
  const [task, setTask] = useState('')
  const [due, setDue] = useState('')
  const canCreate = !disabled && !!task && !!due
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onCreate({ student: studentId, subject: subjectCode, task, due_date: due })
    setTask('')
    setDue('')
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Entry for Selected Student</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="space-y-2 md:col-span-2">
            <Label>Task</Label>
            <Textarea rows={3} placeholder="Write assignment or note..." value={task} onChange={(e) => setTask(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Due Date</Label>
            <Input type="date" min={format(new Date(), 'yyyy-MM-dd')} value={due} onChange={(e) => setDue(e.target.value)} />
          </div>
          <div className="md:col-span-3 flex justify-end gap-2">
            <Button type="submit" disabled={!canCreate}>Create Entry</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

