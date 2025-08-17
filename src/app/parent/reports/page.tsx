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
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  BarChart,
  PieChart,
  BookOpen,
  Award,
  ChevronRight,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ParentReports() {
  // Sample report data
  const children = [
    {
      id: 1,
      name: "Emma Johnson",
      grade: "Grade 8",
      class: "8-A",
      reports: [
        {
          id: 1,
          title: "Term 1 Report Card",
          date: "December 15, 2024",
          type: "Term Report",
          status: "Final",
        },
        {
          id: 2,
          title: "Mid-Year Assessment",
          date: "February 28, 2025",
          type: "Progress Report",
          status: "Final",
        },
        {
          id: 3,
          title: "Term 2 Progress Report",
          date: "April 10, 2025",
          type: "Progress Report",
          status: "Final",
        },
      ],
      grades: {
        Mathematics: { current: "A", previous: "A-", trend: "up" },
        Science: { current: "A+", previous: "A", trend: "up" },
        English: { current: "B+", previous: "B", trend: "up" },
        History: { current: "A-", previous: "B+", trend: "up" },
        Art: { current: "A", previous: "A", trend: "stable" },
        "Physical Education": { current: "A", previous: "A", trend: "stable" },
        "Foreign Language": { current: "B", previous: "B-", trend: "up" },
        Music: { current: "A-", previous: "B+", trend: "up" },
      },
      attendance: {
        present: 95,
        absent: 3,
        late: 2,
        excused: 2,
        unexcused: 1,
      },
      comments: [
        {
          subject: "Overall Performance",
          teacher: "Ms. Sarah Williams",
          comment:
            "Emma continues to excel academically. She demonstrates strong critical thinking skills and actively participates in class discussions. She has shown significant improvement in her writing skills this term.",
        },
        {
          subject: "Mathematics",
          teacher: "Ms. Williams",
          comment:
            "Emma has a strong grasp of algebraic concepts and is able to solve complex problems. She should continue to challenge herself with extra practice problems.",
        },
        {
          subject: "Science",
          teacher: "Dr. Martinez",
          comment:
            "Emma shows exceptional interest and aptitude in science. Her lab work is meticulous and her project on ecosystems was outstanding.",
        },
      ],
    },
    {
      id: 2,
      name: "Noah Johnson",
      grade: "Grade 5",
      class: "5-C",
      reports: [
        {
          id: 1,
          title: "Term 1 Report Card",
          date: "December 15, 2024",
          type: "Term Report",
          status: "Final",
        },
        {
          id: 2,
          title: "Mid-Year Assessment",
          date: "February 28, 2025",
          type: "Progress Report",
          status: "Final",
        },
        {
          id: 3,
          title: "Term 2 Progress Report",
          date: "April 10, 2025",
          type: "Progress Report",
          status: "Final",
        },
      ],
      grades: {
        Mathematics: { current: "B+", previous: "B", trend: "up" },
        Science: { current: "A-", previous: "B+", trend: "up" },
        English: { current: "B", previous: "B", trend: "stable" },
        "Social Studies": { current: "B+", previous: "B", trend: "up" },
        Art: { current: "A", previous: "A", trend: "stable" },
        "Physical Education": { current: "A", previous: "A-", trend: "up" },
        Music: { current: "A-", previous: "B+", trend: "up" },
        Computer: { current: "A", previous: "A", trend: "stable" },
      },
      attendance: {
        present: 92,
        absent: 5,
        late: 3,
        excused: 4,
        unexcused: 1,
      },
      comments: [
        {
          subject: "Overall Performance",
          teacher: "Mr. James Anderson",
          comment:
            "Noah has shown good progress this term. He is developing good study habits and is becoming more confident in expressing his ideas in class. He works well with his peers during group activities.",
        },
        {
          subject: "Mathematics",
          teacher: "Mr. Anderson",
          comment:
            "Noah has improved in his understanding of fractions and decimals. He should continue to practice multiplication and division to build speed and accuracy.",
        },
        {
          subject: "English",
          teacher: "Ms. Parker",
          comment:
            "Noah's reading comprehension is developing well. He needs to focus on expanding his vocabulary and improving his writing structure.",
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Academic Reports</h1>
        <p className="text-muted-foreground">
          View report cards and academic progress
        </p>
      </div>

      <Tabs defaultValue="emma" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="emma">Emma's Reports</TabsTrigger>
            <TabsTrigger value="noah">Noah's Reports</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Select defaultValue="current">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="term1">Term 1 (2024-2025)</SelectItem>
                <SelectItem value="midyear">Mid-Year (2024-2025)</SelectItem>
                <SelectItem value="current">Term 2 (2024-2025)</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {children.map((child) => (
          <TabsContent
            key={child.id}
            value={child.name.split(" ")[0].toLowerCase()}
            className="mt-0 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Available Reports</CardTitle>
                  <CardDescription>
                    Academic reports for {child.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {child.reports.map((report) => (
                      <div
                        key={report.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-md">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{report.title}</div>
                            <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {report.date}
                              </span>
                              <span>{report.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              report.status === "Final" ? "default" : "outline"
                            }
                          >
                            {report.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Academic Summary</CardTitle>
                  <CardDescription>
                    {child.grade} | {child.class}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">
                        Overall Performance
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">A-</div>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Improving
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">
                        Attendance Rate
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">
                          {child.attendance.present}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {child.attendance.absent} absences
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">
                        Class Rank
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">5 / 28</div>
                        <div className="text-sm text-muted-foreground">
                          Top 20%
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>Current grades and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(child.grades).map(([subject, data]) => (
                    <div key={subject} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{subject}</div>
                        <Badge
                          className={`
                          ${
                            data.current.startsWith("A")
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              : data.current.startsWith("B")
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                              : data.current.startsWith("C")
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                          }
                        `}
                        >
                          {data.current}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-muted-foreground">
                          Previous: {data.previous}
                        </div>
                        {data.trend === "up" ? (
                          <div className="flex items-center text-green-600">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Improving
                          </div>
                        ) : data.trend === "down" ? (
                          <div className="flex items-center text-red-600">
                            <TrendingDown className="h-3 w-3 mr-1" />
                            Declining
                          </div>
                        ) : (
                          <div className="flex items-center text-muted-foreground">
                            Stable
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Details</CardTitle>
                  <CardDescription>
                    Attendance record for current term
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center mb-6">
                    <div className="text-center p-12">
                      <p className="text-muted-foreground">
                        Attendance chart will be displayed here
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 border rounded-lg text-center">
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Present Days
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        {child.attendance.present}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {152} days
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg text-center">
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Absent Days
                      </div>
                      <div className="text-2xl font-bold text-red-600">
                        {child.attendance.absent}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {child.attendance.excused} excused,{" "}
                        {child.attendance.unexcused} unexcused
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg text-center">
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Late Arrivals
                      </div>
                      <div className="text-2xl font-bold text-amber-600">
                        {child.attendance.late}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total minutes: 45
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg text-center">
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        School Days
                      </div>
                      <div className="text-2xl font-bold">160</div>
                      <div className="text-sm text-muted-foreground">
                        In current term
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Teacher Comments</CardTitle>
                  <CardDescription>Feedback from teachers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {child.comments.map((comment, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">{comment.subject}</div>
                          <div className="text-sm text-muted-foreground">
                            {comment.teacher}
                          </div>
                        </div>
                        <p className="text-sm">{comment.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="ghost" size="sm" className="ml-auto">
                    View All Comments
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Academic Progress</CardTitle>
                <CardDescription>Performance trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <div className="flex items-center justify-center p-12 border rounded-lg">
                      <div className="text-center">
                        <BarChart className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          Grade progression chart will be displayed here
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-center p-12 border rounded-lg">
                      <div className="text-center">
                        <PieChart className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          Subject distribution chart will be displayed here
                        </p>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="text-sm font-medium text-muted-foreground mb-2">
                        Areas of Excellence
                      </div>
                      <div className="space-y-2">
                        {Object.entries(child.grades)
                          .filter(([_, data]) => data.current.startsWith("A"))
                          .slice(0, 3)
                          .map(([subject, _]) => (
                            <div
                              key={subject}
                              className="flex items-center gap-2"
                            >
                              <Award className="h-4 w-4 text-amber-500" />
                              <span>{subject}</span>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="text-sm font-medium text-muted-foreground mb-2">
                        Areas for Improvement
                      </div>
                      <div className="space-y-2">
                        {Object.entries(child.grades)
                          .filter(([_, data]) => !data.current.startsWith("A"))
                          .slice(0, 3)
                          .map(([subject, _]) => (
                            <div
                              key={subject}
                              className="flex items-center gap-2"
                            >
                              <BookOpen className="h-4 w-4 text-blue-500" />
                              <span>{subject}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
