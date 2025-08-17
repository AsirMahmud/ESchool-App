"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronRight,
  Download,
  Edit,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";

export default function ClassesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedSection, setSelectedSection] = useState("all");

  // Sample classes data
  const classesData = [
    {
      id: "class-001",
      name: "Grade 6-A",
      grade: "Grade 6",
      section: "A",
      students: 32,
      classTeacher: {
        name: "Ms. Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      room: "101",
      schedule: "Monday to Friday, 8:00 AM - 3:00 PM",
    },
    {
      id: "class-002",
      name: "Grade 6-B",
      grade: "Grade 6",
      section: "B",
      students: 30,
      classTeacher: {
        name: "Mr. Robert Smith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      room: "102",
      schedule: "Monday to Friday, 8:00 AM - 3:00 PM",
    },
    {
      id: "class-003",
      name: "Grade 7-A",
      grade: "Grade 7",
      section: "A",
      students: 35,
      classTeacher: {
        name: "Ms. Emily Davis",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      room: "201",
      schedule: "Monday to Friday, 8:00 AM - 3:30 PM",
    },
    {
      id: "class-004",
      name: "Grade 8-C",
      grade: "Grade 8",
      section: "C",
      students: 28,
      classTeacher: {
        name: "Mr. Michael Brown",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      room: "301",
      schedule: "Monday to Friday, 8:30 AM - 3:30 PM",
    },
    {
      id: "class-005",
      name: "Grade 9-B",
      grade: "Grade 9",
      section: "B",
      students: 33,
      classTeacher: {
        name: "Ms. Jennifer Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      room: "401",
      schedule: "Monday to Friday, 8:30 AM - 4:00 PM",
    },
  ];

  // Filter classes based on search and filters
  const filteredClasses = classesData.filter((classItem) => {
    const matchesSearch =
      classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.classTeacher.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      classItem.room.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGrade =
      selectedGrade === "all" || classItem.grade === selectedGrade;
    const matchesSection =
      selectedSection === "all" || classItem.section === selectedSection;

    return matchesSearch && matchesGrade && matchesSection;
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Class Management
          </h1>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Link href="/admin/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/admin/academic" className="hover:text-foreground">
              Academic
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>Classes</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Class
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Class</DialogTitle>
                <DialogDescription>
                  Create a new class with grade, section, and teacher
                  assignment.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="class-name" className="text-right">
                    Class Name
                  </Label>
                  <Input
                    id="class-name"
                    placeholder="Enter class name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="class-grade" className="text-right">
                    Grade
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grade-6">Grade 6</SelectItem>
                      <SelectItem value="grade-7">Grade 7</SelectItem>
                      <SelectItem value="grade-8">Grade 8</SelectItem>
                      <SelectItem value="grade-9">Grade 9</SelectItem>
                      <SelectItem value="grade-10">Grade 10</SelectItem>
                      <SelectItem value="grade-11">Grade 11</SelectItem>
                      <SelectItem value="grade-12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="class-section" className="text-right">
                    Section
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a">A</SelectItem>
                      <SelectItem value="b">B</SelectItem>
                      <SelectItem value="c">C</SelectItem>
                      <SelectItem value="d">D</SelectItem>
                      <SelectItem value="e">E</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="class-teacher" className="text-right">
                    Class Teacher
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah-johnson">
                        Ms. Sarah Johnson
                      </SelectItem>
                      <SelectItem value="robert-smith">
                        Mr. Robert Smith
                      </SelectItem>
                      <SelectItem value="emily-davis">
                        Ms. Emily Davis
                      </SelectItem>
                      <SelectItem value="michael-brown">
                        Mr. Michael Brown
                      </SelectItem>
                      <SelectItem value="jennifer-wilson">
                        Ms. Jennifer Wilson
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="class-room" className="text-right">
                    Room Number
                  </Label>
                  <Input
                    id="class-room"
                    placeholder="Enter room number"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="class-schedule" className="text-right">
                    Schedule
                  </Label>
                  <Input
                    id="class-schedule"
                    placeholder="Enter class schedule"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Class</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search classes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
        <div className="w-full md:w-1/3 flex flex-col md:flex-row gap-2">
          <Select value={selectedGrade} onValueChange={setSelectedGrade}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              <SelectItem value="Grade 6">Grade 6</SelectItem>
              <SelectItem value="Grade 7">Grade 7</SelectItem>
              <SelectItem value="Grade 8">Grade 8</SelectItem>
              <SelectItem value="Grade 9">Grade 9</SelectItem>
              <SelectItem value="Grade 10">Grade 10</SelectItem>
              <SelectItem value="Grade 11">Grade 11</SelectItem>
              <SelectItem value="Grade 12">Grade 12</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedSection} onValueChange={setSelectedSection}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sections</SelectItem>
              <SelectItem value="A">Section A</SelectItem>
              <SelectItem value="B">Section B</SelectItem>
              <SelectItem value="C">Section C</SelectItem>
              <SelectItem value="D">Section D</SelectItem>
              <SelectItem value="E">Section E</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <div className="rounded-md border">
            <div className="bg-muted/50 p-4 grid grid-cols-12 font-medium">
              <div className="col-span-2">Class</div>
              <div className="col-span-3">Class Teacher</div>
              <div className="col-span-2">Room</div>
              <div className="col-span-2">Students</div>
              <div className="col-span-2">Schedule</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>
            {filteredClasses.length > 0 ? (
              filteredClasses.map((classItem) => (
                <div
                  key={classItem.id}
                  className="p-4 grid grid-cols-12 items-center border-t"
                >
                  <div className="col-span-2 font-medium">{classItem.name}</div>
                  <div className="col-span-3 flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={
                          classItem.classTeacher.avatar || "/placeholder.svg"
                        }
                        alt={classItem.classTeacher.name}
                      />
                      <AvatarFallback>
                        {classItem.classTeacher.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">
                      {classItem.classTeacher.name}
                    </span>
                  </div>
                  <div className="col-span-2">{classItem.room}</div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{classItem.students}</span>
                    </div>
                  </div>
                  <div className="col-span-2 text-sm text-muted-foreground">
                    {classItem.schedule}
                  </div>
                  <div className="col-span-1 flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground border-t">
                No classes found matching your filters.
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="grid" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClasses.length > 0 ? (
              filteredClasses.map((classItem) => (
                <Card key={classItem.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        {classItem.name}
                      </CardTitle>
                      <Badge variant="outline">Room {classItem.room}</Badge>
                    </div>
                    <CardDescription>
                      {classItem.grade} • Section {classItem.section}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={
                              classItem.classTeacher.avatar ||
                              "/placeholder.svg"
                            }
                            alt={classItem.classTeacher.name}
                          />
                          <AvatarFallback>
                            {classItem.classTeacher.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {classItem.classTeacher.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Class Teacher
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Students</p>
                          <p className="font-medium flex items-center gap-1">
                            <Users className="h-3 w-3" /> {classItem.students}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Schedule</p>
                          <p className="font-medium">{classItem.schedule}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-1" /> Students
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full p-4 text-center text-muted-foreground border rounded-md">
                No classes found matching your filters.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
