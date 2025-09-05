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
import { CalendarIcon, Loader2, ArrowLeft, User, Mail, Phone, MapPin, Heart, GraduationCap, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useStudent, useUpdateStudent, UpdateStudentData } from "@/hooks/use-students"
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
})

type StudentFormValues = z.infer<typeof studentFormSchema>

interface EditStudentPageProps {
  params: {
    id: string
  }
}

export default function EditStudentPage({ params }: EditStudentPageProps) {
  const router = useRouter()
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  
  const { data: student, isLoading: studentLoading, error: studentError } = useStudent(params.id)
  const { data: levels, isLoading: levelsLoading } = useLevels()
  const { data: sections, isLoading: sectionsLoading } = useSections()
  const { data: departments, isLoading: departmentsLoading } = useDepartments()
  
  const updateStudentMutation = useUpdateStudent()
  
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      student_number: "",
      name: "",
      email: "",
      phone: "",
      gender: undefined,
      date_of_birth: undefined,
      enroll_date: undefined,
      address: "",
      previous_education: "",
      status: 'active',
      level: 0,
      section: undefined,
      department: undefined,
      emergency_contact_name: "",
      emergency_contact_phone: "",
      medical_conditions: "",
      achievements: "",
      photo: "",
    },
  })

  // Update form when student data loads
  useEffect(() => {
    if (student) {
      setSelectedLevel(student.level || null)
      form.reset({
        student_number: student.student_number,
        name: student.name,
        email: student.email,
        phone: student.phone || "",
        gender: student.gender,
        date_of_birth: new Date(student.date_of_birth),
        enroll_date: new Date(student.enroll_date),
        address: student.address,
        previous_education: student.previous_education || "",
        status: student.status,
        level: student.level || 0,
        section: student.section || undefined,
        department: student.department || undefined,
        emergency_contact_name: student.emergency_contact_name,
        emergency_contact_phone: student.emergency_contact_phone,
        medical_conditions: student.medical_conditions || "",
        achievements: student.achievements || "",
        photo: student.photo || "",
      })
    }
  }, [student, form])

  const onSubmit = async (values: StudentFormValues) => {
    try {
      const submitData: UpdateStudentData = {
        s_id: params.id,
        ...values,
        date_of_birth: format(values.date_of_birth, 'yyyy-MM-dd'),
        enroll_date: format(values.enroll_date, 'yyyy-MM-dd'),
        section: values.section || undefined,
        department: values.department || undefined,
      }

      await updateStudentMutation.mutateAsync(submitData)
      router.push('/admin/students')
    } catch (error) {
      console.error('Error updating student:', error)
    }
  }

  const handleLevelChange = (levelId: number) => {
    setSelectedLevel(levelId)
    form.setValue('level', levelId)
    form.setValue('section', undefined) // Reset section when level changes
  }

  // Filter sections based on selected level
  const availableSections = sections?.filter(section => 
    selectedLevel ? section.level === selectedLevel : true
  ) || []

  if (studentLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (studentError || !student) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Failed to load student details</p>
          <Button variant="outline" onClick={() => router.back()} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    )
  }

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
            <h1 className="text-3xl font-bold">Edit Student</h1>
            <p className="text-muted-foreground">
              Update {student.name}'s information
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
                        <Select onValueChange={field.onChange} value={field.value}>
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
                          value={field.value ? field.value.toString() : ""}
                          disabled={levelsLoading}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {levels?.map((level) => (
                              <SelectItem key={level.level_no} value={level.level_no.toString()}>
                                {level.level_name}
                              </SelectItem>
                            ))}
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
                          value={field.value ? field.value.toString() : ""}
                          disabled={sectionsLoading || !selectedLevel}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select section" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableSections.map((section) => (
                              <SelectItem key={section.id} value={section.id.toString()}>
                                {section.section_name}
                              </SelectItem>
                            ))}
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
                          value={field.value ? field.value.toString() : ""}
                          disabled={departmentsLoading}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {departments?.map((department) => (
                              <SelectItem key={department.id} value={department.id.toString()}>
                                {department.d_name}
                              </SelectItem>
                            ))}
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
                        <Select onValueChange={field.onChange} value={field.value}>
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

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.back()}
                disabled={updateStudentMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={updateStudentMutation.isPending}
                className="min-w-[120px]"
              >
                {updateStudentMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update Student
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
