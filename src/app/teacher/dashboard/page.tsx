"use client";

import { useState } from "react";
import {
  Bell,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Download,
  FileText,
  GraduationCap,
  Grid,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Moon,
  MoreHorizontal,
  PenLine,
  Plus,
  Search,
  Settings,
  Sun,
  Upload,
  User,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function TeacherDashboard() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("physics101");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen flex flex-col`}>
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 pr-0">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 border-b p-4">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Brightwood Academy</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex-1 overflow-auto py-2">
                <div className="flex flex-col gap-1 px-2">
                  {sidebarItems.map((item) => (
                    <Button
                      key={item.title}
                      variant={
                        item.title === "Dashboard" ? "secondary" : "ghost"
                      }
                      className="justify-start gap-2"
                      asChild
                    >
                      <Link href={item.href}>
                        {item.icon}
                        {item.title}
                      </Link>
                    </Button>
                  ))}
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary hidden md:block" />
          <span className="text-xl font-bold hidden md:block">
            Brightwood Academy
          </span>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="Teacher"
                  />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium">John Smith</div>
                  <div className="text-xs text-muted-foreground">
                    Science Teacher
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:flex w-64 flex-col border-r bg-muted/40">
          <nav className="flex-1 overflow-auto py-4">
            <div className="flex flex-col gap-1 px-2">
              {sidebarItems.map((item) => (
                <Button
                  key={item.title}
                  variant={item.title === "Dashboard" ? "secondary" : "ghost"}
                  className="justify-start gap-2"
                  asChild
                >
                  <Link href={item.href}>
                    {item.icon}
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Teacher Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back, John! Here's your teaching overview.
              </p>
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Users className="h-8 w-8 mb-2" />
                  <h3 className="font-medium">Attendance</h3>
                </CardContent>
              </Card>
              <Card className="bg-accent text-accent-foreground">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <FileText className="h-8 w-8 mb-2" />
                  <h3 className="font-medium">Grades</h3>
                </CardContent>
              </Card>
              <Card className="bg-secondary text-secondary-foreground">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <MessageSquare className="h-8 w-8 mb-2" />
                  <h3 className="font-medium">Messages</h3>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Upload className="h-8 w-8 mb-2" />
                  <h3 className="font-medium">Resources</h3>
                </CardContent>
              </Card>
            </div>

            {/* Class selector */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-full md:w-[240px]">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="physics101">Physics 101</SelectItem>
                  <SelectItem value="physics102">Physics 102</SelectItem>
                  <SelectItem value="chemistry101">Chemistry 101</SelectItem>
                  <SelectItem value="biology101">Biology 101</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2 ml-auto">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Today's Schedule
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Task
                </Button>
              </div>
            </div>

            {/* Dashboard overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Class Overview</CardTitle>
                  <CardDescription>Physics 101 - Grade 11</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Students</span>
                      <span className="text-sm font-medium">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Average Grade</span>
                      <span className="text-sm font-medium">B+ (87%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Attendance Rate</span>
                      <span className="text-sm font-medium">94%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Curriculum Progress</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Class Details
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Upcoming Exams</CardTitle>
                  <CardDescription>Next 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingExams.map((exam, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {exam.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {exam.class}
                          </p>
                          <div className="flex items-center gap-2 text-xs">
                            <Calendar className="h-3 w-3" />
                            <span>{exam.date}</span>
                            <Clock className="h-3 w-3 ml-2" />
                            <span>{exam.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Exams
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Pending Tasks</CardTitle>
                  <CardDescription>
                    Tasks requiring your attention
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingTasks.map((task, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Checkbox id={`task-${i}`} />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor={`task-${i}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {task.title}
                          </label>
                          <p className="text-xs text-muted-foreground">
                            Due: {task.due}
                          </p>
                        </div>
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                              ? "default"
                              : "secondary"
                          }
                          className="ml-auto"
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Tasks
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Main features */}
            <Tabs defaultValue="attendance" className="space-y-4">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                <TabsTrigger value="grades">Grades</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="communication">Communication</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              {/* Attendance Tab */}
              <TabsContent value="attendance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Attendance Management</CardTitle>
                        <CardDescription>
                          Physics 101 - March 26, 2025
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Check className="h-4 w-4 mr-2" />
                          Mark All Present
                        </Button>
                        <Button size="sm">Save Attendance</Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>Student Name</TableHead>
                          <TableHead>ID</TableHead>
                          <TableHead className="text-center">Present</TableHead>
                          <TableHead className="text-center">Late</TableHead>
                          <TableHead className="text-center">Absent</TableHead>
                          <TableHead className="text-center">Excused</TableHead>
                          <TableHead>Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students.map((student, i) => (
                          <TableRow key={i}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback>
                                    {student.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                {student.name}
                              </div>
                            </TableCell>
                            <TableCell>{student.id}</TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                id={`present-${i}`}
                                defaultChecked={student.status === "present"}
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                id={`late-${i}`}
                                defaultChecked={student.status === "late"}
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                id={`absent-${i}`}
                                defaultChecked={student.status === "absent"}
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                id={`excused-${i}`}
                                defaultChecked={student.status === "excused"}
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                placeholder="Add note"
                                defaultValue={student.note || ""}
                                className="h-8"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      Present: 20 | Late: 2 | Absent: 1 | Excused: 1
                    </div>
                    <Button>Save Attendance</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Grades Tab */}
              <TabsContent value="grades" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Grade Submission</CardTitle>
                        <CardDescription>
                          Physics 101 - Midterm Exam
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Select defaultValue="midterm">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select assignment" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="midterm">
                              Midterm Exam
                            </SelectItem>
                            <SelectItem value="quiz1">Quiz 1</SelectItem>
                            <SelectItem value="lab1">
                              Lab Assignment 1
                            </SelectItem>
                            <SelectItem value="homework1">
                              Homework 1
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Button size="sm">Save Grades</Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>Student Name</TableHead>
                          <TableHead>ID</TableHead>
                          <TableHead className="text-center">Score</TableHead>
                          <TableHead className="text-center">Grade</TableHead>
                          <TableHead>Comments</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students.map((student, i) => (
                          <TableRow key={i}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback>
                                    {student.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                {student.name}
                              </div>
                            </TableCell>
                            <TableCell>{student.id}</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                placeholder="Score"
                                defaultValue={student.grades?.score || ""}
                                className="h-8 w-20 mx-auto"
                                min="0"
                                max="100"
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              {student.grades?.grade || "-"}
                            </TableCell>
                            <TableCell>
                              <Input
                                placeholder="Comments"
                                defaultValue={student.grades?.comments || ""}
                                className="h-8"
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <PenLine className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      Class Average: 87% (B+)
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">Export Grades</Button>
                      <Button>Save Grades</Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Schedule Tab */}
              <TabsContent value="schedule" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Class Schedule</CardTitle>
                        <CardDescription>
                          Your teaching schedule for the week
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          View Calendar
                        </Button>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Event
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-6 gap-4">
                      <div className="col-span-1"></div>
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                      ].map((day) => (
                        <div
                          key={day}
                          className="col-span-1 text-center font-medium"
                        >
                          {day}
                        </div>
                      ))}

                      {scheduleTimeSlots.map((timeSlot, i) => (
                        <>
                          <div
                            key={`time-${i}`}
                            className="col-span-1 text-sm text-muted-foreground text-right pr-2 py-2"
                          >
                            {timeSlot}
                          </div>
                          {[
                            "monday",
                            "tuesday",
                            "wednesday",
                            "thursday",
                            "friday",
                          ].map((day) => {
                            const classSchedule = schedule.find(
                              (s) => s.day === day && s.time === timeSlot
                            );
                            return (
                              <div
                                key={`${day}-${i}`}
                                className={`col-span-1 rounded-md p-2 text-sm ${
                                  classSchedule
                                    ? "bg-primary/10 border border-primary/20"
                                    : "border border-dashed border-muted-foreground/20"
                                }`}
                              >
                                {classSchedule ? (
                                  <div className="space-y-1">
                                    <div className="font-medium">
                                      {classSchedule.class}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      Room {classSchedule.room}
                                    </div>
                                  </div>
                                ) : null}
                              </div>
                            );
                          })}
                        </>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Communication Tab */}
              <TabsContent value="communication" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Communication</CardTitle>
                        <CardDescription>
                          Send messages to students and parents
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select recipients" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">
                              All Students & Parents
                            </SelectItem>
                            <SelectItem value="students">
                              Students Only
                            </SelectItem>
                            <SelectItem value="parents">
                              Parents Only
                            </SelectItem>
                            <SelectItem value="individual">
                              Select Individual
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Button size="sm">
                          <Mail className="h-4 w-4 mr-2" />
                          New Message
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            Compose Message
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                              id="subject"
                              placeholder="Enter message subject"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                              id="message"
                              placeholder="Type your message here"
                              className="min-h-[120px]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="attachment">Attachments</Label>
                            <div className="flex items-center gap-2">
                              <Input id="attachment" type="file" />
                              <Button variant="outline" size="sm">
                                <Upload className="h-4 w-4 mr-2" />
                                Upload
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline">Save Draft</Button>
                          <Button>Send Message</Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            Recent Messages
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {recentMessages.map((message, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-3 pb-3 border-b last:border-0"
                            >
                              <Avatar>
                                <AvatarFallback>
                                  {message.from
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">
                                    {message.from}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {message.time}
                                  </span>
                                </div>
                                <p className="text-sm">{message.subject}</p>
                                <p className="text-xs text-muted-foreground">
                                  {message.preview}
                                </p>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            View All Messages
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Resources Tab */}
              <TabsContent value="resources" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Resource Sharing</CardTitle>
                        <CardDescription>
                          Upload and manage study materials
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Select defaultValue="physics101">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="physics101">
                              Physics 101
                            </SelectItem>
                            <SelectItem value="physics102">
                              Physics 102
                            </SelectItem>
                            <SelectItem value="chemistry101">
                              Chemistry 101
                            </SelectItem>
                            <SelectItem value="biology101">
                              Biology 101
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Resource
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            Upload Resource
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="resource-title">Title</Label>
                            <Input
                              id="resource-title"
                              placeholder="Enter resource title"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="resource-type">Resource Type</Label>
                            <Select defaultValue="document">
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="document">
                                  Document (PDF)
                                </SelectItem>
                                <SelectItem value="presentation">
                                  Presentation
                                </SelectItem>
                                <SelectItem value="video">Video</SelectItem>
                                <SelectItem value="assignment">
                                  Assignment
                                </SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="resource-description">
                              Description
                            </Label>
                            <Textarea
                              id="resource-description"
                              placeholder="Describe this resource"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="resource-file">Upload File</Label>
                            <div className="border-2 border-dashed border-muted-foreground/20 rounded-md p-6 text-center">
                              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm font-medium">
                                Drag and drop files here or click to browse
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Supports PDF, PPTX, MP4, and other formats up to
                                100MB
                              </p>
                              <Input
                                id="resource-file"
                                type="file"
                                className="hidden"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-4"
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Browse Files
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">Upload Resource</Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            Recent Resources
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {resources.map((resource, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-3 pb-3 border-b last:border-0"
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                                {resource.type === "document" && (
                                  <FileText className="h-5 w-5" />
                                )}
                                {resource.type === "video" && (
                                  <Video className="h-5 w-5" />
                                )}
                                {resource.type === "presentation" && (
                                  <Presentation className="h-5 w-5" />
                                )}
                              </div>
                              <div className="space-y-1">
                                <p className="font-medium">{resource.title}</p>
                                <p className="text-xs text-muted-foreground">
                                  Uploaded on {resource.date}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 px-2"
                                  >
                                    <Download className="h-3.5 w-3.5 mr-1" />
                                    Download
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 px-2"
                                  >
                                    <Share className="h-3.5 w-3.5 mr-1" />
                                    Share
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            View All Resources
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Resource Library</CardTitle>
                        <CardDescription>
                          All resources for Physics 101
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 mb-4">
                          <Input
                            placeholder="Search resources..."
                            className="max-w-sm"
                          />
                          <Button variant="outline" size="sm">
                            <Search className="h-4 w-4 mr-2" />
                            Search
                          </Button>
                        </div>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Title</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Date Added</TableHead>
                              <TableHead>Size</TableHead>
                              <TableHead>Downloads</TableHead>
                              <TableHead className="text-right">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {resources
                              .concat(additionalResources)
                              .map((resource, i) => (
                                <TableRow key={i}>
                                  <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                      {resource.type === "document" && (
                                        <FileText className="h-4 w-4 text-primary" />
                                      )}
                                      {resource.type === "video" && (
                                        <Video className="h-4 w-4 text-primary" />
                                      )}
                                      {resource.type === "presentation" && (
                                        <Presentation className="h-4 w-4 text-primary" />
                                      )}
                                      {resource.title}
                                    </div>
                                  </TableCell>
                                  <TableCell>{resource.type}</TableCell>
                                  <TableCell>{resource.date}</TableCell>
                                  <TableCell>
                                    {resource.size || "2.4 MB"}
                                  </TableCell>
                                  <TableCell>
                                    {resource.downloads ||
                                      Math.floor(Math.random() * 50) + 10}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                      <Button variant="ghost" size="icon">
                                        <Download className="h-4 w-4" />
                                      </Button>
                                      <Button variant="ghost" size="icon">
                                        <Share className="h-4 w-4" />
                                      </Button>
                                      <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}

// Missing component imports
const Menu = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const Video = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 2c-1.7 0-3 1.2-3 2.6v0l-2 1.2C5.3 6.8 4 9 4 11.5v.5" />
    <path d="M17 8.5V5l-2-1.2v0c0-1.4-1.3-2.6-3-2.6" />
    <path d="M22 12c0-4.4-3.6-8-8-8" />
    <path d="M2 12c0-4.4 3.6-8 8-8" />
    <path d="M22 12c0 4.4-3.6 8-8 8" />
    <path d="M2 12c0 4.4 3.6 8 8 8" />
    <path d="M18 18.5v-7l-5.5-3.5-5.5 3.5v7l5.5 3.5z" />
  </svg>
);

const Presentation = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M2 3h20" />
    <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
    <path d="m7 21 5-5 5 5" />
  </svg>
);

const Share = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" x2="12" y1="2" y2="15" />
  </svg>
);

// Sample data
const sidebarItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: "/teacher/dashboard",
  },
  {
    title: "Classes",
    icon: <BookOpen className="h-5 w-5" />,
    href: "/teacher/classes",
  },
  {
    title: "Students",
    icon: <Users className="h-5 w-5" />,
    href: "/teacher/students",
  },
  {
    title: "Attendance",
    icon: <Check className="h-5 w-5" />,
    href: "/teacher/attendance",
  },
  {
    title: "Grades",
    icon: <FileText className="h-5 w-5" />,
    href: "/teacher/grades",
  },
  {
    title: "Schedule",
    icon: <Calendar className="h-5 w-5" />,
    href: "/teacher/schedule",
  },
  {
    title: "Resources",
    icon: <Grid className="h-5 w-5" />,
    href: "/teacher/resources",
  },
  {
    title: "Messages",
    icon: <MessageSquare className="h-5 w-5" />,
    href: "/teacher/messages",
  },
  {
    title: "Profile",
    icon: <User className="h-5 w-5" />,
    href: "/teacher/profile",
  },
  {
    title: "Settings",
    icon: <Settings className="h-5 w-5" />,
    href: "/teacher/settings",
  },
];

const upcomingExams = [
  {
    title: "Midterm Exam",
    class: "Physics 101",
    date: "Mar 28, 2025",
    time: "10:00 AM",
  },
  {
    title: "Lab Assessment",
    class: "Physics 101",
    date: "Apr 2, 2025",
    time: "2:30 PM",
  },
  {
    title: "Quiz 3",
    class: "Chemistry 101",
    date: "Apr 5, 2025",
    time: "9:15 AM",
  },
];

const pendingTasks = [
  { title: "Grade Midterm Papers", due: "Mar 30, 2025", priority: "high" },
  { title: "Prepare Lab Materials", due: "Mar 27, 2025", priority: "medium" },
  {
    title: "Submit Attendance Report",
    due: "Mar 29, 2025",
    priority: "medium",
  },
  { title: "Update Lesson Plan", due: "Apr 3, 2025", priority: "low" },
];

const students = [
  {
    name: "Emma Johnson",
    id: "ST10045",
    status: "present",
    grades: { score: 92, grade: "A", comments: "Excellent work" },
  },
  {
    name: "Liam Smith",
    id: "ST10046",
    status: "present",
    grades: { score: 85, grade: "B", comments: "Good understanding" },
  },
  {
    name: "Olivia Brown",
    id: "ST10047",
    status: "present",
    grades: {
      score: 78,
      grade: "C+",
      comments: "Needs improvement in formulas",
    },
  },
  {
    name: "Noah Davis",
    id: "ST10048",
    status: "late",
    note: "Bus delay",
    grades: { score: 88, grade: "B+", comments: "Strong problem-solving" },
  },
  {
    name: "Ava Wilson",
    id: "ST10049",
    status: "present",
    grades: { score: 95, grade: "A", comments: "Outstanding performance" },
  },
  {
    name: "William Taylor",
    id: "ST10050",
    status: "present",
    grades: { score: 82, grade: "B-", comments: "Good effort" },
  },
  {
    name: "Sophia Martinez",
    id: "ST10051",
    status: "absent",
    note: "Medical appointment",
    grades: { score: 0, grade: "N/A", comments: "Absent for exam" },
  },
  {
    name: "James Anderson",
    id: "ST10052",
    status: "present",
    grades: { score: 79, grade: "C+", comments: "Improving steadily" },
  },
  {
    name: "Isabella Thomas",
    id: "ST10053",
    status: "present",
    grades: { score: 91, grade: "A-", comments: "Very thorough work" },
  },
  {
    name: "Benjamin Jackson",
    id: "ST10054",
    status: "present",
    grades: { score: 84, grade: "B", comments: "Good understanding" },
  },
  {
    name: "Mia White",
    id: "ST10055",
    status: "present",
    grades: { score: 89, grade: "B+", comments: "Strong analytical skills" },
  },
  {
    name: "Charlotte Harris",
    id: "ST10056",
    status: "present",
    grades: { score: 93, grade: "A", comments: "Excellent comprehension" },
  },
  {
    name: "Elijah Martin",
    id: "ST10057",
    status: "present",
    grades: { score: 76, grade: "C", comments: "Needs more practice" },
  },
  {
    name: "Amelia Thompson",
    id: "ST10058",
    status: "present",
    grades: { score: 87, grade: "B+", comments: "Good progress" },
  },
  {
    name: "Lucas Garcia",
    id: "ST10059",
    status: "late",
    note: "Traffic",
    grades: { score: 81, grade: "B-", comments: "Satisfactory work" },
  },
  {
    name: "Harper Martinez",
    id: "ST10060",
    status: "present",
    grades: { score: 94, grade: "A", comments: "Exceptional work" },
  },
  {
    name: "Mason Robinson",
    id: "ST10061",
    status: "present",
    grades: { score: 83, grade: "B", comments: "Good effort" },
  },
  {
    name: "Evelyn Clark",
    id: "ST10062",
    status: "present",
    grades: { score: 90, grade: "A-", comments: "Very good understanding" },
  },
  {
    name: "Logan Rodriguez",
    id: "ST10063",
    status: "present",
    grades: { score: 86, grade: "B", comments: "Solid performance" },
  },
  {
    name: "Abigail Lewis",
    id: "ST10064",
    status: "present",
    grades: { score: 88, grade: "B+", comments: "Strong problem-solving" },
  },
  {
    name: "Ethan Lee",
    id: "ST10065",
    status: "excused",
    note: "School competition",
    grades: { score: 0, grade: "N/A", comments: "Excused absence" },
  },
  {
    name: "Avery Walker",
    id: "ST10066",
    status: "present",
    grades: { score: 85, grade: "B", comments: "Good understanding" },
  },
  {
    name: "Scarlett Hall",
    id: "ST10067",
    status: "present",
    grades: { score: 92, grade: "A", comments: "Excellent work" },
  },
  {
    name: "Jackson Allen",
    id: "ST10068",
    status: "present",
    grades: { score: 80, grade: "B-", comments: "Satisfactory work" },
  },
];

const scheduleTimeSlots = [
  "8:00 - 9:00",
  "9:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 1:00",
  "1:00 - 2:00",
  "2:00 - 3:00",
  "3:00 - 4:00",
];

const schedule = [
  { day: "monday", time: "8:00 - 9:00", class: "Physics 101", room: "SCI-4" },
  { day: "monday", time: "11:00 - 12:00", class: "Physics 102", room: "SCI-4" },
  {
    day: "tuesday",
    time: "9:00 - 10:00",
    class: "Chemistry 101",
    room: "SCI-2",
  },
  {
    day: "tuesday",
    time: "1:00 - 2:00",
    class: "Physics 101 Lab",
    room: "LAB-1",
  },
  {
    day: "wednesday",
    time: "8:00 - 9:00",
    class: "Physics 101",
    room: "SCI-4",
  },
  {
    day: "wednesday",
    time: "2:00 - 3:00",
    class: "Department Meeting",
    room: "CONF-1",
  },
  {
    day: "thursday",
    time: "10:00 - 11:00",
    class: "Physics 102",
    room: "SCI-4",
  },
  { day: "thursday", time: "1:00 - 2:00", class: "Biology 101", room: "SCI-3" },
  { day: "friday", time: "9:00 - 10:00", class: "Physics 101", room: "SCI-4" },
  {
    day: "friday",
    time: "11:00 - 12:00",
    class: "Office Hours",
    room: "OFF-2",
  },
];

const recentMessages = [
  {
    from: "Emma Johnson",
    time: "Today, 10:23 AM",
    subject: "Question about homework",
    preview: "I'm having trouble with problem #5 on the...",
  },
  {
    from: "Michael Chen",
    time: "Yesterday, 3:45 PM",
    subject: "Absence notification",
    preview: "My son will be absent tomorrow due to a doctor's...",
  },
  {
    from: "Principal Roberts",
    time: "Mar 24, 2:15 PM",
    subject: "Faculty meeting reminder",
    preview: "This is a reminder that we have a faculty meeting...",
  },
  {
    from: "Sarah Williams",
    time: "Mar 23, 9:30 AM",
    subject: "Lab equipment request",
    preview: "Could we get additional microscopes for next week's...",
  },
];

const resources = [
  { title: "Physics 101 Syllabus", type: "document", date: "Jan 15, 2025" },
  { title: "Wave Motion Lecture", type: "presentation", date: "Mar 10, 2025" },
  { title: "Lab Safety Tutorial", type: "video", date: "Feb 5, 2025" },
  { title: "Midterm Study Guide", type: "document", date: "Mar 20, 2025" },
];

const additionalResources = [
  { title: "Newton's Laws Worksheet", type: "document", date: "Feb 12, 2025" },
  { title: "Gravity Simulation Demo", type: "video", date: "Feb 25, 2025" },
  { title: "Circuit Lab Instructions", type: "document", date: "Mar 5, 2025" },
  {
    title: "Quantum Physics Introduction",
    type: "presentation",
    date: "Mar 15, 2025",
  },
  { title: "Exam Review Questions", type: "document", date: "Mar 22, 2025" },
];
