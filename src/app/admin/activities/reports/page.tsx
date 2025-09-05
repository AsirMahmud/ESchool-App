"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Activity,
  Calendar,
  Download,
  Filter,
  Award,
  BookOpen,
} from "lucide-react";

// Sample data for reports
const activityStats = {
  totalActivities: 45,
  activeClubs: 12,
  sportsTeams: 8,
  upcomingEvents: 15,
  totalParticipants: 320,
  averageAttendance: 85,
  mostPopularActivity: "Science Club",
  leastPopularActivity: "Chess Club",
};

const participationByType = [
  { type: "Clubs", count: 180, percentage: 56.25 },
  { type: "Sports", count: 95, percentage: 29.69 },
  { type: "Events", count: 45, percentage: 14.06 },
];

const topActivities = [
  { name: "Science Club", participants: 45, attendance: 92 },
  { name: "Basketball Team", participants: 15, attendance: 88 },
  { name: "Drama Club", participants: 25, attendance: 85 },
  { name: "Art Club", participants: 30, attendance: 82 },
  { name: "Debate Club", participants: 20, attendance: 78 },
  { name: "Swimming Team", participants: 12, attendance: 90 },
  { name: "Music Club", participants: 18, attendance: 80 },
  { name: "Track & Field", participants: 22, attendance: 75 },
];

const monthlyTrends = [
  { month: "Jan", activities: 12, participants: 280 },
  { month: "Feb", activities: 15, participants: 295 },
  { month: "Mar", activities: 18, participants: 310 },
  { month: "Apr", activities: 20, participants: 325 },
  { month: "May", activities: 16, participants: 300 },
  { month: "Jun", activities: 8, participants: 200 },
];

const gradeLevelParticipation = [
  { grade: "Elementary (1-5)", count: 80, percentage: 25 },
  { grade: "Middle School (6-8)", count: 120, percentage: 37.5 },
  { grade: "High School (9-12)", count: 120, percentage: 37.5 },
];

const getAttendanceColor = (attendance: number) => {
  if (attendance >= 90) return "text-green-600";
  if (attendance >= 75) return "text-yellow-600";
  return "text-red-600";
};

const getAttendanceBadgeVariant = (attendance: number) => {
  if (attendance >= 90) return "default";
  if (attendance >= 75) return "secondary";
  return "destructive";
};

export default function ReportsPage() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  const [selectedReport, setSelectedReport] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Activity Reports</h2>
          <p className="text-muted-foreground">
            Analytics and insights for school activities and participation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Year</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
              <SelectItem value="semester">This Semester</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Report Type Selector */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedReport === "overview" ? "default" : "outline"}
              onClick={() => setSelectedReport("overview")}
            >
              Overview
            </Button>
            <Button
              variant={selectedReport === "participation" ? "default" : "outline"}
              onClick={() => setSelectedReport("participation")}
            >
              Participation
            </Button>
            <Button
              variant={selectedReport === "attendance" ? "default" : "outline"}
              onClick={() => setSelectedReport("attendance")}
            >
              Attendance
            </Button>
            <Button
              variant={selectedReport === "trends" ? "default" : "outline"}
              onClick={() => setSelectedReport("trends")}
            >
              Trends
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Overview Report */}
      {selectedReport === "overview" && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Activity className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Total Activities</h3>
                    <p className="text-2xl font-bold">{activityStats.totalActivities}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Total Participants</h3>
                    <p className="text-2xl font-bold">{activityStats.totalParticipants}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <BookOpen className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Active Clubs</h3>
                    <p className="text-2xl font-bold">{activityStats.activeClubs}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Sports Teams</h3>
                    <p className="text-2xl font-bold">{activityStats.sportsTeams}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Participation by Type */}
          <Card>
            <CardHeader>
              <CardTitle>Participation by Activity Type</CardTitle>
              <CardDescription>
                Distribution of student participation across different activity types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {participationByType.map((item) => (
                  <div key={item.type} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-blue-500" />
                      <span className="font-medium">{item.type}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">
                        {item.count} ({item.percentage}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Participation Report */}
      {selectedReport === "participation" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Top Activities by Participation</CardTitle>
              <CardDescription>
                Most popular activities based on student enrollment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Activity</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Attendance Rate</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topActivities.map((activity, index) => (
                    <TableRow key={activity.name}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          <span className="font-medium">{activity.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{activity.participants}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${getAttendanceColor(activity.attendance)}`}>
                            {activity.attendance}%
                          </span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                activity.attendance >= 90 ? 'bg-green-500' : 
                                activity.attendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${activity.attendance}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getAttendanceBadgeVariant(activity.attendance)}>
                          {activity.attendance >= 90 ? "Excellent" : 
                           activity.attendance >= 75 ? "Good" : "Needs Improvement"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Grade Level Participation */}
          <Card>
            <CardHeader>
              <CardTitle>Participation by Grade Level</CardTitle>
              <CardDescription>
                Student participation distribution across grade levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gradeLevelParticipation.map((item) => (
                  <div key={item.grade} className="flex items-center justify-between">
                    <span className="font-medium">{item.grade}</span>
                    <div className="flex items-center gap-4">
                      <div className="w-48 bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-blue-500 h-3 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-16 text-right">
                        {item.count} ({item.percentage}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Attendance Report */}
      {selectedReport === "attendance" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Attendance Summary</CardTitle>
              <CardDescription>
                Overall attendance rates and patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {activityStats.averageAttendance}%
                  </div>
                  <p className="text-muted-foreground">Average Attendance</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {topActivities.filter(a => a.attendance >= 90).length}
                  </div>
                  <p className="text-muted-foreground">Activities with 90%+ Attendance</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    {topActivities.filter(a => a.attendance < 75).length}
                  </div>
                  <p className="text-muted-foreground">Activities Needing Attention</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Trends Report */}
      {selectedReport === "trends" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
              <CardDescription>
                Activity and participation trends over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyTrends.map((month) => (
                  <div key={month.month} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{month.month}</h4>
                      <p className="text-sm text-muted-foreground">
                        {month.activities} activities, {month.participants} participants
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-lg font-bold">{month.activities}</div>
                        <div className="text-xs text-muted-foreground">Activities</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{month.participants}</div>
                        <div className="text-xs text-muted-foreground">Participants</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
