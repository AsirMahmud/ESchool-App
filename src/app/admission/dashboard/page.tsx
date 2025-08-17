import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  FileCheck,
  GraduationCap,
  Users,
  UserPlus,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admission Office Dashboard",
  description: "Overview of admission activities and statistics",
};

export default function AdmissionDashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Applications
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+8 since yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              New Admissions
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Certificate Requests
            </CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">5 pending approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Teacher Applications
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              3 interviews scheduled
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="admissions">Admissions</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>
                  Scheduled admission activities for the next 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Entrance Examination",
                      date: "Tomorrow, 9:00 AM",
                      description: "For Grade 9 applicants",
                      icon: <GraduationCap className="h-4 w-4" />,
                    },
                    {
                      title: "Parent Orientation",
                      date: "Wed, 2:00 PM",
                      description: "For newly admitted students",
                      icon: <Users className="h-4 w-4" />,
                    },
                    {
                      title: "Teacher Interview Panel",
                      date: "Thu, 10:00 AM",
                      description: "Science department candidates",
                      icon: <Users className="h-4 w-4" />,
                    },
                    {
                      title: "Certificate Distribution",
                      date: "Fri, 1:00 PM",
                      description: "Graduation certificates",
                      icon: <FileCheck className="h-4 w-4" />,
                    },
                  ].map((event, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        {event.icon}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {event.title}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" /> {event.date}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Admission Statistics</CardTitle>
                <CardDescription>
                  Current academic year admission data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      label: "Total Applications",
                      value: 248,
                      change: "+12% from last year",
                      status: "positive",
                    },
                    {
                      label: "Acceptance Rate",
                      value: "68%",
                      change: "2% higher than target",
                      status: "positive",
                    },
                    {
                      label: "Enrollment Conversion",
                      value: "92%",
                      change: "5% above average",
                      status: "positive",
                    },
                    {
                      label: "Teacher Recruitment",
                      value: "8/10",
                      change: "2 positions still open",
                      status: "neutral",
                    },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {stat.label}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {stat.change}
                        </p>
                      </div>
                      <div className="font-bold text-lg">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Latest admission office activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "Student Application Approved",
                    subject: "Ahmed Khan - Grade 10",
                    time: "2 hours ago",
                    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
                  },
                  {
                    action: "Transfer Certificate Issued",
                    subject: "Sarah Johnson - Grade 8",
                    time: "Yesterday",
                    icon: <FileCheck className="h-4 w-4 text-blue-500" />,
                  },
                  {
                    action: "Teacher Interview Scheduled",
                    subject: "Robert Chen - Math Department",
                    time: "Yesterday",
                    icon: <CalendarDays className="h-4 w-4 text-indigo-500" />,
                  },
                  {
                    action: "Application Rejected",
                    subject: "Michael Brown - Grade 11",
                    time: "2 days ago",
                    icon: <AlertCircle className="h-4 w-4 text-red-500" />,
                  },
                  {
                    action: "New Teacher Hired",
                    subject: "Emily Davis - Science Department",
                    time: "3 days ago",
                    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="rounded-full bg-muted p-2">
                      {activity.icon}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.action}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.subject}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Admission Applications</CardTitle>
              <CardDescription>
                Recent student applications and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-5 font-medium text-sm">
                  <div>Student Name</div>
                  <div>Grade</div>
                  <div>Application Date</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {[
                    {
                      name: "Aisha Rahman",
                      grade: "Grade 9",
                      date: "Mar 28, 2025",
                      status: "Pending",
                    },
                    {
                      name: "John Smith",
                      grade: "Grade 7",
                      date: "Mar 27, 2025",
                      status: "Document Verification",
                    },
                    {
                      name: "Maria Garcia",
                      grade: "Grade 10",
                      date: "Mar 26, 2025",
                      status: "Interview Scheduled",
                    },
                    {
                      name: "David Lee",
                      grade: "Grade 8",
                      date: "Mar 25, 2025",
                      status: "Approved",
                    },
                    {
                      name: "Sophia Chen",
                      grade: "Grade 6",
                      date: "Mar 24, 2025",
                      status: "Waitlisted",
                    },
                  ].map((application, index) => (
                    <div key={index} className="grid grid-cols-5 py-3 text-sm">
                      <div>{application.name}</div>
                      <div>{application.grade}</div>
                      <div>{application.date}</div>
                      <div>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            application.status === "Approved"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : application.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              : application.status === "Waitlisted"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          }`}
                        >
                          {application.status}
                        </span>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button size="sm">Process</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Certificate Requests</CardTitle>
              <CardDescription>
                Recent certificate requests and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-5 font-medium text-sm">
                  <div>Student Name</div>
                  <div>Certificate Type</div>
                  <div>Request Date</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {[
                    {
                      name: "Fatima Ali",
                      type: "Transfer Certificate",
                      date: "Mar 28, 2025",
                      status: "Pending",
                    },
                    {
                      name: "James Wilson",
                      type: "Character Certificate",
                      date: "Mar 27, 2025",
                      status: "Processing",
                    },
                    {
                      name: "Priya Sharma",
                      type: "Graduation Certificate",
                      date: "Mar 26, 2025",
                      status: "Ready for Collection",
                    },
                    {
                      name: "Carlos Rodriguez",
                      type: "Bonafide Certificate",
                      date: "Mar 25, 2025",
                      status: "Issued",
                    },
                    {
                      name: "Emma Thompson",
                      type: "Migration Certificate",
                      date: "Mar 24, 2025",
                      status: "Issued",
                    },
                  ].map((certificate, index) => (
                    <div key={index} className="grid grid-cols-5 py-3 text-sm">
                      <div>{certificate.name}</div>
                      <div>{certificate.type}</div>
                      <div>{certificate.date}</div>
                      <div>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            certificate.status === "Issued" ||
                            certificate.status === "Ready for Collection"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : certificate.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          }`}
                        >
                          {certificate.status}
                        </span>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button size="sm">Process</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recruitment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Recruitment</CardTitle>
              <CardDescription>
                Current teacher applications and hiring status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-5 font-medium text-sm">
                  <div>Applicant Name</div>
                  <div>Position</div>
                  <div>Application Date</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {[
                    {
                      name: "Dr. Rajesh Kumar",
                      position: "Physics Teacher",
                      date: "Mar 25, 2025",
                      status: "Document Verification",
                    },
                    {
                      name: "Sarah Johnson",
                      position: "English Teacher",
                      date: "Mar 23, 2025",
                      status: "Interview Scheduled",
                    },
                    {
                      name: "Mohammed Al-Farsi",
                      position: "Mathematics Teacher",
                      date: "Mar 20, 2025",
                      status: "Shortlisted",
                    },
                    {
                      name: "Lisa Wong",
                      position: "Art Teacher",
                      date: "Mar 18, 2025",
                      status: "Hired",
                    },
                    {
                      name: "Daniel Martinez",
                      position: "Physical Education",
                      date: "Mar 15, 2025",
                      status: "Rejected",
                    },
                  ].map((application, index) => (
                    <div key={index} className="grid grid-cols-5 py-3 text-sm">
                      <div>{application.name}</div>
                      <div>{application.position}</div>
                      <div>{application.date}</div>
                      <div>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            application.status === "Hired"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : application.status === "Rejected"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              : application.status === "Interview Scheduled" ||
                                application.status === "Shortlisted"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}
                        >
                          {application.status}
                        </span>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button size="sm">Process</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
