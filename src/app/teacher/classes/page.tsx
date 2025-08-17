"use client";

import { useState } from "react";
import {
  Bell,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Download,
  Eye,
  FileText,
  GraduationCap,
  Grid,
  LayoutDashboard,
  MessageSquare,
  Moon,
  MoreHorizontal,
  PenLine,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
  Sun,
  Trash2,
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

export default function TeacherClassesPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterOpen, setFilterOpen] = useState(false);

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
                      variant={item.title === "Classes" ? "secondary" : "ghost"}
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
                  variant={item.title === "Classes" ? "secondary" : "ghost"}
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
                  My Classes
                </h1>
                <p className="text-muted-foreground">
                  Manage and view all your assigned classes
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search classes..."
                    className="w-full md:w-[200px] pl-8"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    className="rounded-r-none"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    className="rounded-l-none"
                    onClick={() => setViewMode("list")}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                  </Button>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Class
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Class</DialogTitle>
                      <DialogDescription>
                        Add a new class to your teaching schedule
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="class-name" className="text-right">
                          Class Name
                        </Label>
                        <Input
                          id="class-name"
                          placeholder="e.g. Physics 101"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="grade-level" className="text-right">
                          Grade Level
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select grade level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="9">Grade 9</SelectItem>
                            <SelectItem value="10">Grade 10</SelectItem>
                            <SelectItem value="11">Grade 11</SelectItem>
                            <SelectItem value="12">Grade 12</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="room" className="text-right">
                          Room
                        </Label>
                        <Input
                          id="room"
                          placeholder="e.g. SCI-4"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="schedule" className="text-right">
                          Schedule
                        </Label>
                        <Input
                          id="schedule"
                          placeholder="e.g. Mon/Wed/Fri 10:00-11:00"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Brief description of the class"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create Class</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Filters panel */}
            {filterOpen && (
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Filters</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFilterOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Grade Level</Label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="All Grades" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Grades</SelectItem>
                          <SelectItem value="9">Grade 9</SelectItem>
                          <SelectItem value="10">Grade 10</SelectItem>
                          <SelectItem value="11">Grade 11</SelectItem>
                          <SelectItem value="12">Grade 12</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Subject</Label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="All Subjects" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Subjects</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="biology">Biology</SelectItem>
                          <SelectItem value="math">Mathematics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Day of Week</Label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="All Days" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Days</SelectItem>
                          <SelectItem value="monday">Monday</SelectItem>
                          <SelectItem value="tuesday">Tuesday</SelectItem>
                          <SelectItem value="wednesday">Wednesday</SelectItem>
                          <SelectItem value="thursday">Thursday</SelectItem>
                          <SelectItem value="friday">Friday</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reset Filters</Button>
                  <Button>Apply Filters</Button>
                </CardFooter>
              </Card>
            )}

            {/* Class summary stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Classes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6</div>
                  <p className="text-xs text-muted-foreground">
                    Across 3 subjects
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">147</div>
                  <p className="text-xs text-muted-foreground">
                    Average 24.5 per class
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
                    +2.3% from last quarter
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Teaching Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18 hrs/week</div>
                  <p className="text-xs text-muted-foreground">
                    6 hours of lab time
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Classes grid/list view */}
            {viewMode === "grid" ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {classes.map((cls, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="h-2 bg-primary" />
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{cls.name}</CardTitle>
                          <CardDescription>
                            Grade {cls.grade} • Room {cls.room}
                          </CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <PenLine className="h-4 w-4 mr-2" />
                              Edit Class
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="h-4 w-4 mr-2" />
                              Manage Students
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              Grade Book
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Class
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Students: {cls.students}</span>
                        <span>Avg. Grade: {cls.averageGrade}</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-sm">
                          <span>Curriculum Progress</span>
                          <span>{cls.progress}%</span>
                        </div>
                        <Progress value={cls.progress} className="h-2" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cls.schedule.map((day, j) => (
                          <Badge
                            key={j}
                            variant="outline"
                            className="bg-primary/5"
                          >
                            {day.day.substring(0, 3)} {day.time}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/30 px-6 py-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => setSelectedClass(cls.id)}
                      >
                        View Class
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>All Classes</CardTitle>
                  <CardDescription>
                    List of all your assigned classes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Class Name</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Schedule</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Avg. Grade</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {classes.map((cls, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">
                            {cls.name}
                          </TableCell>
                          <TableCell>{cls.grade}</TableCell>
                          <TableCell>{cls.room}</TableCell>
                          <TableCell>{cls.students}</TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              {cls.schedule.map((day, j) => (
                                <div key={j} className="text-xs">
                                  {day.day.substring(0, 3)} {day.time}
                                </div>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="w-full max-w-24">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span>{cls.progress}%</span>
                              </div>
                              <Progress value={cls.progress} className="h-2" />
                            </div>
                          </TableCell>
                          <TableCell>{cls.averageGrade}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
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
                                    <Users className="h-4 w-4 mr-2" />
                                    Manage Students
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <FileText className="h-4 w-4 mr-2" />
                                    Grade Book
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Class
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
            )}

            {/* Class detail view (when a class is selected) */}
            {selectedClass && (
              <div className="mt-8 space-y-6">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedClass(null)}
                  >
                    <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
                    Back to All Classes
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <PenLine className="h-4 w-4 mr-2" />
                      Edit Class
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Assignment
                    </Button>
                  </div>
                </div>

                {/* Class details */}
                <div className="grid gap-6 md:grid-cols-3">
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <CardTitle className="text-2xl">
                            Physics 101
                          </CardTitle>
                          <CardDescription>
                            Introductory Physics for Grade 11
                          </CardDescription>
                        </div>
                        <Badge className="w-fit">Active</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Room</h4>
                          <p>SCI-4</p>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Schedule</h4>
                          <div className="space-y-1">
                            <p className="text-sm">Mon/Wed/Fri 8:00 - 9:00</p>
                            <p className="text-sm">Tue (Lab) 1:00 - 2:00</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Students</h4>
                          <p>24 Enrolled</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Description</h4>
                        <p className="text-sm text-muted-foreground">
                          This introductory physics course covers fundamental
                          concepts including mechanics, waves, thermodynamics,
                          and basic electricity. Students will develop
                          problem-solving skills through theoretical and
                          practical applications, with weekly lab sessions to
                          reinforce classroom learning.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">
                            Curriculum Progress
                          </h4>
                          <span className="text-sm">68% Complete</span>
                        </div>
                        <Progress value={68} className="h-2" />
                        <div className="grid grid-cols-4 text-xs text-muted-foreground mt-1">
                          <div>Mechanics</div>
                          <div>Waves</div>
                          <div>Thermodynamics</div>
                          <div>Electricity</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Class Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Average Grade</span>
                          <span className="text-sm font-medium">B+ (87%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Attendance Rate</span>
                          <span className="text-sm font-medium">94%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Assignment Completion</span>
                          <span className="text-sm font-medium">92%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Class Participation</span>
                          <span className="text-sm font-medium">High</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <h4 className="text-sm font-medium mb-2">
                          Grade Distribution
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-16 text-xs">A (90-100%)</div>
                            <div className="flex-1">
                              <div
                                className="h-2 bg-primary rounded-full"
                                style={{ width: "35%" }}
                              ></div>
                            </div>
                            <div className="text-xs">35%</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 text-xs">B (80-89%)</div>
                            <div className="flex-1">
                              <div
                                className="h-2 bg-primary rounded-full"
                                style={{ width: "40%" }}
                              ></div>
                            </div>
                            <div className="text-xs">40%</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 text-xs">C (70-79%)</div>
                            <div className="flex-1">
                              <div
                                className="h-2 bg-primary rounded-full"
                                style={{ width: "20%" }}
                              ></div>
                            </div>
                            <div className="text-xs">20%</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 text-xs">D (60-69%)</div>
                            <div className="flex-1">
                              <div
                                className="h-2 bg-primary rounded-full"
                                style={{ width: "5%" }}
                              ></div>
                            </div>
                            <div className="text-xs">5%</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 text-xs">F (0-59%)</div>
                            <div className="flex-1">
                              <div
                                className="h-2 bg-primary rounded-full"
                                style={{ width: "0%" }}
                              ></div>
                            </div>
                            <div className="text-xs">0%</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Class tabs */}
                <Tabs defaultValue="students" className="space-y-4">
                  <TabsList className="grid grid-cols-5 w-full">
                    <TabsTrigger value="students">Students</TabsTrigger>
                    <TabsTrigger value="assignments">Assignments</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  </TabsList>

                  {/* Students Tab */}
                  <TabsContent value="students" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle>Student Roster</CardTitle>
                            <CardDescription>
                              Physics 101 - 24 Students
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Export
                            </Button>
                            <Button size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Student
                            </Button>
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
                              <TableHead>Current Grade</TableHead>
                              <TableHead>Attendance</TableHead>
                              <TableHead>Last Assignment</TableHead>
                              <TableHead className="text-right">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {students.slice(0, 10).map((student, i) => (
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
                                  <Badge
                                    variant={
                                      student.grades?.grade?.startsWith("A")
                                        ? "default"
                                        : student.grades?.grade?.startsWith("B")
                                        ? "secondary"
                                        : student.grades?.grade?.startsWith("C")
                                        ? "outline"
                                        : "destructive"
                                    }
                                  >
                                    {student.grades?.grade || "N/A"}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  {student.attendance || "95%"}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1">
                                    <div
                                      className={`w-2 h-2 rounded-full ${
                                        student.lastAssignment?.status ===
                                        "submitted"
                                          ? "bg-green-500"
                                          : student.lastAssignment?.status ===
                                            "late"
                                          ? "bg-amber-500"
                                          : "bg-red-500"
                                      }`}
                                    />
                                    <span className="text-sm">
                                      {student.lastAssignment?.status ||
                                        "Submitted"}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                      <MessageSquare className="h-4 w-4" />
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
                          Showing 10 of 24 students
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

                  {/* Assignments Tab */}
                  <TabsContent value="assignments" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle>Assignments & Assessments</CardTitle>
                            <CardDescription>
                              Manage class assignments and grades
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              Grade Book
                            </Button>
                            <Button size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              New Assignment
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Assignment</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Due Date</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Submissions</TableHead>
                              <TableHead>Avg. Score</TableHead>
                              <TableHead className="text-right">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {assignments.map((assignment, i) => (
                              <TableRow key={i}>
                                <TableCell className="font-medium">
                                  {assignment.title}
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">
                                    {assignment.type}
                                  </Badge>
                                </TableCell>
                                <TableCell>{assignment.dueDate}</TableCell>
                                <TableCell>
                                  <Badge
                                    variant={
                                      assignment.status === "Active"
                                        ? "default"
                                        : assignment.status === "Graded"
                                        ? "secondary"
                                        : assignment.status === "Draft"
                                        ? "outline"
                                        : "destructive"
                                    }
                                  >
                                    {assignment.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>{assignment.submissions}</TableCell>
                                <TableCell>{assignment.averageScore}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon">
                                      <Eye className="h-4 w-4" />
                                    </Button>
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
                    </Card>
                  </TabsContent>

                  {/* Resources Tab */}
                  <TabsContent value="resources" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle>Class Resources</CardTitle>
                            <CardDescription>
                              Study materials and resources for Physics 101
                            </CardDescription>
                          </div>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Resource
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {classResources.map((resource, i) => (
                            <Card key={i}>
                              <CardHeader className="pb-2">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <CardTitle className="text-base">
                                      {resource.title}
                                    </CardTitle>
                                    <CardDescription>
                                      {resource.type}
                                    </CardDescription>
                                  </div>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-muted-foreground">
                                  {resource.description}
                                </p>
                                <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  <span>Added: {resource.dateAdded}</span>
                                </div>
                              </CardContent>
                              <CardFooter className="flex justify-between">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4 mr-2" />
                                  Preview
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </Button>
                              </CardFooter>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Attendance Tab */}
                  <TabsContent value="attendance" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle>Attendance Records</CardTitle>
                            <CardDescription>
                              Physics 101 - March 2025
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Select defaultValue="march">
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select month" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="january">
                                  January 2025
                                </SelectItem>
                                <SelectItem value="february">
                                  February 2025
                                </SelectItem>
                                <SelectItem value="march">
                                  March 2025
                                </SelectItem>
                                <SelectItem value="april">
                                  April 2025
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <Button size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Export
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[150px]">
                                  Student
                                </TableHead>
                                {[
                                  1, 3, 5, 8, 10, 12, 15, 17, 19, 22, 24, 26,
                                  29, 31,
                                ].map((day) => (
                                  <TableHead
                                    key={day}
                                    className="text-center w-10"
                                  >
                                    {day}
                                  </TableHead>
                                ))}
                                <TableHead className="text-right">
                                  Rate
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {students.slice(0, 8).map((student, i) => (
                                <TableRow key={i}>
                                  <TableCell className="font-medium">
                                    {student.name.split(" ")[0]}{" "}
                                    {student.name.split(" ")[1][0]}.
                                  </TableCell>
                                  {[
                                    1, 3, 5, 8, 10, 12, 15, 17, 19, 22, 24, 26,
                                    29, 31,
                                  ].map((day) => {
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

                  {/* Calendar Tab */}
                  <TabsContent value="calendar" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle>Class Calendar</CardTitle>
                            <CardDescription>
                              Schedule and important dates
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Calendar className="h-4 w-4 mr-2" />
                              Month View
                            </Button>
                            <Button size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Event
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="border rounded-lg p-4">
                          <div className="text-center mb-4">
                            <h3 className="text-lg font-bold">March 2025</h3>
                          </div>
                          <div className="grid grid-cols-7 gap-1 text-center mb-2">
                            {[
                              "Sun",
                              "Mon",
                              "Tue",
                              "Wed",
                              "Thu",
                              "Fri",
                              "Sat",
                            ].map((day) => (
                              <div
                                key={day}
                                className="text-sm font-medium text-muted-foreground"
                              >
                                {day}
                              </div>
                            ))}
                          </div>
                          <div className="grid grid-cols-7 gap-1 text-center">
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(
                              (date) => {
                                const hasEvent = calendarEvents.some(
                                  (event) => event.date === date
                                );
                                const isClassDay = [
                                  1, 3, 5, 8, 10, 12, 15, 17, 19, 22, 24, 26,
                                  29, 31,
                                ].includes(date);
                                return (
                                  <div
                                    key={date}
                                    className={`aspect-square flex flex-col items-center justify-center rounded-md p-2 text-sm ${
                                      hasEvent
                                        ? "bg-primary/10 font-medium"
                                        : isClassDay
                                        ? "bg-secondary/20"
                                        : "hover:bg-muted"
                                    } ${
                                      date === 22 ? "ring-2 ring-primary" : ""
                                    }`}
                                  >
                                    {date}
                                    {hasEvent && (
                                      <div className="w-1 h-1 bg-primary rounded-full mt-1"></div>
                                    )}
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <h4 className="font-medium">Upcoming Events</h4>
                          {calendarEvents.map((event, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 rounded-lg border p-3"
                            >
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Calendar className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium">{event.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  March {event.date}, 2025
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// Missing component imports
const MenuIcon = ({ className, ...props }) => (
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

const classes = [
  {
    id: "physics101",
    name: "Physics 101",
    grade: "11",
    room: "SCI-4",
    students: 24,
    progress: 68,
    averageGrade: "B+ (87%)",
    schedule: [
      { day: "monday", time: "8:00 - 9:00" },
      { day: "wednesday", time: "8:00 - 9:00" },
      { day: "friday", time: "8:00 - 9:00" },
      { day: "tuesday", time: "1:00 - 2:00 (Lab)" },
    ],
  },
  {
    id: "physics102",
    name: "Physics 102",
    grade: "11",
    room: "SCI-4",
    students: 22,
    progress: 72,
    averageGrade: "B (85%)",
    schedule: [
      { day: "monday", time: "11:00 - 12:00" },
      { day: "thursday", time: "10:00 - 11:00" },
    ],
  },
  {
    id: "chemistry101",
    name: "Chemistry 101",
    grade: "10",
    room: "SCI-2",
    students: 26,
    progress: 75,
    averageGrade: "B+ (88%)",
    schedule: [
      { day: "tuesday", time: "9:00 - 10:00" },
      { day: "thursday", time: "1:00 - 2:00" },
    ],
  },
  {
    id: "biology101",
    name: "Biology 101",
    grade: "10",
    room: "SCI-3",
    students: 25,
    progress: 62,
    averageGrade: "B- (82%)",
    schedule: [
      { day: "wednesday", time: "10:00 - 11:00" },
      { day: "friday", time: "1:00 - 2:00" },
    ],
  },
  {
    id: "advancedphysics",
    name: "Advanced Physics",
    grade: "12",
    room: "SCI-5",
    students: 18,
    progress: 58,
    averageGrade: "A- (91%)",
    schedule: [
      { day: "tuesday", time: "11:00 - 12:30" },
      { day: "thursday", time: "11:00 - 12:30" },
    ],
  },
  {
    id: "sciencelab",
    name: "Science Lab",
    grade: "11",
    room: "LAB-1",
    students: 32,
    progress: 80,
    averageGrade: "B (84%)",
    schedule: [{ day: "wednesday", time: "2:00 - 3:30" }],
  },
];

const students = [
  {
    name: "Emma Johnson",
    id: "ST10045",
    status: "present",
    attendance: "95%",
    grades: { score: 92, grade: "A", comments: "Excellent work" },
  },
  {
    name: "Liam Smith",
    id: "ST10046",
    status: "present",
    attendance: "98%",
    grades: { score: 85, grade: "B", comments: "Good understanding" },
  },
  {
    name: "Olivia Brown",
    id: "ST10047",
    status: "present",
    attendance: "92%",
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
    attendance: "90%",
    note: "Bus delay",
    grades: { score: 88, grade: "B+", comments: "Strong problem-solving" },
  },
  {
    name: "Ava Wilson",
    id: "ST10049",
    status: "present",
    attendance: "97%",
    grades: { score: 95, grade: "A", comments: "Outstanding performance" },
  },
  {
    name: "William Taylor",
    id: "ST10050",
    status: "present",
    attendance: "94%",
    grades: { score: 82, grade: "B-", comments: "Good effort" },
  },
  {
    name: "Sophia Martinez",
    id: "ST10051",
    status: "absent",
    attendance: "85%",
    note: "Medical appointment",
    grades: { score: 0, grade: "N/A", comments: "Absent for exam" },
  },
  {
    name: "James Anderson",
    id: "ST10052",
    status: "present",
    attendance: "93%",
    grades: { score: 79, grade: "C+", comments: "Improving steadily" },
  },
  {
    name: "Isabella Thomas",
    id: "ST10053",
    status: "present",
    attendance: "96%",
    grades: { score: 91, grade: "A-", comments: "Very thorough work" },
  },
  {
    name: "Benjamin Jackson",
    id: "ST10054",
    status: "present",
    attendance: "91%",
    grades: { score: 84, grade: "B", comments: "Good understanding" },
  },
];

const assignments = [
  {
    title: "Midterm Exam",
    type: "Exam",
    dueDate: "Mar 28, 2025",
    status: "Active",
    submissions: "0/24",
    averageScore: "N/A",
  },
  {
    title: "Newton's Laws Lab Report",
    type: "Lab",
    dueDate: "Mar 22, 2025",
    status: "Graded",
    submissions: "24/24",
    averageScore: "87%",
  },
  {
    title: "Wave Motion Problem Set",
    type: "Homework",
    dueDate: "Mar 15, 2025",
    status: "Graded",
    submissions: "23/24",
    averageScore: "92%",
  },
  {
    title: "Energy Conservation Quiz",
    type: "Quiz",
    dueDate: "Mar 10, 2025",
    status: "Graded",
    submissions: "24/24",
    averageScore: "85%",
  },
  {
    title: "Physics Research Project",
    type: "Project",
    dueDate: "Apr 15, 2025",
    status: "Draft",
    submissions: "N/A",
    averageScore: "N/A",
  },
  {
    title: "Thermodynamics Problem Set",
    type: "Homework",
    dueDate: "Mar 5, 2025",
    status: "Graded",
    submissions: "22/24",
    averageScore: "88%",
  },
];

const classResources = [
  {
    title: "Physics 101 Syllabus",
    type: "Document",
    description:
      "Course overview, grading policy, and schedule for the semester.",
    dateAdded: "Jan 15, 2025",
  },
  {
    title: "Wave Motion Lecture Slides",
    type: "Presentation",
    description:
      "Comprehensive slides covering wave properties, types, and mathematical representations.",
    dateAdded: "Mar 10, 2025",
  },
  {
    title: "Lab Safety Tutorial",
    type: "Video",
    description: "Required safety procedures for all laboratory sessions.",
    dateAdded: "Feb 5, 2025",
  },
  {
    title: "Midterm Study Guide",
    type: "Document",
    description:
      "Review materials, practice problems, and key concepts for the midterm exam.",
    dateAdded: "Mar 20, 2025",
  },
  {
    title: "Newton's Laws Worksheet",
    type: "Document",
    description: "Practice problems applying Newton's three laws of motion.",
    dateAdded: "Feb 12, 2025",
  },
  {
    title: "Gravity Simulation Demo",
    type: "Interactive",
    description:
      "Interactive simulation demonstrating gravitational forces between objects.",
    dateAdded: "Feb 25, 2025",
  },
];

const calendarEvents = [
  { date: 15, title: "Quiz: Wave Properties" },
  { date: 18, title: "Lab: Pendulum Motion" },
  { date: 22, title: "Lab Report Due" },
  { date: 28, title: "Midterm Exam" },
  { date: 31, title: "End of Unit Review" },
];
