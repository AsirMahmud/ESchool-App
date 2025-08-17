"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Check, Save, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

export default function ClassAssignmentPage() {
  // In a real application, you would fetch the teacher data and class data from the database
  const teachers = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@eschool.edu",
      department: "Mathematics",
      expertise: ["Algebra", "Calculus"],
      currentLoad: 4,
      maxLoad: 6,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@eschool.edu",
      department: "Science",
      expertise: ["Biology", "Chemistry"],
      currentLoad: 5,
      maxLoad: 6,
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael.brown@eschool.edu",
      department: "English",
      expertise: ["Literature", "Grammar"],
      currentLoad: 3,
      maxLoad: 6,
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@eschool.edu",
      department: "History",
      expertise: ["World History", "Geography"],
      currentLoad: 6,
      maxLoad: 6,
    },
    {
      id: "5",
      name: "Robert Wilson",
      email: "robert.wilson@eschool.edu",
      department: "Mathematics",
      expertise: ["Geometry", "Statistics"],
      currentLoad: 2,
      maxLoad: 6,
    },
  ];

  const classes = [
    {
      id: "1",
      name: "Mathematics 101",
      grade: "Grade 9",
      section: "A",
      schedule: "Mon, Wed, Fri 9:00 AM - 10:00 AM",
      students: 32,
      assignedTeacher: "John Smith",
    },
    {
      id: "2",
      name: "Biology 101",
      grade: "Grade 9",
      section: "A",
      schedule: "Mon, Wed, Fri 10:00 AM - 11:00 AM",
      students: 30,
      assignedTeacher: "Sarah Johnson",
    },
    {
      id: "3",
      name: "English Literature",
      grade: "Grade 9",
      section: "A",
      schedule: "Tue, Thu 9:00 AM - 10:30 AM",
      students: 32,
      assignedTeacher: "Michael Brown",
    },
    {
      id: "4",
      name: "World History",
      grade: "Grade 9",
      section: "A",
      schedule: "Tue, Thu 10:30 AM - 12:00 PM",
      students: 32,
      assignedTeacher: "Emily Davis",
    },
    {
      id: "5",
      name: "Mathematics 201",
      grade: "Grade 10",
      section: "A",
      schedule: "Mon, Wed, Fri 11:00 AM - 12:00 PM",
      students: 28,
      assignedTeacher: "Robert Wilson",
    },
    {
      id: "6",
      name: "Chemistry 101",
      grade: "Grade 10",
      section: "A",
      schedule: "Mon, Wed, Fri 1:00 PM - 2:00 PM",
      students: 28,
      assignedTeacher: "Sarah Johnson",
    },
    {
      id: "7",
      name: "Algebra II",
      grade: "Grade 10",
      section: "A",
      schedule: "Tue, Thu 1:00 PM - 2:30 PM",
      students: 28,
      assignedTeacher: null,
    },
  ];

  const handleSaveAssignments = () => {
    // In a real application, you would save the assignments to the database
    toast({
      title: "Assignments saved",
      description: "Class assignments have been updated successfully.",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/employees">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Class Assignment</h1>
        </div>
        <Button onClick={handleSaveAssignments}>
          <Save className="mr-2 h-4 w-4" />
          Save Assignments
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Teachers</CardTitle>
            <CardDescription>
              Assign teachers to classes based on their expertise and
              availability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search teachers..."
                    className="pl-8"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Teacher</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Expertise</TableHead>
                      <TableHead className="text-right">Load</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teachers.map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{teacher.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {teacher.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{teacher.department}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {teacher.expertise.map((exp) => (
                              <Badge key={exp} variant="outline">
                                {exp}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="font-medium">
                            {teacher.currentLoad}/{teacher.maxLoad}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {teacher.currentLoad === teacher.maxLoad
                              ? "Full"
                              : "Available"}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Classes</CardTitle>
            <CardDescription>
              Manage class assignments and teacher allocations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search classes..."
                    className="pl-8"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    <SelectItem value="grade9">Grade 9</SelectItem>
                    <SelectItem value="grade10">Grade 10</SelectItem>
                    <SelectItem value="grade11">Grade 11</SelectItem>
                    <SelectItem value="grade12">Grade 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Class</TableHead>
                      <TableHead>Schedule</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classes.map((cls) => (
                      <TableRow key={cls.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{cls.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {cls.grade} - {cls.section}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{cls.schedule}</div>
                        </TableCell>
                        <TableCell>{cls.students}</TableCell>
                        <TableCell>
                          <Select defaultValue={cls.assignedTeacher || ""}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select Teacher" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="unassigned">
                                Unassigned
                              </SelectItem>
                              {teachers.map((teacher) => (
                                <SelectItem
                                  key={teacher.id}
                                  value={teacher.name}
                                  disabled={
                                    teacher.currentLoad === teacher.maxLoad &&
                                    teacher.name !== cls.assignedTeacher
                                  }
                                >
                                  {teacher.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          {cls.assignedTeacher && (
                            <div className="flex justify-end">
                              <Check className="h-5 w-5 text-green-500" />
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSaveAssignments}>
          <Save className="mr-2 h-4 w-4" />
          Save Assignments
        </Button>
      </div>
    </div>
  );
}
