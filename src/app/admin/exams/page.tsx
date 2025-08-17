import {
  Card,
  CardContent,
  CardDescription,
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
import { Calendar } from "@/components/ui/calendar";
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
  ArrowUpDown,
} from "lucide-react";

export default function AdminExamsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Exam Management</h2>
          <p className="text-muted-foreground">
            Schedule exams, manage grading, and publish results.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Exam
          </Button>
        </div>
      </div>

      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList>
          <TabsTrigger value="schedule">Exam Schedule</TabsTrigger>
          <TabsTrigger value="grading">Grading System</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Exam Calendar</CardTitle>
                  <CardDescription>
                    View and manage upcoming exams
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="9">Class 9</SelectItem>
                      <SelectItem value="10">Class 10</SelectItem>
                      <SelectItem value="11">Class 11</SelectItem>
                      <SelectItem value="12">Class 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Calendar />

              <div className="mt-6">
                <h3 className="font-medium mb-4">Upcoming Exams</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        id: 1,
                        subject: "Mathematics",
                        class: "10A, 10B",
                        date: "2023-04-05",
                        time: "09:00 AM",
                        duration: "3 hours",
                        room: "Hall 1",
                      },
                      {
                        id: 2,
                        subject: "Physics",
                        class: "12A, 12B",
                        date: "2023-04-10",
                        time: "09:00 AM",
                        duration: "3 hours",
                        room: "Hall 2",
                      },
                      {
                        id: 3,
                        subject: "Chemistry",
                        class: "11A, 11B",
                        date: "2023-04-15",
                        time: "09:00 AM",
                        duration: "3 hours",
                        room: "Hall 1",
                      },
                      {
                        id: 4,
                        subject: "Biology",
                        class: "9A, 9B",
                        date: "2023-04-20",
                        time: "09:00 AM",
                        duration: "3 hours",
                        room: "Hall 3",
                      },
                      {
                        id: 5,
                        subject: "English",
                        class: "10A, 10B",
                        date: "2023-04-25",
                        time: "09:00 AM",
                        duration: "3 hours",
                        room: "Hall 1",
                      },
                    ].map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="font-medium">
                          {exam.subject}
                        </TableCell>
                        <TableCell>{exam.class}</TableCell>
                        <TableCell>{exam.date}</TableCell>
                        <TableCell>{exam.time}</TableCell>
                        <TableCell>{exam.duration}</TableCell>
                        <TableCell>{exam.room}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grading" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Grading System</CardTitle>
                  <CardDescription>
                    Configure grading criteria and scales
                  </CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Grading Scale
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="scales" className="space-y-4">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="scales">Grading Scales</TabsTrigger>
                  <TabsTrigger value="criteria">
                    Assessment Criteria
                  </TabsTrigger>
                  <TabsTrigger value="weights">Subject Weights</TabsTrigger>
                </TabsList>

                <TabsContent value="scales">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Grade</TableHead>
                        <TableHead>Percentage Range</TableHead>
                        <TableHead>GPA Value</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: 1,
                          grade: "A+",
                          range: "90-100%",
                          gpa: "4.0",
                          description: "Outstanding",
                        },
                        {
                          id: 2,
                          grade: "A",
                          range: "80-89%",
                          gpa: "3.7",
                          description: "Excellent",
                        },
                        {
                          id: 3,
                          grade: "B+",
                          range: "75-79%",
                          gpa: "3.3",
                          description: "Very Good",
                        },
                        {
                          id: 4,
                          grade: "B",
                          range: "70-74%",
                          gpa: "3.0",
                          description: "Good",
                        },
                        {
                          id: 5,
                          grade: "C+",
                          range: "65-69%",
                          gpa: "2.7",
                          description: "Above Average",
                        },
                        {
                          id: 6,
                          grade: "C",
                          range: "60-64%",
                          gpa: "2.3",
                          description: "Average",
                        },
                        {
                          id: 7,
                          grade: "D",
                          range: "50-59%",
                          gpa: "2.0",
                          description: "Pass",
                        },
                        {
                          id: 8,
                          grade: "F",
                          range: "0-49%",
                          gpa: "0.0",
                          description: "Fail",
                        },
                      ].map((grade) => (
                        <TableRow key={grade.id}>
                          <TableCell className="font-medium">
                            {grade.grade}
                          </TableCell>
                          <TableCell>{grade.range}</TableCell>
                          <TableCell>{grade.gpa}</TableCell>
                          <TableCell>{grade.description}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="criteria">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Assessment Type</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: 1,
                          type: "Final Exam",
                          weight: "40%",
                          description: "End of term examination",
                        },
                        {
                          id: 2,
                          type: "Mid-term Exam",
                          weight: "25%",
                          description: "Middle of term examination",
                        },
                        {
                          id: 3,
                          type: "Assignments",
                          weight: "15%",
                          description: "Homework and projects",
                        },
                        {
                          id: 4,
                          type: "Quizzes",
                          weight: "10%",
                          description: "Short in-class tests",
                        },
                        {
                          id: 5,
                          type: "Class Participation",
                          weight: "10%",
                          description: "Active engagement in class",
                        },
                      ].map((assessment) => (
                        <TableRow key={assessment.id}>
                          <TableCell className="font-medium">
                            {assessment.type}
                          </TableCell>
                          <TableCell>{assessment.weight}</TableCell>
                          <TableCell>{assessment.description}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="weights">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Credit Hours</TableHead>
                        <TableHead>Weight in GPA</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: 1,
                          subject: "Mathematics",
                          class: "10",
                          credits: "5",
                          weight: "1.2",
                        },
                        {
                          id: 2,
                          subject: "Physics",
                          class: "10",
                          credits: "4",
                          weight: "1.1",
                        },
                        {
                          id: 3,
                          subject: "Chemistry",
                          class: "10",
                          credits: "4",
                          weight: "1.1",
                        },
                        {
                          id: 4,
                          subject: "Biology",
                          class: "10",
                          credits: "4",
                          weight: "1.1",
                        },
                        {
                          id: 5,
                          subject: "English",
                          class: "10",
                          credits: "3",
                          weight: "1.0",
                        },
                        {
                          id: 6,
                          subject: "History",
                          class: "10",
                          credits: "3",
                          weight: "1.0",
                        },
                      ].map((subject) => (
                        <TableRow key={subject.id}>
                          <TableCell className="font-medium">
                            {subject.subject}
                          </TableCell>
                          <TableCell>{subject.class}</TableCell>
                          <TableCell>{subject.credits}</TableCell>
                          <TableCell>{subject.weight}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Exam Results</CardTitle>
                  <CardDescription>
                    Publish and manage exam results
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="midterm">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select exam" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="midterm">Mid-term Exam</SelectItem>
                      <SelectItem value="final">Final Exam</SelectItem>
                      <SelectItem value="unit">Unit Test</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="10">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9">Class 9</SelectItem>
                      <SelectItem value="10">Class 10</SelectItem>
                      <SelectItem value="11">Class 11</SelectItem>
                      <SelectItem value="12">Class 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">
                  Mid-term Exam Results - Class 10
                </h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Draft</Badge>
                  <Button variant="outline" size="sm">
                    Publish Results
                  </Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Roll No.</TableHead>
                    <TableHead>Mathematics</TableHead>
                    <TableHead>Physics</TableHead>
                    <TableHead>Chemistry</TableHead>
                    <TableHead>Biology</TableHead>
                    <TableHead>English</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: 1,
                      name: "Emma Wilson",
                      roll: "1001",
                      math: 92,
                      physics: 88,
                      chemistry: 90,
                      biology: 85,
                      english: 95,
                      total: 450,
                      grade: "A+",
                    },
                    {
                      id: 2,
                      name: "James Taylor",
                      roll: "1002",
                      math: 78,
                      physics: 75,
                      chemistry: 80,
                      biology: 82,
                      english: 85,
                      total: 400,
                      grade: "B+",
                    },
                    {
                      id: 3,
                      name: "Olivia Smith",
                      roll: "1003",
                      math: 95,
                      physics: 92,
                      chemistry: 94,
                      biology: 90,
                      english: 89,
                      total: 460,
                      grade: "A+",
                    },
                    {
                      id: 4,
                      name: "William Johnson",
                      roll: "1004",
                      math: 65,
                      physics: 70,
                      chemistry: 68,
                      biology: 72,
                      english: 75,
                      total: 350,
                      grade: "C+",
                    },
                    {
                      id: 5,
                      name: "Sophia Davis",
                      roll: "1005",
                      math: 85,
                      physics: 82,
                      chemistry: 80,
                      biology: 78,
                      english: 90,
                      total: 415,
                      grade: "A",
                    },
                    {
                      roll: "1005",
                      math: 85,
                      physics: 82,
                      chemistry: 80,
                      biology: 78,
                      english: 90,
                      total: 415,
                      grade: "A",
                    },
                  ].map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell>{student.roll}</TableCell>
                      <TableCell>{student.math}</TableCell>
                      <TableCell>{student.physics}</TableCell>
                      <TableCell>{student.chemistry}</TableCell>
                      <TableCell>{student.biology}</TableCell>
                      <TableCell>{student.english}</TableCell>
                      <TableCell>{student.total}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing 5 of 35 students
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
