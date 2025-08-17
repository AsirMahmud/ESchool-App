import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  UserPlus,
  UserMinus,
  Calendar,
  Award,
  BookOpen,
  Briefcase,
  TrendingUp,
  TrendingDown,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "HR Dashboard",
  description: "Human Resources Management Dashboard",
};

export default function HRDashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">HR Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Hires</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">+4 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Turnover Rate</CardTitle>
            <UserMinus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4%</div>
            <p className="text-xs text-muted-foreground">
              -0.6% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Open Positions
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="leave">Leave Management</TabsTrigger>
          <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Department Distribution</CardTitle>
                <CardDescription>
                  Employee distribution across departments
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center text-center text-muted-foreground">
                  [Department Distribution Chart]
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Employee Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span>Average Performance Score</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">4.2/5.0</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Average Tenure</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">3.8 years</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>Training Completion Rate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">87%</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Absenteeism Rate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">2.1%</span>
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Latest HR activities and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      date: "Mar 28, 2025",
                      activity: "New Hire",
                      employee: "Emily Davis",
                      department: "Science",
                      status: "Onboarding",
                    },
                    {
                      date: "Mar 27, 2025",
                      activity: "Leave Request",
                      employee: "Michael Johnson",
                      department: "Mathematics",
                      status: "Approved",
                    },
                    {
                      date: "Mar 26, 2025",
                      activity: "Performance Review",
                      employee: "Sarah Wilson",
                      department: "English",
                      status: "Completed",
                    },
                    {
                      date: "Mar 25, 2025",
                      activity: "Training Session",
                      employee: "Multiple Employees",
                      department: "All",
                      status: "Scheduled",
                    },
                    {
                      date: "Mar 24, 2025",
                      activity: "Contract Renewal",
                      employee: "David Chen",
                      department: "Computer Science",
                      status: "Pending",
                    },
                  ].map((activity, i) => (
                    <TableRow key={i}>
                      <TableCell>{activity.date}</TableCell>
                      <TableCell>{activity.activity}</TableCell>
                      <TableCell>{activity.employee}</TableCell>
                      <TableCell>{activity.department}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            activity.status === "Approved" ||
                            activity.status === "Completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : activity.status === "Pending" ||
                                activity.status === "Scheduled"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                          }
                        >
                          {activity.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>Daily attendance statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Present Today
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">231</div>
                      <p className="text-xs text-muted-foreground">
                        93.1% of total staff
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        On Leave
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-xs text-muted-foreground">
                        4.8% of total staff
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Absent
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">5</div>
                      <p className="text-xs text-muted-foreground">
                        2.1% of total staff
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="h-80 flex items-center justify-center text-center text-muted-foreground">
                  [Attendance Trend Chart]
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leave" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave Management</CardTitle>
              <CardDescription>
                Pending leave requests and approvals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      employee: "Michael Johnson",
                      department: "Mathematics",
                      type: "Sick Leave",
                      from: "Apr 2, 2025",
                      to: "Apr 4, 2025",
                      days: 3,
                      status: "Pending",
                    },
                    {
                      employee: "Lisa Wong",
                      department: "Art",
                      type: "Personal Leave",
                      from: "Apr 10, 2025",
                      to: "Apr 12, 2025",
                      days: 3,
                      status: "Pending",
                    },
                    {
                      employee: "Robert Chen",
                      department: "Computer Science",
                      type: "Vacation",
                      from: "Apr 15, 2025",
                      to: "Apr 22, 2025",
                      days: 8,
                      status: "Approved",
                    },
                    {
                      employee: "Sarah Wilson",
                      department: "English",
                      type: "Conference",
                      from: "Apr 5, 2025",
                      to: "Apr 7, 2025",
                      days: 3,
                      status: "Approved",
                    },
                  ].map((leave, i) => (
                    <TableRow key={i}>
                      <TableCell>{leave.employee}</TableCell>
                      <TableCell>{leave.department}</TableCell>
                      <TableCell>{leave.type}</TableCell>
                      <TableCell>{leave.from}</TableCell>
                      <TableCell>{leave.to}</TableCell>
                      <TableCell>{leave.days}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            leave.status === "Approved"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : leave.status === "Pending"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          }
                        >
                          {leave.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {leave.status === "Pending" && (
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              Reject
                            </Button>
                            <Button size="sm">Approve</Button>
                          </div>
                        )}
                        {leave.status !== "Pending" && (
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recruitment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recruitment Overview</CardTitle>
              <CardDescription>Current recruitment activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Open Positions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                      Across 5 departments
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">87</div>
                    <p className="text-xs text-muted-foreground">
                      +23 this week
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Interviews Scheduled
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">14</div>
                    <p className="text-xs text-muted-foreground">
                      For next 7 days
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end mb-4">
                <Button asChild>
                  <a href="/hr/teacher-recruitment">
                    View Full Recruitment Dashboard
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
