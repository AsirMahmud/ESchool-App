import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Search, Filter, MoreVertical, Download, UserPlus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function EmployeesPage() {
  // Sample employee data
  const employees = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@eschool.edu",
      phone: "+1 (555) 123-4567",
      department: "Science",
      position: "Senior Teacher",
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
      position: "Teacher",
      status: "Active",
      joinDate: "Jan 10, 2021",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@eschool.edu",
      phone: "+1 (555) 345-6789",
      department: "English",
      position: "Teacher",
      status: "Active",
      joinDate: "Mar 22, 2019",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@eschool.edu",
      phone: "+1 (555) 456-7890",
      department: "Administration",
      position: "Office Manager",
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
      status: "Active",
      joinDate: "Jul 20, 2018",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 8,
      name: "Lisa Anderson",
      email: "lisa.anderson@eschool.edu",
      phone: "+1 (555) 890-1234",
      department: "Support Staff",
      position: "Librarian",
      status: "Active",
      joinDate: "Apr 12, 2022",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Employee Management</h1>
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
            <DialogContent className="sm:max-w-[600px]">
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
                    <Label htmlFor="department">Department *</Label>
                    <Select>
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
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
                        <SelectItem value="support-staff">
                          Support Staff
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position *</Label>
                    <Select>
                      <SelectTrigger id="position">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="senior-teacher">
                          Senior Teacher
                        </SelectItem>
                        <SelectItem value="department-head">
                          Department Head
                        </SelectItem>
                        <SelectItem value="coach">Coach</SelectItem>
                        <SelectItem value="office-manager">
                          Office Manager
                        </SelectItem>
                        <SelectItem value="librarian">Librarian</SelectItem>
                        <SelectItem value="counselor">Counselor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="join-date">Join Date *</Label>
                    <Input id="join-date" type="date" />
                  </div>
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" placeholder="Enter full address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional information"
                  />
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

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search employees..."
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
            <DropdownMenuItem>Position</DropdownMenuItem>
            <DropdownMenuItem>Status</DropdownMenuItem>
            <DropdownMenuItem>Join Date</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Employees</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="on-leave">On Leave</TabsTrigger>
          <TabsTrigger value="new">New Hires</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
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
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={employee.avatar}
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
                            <DropdownMenuItem>Manage Leave</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Deactivate
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
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Showing active employees only.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="on-leave" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Showing employees on leave.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="new" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Showing new hires (last 30 days).
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
