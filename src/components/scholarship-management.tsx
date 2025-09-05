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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Plus, Edit, Trash2, Award, DollarSign, Users } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { 
  useScholarships,
  useCreateScholarship,
  useUpdateScholarship,
  useDeleteScholarship,
  useStudentScholarships,
  useCreateStudentScholarship,
  useUpdateStudentScholarship,
  useDeleteStudentScholarship,
  CreateScholarshipData,
  UpdateScholarshipData,
  CreateStudentScholarshipData,
  UpdateStudentScholarshipData,
  Scholarship,
  StudentScholarship
} from "@/hooks/use-students"
import { useStudents } from "@/hooks/use-students"

const scholarshipFormSchema = z.object({
  name: z.string().min(1, "Scholarship name is required"),
  scholarship_type: z.enum(['merit', 'need', 'sports', 'academic', 'cultural', 'special']),
  description: z.string().min(1, "Description is required"),
  amount: z.number().min(0, "Amount must be positive"),
  criteria: z.string().min(1, "Criteria is required"),
})

const studentScholarshipFormSchema = z.object({
  student: z.string().min(1, "Student is required"),
  scholarship: z.number().min(1, "Scholarship is required"),
  award_date: z.string().min(1, "Award date is required"),
  amount_awarded: z.number().min(0, "Amount must be positive"),
  academic_year: z.string().min(1, "Academic year is required"),
})

interface ScholarshipManagementProps {
  studentId?: string
  studentName?: string
}

export function ScholarshipManagement({ studentId, studentName }: ScholarshipManagementProps) {
  const [isScholarshipDialogOpen, setIsScholarshipDialogOpen] = useState(false)
  const [isStudentScholarshipDialogOpen, setIsStudentScholarshipDialogOpen] = useState(false)
  const [editingScholarship, setEditingScholarship] = useState<Scholarship | null>(null)
  const [editingStudentScholarship, setEditingStudentScholarship] = useState<StudentScholarship | null>(null)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)

  const { data: scholarships, isLoading: scholarshipsLoading } = useScholarships()
  const { data: students } = useStudents()
  const { data: studentScholarships, isLoading: studentScholarshipsLoading } = useStudentScholarships(studentId || '')
  
  const createScholarship = useCreateScholarship()
  const updateScholarship = useUpdateScholarship()
  const deleteScholarship = useDeleteScholarship()
  const createStudentScholarship = useCreateStudentScholarship()
  const updateStudentScholarship = useUpdateStudentScholarship()
  const deleteStudentScholarship = useDeleteStudentScholarship()

  const scholarshipForm = useForm<z.infer<typeof scholarshipFormSchema>>({
    resolver: zodResolver(scholarshipFormSchema),
    defaultValues: {
      name: '',
      scholarship_type: 'merit',
      description: '',
      amount: 0,
      criteria: '',
    },
  })

  const studentScholarshipForm = useForm<z.infer<typeof studentScholarshipFormSchema>>({
    resolver: zodResolver(studentScholarshipFormSchema),
    defaultValues: {
      student: studentId || '',
      scholarship: 0,
      award_date: '',
      amount_awarded: 0,
      academic_year: new Date().getFullYear().toString(),
    },
  })

  const onScholarshipSubmit = async (values: z.infer<typeof scholarshipFormSchema>) => {
    try {
      if (editingScholarship) {
        await updateScholarship.mutateAsync({
          sch_id: editingScholarship.sch_id,
          ...values,
        })
      } else {
        await createScholarship.mutateAsync(values)
      }
      setIsScholarshipDialogOpen(false)
      setEditingScholarship(null)
      scholarshipForm.reset()
    } catch (error) {
      console.error('Error saving scholarship:', error)
    }
  }

  const onStudentScholarshipSubmit = async (values: z.infer<typeof studentScholarshipFormSchema>) => {
    try {
      if (editingStudentScholarship) {
        await updateStudentScholarship.mutateAsync({
          id: editingStudentScholarship.id,
          ...values,
        })
      } else {
        await createStudentScholarship.mutateAsync({
          studentId: values.student,
          scholarship: values.scholarship,
          award_date: values.award_date,
          amount_awarded: values.amount_awarded,
          academic_year: values.academic_year,
        })
      }
      setIsStudentScholarshipDialogOpen(false)
      setEditingStudentScholarship(null)
      studentScholarshipForm.reset()
    } catch (error) {
      console.error('Error saving student scholarship:', error)
    }
  }

  const handleEditScholarship = (scholarship: Scholarship) => {
    setEditingScholarship(scholarship)
    scholarshipForm.reset({
      name: scholarship.name,
      scholarship_type: scholarship.scholarship_type,
      description: scholarship.description,
      amount: scholarship.amount,
      criteria: scholarship.criteria,
    })
    setIsScholarshipDialogOpen(true)
  }

  const handleEditStudentScholarship = (studentScholarship: StudentScholarship) => {
    setEditingStudentScholarship(studentScholarship)
    studentScholarshipForm.reset({
      student: studentScholarship.student,
      scholarship: studentScholarship.scholarship,
      award_date: studentScholarship.award_date,
      amount_awarded: studentScholarship.amount_awarded,
      academic_year: studentScholarship.academic_year,
    })
    setIsStudentScholarshipDialogOpen(true)
  }

  const handleDeleteScholarship = async (id: number) => {
    if (confirm('Are you sure you want to delete this scholarship?')) {
      try {
        setIsDeleting(id)
        await deleteScholarship.mutateAsync(id)
      } catch (error) {
        console.error('Error deleting scholarship:', error)
      } finally {
        setIsDeleting(null)
      }
    }
  }

  const handleDeleteStudentScholarship = async (id: number) => {
    if (confirm('Are you sure you want to delete this student scholarship?')) {
      try {
        setIsDeleting(id)
        await deleteStudentScholarship.mutateAsync(id)
      } catch (error) {
        console.error('Error deleting student scholarship:', error)
      } finally {
        setIsDeleting(null)
      }
    }
  }

  const getScholarshipTypeColor = (type: string) => {
    switch (type) {
      case 'merit': return 'bg-green-100 text-green-800'
      case 'need': return 'bg-blue-100 text-blue-800'
      case 'sports': return 'bg-orange-100 text-orange-800'
      case 'academic': return 'bg-purple-100 text-purple-800'
      case 'cultural': return 'bg-pink-100 text-pink-800'
      case 'special': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="scholarships" className="space-y-4">
        <TabsList>
          <TabsTrigger value="scholarships">Available Scholarships</TabsTrigger>
          {studentId && (
            <TabsTrigger value="student-scholarships">
              {studentName ? `${studentName}'s Scholarships` : 'Student Scholarships'}
            </TabsTrigger>
          )}
        </TabsList>

        {/* Available Scholarships Tab */}
        <TabsContent value="scholarships" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Available Scholarships</h3>
              <p className="text-sm text-muted-foreground">
                Manage scholarship programs and their criteria
              </p>
            </div>
            <Button onClick={() => setIsScholarshipDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Scholarship
            </Button>
          </div>

          {scholarshipsLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : scholarships && scholarships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scholarships.map((scholarship) => (
                <Card key={scholarship.sch_id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{scholarship.name}</CardTitle>
                        <CardDescription className="mt-1">
                          <Badge className={getScholarshipTypeColor(scholarship.scholarship_type)}>
                            {scholarship.scholarship_type}
                          </Badge>
                        </CardDescription>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditScholarship(scholarship)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteScholarship(scholarship.sch_id)}
                          disabled={isDeleting === scholarship.sch_id}
                        >
                          {isDeleting === scholarship.sch_id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">${scholarship.amount.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {scholarship.description}
                      </p>
                      <div className="pt-2">
                        <p className="text-xs font-medium text-muted-foreground">Criteria:</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {scholarship.criteria}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No scholarships available</p>
            </div>
          )}
        </TabsContent>

        {/* Student Scholarships Tab */}
        {studentId && (
          <TabsContent value="student-scholarships" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  {studentName ? `${studentName}'s Scholarships` : 'Student Scholarships'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Manage scholarship awards for this student
                </p>
              </div>
              <Button onClick={() => setIsStudentScholarshipDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Award Scholarship
              </Button>
            </div>

            {studentScholarshipsLoading ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : studentScholarships && studentScholarships.length > 0 ? (
              <div className="space-y-4">
                {studentScholarships.map((studentScholarship) => (
                  <Card key={studentScholarship.id}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium">{studentScholarship.scholarship_name}</h4>
                            {studentScholarship.is_active && (
                              <Badge variant="outline" className="text-green-600">
                                Active
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>
                              Awarded: {format(new Date(studentScholarship.award_date), 'MMM dd, yyyy')}
                            </span>
                            <span>Amount: ${studentScholarship.amount_awarded.toLocaleString()}</span>
                            <span>Year: {studentScholarship.academic_year}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditStudentScholarship(studentScholarship)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteStudentScholarship(studentScholarship.id)}
                            disabled={isDeleting === studentScholarship.id}
                          >
                            {isDeleting === studentScholarship.id ? (
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
                <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No scholarships awarded yet</p>
              </div>
            )}
          </TabsContent>
        )}
      </Tabs>

      {/* Add/Edit Scholarship Dialog */}
      <Dialog open={isScholarshipDialogOpen} onOpenChange={setIsScholarshipDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingScholarship ? 'Edit Scholarship' : 'Add New Scholarship'}
            </DialogTitle>
            <DialogDescription>
              {editingScholarship 
                ? 'Update the scholarship information below.' 
                : 'Create a new scholarship program with its criteria and requirements.'
              }
            </DialogDescription>
          </DialogHeader>

          <Form {...scholarshipForm}>
            <form onSubmit={scholarshipForm.handleSubmit(onScholarshipSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={scholarshipForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Scholarship Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Academic Excellence Scholarship" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={scholarshipForm.control}
                  name="scholarship_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="merit">Merit-based</SelectItem>
                          <SelectItem value="need">Need-based</SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="academic">Academic Excellence</SelectItem>
                          <SelectItem value="cultural">Cultural</SelectItem>
                          <SelectItem value="special">Special Circumstances</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={scholarshipForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the scholarship..." 
                        className="resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={scholarshipForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0.00" 
                        step="0.01"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={scholarshipForm.control}
                name="criteria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Eligibility Criteria *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the eligibility criteria..." 
                        className="resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsScholarshipDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={createScholarship.isPending || updateScholarship.isPending}
                >
                  {(createScholarship.isPending || updateScholarship.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingScholarship ? 'Update Scholarship' : 'Add Scholarship'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Student Scholarship Dialog */}
      <Dialog open={isStudentScholarshipDialogOpen} onOpenChange={setIsStudentScholarshipDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingStudentScholarship ? 'Edit Student Scholarship' : 'Award Scholarship'}
            </DialogTitle>
            <DialogDescription>
              {editingStudentScholarship 
                ? 'Update the scholarship award information below.' 
                : 'Award a scholarship to this student.'
              }
            </DialogDescription>
          </DialogHeader>

          <Form {...studentScholarshipForm}>
            <form onSubmit={studentScholarshipForm.handleSubmit(onStudentScholarshipSubmit)} className="space-y-4">
              {!studentId && (
                <FormField
                  control={studentScholarshipForm.control}
                  name="student"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a student" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {students?.map((student) => (
                            <SelectItem key={student.s_id} value={student.s_id}>
                              {student.name} ({student.student_number})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={studentScholarshipForm.control}
                name="scholarship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scholarship *</FormLabel>
                    <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a scholarship" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {scholarships?.map((scholarship) => (
                          <SelectItem key={scholarship.sch_id} value={scholarship.sch_id.toString()}>
                            {scholarship.name} - ${scholarship.amount.toLocaleString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={studentScholarshipForm.control}
                  name="award_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Award Date *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={studentScholarshipForm.control}
                  name="academic_year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Academic Year *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2024-2025" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={studentScholarshipForm.control}
                name="amount_awarded"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount Awarded *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0.00" 
                        step="0.01"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsStudentScholarshipDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={createStudentScholarship.isPending || updateStudentScholarship.isPending}
                >
                  {(createStudentScholarship.isPending || updateStudentScholarship.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingStudentScholarship ? 'Update Award' : 'Award Scholarship'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
