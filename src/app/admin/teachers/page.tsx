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
} from "lucide-react";
import { format } from "date-fns";

export default function AdminTeachersPage() {
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
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Teacher
          </Button>
        </div>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Teacher List</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
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
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="social">Social Studies</SelectItem>
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
                  {[
                    {
                      id: 1,
                      name: "Dr. Robert Johnson",
                      department: "Science",
                      email: "robert.j@school.edu",
                      phone: "555-1234",
                      joined: "2018-08-15",
                      status: "active",
                    },
                    {
                      id: 2,
                      name: "Sarah Williams",
                      department: "Mathematics",
                      email: "sarah.w@school.edu",
                      phone: "555-2345",
                      joined: "2019-07-10",
                      status: "active",
                    },
                    {
                      id: 3,
                      name: "Michael Brown",
                      department: "English",
                      email: "michael.b@school.edu",
                      phone: "555-3456",
                      joined: "2017-06-22",
                      status: "active",
                    },
                    {
                      id: 4,
                      name: "Emily Davis",
                      department: "Social Studies",
                      email: "emily.d@school.edu",
                      phone: "555-4567",
                      joined: "2020-08-05",
                      status: "on leave",
                    },
                    {
                      id: 5,
                      name: "James Wilson",
                      department: "Mathematics",
                      email: "james.w@school.edu",
                      phone: "555-5678",
                      joined: "2021-07-30",
                      status: "active",
                    },
                  ].map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={`/placeholder.svg?height=36&width=36&text=${teacher.name.charAt(
                              0
                            )}`}
                          />
                          <AvatarFallback>
                            {teacher.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{teacher.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {teacher.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{teacher.department}</TableCell>
                      <TableCell>{teacher.phone}</TableCell>
                      <TableCell>
                        {new Date(teacher.joined).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            teacher.status === "active" ? "default" : "outline"
                          }
                        >
                          {teacher.status.charAt(0).toUpperCase() +
                            teacher.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing 5 of 25 teachers
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

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Teacher Attendance</CardTitle>
                  <CardDescription>
                    Track and manage teacher attendance
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <CalendarIcon className="h-4 w-4" />
                        <span>Select Date</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Check-in Time</TableHead>
                    <TableHead>Check-out Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: 1,
                      name: "Dr. Robert Johnson",
                      department: "Science",
                      status: "present",
                      checkIn: "08:15 AM",
                      checkOut: "04:05 PM",
                    },
                    {
                      id: 2,
                      name: "Sarah Williams",
                      department: "Mathematics",
                      status: "present",
                      checkIn: "08:00 AM",
                      checkOut: "04:00 PM",
                    },
                    {
                      id: 3,
                      name: "Michael Brown",
                      department: "English",
                      status: "absent",
                      checkIn: "-",
                      checkOut: "-",
                    },
                    {
                      id: 4,
                      name: "Emily Davis",
                      department: "Social Studies",
                      status: "on leave",
                      checkIn: "-",
                      checkOut: "-",
                    },
                    {
                      id: 5,
                      name: "James Wilson",
                      department: "Mathematics",
                      status: "present",
                      checkIn: "08:10 AM",
                      checkOut: "03:45 PM",
                    },
                  ].map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={`/placeholder.svg?height=36&width=36&text=${teacher.name.charAt(
                              0
                            )}`}
                          />
                          <AvatarFallback>
                            {teacher.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{teacher.name}</p>
                        </div>
                      </TableCell>
                      <TableCell>{teacher.department}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            teacher.status === "present"
                              ? "default"
                              : teacher.status === "absent"
                              ? "destructive"
                              : "outline"
                          }
                        >
                          {teacher.status.charAt(0).toUpperCase() +
                            teacher.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{teacher.checkIn}</TableCell>
                      <TableCell>{teacher.checkOut}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Check className="h-3 w-3" />
                            Present
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <X className="h-3 w-3" />
                            Absent
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
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
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Assignment
                </Button>
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
