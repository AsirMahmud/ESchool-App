import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  BookOpen,
  Calendar,
  Filter,
  MoreVertical,
  Plus,
  Search,
  Users,
  Award,
  CheckCircle2,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function TrainingPage() {
  // Sample training programs data
  const trainingPrograms = [
    {
      id: 1,
      title: "Modern Teaching Methods",
      type: "Professional Development",
      instructor: "Dr. Robert Chen",
      department: "All Teaching Staff",
      startDate: "2025-04-15",
      endDate: "2025-04-17",
      duration: "3 days",
      location: "Main Conference Room",
      capacity: 30,
      enrolled: 25,
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Digital Learning Tools Workshop",
      type: "Technical",
      instructor: "Sarah Johnson",
      department: "All Teaching Staff",
      startDate: "2025-04-22",
      endDate: "2025-04-22",
      duration: "1 day",
      location: "Computer Lab",
      capacity: 20,
      enrolled: 18,
      status: "Upcoming",
    },
    {
      id: 3,
      title: "Student Behavior Management",
      type: "Soft Skills",
      instructor: "Dr. Michael Brown",
      department: "All Teaching Staff",
      startDate: "2025-04-10",
      endDate: "2025-04-11",
      duration: "2 days",
      location: "Room 101",
      capacity: 25,
      enrolled: 22,
      status: "Completed",
    },
    {
      id: 4,
      title: "First Aid and Emergency Response",
      type: "Safety",
      instructor: "Emily Davis",
      department: "All Staff",
      startDate: "2025-04-05",
      endDate: "2025-04-05",
      duration: "1 day",
      location: "Gymnasium",
      capacity: 40,
      enrolled: 35,
      status: "Completed",
    },
    {
      id: 5,
      title: "Leadership Development",
      type: "Management",
      instructor: "David Wilson",
      department: "Department Heads",
      startDate: "2025-05-01",
      endDate: "2025-05-03",
      duration: "3 days",
      location: "Executive Conference Room",
      capacity: 15,
      enrolled: 12,
      status: "Upcoming",
    },
    {
      id: 6,
      title: "Inclusive Education Practices",
      type: "Professional Development",
      instructor: "Jennifer Martinez",
      department: "All Teaching Staff",
      startDate: "2025-05-10",
      endDate: "2025-05-11",
      duration: "2 days",
      location: "Room 202",
      capacity: 30,
      enrolled: 20,
      status: "Upcoming",
    },
  ];

  // Sample employee training data
  const employeeTraining = [
    {
      id: 1,
      employee: {
        name: "John Smith",
        department: "Science",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      completedTrainings: 5,
      requiredTrainings: 8,
      upcomingTrainings: 2,
      certifications: ["First Aid", "Digital Learning"],
      lastTraining: "2025-03-15",
    },
    {
      id: 2,
      employee: {
        name: "Sarah Johnson",
        department: "Mathematics",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      completedTrainings: 7,
      requiredTrainings: 8,
      upcomingTrainings: 1,
      certifications: ["First Aid", "Leadership", "Modern Teaching"],
      lastTraining: "2025-03-20",
    },
    {
      id: 3,
      employee: {
        name: "Michael Brown",
        department: "English",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      completedTrainings: 4,
      requiredTrainings: 8,
      upcomingTrainings: 3,
      certifications: ["Digital Learning"],
      lastTraining: "2025-02-28",
    },
    {
      id: 4,
      employee: {
        name: "Emily Davis",
        department: "Administration",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      completedTrainings: 8,
      requiredTrainings: 8,
      upcomingTrainings: 0,
      certifications: [
        "First Aid",
        "Leadership",
        "HR Management",
        "Digital Learning",
      ],
      lastTraining: "2025-03-25",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Training & Development</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Training Program
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Training Program</DialogTitle>
              <DialogDescription>
                Set up a new training program for employees.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Program Title</Label>
                <Input id="title" placeholder="Enter program title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Program Type</Label>
                  <Select>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">
                        Professional Development
                      </SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="soft-skills">Soft Skills</SelectItem>
                      <SelectItem value="safety">Safety</SelectItem>
                      <SelectItem value="management">Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructor">Instructor</Label>
                  <Input id="instructor" placeholder="Enter instructor name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Enter location" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input id="capacity" type="number" placeholder="0" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Target Department</Label>
                <Select>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-staff">All Staff</SelectItem>
                    <SelectItem value="teaching">All Teaching Staff</SelectItem>
                    <SelectItem value="admin">Administration</SelectItem>
                    <SelectItem value="department-heads">
                      Department Heads
                    </SelectItem>
                    <SelectItem value="support">Support Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Program Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter program details"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Create Program</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search training programs..."
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
            <DropdownMenuItem>Program Type</DropdownMenuItem>
            <DropdownMenuItem>Status</DropdownMenuItem>
            <DropdownMenuItem>Department</DropdownMenuItem>
            <DropdownMenuItem>Date Range</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Programs
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Training programs this year
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Trainings
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">In the next 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Employees Trained
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">
              Out of 93 total employees
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Certifications Issued
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">This academic year</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="programs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="programs">Training Programs</TabsTrigger>
          <TabsTrigger value="employees">Employee Training</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>
        <TabsContent value="programs" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Program</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Enrollment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trainingPrograms.map((program) => (
                    <TableRow key={program.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{program.title}</span>
                          <span className="text-xs text-muted-foreground">
                            Instructor: {program.instructor}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{program.type}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-xs">
                            From: {program.startDate}
                          </span>
                          <span className="text-xs">To: {program.endDate}</span>
                          <span className="text-xs text-muted-foreground">
                            {program.duration}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between text-xs">
                            <span>
                              {program.enrolled}/{program.capacity}
                            </span>
                            <span className="text-muted-foreground">
                              {Math.round(
                                (program.enrolled / program.capacity) * 100
                              )}
                              %
                            </span>
                          </div>
                          <Progress
                            value={(program.enrolled / program.capacity) * 100}
                            className="h-1"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            program.status === "Completed"
                              ? "secondary"
                              : program.status === "Upcoming"
                              ? "default"
                              : "outline"
                          }
                        >
                          {program.status}
                        </Badge>
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
                            <DropdownMenuItem>Edit Program</DropdownMenuItem>
                            <DropdownMenuItem>
                              Manage Enrollment
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Send Notifications
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Cancel Program
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
        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Training Status</TableHead>
                    <TableHead>Certifications</TableHead>
                    <TableHead>Last Training</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeeTraining.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={record.employee.avatar}
                              alt={record.employee.name}
                            />
                            <AvatarFallback>
                              {record.employee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {record.employee.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {record.employee.department}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between text-xs">
                            <span>
                              Completed: {record.completedTrainings}/
                              {record.requiredTrainings}
                            </span>
                            <span className="text-muted-foreground">
                              {Math.round(
                                (record.completedTrainings /
                                  record.requiredTrainings) *
                                  100
                              )}
                              %
                            </span>
                          </div>
                          <Progress
                            value={
                              (record.completedTrainings /
                                record.requiredTrainings) *
                              100
                            }
                            className="h-1"
                          />
                          <span className="text-xs text-muted-foreground">
                            Upcoming: {record.upcomingTrainings}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {record.certifications.map((cert, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              <CheckCircle2 className="h-3 w-3" />
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{record.lastTraining}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              View Training History
                            </DropdownMenuItem>
                            <DropdownMenuItem>Assign Training</DropdownMenuItem>
                            <DropdownMenuItem>
                              View Certifications
                            </DropdownMenuItem>
                            <DropdownMenuItem>Generate Report</DropdownMenuItem>
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
        <TabsContent value="certifications" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Certification management and tracking.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
