import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  MoreVertical,
  Download,
  UserPlus,
  FileText,
  Trash2,
  Edit,
  Eye,
  UserCog,
  GraduationCap,
  Briefcase,
  Calculator,
  Users,
  Shield,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";

export default function EmployeesPage() {
  // Sample employee data
  const employees = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@eschool.edu",
      phone: "+1 (555) 123-4567",
      department: "Administration",
      position: "Principal",
      role: "Administrator",
      status: "Active",
      joinDate: "Aug 15, 2020",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@eschool.edu",
      phone: "+1 (555) 234-5678",
      department: "Mathematics",
      position: "Senior Teacher",
      role: "Teacher",
      status: "Active",
      joinDate: "Jan 10, 2021",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@eschool.edu",
      phone: "+1 (555) 345-6789",
      department: "Human Resources",
      position: "HR Manager",
      role: "HR Staff",
      status: "Active",
      joinDate: "Mar 22, 2019",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@eschool.edu",
      phone: "+1 (555) 456-7890",
      department: "Finance",
      position: "Chief Accountant",
      role: "Accountant",
      status: "Active",
      joinDate: "Sep 5, 2022",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@eschool.edu",
      phone: "+1 (555) 567-8901",
      department: "Physical Education",
      position: "Coach",
      role: "Teacher",
      status: "On Leave",
      joinDate: "Nov 15, 2020",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      name: "Jennifer Martinez",
      email: "jennifer.martinez@eschool.edu",
      phone: "+1 (555) 678-9012",
      department: "Art",
      position: "Teacher",
      role: "Teacher",
      status: "Active",
      joinDate: "Feb 8, 2021",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 7,
      name: "Robert Taylor",
      email: "robert.taylor@eschool.edu",
      phone: "+1 (555) 789-0123",
      department: "History",
      position: "Department Head",
      role: "Teacher",
      status: "Active",
      joinDate: "Jul 20, 2018",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 8,
      name: "Lisa Anderson",
      email: "lisa.anderson@eschool.edu",
      phone: "+1 (555) 890-1234",
      department: "Library",
      position: "Librarian",
      role: "Support Staff",
      status: "Active",
      joinDate: "Apr 12, 2022",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 9,
      name: "Thomas Johnson",
      email: "thomas.johnson@eschool.edu",
      phone: "+1 (555) 901-2345",
      department: "IT",
      position: "IT Manager",
      role: "Support Staff",
      status: "Active",
      joinDate: "Jun 3, 2021",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 10,
      name: "Maria Garcia",
      email: "maria.garcia@eschool.edu",
      phone: "+1 (555) 012-3456",
      department: "Finance",
      position: "Accountant",
      role: "Accountant",
      status: "Active",
      joinDate: "May 17, 2022",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Employee Management</h1>
          <p className="text-muted-foreground">
            Manage all employees across the school system
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>
                  Enter the details of the new employee. All fields marked with
                  * are required.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name *</Label>
                    <Input id="first-name" placeholder="Enter first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name *</Label>
                    <Input id="last-name" placeholder="Enter last name" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@eschool.edu"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role *</Label>
                    <Select>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="administrator">
                          Administrator
                        </SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="hr-staff">HR Staff</SelectItem>
                        <SelectItem value="accountant">Accountant</SelectItem>
                        <SelectItem value="support-staff">
                          Support Staff
                        </SelectItem>
                        <SelectItem value="it-staff">IT Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Select>
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="administration">
                          Administration
                        </SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="art">Art</SelectItem>
                        <SelectItem value="physical-education">
                          Physical Education
                        </SelectItem>
                        <SelectItem value="human-resources">
                          Human Resources
                        </SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="library">Library</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="position">Position *</Label>
                    <Input id="position" placeholder="Enter position" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="join-date">Join Date *</Label>
                    <DatePicker />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status *</Label>
                    <Select>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="on-leave">On Leave</SelectItem>
                        <SelectItem value="probation">Probation</SelectItem>
                        <SelectItem value="terminated">Terminated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employee-id">Employee ID</Label>
                    <Input id="employee-id" placeholder="Enter employee ID" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" placeholder="Enter full address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qualifications">Qualifications</Label>
                  <Textarea
                    id="qualifications"
                    placeholder="Enter qualifications and certifications"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Access Permissions</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="access-dashboard" />
                      <Label htmlFor="access-dashboard">Dashboard Access</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="access-students" />
                      <Label htmlFor="access-students">Student Records</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="access-finance" />
                      <Label htmlFor="access-finance">Financial Records</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="access-hr" />
                      <Label htmlFor="access-hr">HR Records</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="access-reports" />
                      <Label htmlFor="access-reports">Reports</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="access-settings" />
                      <Label htmlFor="access-settings">System Settings</Label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Add Employee</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search employees..."
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="administrator">Administrator</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
              <SelectItem value="hr-staff">HR Staff</SelectItem>
              <SelectItem value="accountant">Accountant</SelectItem>
              <SelectItem value="support-staff">Support Staff</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="administration">Administration</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="mathematics">Mathematics</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="human-resources">Human Resources</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Employees</TabsTrigger>
          <TabsTrigger
            value="administrators"
            className="flex items-center gap-1"
          >
            <Shield className="h-4 w-4" />
            Administrators
          </TabsTrigger>
          <TabsTrigger value="teachers" className="flex items-center gap-1">
            <GraduationCap className="h-4 w-4" />
            Teachers
          </TabsTrigger>
          <TabsTrigger value="hr" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            HR Staff
          </TabsTrigger>
          <TabsTrigger value="accountants" className="flex items-center gap-1">
            <Calculator className="h-4 w-4" />
            Accountants
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            Support Staff
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={employee.avatar || "/placeholder.svg"}
                              alt={employee.name}
                            />
                            <AvatarFallback>
                              {employee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {employee.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            employee.role === "Administrator"
                              ? "bg-purple-100 text-purple-800 border-purple-200"
                              : employee.role === "Teacher"
                              ? "bg-blue-100 text-blue-800 border-blue-200"
                              : employee.role === "HR Staff"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : employee.role === "Accountant"
                              ? "bg-amber-100 text-amber-800 border-amber-200"
                              : "bg-gray-100 text-gray-800 border-gray-200"
                          }
                        >
                          {employee.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            employee.status === "Active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{employee.joinDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserCog className="mr-2 h-4 w-4" />
                              Manage Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Documents
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
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
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>42</strong> employees
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="administrators" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Administrators</CardTitle>
              <CardDescription>
                Manage school administrators and their permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees
                    .filter((employee) => employee.role === "Administrator")
                    .map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={employee.avatar || "/placeholder.svg"}
                                alt={employee.name}
                              />
                              <AvatarFallback>
                                {employee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{employee.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {employee.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              employee.status === "Active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{employee.joinDate}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit Details</DropdownMenuItem>
                              <DropdownMenuItem>
                                Manage Permissions
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                Delete
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
        <TabsContent value="teachers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Teachers</CardTitle>
              <CardDescription>
                Manage teaching staff and their assignments
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees
                    .filter((employee) => employee.role === "Teacher")
                    .map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={employee.avatar || "/placeholder.svg"}
                                alt={employee.name}
                              />
                              <AvatarFallback>
                                {employee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{employee.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {employee.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              employee.status === "Active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{employee.joinDate}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit Details</DropdownMenuItem>
                              <DropdownMenuItem>
                                Assign Classes
                              </DropdownMenuItem>
                              <DropdownMenuItem>View Schedule</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                Delete
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
        <TabsContent value="hr" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>HR Staff</CardTitle>
              <CardDescription>
                Manage human resources personnel
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees
                    .filter((employee) => employee.role === "HR Staff")
                    .map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={employee.avatar || "/placeholder.svg"}
                                alt={employee.name}
                              />
                              <AvatarFallback>
                                {employee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{employee.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {employee.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              employee.status === "Active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{employee.joinDate}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit Details</DropdownMenuItem>
                              <DropdownMenuItem>
                                Manage Permissions
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                Delete
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
        <TabsContent value="accountants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Accountants</CardTitle>
              <CardDescription>
                Manage finance and accounting staff
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees
                    .filter((employee) => employee.role === "Accountant")
                    .map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={employee.avatar || "/placeholder.svg"}
                                alt={employee.name}
                              />
                              <AvatarFallback>
                                {employee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{employee.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {employee.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              employee.status === "Active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{employee.joinDate}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit Details</DropdownMenuItem>
                              <DropdownMenuItem>
                                Financial Access
                              </DropdownMenuItem>
                              <DropdownMenuItem>View Reports</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                Delete
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
        <TabsContent value="support" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Support Staff</CardTitle>
              <CardDescription>
                Manage support and administrative staff
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees
                    .filter((employee) => employee.role === "Support Staff")
                    .map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={employee.avatar || "/placeholder.svg"}
                                alt={employee.name}
                              />
                              <AvatarFallback>
                                {employee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{employee.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {employee.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              employee.status === "Active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{employee.joinDate}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit Details</DropdownMenuItem>
                              <DropdownMenuItem>Assign Tasks</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                Delete
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
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Employee Management Tools</CardTitle>
          <CardDescription>
            Additional tools for managing employees
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Bulk Import</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Import multiple employees from CSV or Excel files
            </p>
            <Button className="mt-4 w-full" variant="outline" size="sm">
              Import Employees
            </Button>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Export Data</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Export employee data in various formats
            </p>
            <Button className="mt-4 w-full" variant="outline" size="sm">
              Export Data
            </Button>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <UserCog className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Role Management</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage employee roles and permissions
            </p>
            <Button className="mt-4 w-full" variant="outline" size="sm">
              Manage Roles
            </Button>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Department Management</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage departments and structure
            </p>
            <Button className="mt-4 w-full" variant="outline" size="sm">
              Manage Departments
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
