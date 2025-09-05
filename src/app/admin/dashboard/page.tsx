"use client";
import {
  Activity,
  Users,
  GraduationCap,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  BookOpen,
  Building2,
  UserCog,
  FileText,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useStudents } from "@/hooks/use-students";
import { useTeachers } from "@/hooks/use-teachers";
import { useEmployees } from "@/hooks/use-employees";
import { useDepartments } from "@/hooks/use-departments";
import { useSubjects } from "@/hooks/use-subjects";
import { useClasses } from "@/hooks/use-classes";

import { QuickAccessButton } from "./components/QuickAccessButton";
import { EventItem } from "./components/EventItem";
import { TaskItem } from "./components/TaskItem";
import { ActivityItem } from "./components/ActivityItem";
import { StatusItem } from "./components/StatusItem";
import { KpiCard } from "./components/KpiCard";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AdminDashboard() {
  const { data: students, isLoading: studentsLoading } = useStudents()
  const { data: teachers, isLoading: teachersLoading } = useTeachers()
  const { data: employees, isLoading: employeesLoading } = useEmployees()
  const { data: departments, isLoading: departmentsLoading } = useDepartments()
  const { data: subjects, isLoading: subjectsLoading } = useSubjects()
  const { data: classes, isLoading: classesLoading } = useClasses()
  // Sample data for charts
  const attendanceData = [
    { date: "Mon", present: 95.2, absent: 4.8 },
    { date: "Tue", present: 94.8, absent: 5.2 },
    { date: "Wed", present: 96.5, absent: 3.5 },
    { date: "Thu", present: 93.7, absent: 6.3 },
    { date: "Fri", present: 97.1, absent: 2.9 },
    { date: "Sat", present: 98.4, absent: 1.6 },
    { date: "Sun", present: 0, absent: 0 },
    { date: "Mon", present: 94.9, absent: 5.1 },
    { date: "Tue", present: 95.6, absent: 4.4 },
    { date: "Wed", present: 96.2, absent: 3.8 },
    { date: "Thu", present: 94.5, absent: 5.5 },
    { date: "Fri", present: 95.8, absent: 4.2 },
  ];

  const academicPerformanceData = [
    { subject: "Science", score: 86 },
    { subject: "Math", score: 78 },
    { subject: "Language", score: 92 },
    { subject: "Social", score: 81 },
    { subject: "Arts", score: 89 },
  ];

  const enrollmentData = [
    { month: "Jan", students: 1180 },
    { month: "Feb", students: 1190 },
    { month: "Mar", students: 1210 },
    { month: "Apr", students: 1248 },
    { month: "May", students: 1248 },
    { month: "Jun", students: 1248 },
    { month: "Jul", students: 1220 },
    { month: "Aug", students: 1235 },
    { month: "Sep", students: 1240 },
    { month: "Oct", students: 1245 },
    { month: "Nov", students: 1247 },
    { month: "Dec", students: 1248 },
  ];

  const financialData = [
    { name: "Tuition", value: 68 },
    { name: "Donations", value: 12 },
    { name: "Grants", value: 15 },
    { name: "Other", value: 5 },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening in your school today.
        </p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Students"
          value={studentsLoading ? "Loading..." : (students?.length || 0).toString()}
          trend="+3.2%"
          trendUp={true}
          description="From database"
          icon={<Users className="h-5 w-5" />}
          linkHref="/admin/students"
        />
        <KpiCard
          title="Total Teachers"
          value={teachersLoading ? "Loading..." : (teachers?.length || 0).toString()}
          trend="+1.2%"
          trendUp={true}
          description="From database"
          icon={<GraduationCap className="h-5 w-5" />}
          linkHref="/admin/teachers"
        />
        <KpiCard
          title="Total Staff"
          value={employeesLoading ? "Loading..." : (employees?.length || 0).toString()}
          trend="+2.4%"
          trendUp={true}
          description="From database"
          icon={<UserCog className="h-5 w-5" />}
          linkHref="/admin/employee"
        />
        <KpiCard
          title="Revenue"
          value="$128,450"
          trend="+12.3%"
          trendUp={true}
          description="vs last month"
          icon={<DollarSign className="h-5 w-5" />}
          linkHref="/admin/finance/dashboard"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Student Enrollment Trend */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Student Enrollment Trend</CardTitle>
                <Tabs defaultValue="year">
                  <TabsList className="grid w-[200px] grid-cols-2">
                    <TabsTrigger value="year">This Year</TabsTrigger>
                    <TabsTrigger value="month">This Month</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <CardDescription>
                Monthly student enrollment numbers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={enrollmentData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="month" />
                    <YAxis domain={[1100, 1300]} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="students"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/admin/students">
                  View Detailed Enrollment Data
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Attendance Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Attendance Overview</CardTitle>
                <Badge variant="outline">Last 14 days</Badge>
              </div>
              <CardDescription>
                Daily attendance rates across all grades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" />
                    <YAxis domain={[90, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="present"
                      stroke="#4ade80"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="absent"
                      stroke="#f87171"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="grid grid-cols-3 w-full gap-4 text-center">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-green-500">
                    96.2%
                  </span>
                  <span className="text-xs text-muted-foreground">
                    High School
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-amber-500">
                    94.8%
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Middle School
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-blue-500">
                    97.5%
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Elementary
                  </span>
                </div>
              </div>
            </CardFooter>
          </Card>

          {/* Academic Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Performance</CardTitle>
              <CardDescription>Average grades by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={academicPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#8884d8">
                      {academicPerformanceData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/admin/academic/curriculum">
                  View Academic Reports
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Financial Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Current fiscal year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={financialData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {financialData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 mt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Revenue</span>
                    <span className="text-sm font-medium">$1,245,300</span>
                  </div>
                  <Progress value={75} className="h-1" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>75% of yearly target</span>
                    <span>Target: $1.65M</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/admin/finance/dashboard">
                  View Financial Reports
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Quick Access */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
              <CardDescription>Frequently used modules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <QuickAccessButton
                  icon={<Users className="h-5 w-5" />}
                  label="Students"
                  href="/admin/students"
                />
                <QuickAccessButton
                  icon={<GraduationCap className="h-5 w-5" />}
                  label="Teachers"
                  href="/admin/teachers"
                />
                <QuickAccessButton
                  icon={<BookOpen className="h-5 w-5" />}
                  label="Classes"
                  href="/admin/academic/classes"
                />
                <QuickAccessButton
                  icon={<Calendar className="h-5 w-5" />}
                  label="Timetable"
                  href="/admin/academic/timetable"
                />
                <QuickAccessButton
                  icon={<FileText className="h-5 w-5" />}
                  label="Exams"
                  href="/admin/exams"
                />
                <QuickAccessButton
                  icon={<DollarSign className="h-5 w-5" />}
                  label="Fees"
                  href="/admin/finance/fee-structure"
                />
                <QuickAccessButton
                  icon={<Building2 className="h-5 w-5" />}
                  label="Departments"
                  href="/admin/hr/departments"
                />
                <QuickAccessButton
                  icon={<Activity className="h-5 w-5" />}
                  label="Reports"
                  href="/admin/hr/reports"
                />
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <EventItem
                  title="Parent-Teacher Conference"
                  date="Today"
                  time="3:00 PM - 7:00 PM"
                  location="Main Hall"
                />
                <EventItem
                  title="Science Fair"
                  date="Tomorrow"
                  time="9:00 AM - 2:00 PM"
                  location="Gymnasium"
                />
                <EventItem
                  title="Board Meeting"
                  date="Apr 22"
                  time="5:30 PM - 7:30 PM"
                  location="Conference Room"
                />
                <EventItem
                  title="Staff Development Day"
                  date="Apr 24"
                  time="All Day"
                  location="Training Center"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                View Full Calendar
              </Button>
            </CardFooter>
          </Card>

          {/* Pending Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>Items requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <TaskItem
                  title="Approve teacher leave requests"
                  count={3}
                  priority="high"
                />
                <TaskItem
                  title="Review new student applications"
                  count={12}
                  priority="medium"
                />
                <TaskItem
                  title="Sign purchase orders"
                  count={5}
                  priority="medium"
                />
                <TaskItem
                  title="Approve curriculum changes"
                  count={2}
                  priority="low"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                View All Tasks
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Recent Activity and System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions across the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ActivityItem
                user={{
                  name: "Sarah Johnson",
                  role: "Teacher",
                  avatar: "/placeholder.svg",
                }}
                action="submitted grades"
                resource="for 10th Grade Physics"
                time="10 minutes ago"
              />
              <ActivityItem
                user={{
                  name: "Admin System",
                  role: "System",
                  avatar: "/placeholder.svg",
                }}
                action="generated monthly attendance report"
                resource=""
                time="32 minutes ago"
              />
              <ActivityItem
                user={{
                  name: "Michael Chen",
                  role: "Student",
                  avatar: "/placeholder.svg",
                }}
                action="submitted assignment"
                resource="Advanced Mathematics Project"
                time="1 hour ago"
              />
              <ActivityItem
                user={{
                  name: "Robert Williams",
                  role: "Principal",
                  avatar: "/placeholder.svg",
                }}
                action="approved budget"
                resource="for Science Department"
                time="2 hours ago"
              />
              <ActivityItem
                user={{
                  name: "Jennifer Lee",
                  role: "HR Manager",
                  avatar: "/placeholder.svg",
                }}
                action="added new employee"
                resource="David Miller (Mathematics Teacher)"
                time="3 hours ago"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full">
              View All Activity
            </Button>
          </CardFooter>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <StatusItem
                title="Database"
                status="operational"
                details="Last backup: Today, 3:00 AM"
              />
              <StatusItem
                title="Storage"
                status="operational"
                details="73% used (1.2TB of 1.5TB)"
              />
              <StatusItem
                title="API Services"
                status="operational"
                details="All endpoints responding"
              />
              <StatusItem
                title="Notification System"
                status="degraded"
                details="Delayed delivery (~5 min)"
              />
              <StatusItem
                title="Scheduled Maintenance"
                status="upcoming"
                details="Apr 25, 2:00 AM - 4:00 AM"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              System Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
