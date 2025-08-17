import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  BookOpen,
  CalendarIcon,
  Download,
  Edit,
  FileText,
  GraduationCap,
  Mail,
  Phone,
  PieChart,
  User,
  UserCircle,
} from "lucide-react";
import Link from "next/link";

export default function StudentProfilePage({
  params,
}: {
  params: { id: string };
}) {
  // This would normally be fetched from an API
  const student = {
    id: params.id,
    name: "Emma Johnson",
    studentId: "S2025-001",
    grade: "Grade 10",
    section: "A",
    dateOfBirth: "2008-05-15",
    gender: "Female",
    address: "123 School Lane, Cityville, State 12345",
    email: "emma.johnson@school.edu",
    phone: "+1 (555) 123-4567",
    parentName: "Robert & Sarah Johnson",
    parentEmail: "rjohnson@example.com",
    parentPhone: "+1 (555) 987-6543",
    enrollmentDate: "2020-09-01",
    status: "Active",
    attendance: "92%",
    gpa: "3.8",
    bloodGroup: "O+",
    emergencyContact: "Sarah Johnson (+1 555-987-6543)",
    medicalConditions:
      "Mild asthma, requires inhaler during physical activities",
    subjects: [
      { name: "Mathematics", teacher: "Mr. Anderson", grade: "A-" },
      { name: "Science", teacher: "Ms. Rivera", grade: "A" },
      { name: "English", teacher: "Mrs. Thompson", grade: "B+" },
      { name: "History", teacher: "Mr. Garcia", grade: "A" },
      { name: "Physical Education", teacher: "Coach Wilson", grade: "A+" },
    ],
    recentAttendance: [
      { date: "2023-05-01", status: "Present" },
      { date: "2023-05-02", status: "Present" },
      { date: "2023-05-03", status: "Absent", reason: "Medical appointment" },
      { date: "2023-05-04", status: "Present" },
      { date: "2023-05-05", status: "Present" },
    ],
    fees: [
      {
        id: "F2023-001",
        description: "Tuition Fee - Term 1",
        amount: "$2,500",
        status: "Paid",
        dueDate: "2023-01-15",
        paidDate: "2023-01-10",
      },
      {
        id: "F2023-002",
        description: "Laboratory Fee",
        amount: "$300",
        status: "Paid",
        dueDate: "2023-01-15",
        paidDate: "2023-01-10",
      },
      {
        id: "F2023-003",
        description: "Tuition Fee - Term 2",
        amount: "$2,500",
        status: "Pending",
        dueDate: "2023-04-15",
      },
    ],
    documents: [
      {
        name: "Birth Certificate",
        uploadDate: "2020-08-15",
        status: "Verified",
      },
      {
        name: "Immunization Records",
        uploadDate: "2020-08-15",
        status: "Verified",
      },
      {
        name: "Previous School Records",
        uploadDate: "2020-08-20",
        status: "Verified",
      },
      {
        name: "Medical Information Form",
        uploadDate: "2023-01-05",
        status: "Verified",
      },
    ],
    activities: [
      { name: "Science Club", role: "Member" },
      { name: "Basketball Team", role: "Captain" },
      { name: "Student Council", role: "Class Representative" },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/students">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Student Profile</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/admin/students/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">
              Student Information
            </CardTitle>
            <UserCircle className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <div className="relative h-32 w-32 overflow-hidden rounded-full">
                <div className="flex h-full w-full items-center justify-center bg-muted text-4xl font-semibold text-muted-foreground">
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <p className="text-sm text-muted-foreground">
                {student.studentId}
              </p>
              <div className="mt-2 flex justify-center">
                <Badge variant="outline" className="mx-1">
                  {student.grade}
                </Badge>
                <Badge variant="outline" className="mx-1">
                  Section {student.section}
                </Badge>
                <Badge className="mx-1">{student.status}</Badge>
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Gender</span>
                </div>
                <span className="text-sm font-medium">{student.gender}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Date of Birth</span>
                </div>
                <span className="text-sm font-medium">
                  {new Date(student.dateOfBirth).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Email</span>
                </div>
                <span className="text-sm font-medium">{student.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Phone</span>
                </div>
                <span className="text-sm font-medium">{student.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Parent/Guardian</span>
                </div>
                <span className="text-sm font-medium">
                  {student.parentName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Parent Phone</span>
                </div>
                <span className="text-sm font-medium">
                  {student.parentPhone}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Enrollment Date</span>
                </div>
                <span className="text-sm font-medium">
                  {new Date(student.enrollmentDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Student Details</CardTitle>
            <CardDescription>
              Comprehensive information about {student.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="academics">Academics</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                <TabsTrigger value="fees">Fees</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Attendance Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {student.attendance}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Current academic year
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">GPA</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{student.gpa}</div>
                      <p className="text-xs text-muted-foreground">
                        Current academic year
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Activities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {student.activities.length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Extracurricular activities
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Additional Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-medium">Address</h4>
                        <p className="text-sm text-muted-foreground">
                          {student.address}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Blood Group</h4>
                        <p className="text-sm text-muted-foreground">
                          {student.bloodGroup}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">
                          Emergency Contact
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {student.emergencyContact}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">
                          Medical Conditions
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {student.medicalConditions}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Extracurricular Activities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Activity</TableHead>
                          <TableHead>Role</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {student.activities.map((activity, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {activity.name}
                            </TableCell>
                            <TableCell>{activity.role}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="academics" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Current Subjects
                    </CardTitle>
                    <CardDescription>
                      Subjects and performance in the current academic year
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject</TableHead>
                          <TableHead>Teacher</TableHead>
                          <TableHead>Current Grade</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {student.subjects.map((subject, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {subject.name}
                            </TableCell>
                            <TableCell>{subject.teacher}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  subject.grade.startsWith("A")
                                    ? "default"
                                    : subject.grade.startsWith("B")
                                    ? "outline"
                                    : "secondary"
                                }
                              >
                                {subject.grade}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Academic Performance
                    </CardTitle>
                    <CardDescription>
                      Overall academic performance metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <div className="text-sm font-medium">GPA Trend</div>
                        <div className="h-[120px] w-full rounded-md bg-muted"></div>
                        <div className="text-xs text-muted-foreground">
                          Last 3 terms
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium">
                          Subject Performance
                        </div>
                        <div className="h-[120px] w-full rounded-md bg-muted"></div>
                        <div className="text-xs text-muted-foreground">
                          Current term
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Class Ranking</div>
                        <div className="h-[120px] w-full rounded-md bg-muted"></div>
                        <div className="text-xs text-muted-foreground">
                          Current term
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="attendance" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Attendance Calendar
                    </CardTitle>
                    <CardDescription>Monthly attendance record</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={new Date()}
                        className="rounded-md border"
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Recent Attendance</CardTitle>
                    <CardDescription>Last 5 school days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Reason (if absent)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {student.recentAttendance.map((record, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {new Date(record.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  record.status === "Present"
                                    ? "default"
                                    : "destructive"
                                }
                              >
                                {record.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{record.reason || "-"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Attendance Statistics
                    </CardTitle>
                    <CardDescription>Current academic year</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Present Days</div>
                        <div className="text-2xl font-bold">165</div>
                        <div className="text-xs text-muted-foreground">
                          Out of 180 school days
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Absent Days</div>
                        <div className="text-2xl font-bold">15</div>
                        <div className="text-xs text-muted-foreground">
                          8% of school days
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Late Arrivals</div>
                        <div className="text-2xl font-bold">7</div>
                        <div className="text-xs text-muted-foreground">
                          4% of school days
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="fees" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Fee Payment History</CardTitle>
                    <CardDescription>
                      Record of all fee payments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Invoice ID</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead>Paid Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {student.fees.map((fee, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {fee.id}
                            </TableCell>
                            <TableCell>{fee.description}</TableCell>
                            <TableCell>{fee.amount}</TableCell>
                            <TableCell>{fee.dueDate}</TableCell>
                            <TableCell>{fee.paidDate || "-"}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  fee.status === "Paid"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {fee.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Fee Summary</CardTitle>
                    <CardDescription>Current academic year</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Total Fees</div>
                        <div className="text-2xl font-bold">$5,300</div>
                        <div className="text-xs text-muted-foreground">
                          Academic year 2023-2024
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Paid Amount</div>
                        <div className="text-2xl font-bold">$2,800</div>
                        <div className="text-xs text-muted-foreground">
                          53% of total fees
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium">
                          Pending Amount
                        </div>
                        <div className="text-2xl font-bold">$2,500</div>
                        <div className="text-xs text-muted-foreground">
                          Due by April 15, 2023
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="documents" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Student Documents</CardTitle>
                    <CardDescription>
                      Official documents and records
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Document</TableHead>
                          <TableHead>Upload Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {student.documents.map((document, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                {document.name}
                              </div>
                            </TableCell>
                            <TableCell>{document.uploadDate}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  document.status === "Verified"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {document.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Upload New Document</CardTitle>
                    <CardDescription>
                      Add a new document to the student's record
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center rounded-md border border-dashed p-8">
                      <div className="flex flex-col items-center space-y-2 text-center">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                        <div className="text-sm font-medium">
                          Drag and drop a file here, or click to browse
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Supported formats: PDF, JPG, PNG (Max 10MB)
                        </div>
                        <Button variant="outline" size="sm">
                          Browse Files
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
