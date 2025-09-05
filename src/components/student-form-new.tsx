'use client'

import { useState, useEffect } from 'react'
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
import { CalendarIcon, Loader2, GraduationCap, User, Mail, Phone, MapPin } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useStudents, useCreateStudent, useUpdateStudent, CreateStudentData, UpdateStudentData } from "@/hooks/use-students"
import { useLevels } from "@/hooks/use-levels"
import { useSections } from "@/hooks/use-sections"
import { useSubjectsByLevelAndSection } from "@/hooks/use-level-subjects"
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

interface StudentFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  student?: any
  onSuccess?: () => void
}

export function StudentFormNew({ open, onOpenChange, student, onSuccess }: StudentFormProps) {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const [selectedSection, setSelectedSection] = useState<number | null>(null)
  
  const { data: levels, isLoading: levelsLoading, error: levelsError } = useLevels()
  const { data: sections, isLoading: sectionsLoading, error: sectionsError } = useSections()
  const { data: departments, isLoading: departmentsLoading, error: departmentsError } = useDepartments()
  const { data: subjects, isLoading: subjectsLoading, error: subjectsError } = useSubjectsByLevelAndSection(selectedLevel, selectedSection)
  
  const createStudentMutation = useCreateStudent()
  const updateStudentMutation = useUpdateStudent()
  
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      student_number: "",
      name: "",
      email: "",
      phone: "",
      gender: "male",
      date_of_birth: undefined,
      enroll_date: undefined,
      address: "",
      previous_education: "",
      status: "active",
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

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      if (student) {
        // Editing existing student
        form.reset({
          student_number: student.student_number || "",
          name: student.name || "",
          email: student.email || "",
          phone: student.phone || "",
          gender: student.gender || "male",
          date_of_birth: student.date_of_birth ? new Date(student.date_of_birth) : undefined,
          enroll_date: student.enroll_date ? new Date(student.enroll_date) : undefined,
          address: student.address || "",
          previous_education: student.previous_education || "",
          status: student.status || "active",
          level: student.level || 0,
          section: student.section || 0,
          department: student.department || 0,
          emergency_contact_name: student.emergency_contact_name || "",
          emergency_contact_phone: student.emergency_contact_phone || "",
          medical_conditions: student.medical_conditions || "",
          achievements: student.achievements || "",
          photo: student.photo || "",
        })
        setSelectedLevel(student.level || null)
        setSelectedSection(student.section || null)
      } else {
        // Adding new student
        form.reset({
          student_number: "",
          name: "",
          email: "",
          phone: "",
          gender: "male",
          date_of_birth: undefined,
          enroll_date: undefined,
          address: "",
          previous_education: "",
          status: "active",
          level: 0,
          section: 0,
          department: 0,
          emergency_contact_name: "",
          emergency_contact_phone: "",
          medical_conditions: "",
          achievements: "",
          photo: "",
        })
        setSelectedLevel(null)
        setSelectedSection(null)
      }
    }
  }, [open, student, form])

  // Filter sections based on selected level
  const filteredSections = sections?.filter(section => section.level === selectedLevel) || []

  // Handle level change
  const handleLevelChange = (value: string) => {
    const levelValue = parseInt(value)
    setSelectedLevel(levelValue)
    setSelectedSection(null)
    form.setValue('level', levelValue)
    form.setValue('section', 0)
  }

  // Handle section change
  const handleSectionChange = (value: string) => {
    const sectionValue = parseInt(value)
    setSelectedSection(sectionValue)
    form.setValue('section', sectionValue)
  }

  const onSubmit = async (values: StudentFormValues) => {
    try {
      const formData = {
        ...values,
        date_of_birth: values.date_of_birth.toISOString().split('T')[0],
        enroll_date: values.enroll_date.toISOString().split('T')[0],
        level: values.level,
        section: values.section > 0 ? values.section : undefined,
        department: values.department > 0 ? values.department : undefined,
      }

      if (student) {
        await updateStudentMutation.mutateAsync({
          s_id: student.s_id,
          ...formData,
        })
      } else {
        await createStudentMutation.mutateAsync(formData)
      }
      
      form.reset()
      setSelectedLevel(null)
      setSelectedSection(null)
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Failed to save student:', error)
    }
  }

  const isLoading = createStudentMutation.isPending || updateStudentMutation.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {student ? 'Edit Student' : 'Add New Student'}
          </DialogTitle>
          <DialogDescription>
            {student 
              ? 'Update student information and academic details.'
              : 'Fill in the student information and select their academic level and section.'
            }
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <User className="h-5 w-5" />
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="student_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Number</FormLabel>
                      <FormControl>
                        <Input placeholder="STU-001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
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
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1234567890" {...field} />
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
                      <FormLabel>Gender</FormLabel>
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
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Academic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Level *</FormLabel>
                      <Select onValueChange={handleLevelChange} value={field.value > 0 ? field.value.toString() : ""}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {levelsLoading ? (
                            <SelectItem value="loading" disabled>Loading levels...</SelectItem>
                          ) : levelsError ? (
                            <SelectItem value="error" disabled>Error loading levels</SelectItem>
                          ) : (
                            levels?.map((level) => (
                              <SelectItem key={level.level_no} value={level.level_no.toString()}>
                                {level.level_name}
                              </SelectItem>
                            ))
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
                      <Select onValueChange={handleSectionChange} value={field.value > 0 ? field.value.toString() : ""} disabled={!selectedLevel}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select section" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sectionsLoading ? (
                            <SelectItem value="loading" disabled>Loading sections...</SelectItem>
                          ) : sectionsError ? (
                            <SelectItem value="error" disabled>Error loading sections</SelectItem>
                          ) : filteredSections.length === 0 ? (
                            <SelectItem value="none" disabled>No sections available</SelectItem>
                          ) : (
                            filteredSections.map((section) => (
                              <SelectItem key={section.id} value={section.id.toString()}>
                                {section.section_name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        {selectedLevel && filteredSections.length === 0 && "No sections available for this level"}
                        {!selectedLevel && "Please select a level first"}
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
                      <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value > 0 ? field.value.toString() : ""}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departmentsLoading ? (
                            <SelectItem value="loading" disabled>Loading departments...</SelectItem>
                          ) : departmentsError ? (
                            <SelectItem value="error" disabled>Error loading departments</SelectItem>
                          ) : (
                            departments?.map((dept) => (
                              <SelectItem key={dept.id} value={dept.id.toString()}>
                                {dept.d_name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Important Dates</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
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
                            disabled={(date) => date > new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Address and Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Address & Contact Information
              </h3>
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address *</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter full address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="emergency_contact_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Emergency contact name" {...field} />
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
                        <Input placeholder="Emergency contact phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Additional Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="previous_education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Previous Education</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Previous educational background" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="medical_conditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medical Conditions</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Any medical conditions or allergies" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="achievements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Achievements</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Student achievements and awards" {...field} />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Subjects Preview */}
            {selectedLevel && selectedLevel > 0 && selectedSection && selectedSection > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Available Subjects</h3>
                
                {subjectsLoading && (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>Loading subjects...</span>
                  </div>
                )}

                {subjectsError && (
                  <div className="p-4 bg-red-50 rounded-md border border-red-200">
                    <p className="text-sm text-red-800">
                      <strong>Error loading subjects:</strong> {subjectsError.message}
                    </p>
                  </div>
                )}

                {!subjectsLoading && !subjectsError && subjects && subjects.length > 0 && (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {subjects.map((subject) => (
                        <div key={subject.id} className="p-3 bg-muted rounded-md text-sm border">
                          <div className="font-medium">{subject.subject_name}</div>
                          <div className="text-xs text-muted-foreground">{subject.subject_code}</div>
                          {subject.teacher_name && (
                            <div className="text-xs text-blue-600 mt-1">Teacher: {subject.teacher_name}</div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-blue-50 rounded-md">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> These {subjects.length} subjects will be automatically assigned to the student based on their selected level and section.
                      </p>
                    </div>
                  </>
                )}

                {!subjectsLoading && !subjectsError && (!subjects || subjects.length === 0) && (
                  <div className="p-4 bg-yellow-50 rounded-md border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      <strong>No subjects found</strong> for the selected level and section. Please ensure subjects are properly configured for this combination.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Show message when level or section is not selected */}
            {(!selectedLevel || selectedLevel === 0 || !selectedSection || selectedSection === 0) && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Available Subjects</h3>
                <div className="p-4 bg-gray-50 rounded-md border">
                  <p className="text-sm text-gray-600">
                    Please select both level and section to see available subjects.
                  </p>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {student ? 'Update Student' : 'Add Student'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
