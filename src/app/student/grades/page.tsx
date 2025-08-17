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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";

export default function StudentGrades() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Grades</h2>
          <p className="text-muted-foreground">
            View your academic performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="term-select">Term:</Label>
          <Select defaultValue="current">
            <SelectTrigger id="term-select" className="w-[180px]">
              <SelectValue placeholder="Current Term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Spring 2025 (Current)</SelectItem>
              <SelectItem value="fall2024">Fall 2024</SelectItem>
              <SelectItem value="spring2024">Spring 2024</SelectItem>
              <SelectItem value="fall2023">Fall 2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.7</div>
            <p className="text-xs text-muted-foreground">A- Average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Cumulative GPA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8</div>
            <p className="text-xs text-muted-foreground">A Average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Credits Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">Out of 120 required</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Academic Standing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Good</div>
            <p className="text-xs text-muted-foreground">Honor Roll Eligible</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Classes</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
          <TabsTrigger value="progress">Progress Report</TabsTrigger>
        </TabsList>
        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Term Grades</CardTitle>
              <CardDescription>Spring 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Current Grade</TableHead>
                    <TableHead>Grade Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentGrades.map((grade, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {grade.class}
                      </TableCell>
                      <TableCell>{grade.code}</TableCell>
                      <TableCell>{grade.credits}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={getGradeBadgeColor(grade.currentGrade)}
                          >
                            {grade.currentGrade}
                          </Badge>
                          <span>{grade.percentage}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getGradeTrendIcon(grade.trend)}
                          <span className="text-sm">{grade.trend}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Assessments</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assessment</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Weight</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentAssessments.map((assessment, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {assessment.title}
                      </TableCell>
                      <TableCell>{assessment.class}</TableCell>
                      <TableCell>{assessment.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={getGradeBadgeColor(
                              assessment.letterGrade
                            )}
                          >
                            {assessment.letterGrade}
                          </Badge>
                          <span>
                            {assessment.score}/{assessment.total}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{assessment.weight}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transcript" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Transcript</CardTitle>
              <CardDescription>Complete grade history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {transcriptTerms.map((term, termIndex) => (
                  <div key={termIndex} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{term.name}</h3>
                      <div className="text-sm">
                        <span className="font-medium">Term GPA: </span>
                        <span>{term.gpa}</span>
                      </div>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Class</TableHead>
                          <TableHead>Code</TableHead>
                          <TableHead>Credits</TableHead>
                          <TableHead>Grade</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {term.classes.map((classItem, classIndex) => (
                          <TableRow key={classIndex}>
                            <TableCell className="font-medium">
                              {classItem.name}
                            </TableCell>
                            <TableCell>{classItem.code}</TableCell>
                            <TableCell>{classItem.credits}</TableCell>
                            <TableCell>
                              <Badge
                                className={getGradeBadgeColor(classItem.grade)}
                              >
                                {classItem.grade}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Graduation Requirements Progress</CardTitle>
              <CardDescription>
                Track your progress toward graduation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Overall Progress</span>
                  <span>40% Complete</span>
                </div>
                <Progress value={40} />
              </div>
              {graduationRequirements.map((req, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{req.category}</span>
                    <span>
                      {req.completed}/{req.required} Credits
                    </span>
                  </div>
                  <Progress value={(req.completed / req.required) * 100} />
                  <div className="text-sm text-muted-foreground">
                    {req.description}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function getGradeBadgeColor(grade) {
  if (grade.startsWith("A")) return "bg-green-500 hover:bg-green-500/80";
  if (grade.startsWith("B")) return "bg-blue-500 hover:bg-blue-500/80";
  if (grade.startsWith("C")) return "bg-yellow-500 hover:bg-yellow-500/80";
  if (grade.startsWith("D")) return "bg-orange-500 hover:bg-orange-500/80";
  if (grade.startsWith("F")) return "bg-red-500 hover:bg-red-500/80";
  return "";
}

function getGradeTrendIcon(trend) {
  if (trend === "Improving") return <span className="text-green-500">↑</span>;
  if (trend === "Declining") return <span className="text-red-500">↓</span>;
  return <span className="text-gray-500">→</span>;
}

const currentGrades = [
  {
    class: "Advanced Mathematics",
    code: "MATH301",
    credits: 4,
    currentGrade: "A-",
    percentage: 91,
    trend: "Stable",
  },
  {
    class: "Physics",
    code: "PHYS201",
    credits: 4,
    currentGrade: "B+",
    percentage: 88,
    trend: "Improving",
  },
  {
    class: "World History",
    code: "HIST101",
    credits: 3,
    currentGrade: "A",
    percentage: 94,
    trend: "Stable",
  },
  {
    class: "English Literature",
    code: "ENG202",
    credits: 3,
    currentGrade: "B",
    percentage: 85,
    trend: "Declining",
  },
  {
    class: "Computer Science",
    code: "CS101",
    credits: 3,
    currentGrade: "A",
    percentage: 95,
    trend: "Improving",
  },
];

const recentAssessments = [
  {
    title: "Midterm Exam",
    class: "Advanced Mathematics",
    date: "Mar 15, 2025",
    letterGrade: "A-",
    score: 88,
    total: 100,
    weight: 25,
  },
  {
    title: "Lab Report",
    class: "Physics",
    date: "Mar 18, 2025",
    letterGrade: "B+",
    score: 42,
    total: 50,
    weight: 15,
  },
  {
    title: "Essay",
    class: "English Literature",
    date: "Mar 20, 2025",
    letterGrade: "B",
    score: 85,
    total: 100,
    weight: 20,
  },
  {
    title: "Quiz",
    class: "World History",
    date: "Mar 22, 2025",
    letterGrade: "A",
    score: 19,
    total: 20,
    weight: 10,
  },
  {
    title: "Programming Assignment",
    class: "Computer Science",
    date: "Mar 24, 2025",
    letterGrade: "A",
    score: 98,
    total: 100,
    weight: 20,
  },
];

const transcriptTerms = [
  {
    name: "Fall 2024",
    gpa: "3.8",
    classes: [
      {
        name: "Biology",
        code: "BIO101",
        credits: 4,
        grade: "A",
      },
      {
        name: "Chemistry",
        code: "CHEM101",
        credits: 4,
        grade: "A-",
      },
      {
        name: "Introduction to Psychology",
        code: "PSYC101",
        credits: 3,
        grade: "B+",
      },
      {
        name: "Calculus I",
        code: "MATH201",
        credits: 4,
        grade: "A",
      },
    ],
  },
  {
    name: "Spring 2024",
    gpa: "3.7",
    classes: [
      {
        name: "American Literature",
        code: "ENG101",
        credits: 3,
        grade: "A-",
      },
      {
        name: "Statistics",
        code: "STAT101",
        credits: 3,
        grade: "B+",
      },
      {
        name: "Introduction to Sociology",
        code: "SOC101",
        credits: 3,
        grade: "A",
      },
      {
        name: "Art History",
        code: "ART101",
        credits: 3,
        grade: "B",
      },
    ],
  },
];

const graduationRequirements = [
  {
    category: "General Education",
    completed: 18,
    required: 36,
    description:
      "Core courses required for all students including English, Math, Science, and Humanities.",
  },
  {
    category: "Major Requirements",
    completed: 12,
    required: 45,
    description: "Specialized courses in your chosen field of study.",
  },
  {
    category: "Electives",
    completed: 18,
    required: 30,
    description:
      "Optional courses of your choice to explore different subjects.",
  },
  {
    category: "Lab Sciences",
    completed: 8,
    required: 12,
    description: "Science courses with laboratory components.",
  },
];
