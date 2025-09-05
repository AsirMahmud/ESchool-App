"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  Download,
  Filter,
  Plus,
  Search,
  Edit,
  Trash2,
  Check,
  X,
  Calendar,
} from "lucide-react";
import { useTeachers, useDeleteTeacher, useCreateTeacher, useAddTeacherSubject, useAddTeacherClass } from "@/hooks/use-teachers";
import { useEmployees, useCreateEmployee } from "@/hooks/use-employees";
import { useDepartments } from "@/hooks/use-departments";
import { useSubjects } from "@/hooks/use-subjects";
import { useClasses } from "@/hooks/use-classes";
import { format } from "date-fns";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function AdminTeachersPage() {
  const router = useRouter()
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false)
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  // Subject assignment form state
  const [assignmentForm, setAssignmentForm] = useState({
    teacher_id: "",
    subject: "",
    class_room: "",
    start_date: "",
    end_date: "",
    schedule_days: [] as string[],
    start_time: "",
    end_time: "",
  })

  const { data: teachers, isLoading, error } = useTeachers()
  
  const { data: employees } = useEmployees()
  const { data: departments } = useDepartments()
  const { data: subjects } = useSubjects()
  const { data: classes } = useClasses()
  
  const deleteTeacherMutation = useDeleteTeacher()
  const createEmployeeMutation = useCreateEmployee()
  const createTeacherMutation = useCreateTeacher()
  const addSubjectMutation = useAddTeacherSubject()
  const addClassMutation = useAddTeacherClass()

  // Form state for adding teacher
  const [teacherForm, setTeacherForm] = useState({
    // Employee fields
    name: "",
    email: "",
    phone: "",
    position: "Teacher",
    role: "teacher",
    join_date: "",
    department: "",
    salary: 0,
    address: "",
    // Teacher specific fields
    qualification: "",
    specialization: "",
    years_of_experience: 0,
    is_class_teacher: false,
    max_classes: 5,
    bio: "",
    // Teacher contact fields
    teacher_email: "",
    teacher_phone: "",
    teacher_address: "",
    emergency_contact: "",
    emergency_phone: "",
    // Teacher profile fields
    education: "",
    certifications: "",
    skills: "",
    experience_details: "",
    achievements: "",
  })

  const handleDeleteTeacher = (id: number) => {
    if (confirm('Are you sure you want to delete this teacher?')) {
      deleteTeacherMutation.mutate(id)
    }
  }

  const handleAssignSubject = async () => {
    if (!assignmentForm.teacher_id || !assignmentForm.subject || !assignmentForm.class_room || !assignmentForm.start_date) {
      alert('Please fill in all required fields (Teacher, Subject, Class, Start Date)')
      return
    }

    try {
      console.log('Assignment form data:', assignmentForm)
      console.log('Available teachers:', teachers)
      console.log('Available subjects:', subjects)
      console.log('Available classes:', classes)
      
      // Validate that the selected data exists
      const selectedTeacher = teachers?.find(t => t.teacher_id.toString() === assignmentForm.teacher_id)
      const selectedSubject = subjects?.find(s => s.s_code === assignmentForm.subject)
      const selectedClass = classes?.find(c => c.id.toString() === assignmentForm.class_room)
      
      console.log('Selected teacher:', selectedTeacher)
      console.log('Selected subject:', selectedSubject)
      console.log('Selected class:', selectedClass)
      
      if (!selectedTeacher) {
        alert('Selected teacher not found')
        return
      }
      if (!selectedSubject) {
        alert('Selected subject not found')
        return
      }
      if (!selectedClass) {
        alert('Selected class not found')
        return
      }
      
      const assignmentData = {
        subject: assignmentForm.subject, // Use subject code directly (string)
        start_date: assignmentForm.start_date,
        end_date: assignmentForm.end_date || undefined,
      }

      console.log('Assigning subject to teacher:', {
        teacherId: parseInt(assignmentForm.teacher_id),
        data: assignmentData
      })
      
      const subjectResult = await addSubjectMutation.mutateAsync({
        teacherId: parseInt(assignmentForm.teacher_id),
        data: assignmentData
      })
      
      console.log('Subject assignment result:', subjectResult)

      // Also assign the class if selected
      if (assignmentForm.class_room) {
        const classData = {
          class_room: parseInt(assignmentForm.class_room),
          subject: assignmentForm.subject, // Use subject code directly (string)
          start_date: assignmentForm.start_date,
          end_date: assignmentForm.end_date || undefined,
        }

        console.log('Assigning class to teacher:', {
          teacherId: parseInt(assignmentForm.teacher_id),
          data: classData
        })
        
        const classResult = await addClassMutation.mutateAsync({
          teacherId: parseInt(assignmentForm.teacher_id),
          data: classData
        })
        
        console.log('Class assignment result:', classResult)
      }

      alert('Subject and class assigned successfully!')
      setIsAddSubjectOpen(false)
      setAssignmentForm({
        teacher_id: "",
        subject: "",
        class_room: "",
        start_date: "",
        end_date: "",
        schedule_days: [],
        start_time: "",
        end_time: "",
      })
    } catch (error) {
      console.error('Failed to assign subject:', error)
      console.error('Error details:', error)
      alert(`Failed to assign subject: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleCreateTeacher = async () => {
    // Basic form validation
    if (!teacherForm.name || !teacherForm.email || !teacherForm.phone || !teacherForm.department || !teacherForm.join_date) {
      alert('Please fill in all required fields (Name, Email, Phone, Department, Join Date)')
      return
    }

    try {
      // First create the employee record
      const employeeData = {
        name: teacherForm.name,
        email: teacherForm.email,
        phone: teacherForm.phone,
        position: teacherForm.position,
        role: teacherForm.role,
        join_date: teacherForm.join_date,
        department: teacherForm.department, // This should be the department name (d_name)
        salary: teacherForm.salary || 0, // Keep as number for type compatibility
        address: teacherForm.address || "", // Keep as string for type compatibility
      }

      console.log('Creating employee record with data:', employeeData)
      const employee = await createEmployeeMutation.mutateAsync(employeeData)
      console.log('Employee created successfully:', employee)
      
      // Then create the teacher profile linked to the employee
      const teacherData = {
        teacher_id: employee.emp_id as any, // Use emp_id (UUID) as the primary key - cast to any to bypass type check
        qualification: teacherForm.qualification || "",
        specialization: teacherForm.specialization || "",
        years_of_experience: teacherForm.years_of_experience || 0,
        is_class_teacher: teacherForm.is_class_teacher,
        max_classes: teacherForm.max_classes || 5,
        bio: teacherForm.bio || "",
        // Teacher contact fields
        email: teacherForm.teacher_email || "",
        phone: teacherForm.teacher_phone || "",
        address: teacherForm.teacher_address || "",
        emergency_contact: teacherForm.emergency_contact || "",
        emergency_phone: teacherForm.emergency_phone || "",
        // Teacher profile fields
        education: teacherForm.education || "",
        certifications: teacherForm.certifications || "",
        skills: teacherForm.skills || "",
        experience_details: teacherForm.experience_details || "",
        achievements: teacherForm.achievements || "",
      }

      console.log('Creating teacher profile with data:', teacherData)
      await createTeacherMutation.mutateAsync(teacherData)
      console.log('Teacher profile created successfully')
      
      // Show success message
      alert(`Teacher "${teacherForm.name}" has been successfully added as both an employee and teacher!`)
      
      // Close dialog and reset form
      setIsAddTeacherOpen(false)
      setTeacherForm({
        name: "",
        email: "",
        phone: "",
        position: "Teacher",
        role: "teacher",
        join_date: "",
        department: "",
        salary: 0,
        address: "",
        qualification: "",
        specialization: "",
        years_of_experience: 0,
        is_class_teacher: false,
        max_classes: 5,
        bio: "",
        // Teacher contact fields
        teacher_email: "",
        teacher_phone: "",
        teacher_address: "",
        emergency_contact: "",
        emergency_phone: "",
        // Teacher profile fields
        education: "",
        certifications: "",
        skills: "",
        experience_details: "",
        achievements: "",
      })
    } catch (error) {
      console.error('Failed to create teacher:', error)
      console.error('Error details:', error)
      alert(`Failed to create teacher: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  // Filter teachers based on search and department
  const filteredTeachers = teachers?.filter(teacher => {
    const matchesSearch = teacher.teacher_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.teacher_email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || !selectedDepartment || teacher.department_name === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading teachers...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error loading teachers: {error.message}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Teacher Management
          </h2>
          <p className="text-muted-foreground">
            Manage teachers, attendance, and subject assignments.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => router.push('/admin/teachers/attendance')}
          >
            <Calendar className="h-4 w-4" />
            Attendance
          </Button>
          <Dialog open={isAddTeacherOpen} onOpenChange={setIsAddTeacherOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Teacher
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Teacher</DialogTitle>
                <DialogDescription>
                  Create a new teacher profile. The teacher will automatically be added as an employee in the system.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={teacherForm.name}
                      onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={teacherForm.email}
                      onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      value={teacherForm.phone}
                      onChange={(e) => setTeacherForm({ ...teacherForm, phone: e.target.value })}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="join_date">Join Date *</Label>
                    <Input
                      id="join_date"
                      type="date"
                      value={teacherForm.join_date}
                      onChange={(e) => setTeacherForm({ ...teacherForm, join_date: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="department">Department *</Label>
                    <Select value={teacherForm.department} onValueChange={(value) => setTeacherForm({ ...teacherForm, department: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.isArray(departments) && departments.map((dept) => (
                          <SelectItem key={dept.d_name} value={dept.d_name}>
                            {dept.d_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="salary">Salary</Label>
                    <Input
                      id="salary"
                      type="number"
                      value={teacherForm.salary}
                      onChange={(e) => setTeacherForm({ ...teacherForm, salary: parseInt(e.target.value) || 0 })}
                      placeholder="Enter salary"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={teacherForm.address}
                    onChange={(e) => setTeacherForm({ ...teacherForm, address: e.target.value })}
                    placeholder="Enter address"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="qualification">Qualification</Label>
                    <Input
                      id="qualification"
                      value={teacherForm.qualification}
                      onChange={(e) => setTeacherForm({ ...teacherForm, qualification: e.target.value })}
                      placeholder="Enter qualification"
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      value={teacherForm.specialization}
                      onChange={(e) => setTeacherForm({ ...teacherForm, specialization: e.target.value })}
                      placeholder="Enter specialization"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      type="number"
                      value={teacherForm.years_of_experience}
                      onChange={(e) => setTeacherForm({ ...teacherForm, years_of_experience: parseInt(e.target.value) || 0 })}
                      placeholder="Enter years of experience"
                    />
                  </div>
                  <div>
                    <Label htmlFor="max_classes">Max Classes</Label>
                    <Input
                      id="max_classes"
                      type="number"
                      value={teacherForm.max_classes}
                      onChange={(e) => setTeacherForm({ ...teacherForm, max_classes: parseInt(e.target.value) || 5 })}
                      placeholder="Enter max classes"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_class_teacher"
                    checked={teacherForm.is_class_teacher}
                    onCheckedChange={(checked) => setTeacherForm({ ...teacherForm, is_class_teacher: !!checked })}
                  />
                  <Label htmlFor="is_class_teacher">Class Teacher</Label>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={teacherForm.bio}
                    onChange={(e) => setTeacherForm({ ...teacherForm, bio: e.target.value })}
                    placeholder="Enter teacher bio"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="teacher_email">Personal Email</Label>
                    <Input
                      id="teacher_email"
                      type="email"
                      value={teacherForm.teacher_email}
                      onChange={(e) => setTeacherForm({ ...teacherForm, teacher_email: e.target.value })}
                      placeholder="Enter personal email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="teacher_phone">Personal Phone</Label>
                    <Input
                      id="teacher_phone"
                      value={teacherForm.teacher_phone}
                      onChange={(e) => setTeacherForm({ ...teacherForm, teacher_phone: e.target.value })}
                      placeholder="Enter personal phone"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="teacher_address">Personal Address</Label>
                  <Textarea
                    id="teacher_address"
                    value={teacherForm.teacher_address}
                    onChange={(e) => setTeacherForm({ ...teacherForm, teacher_address: e.target.value })}
                    placeholder="Enter personal address"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergency_contact">Emergency Contact</Label>
                    <Input
                      id="emergency_contact"
                      value={teacherForm.emergency_contact}
                      onChange={(e) => setTeacherForm({ ...teacherForm, emergency_contact: e.target.value })}
                      placeholder="Enter emergency contact name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergency_phone">Emergency Phone</Label>
                    <Input
                      id="emergency_phone"
                      value={teacherForm.emergency_phone}
                      onChange={(e) => setTeacherForm({ ...teacherForm, emergency_phone: e.target.value })}
                      placeholder="Enter emergency contact phone"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="education">Education</Label>
                  <Textarea
                    id="education"
                    value={teacherForm.education}
                    onChange={(e) => setTeacherForm({ ...teacherForm, education: e.target.value })}
                    placeholder="Enter educational background"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="certifications">Certifications</Label>
                  <Textarea
                    id="certifications"
                    value={teacherForm.certifications}
                    onChange={(e) => setTeacherForm({ ...teacherForm, certifications: e.target.value })}
                    placeholder="Enter professional certifications"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="skills">Skills</Label>
                  <Textarea
                    id="skills"
                    value={teacherForm.skills}
                    onChange={(e) => setTeacherForm({ ...teacherForm, skills: e.target.value })}
                    placeholder="Enter teaching skills and competencies"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="experience_details">Experience Details</Label>
                  <Textarea
                    id="experience_details"
                    value={teacherForm.experience_details}
                    onChange={(e) => setTeacherForm({ ...teacherForm, experience_details: e.target.value })}
                    placeholder="Enter detailed work experience"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="achievements">Achievements</Label>
                  <Textarea
                    id="achievements"
                    value={teacherForm.achievements}
                    onChange={(e) => setTeacherForm({ ...teacherForm, achievements: e.target.value })}
                    placeholder="Enter awards and achievements"
                    rows={2}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddTeacherOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateTeacher} 
                  disabled={createEmployeeMutation.isPending || createTeacherMutation.isPending}
                >
                  {createEmployeeMutation.isPending || createTeacherMutation.isPending ? "Creating..." : "Create Teacher"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Teacher List</TabsTrigger>
          <TabsTrigger value="subjects">Subject Assignment</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>All Teachers</CardTitle>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search teachers..."
                      className="pl-8 w-full sm:w-[250px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {Array.isArray(departments) && departments.map((dept) => (
                        <SelectItem key={dept.d_name} value={dept.d_name}>
                          {dept.d_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Joined Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeachers?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        No teachers found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    Array.isArray(filteredTeachers) && filteredTeachers.map((teacher) => (
                      <TableRow key={teacher.teacher_id}>
                        <TableCell className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage
                              src={`/placeholder.svg?height=36&width=36&text=${teacher.teacher_name.charAt(0)}`}
                            />
                            <AvatarFallback>
                              {teacher.teacher_name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p 
                              className="font-medium cursor-pointer hover:text-primary"
                              onClick={() => router.push(`/admin/teachers/${teacher.teacher_id}`)}
                            >
                              {teacher.teacher_name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {teacher.teacher_email}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{teacher.department_name}</TableCell>
                        <TableCell>{teacher.teacher_phone}</TableCell>
                        <TableCell>
                          {teacher.created_at ? new Date(teacher.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                          }) : 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={teacher.is_class_teacher ? "default" : "secondary"}>
                            {teacher.is_class_teacher ? "Class Teacher" : "Subject Teacher"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => router.push(`/admin/teachers/${teacher.teacher_id}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteTeacher(Number(teacher.teacher_id))}
                            disabled={deleteTeacherMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredTeachers?.length || 0} of {teachers?.length || 0} teachers
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>


        <TabsContent value="subjects" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Subject Assignment</CardTitle>
                  <CardDescription>
                    Assign subjects and classes to teachers
                  </CardDescription>
                </div>
                <Dialog open={isAddSubjectOpen} onOpenChange={setIsAddSubjectOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      New Assignment
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Assign Subject to Teacher</DialogTitle>
                      <DialogDescription>
                        Assign a subject and class to a teacher.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="teacher-select">Teacher *</Label>
                        <Select 
                          value={assignmentForm.teacher_id} 
                          onValueChange={(value) => {
                            setAssignmentForm({ ...assignmentForm, teacher_id: value })
                            const teacher = teachers?.find(t => t.teacher_id.toString() === value)
                            setSelectedTeacher(teacher)
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select teacher" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.isArray(teachers) && teachers.map((teacher) => (
                              <SelectItem key={teacher.teacher_id} value={teacher.teacher_id.toString()}>
                                {teacher.teacher_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="subject-select">Subject *</Label>
                        <Select 
                          value={assignmentForm.subject} 
                          onValueChange={(value) => setAssignmentForm({ ...assignmentForm, subject: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.isArray(subjects) && subjects.map((subject) => (
                              <SelectItem key={subject.s_code} value={subject.s_code}>
                                {subject.s_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="class-select">Class *</Label>
                        <Select 
                          value={assignmentForm.class_room} 
                          onValueChange={(value) => setAssignmentForm({ ...assignmentForm, class_room: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.isArray(classes) && classes.map((cls) => (
                              <SelectItem key={cls.id} value={cls.id.toString()}>
                                {cls.room_name || `Room ${cls.room_no}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="start_date">Start Date *</Label>
                          <Input
                            id="start_date"
                            type="date"
                            value={assignmentForm.start_date}
                            onChange={(e) => setAssignmentForm({ ...assignmentForm, start_date: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="end_date">End Date</Label>
                          <Input
                            id="end_date"
                            type="date"
                            value={assignmentForm.end_date}
                            onChange={(e) => setAssignmentForm({ ...assignmentForm, end_date: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="start_time">Start Time</Label>
                          <Input
                            id="start_time"
                            type="time"
                            value={assignmentForm.start_time}
                            onChange={(e) => setAssignmentForm({ ...assignmentForm, start_time: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="end_time">End Time</Label>
                          <Input
                            id="end_time"
                            type="time"
                            value={assignmentForm.end_time}
                            onChange={(e) => setAssignmentForm({ ...assignmentForm, end_time: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Schedule Days</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                            <div key={day} className="flex items-center space-x-2">
                              <Checkbox
                                id={day}
                                checked={assignmentForm.schedule_days.includes(day)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setAssignmentForm({
                                      ...assignmentForm,
                                      schedule_days: [...assignmentForm.schedule_days, day]
                                    })
                                  } else {
                                    setAssignmentForm({
                                      ...assignmentForm,
                                      schedule_days: assignmentForm.schedule_days.filter(d => d !== day)
                                    })
                                  }
                                }}
                              />
                              <Label htmlFor={day} className="text-sm">{day}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddSubjectOpen(false)}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleAssignSubject}
                        disabled={addSubjectMutation.isPending || addClassMutation.isPending}
                      >
                        {addSubjectMutation.isPending || addClassMutation.isPending ? "Assigning..." : "Assign"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: 1,
                      teacher: "Dr. Robert Johnson",
                      subject: "Physics",
                      class: "12A",
                      schedule: "Mon, Wed, Fri (10:00 - 11:00 AM)",
                      students: 32,
                    },
                    {
                      id: 2,
                      teacher: "Dr. Robert Johnson",
                      subject: "Chemistry",
                      class: "11B",
                      schedule: "Tue, Thu (09:00 - 10:30 AM)",
                      students: 28,
                    },
                    {
                      id: 3,
                      teacher: "Sarah Williams",
                      subject: "Mathematics",
                      class: "10A",
                      schedule: "Mon, Tue, Wed (08:00 - 09:00 AM)",
                      students: 35,
                    },
                    {
                      id: 4,
                      teacher: "Michael Brown",
                      subject: "English Literature",
                      class: "12C",
                      schedule: "Wed, Fri (01:00 - 02:30 PM)",
                      students: 30,
                    },
                    {
                      id: 5,
                      teacher: "Emily Davis",
                      subject: "History",
                      class: "9B",
                      schedule: "Mon, Thu (11:00 AM - 12:00 PM)",
                      students: 33,
                    },
                  ].map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell>{assignment.teacher}</TableCell>
                      <TableCell>{assignment.subject}</TableCell>
                      <TableCell>{assignment.class}</TableCell>
                      <TableCell>{assignment.schedule}</TableCell>
                      <TableCell>{assignment.students}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
