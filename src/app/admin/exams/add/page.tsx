'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateExam, CreateExamData } from '@/hooks/use-exams'
import { useSubjects } from '@/hooks/use-subjects'
import { useLevels } from '@/hooks/use-levels'
import { useSections } from '@/hooks/use-sections'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Award, Calendar, Clock, BookOpen } from 'lucide-react'

const schema = z.object({
  exam_name: z.string().min(2, 'Exam name must be at least 2 characters'),
  exam_type: z.enum(['midterm', 'final', 'quiz', 'assignment', 'project', 'practical', 'oral', 'entrance', 'placement', 'other']),
  subject: z.string().min(1, 'Please select a subject'),
  level: z.number().min(1, 'Please select a level'),
  section: z.number().optional(),
  duration: z.string().min(1, 'Duration is required').regex(/^\d{1,2}:\d{2}:\d{2}$/, 'Duration must be in HH:MM:SS format'),
  total_marks: z.number().min(1, 'Total marks must be at least 1'),
  passing_marks: z.number().min(0, 'Passing marks cannot be negative'),
  exam_date: z.string().min(1, 'Exam date is required'),
  start_time: z.string().min(1, 'Start time is required'),
  end_time: z.string().min(1, 'End time is required'),
  class_room: z.number().optional(),
  invigilator: z.number().optional(),
  status: z.enum(['scheduled', 'ongoing', 'completed', 'cancelled', 'postponed']).default('scheduled'),
  instructions: z.string().optional(),
  academic_year: z.string().min(1, 'Academic year is required'),
  semester: z.string().optional(),
}).refine((data) => data.passing_marks <= data.total_marks, {
  message: "Passing marks cannot be greater than total marks",
  path: ["passing_marks"],
}).refine((data) => {
  if (data.start_time && data.end_time) {
    return data.end_time > data.start_time
  }
  return true
}, {
  message: "End time must be after start time",
  path: ["end_time"],
})

type FormValues = z.infer<typeof schema>

export default function AddExamPage() {
  const router = useRouter()
  const createExam = useCreateExam()
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)

  const { data: subjects = [] } = useSubjects()
  const { data: levels = [] } = useLevels()
  const { data: sections = [] } = useSections()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit', // Only validate on submit, not on change
    defaultValues: {
      exam_name: '',
      exam_type: 'quiz',
      subject: '',
      level: 0,
      section: 0,
      duration: '01:00:00',
      total_marks: 100,
      passing_marks: 50,
      exam_date: '',
      start_time: '',
      end_time: '',
      class_room: 0,
      invigilator: 0,
      status: 'scheduled',
      instructions: '',
      academic_year: new Date().getFullYear().toString(),
      semester: '',
    },
  })

  const onSubmit = async (values: FormValues) => {
    console.log('Form values:', values) // Debug log
    
    const payload: CreateExamData = {
      exam_name: values.exam_name,
      exam_type: values.exam_type,
      subject: values.subject,
      level: values.level,
      section: values.section && values.section > 0 ? values.section : undefined,
      duration: values.duration, // Already in HH:MM:SS format
      total_marks: values.total_marks,
      passing_marks: values.passing_marks,
      exam_date: values.exam_date,
      start_time: values.start_time,
      end_time: values.end_time,
      class_room: values.class_room && values.class_room > 0 ? values.class_room : undefined,
      invigilator: values.invigilator && values.invigilator > 0 ? values.invigilator : undefined,
      status: values.status,
      instructions: values.instructions || undefined,
      academic_year: values.academic_year,
      semester: values.semester || undefined,
    }

    console.log('Payload:', payload) // Debug log
    await createExam.mutateAsync(payload)
    router.push('/admin/exams')
  }

  const handleLevelChange = (levelId: number) => {
    setSelectedLevel(levelId)
    form.setValue('level', levelId)
    form.setValue('section', 0) // Reset section when level changes
  }

  // Filter sections based on selected level
  const availableSections = sections?.filter(section => 
    selectedLevel ? section.level === selectedLevel : true
  ) || []

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Award className="h-6 w-6" />
            Add Exam
          </h1>
          <p className="text-muted-foreground">Create a new examination</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exam Information</CardTitle>
          <CardDescription>Basic details and scheduling</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField name="exam_name" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Name</FormLabel>
                    <FormControl><Input placeholder="e.g., Mathematics Midterm" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="exam_type" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Type</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="midterm">Midterm Exam</SelectItem>
                        <SelectItem value="final">Final Exam</SelectItem>
                        <SelectItem value="quiz">Quiz</SelectItem>
                        <SelectItem value="assignment">Assignment</SelectItem>
                        <SelectItem value="project">Project</SelectItem>
                        <SelectItem value="practical">Practical Exam</SelectItem>
                        <SelectItem value="oral">Oral Exam</SelectItem>
                        <SelectItem value="entrance">Entrance Exam</SelectItem>
                        <SelectItem value="placement">Placement Test</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="subject" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <Select value={field.value || ""} onValueChange={(val) => field.onChange(val)}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subjects.map((s, index) => (
                          <SelectItem key={index} value={s.s_code}>
                            {s.s_name} ({s.s_code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="level" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <Select value={field.value ? String(field.value) : ""} onValueChange={(val) => {
                      if (val && val !== "") {
                        handleLevelChange(parseInt(val))
                      }
                    }}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {levels.map((l) => (
                          <SelectItem key={l.level_no} value={String(l.level_no)}>
                            {l.level_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="section" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section (Optional)</FormLabel>
                    <Select value={field.value ? String(field.value) : ""} onValueChange={(val) => {
                      if (val && val !== "" && val !== "0") {
                        field.onChange(parseInt(val))
                      } else {
                        field.onChange(0)
                      }
                    }}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">All Sections</SelectItem>
                        {availableSections.map((s) => (
                          <SelectItem key={s.section_id} value={String(s.section_id)}>
                            {s.section_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="duration" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (HH:MM:SS)</FormLabel>
                    <FormControl>
                      <Input 
                        type="text" 
                        placeholder="01:30:00" 
                        {...field} 
                        onChange={(e) => {
                          // Validate and format duration input
                          const value = e.target.value
                          // Allow only HH:MM:SS format
                          if (/^\d{1,2}:\d{2}:\d{2}$/.test(value) || value === '') {
                            field.onChange(value)
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField name="total_marks" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Marks</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="passing_marks" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passing Marks</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="status" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="postponed">Postponed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField name="exam_date" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="start_time" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="end_time" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="academic_year" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Academic Year</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField name="instructions" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder="Exam instructions for students..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="flex justify-end gap-3">
                <Button variant="outline" type="button" onClick={() => router.push('/admin/exams')}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createExam.isLoading}>
                  {createExam.isLoading ? 'Creating...' : 'Create Exam'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
