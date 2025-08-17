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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Download,
  Filter,
  MoreHorizontal,
  Search,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TeacherStudentsPage({
  params,
}: {
  params: { id: string };
}) {
  // In a real application, you would fetch the teacher data based on the ID
  const teacher = {
    id: params.id,
    name: "Sarah Johnson",
    department: "Mathematics",
  };

  // Sample students data
  const students = [
    {
      id: "S2025-001",
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      grade: "12th",
      class: "Advanced Calculus",
      attendance: 95,
      performance: "Excellent",
      lastAssignment: "A",
      email: "emma.wilson@student.edu",
    },
    {
      id: "S2025-002",
      name: "James Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      grade: "12th",
      class: "Advanced Calculus",
      attendance: 88,
      performance: "Good",
      lastAssignment: "B+",
      email: "james.brown@student.edu",
    },
    {
      id: "S2025-003",
      name: "Sophia Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
      grade: "12th",
      class: "Statistics",
      attendance: 92,
      performance: "Excellent",
      lastAssignment: "A-",
      email: "sophia.martinez@student.edu",
    },
    {
      id: "S2025-004",
      name: "Liam Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      grade: "12th",
      class: "Statistics",
      attendance: 78,
      performance: "Average",
      lastAssignment: "C+",
      email: "liam.johnson@student.edu",
    },
    {
      id: "S2025-005",
      name: "Olivia Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      grade: "12th",
      class: "Advanced Calculus",
      attendance: 90,
      performance: "Good",
      lastAssignment: "B",
      email: "olivia.davis@student.edu",
    },
    {
      id: "S2025-006",
      name: "Noah Miller",
      avatar: "/placeholder.svg?height=40&width=40",
      grade: "11th",
      class: "Algebra II",
      attendance: 85,
      performance: "Good",
      lastAssignment: "B+",
      email: "noah.miller@student.edu",
    },
    {
      id: "S2025-007",
      name: "Ava Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
      grade: "11th",
      class: "Algebra II",
      attendance: 93,
      performance: "Excellent",
      lastAssignment: "A",
      email: "ava.taylor@student.edu",
    },
    {
      id: "S2025-008",
      name: "Ethan Anderson",
      avatar: "/placeholder.svg?height=40&width=40",
      grade: "11th",
      class: "Algebra II",
      attendance: 82,
      performance: "Average",
      lastAssignment: "C",
      email: "ethan.anderson@student.edu",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={`/admin/teachers/${params.id}/profile`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {teacher.name}'s Students
            </h1>
            <p className="text-muted-foreground">
              {teacher.department} Department
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search students..."
            className="pl-8"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="calculus">Advanced Calculus</SelectItem>
            <SelectItem value="algebra">Algebra II</SelectItem>
            <SelectItem value="statistics">Statistics</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Students</TabsTrigger>
          <TabsTrigger value="12th">12th Grade</TabsTrigger>
          <TabsTrigger value="11th">11th Grade</TabsTrigger>
          <TabsTrigger value="concern">Needs Attention</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Student List</CardTitle>
              <CardDescription>
                All students taught by {teacher.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Last Assignment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={student.avatar || "/placeholder.svg"}
                              alt={student.name}
                            />
                            <AvatarFallback>
                              {student.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {student.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            student.attendance >= 90
                              ? "default"
                              : student.attendance >= 80
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {student.attendance}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            student.performance === "Excellent"
                              ? "default"
                              : student.performance === "Good"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {student.performance}
                        </Badge>
                      </TableCell>
                      <TableCell>{student.lastAssignment}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>View Grades</DropdownMenuItem>
                            <DropdownMenuItem>View Attendance</DropdownMenuItem>
                            <DropdownMenuItem>Contact Student</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Contact Parent</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="12th" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>12th Grade Students</CardTitle>
              <CardDescription>Students in 12th grade classes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Showing 12th grade students only.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="11th" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>11th Grade Students</CardTitle>
              <CardDescription>Students in 11th grade classes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Showing 11th grade students only.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="concern" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Students Needing Attention</CardTitle>
              <CardDescription>
                Students with attendance or performance concerns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Showing students who need additional support.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Student Performance Overview</CardTitle>
          <CardDescription>
            Summary of student performance across all classes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border p-4">
              <div className="text-2xl font-bold">60</div>
              <div className="text-sm text-muted-foreground">
                Total Students
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-2xl font-bold">88%</div>
              <div className="text-sm text-muted-foreground">
                Average Attendance
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-2xl font-bold">B+</div>
              <div className="text-sm text-muted-foreground">Average Grade</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-2xl font-bold">5</div>
              <div className="text-sm text-muted-foreground">
                Students Needing Support
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
