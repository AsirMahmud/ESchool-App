"use client"

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  FileText,
  Award,
  Edit,
} from "lucide-react";
import Link from "next/link";
import { useEmployee } from "@/hooks/use-employees";

export default function EmployeeProfilePage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const { id } = React.use(params as any)
  const { data: employee, isLoading, error } = useEmployee(id)

  if (isLoading) {
    return <div className="py-10 text-center">Loading profile...</div>
  }

  if (error || !employee) {
    return <div className="py-10 text-center text-red-600">Failed to load employee.</div>
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/employee">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Employee Profile</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/admin/employee/${id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/admin/employee/${id}/permissions`}>
              Manage Permissions
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32">
                <AvatarImage src={(employee as any).avatar || "/placeholder.svg"} alt={employee.name || 'Employee'} />
                <AvatarFallback>
                  {((employee.name || '')
                    .split(/\s+/)
                    .filter(Boolean)
                    .map((n: string) => n[0])
                    .slice(0, 2)
                    .join("") || (employee.email?.[0]?.toUpperCase() ?? 'E'))}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-bold">{employee.name}</h2>
              <p className="text-muted-foreground">{employee.position || '-'}</p>
              <Badge
                variant="outline"
                className="mt-2 bg-purple-100 text-purple-800 border-purple-200"
              >
                {employee.role || '-'}
              </Badge>
              <Badge
                variant={(employee.status || '').toLowerCase() === "active" ? "default" : "secondary"}
                className="mt-2"
              >
                {employee.status || '-'}
              </Badge>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{employee.email || '-'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{employee.phone || '-'}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{(employee as any).address || '-'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{(employee as any).department_name || (employee as any).department || '-'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined: {employee.join_date || '-'}</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium">Skills & Expertise</h3>
              {(() => {
                const rawSkills: any = (employee as any).skills
                const skills = Array.isArray(rawSkills)
                  ? rawSkills
                  : typeof rawSkills === 'string'
                  ? rawSkills.split(/[\n,]+/).map((s: string) => s.trim()).filter(Boolean)
                  : []
                if (!skills.length) {
                  return <p className="mt-2 text-sm text-muted-foreground">No skills provided.</p>
                }
                return (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {skills.map((skill: string, index: number) => (
                      <Badge key={`${skill}-${index}`} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )
              })()}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">Full Name</p>
                <p className="font-medium">{employee.name || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-medium">{employee.email || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium">{employee.phone || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="font-medium">{(employee as any).address || '-'}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-muted-foreground">About</p>
                <p className="font-medium whitespace-pre-wrap">{(employee as any).about || '-'}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Employment</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">Position</p>
                <p className="font-medium">{employee.position || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Role</p>
                <p className="font-medium capitalize">{(employee.role || '').replace('_', ' ') || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Department</p>
                <p className="font-medium">{(employee as any).department_name || (employee as any).department || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Teacher Room</p>
                <p className="font-medium">{(employee as any).teacher_room || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Join Date</p>
                <p className="font-medium">{employee.join_date || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="font-medium capitalize">{(employee.status || '').replace('_', ' ') || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Years of Service</p>
                <p className="font-medium">{(employee as any).years_of_service ?? '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Is Teacher</p>
                <p className="font-medium">{(employee as any).is_teacher ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Salary</p>
                <p className="font-medium">{(employee as any).salary ?? '-'}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Qualifications</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <p className="text-xs text-muted-foreground">Education</p>
                <p className="font-medium whitespace-pre-wrap">{(employee as any).education || '-'}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-muted-foreground">Experience</p>
                <p className="font-medium whitespace-pre-wrap">{(employee as any).experience || '-'}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-muted-foreground">Certifications</p>
                <p className="font-medium whitespace-pre-wrap">{(employee as any).certification || '-'}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">Contact Name</p>
                <p className="font-medium">{(employee as any).emergency_contact || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Contact Phone</p>
                <p className="font-medium">{(employee as any).emergency_phone || '-'}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Metadata</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">Employee ID</p>
                <p className="font-medium break-all">{(employee as any).emp_id || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Created</p>
                <p className="font-medium">{(employee as any).created_at || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Updated</p>
                <p className="font-medium">{(employee as any).updated_at || '-'}</p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="attendance" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="deptExp">Department Experience</TabsTrigger>
            </TabsList>
            <TabsContent value="attendance" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Attendance Records
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {Array.isArray((employee as any).attendance_records) && (employee as any).attendance_records.length > 0 ? (
                    <ul className="space-y-2 text-sm">
                      {(employee as any).attendance_records.map((r: any) => (
                        <li key={r.id} className="flex items-center justify-between rounded-md border p-2">
                          <span>{r.date}</span>
                          <span className="capitalize">{(r.status || '').replace('_',' ')}</span>
                          <span>{r.check_in_time || '-'}</span>
                          <span>{r.check_out_time || '-'}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">No attendance records.</span>
                      <Button variant="outline" asChild>
                        <Link href={`/admin/employee/${id}/attendance`}>Mark / View Attendance</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="deptExp" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Department Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {Array.isArray((employee as any).experiences) && (employee as any).experiences.length > 0 ? (
                    <ul className="space-y-2 text-sm">
                      {(employee as any).experiences.map((e: any) => (
                        <li key={e.id} className="rounded-md border p-2">
                          <div className="font-medium">{e.department_name || e.department}</div>
                          <div className="text-muted-foreground">{e.position}</div>
                          <div className="text-xs text-muted-foreground">{e.start_date} → {e.end_date || 'Present'}</div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No department experience.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
