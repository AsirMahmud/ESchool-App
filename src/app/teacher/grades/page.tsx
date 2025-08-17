"use client";

import { useState } from "react";
import {
  ArrowUpDown,
  BarChart3,
  Bell,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  Download,
  FileText,
  Filter,
  GraduationCap,
  Grid,
  LayoutDashboard,
  LineChart,
  MessageSquare,
  Moon,
  MoreHorizontal,
  PenLine,
  PieChart,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
  {
    id: "ST10045",
    name: "Emma Johnson",
    avatar: "EJ",
    grades: [
      {
        assignment: "Midterm Exam",
        score: 92,
        outOf: 100,
        percentage: 92,
        letterGrade: "A",
        comments: "Excellent work",
      },
      {
        assignment: "Lab Report 1",
        score: 45,
        outOf: 50,
        percentage: 90,
        letterGrade: "A",
        comments: "Great analysis",
      },
      {
        assignment: "Quiz 1",
        score: 18,
        outOf: 20,
        percentage: 90,
        letterGrade: "A",
        comments: "Perfect understanding",
      },
      {
        assignment: "Homework 1",
        score: 28,
        outOf: 30,
        percentage: 93,
        letterGrade: "A",
        comments: "Well done",
      },
    ],
    average: 91.5,
    letterGrade: "A",
  },
  {
    id: "ST10046",
    name: "Liam Smith",
    avatar: "LS",
    grades: [
      {
        assignment: "Midterm Exam",
        score: 85,
        outOf: 100,
        percentage: 85,
        letterGrade: "B",
        comments: "Good understanding",
      },
      {
        assignment: "Lab Report 1",
        score: 42,
        outOf: 50,
        percentage: 84,
        letterGrade: "B",
        comments: "Solid work",
      },
      {
        assignment: "Quiz 1",
        score: 17,
        outOf: 20,
        percentage: 85,
        letterGrade: "B",
        comments: "Good effort",
      },
      {
        assignment: "Homework 1",
        score: 26,
        outOf: 30,
        percentage: 87,
        letterGrade: "B+",
        comments: "Strong effort",
      },
    ],
    average: 85.25,
    letterGrade: "B",
  },
  {
    id: "ST10047",
    name: "Olivia Brown",
    avatar: "OB",
    grades: [
      {
        assignment: "Midterm Exam",
        score: 78,
        outOf: 100,
        percentage: 78,
        letterGrade: "C+",
        comments: "Needs improvement in formulas",
      },
      {
        assignment: "Lab Report 1",
        score: 38,
        outOf: 50,
        percentage: 76,
        letterGrade: "C",
        comments: "Adequate work",
      },
      {
        assignment: "Quiz 1",
        score: 15,
        outOf: 20,
        percentage: 75,
        letterGrade: "C",
        comments: "Review key concepts",
      },
      {
        assignment: "Homework 1",
        score: 24,
        outOf: 30,
        percentage: 80,
        letterGrade: "B-",
        comments: "Improving",
      },
    ],
    average: 77.25,
    letterGrade: "C+",
  },
  {
    id: "ST10048",
    name: "Noah Davis",
    avatar: "ND",
    grades: [
      {
        assignment: "Midterm Exam",
        score: 88,
        outOf: 100,
        percentage: 88,
        letterGrade: "B+",
        comments: "Strong problem-solving",
      },
      {
        assignment: "Lab Report 1",
        score: 44,
        outOf: 50,
        percentage: 88,
        letterGrade: "B+",
        comments: "Excellent lab work",
      },
      {
        assignment: "Quiz 1",
        score: 18,
        outOf: 20,
        percentage: 90,
        letterGrade: "A",
        comments: "Great improvement",
      },
      {
        assignment: "Homework 1",
        score: 27,
        outOf: 30,
        percentage: 90,
        letterGrade: "A",
        comments: "Very thorough",
      },
    ],
    average: 89,
    letterGrade: "B+",
  },
  {
    id: "ST10049",
    name: "Ava Wilson",
    avatar: "AW",
    grades: [
      {
        assignment: "Midterm Exam",
        score: 95,
        outOf: 100,
        percentage: 95,
        letterGrade: "A",
        comments: "Outstanding performance",
      },
      {
        assignment: "Lab Report 1",
        score: 48,
        outOf: 50,
        percentage: 96,
        letterGrade: "A",
        comments: "Exceptional work",
      },
      {
        assignment: "Quiz 1",
        score: 19,
        outOf: 20,
        percentage: 95,
        letterGrade: "A",
        comments: "Excellent",
      },
      {
        assignment: "Homework 1",
        score: 29,
        outOf: 30,
        percentage: 97,
        letterGrade: "A",
        comments: "Perfect",
      },
    ],
    average: 95.75,
    letterGrade: "A",
  },
];

// Generate more students
for (let i = 5; i < 24; i++) {
  const firstName = [
    "James",
    "Sophia",
    "William",
    "Isabella",
    "Benjamin",
    "Mia",
    "Elijah",
    "Charlotte",
    "Lucas",
    "Amelia",
  ][i % 10];
  const lastName = [
    "Anderson",
    "Thomas",
    "Jackson",
    "White",
    "Harris",
    "Martin",
    "Thompson",
    "Garcia",
    "Martinez",
    "Robinson",
  ][i % 10];
  const initials = `${firstName[0]}${lastName[0]}`;

  // Generate random grades
  const midterm = Math.floor(Math.random() * 30) + 70; // 70-99
  const lab = Math.floor(Math.random() * 15) + 35; // 35-49
  const quiz = Math.floor(Math.random() * 5) + 15; // 15-19
  const homework = Math.floor(Math.random() * 6) + 24; // 24-29

  const midtermPct = midterm;
  const labPct = (lab / 50) * 100;
  const quizPct = (quiz / 20) * 100;
  const homeworkPct = (homework / 30) * 100;

  const average = (midtermPct + labPct + quizPct + homeworkPct) / 4;

  let letterGrade = "F";
  if (average >= 90) letterGrade = "A";
  else if (average >= 80) letterGrade = "B";
  else if (average >= 70) letterGrade = "C";
  else if (average >= 60) letterGrade = "D";

  students.push({
    id: `ST${10050 + i}`,
    name: `${firstName} ${lastName}`,
    avatar: initials,
    grades: [
      {
        assignment: "Midterm Exam",
        score: midterm,
        outOf: 100,
        percentage: midtermPct,
        letterGrade: getLetterGrade(midtermPct),
        comments: "",
      },
      {
        assignment: "Lab Report 1",
        score: lab,
        outOf: 50,
        percentage: labPct,
        letterGrade: getLetterGrade(labPct),
        comments: "",
      },
      {
        assignment: "Quiz 1",
        score: quiz,
        outOf: 20,
        percentage: quizPct,
        letterGrade: getLetterGrade(quizPct),
        comments: "",
      },
      {
        assignment: "Homework 1",
        score: homework,
        outOf: 30,
        percentage: homeworkPct,
        letterGrade: getLetterGrade(homeworkPct),
        comments: "",
      },
    ],
    average: average,
    letterGrade: letterGrade,
  });
}

// Helper function to get letter grade
function getLetterGrade(percentage) {
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  if (percentage >= 60) return "D";
  return "F";
}

// Sample assignments data
const assignments = [
  {
    id: "midterm",
    title: "Midterm Exam",
    type: "Exam",
    dueDate: "Mar 15, 2025",
    totalPoints: 100,
    weight: 30,
    average: 84.2,
    status: "Graded",
  },
  {
    id: "lab1",
    title: "Lab Report 1",
    type: "Lab",
    dueDate: "Feb 28, 2025",
    totalPoints: 50,
    weight: 20,
    average: 86.5,
    status: "Graded",
  },
  {
    id: "quiz1",
    title: "Quiz 1",
    type: "Quiz",
    dueDate: "Feb 15, 2025",
    totalPoints: 20,
    weight: 15,
    average: 82.8,
    status: "Graded",
  },
  {
    id: "hw1",
    title: "Homework 1",
    type: "Homework",
    dueDate: "Feb 10, 2025",
    totalPoints: 30,
    weight: 10,
    average: 88.3,
    status: "Graded",
  },
  {
    id: "final",
    title: "Final Exam",
    type: "Exam",
    dueDate: "May 20, 2025",
    totalPoints: 100,
    weight: 40,
    average: null,
    status: "Upcoming",
  },
  {
    id: "lab2",
    title: "Lab Report 2",
    type: "Lab",
    dueDate: "Apr 10, 2025",
    totalPoints: 50,
    weight: 20,
    average: null,
    status: "Upcoming",
  },
  {
    id: "quiz2",
    title: "Quiz 2",
    type: "Quiz",
    dueDate: "Mar 30, 2025",
    totalPoints: 20,
    weight: 15,
    average: null,
    status: "Upcoming",
  },
];

// Grade distribution data
const gradeDistribution = {
  A: 6,
  B: 8,
  C: 7,
  D: 2,
  F: 1,
};

export default function TeacherGradesPage() {
  const [theme, setTheme] = useState("light");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("physics101");
  const [selectedAssignment, setSelectedAssignment] = useState("midterm");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [filterGrade, setFilterGrade] = useState("all");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  // Sort students based on current sort configuration
  const sortedStudents = [...students].sort((a, b) => {
    if (sortConfig.key === "name") {
      return sortConfig.direction === "ascending"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortConfig.key === "average") {
      return sortConfig.direction === "ascending"
        ? a.average - b.average
        : b.average - a.average;
    }
    return 0;
  });

  // Filter students by grade if filter is active
  const filteredStudents =
    filterGrade === "all"
      ? sortedStudents
      : sortedStudents.filter((student) => student.letterGrade === filterGrade);

  // Request sort
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Get the selected assignment details
  const selectedAssignmentDetails = assignments.find(
    (a) => a.id === selectedAssignment
  );

  // Get the selected student details
  const selectedStudentDetails = students.find((s) => s.id === selectedStudent);

  // Calculate class average
  const classAverage =
    students.reduce((sum, student) => sum + student.average, 0) /
    students.length;

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
                      variant={item.title === "Grades" ? "secondary" : "ghost"}
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
                  variant={item.title === "Grades" ? "secondary" : "ghost"}
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
                  Grade Management
                </h1>
                <p className="text-muted-foreground">
                  Track and manage student grades
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Assignment
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Assignment</DialogTitle>
                      <DialogDescription>
                        Add a new assignment or assessment to your class
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="assignment-title"
                          className="text-right"
                        >
                          Title
                        </Label>
                        <Input
                          id="assignment-title"
                          placeholder="e.g. Midterm Exam"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="assignment-type" className="text-right">
                          Type
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="exam">Exam</SelectItem>
                            <SelectItem value="quiz">Quiz</SelectItem>
                            <SelectItem value="homework">Homework</SelectItem>
                            <SelectItem value="lab">Lab Report</SelectItem>
                            <SelectItem value="project">Project</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="due-date" className="text-right">
                          Due Date
                        </Label>
                        <Input
                          id="due-date"
                          type="date"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="total-points" className="text-right">
                          Total Points
                        </Label>
                        <Input
                          id="total-points"
                          type="number"
                          placeholder="e.g. 100"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="weight" className="text-right">
                          Weight (%)
                        </Label>
                        <Input
                          id="weight"
                          type="number"
                          placeholder="e.g. 20"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Brief description of the assignment"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create Assignment</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Grade Summary Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Class Average
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {classAverage.toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Letter Grade: {getLetterGrade(classAverage)}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Highest Grade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {Math.max(...students.map((s) => s.average)).toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {
                      students.reduce(
                        (highest, student) =>
                          student.average > highest.average ? student : highest,
                        students[0]
                      ).name
                    }
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Lowest Grade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {Math.min(...students.map((s) => s.average)).toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {
                      students.reduce(
                        (lowest, student) =>
                          student.average < lowest.average ? student : lowest,
                        students[0]
                      ).name
                    }
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Assignments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{assignments.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {assignments.filter((a) => a.status === "Graded").length}{" "}
                    graded,{" "}
                    {assignments.filter((a) => a.status === "Upcoming").length}{" "}
                    upcoming
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Grade Management Tabs */}
            <Tabs defaultValue="gradebook">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="gradebook">Gradebook</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              {/* Gradebook Tab */}
              <TabsContent value="gradebook" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Class Gradebook</CardTitle>
                        <CardDescription>
                          {classes.find((c) => c.id === selectedClass)?.name} -
                          All Assignments
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="filter-grade" className="text-sm">
                            Filter:
                          </Label>
                          <Select
                            value={filterGrade}
                            onValueChange={setFilterGrade}
                          >
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Grade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Grades</SelectItem>
                              <SelectItem value="A">A</SelectItem>
                              <SelectItem value="B">B</SelectItem>
                              <SelectItem value="C">C</SelectItem>
                              <SelectItem value="D">D</SelectItem>
                              <SelectItem value="F">F</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[250px]">
                            <Button
                              variant="ghost"
                              className="flex items-center gap-1 p-0 h-auto font-medium"
                              onClick={() => requestSort("name")}
                            >
                              Student
                              <ArrowUpDown className="h-3 w-3" />
                            </Button>
                          </TableHead>
                          {assignments
                            .filter((a) => a.status === "Graded")
                            .map((assignment) => (
                              <TableHead
                                key={assignment.id}
                                className="text-center"
                              >
                                <div className="font-medium">
                                  {assignment.title}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {assignment.type} - {assignment.totalPoints}{" "}
                                  pts
                                </div>
                              </TableHead>
                            ))}
                          <TableHead className="text-center">
                            <Button
                              variant="ghost"
                              className="flex items-center gap-1 p-0 h-auto font-medium"
                              onClick={() => requestSort("average")}
                            >
                              Average
                              <ArrowUpDown className="h-3 w-3" />
                            </Button>
                          </TableHead>
                          <TableHead className="text-center">Grade</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStudents.map((student) => (
                          <TableRow
                            key={student.id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => setSelectedStudent(student.id)}
                          >
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
                            {student.grades.map((grade) => (
                              <TableCell
                                key={`${student.id}-${grade.assignment}`}
                                className="text-center"
                              >
                                <div className="font-medium">
                                  {grade.score}/{grade.outOf}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {grade.percentage}%
                                </div>
                              </TableCell>
                            ))}
                            <TableCell className="text-center font-medium">
                              {student.average.toFixed(1)}%
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge
                                className={
                                  student.letterGrade === "A"
                                    ? "bg-green-100 text-green-800"
                                    : student.letterGrade === "B"
                                    ? "bg-blue-100 text-blue-800"
                                    : student.letterGrade === "C"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : student.letterGrade === "D"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-red-100 text-red-800"
                                }
                              >
                                {student.letterGrade}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      Showing {filteredStudents.length} of {students.length}{" "}
                      students
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Import Grades
                      </Button>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export Grades
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Assignments Tab */}
              <TabsContent value="assignments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Assignments & Assessments</CardTitle>
                        <CardDescription>
                          Manage all assignments for{" "}
                          {classes.find((c) => c.id === selectedClass)?.name}
                        </CardDescription>
                      </div>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        New Assignment
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Assignment</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead>Total Points</TableHead>
                          <TableHead>Weight (%)</TableHead>
                          <TableHead>Class Average</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {assignments.map((assignment) => (
                          <TableRow
                            key={assignment.id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => setSelectedAssignment(assignment.id)}
                          >
                            <TableCell className="font-medium">
                              {assignment.title}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{assignment.type}</Badge>
                            </TableCell>
                            <TableCell>{assignment.dueDate}</TableCell>
                            <TableCell>{assignment.totalPoints}</TableCell>
                            <TableCell>{assignment.weight}%</TableCell>
                            <TableCell>
                              {assignment.average
                                ? `${assignment.average}%`
                                : "Not graded"}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  assignment.status === "Graded"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {assignment.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <PenLine className="h-4 w-4" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      Edit Assignment
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Grade Assignment
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                      Delete Assignment
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Selected Assignment Details */}
                {selectedAssignmentDetails && (
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>
                            {selectedAssignmentDetails.title}
                          </CardTitle>
                          <CardDescription>
                            {selectedAssignmentDetails.type} - Due{" "}
                            {selectedAssignmentDetails.dueDate}
                          </CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                          <PenLine className="h-4 w-4 mr-2" />
                          Edit Assignment
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Total Points</h4>
                          <p>{selectedAssignmentDetails.totalPoints}</p>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Weight</h4>
                          <p>
                            {selectedAssignmentDetails.weight}% of final grade
                          </p>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Status</h4>
                          <Badge
                            variant={
                              selectedAssignmentDetails.status === "Graded"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {selectedAssignmentDetails.status}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Class Average</h4>
                          <p>
                            {selectedAssignmentDetails.average
                              ? `${selectedAssignmentDetails.average}%`
                              : "Not graded"}
                          </p>
                        </div>
                      </div>

                      {selectedAssignmentDetails.status === "Graded" && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">
                            Grade Distribution
                          </h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-16 text-xs">A (90-100%)</div>
                              <div className="flex-1">
                                <div
                                  className="h-2 bg-green-500 rounded-full"
                                  style={{ width: "35%" }}
                                ></div>
                              </div>
                              <div className="text-xs">35%</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-16 text-xs">B (80-89%)</div>
                              <div className="flex-1">
                                <div
                                  className="h-2 bg-blue-500 rounded-full"
                                  style={{ width: "40%" }}
                                ></div>
                              </div>
                              <div className="text-xs">40%</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-16 text-xs">C (70-79%)</div>
                              <div className="flex-1">
                                <div
                                  className="h-2 bg-yellow-500 rounded-full"
                                  style={{ width: "20%" }}
                                ></div>
                              </div>
                              <div className="text-xs">20%</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-16 text-xs">D (60-69%)</div>
                              <div className="flex-1">
                                <div
                                  className="h-2 bg-orange-500 rounded-full"
                                  style={{ width: "5%" }}
                                ></div>
                              </div>
                              <div className="text-xs">5%</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-16 text-xs">F (0-59%)</div>
                              <div className="flex-1">
                                <div
                                  className="h-2 bg-red-500 rounded-full"
                                  style={{ width: "0%" }}
                                ></div>
                              </div>
                              <div className="text-xs">0%</div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Student Grades</h4>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Student</TableHead>
                              <TableHead>Score</TableHead>
                              <TableHead>Percentage</TableHead>
                              <TableHead>Grade</TableHead>
                              <TableHead>Comments</TableHead>
                              <TableHead className="text-right">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {students.slice(0, 5).map((student) => {
                              const grade = student.grades.find(
                                (g) =>
                                  g.assignment ===
                                  selectedAssignmentDetails.title
                              );
                              return (
                                <TableRow key={student.id}>
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
                                  <TableCell>
                                    {grade
                                      ? `${grade.score}/${grade.outOf}`
                                      : "Not graded"}
                                  </TableCell>
                                  <TableCell>
                                    {grade ? `${grade.percentage}%` : "N/A"}
                                  </TableCell>
                                  <TableCell>
                                    {grade ? (
                                      <Badge
                                        className={
                                          grade.letterGrade === "A"
                                            ? "bg-green-100 text-green-800"
                                            : grade.letterGrade === "B"
                                            ? "bg-blue-100 text-blue-800"
                                            : grade.letterGrade === "C"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : grade.letterGrade === "D"
                                            ? "bg-orange-100 text-orange-800"
                                            : "bg-red-100 text-red-800"
                                        }
                                      >
                                        {grade.letterGrade}
                                      </Badge>
                                    ) : (
                                      "N/A"
                                    )}
                                  </TableCell>
                                  <TableCell className="max-w-[200px] truncate">
                                    {grade?.comments || "No comments"}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">
                                      <PenLine className="h-4 w-4 mr-2" />
                                      Edit
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm">
                            View All Students
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Students Tab */}
              <TabsContent value="students" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Student Performance</CardTitle>
                        <CardDescription>
                          Individual student grades and performance
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="search"
                            placeholder="Search students..."
                            className="w-[200px] pl-8"
                          />
                        </div>
                        <Button variant="outline" size="icon">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {students.map((student) => (
                        <Card
                          key={student.id}
                          className={`cursor-pointer hover:bg-muted/50 ${
                            selectedStudent === student.id
                              ? "border-primary"
                              : ""
                          }`}
                          onClick={() => setSelectedStudent(student.id)}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2">
                                <Avatar>
                                  <AvatarFallback>
                                    {student.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-base">
                                    {student.name}
                                  </CardTitle>
                                  <CardDescription>
                                    {student.id}
                                  </CardDescription>
                                </div>
                              </div>
                              <Badge
                                className={
                                  student.letterGrade === "A"
                                    ? "bg-green-100 text-green-800"
                                    : student.letterGrade === "B"
                                    ? "bg-blue-100 text-blue-800"
                                    : student.letterGrade === "C"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : student.letterGrade === "D"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-red-100 text-red-800"
                                }
                              >
                                {student.letterGrade}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Average:</span>
                                <span className="font-medium">
                                  {student.average.toFixed(1)}%
                                </span>
                              </div>
                              <Progress
                                value={student.average}
                                className="h-2"
                              />
                              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                                <div>Assignments: {student.grades.length}</div>
                                <div className="text-right">
                                  {student.average >= 90
                                    ? "Excellent"
                                    : student.average >= 80
                                    ? "Good"
                                    : student.average >= 70
                                    ? "Satisfactory"
                                    : student.average >= 60
                                    ? "Needs Improvement"
                                    : "At Risk"}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Selected Student Details */}
                {selectedStudentDetails && (
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {selectedStudentDetails.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle>{selectedStudentDetails.name}</CardTitle>
                            <CardDescription>
                              Student ID: {selectedStudentDetails.id}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Contact
                          </Button>
                          <Button size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export Report
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">
                              Current Grade
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-2">
                              <div className="text-2xl font-bold">
                                {selectedStudentDetails.average.toFixed(1)}%
                              </div>
                              <Badge
                                className={
                                  selectedStudentDetails.letterGrade === "A"
                                    ? "bg-green-100 text-green-800"
                                    : selectedStudentDetails.letterGrade === "B"
                                    ? "bg-blue-100 text-blue-800"
                                    : selectedStudentDetails.letterGrade === "C"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : selectedStudentDetails.letterGrade === "D"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-red-100 text-red-800"
                                }
                              >
                                {selectedStudentDetails.letterGrade}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">
                              Class Rank
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              {students
                                .sort((a, b) => b.average - a.average)
                                .findIndex(
                                  (s) => s.id === selectedStudentDetails.id
                                ) + 1}
                              <span className="text-sm font-normal text-muted-foreground">
                                {" "}
                                of {students.length}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">
                              Assignments
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              {selectedStudentDetails.grades.length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              All assignments completed
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Trend</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                              ↗
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Improving
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Grade Breakdown</h4>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Assignment</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Score</TableHead>
                              <TableHead>Percentage</TableHead>
                              <TableHead>Grade</TableHead>
                              <TableHead>Class Average</TableHead>
                              <TableHead>Comments</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedStudentDetails.grades.map((grade) => {
                              const assignment = assignments.find(
                                (a) => a.title === grade.assignment
                              );
                              return (
                                <TableRow key={grade.assignment}>
                                  <TableCell className="font-medium">
                                    {grade.assignment}
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="outline">
                                      {assignment?.type || "Assignment"}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    {grade.score}/{grade.outOf}
                                  </TableCell>
                                  <TableCell>{grade.percentage}%</TableCell>
                                  <TableCell>
                                    <Badge
                                      className={
                                        grade.letterGrade === "A"
                                          ? "bg-green-100 text-green-800"
                                          : grade.letterGrade === "B"
                                          ? "bg-blue-100 text-blue-800"
                                          : grade.letterGrade === "C"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : grade.letterGrade === "D"
                                          ? "bg-orange-100 text-orange-800"
                                          : "bg-red-100 text-red-800"
                                      }
                                    >
                                      {grade.letterGrade}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    {assignment?.average || "N/A"}%
                                  </TableCell>
                                  <TableCell className="max-w-[200px] truncate">
                                    {grade.comments || "No comments"}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">
                          Performance Over Time
                        </h4>
                        <div className="h-[200px] border rounded-md bg-muted/20 flex items-center justify-center">
                          <p className="text-muted-foreground">
                            Performance trend chart will be displayed here
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Teacher Notes</h4>
                        <Textarea
                          placeholder="Add notes about this student's performance..."
                          className="min-h-[100px]"
                        />
                        <div className="flex justify-end">
                          <Button size="sm">Save Notes</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Grade Distribution</CardTitle>
                      <CardDescription>
                        Distribution of grades across the class
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
                        <div className="w-full max-w-md space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full bg-green-500"></div>
                              <span>A ({gradeDistribution.A} students)</span>
                            </div>
                            <span>
                              {Math.round(
                                (gradeDistribution.A / students.length) * 100
                              )}
                              %
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                              <span>B ({gradeDistribution.B} students)</span>
                            </div>
                            <span>
                              {Math.round(
                                (gradeDistribution.B / students.length) * 100
                              )}
                              %
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                              <span>C ({gradeDistribution.C} students)</span>
                            </div>
                            <span>
                              {Math.round(
                                (gradeDistribution.C / students.length) * 100
                              )}
                              %
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full bg-orange-500"></div>
                              <span>D ({gradeDistribution.D} students)</span>
                            </div>
                            <span>
                              {Math.round(
                                (gradeDistribution.D / students.length) * 100
                              )}
                              %
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full bg-red-500"></div>
                              <span>F ({gradeDistribution.F} students)</span>
                            </div>
                            <span>
                              {Math.round(
                                (gradeDistribution.F / students.length) * 100
                              )}
                              %
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Assignment Performance</CardTitle>
                      <CardDescription>
                        Average scores across different assignments
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
                        <div className="w-full max-w-md space-y-4">
                          {assignments
                            .filter((a) => a.status === "Graded")
                            .map((assignment) => (
                              <div key={assignment.id} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>{assignment.title}</span>
                                  <span>{assignment.average}%</span>
                                </div>
                                <Progress
                                  value={assignment.average}
                                  className="h-2"
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Performance Insights</CardTitle>
                          <CardDescription>
                            Key insights and recommendations
                          </CardDescription>
                        </div>
                        <Select defaultValue="current">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="current">
                              Current Quarter
                            </SelectItem>
                            <SelectItem value="previous">
                              Previous Quarter
                            </SelectItem>
                            <SelectItem value="year">Full Year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                              <BarChart3 className="h-5 w-5 text-primary" />
                              <CardTitle className="text-base">
                                Class Performance
                              </CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              The class average is{" "}
                              <span className="font-medium">
                                {classAverage.toFixed(1)}%
                              </span>
                              , which is
                              {classAverage >= 90
                                ? " excellent"
                                : classAverage >= 80
                                ? " good"
                                : classAverage >= 70
                                ? " satisfactory"
                                : " below expectations"}
                              .
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                              {classAverage >= 80
                                ? "Most students are performing well, with a strong understanding of the material."
                                : "Consider reviewing key concepts that students are struggling with."}
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                              <LineChart className="h-5 w-5 text-primary" />
                              <CardTitle className="text-base">
                                Trends
                              </CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              Overall performance has{" "}
                              {Math.random() > 0.5
                                ? "improved"
                                : "remained stable"}{" "}
                              compared to the previous quarter.
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                              The most challenging assignment was{" "}
                              <span className="font-medium">Quiz 1</span> with
                              an average of 82.8%.
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                              <PieChart className="h-5 w-5 text-primary" />
                              <CardTitle className="text-base">
                                At-Risk Students
                              </CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium">
                                {gradeDistribution.D + gradeDistribution.F}
                              </span>{" "}
                              students are currently at risk of failing.
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                              Consider providing additional support or targeted
                              interventions for these students.
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="mt-6 space-y-2">
                        <h4 className="text-sm font-medium">Recommendations</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">
                              Focus on reviewing concepts from Quiz 1, where
                              students showed the most difficulty.
                            </p>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">
                              Consider offering extra credit opportunities for
                              students in the C-D range to improve their grades.
                            </p>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">
                              Schedule one-on-one meetings with the 3 students
                              who are at risk of failing to develop improvement
                              plans.
                            </p>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">
                              Recognize high-performing students to maintain
                              their motivation and engagement.
                            </p>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Export Analytics Report
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
