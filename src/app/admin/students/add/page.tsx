'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
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
import { CalendarIcon, Loader2, ArrowLeft, User, Mail, Phone, MapPin, Heart, GraduationCap, Users } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useCreateStudent, CreateStudentData, useCreateStudentParent } from "@/hooks/use-students"
import { useParents } from "@/hooks/use-parents"
import { useLevels } from "@/hooks/use-levels"
import { useSections } from "@/hooks/use-sections"
import { useDepartments } from "@/hooks/use-departments"

const studentFormSchema = z.object({
  student_number: z.string().min(1, "Student number is required"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: "Please select a gender",
  }),
  date_of_birth: z.date({
    required_error: "Date of birth is required",
  }),
  enroll_date: z.date({
    required_error: "Enrollment date is required",
  }),
  address: z.string().min(10, "Address must be at least 10 characters"),
  previous_education: z.string().optional(),
  status: z.enum(['active', 'inactive', 'graduated', 'transferred', 'suspended', 'expelled']).default('active'),
  level: z.number().min(1, "Please select a level"),
  section: z.number().optional(),
  department: z.number().optional(),
  emergency_contact_name: z.string().min(2, "Emergency contact name is required"),
  emergency_contact_phone: z.string().min(10, "Emergency contact phone is required"),
  medical_conditions: z.string().optional(),
  achievements: z.string().optional(),
  photo: z.string().url().optional().or(z.literal("")),
  // Parent linking (required)
  parentId: z.number({ required_error: 'Parent is required' }),
  relationship: z.enum(['father','mother','guardian','grandfather','grandmother','uncle','aunt','other'], { required_error: 'Relationship is required' }),
  parentIsPrimary: z.boolean().optional().default(false),
  parentIsEmergency: z.boolean().optional().default(true),
})

type StudentFormValues = z.infer<typeof studentFormSchema>

export default function AddStudentPage() {
  const router = useRouter()
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  
  const { data: levels, isLoading: levelsLoading } = useLevels()
  const { data: sections, isLoading: sectionsLoading } = useSections()
  const { data: departments, isLoading: departmentsLoading } = useDepartments()
  
  const createStudentMutation = useCreateStudent()
  const createStudentParent = useCreateStudentParent()
  const [parentSearch, setParentSearch] = useState("")
  const { data: parents = [] } = useParents(parentSearch)
  
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      student_number: "",
      name: "",
      email: "",
      phone: "",
      gender: undefined,
      date_of_birth: undefined,
      enroll_date: new Date(),
      address: "",
      previous_education: "",
      status: 'active',
      level: 0,
      section: 0,
      department: 0,
      emergency_contact_name: "",
      emergency_contact_phone: "",
      medical_conditions: "",
      achievements: "",
      photo: "",
    },
  })

  const onSubmit = async (values: StudentFormValues) => {
    try {
      const submitData: CreateStudentData = {
        ...values,
        date_of_birth: format(values.date_of_birth, 'yyyy-MM-dd'),
        enroll_date: format(values.enroll_date, 'yyyy-MM-dd'),
        section: values.section && values.section > 0 ? values.section : undefined,
        department: values.department && values.department > 0 ? values.department : undefined,
      }

      const created = await createStudentMutation.mutateAsync(submitData)
      if (values.parentId && values.relationship) {
        await createStudentParent.mutateAsync({
          studentId: created.s_id,
          parent: values.parentId,
          relationship: values.relationship,
          is_primary_contact: values.parentIsPrimary ?? false,
          is_emergency_contact: values.parentIsEmergency ?? true,
        })
      }
      router.push('/admin/students')
    } catch (error: any) {
      const message = error?.message || 'Failed to create student'
      if (message.toLowerCase().includes('student number')) {
        form.setError('student_number' as any, { type: 'manual', message })
      }
      console.error('Error creating student:', error)
    }
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Add New Student</h1>
            <p className="text-muted-foreground">
              Fill in the student information to create a new record
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </CardTitle>
                <CardDescription>
                  Basic personal details of the student
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="student_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., STU2024001" {...field} />
                        </FormControl>
                        <FormDescription>
                          Unique identifier for the student
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input placeholder="student@example.com" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input placeholder="+1 (555) 000-0000" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date_of_birth"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of Birth *</FormLabel>
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
                                  format(field.value, "PPP")
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
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
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
                    name="enroll_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Enrollment Date *</FormLabel>
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
                                  format(field.value, "PPP")
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
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
                          <Textarea 
                            placeholder="Enter full address" 
                            className="pl-10 resize-none"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Photo URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/photo.jpg" {...field} />
                      </FormControl>
                      <FormDescription>
                        Optional: URL to student's photo
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Parent Linking (Optional) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Parent / Guardian</span>
                </CardTitle>
                <CardDescription>
                  Optionally link an existing parent to this student
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="parentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Search Parent</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Input
                              placeholder="Search by name/email/phone"
                              value={parentSearch}
                              onChange={(e) => setParentSearch(e.target.value)}
                            />
                            <Select
                              value={field.value ? String(field.value) : undefined}
                              onValueChange={(val) => field.onChange(parseInt(val))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a parent" />
                              </SelectTrigger>
                              <SelectContent>
                                {parents.map((p) => (
                                  <SelectItem key={p.p_id} value={String(p.p_id)}>
                                    {p.name} — {p.phone}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="relationship"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relationship</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            {['father','mother','guardian','grandfather','grandmother','uncle','aunt','other'].map(r => (
                              <SelectItem key={r} value={r}>{r}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="parentIsPrimary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Contact</FormLabel>
                        <FormControl>
                          <Select value={String(field.value ?? false)} onValueChange={(v) => field.onChange(v === 'true')}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">Yes</SelectItem>
                              <SelectItem value="false">No</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="parentIsEmergency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Contact</FormLabel>
                        <FormControl>
                          <Select value={String(field.value ?? true)} onValueChange={(v) => field.onChange(v === 'true')}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">Yes</SelectItem>
                              <SelectItem value="false">No</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="text-sm text-muted-foreground">Need to add a new parent? Open a new tab and go to Admin → Parents → Add Parent, then search again.</div>
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>Academic Information</span>
                </CardTitle>
                <CardDescription>
                  Academic level, section, and department details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Level *</FormLabel>
                        <Select 
                          onValueChange={(value) => handleLevelChange(parseInt(value))} 
                          value={field.value && typeof field.value === 'number' && field.value > 0 ? field.value.toString() : ""}
                          disabled={levelsLoading}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {levels && levels.length > 0 ? levels
                              .filter(level => level.level_no != null)
                              .map((level) => (
                                <SelectItem key={level.level_no} value={level.level_no.toString()}>
                                  {level.level_name || "Unknown Level"}
                                </SelectItem>
                              )) : (
                              <div className="px-2 py-1.5 text-sm text-muted-foreground">No levels available</div>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="section"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section</FormLabel>
                        <Select 
                          onValueChange={(value) => field.onChange(parseInt(value))} 
                          value={field.value && typeof field.value === 'number' && field.value > 0 ? field.value.toString() : ""}
                          disabled={sectionsLoading || !selectedLevel}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select section" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableSections && availableSections.length > 0 ? availableSections
                              .filter(section => section.id != null)
                              .map((section) => (
                                <SelectItem key={section.id} value={section.id.toString()}>
                                  {section.section_name || "Unknown Section"}
                                </SelectItem>
                              )) : (
                              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                {!selectedLevel ? "Select a level first" : "No sections available"}
                              </div>
                            )}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          {!selectedLevel && "Select a level first"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <Select 
                          onValueChange={(value) => field.onChange(parseInt(value))} 
                          value={field.value && typeof field.value === 'number' && field.value > 0 ? field.value.toString() : ""}
                          disabled={departmentsLoading}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {departments && departments.length > 0 ? departments
                              .filter(department => department.id != null)
                              .map((department) => (
                                <SelectItem key={department.id} value={department.id.toString()}>
                                  {department.d_name || "Unknown Department"}
                                </SelectItem>
                              )) : (
                              <div className="px-2 py-1.5 text-sm text-muted-foreground">No departments available</div>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="graduated">Graduated</SelectItem>
                            <SelectItem value="transferred">Transferred</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                            <SelectItem value="expelled">Expelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="previous_education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Previous Education</FormLabel>
                        <FormControl>
                          <Input placeholder="Previous school/education" {...field} />
                        </FormControl>
                        <FormDescription>
                          Optional: Previous educational background
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>Emergency Contact</span>
                </CardTitle>
                <CardDescription>
                  Emergency contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="emergency_contact_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Contact Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Contact person name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="emergency_contact_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Contact Phone *</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>
                  Optional medical conditions and achievements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="medical_conditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medical Conditions</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any medical conditions, allergies, or special needs..." 
                          className="resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Optional: Important medical information
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="achievements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Achievements</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Awards, recognitions, achievements..." 
                          className="resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Optional: Student achievements and awards
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Attendance Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Attendance Setup</span>
                </CardTitle>
                <CardDescription>
                  Initial attendance configuration for the student
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-medium text-blue-900">Attendance System Ready</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Once the student is created, you can track their daily attendance, including check-in/check-out times, 
                        subject-wise attendance, and generate attendance reports. The system will automatically calculate 
                        attendance percentages and provide insights.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                      </svg>
                      <h5 className="font-medium text-green-900">Features Available</h5>
                    </div>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Daily attendance marking</li>
                      <li>• Subject-wise tracking</li>
                      <li>• Check-in/out times</li>
                      <li>• Attendance reports</li>
                      <li>• Calendar view</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg className="h-4 w-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h5 className="font-medium text-yellow-900">Status Options</h5>
                    </div>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Present</li>
                      <li>• Absent</li>
                      <li>• Late</li>
                      <li>• Excused</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.back()}
                disabled={createStudentMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createStudentMutation.isPending}
                className="min-w-[120px]"
              >
                {createStudentMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Add Student
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
