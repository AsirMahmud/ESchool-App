"use client";

import { useState } from "react";
import {
  Bell,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  FileText,
  GraduationCap,
  Grid,
  LayoutDashboard,
  MessageSquare,
  Moon,
  Settings,
  Sun,
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

// Menu icon component
const MenuIcon = ({ className }) => (
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
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

// Sidebar items
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
    title: "Attendees",
    icon: <Check className="h-5 w-5" />,
    href: "/teacher/attendees",
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

// Sample classes data
const classes = [
  { id: "physics101", name: "Physics 101", grade: "11", students: 24 },
  { id: "physics102", name: "Physics 102", grade: "11", students: 22 },
  { id: "chemistry101", name: "Chemistry 101", grade: "10", students: 26 },
  { id: "biology101", name: "Biology 101", grade: "10", students: 25 },
];

// Sample students data
const students = [
  { id: "ST10045", name: "Emma Johnson", avatar: "EJ", status: "present" },
  { id: "ST10046", name: "Liam Smith", avatar: "LS", status: "present" },
  { id: "ST10047", name: "Olivia Brown", avatar: "OB", status: "present" },
  {
    id: "ST10048",
    name: "Noah Davis",
    avatar: "ND",
    status: "late",
    note: "Bus delay",
  },
  { id: "ST10049", name: "Ava Wilson", avatar: "AW", status: "present" },
  { id: "ST10050", name: "William Taylor", avatar: "WT", status: "present" },
  {
    id: "ST10051",
    name: "Sophia Martinez",
    avatar: "SM",
    status: "absent",
    note: "Medical appointment",
  },
  { id: "ST10052", name: "James Anderson", avatar: "JA", status: "present" },
  { id: "ST10053", name: "Isabella Thomas", avatar: "IT", status: "present" },
  { id: "ST10054", name: "Benjamin Jackson", avatar: "BJ", status: "present" },
  { id: "ST10055", name: "Mia White", avatar: "MW", status: "present" },
  { id: "ST10056", name: "Charlotte Harris", avatar: "CH", status: "present" },
  { id: "ST10057", name: "Elijah Martin", avatar: "EM", status: "present" },
  { id: "ST10058", name: "Amelia Thompson", avatar: "AT", status: "present" },
  {
    id: "ST10059",
    name: "Lucas Garcia",
    avatar: "LG",
    status: "late",
    note: "Traffic",
  },
  { id: "ST10060", name: "Harper Martinez", avatar: "HM", status: "present" },
  { id: "ST10061", name: "Mason Robinson", avatar: "MR", status: "present" },
  { id: "ST10062", name: "Evelyn Clark", avatar: "EC", status: "present" },
  { id: "ST10063", name: "Logan Rodriguez", avatar: "LR", status: "present" },
  { id: "ST10064", name: "Abigail Lewis", avatar: "AL", status: "present" },
  {
    id: "ST10065",
    name: "Ethan Lee",
    avatar: "EL",
    status: "excused",
    note: "School competition",
  },
  { id: "ST10066", name: "Avery Walker", avatar: "AW", status: "present" },
  { id: "ST10067", name: "Scarlett Hall", avatar: "SH", status: "present" },
  { id: "ST10068", name: "Jackson Allen", avatar: "JA", status: "present" },
];

// Sample attendance data for the month
const generateMonthlyAttendance = () => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const attendanceData = {};

  students.forEach((student) => {
    attendanceData[student.id] = {};
    days.forEach((day) => {
      const rand = Math.random();
      let status = "present";
      if (rand > 0.9) status = "absent";
      else if (rand > 0.85) status = "late";
      else if (rand > 0.8) status = "excused";

      attendanceData[student.id][day] = status;
    });
  });

  return attendanceData;
};

const monthlyAttendance = generateMonthlyAttendance();

export default function TeacherAttendeesPage() {
  const [theme, setTheme] = useState("light");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("physics101");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"daily" | "weekly" | "monthly">(
    "daily"
  );
  const [studentAttendance, setStudentAttendance] = useState(() => {
    return students.map((student) => ({
      ...student,
      status: student.status || "present",
    }));
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const handleStatusChange = (studentId, status) => {
    setStudentAttendance((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, status } : student
      )
    );
  };

  const handleNoteChange = (studentId, note) => {
    setStudentAttendance((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, note } : student
      )
    );
  };

  const markAllPresent = () => {
    setStudentAttendance((prev) =>
      prev.map((student) => ({ ...student, status: "present" }))
    );
  };

  // Get current date in format: March 26, 2025
  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Previous and next day handlers
  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  // Calculate attendance statistics
  const attendanceStats = {
    present: studentAttendance.filter((s) => s.status === "present").length,
    late: studentAttendance.filter((s) => s.status === "late").length,
    absent: studentAttendance.filter((s) => s.status === "absent").length,
    excused: studentAttendance.filter((s) => s.status === "excused").length,
    total: studentAttendance.length,
  };

  const attendanceRate = Math.round(
    ((attendanceStats.present + attendanceStats.late) / attendanceStats.total) *
      100
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-5 w-5" />
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
                        item.title === "Attendees" ? "secondary" : "ghost"
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
                  variant={item.title === "Attendees" ? "secondary" : "ghost"}
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Attendance Management
                </h1>
                <p className="text-muted-foreground">
                  Track and manage student attendance
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Select Date
                </Button>
              </div>
            </div>

            {/* Attendance Summary Stats */}
            <div className="grid gap-4 md:grid-cols-5">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Present</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {attendanceStats.present}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(
                      (attendanceStats.present / attendanceStats.total) * 100
                    )}
                    % of students
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Late</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">
                    {attendanceStats.late}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(
                      (attendanceStats.late / attendanceStats.total) * 100
                    )}
                    % of students
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Absent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {attendanceStats.absent}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(
                      (attendanceStats.absent / attendanceStats.total) * 100
                    )}
                    % of students
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Excused</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {attendanceStats.excused}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(
                      (attendanceStats.excused / attendanceStats.total) * 100
                    )}
                    % of students
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Attendance Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{attendanceRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    {attendanceRate >= 90
                      ? "Excellent"
                      : attendanceRate >= 80
                      ? "Good"
                      : "Needs improvement"}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Attendance View Tabs */}
            <Tabs
              defaultValue="daily"
              onValueChange={(value) =>
                setViewMode(value as "daily" | "weekly" | "monthly")
              }
            >
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={goToPreviousDay}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-sm font-medium">{formattedDate}</div>
                  <Button variant="outline" size="sm" onClick={goToNextDay}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Daily Attendance View */}
              <TabsContent value="daily">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Daily Attendance</CardTitle>
                        <CardDescription>
                          {classes.find((c) => c.id === selectedClass)?.name} -{" "}
                          {formattedDate}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={markAllPresent}
                        >
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
                        {studentAttendance.map((student, i) => (
                          <TableRow key={student.id}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback>
                                    {student.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                {student.name}
                              </div>
                            </TableCell>
                            <TableCell>{student.id}</TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                id={`present-${student.id}`}
                                checked={student.status === "present"}
                                onCheckedChange={() =>
                                  handleStatusChange(student.id, "present")
                                }
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                id={`late-${student.id}`}
                                checked={student.status === "late"}
                                onCheckedChange={() =>
                                  handleStatusChange(student.id, "late")
                                }
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                id={`absent-${student.id}`}
                                checked={student.status === "absent"}
                                onCheckedChange={() =>
                                  handleStatusChange(student.id, "absent")
                                }
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                id={`excused-${student.id}`}
                                checked={student.status === "excused"}
                                onCheckedChange={() =>
                                  handleStatusChange(student.id, "excused")
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                placeholder="Add note"
                                defaultValue={student.note || ""}
                                className="h-8"
                                onChange={(e) =>
                                  handleNoteChange(student.id, e.target.value)
                                }
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      Present: {attendanceStats.present} | Late:{" "}
                      {attendanceStats.late} | Absent: {attendanceStats.absent}{" "}
                      | Excused: {attendanceStats.excused}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button>Save Attendance</Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Weekly Attendance View */}
              <TabsContent value="weekly">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Weekly Attendance</CardTitle>
                        <CardDescription>
                          {classes.find((c) => c.id === selectedClass)?.name} -
                          Week of {formattedDate}
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export Report
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">Student</TableHead>
                          <TableHead className="text-center">Mon</TableHead>
                          <TableHead className="text-center">Tue</TableHead>
                          <TableHead className="text-center">Wed</TableHead>
                          <TableHead className="text-center">Thu</TableHead>
                          <TableHead className="text-center">Fri</TableHead>
                          <TableHead className="text-right">
                            Weekly Rate
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students.slice(0, 10).map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback>
                                    {student.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="truncate">{student.name}</div>
                              </div>
                            </TableCell>
                            {["Mon", "Tue", "Wed", "Thu", "Fri"].map(
                              (day, i) => {
                                // Generate random attendance for demo
                                const rand = Math.random();
                                let status = "present";
                                if (rand > 0.9) status = "absent";
                                else if (rand > 0.85) status = "late";
                                else if (rand > 0.8) status = "excused";

                                return (
                                  <TableCell
                                    key={day}
                                    className="text-center p-2"
                                  >
                                    <div className="flex justify-center">
                                      {status === "present" && (
                                        <Check className="h-4 w-4 text-green-500" />
                                      )}
                                      {status === "late" && (
                                        <Clock className="h-4 w-4 text-amber-500" />
                                      )}
                                      {status === "absent" && (
                                        <X className="h-4 w-4 text-red-500" />
                                      )}
                                      {status === "excused" && (
                                        <FileText className="h-4 w-4 text-blue-500" />
                                      )}
                                    </div>
                                  </TableCell>
                                );
                              }
                            )}
                            <TableCell className="text-right">
                              <Badge variant="outline">
                                {Math.floor(Math.random() * 10) + 90}%
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Present</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-amber-500" />
                        <span>Late</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <X className="h-4 w-4 text-red-500" />
                        <span>Absent</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span>Excused</span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Monthly Attendance View */}
              <TabsContent value="monthly">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Monthly Attendance</CardTitle>
                        <CardDescription>
                          {classes.find((c) => c.id === selectedClass)?.name} -{" "}
                          {selectedDate.toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Select defaultValue="march">
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Select month" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="january">
                              January 2025
                            </SelectItem>
                            <SelectItem value="february">
                              February 2025
                            </SelectItem>
                            <SelectItem value="march">March 2025</SelectItem>
                            <SelectItem value="april">April 2025</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="overflow-auto">
                    <div className="min-w-[800px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[150px]">Student</TableHead>
                            {[
                              1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 15, 16, 17, 18,
                              19, 22, 23, 24, 25, 26, 29, 30, 31,
                            ].map((day) => (
                              <TableHead key={day} className="text-center w-10">
                                {day}
                              </TableHead>
                            ))}
                            <TableHead className="text-right">Rate</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {students.slice(0, 8).map((student, i) => (
                            <TableRow key={student.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback>
                                      {student.avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                  {student.name.split(" ")[0]}{" "}
                                  {student.name.split(" ")[1][0]}.
                                </div>
                              </TableCell>
                              {[
                                1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 15, 16, 17, 18,
                                19, 22, 23, 24, 25, 26, 29, 30, 31,
                              ].map((day) => {
                                // Use the pre-generated attendance data
                                const status =
                                  monthlyAttendance[student.id]?.[day] ||
                                  "present";

                                return (
                                  <TableCell
                                    key={day}
                                    className="text-center p-2"
                                  >
                                    <div className="flex justify-center">
                                      {status === "present" && (
                                        <Check className="h-4 w-4 text-green-500" />
                                      )}
                                      {status === "late" && (
                                        <Clock className="h-4 w-4 text-amber-500" />
                                      )}
                                      {status === "absent" && (
                                        <X className="h-4 w-4 text-red-500" />
                                      )}
                                      {status === "excused" && (
                                        <FileText className="h-4 w-4 text-blue-500" />
                                      )}
                                    </div>
                                  </TableCell>
                                );
                              })}
                              <TableCell className="text-right">
                                <Badge variant="outline">
                                  {Math.floor(Math.random() * 10) + 90}%
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="flex items-center gap-4 mt-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Present</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-amber-500" />
                        <span>Late</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <X className="h-4 w-4 text-red-500" />
                        <span>Absent</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span>Excused</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Attendance Insights */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Trends</CardTitle>
                  <CardDescription>
                    Attendance patterns over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
                    <p className="text-muted-foreground">
                      Attendance trend chart will be displayed here
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Students with Attendance Concerns</CardTitle>
                  <CardDescription>
                    Students with low attendance rates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {students.slice(0, 3).map((student, i) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between rounded-md border border-red-200 bg-red-50 p-4"
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>{student.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {student.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {
                                [
                                  "Attendance rate: 75%",
                                  "Missed 5 classes this month",
                                  "Often late to class",
                                ][i]
                              }
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Contact
                          </Button>
                          <Button size="sm">
                            <User className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Attendance Concerns
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
