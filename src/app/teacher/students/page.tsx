"use client";

import { useState } from "react";
import {
  Bell,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  FileText,
  GraduationCap,
  Grid,
  LayoutDashboard,
  MessageSquare,
  Moon,
  Search,
  Settings,
  SlidersHorizontal,
  Sun,
  User,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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

export default function TeacherStudentsPage() {
  const [theme, setTheme] = useState("light");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

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
                        item.title === "Students" ? "secondary" : "ghost"
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
                  variant={item.title === "Students" ? "secondary" : "ghost"}
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
                <h1 className="text-3xl font-bold tracking-tight">Students</h1>
                <p className="text-muted-foreground">
                  Manage and view all students in your classes
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search students..."
                    className="w-full md:w-[200px] pl-8"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Student summary stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">147</div>
                  <p className="text-xs text-muted-foreground">
                    Across all classes
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Grade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">B+ (87%)</div>
                  <p className="text-xs text-muted-foreground">
                    +2.1% from last quarter
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
                  <div className="text-2xl font-bold">94.2%</div>
                  <p className="text-xs text-muted-foreground">
                    -0.5% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    At-Risk Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    Grade or attendance concerns
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Students by sections */}
            <div className="space-y-6">
              {/* Active Students Section */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Active Students</CardTitle>
                    <CardDescription>
                      Students currently enrolled in your classes
                    </CardDescription>
                  </div>
                  <Button size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-4 rounded-md border p-4"
                      >
                        <Avatar>
                          <AvatarFallback>{`S${i}`}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Student {i}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Grade {Math.floor(Math.random() * 3) + 10}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Students by Grade Level */}
              <Card>
                <CardHeader>
                  <CardTitle>Students by Grade Level</CardTitle>
                  <CardDescription>
                    Distribution of students across grade levels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[9, 10, 11, 12].map((grade) => (
                      <Card key={grade}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">
                            Grade {grade}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {Math.floor(Math.random() * 20) + 20}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Students
                          </p>
                          <Button
                            variant="link"
                            size="sm"
                            className="px-0 mt-2"
                          >
                            View Students
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Students by Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Students by Performance</CardTitle>
                  <CardDescription>
                    Students grouped by academic performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      {
                        level: "Excellent",
                        grade: "A",
                        count: Math.floor(Math.random() * 15) + 25,
                        color: "bg-green-100 text-green-800",
                      },
                      {
                        level: "Good",
                        grade: "B",
                        count: Math.floor(Math.random() * 15) + 35,
                        color: "bg-blue-100 text-blue-800",
                      },
                      {
                        level: "Average",
                        grade: "C",
                        count: Math.floor(Math.random() * 15) + 20,
                        color: "bg-yellow-100 text-yellow-800",
                      },
                      {
                        level: "Needs Help",
                        grade: "D-F",
                        count: Math.floor(Math.random() * 10) + 5,
                        color: "bg-red-100 text-red-800",
                      },
                    ].map((category) => (
                      <Card key={category.level}>
                        <CardHeader className="pb-2">
                          <div
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${category.color}`}
                          >
                            {category.grade}
                          </div>
                          <CardTitle className="text-lg mt-2">
                            {category.level}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {category.count}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Students
                          </p>
                          <Button
                            variant="link"
                            size="sm"
                            className="px-0 mt-2"
                          >
                            View Students
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recently Active Students */}
              <Card>
                <CardHeader>
                  <CardTitle>Recently Active Students</CardTitle>
                  <CardDescription>
                    Students with recent activity in your classes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>{`S${i}`}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">Student {i}</p>
                            <p className="text-xs text-muted-foreground">
                              {
                                [
                                  "Submitted assignment",
                                  "Asked a question",
                                  "Viewed resources",
                                  "Completed quiz",
                                  "Updated profile",
                                ][i - 1]
                              }
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-xs text-muted-foreground">
                            {
                              [
                                "10 minutes ago",
                                "1 hour ago",
                                "3 hours ago",
                                "Yesterday",
                                "2 days ago",
                              ][i - 1]
                            }
                          </div>
                          <Button variant="ghost" size="icon">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* At-Risk Students */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>At-Risk Students</CardTitle>
                    <CardDescription>
                      Students who need additional support
                    </CardDescription>
                  </div>
                  <Button size="sm" variant="destructive">
                    <Users className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-md border border-red-200 bg-red-50 p-4"
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>{`R${i}`}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              At-Risk Student {i}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {
                                [
                                  "Low attendance (75%)",
                                  "Multiple missing assignments",
                                  "Failing grade (F)",
                                ][i - 1]
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
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
