import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Calendar, PlusCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Teacher Recruitment - HR",
  description: "HR Teacher Recruitment Management",
};

export default function HRTeacherRecruitmentPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Teacher Recruitment
          </h1>
          <p className="text-muted-foreground">
            Manage teacher recruitment process and onboarding
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Post New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Create New Job Posting</DialogTitle>
                <DialogDescription>
                  Create a new teaching position to be advertised on the careers
                  page.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input id="jobTitle" placeholder="e.g. Mathematics Teacher" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="arts">Arts</SelectItem>
                        <SelectItem value="physical">
                          Physical Education
                        </SelectItem>
                        <SelectItem value="computer">
                          Computer Science
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employmentType">Employment Type</Label>
                    <Select>
                      <SelectTrigger id="employmentType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fullTime">Full-time</SelectItem>
                        <SelectItem value="partTime">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="temporary">Temporary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minQualification">
                      Minimum Qualification
                    </Label>
                    <Select>
                      <SelectTrigger id="minQualification">
                        <SelectValue placeholder="Select qualification" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bachelors">
                          Bachelor's Degree
                        </SelectItem>
                        <SelectItem value="masters">Master's Degree</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                        <SelectItem value="teaching">
                          Teaching Certificate
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">
                      Experience Required (Years)
                    </Label>
                    <Input id="experience" type="number" placeholder="e.g. 2" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary Range</Label>
                    <Input id="salary" placeholder="e.g. $50,000 - $65,000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Application Deadline</Label>
                    <Input id="deadline" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter detailed job description, responsibilities, and requirements"
                    rows={6}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Publish Job Posting</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Interview Schedule
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="job-postings">Job Postings</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search applications..."
                className="pl-8"
              />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="history">History</SelectItem>
                <SelectItem value="art">Art</SelectItem>
                <SelectItem value="pe">Physical Education</SelectItem>
                <SelectItem value="computer">Computer Science</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="screening">Screening</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="assessment">Assessment</SelectItem>
                <SelectItem value="reference">Reference Check</SelectItem>
                <SelectItem value="offer">Offer Extended</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>HR Assigned</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: "HR-APP-2025-001",
                      name: "Dr. Rajesh Kumar",
                      position: "Physics Teacher",
                      date: "Mar 25, 2025",
                      status: "Screening",
                      statusColor:
                        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
                      hrAssigned: "Sarah Johnson",
                    },
                    {
                      id: "HR-APP-2025-002",
                      name: "Maria Rodriguez",
                      position: "English Teacher",
                      date: "Mar 23, 2025",
                      status: "Interview",
                      statusColor:
                        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
                      hrAssigned: "David Chen",
                    },
                    {
                      id: "HR-APP-2025-003",
                      name: "Mohammed Al-Farsi",
                      position: "Mathematics Teacher",
                      date: "Mar 20, 2025",
                      status: "Assessment",
                      statusColor:
                        "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
                      hrAssigned: "Sarah Johnson",
                    },
                    {
                      id: "HR-APP-2025-004",
                      name: "Lisa Wong",
                      position: "Art Teacher",
                      date: "Mar 18, 2025",
                      status: "Reference Check",
                      statusColor:
                        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
                      hrAssigned: "Michael Brown",
                    },
                    {
                      id: "HR-APP-2025-005",
                      name: "Daniel Martinez",
                      position: "Physical Education",
                      date: "Mar 15, 2025",
                      status: "Offer Extended",
                      statusColor:
                        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
                      hrAssigned: "David Chen",
                    },
                    {
                      id: "HR-APP-2025-006",
                      name: "Emily Davis",
                      position: "Science Teacher",
                      date: "Mar 12, 2025",
                      status: "Hired",
                      statusColor:
                        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
                      hrAssigned: "Sarah Johnson",
                    },
                    {
                      id: "HR-APP-2025-007",
                      name: "Robert Chen",
                      position: "Computer Science Teacher",
                      date: "Mar 10, 2025",
                      status: "Rejected",
                      statusColor:
                        "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
                      hrAssigned: "Michael Brown",
                    },
                  ].map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">
                        {application.id}
                      </TableCell>
                      <TableCell>{application.name}</TableCell>
                      <TableCell>{application.position}</TableCell>
                      <TableCell>{application.date}</TableCell>
                      <TableCell>
                        <Badge
                          className={application.statusColor}
                          variant="outline"
                        >
                          {application.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{application.hrAssigned}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button size="sm">Process</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="job-postings" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                id: "JOB-2025-001",
                title: "Mathematics Teacher",
                department: "Mathematics",
                type: "Full-time",
                posted: "Mar 15, 2025",
                deadline: "Apr 15, 2025",
                applications: 12,
                status: "Active",
              },
              {
                id: "JOB-2025-002",
                title: "English Literature Teacher",
                department: "English",
                type: "Full-time",
                posted: "Mar 10, 2025",
                deadline: "Apr 10, 2025",
                applications: 8,
                status: "Active",
              },
              {
                id: "JOB-2025-003",
                title: "Physics Teacher",
                department: "Science",
                type: "Full-time",
                posted: "Mar 5, 2025",
                deadline: "Apr 5, 2025",
                applications: 6,
                status: "Active",
              },
              {
                id: "JOB-2025-004",
                title: "Art Teacher",
                department: "Arts",
                type: "Part-time",
                posted: "Feb 28, 2025",
                deadline: "Mar 28, 2025",
                applications: 15,
                status: "Closing Soon",
              },
              {
                id: "JOB-2025-005",
                title: "Computer Science Teacher",
                department: "Computer Science",
                type: "Full-time",
                posted: "Feb 20, 2025",
                deadline: "Mar 20, 2025",
                applications: 10,
                status: "Closed",
              },
              {
                id: "JOB-2025-006",
                title: "Physical Education Teacher",
                department: "Physical Education",
                type: "Full-time",
                posted: "Feb 15, 2025",
                deadline: "Mar 15, 2025",
                applications: 7,
                status: "Closed",
              },
            ].map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{job.title}</CardTitle>
                      <CardDescription>
                        {job.department} Department
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        job.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : job.status === "Closing Soon"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                      }
                    >
                      {job.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Job Type:</span>
                      <span>{job.type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Posted:</span>
                      <span>{job.posted}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Deadline:</span>
                      <span>{job.deadline}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Applications:
                      </span>
                      <span>{job.applications}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm">Manage</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="onboarding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>New Hires Onboarding</CardTitle>
              <CardDescription>
                Manage the onboarding process for new teachers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Onboarding Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: "EMP-2025-042",
                      name: "Emily Davis",
                      position: "Science Teacher",
                      startDate: "Apr 15, 2025",
                      status: "Documentation",
                      progress: 25,
                    },
                    {
                      id: "EMP-2025-043",
                      name: "James Wilson",
                      position: "History Teacher",
                      startDate: "Apr 10, 2025",
                      status: "Training",
                      progress: 50,
                    },
                    {
                      id: "EMP-2025-044",
                      name: "Sophia Garcia",
                      position: "Mathematics Teacher",
                      startDate: "Apr 5, 2025",
                      status: "Department Introduction",
                      progress: 75,
                    },
                    {
                      id: "EMP-2025-045",
                      name: "William Taylor",
                      position: "English Teacher",
                      startDate: "Apr 1, 2025",
                      status: "Completed",
                      progress: 100,
                    },
                  ].map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">
                        {employee.id}
                      </TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.startDate}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between text-sm">
                            <span>{employee.status}</span>
                            <span>{employee.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${employee.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm">Manage Onboarding</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">247</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Positions Filled
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">
                  +3 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Time to Hire
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24 days</div>
                <p className="text-xs text-muted-foreground">
                  -2 days from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Applications by Department</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center text-center text-muted-foreground">
                  [Department Applications Chart]
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recruitment Funnel</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center text-center text-muted-foreground">
                  [Recruitment Funnel Chart]
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
