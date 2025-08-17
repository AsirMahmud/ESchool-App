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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Calendar,
  FileText,
  Clock,
  Award,
  Activity,
  Users,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

export default function ParentChildren() {
  // Sample data for children
  const children = [
    {
      id: 1,
      name: "Emma Johnson",
      age: 13,
      grade: "Grade 8",
      class: "8-A",
      rollNumber: "8A21",
      teacher: "Ms. Sarah Williams",
      attendance: "95%",
      lastAttended: "Today",
      subjects: [
        "Mathematics",
        "Science",
        "English",
        "History",
        "Art",
        "Physical Education",
      ],
      recentGrades: [
        {
          subject: "Mathematics",
          grade: "A",
          score: "92/100",
          date: "May 5, 2025",
        },
        {
          subject: "Science",
          grade: "A+",
          score: "98/100",
          date: "May 3, 2025",
        },
        {
          subject: "English",
          grade: "B+",
          score: "88/100",
          date: "April 28, 2025",
        },
      ],
      upcomingAssignments: [
        {
          subject: "History",
          title: "World War II Essay",
          dueDate: "May 15, 2025",
        },
        {
          subject: "Science",
          title: "Ecosystem Project",
          dueDate: "May 20, 2025",
        },
      ],
      achievements: [
        { title: "Science Fair Winner", date: "April 2025" },
        { title: "Perfect Attendance", date: "March 2025" },
      ],
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Noah Johnson",
      age: 10,
      grade: "Grade 5",
      class: "5-C",
      rollNumber: "5C15",
      teacher: "Mr. James Anderson",
      attendance: "92%",
      lastAttended: "Today",
      subjects: [
        "Mathematics",
        "Science",
        "English",
        "Social Studies",
        "Art",
        "Physical Education",
      ],
      recentGrades: [
        {
          subject: "Mathematics",
          grade: "B+",
          score: "87/100",
          date: "May 4, 2025",
        },
        {
          subject: "Science",
          grade: "A-",
          score: "90/100",
          date: "May 2, 2025",
        },
        {
          subject: "English",
          grade: "B",
          score: "85/100",
          date: "April 27, 2025",
        },
      ],
      upcomingAssignments: [
        {
          subject: "Social Studies",
          title: "Local Community Report",
          dueDate: "May 18, 2025",
        },
        {
          subject: "Mathematics",
          title: "Fractions Worksheet",
          dueDate: "May 12, 2025",
        },
      ],
      achievements: [
        { title: "Reading Challenge Certificate", date: "April 2025" },
        { title: "Math Competition Finalist", date: "February 2025" },
      ],
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Children</h1>
        <p className="text-muted-foreground">
          View and manage information about your children
        </p>
      </div>

      {children.map((child) => (
        <Card key={child.id} className="overflow-hidden">
          <CardHeader className="bg-muted/50 pb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary/10">
                  <AvatarImage src={child.avatar} alt={child.name} />
                  <AvatarFallback>
                    {child.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">{child.name}</CardTitle>
                  <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
                    <span>{child.age} years old</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{child.grade}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Class {child.class}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Roll #{child.rollNumber}</span>
                  </CardDescription>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:flex-none"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Report Card
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:flex-none"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:flex-none"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Teacher
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0">
                {[
                  "overview",
                  "academics",
                  "attendance",
                  "assignments",
                  "achievements",
                ].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 capitalize"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="overview" className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Class Teacher
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {child.teacher
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{child.teacher}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Attendance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-lg">
                          {child.attendance}
                        </span>
                        <Badge variant="outline" className="font-normal">
                          Last: {child.lastAttended}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Subjects
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="font-medium">
                        {child.subjects.length} Enrolled
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Upcoming
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="font-medium">
                        {child.upcomingAssignments.length} Assignments
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Recent Grades</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {child.recentGrades.map((grade, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <div className="font-medium">{grade.subject}</div>
                              <div className="text-sm text-muted-foreground">
                                {grade.date}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                className={`
                                ${
                                  grade.grade.startsWith("A")
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                    : grade.grade.startsWith("B")
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                                    : grade.grade.startsWith("C")
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                                }
                              `}
                              >
                                {grade.grade}
                              </Badge>
                              <span className="text-sm font-medium">
                                {grade.score}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Button variant="ghost" size="sm" className="ml-auto">
                        View All Grades
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        Upcoming Assignments
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {child.upcomingAssignments.map((assignment, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <div className="font-medium">
                                {assignment.title}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {assignment.subject}
                              </div>
                            </div>
                            <Badge variant="outline">
                              Due: {assignment.dueDate}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Button variant="ghost" size="sm" className="ml-auto">
                        View All Assignments
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="academics" className="p-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Subjects</CardTitle>
                      <CardDescription>
                        Subjects {child.name} is currently enrolled in
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {child.subjects.map((subject, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 border rounded-lg"
                          >
                            <div className="bg-primary/10 p-2 rounded-md">
                              <BookOpen className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{subject}</div>
                              <div className="text-sm text-muted-foreground">
                                {child.recentGrades.find(
                                  (g) => g.subject === subject
                                )?.grade || "No grade yet"}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Academic Progress</CardTitle>
                      <CardDescription>
                        Overall academic performance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center p-12">
                        <p className="text-muted-foreground">
                          Detailed academic progress charts and analytics will
                          be displayed here
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="attendance" className="p-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Attendance Overview</CardTitle>
                      <CardDescription>
                        Monthly attendance record
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <div className="text-2xl font-bold">
                            {child.attendance}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Overall Attendance
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="text-center">
                            <div className="text-xl font-medium text-green-600">
                              152
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Present
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-medium text-yellow-600">
                              3
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Late
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-medium text-red-600">
                              5
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Absent
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-center p-12">
                        <p className="text-muted-foreground">
                          Monthly attendance calendar will be displayed here
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Absences</CardTitle>
                      <CardDescription>
                        Details of recent absences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="bg-red-100 p-2 rounded-md">
                              <Clock className="h-5 w-5 text-red-600" />
                            </div>
                            <div>
                              <div className="font-medium">April 15, 2025</div>
                              <div className="text-sm text-muted-foreground">
                                Full Day
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline">Medical Leave</Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="bg-yellow-100 p-2 rounded-md">
                              <Clock className="h-5 w-5 text-yellow-600" />
                            </div>
                            <div>
                              <div className="font-medium">March 22, 2025</div>
                              <div className="text-sm text-muted-foreground">
                                Late Arrival (30 min)
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline">Traffic Delay</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="assignments" className="p-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Assignments</CardTitle>
                      <CardDescription>
                        Assignments due in the next two weeks
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {child.upcomingAssignments.map((assignment, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="bg-primary/10 p-2 rounded-md">
                                <FileText className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium">
                                  {assignment.title}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {assignment.subject}
                                </div>
                              </div>
                            </div>
                            <Badge variant="outline">
                              Due: {assignment.dueDate}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Completed Assignments</CardTitle>
                      <CardDescription>
                        Recently completed assignments
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-2 rounded-md">
                              <FileText className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium">
                                Book Report: To Kill a Mockingbird
                              </div>
                              <div className="text-sm text-muted-foreground">
                                English
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                              A
                            </Badge>
                            <span className="text-sm font-medium">95/100</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-2 rounded-md">
                              <FileText className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium">
                                Geometry Problem Set
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Mathematics
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                              B+
                            </Badge>
                            <span className="text-sm font-medium">88/100</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="p-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Achievements</CardTitle>
                      <CardDescription>Awards and recognitions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {child.achievements.map((achievement, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="bg-primary/10 p-2 rounded-md">
                                <Award className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium">
                                  {achievement.title}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {achievement.date}
                                </div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              View Certificate
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Extracurricular Activities</CardTitle>
                      <CardDescription>
                        Clubs and activities participation
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-md">
                              <Users className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">Science Club</div>
                              <div className="text-sm text-muted-foreground">
                                Member since September 2024
                              </div>
                            </div>
                          </div>
                          <Badge>Active</Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-md">
                              <Activity className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">Basketball Team</div>
                              <div className="text-sm text-muted-foreground">
                                Member since October 2024
                              </div>
                            </div>
                          </div>
                          <Badge>Active</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
