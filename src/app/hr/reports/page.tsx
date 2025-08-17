"use client";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Download,
  FileText,
  Filter,
  BarChart3,
  Calendar,
  Users,
  Briefcase,
  Mail,
} from "lucide-react";

export default function ReportsPage() {
  // Sample data for charts
  const employeesByDepartment = [
    { name: "Science", value: 18 },
    { name: "Mathematics", value: 15 },
    { name: "English", value: 12 },
    { name: "History", value: 8 },
    { name: "Art", value: 6 },
    { name: "Physical Education", value: 7 },
    { name: "Administration", value: 12 },
    { name: "Support Staff", value: 15 },
  ];

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#8dd1e1",
  ];

  const attendanceTrend = [
    { month: "Jan", attendance: 95 },
    { month: "Feb", attendance: 93 },
    { month: "Mar", attendance: 94 },
    { month: "Apr", attendance: 91 },
    { month: "May", attendance: 92 },
    { month: "Jun", attendance: 90 },
    { month: "Jul", attendance: 88 },
    { month: "Aug", attendance: 91 },
  ];

  const leaveDistribution = [
    { name: "Sick Leave", value: 42 },
    { name: "Vacation", value: 28 },
    { name: "Personal Leave", value: 22 },
    { name: "Other", value: 8 },
  ];

  const trainingCompletion = [
    { name: "Science", completed: 85, total: 100 },
    { name: "Mathematics", completed: 90, total: 100 },
    { name: "English", completed: 75, total: 100 },
    { name: "History", completed: 80, total: 100 },
    { name: "Art", completed: 95, total: 100 },
    { name: "Physical Education", completed: 70, total: 100 },
    { name: "Administration", completed: 88, total: 100 },
    { name: "Support Staff", completed: 82, total: 100 },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">HR Reports</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Email Report
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Report Parameters</CardTitle>
            <CardDescription>Customize your report view</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 space-y-2 min-w-[200px]">
                <Label htmlFor="report-type">Report Type</Label>
                <Select>
                  <SelectTrigger id="report-type">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workforce">
                      Workforce Analytics
                    </SelectItem>
                    <SelectItem value="attendance">
                      Attendance & Leave
                    </SelectItem>
                    <SelectItem value="training">
                      Training & Development
                    </SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="turnover">
                      Turnover & Retention
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 space-y-2 min-w-[200px]">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="art">Art</SelectItem>
                    <SelectItem value="physical-education">
                      Physical Education
                    </SelectItem>
                    <SelectItem value="administration">
                      Administration
                    </SelectItem>
                    <SelectItem value="support-staff">Support Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 space-y-2 min-w-[200px]">
                <Label htmlFor="time-period">Time Period</Label>
                <Select>
                  <SelectTrigger id="time-period">
                    <SelectValue placeholder="Current Academic Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current-year">
                      Current Academic Year
                    </SelectItem>
                    <SelectItem value="previous-year">
                      Previous Academic Year
                    </SelectItem>
                    <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                    <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button>
                  <Filter className="mr-2 h-4 w-4" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="workforce" className="space-y-4">
        <TabsList>
          <TabsTrigger value="workforce">Workforce Analytics</TabsTrigger>
          <TabsTrigger value="attendance">Attendance & Leave</TabsTrigger>
          <TabsTrigger value="training">Training & Development</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="workforce" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Employee Distribution by Department</CardTitle>
                <CardDescription>
                  Current staff allocation across departments
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={employeesByDepartment}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Employees" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Department Breakdown</CardTitle>
                <CardDescription>Percentage of total workforce</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={employeesByDepartment}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {employeesByDepartment.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="attendance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Attendance Trend</CardTitle>
                <CardDescription>Monthly attendance percentage</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={attendanceTrend}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="attendance"
                      name="Attendance %"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Leave Distribution</CardTitle>
                <CardDescription>By leave type</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={leaveDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {leaveDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Training Completion Rate by Department</CardTitle>
              <CardDescription>
                Percentage of required training completed
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={trainingCompletion}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="completed"
                    name="Completion Rate %"
                    fill="#8884d8"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Performance metrics and analytics.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>
            Download or schedule standard reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Employee Census
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-4">
                  Complete employee demographic data
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Attendance Summary
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-4">
                  Monthly attendance and leave data
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Department Analytics
                </CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-4">
                  Detailed department performance metrics
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Training Compliance
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-4">
                  Training completion and certification status
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
