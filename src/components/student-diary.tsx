'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, Loader2, Plus, Edit, Trash2, BookOpen, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { 
  useStudentDiary, 
  useCreateStudentDiary, 
  useUpdateStudentDiary, 
  useDeleteStudentDiary,
  CreateStudentDiaryData,
  UpdateStudentDiaryData,
  StudentDiary
} from "@/hooks/use-students"
import { useSubjects } from "@/hooks/use-subjects"

const diaryFormSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  task: z.string().min(1, "Task description is required"),
  due_date: z.string().min(1, "Due date is required"),
  completion_date: z.string().optional(),
  feedback: z.string().optional(),
  grade: z.string().optional(),
  is_completed: z.boolean().default(false),
})

interface StudentDiaryProps {
  studentId: string
  studentName: string
}

export function StudentDiaryComponent({ studentId, studentName }: StudentDiaryProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<StudentDiary | null>(null)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'overdue'>('all')

  const { data: diary, isLoading, error } = useStudentDiary(studentId)
  const { data: subjects, isLoading: subjectsLoading } = useSubjects()
  const createDiary = useCreateStudentDiary()
  const updateDiary = useUpdateStudentDiary()
  const deleteDiary = useDeleteStudentDiary()

  const form = useForm<z.infer<typeof diaryFormSchema>>({
    resolver: zodResolver(diaryFormSchema),
    defaultValues: {
      subject: '',
      task: '',
      due_date: '',
      completion_date: '',
      feedback: '',
      grade: '',
      is_completed: false,
    },
  })

  const onSubmit = async (values: z.infer<typeof diaryFormSchema>) => {
    try {
      if (editingEntry) {
        await updateDiary.mutateAsync({
          id: editingEntry.id,
          ...values,
        })
      } else {
        await createDiary.mutateAsync({
          studentId,
          ...values,
        })
      }
      setIsDialogOpen(false)
      setEditingEntry(null)
      form.reset()
    } catch (error) {
      console.error('Error saving diary entry:', error)
    }
  }

  const handleEdit = (entry: StudentDiary) => {
    setEditingEntry(entry)
    form.reset({
      subject: entry.subject.toString(),
      task: entry.task,
      due_date: entry.due_date,
      completion_date: entry.completion_date || '',
      feedback: entry.feedback || '',
      grade: entry.grade || '',
      is_completed: entry.is_completed,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this diary entry?')) {
      try {
        setIsDeleting(id)
        await deleteDiary.mutateAsync(id)
      } catch (error) {
        console.error('Error deleting diary entry:', error)
      } finally {
        setIsDeleting(null)
      }
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingEntry(null)
    form.reset()
  }

  const handleMarkComplete = async (entry: StudentDiary) => {
    try {
      await updateDiary.mutateAsync({
        id: entry.id,
        is_completed: true,
        completion_date: format(new Date(), 'yyyy-MM-dd'),
      })
    } catch (error) {
      console.error('Error marking entry as complete:', error)
    }
  }

  const filteredDiary = diary?.filter(entry => {
    const today = new Date()
    const dueDate = new Date(entry.due_date)
    const isOverdue = dueDate < today && !entry.is_completed

    switch (filter) {
      case 'pending':
        return !entry.is_completed
      case 'completed':
        return entry.is_completed
      case 'overdue':
        return isOverdue
      default:
        return true
    }
  }) || []

  const getStatusBadge = (entry: StudentDiary) => {
    const today = new Date()
    const dueDate = new Date(entry.due_date)
    const isOverdue = dueDate < today && !entry.is_completed

    if (entry.is_completed) {
      return (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      )
    } else if (isOverdue) {
      return (
        <Badge className="bg-red-100 text-red-800">
          <AlertCircle className="h-3 w-3 mr-1" />
          Overdue
        </Badge>
      )
    } else {
      return (
        <Badge variant="secondary">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      )
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
      <div className="text-center py-8">
        <p className="text-muted-foreground">Failed to load diary entries</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Diary & Assignments</h3>
          <p className="text-sm text-muted-foreground">
            Manage {studentName}'s assignments and tasks
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Entry
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'pending' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('pending')}
        >
          Pending
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
        <Button
          variant={filter === 'overdue' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('overdue')}
        >
          Overdue
        </Button>
      </div>

      {filteredDiary.length > 0 ? (
        <div className="space-y-4">
          {filteredDiary.map((entry) => (
            <Card key={entry.id}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium">{entry.subject_name}</h4>
                      {getStatusBadge(entry)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{entry.task}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>
                        Due: {format(new Date(entry.due_date), 'MMM dd, yyyy')}
                      </span>
                      {entry.completion_date && (
                        <span>
                          Completed: {format(new Date(entry.completion_date), 'MMM dd, yyyy')}
                        </span>
                      )}
                      {entry.grade && (
                        <span>Grade: {entry.grade}</span>
                      )}
                    </div>
                    {entry.feedback && (
                      <p className="text-sm text-muted-foreground mt-2">
                        <strong>Feedback:</strong> {entry.feedback}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {!entry.is_completed && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkComplete(entry)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(entry)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(entry.id)}
                      disabled={isDeleting === entry.id}
                    >
                      {isDeleting === entry.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            {filter === 'all' 
              ? 'No diary entries yet' 
              : `No ${filter} entries found`
            }
          </p>
        </div>
      )}

      {/* Add/Edit Diary Entry Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingEntry ? 'Edit Diary Entry' : 'Add New Diary Entry'}
            </DialogTitle>
            <DialogDescription>
              {editingEntry 
                ? 'Update the diary entry information below.' 
                : 'Add a new assignment or task for this student.'
              }
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject *</FormLabel>
                    <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subjects?.map((subject) => (
                          <SelectItem key={subject.s_code} value={subject.s_code}>
                            {subject.s_name}
                          </SelectItem>
                        )) || []}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="task"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Description *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the assignment or task..." 
                        className="resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="due_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Due Date *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                            disabled={(date) => date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="completion_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Completion Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick a date (optional)</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                            disabled={(date) => date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., A+, 95, Pass" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="is_completed"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Mark as completed
                        </FormLabel>
                        <FormDescription>
                          Check this if the task is already completed
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feedback</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add any feedback or comments..." 
                        className="resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={createDiary.isPending || updateDiary.isPending}
                >
                  {(createDiary.isPending || updateDiary.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingEntry ? 'Update Entry' : 'Add Entry'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
