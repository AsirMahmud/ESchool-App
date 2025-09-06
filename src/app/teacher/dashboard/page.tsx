'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Calendar,
  Clock,
  Users,
  FileText,
  GraduationCap,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  ClipboardCheck,
  MessageSquare,
  ChevronRight,
  Plus
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useCurrentTeacher } from '@/hooks/use-teachers'

export default function TeacherDashboard() {
  const { data: teacher, isLoading: teacherLoading } = useCurrentTeacher()

  if (teacherLoading) {
  return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading teacher dashboard...</p>
              </div>
                </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {teacher?.teacher_name || 'Teacher'}!
              </h1>
          <p className="text-gray-600">
            {teacher?.department_name} • {teacher?.specialization}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="px-3 py-1">
            {teacher?.years_of_experience} years experience
          </Badge>
          {teacher?.is_class_teacher && (
            <Badge className="px-3 py-1">Class Teacher</Badge>
          )}
        </div>
            </div>

      {/* Quick Action Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/teacher/attendance">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <ClipboardCheck className="h-8 w-8 mb-2 text-blue-600" />
              <h3 className="font-medium">Take Attendance</h3>
              <p className="text-xs text-gray-500 mt-1">Mark student attendance</p>
                </CardContent>
              </Card>
        </Link>
        
        <Link href="/teacher/exams">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <GraduationCap className="h-8 w-8 mb-2 text-green-600" />
              <h3 className="font-medium">Exams & Grades</h3>
              <p className="text-xs text-gray-500 mt-1">Manage exams and marks</p>
                </CardContent>
              </Card>
        </Link>
        
        <Link href="/teacher/diary">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <FileText className="h-8 w-8 mb-2 text-purple-600" />
              <h3 className="font-medium">Student Diary</h3>
              <p className="text-xs text-gray-500 mt-1">Create assignments</p>
                </CardContent>
              </Card>
        </Link>
        
        <Link href="/teacher/subjects">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <BookOpen className="h-8 w-8 mb-2 text-orange-600" />
              <h3 className="font-medium">My Subjects</h3>
              <p className="text-xs text-gray-500 mt-1">View assigned subjects</p>
                </CardContent>
              </Card>
        </Link>
            </div>

      {/* Main Dashboard Content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* My Subjects Overview */}
              <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              My Subjects
            </CardTitle>
            <CardDescription>Subjects you're currently teaching</CardDescription>
                </CardHeader>
                <CardContent>
            <div className="space-y-3">
              {teacher?.current_subjects?.slice(0, 3).map((subject, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{subject.subject_name}</p>
                    <p className="text-sm text-gray-500">{subject.subject_code}</p>
                    {subject.section_name && (
                      <p className="text-xs text-blue-600">Section: {subject.section_name}</p>
                    )}
                    </div>
                  <Badge variant="outline">Active</Badge>
                    </div>
              )) || (
                <p className="text-gray-500 text-sm">No subjects assigned yet</p>
              )}
              {teacher?.current_subjects && teacher.current_subjects.length > 3 && (
                <p className="text-sm text-blue-600">+{teacher.current_subjects.length - 3} more subjects</p>
              )}
                  </div>
                </CardContent>
              </Card>

        {/* My Classes Overview */}
              <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              My Classes
            </CardTitle>
            <CardDescription>Classes you're currently teaching</CardDescription>
                </CardHeader>
                <CardContent>
            <div className="space-y-3">
              {teacher?.current_classes?.slice(0, 3).map((classItem, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{classItem.class_room_name}</p>
                    <p className="text-sm text-gray-500">{classItem.subject_name}</p>
                        </div>
                  <Badge variant="outline">Active</Badge>
                          </div>
              )) || (
                <p className="text-gray-500 text-sm">No classes assigned yet</p>
              )}
              {teacher?.current_classes && teacher.current_classes.length > 3 && (
                <p className="text-sm text-green-600">+{teacher.current_classes.length - 3} more classes</p>
              )}
                  </div>
                </CardContent>
              </Card>

        {/* Quick Stats */}
              <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Quick Stats
            </CardTitle>
            <CardDescription>Your teaching overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Subjects</span>
                <span className="font-semibold">{teacher?.current_subjects?.length || 0}</span>
                        </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Classes</span>
                <span className="font-semibold">{teacher?.current_classes?.length || 0}</span>
                      </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Experience</span>
                <span className="font-semibold">{teacher?.years_of_experience || 0} years</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Max Classes</span>
                <span className="font-semibold">{teacher?.max_classes || 0}</span>
              </div>
                  </div>
                </CardContent>
              </Card>
            </div>

      {/* Recent Activities & Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Today's Schedule */}
                <Card>
                  <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Your classes for today</CardDescription>
                  </CardHeader>
                  <CardContent>
            <div className="space-y-3">
              {/* Mock schedule data - in real app this would come from API */}
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                  <p className="font-medium">Mathematics</p>
                  <p className="text-sm text-gray-500">Class 10-A • Room 201</p>
                      </div>
                <div className="text-right">
                  <p className="text-sm font-medium">9:00 AM</p>
                  <Badge variant="outline" className="text-xs">Next</Badge>
                      </div>
                    </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Physics</p>
                  <p className="text-sm text-gray-500">Class 11-B • Room 305</p>
                              </div>
                <div className="text-right">
                  <p className="text-sm font-medium">11:00 AM</p>
                  <Badge variant="secondary" className="text-xs">Upcoming</Badge>
                              </div>
                    </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                  <p className="font-medium">Chemistry Lab</p>
                  <p className="text-sm text-gray-500">Class 12-A • Lab 1</p>
                      </div>
                <div className="text-right">
                  <p className="text-sm font-medium">2:00 PM</p>
                  <Badge variant="secondary" className="text-xs">Later</Badge>
                      </div>
                    </div>
                    </div>
                  </CardContent>
                </Card>

        {/* Pending Tasks */}
                <Card>
                  <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              Pending Tasks
                          </CardTitle>
            <CardDescription>Items requiring your attention</CardDescription>
                        </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Grade Midterm Exams</p>
                  <p className="text-xs text-gray-500">Mathematics • Due: Tomorrow</p>
                          </div>
                <Badge variant="destructive" className="text-xs">High</Badge>
                          </div>
              
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <Clock className="h-4 w-4 text-yellow-500 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Submit Attendance Report</p>
                  <p className="text-xs text-gray-500">Weekly Report • Due: Friday</p>
                            </div>
                <Badge variant="outline" className="text-xs">Medium</Badge>
                          </div>
              
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Update Lesson Plans</p>
                  <p className="text-xs text-gray-500">Next Week • Due: Sunday</p>
                                </div>
                <Badge variant="secondary" className="text-xs">Low</Badge>
                              </div>
                            </div>
                        </CardContent>
                      </Card>
                    </div>

      {/* Quick Access Links */}
                <Card>
                  <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Quick Actions
                          </CardTitle>
          <CardDescription>Frequently used features</CardDescription>
                        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/teacher/profile">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                My Profile
                              </Button>
            </Link>
            
            <Link href="/teacher/settings">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Settings
                                  </Button>
            </Link>
            
            <Link href="/teacher/schedule">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Full Schedule
                                  </Button>
            </Link>
            
            <Button variant="outline" className="w-full justify-start">
              <MessageSquare className="h-4 w-4 mr-2" />
              Help & Support
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
          </div>
  )
}