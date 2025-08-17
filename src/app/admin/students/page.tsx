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
  ArrowUpDown,
} from "lucide-react";

export default function AdminStudentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Student Management
          </h2>
          <p className="text-muted-foreground">
            Manage students, attendance, and disciplinary records.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Student List</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="discipline">Disciplinary Records</TabsTrigger>
          <TabsTrigger value="promotion">Promotion</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>All Students</CardTitle>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search students..."
                      className="pl-8 w-full sm:w-[250px]"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full sm:w-[180px]">
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Roll No.</TableHead>
                    <TableHead>Parent Contact</TableHead>
                    <TableHead>Admission Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: 1,
                      name: "Emma Wilson",
                      class: "10A",
                      roll: "1001",
                      parent: "John Wilson",
                      phone: "555-1234",
                      admission: "2021-04-15",
                      status: "active",
                    },
                    {
                      id: 2,
                      name: "James Brown",
                      class: "9B",
                      roll: "902",
                      parent: "Robert Brown",
                      phone: "555-2345",
                      admission: "2022-06-10",
                      status: "active",
                    },
                    {
                      id: 3,
                      name: "Olivia Smith",
                      class: "11C",
                      roll: "1103",
                      parent: "Sarah Smith",
                      phone: "555-3456",
                      admission: "2020-07-22",
                      status: "active",
                    },
                    {
                      id: 4,
                      name: "William Johnson",
                      class: "12A",
                      roll: "1204",
                      parent: "Michael Johnson",
                      phone: "555-4567",
                      admission: "2019-05-05",
                      status: "inactive",
                    },
                    {
                      id: 5,
                      name: "Sophia Davis",
                      class: "10B",
                      roll: "1005",
                      parent: "Emily Davis",
                      phone: "555-5678",
                      admission: "2021-08-30",
                      status: "active",
                    },
                  ].map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={`/placeholder.svg?height=36&width=36&text=${student.name.charAt(
                              0
                            )}`}
                          />
                          <AvatarFallback>
                            {student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">
                            ID: STU-{student.id.toString().padStart(4, "0")}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.roll}</TableCell>
                      <TableCell>
                        <div>
                          <p>{student.parent}</p>
                          <p className="text-xs text-muted-foreground">
                            {student.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(student.admission).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            student.status === "active" ? "default" : "outline"
                          }
                        >
                          {student.status.charAt(0).toUpperCase() +
                            student.status.slice(1)}
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
                Showing 5 of 120 students
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
                  <CardTitle>Student Attendance</CardTitle>
                  <CardDescription>
                    Track and manage student attendance
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="10a">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9a">Class 9A</SelectItem>
                      <SelectItem value="9b">Class 9B</SelectItem>
                      <SelectItem value="10a">Class 10A</SelectItem>
                      <SelectItem value="10b">Class 10B</SelectItem>
                      <SelectItem value="11a">Class 11A</SelectItem>
                    </SelectContent>
                  </Select>
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
                    <TableHead>Roll No.</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Late</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: 1,
                      roll: "1001",
                      name: "Emma Wilson",
                      status: "present",
                    },
                    {
                      id: 2,
                      roll: "1002",
                      name: "James Taylor",
                      status: "absent",
                    },
                    {
                      id: 3,
                      roll: "1003",
                      name: "Olivia Smith",
                      status: "present",
                    },
                    {
                      id: 4,
                      roll: "1004",
                      name: "William Johnson",
                      status: "late",
                    },
                    {
                      id: 5,
                      roll: "1005",
                      name: "Sophia Davis",
                      status: "present",
                    },
                  ].map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.roll}</TableCell>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell>
                        <input
                          type="radio"
                          name={`attendance-${student.id}`}
                          checked={student.status === "present"}
                          className="h-4 w-4 text-primary border-primary focus:ring-primary"
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          type="radio"
                          name={`attendance-${student.id}`}
                          checked={student.status === "absent"}
                          className="h-4 w-4 text-primary border-primary focus:ring-primary"
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          type="radio"
                          name={`attendance-${student.id}`}
                          checked={student.status === "late"}
                          className="h-4 w-4 text-primary border-primary focus:ring-primary"
                        />
                      </TableCell>
                      <TableCell>
                        <Select defaultValue={student.status}>
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="present">Present</SelectItem>
                            <SelectItem value="absent">Absent</SelectItem>
                            <SelectItem value="late">Late</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-end mt-4">
                <Button>Save Attendance</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discipline" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Disciplinary Records</CardTitle>
                  <CardDescription>
                    Track and manage student disciplinary records
                  </CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Record
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Incident Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Action Taken</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: 1,
                      student: "James Taylor",
                      class: "10A",
                      date: "2023-03-15",
                      type: "Misconduct",
                      description: "Disrupting class",
                      action: "Verbal warning",
                    },
                    {
                      id: 2,
                      student: "William Johnson",
                      class: "12A",
                      date: "2023-03-10",
                      type: "Attendance",
                      description: "Unauthorized absence",
                      action: "Parent notification",
                    },
                    {
                      id: 3,
                      student: "Michael Brown",
                      class: "9B",
                      date: "2023-02-28",
                      type: "Academic",
                      description: "Cheating on test",
                      action: "Detention",
                    },
                    {
                      id: 4,
                      student: "David Miller",
                      class: "11C",
                      date: "2023-02-20",
                      type: "Misconduct",
                      description: "Inappropriate language",
                      action: "Counseling",
                    },
                    {
                      id: 5,
                      student: "Robert Wilson",
                      class: "10B",
                      date: "2023-02-15",
                      type: "Property",
                      description: "Damaged school property",
                      action: "Restitution",
                    },
                  ].map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {record.student}
                      </TableCell>
                      <TableCell>{record.class}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            record.type === "Misconduct"
                              ? "destructive"
                              : record.type === "Attendance"
                              ? "outline"
                              : "default"
                          }
                        >
                          {record.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.description}</TableCell>
                      <TableCell>{record.action}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promotion" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Student Promotion</CardTitle>
                  <CardDescription>
                    Promote students to the next class
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="10a">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Current class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9a">Class 9A</SelectItem>
                      <SelectItem value="9b">Class 9B</SelectItem>
                      <SelectItem value="10a">Class 10A</SelectItem>
                      <SelectItem value="10b">Class 10B</SelectItem>
                      <SelectItem value="11a">Class 11A</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="11a">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Promote to" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10a">Class 10A</SelectItem>
                      <SelectItem value="10b">Class 10B</SelectItem>
                      <SelectItem value="11a">Class 11A</SelectItem>
                      <SelectItem value="11b">Class 11B</SelectItem>
                      <SelectItem value="12a">Class 12A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input type="checkbox" className="h-4 w-4" />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Roll No.</TableHead>
                    <TableHead>Current Class</TableHead>
                    <TableHead>Average Grade</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: 1,
                      name: "Emma Wilson",
                      roll: "1001",
                      class: "10A",
                      grade: "A",
                      attendance: "95%",
                      status: "eligible",
                    },
                    {
                      id: 2,
                      name: "James Taylor",
                      roll: "1002",
                      class: "10A",
                      grade: "B",
                      attendance: "90%",
                      status: "eligible",
                    },
                    {
                      id: 3,
                      name: "Olivia Smith",
                      roll: "1003",
                      class: "10A",
                      grade: "A",
                      attendance: "98%",
                      status: "eligible",
                    },
                    {
                      id: 4,
                      name: "William Johnson",
                      roll: "1004",
                      class: "10A",
                      grade: "C",
                      attendance: "85%",
                      status: "review",
                    },
                    {
                      id: 5,
                      name: "Sophia Davis",
                      roll: "1005",
                      class: "10A",
                      grade: "B",
                      attendance: "92%",
                      status: "eligible",
                    },
                  ].map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          className="h-4 w-4"
                          checked={student.status === "eligible"}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell>{student.roll}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>{student.attendance}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            student.status === "eligible"
                              ? "default"
                              : "outline"
                          }
                        >
                          {student.status.charAt(0).toUpperCase() +
                            student.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-end mt-4">
                <Button variant="outline" className="mr-2">
                  Cancel
                </Button>
                <Button>Promote Selected Students</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
