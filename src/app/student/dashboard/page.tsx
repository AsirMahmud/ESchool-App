import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Calendar, CheckCircle, Clock, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Assignments
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">2 due today</p>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes Today</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Next: Mathematics at 10:30 AM
            </p>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Attendance Rate
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <Progress value={95} className="mt-2" />
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A-</div>
            <p className="text-xs text-muted-foreground">3.7 GPA</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>
        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>
                Your classes and activities for today
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaySchedule.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 rounded-lg border p-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {item.subject}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.time}</p>
                  </div>
                  <div className="rounded-lg bg-secondary px-2 py-1 text-xs">
                    {item.location}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Due Today</CardTitle>
              <CardDescription>
                Assignments that need to be submitted today
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dueToday.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 rounded-lg border p-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.subject}
                    </p>
                  </div>
                  <Button size="sm">Submit</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Assignments</CardTitle>
              <CardDescription>
                Assignments due in the next 7 days
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAssignments.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 rounded-lg border p-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.subject} - Due {item.dueDate}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Announcements</CardTitle>
              <CardDescription>
                Important updates from your teachers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {announcements.map((item, index) => (
                <div key={index} className="space-y-2 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.content}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <p>From: {item.teacher}</p>
                    <p className="ml-4">Class: {item.class}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/student/assignments">
                <FileText className="mr-2 h-4 w-4" />
                View All Assignments
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/student/grades">
                <FileText className="mr-2 h-4 w-4" />
                Check Grades
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/student/schedule">
                <Calendar className="mr-2 h-4 w-4" />
                Full Schedule
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/student/messages">
                <FileText className="mr-2 h-4 w-4" />
                Message Teachers
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const todaySchedule = [
  {
    subject: "Mathematics",
    time: "10:30 AM - 11:45 AM",
    location: "Room 101",
  },
  {
    subject: "History",
    time: "12:30 PM - 1:45 PM",
    location: "Room 203",
  },
  {
    subject: "Physics",
    time: "2:00 PM - 3:15 PM",
    location: "Lab 3",
  },
];

const dueToday = [
  {
    title: "Algebra Problem Set",
    subject: "Mathematics",
  },
  {
    title: "Historical Essay",
    subject: "History",
  },
];

const upcomingAssignments = [
  {
    title: "Physics Lab Report",
    subject: "Physics",
    dueDate: "Tomorrow",
  },
  {
    title: "Literature Analysis",
    subject: "English",
    dueDate: "In 2 days",
  },
  {
    title: "Chemistry Worksheet",
    subject: "Chemistry",
    dueDate: "In 3 days",
  },
  {
    title: "Group Project Milestone",
    subject: "Computer Science",
    dueDate: "In 5 days",
  },
];

const announcements = [
  {
    title: "Midterm Exam Schedule",
    date: "Today",
    content:
      "The midterm exams will be held next week. Please check the schedule and prepare accordingly.",
    teacher: "Dr. Johnson",
    class: "All Classes",
  },
  {
    title: "Field Trip Permission Forms",
    date: "Yesterday",
    content:
      "Please submit your signed permission forms for the upcoming science museum field trip by Friday.",
    teacher: "Ms. Williams",
    class: "Physics",
  },
  {
    title: "Library Resources Update",
    date: "2 days ago",
    content:
      "New online research databases are now available through the school library portal.",
    teacher: "Mr. Thompson",
    class: "All Classes",
  },
];
