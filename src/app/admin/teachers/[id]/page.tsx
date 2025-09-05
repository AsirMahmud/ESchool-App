"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Users,
  Award,
  Trash2,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTeacher, useUpdateTeacher, useDeleteTeacher, useTeacherSubjects, useTeacherClasses, useTeacherPerformance } from "@/hooks/use-teachers";
import { api, endpoints } from "@/lib/api";
import { useEmployeeAttendanceList, useMarkEmployeeAttendance } from "@/hooks/use-employees";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TeacherDetailPage() {
  const params = useParams();
  const router = useRouter();
  const teacherId = params.id as string;
  
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);


  // Only make API calls if teacherId is present and not the special route segment
  const isValidTeacherId = !!teacherId && teacherId !== "attendance";
  
  const { data: teacher, isLoading, error } = useTeacher(isValidTeacherId ? teacherId : "");
  const { data: subjects } = useTeacherSubjects(isValidTeacherId ? teacherId : "");
  const { data: classes } = useTeacherClasses(isValidTeacherId ? teacherId : "");
  const { data: performance } = useTeacherPerformance(isValidTeacherId ? teacherId : "");
  const attendanceEmployeeId = teacher?.teacher_id as unknown as string;
  const { data: attendance } = useEmployeeAttendanceList(attendanceEmployeeId || "");
  const markAttendance = useMarkEmployeeAttendance();
  
  const updateTeacherMutation = useUpdateTeacher();
  const deleteTeacherMutation = useDeleteTeacher();

  const [sectionSubjects, setSectionSubjects] = useState<any[]>([]);
  // Load per-section subject assignments for this teacher
  const loadSectionSubjects = async (tid: string) => {
    try {
      const data: any = await api.get(`${endpoints.sectionSubjects}?teacher=${encodeURIComponent(tid)}`);
      const list = Array.isArray(data) ? data : (Array.isArray(data?.results) ? data.results : []);
      setSectionSubjects(list);
    } catch (_) {
      setSectionSubjects([]);
    }
  };
  if (isValidTeacherId && sectionSubjects.length === 0) {
    // fire once after mount when teacherId is valid
    loadSectionSubjects(teacherId);
  }

  const [editForm, setEditForm] = useState({
    qualification: teacher?.qualification || "",
    specialization: teacher?.specialization || "",
    years_of_experience: teacher?.years_of_experience || 0,
    is_class_teacher: teacher?.is_class_teacher || false,
    max_classes: teacher?.max_classes || 5,
    bio: teacher?.bio || "",
  });

  const handleUpdateTeacher = () => {
    updateTeacherMutation.mutate({
      teacher_id: teacherId as unknown as number,
      ...editForm
    }, {
      onSuccess: () => {
        setIsEditing(false);
      }
    });
  };

  const handleDeleteTeacher = () => {
    deleteTeacherMutation.mutate(parseInt(teacherId), {
      onSuccess: () => {
        router.push('/admin/teachers');
      }
    });
  };

  if (!isValidTeacherId) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Invalid teacher ID</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading teacher details...</div>
      </div>
    );
  }

  if (error || !teacher) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error loading teacher details</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Teacher Details</h2>
          <p className="text-muted-foreground">
            View and manage teacher information
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Teacher Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src="/placeholder.svg?height=96&width=96"
                    alt={teacher.teacher_name}
                  />
                  <AvatarFallback className="text-2xl">
                    {teacher.teacher_name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="text-xl font-semibold">{teacher.teacher_name}</h3>
                  <p className="text-muted-foreground">{teacher.specialization}</p>
                  <Badge variant={teacher.is_class_teacher ? "default" : "secondary"} className="mt-2">
                    {teacher.is_class_teacher ? "Class Teacher" : "Subject Teacher"}
                  </Badge>
                </div>

                <div className="w-full space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{teacher.teacher_email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{teacher.teacher_phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{teacher.department_name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined {teacher.created_at ? new Date(teacher.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    }) : 'N/A'}</span>
                  </div>
                </div>

                <div className="flex gap-2 w-full">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete Teacher</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this teacher? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button 
                          variant="destructive" 
                          onClick={handleDeleteTeacher}
                          disabled={deleteTeacherMutation.isPending}
                        >
                          {deleteTeacherMutation.isPending ? "Deleting..." : "Delete"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Teacher Details */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="classes">Classes</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Teacher Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Qualification</Label>
                      <p className="text-sm text-muted-foreground">{teacher.qualification}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Specialization</Label>
                      <p className="text-sm text-muted-foreground">{teacher.specialization}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Years of Experience</Label>
                      <p className="text-sm text-muted-foreground">{teacher.years_of_experience}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Max Classes</Label>
                      <p className="text-sm text-muted-foreground">{teacher.max_classes}</p>
                    </div>
                  </div>
                  
                  {teacher.bio && (
                    <div>
                      <Label className="text-sm font-medium">Bio</Label>
                      <p className="text-sm text-muted-foreground mt-1">{teacher.bio}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subjects" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Assigned Subjects</CardTitle>
                  <CardDescription>
                    Subjects currently taught by this teacher
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {(subjects?.length || 0) + (sectionSubjects?.length || 0) === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No subjects assigned</div>
                  ) : (
                    <>
                      {subjects && subjects.length > 0 && (
                        <>
                          <div className="text-sm font-medium mb-2">General Subjects</div>
                          <Table className="mb-6">
                            <TableHeader>
                              <TableRow>
                                <TableHead>Subject</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {subjects.map((subject) => (
                                <TableRow key={`gen-${subject.id}`}>
                                  <TableCell>{subject.subject_name}</TableCell>
                                  <TableCell>{subject.subject_code}</TableCell>
                                  <TableCell>{subject.start_date ? new Date(subject.start_date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : 'N/A'}</TableCell>
                                  <TableCell>
                                    <Badge variant={subject.is_active ? "default" : "secondary"}>{subject.is_active ? "Active" : "Inactive"}</Badge>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </>
                      )}

                      {sectionSubjects && sectionSubjects.length > 0 && (
                        <>
                          <div className="text-sm font-medium mb-2">Per-Section Subjects</div>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Level</TableHead>
                                <TableHead>Section</TableHead>
                                <TableHead>Subject</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {sectionSubjects.map((ss: any) => (
                                <TableRow key={`sec-${ss.id}`}>
                                  <TableCell>{ss.level}</TableCell>
                                  <TableCell>{ss.section_name}</TableCell>
                                  <TableCell>{ss.subject_name} <Badge variant="outline">{ss.subject_code}</Badge></TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="classes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Assigned Classes</CardTitle>
                  <CardDescription>
                    Classes currently taught by this teacher
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {classes?.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No classes assigned
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Class</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>Start Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {classes?.map((cls) => (
                          <TableRow key={cls.id}>
                            <TableCell>{cls.class_room_name}</TableCell>
                            <TableCell>{cls.subject_name}</TableCell>
                            <TableCell>{cls.start_date ? new Date(cls.start_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit'
                            }) : 'N/A'}</TableCell>
                            <TableCell>
                              <Badge variant={cls.is_active ? "default" : "secondary"}>
                                {cls.is_active ? "Active" : "Inactive"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Records</CardTitle>
                  <CardDescription>
                    Teacher performance evaluations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {performance?.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No performance records available
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {performance?.map((perf) => (
                        <div key={perf.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">Performance Review</h4>
                              <p className="text-sm text-muted-foreground">
                                {perf.evaluation_date ? new Date(perf.evaluation_date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: '2-digit',
                                  day: '2-digit'
                                }) : 'N/A'}
                              </p>
                            </div>
                            <Badge variant="outline">{perf.overall_rating}</Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            <div>
                              <p className="text-xs text-muted-foreground">Academic Performance</p>
                              <p className="text-sm font-medium">{perf.academic_performance}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Classroom Management</p>
                              <p className="text-sm font-medium">{perf.classroom_management}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Student Interaction</p>
                              <p className="text-sm font-medium">{perf.student_interaction}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Professional Development</p>
                              <p className="text-sm font-medium">{perf.professional_development}</p>
                            </div>
                          </div>
                          {perf.comments && (
                            <div className="mt-4">
                              <p className="text-xs text-muted-foreground">Comments</p>
                              <p className="text-sm">{perf.comments}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance (Date-wise)</CardTitle>
                  <CardDescription>
                    View and mark attendance for this teacher.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Date</Label>
                      <Input type="date" id="att-date" onChange={(e) => {
                        // noop; list is for recent entries, marking uses selected date
                      }} />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <Select onValueChange={(v) => {
                        (document.getElementById('att-status') as HTMLInputElement).value = v
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="present">Present</SelectItem>
                          <SelectItem value="absent">Absent</SelectItem>
                          <SelectItem value="late">Late</SelectItem>
                          <SelectItem value="half_day">Half Day</SelectItem>
                          <SelectItem value="on_leave">On Leave</SelectItem>
                        </SelectContent>
                      </Select>
                      <input id="att-status" type="hidden" />
                    </div>
                    <div className="flex items-end">
                      <Button
                        onClick={() => {
                          const dateEl = document.getElementById('att-date') as HTMLInputElement
                          const statusEl = document.getElementById('att-status') as HTMLInputElement
                          const date = dateEl?.value
                          const status = (statusEl?.value as any) || 'present'
                          if (!attendanceEmployeeId || !date) {
                            alert('Select a date first')
                            return
                          }
                          markAttendance.mutate({
                            employeeId: attendanceEmployeeId,
                            data: { date, status }
                          })
                        }}
                        disabled={markAttendance.isPending || !attendanceEmployeeId}
                      >
                        {markAttendance.isPending ? 'Saving...' : 'Mark Attendance'}
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Label className="text-sm font-medium">Recent Records</Label>
                    {attendance && attendance.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Check-in</TableHead>
                            <TableHead>Check-out</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {attendance.slice(0, 10).map((rec) => (
                            <TableRow key={rec.id}>
                              <TableCell>{new Date(rec.date).toLocaleDateString()}</TableCell>
                              <TableCell><Badge>{rec.status}</Badge></TableCell>
                              <TableCell>{rec.check_in_time || '-'}</TableCell>
                              <TableCell>{rec.check_out_time || '-'}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-sm text-muted-foreground">No attendance records yet.</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Teacher Information</DialogTitle>
            <DialogDescription>
              Update teacher profile information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="qualification">Qualification</Label>
                <Input
                  id="qualification"
                  value={editForm.qualification}
                  onChange={(e) => setEditForm({ ...editForm, qualification: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  value={editForm.specialization}
                  onChange={(e) => setEditForm({ ...editForm, specialization: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  value={editForm.years_of_experience}
                  onChange={(e) => setEditForm({ ...editForm, years_of_experience: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="max_classes">Max Classes</Label>
                <Input
                  id="max_classes"
                  type="number"
                  value={editForm.max_classes}
                  onChange={(e) => setEditForm({ ...editForm, max_classes: parseInt(e.target.value) || 5 })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateTeacher}
              disabled={updateTeacherMutation.isPending}
            >
              {updateTeacherMutation.isPending ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
