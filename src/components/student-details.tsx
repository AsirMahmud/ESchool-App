'use client'

import { useState } from 'react'
import { useStudentDetail, useStudentParents, useStudentActivities, useStudentDiary, useStudentScholarships } from '@/hooks/use-students'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  GraduationCap, 
  Users, 
  Activity, 
  BookOpen, 
  Award,
  Edit,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface StudentDetailsProps {
  studentId: string
  onEdit?: () => void
  onAddParent?: () => void
  onAddActivity?: () => void
  onAddDiaryEntry?: () => void
  onAddScholarship?: () => void
}

export function StudentDetails({ 
  studentId, 
  onEdit, 
  onAddParent, 
  onAddActivity, 
  onAddDiaryEntry, 
  onAddScholarship 
}: StudentDetailsProps) {
  const { data: student, isLoading: studentLoading, error: studentError } = useStudentDetail(studentId)
  const { data: parents, isLoading: parentsLoading } = useStudentParents(studentId)
  const { data: activities, isLoading: activitiesLoading } = useStudentActivities(studentId)
  const { data: diary, isLoading: diaryLoading } = useStudentDiary(studentId)
  const { data: scholarships, isLoading: scholarshipsLoading } = useStudentScholarships(studentId)

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
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'graduated': return 'bg-blue-100 text-blue-800'
      case 'transferred': return 'bg-yellow-100 text-yellow-800'
      case 'suspended': return 'bg-orange-100 text-orange-800'
      case 'expelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
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
      {/* Student Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={student.photo} />
              <AvatarFallback className="text-lg">
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
                <div>
                <CardTitle className="text-2xl">{student.name}</CardTitle>
                <CardDescription className="text-lg">
                  {student.student_number} • {student.level_name} • {student.section_name}
                </CardDescription>
                <div className="flex items-center space-x-2 mt-2">
                <Badge className={getStatusColor(student.status)}>
                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </Badge>
                  <Badge variant="outline">
                    Age: {student.age}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              {onEdit && (
                <Button variant="outline" size="sm" onClick={onEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
              </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{student.email}</span>
                </div>
                {student.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.phone}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Enrolled: {format(new Date(student.enroll_date), 'MMM dd, yyyy')}
              </span>
                </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm truncate">{student.address}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="parents">Parents</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="diary">Diary</TabsTrigger>
          <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Academic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>Academic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="text-sm font-medium">Level:</span>
                  <p className="text-sm text-muted-foreground">{student.level_name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Section:</span>
                  <p className="text-sm text-muted-foreground">{student.section_name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Department:</span>
                  <p className="text-sm text-muted-foreground">{student.department_name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Date of Birth:</span>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(student.date_of_birth), 'MMM dd, yyyy')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Emergency Contact</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="text-sm font-medium">Name:</span>
                  <p className="text-sm text-muted-foreground">{student.emergency_contact_name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Phone:</span>
                  <p className="text-sm text-muted-foreground">{student.emergency_contact_phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Medical Information */}
                {student.medical_conditions && (
              <Card>
                <CardHeader>
                  <CardTitle>Medical Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{student.medical_conditions}</p>
              </CardContent>
            </Card>
            )}

            {/* Achievements */}
          {student.achievements && (
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-sm text-muted-foreground">{student.achievements}</p>
                </CardContent>
              </Card>
            )}

            {/* Previous Education */}
            {student.previous_education && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Previous Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{student.previous_education}</p>
              </CardContent>
            </Card>
          )}
          </div>
        </TabsContent>

        {/* Parents Tab */}
        <TabsContent value="parents" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Parents & Guardians</h3>
            {onAddParent && (
              <Button size="sm" onClick={onAddParent}>
                  <Plus className="h-4 w-4 mr-2" />
                Add Parent
                </Button>
            )}
          </div>

          {parentsLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : parents && parents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {parents.map((parent) => (
                <Card key={parent.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{parent.parent_name}</h4>
                        <p className="text-sm text-muted-foreground capitalize">
                          {parent.relationship}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{parent.parent_email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{parent.parent_phone}</span>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1">
                        {parent.is_primary_contact && (
                          <Badge variant="outline" className="text-xs">Primary</Badge>
                        )}
                        {parent.is_emergency_contact && (
                          <Badge variant="outline" className="text-xs">Emergency</Badge>
                        )}
                      </div>
                </div>
            </CardContent>
          </Card>
              ))}
          </div>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No parents added yet</p>
                </div>
              )}
        </TabsContent>

        {/* Activities Tab */}
        <TabsContent value="activities" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Activities & Extracurriculars</h3>
            {onAddActivity && (
              <Button size="sm" onClick={onAddActivity}>
                <Plus className="h-4 w-4 mr-2" />
                Add Activity
              </Button>
            )}
          </div>

          {activitiesLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : activities && activities.length > 0 ? (
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
        </TabsContent>

        {/* Diary Tab */}
        <TabsContent value="diary" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Diary & Assignments</h3>
            {onAddDiaryEntry && (
              <Button size="sm" onClick={onAddDiaryEntry}>
                <Plus className="h-4 w-4 mr-2" />
                Add Entry
              </Button>
            )}
                    </div>
          
          {diaryLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
          ) : diary && diary.length > 0 ? (
            <div className="space-y-4">
              {diary.map((entry) => (
                <Card key={entry.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium">{entry.subject_name}</h4>
                          <Badge variant={entry.is_completed ? "default" : "secondary"}>
                            {entry.is_completed ? (
                              <><CheckCircle className="h-3 w-3 mr-1" />Completed</>
                            ) : (
                              <><Clock className="h-3 w-3 mr-1" />Pending</>
                            )}
                          </Badge>
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
                  </div>
                </CardContent>
              </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No diary entries yet</p>
                </div>
              )}
        </TabsContent>

        {/* Scholarships Tab */}
        <TabsContent value="scholarships" className="space-y-4">
                      <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Scholarships & Awards</h3>
            {onAddScholarship && (
              <Button size="sm" onClick={onAddScholarship}>
                <Plus className="h-4 w-4 mr-2" />
                Add Scholarship
              </Button>
            )}
          </div>
          
          {scholarshipsLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                        </div>
          ) : scholarships && scholarships.length > 0 ? (
            <div className="space-y-4">
              {scholarships.map((scholarship) => (
                <Card key={scholarship.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium">{scholarship.scholarship_name}</h4>
                          <Badge className={getScholarshipTypeColor(scholarship.scholarship_name)}>
                            {scholarship.scholarship_name}
                          </Badge>
                          {scholarship.is_active && (
                            <Badge variant="outline" className="text-green-600">
                              Active
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>
                            Awarded: {format(new Date(scholarship.award_date), 'MMM dd, yyyy')}
                          </span>
                          <span>Amount: ${scholarship.amount_awarded.toLocaleString()}</span>
                          <span>Year: {scholarship.academic_year}</span>
                        </div>
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
      </Tabs>
    </div>
  )
}