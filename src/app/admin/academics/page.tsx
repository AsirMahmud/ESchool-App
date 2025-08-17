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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen,
  Calendar,
  Clock,
  FileText,
  GraduationCap,
  LayoutGrid,
  Library,
  ListChecks,
  PenTool,
  School,
  Search,
  Settings,
  Users,
  Award,
  BarChart,
  BookMarked,
  Presentation,
  ClipboardList,
  CalendarDays,
  BookText,
  Layers,
  Compass,
  Lightbulb,
  Microscope,
  Calculator,
  Globe,
  Music,
  Palette,
  Dumbbell,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function AcademicPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Academic Management
        </h1>
        <p className="text-muted-foreground">
          Manage curriculum, classes, subjects, exams, and all academic
          activities
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <LayoutGrid className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              4 classes per grade level
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Subjects
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              Across all grade levels
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Exams
            </CardTitle>
            <PenTool className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">In the next 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Academic Progress
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <Progress value={68} className="mt-2" />
            <p className="mt-2 text-xs text-muted-foreground">
              Current academic year progress
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-full md:col-span-3">
          <CardHeader>
            <CardTitle>Academic Calendar</CardTitle>
            <CardDescription>
              Upcoming academic events and deadlines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  title: "Mid-Term Examinations",
                  date: "Oct 15-20, 2023",
                  description: "Mid-term examinations for all grades",
                  icon: PenTool,
                },
                {
                  id: 2,
                  title: "Science Fair",
                  date: "Nov 5, 2023",
                  description: "Annual science fair for grades 6-12",
                  icon: Microscope,
                },
                {
                  id: 3,
                  title: "Parent-Teacher Conference",
                  date: "Nov 12, 2023",
                  description: "Quarterly parent-teacher meetings",
                  icon: Users,
                },
                {
                  id: 4,
                  title: "End of Term",
                  date: "Dec 15, 2023",
                  description: "End of first term",
                  icon: Calendar,
                },
              ].map((event) => (
                <div key={event.id} className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <event.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium leading-none">{event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.date}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {event.description}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Calendar className="h-4 w-4" />
                    <span className="sr-only">View details</span>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/academic/calendar">View Full Calendar</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-full md:col-span-4">
          <CardHeader>
            <CardTitle>Academic Performance</CardTitle>
            <CardDescription>
              Average performance by grade level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { grade: "Grade 1", average: 87, progress: 87 },
                { grade: "Grade 2", average: 82, progress: 82 },
                { grade: "Grade 3", average: 78, progress: 78 },
                { grade: "Grade 4", average: 85, progress: 85 },
                { grade: "Grade 5", average: 79, progress: 79 },
                { grade: "Grade 6", average: 81, progress: 81 },
              ].map((grade) => (
                <div key={grade.grade} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{grade.grade}</p>
                    <p className="text-sm text-muted-foreground">
                      {grade.average}%
                    </p>
                  </div>
                  <Progress value={grade.progress} />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/academic/performance">
                View Detailed Reports
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle>Subject Distribution</CardTitle>
            <CardDescription>Subjects by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { department: "Mathematics", count: 8, icon: Calculator },
                { department: "Science", count: 10, icon: Microscope },
                { department: "Languages", count: 7, icon: BookText },
                { department: "Social Studies", count: 6, icon: Globe },
                { department: "Arts", count: 5, icon: Palette },
                { department: "Physical Education", count: 3, icon: Dumbbell },
                { department: "Music", count: 3, icon: Music },
              ].map((dept) => (
                <div
                  key={dept.department}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-2">
                      <dept.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">
                      {dept.department}
                    </span>
                  </div>
                  <Badge variant="outline">{dept.count} subjects</Badge>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/academic/subjects">Manage Subjects</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle>Recent Curriculum Updates</CardTitle>
            <CardDescription>Latest changes to curriculum</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  subject: "Mathematics",
                  update: "Updated Grade 8 Algebra curriculum",
                  date: "2 days ago",
                  user: "John Smith",
                  avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                  id: 2,
                  subject: "Science",
                  update: "Added new Biology lab activities for Grade 10",
                  date: "5 days ago",
                  user: "Sarah Johnson",
                  avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                  id: 3,
                  subject: "English",
                  update: "Updated reading list for Grade 11",
                  date: "1 week ago",
                  user: "Michael Brown",
                  avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                  id: 4,
                  subject: "History",
                  update: "Revised Grade 9 World History curriculum",
                  date: "2 weeks ago",
                  user: "Emily Davis",
                  avatar: "/placeholder.svg?height=32&width=32",
                },
              ].map((update) => (
                <div key={update.id} className="flex items-start gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={update.avatar || "/placeholder.svg"}
                      alt={update.user}
                    />
                    <AvatarFallback>
                      {update.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {update.subject}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {update.update}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      By {update.user} • {update.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/academic/curriculum">View Curriculum</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-full md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
            <CardDescription>Scheduled examinations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  subject: "Mathematics",
                  grade: "Grade 10",
                  date: "Oct 15, 2023",
                  time: "9:00 AM - 11:00 AM",
                },
                {
                  id: 2,
                  subject: "Science",
                  grade: "Grade 8",
                  date: "Oct 16, 2023",
                  time: "9:00 AM - 11:00 AM",
                },
                {
                  id: 3,
                  subject: "English",
                  grade: "Grade 11",
                  date: "Oct 17, 2023",
                  time: "9:00 AM - 11:00 AM",
                },
                {
                  id: 4,
                  subject: "History",
                  grade: "Grade 9",
                  date: "Oct 18, 2023",
                  time: "9:00 AM - 11:00 AM",
                },
                {
                  id: 5,
                  subject: "Geography",
                  grade: "Grade 7",
                  date: "Oct 19, 2023",
                  time: "9:00 AM - 11:00 AM",
                },
              ].map((exam) => (
                <div
                  key={exam.id}
                  className="flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {exam.subject}{" "}
                      <Badge variant="outline">{exam.grade}</Badge>
                    </p>
                    <p className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      {exam.date}
                    </p>
                    <p className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {exam.time}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/academic/exams">Manage Exams</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/admin/academic/curriculum">
                <BookMarked className="mr-2 h-4 w-4" />
                Curriculum
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/admin/academic/subjects">
                <BookOpen className="mr-2 h-4 w-4" />
                Subjects
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/admin/academic/classes">
                <Users className="mr-2 h-4 w-4" />
                Classes
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/admin/academic/timetable">
                <CalendarDays className="mr-2 h-4 w-4" />
                Timetable
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/admin/academic/exams">
                <PenTool className="mr-2 h-4 w-4" />
                Exams
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/admin/academic/results">
                <Award className="mr-2 h-4 w-4" />
                Results
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/admin/academic/library">
                <Library className="mr-2 h-4 w-4" />
                Library
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/admin/academic/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Academic Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { title: "Curriculum Guidelines", icon: FileText, count: 24 },
                {
                  title: "Lesson Plan Templates",
                  icon: ClipboardList,
                  count: 15,
                },
                { title: "Assessment Tools", icon: ListChecks, count: 18 },
                { title: "Teaching Materials", icon: Presentation, count: 42 },
                { title: "Educational Videos", icon: Presentation, count: 36 },
              ].map((resource, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <resource.icon className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">{resource.title}</span>
                  </div>
                  <Badge variant="secondary">{resource.count}</Badge>
                </div>
              ))}
            </div>
            <Button variant="link" size="sm" className="mt-4 w-full" asChild>
              <Link href="/admin/academic/resources">View All Resources</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Academic Departments</CardTitle>
            <CardDescription>Overview of academic departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  name: "Mathematics",
                  head: "Dr. Robert Taylor",
                  teachers: 12,
                  subjects: 8,
                  icon: Calculator,
                },
                {
                  name: "Science",
                  head: "Dr. Emily Davis",
                  teachers: 15,
                  subjects: 10,
                  icon: Microscope,
                },
                {
                  name: "Languages",
                  head: "Prof. Sarah Johnson",
                  teachers: 14,
                  subjects: 7,
                  icon: BookText,
                },
                {
                  name: "Social Studies",
                  head: "Dr. Michael Brown",
                  teachers: 10,
                  subjects: 6,
                  icon: Globe,
                },
                {
                  name: "Arts & Music",
                  head: "Prof. Jennifer Martinez",
                  teachers: 8,
                  subjects: 8,
                  icon: Palette,
                },
                {
                  name: "Physical Education",
                  head: "Mr. David Wilson",
                  teachers: 6,
                  subjects: 3,
                  icon: Dumbbell,
                },
              ].map((dept) => (
                <div key={dept.name} className="rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-2">
                      <dept.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{dept.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {dept.head}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{dept.teachers} Teachers</span>
                    <span>{dept.subjects} Subjects</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/academic/departments">Manage Departments</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="classes" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>
        <TabsContent value="classes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Class Overview</CardTitle>
              <CardDescription>All classes by grade level</CardDescription>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search classes..."
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "Grade 1-A",
                    students: 28,
                    teacher: "Ms. Johnson",
                    room: "101",
                  },
                  {
                    name: "Grade 1-B",
                    students: 26,
                    teacher: "Mr. Smith",
                    room: "102",
                  },
                  {
                    name: "Grade 2-A",
                    students: 30,
                    teacher: "Ms. Davis",
                    room: "103",
                  },
                  {
                    name: "Grade 2-B",
                    students: 29,
                    teacher: "Mr. Wilson",
                    room: "104",
                  },
                  {
                    name: "Grade 3-A",
                    students: 27,
                    teacher: "Ms. Martinez",
                    room: "105",
                  },
                  {
                    name: "Grade 3-B",
                    students: 28,
                    teacher: "Mr. Taylor",
                    room: "106",
                  },
                ].map((cls) => (
                  <div key={cls.name} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-medium">{cls.name}</h4>
                      <Badge>{cls.students} students</Badge>
                    </div>
                    <div className="mt-2 space-y-1 text-sm">
                      <p className="flex items-center text-muted-foreground">
                        <GraduationCap className="mr-1 h-4 w-4" />
                        Teacher: {cls.teacher}
                      </p>
                      <p className="flex items-center text-muted-foreground">
                        <LayoutGrid className="mr-1 h-4 w-4" />
                        Room: {cls.room}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/admin/academic/classes">View All Classes</Link>
              </Button>
              <Button asChild>
                <Link href="/admin/academic/classes/add">Add New Class</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="subjects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subject Overview</CardTitle>
              <CardDescription>All subjects by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    department: "Mathematics",
                    subjects: [
                      { name: "Basic Mathematics", grades: "1-3", teachers: 4 },
                      {
                        name: "Intermediate Mathematics",
                        grades: "4-6",
                        teachers: 3,
                      },
                      {
                        name: "Advanced Mathematics",
                        grades: "7-8",
                        teachers: 2,
                      },
                      { name: "Algebra", grades: "9-10", teachers: 2 },
                    ],
                  },
                  {
                    department: "Science",
                    subjects: [
                      { name: "General Science", grades: "1-5", teachers: 5 },
                      { name: "Biology", grades: "6-12", teachers: 3 },
                      { name: "Chemistry", grades: "8-12", teachers: 2 },
                      { name: "Physics", grades: "9-12", teachers: 2 },
                    ],
                  },
                ].map((dept) => (
                  <div key={dept.department} className="rounded-lg border p-4">
                    <h4 className="text-lg font-medium">{dept.department}</h4>
                    <div className="mt-4 space-y-2">
                      {dept.subjects.map((subject) => (
                        <div
                          key={subject.name}
                          className="flex items-center justify-between rounded-md bg-muted p-2"
                        >
                          <div>
                            <p className="font-medium">{subject.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Grades: {subject.grades}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {subject.teachers} teachers
                            </Badge>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/admin/academic/subjects">View All Subjects</Link>
              </Button>
              <Button asChild>
                <Link href="/admin/academic/subjects/add">Add New Subject</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="teachers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Staff</CardTitle>
              <CardDescription>Teachers by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border">
                  <div className="grid grid-cols-4 gap-4 p-4 font-medium">
                    <div>Teacher</div>
                    <div>Department</div>
                    <div>Subjects</div>
                    <div>Classes</div>
                  </div>
                  <div className="divide-y">
                    {[
                      {
                        name: "Sarah Johnson",
                        avatar: "/placeholder.svg?height=40&width=40",
                        department: "Mathematics",
                        subjects: ["Algebra", "Calculus"],
                        classes: ["Grade 10-A", "Grade 11-B"],
                      },
                      {
                        name: "Michael Brown",
                        avatar: "/placeholder.svg?height=40&width=40",
                        department: "Science",
                        subjects: ["Biology", "Chemistry"],
                        classes: ["Grade 9-A", "Grade 10-C"],
                      },
                      {
                        name: "Emily Davis",
                        avatar: "/placeholder.svg?height=40&width=40",
                        department: "Languages",
                        subjects: ["English Literature", "Grammar"],
                        classes: ["Grade 8-B", "Grade 9-D"],
                      },
                      {
                        name: "David Wilson",
                        avatar: "/placeholder.svg?height=40&width=40",
                        department: "Physical Education",
                        subjects: ["Physical Education", "Health"],
                        classes: ["Grade 7-A", "Grade 8-C"],
                      },
                      {
                        name: "Jennifer Martinez",
                        avatar: "/placeholder.svg?height=40&width=40",
                        department: "Arts",
                        subjects: ["Visual Arts", "Art History"],
                        classes: ["Grade 6-B", "Grade 7-D"],
                      },
                    ].map((teacher) => (
                      <div
                        key={teacher.name}
                        className="grid grid-cols-4 gap-4 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={teacher.avatar || "/placeholder.svg"}
                              alt={teacher.name}
                            />
                            <AvatarFallback>
                              {teacher.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{teacher.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Teacher
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {teacher.department}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {teacher.subjects.map((subject) => (
                            <Badge key={subject} variant="outline">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {teacher.classes.map((cls) => (
                            <Badge key={cls} variant="secondary">
                              {cls}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/admin/teachers">View All Teachers</Link>
              </Button>
              <Button asChild>
                <Link href="/admin/teachers/add">Add New Teacher</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Academic Performance</CardTitle>
              <CardDescription>Performance by grade level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                    <div>Grade</div>
                    <div>Students</div>
                    <div>Average GPA</div>
                    <div>Attendance</div>
                    <div>Performance</div>
                  </div>
                  <div className="divide-y">
                    {[
                      {
                        grade: "Grade 1",
                        students: 54,
                        gpa: "3.8",
                        attendance: "95%",
                        performance: 85,
                      },
                      {
                        grade: "Grade 2",
                        students: 58,
                        gpa: "3.7",
                        attendance: "94%",
                        performance: 82,
                      },
                      {
                        grade: "Grade 3",
                        students: 52,
                        gpa: "3.6",
                        attendance: "93%",
                        performance: 78,
                      },
                      {
                        grade: "Grade 4",
                        students: 56,
                        gpa: "3.7",
                        attendance: "92%",
                        performance: 80,
                      },
                      {
                        grade: "Grade 5",
                        students: 50,
                        gpa: "3.5",
                        attendance: "91%",
                        performance: 75,
                      },
                      {
                        grade: "Grade 6",
                        students: 48,
                        gpa: "3.6",
                        attendance: "93%",
                        performance: 79,
                      },
                    ].map((grade) => (
                      <div
                        key={grade.grade}
                        className="grid grid-cols-5 gap-4 p-4"
                      >
                        <div className="font-medium">{grade.grade}</div>
                        <div>{grade.students} students</div>
                        <div>{grade.gpa}</div>
                        <div>{grade.attendance}</div>
                        <div className="w-full max-w-xs">
                          <Progress value={grade.performance} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/admin/students">View All Students</Link>
              </Button>
              <Button asChild>
                <Link href="/admin/academic/performance">
                  View Detailed Reports
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
