'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Download } from 'lucide-react'
import Link from "next/link"

export default function TeacherPerformancePage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the teacher data based on the ID
  const teacher = {
    id: params.id,
    name: "Sarah Johnson",
    department: "Mathematics",
  }

  // Sample performance data
  const performanceData = {
    rating: 4.8,
    attendance: 98,
    studentSuccess: 92,
    classesCompleted: 15,
    studentsImpacted: 320,
    yearsOfService: 5,
    feedbackScore: 4.7,
    peerReviewScore: 4.9,
    professionalDevelopment: 8,
    researchPublications: 3,
    monthlyPerformance: [
      { month: "Jan", rating: 4.7, attendance: 97, studentSuccess: 90 },
      { month: "Feb", rating: 4.8, attendance: 98, studentSuccess: 91 },
      { month: "Mar", rating: 4.8, attendance: 99, studentSuccess: 92 },
      { month: "Apr", rating: 4.9, attendance: 100, studentSuccess: 93 },
      { month: "May", rating: 4.7, attendance: 97, studentSuccess: 91 },
      { month: "Jun", rating: 4.8, attendance: 98, studentSuccess: 92 },
    ],
    studentFeedback: [
      {
        comment: "Ms. Johnson explains complex concepts in a way that's easy to understand.",
        rating: 5,
        date: "May 15, 2025",
      },
      {
        comment: "Always available for extra help and genuinely cares about student success.",
        rating: 5,
        date: "May 10, 2025",
      },
      {
        comment: "The assignments are challenging but fair. I've learned a lot in this class.",
        rating: 4,
        date: "May 5, 2025",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={`/admin/teachers/${params.id}/profile`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{teacher.name}'s Performance</h1>
            <p className="text-muted-foreground">{teacher.department} Department</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="current">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Academic Year</SelectItem>
              <SelectItem value="2024">2024-2025</SelectItem>
              <SelectItem value="2023">2023-2024</SelectItem>
              <SelectItem value="2022">2022-2023</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            View History
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceData.rating}/5.0</div>
            <p className="text-xs text-muted-foreground">Based on student feedback and peer reviews</p>
            <Progress value={performanceData.rating * 20} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceData.attendance}%</div>
            <p className="text-xs text-muted-foreground">Classes attended on time</p>
            <Progress value={performanceData.attendance} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Student Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceData.studentSuccess}%</div>
            <p className="text-xs text-muted-foreground">Students achieving B grade or higher</p>
            <Progress value={performanceData.studentSuccess} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Professional Development</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceData.professionalDevelopment}</div>
            <p className="text-xs text-muted-foreground">Workshops and courses completed this year</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Performance Overview</TabsTrigger>
          <TabsTrigger value="feedback">Student Feedback</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="development">Professional Development</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance Trends</CardTitle>
              <CardDescription>Performance metrics over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md border p-4">
                <div className="text-center text-sm text-muted-foreground">
                  [Chart visualization would be displayed here showing monthly performance trends]
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Teaching Effectiveness</CardTitle>
                <CardDescription>Assessment of teaching methods and effectiveness</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Clarity of Instruction</span>
                    <span className="text-sm font-medium">4.9/5.0</span>
                  </div>
                  <Progress value={98} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Student Engagement</span>
                    <span className="text-sm font-medium">4.7/5.0</span>
                  </div>
                  <Progress value={94} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Assessment Quality</span>
                    <span className="text-sm font-medium">4.8/5.0</span>
                  </div>
                  <Progress value={96} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Curriculum Adherence</span>
                    <span className="text-sm font-medium">5.0/5.0</span>
                  </div>
                  <Progress value={100} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Outcomes</CardTitle>
                <CardDescription>Impact on student learning and achievement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Class Grade</span>
                    <span className="text-sm font-medium">B+ (3.7/4.0)</span>
                  </div>
                  <Progress value={92} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Improvement Rate</span>
                    <span className="text-sm font-medium">+15% from baseline</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Standardized Test Performance</span>
                    <span className="text-sm font-medium">+12% above average</span>
                  </div>
                  <Progress value={82} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Student Retention Rate</span>
                    <span className="text-sm font-medium">98%</span>
                  </div>
                  <Progress value={98} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Feedback</CardTitle>
              <CardDescription>Recent feedback from students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {performanceData.studentFeedback.map((feedback, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-2 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium">
                        {feedback.rating}/5
                      </div>
                      <span className="text-xs text-muted-foreground">{feedback.date}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm">{feedback.comment}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Feedback
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feedback Summary</CardTitle>
              <CardDescription>Analysis of student feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md border p-4">
                <div className="text-center text-sm text-muted-foreground">
                  [Feedback analysis visualization would be displayed here]
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Achievements</CardTitle>
              <CardDescription>Notable accomplishments and contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Research Publications</h3>
                  <p className="text-sm text-muted-foreground">
                    Published {performanceData.researchPublications} papers in mathematics education journals
                  </p>
                </div>
                &lt;div className="rounded-lg border p-4"&gt;                  <h3 className="font-medium">Curriculum Development</h3>
                  <p className="text-sm text-muted-foreground">
                    Led the development of the new Advanced Calculus curriculum
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Student Competition Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Coached students to 2nd place in the Regional Mathematics Olympiad
                  </p>
                </div>
                <div className="rounded-lg border p-4">



