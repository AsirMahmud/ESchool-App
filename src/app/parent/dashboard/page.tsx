import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Bell,
  FileText,
  DollarSign,
  Users,
  MessageSquare,
} from "lucide-react";

export default function ParentDashboard() {
  // Sample data for children
  const children = [
    {
      id: 1,
      name: "Emma Johnson",
      grade: "Grade 8",
      class: "8-A",
      attendance: "95%",
      nextExam: "Mathematics - May 15",
      recentGrade: "A in Science",
      feeStatus: "Paid",
    },
    {
      id: 2,
      name: "Noah Johnson",
      grade: "Grade 5",
      class: "5-C",
      attendance: "92%",
      nextExam: "English - May 17",
      recentGrade: "B+ in History",
      feeStatus: "Due in 5 days",
    },
  ];

  // Sample upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Parent-Teacher Meeting",
      date: "May 20, 2025",
      time: "4:00 PM - 6:00 PM",
      location: "School Auditorium",
    },
    {
      id: 2,
      title: "Annual Sports Day",
      date: "May 25, 2025",
      time: "9:00 AM - 3:00 PM",
      location: "School Grounds",
    },
    {
      id: 3,
      title: "Science Exhibition",
      date: "June 5, 2025",
      time: "10:00 AM - 1:00 PM",
      location: "School Hall",
    },
  ];

  // Sample notifications
  const notifications = [
    {
      id: 1,
      title: "Fee Payment Reminder",
      message: "Second term fees due by May 30",
      time: "2 days ago",
      read: false,
    },
    {
      id: 2,
      title: "Homework Submission",
      message: "Noah has 2 pending homework assignments",
      time: "Yesterday",
      read: false,
    },
    {
      id: 3,
      title: "Attendance Alert",
      message: "Emma was absent on May 5",
      time: "1 week ago",
      read: true,
    },
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Parent Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor your children's academic progress and school activities
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
            <span className="ml-1 rounded-full bg-primary text-primary-foreground text-xs px-2">
              {notifications.filter((n) => !n.read).length}
            </span>
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Messages
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children.map((child) => (
          <Card key={child.id} className="overflow-hidden">
            <CardHeader className="bg-muted/50 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{child.name}</CardTitle>
                  <CardDescription>
                    {child.grade} | {child.class}
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Attendance
                  </div>
                  <div className="font-semibold">{child.attendance}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Fee Status
                  </div>
                  <div className="font-semibold">{child.feeStatus}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Recent Grade
                  </div>
                  <div className="font-semibold">{child.recentGrade}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Next Exam
                  </div>
                  <div className="font-semibold">{child.nextExam}</div>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button variant="outline" size="sm" className="flex-1">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Grades
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              School events and activities for your children
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-4 p-3 rounded-lg border"
                >
                  <div className="bg-primary/10 p-2 rounded-md">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {event.date} • {event.time}
                    </p>
                    <p className="text-sm">{event.location}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="h-4 w-4 mr-2" />
              Pay School Fees
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Download Report Cards
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Contact Teachers
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BookOpen className="h-4 w-4 mr-2" />
              View Curriculum
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Bell className="h-4 w-4 mr-2" />
              Update Notification Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>
            Updates and alerts about your children
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-4 p-3 rounded-lg border ${
                  !notification.read ? "bg-secondary/20 border-secondary" : ""
                }`}
              >
                <div
                  className={`p-2 rounded-md ${
                    !notification.read ? "bg-secondary/30" : "bg-muted"
                  }`}
                >
                  <Bell
                    className={`h-5 w-5 ${
                      !notification.read
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{notification.title}</h4>
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </p>
                </div>
                {!notification.read && (
                  <Button variant="ghost" size="sm">
                    Mark as read
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
