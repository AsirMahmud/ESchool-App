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
import { CalendarIcon, Loader2, Plus, Edit, Trash2, Activity } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { 
  useStudentActivities, 
  useCreateStudentActivity, 
  useUpdateStudentActivity, 
  useDeleteStudentActivity,
  CreateStudentActivityData,
  UpdateStudentActivityData,
  StudentActivity
} from "@/hooks/use-students"

const activityFormSchema = z.object({
  activity_name: z.string().min(1, "Activity name is required"),
  activity_type: z.enum(['sports', 'academic', 'cultural', 'social', 'volunteer', 'leadership', 'art', 'music', 'drama', 'debate', 'other']),
  description: z.string().optional(),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().optional(),
  position: z.string().optional(),
  achievements: z.string().optional(),
})

interface StudentActivitiesProps {
  studentId: string
  studentName: string
}

export function StudentActivities({ studentId, studentName }: StudentActivitiesProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingActivity, setEditingActivity] = useState<StudentActivity | null>(null)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)

  const { data: activities, isLoading, error } = useStudentActivities(studentId)
  const createActivity = useCreateStudentActivity()
  const updateActivity = useUpdateStudentActivity()
  const deleteActivity = useDeleteStudentActivity()

  const form = useForm<z.infer<typeof activityFormSchema>>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      activity_name: '',
      activity_type: 'academic',
      description: '',
      start_date: '',
      end_date: '',
      position: '',
      achievements: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof activityFormSchema>) => {
    try {
      if (editingActivity) {
        await updateActivity.mutateAsync({
          id: editingActivity.id,
          ...values,
        })
      } else {
        await createActivity.mutateAsync({
          studentId,
          ...values,
        })
      }
      setIsDialogOpen(false)
      setEditingActivity(null)
      form.reset()
    } catch (error) {
      console.error('Error saving activity:', error)
    }
  }

  const handleEdit = (activity: StudentActivity) => {
    setEditingActivity(activity)
    form.reset({
      activity_name: activity.activity_name,
      activity_type: activity.activity_type,
      description: activity.description || '',
      start_date: activity.start_date,
      end_date: activity.end_date || '',
      position: activity.position || '',
      achievements: activity.achievements || '',
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this activity?')) {
      try {
        setIsDeleting(id)
        await deleteActivity.mutateAsync(id)
      } catch (error) {
        console.error('Error deleting activity:', error)
      } finally {
        setIsDeleting(null)
      }
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingActivity(null)
    form.reset()
  }

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'sports': return 'bg-blue-100 text-blue-800'
      case 'academic': return 'bg-green-100 text-green-800'
      case 'cultural': return 'bg-purple-100 text-purple-800'
      case 'social': return 'bg-pink-100 text-pink-800'
      case 'volunteer': return 'bg-orange-100 text-orange-800'
      case 'leadership': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
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
        <p className="text-muted-foreground">Failed to load activities</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Activities & Extracurriculars</h3>
          <p className="text-sm text-muted-foreground">
            Manage {studentName}'s activities and extracurricular participation
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Activity
        </Button>
      </div>

      {activities && activities.length > 0 ? (
        <div className="space-y-4">
          {activities.map((activity) => (
            <Card key={activity.id}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium">{activity.activity_name}</h4>
                      <Badge className={getActivityTypeColor(activity.activity_type)}>
                        {activity.activity_type}
                      </Badge>
                      {activity.is_active && (
                        <Badge variant="outline" className="text-green-600">
                          Active
                        </Badge>
                      )}
                    </div>
                    {activity.description && (
                      <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                    )}
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>
                        Started: {format(new Date(activity.start_date), 'MMM dd, yyyy')}
                      </span>
                      {activity.end_date && (
                        <span>
                          Ended: {format(new Date(activity.end_date), 'MMM dd, yyyy')}
                        </span>
                      )}
                      {activity.position && (
                        <span>Position: {activity.position}</span>
                      )}
                    </div>
                    {activity.achievements && (
                      <p className="text-sm text-muted-foreground mt-2">
                        <strong>Achievements:</strong> {activity.achievements}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(activity)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(activity.id)}
                      disabled={isDeleting === activity.id}
                    >
                      {isDeleting === activity.id ? (
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
          <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No activities recorded yet</p>
        </div>
      )}

      {/* Add/Edit Activity Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingActivity ? 'Edit Activity' : 'Add New Activity'}
            </DialogTitle>
            <DialogDescription>
              {editingActivity 
                ? 'Update the activity information below.' 
                : 'Add a new activity or extracurricular participation for this student.'
              }
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="activity_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activity Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Basketball Team" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="activity_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activity Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select activity type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="cultural">Cultural</SelectItem>
                          <SelectItem value="social">Social</SelectItem>
                          <SelectItem value="volunteer">Volunteer</SelectItem>
                          <SelectItem value="leadership">Leadership</SelectItem>
                          <SelectItem value="art">Art</SelectItem>
                          <SelectItem value="music">Music</SelectItem>
                          <SelectItem value="drama">Drama</SelectItem>
                          <SelectItem value="debate">Debate</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the activity..." 
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
                  name="start_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date *</FormLabel>
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
                  name="end_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position/Role</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Captain, Member, Leader" {...field} />
                      </FormControl>
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
                        <Input placeholder="e.g., First place, MVP, Certificate" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={createActivity.isPending || updateActivity.isPending}
                >
                  {(createActivity.isPending || updateActivity.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingActivity ? 'Update Activity' : 'Add Activity'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
