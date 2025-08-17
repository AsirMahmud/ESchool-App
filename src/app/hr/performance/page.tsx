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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Award,
  Calendar,
  Filter,
  MoreVertical,
  Plus,
  Search,
  Star,
  StarHalf,
  BarChart,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function PerformancePage() {
  // Sample performance reviews data
  const performanceReviews = [
    {
      id: 1,
      employee: {
        name: "John Smith",
        department: "Science",
        position: "Senior Teacher",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      reviewPeriod: "2024-2025 Academic Year",
      reviewDate: "2025-03-15",
      reviewer: "Dr. Robert Chen",
      overallRating: 4.5,
      status: "Completed",
      goals: [
        { title: "Curriculum Development", progress: 90 },
        { title: "Student Engagement", progress: 85 },
        { title: "Professional Development", progress: 75 },
      ],
    },
    {
      id: 2,
      employee: {
        name: "Sarah Johnson",
        department: "Mathematics",
        position: "Teacher",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      reviewPeriod: "2024-2025 Academic Year",
      reviewDate: "2025-03-18",
      reviewer: "Prof. Emily Davis",
      overallRating: 4.2,
      status: "Completed",
      goals: [
        { title: "Student Performance", progress: 80 },
        { title: "Teaching Methods", progress: 90 },
        { title: "Collaboration", progress: 85 },
      ],
    },
    {
      id: 3,
      employee: {
        name: "Michael Brown",
        department: "English",
        position: "Teacher",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      reviewPeriod: "2024-2025 Academic Year",
      reviewDate: "2025-03-20",
      reviewer: "Dr. Jennifer Martinez",
      overallRating: 3.8,
      status: "Completed",
      goals: [
        { title: "Student Engagement", progress: 70 },
        { title: "Curriculum Innovation", progress: 65 },
        { title: "Assessment Methods", progress: 80 },
      ],
    },
    {
      id: 4,
      employee: {
        name: "Emily Davis",
        department: "Administration",
        position: "Office Manager",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      reviewPeriod: "2024-2025 Academic Year",
      reviewDate: "2025-04-05",
      reviewer: "Lisa Anderson",
      overallRating: 0,
      status: "Scheduled",
      goals: [
        { title: "Process Improvement", progress: 60 },
        { title: "Staff Management", progress: 70 },
        { title: "Resource Allocation", progress: 65 },
      ],
    },
    {
      id: 5,
      employee: {
        name: "David Wilson",
        department: "Physical Education",
        position: "Coach",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      reviewPeriod: "2024-2025 Academic Year",
      reviewDate: "2025-04-10",
      reviewer: "Robert Taylor",
      overallRating: 0,
      status: "Scheduled",
      goals: [
        { title: "Team Performance", progress: 75 },
        { title: "Student Fitness", progress: 80 },
        { title: "Program Development", progress: 65 },
      ],
    },
  ];

  // Sample performance metrics
  const performanceMetrics = [
    { category: "Teaching Quality", average: 4.2, target: 4.0, trend: "up" },
    {
      category: "Student Outcomes",
      average: 3.8,
      target: 4.0,
      trend: "stable",
    },
    {
      category: "Professional Development",
      average: 3.5,
      target: 4.0,
      trend: "up",
    },
    { category: "Collaboration", average: 4.0, target: 4.0, trend: "stable" },
    { category: "Innovation", average: 3.7, target: 4.0, trend: "up" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Performance Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Performance Review
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Schedule Performance Review</DialogTitle>
              <DialogDescription>
                Set up a new performance review for an employee.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="employee">Employee</Label>
                <Select>
                  <SelectTrigger id="employee">
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-smith">John Smith</SelectItem>
                    <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                    <SelectItem value="michael-brown">Michael Brown</SelectItem>
                    <SelectItem value="emily-davis">Emily Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reviewer">Reviewer</Label>
                <Select>
                  <SelectTrigger id="reviewer">
                    <SelectValue placeholder="Select reviewer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="robert-chen">Dr. Robert Chen</SelectItem>
                    <SelectItem value="emily-davis">
                      Prof. Emily Davis
                    </SelectItem>
                    <SelectItem value="jennifer-martinez">
                      Dr. Jennifer Martinez
                    </SelectItem>
                    <SelectItem value="lisa-anderson">Lisa Anderson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="review-period">Review Period</Label>
                  <Select>
                    <SelectTrigger id="review-period">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-2025">
                        2024-2025 Academic Year
                      </SelectItem>
                      <SelectItem value="2023-2024">
                        2023-2024 Academic Year
                      </SelectItem>
                      <SelectItem value="q1-2025">Q1 2025</SelectItem>
                      <SelectItem value="q2-2025">Q2 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="review-date">Review Date</Label>
                  <Input id="review-date" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="review-type">Review Type</Label>
                <Select>
                  <SelectTrigger id="review-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Annual Review</SelectItem>
                    <SelectItem value="mid-year">Mid-Year Review</SelectItem>
                    <SelectItem value="probation">Probation Review</SelectItem>
                    <SelectItem value="special">Special Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Enter any additional information"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Schedule Review</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search performance reviews..."
            className="pl-8"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Department</DropdownMenuItem>
            <DropdownMenuItem>Status</DropdownMenuItem>
            <DropdownMenuItem>Rating</DropdownMenuItem>
            <DropdownMenuItem>Review Period</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Reviews
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">This academic year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Scheduled Reviews
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.1/5.0</div>
            <p className="text-xs text-muted-foreground">
              Across all departments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Goal Completion
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              Average across all employees
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reviews" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reviews">Performance Reviews</TabsTrigger>
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
          <TabsTrigger value="goals">Goals & Objectives</TabsTrigger>
        </TabsList>
        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Review Period</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Review Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={review.employee.avatar}
                              alt={review.employee.name}
                            />
                            <AvatarFallback>
                              {review.employee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {review.employee.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {review.employee.department} -{" "}
                              {review.employee.position}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{review.reviewPeriod}</TableCell>
                      <TableCell>
                        {review.status === "Completed" ? (
                          <div className="flex items-center">
                            <div className="flex text-yellow-500">
                              {[...Array(Math.floor(review.overallRating))].map(
                                (_, i) => (
                                  <Star
                                    key={i}
                                    className="h-4 w-4 fill-current"
                                  />
                                )
                              )}
                              {review.overallRating % 1 !== 0 && (
                                <StarHalf className="h-4 w-4 fill-current" />
                              )}
                            </div>
                            <span className="ml-1 text-sm">
                              {review.overallRating.toFixed(1)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Pending
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            review.status === "Completed"
                              ? "default"
                              : review.status === "Scheduled"
                              ? "outline"
                              : "secondary"
                          }
                        >
                          {review.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>{review.reviewDate}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            {review.status === "Scheduled" ? (
                              <>
                                <DropdownMenuItem>
                                  Conduct Review
                                </DropdownMenuItem>
                                <DropdownMenuItem>Reschedule</DropdownMenuItem>
                              </>
                            ) : (
                              <>
                                <DropdownMenuItem>Edit Review</DropdownMenuItem>
                                <DropdownMenuItem>
                                  Generate Report
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              View Employee History
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                School-wide performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {metric.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">
                          Average:{" "}
                          <span className="font-medium">
                            {metric.average.toFixed(1)}
                          </span>
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Target: {metric.target.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={(metric.average / 5) * 100}
                        className="h-2"
                      />
                      <span className="text-xs text-muted-foreground">
                        {metric.trend === "up"
                          ? "↑"
                          : metric.trend === "down"
                          ? "↓"
                          : "→"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Employee goals and objectives tracking.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
