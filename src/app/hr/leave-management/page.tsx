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
  Calendar,
  Filter,
  MoreVertical,
  Plus,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function LeaveManagementPage() {
  // Sample leave requests data
  const leaveRequests = [
    {
      id: 1,
      employee: {
        name: "John Smith",
        department: "Science",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      type: "Sick Leave",
      startDate: "2025-04-05",
      endDate: "2025-04-07",
      duration: "3 days",
      reason: "Medical appointment and recovery",
      status: "Pending",
      appliedOn: "2025-03-25",
    },
    {
      id: 2,
      employee: {
        name: "Sarah Johnson",
        department: "Mathematics",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      type: "Vacation",
      startDate: "2025-05-10",
      endDate: "2025-05-17",
      duration: "8 days",
      reason: "Family vacation",
      status: "Approved",
      appliedOn: "2025-03-20",
    },
    {
      id: 3,
      employee: {
        name: "Michael Brown",
        department: "English",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      type: "Personal Leave",
      startDate: "2025-04-15",
      endDate: "2025-04-15",
      duration: "1 day",
      reason: "Personal matters",
      status: "Approved",
      appliedOn: "2025-03-22",
    },
    {
      id: 4,
      employee: {
        name: "Emily Davis",
        department: "Administration",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      type: "Sick Leave",
      startDate: "2025-04-02",
      endDate: "2025-04-03",
      duration: "2 days",
      reason: "Not feeling well",
      status: "Rejected",
      appliedOn: "2025-03-28",
    },
    {
      id: 5,
      employee: {
        name: "David Wilson",
        department: "Physical Education",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      type: "Bereavement",
      startDate: "2025-04-08",
      endDate: "2025-04-12",
      duration: "5 days",
      reason: "Family emergency",
      status: "Approved",
      appliedOn: "2025-03-27",
    },
    {
      id: 6,
      employee: {
        name: "Jennifer Martinez",
        department: "Art",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      type: "Professional Development",
      startDate: "2025-04-20",
      endDate: "2025-04-22",
      duration: "3 days",
      reason: "Attending art education conference",
      status: "Pending",
      appliedOn: "2025-03-26",
    },
  ];

  // Leave balance data
  const leaveBalances = [
    { type: "Sick Leave", used: 5, total: 15, remaining: 10 },
    { type: "Vacation", used: 8, total: 20, remaining: 12 },
    { type: "Personal Leave", used: 2, total: 5, remaining: 3 },
    { type: "Professional Development", used: 1, total: 5, remaining: 4 },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Leave Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Leave Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Submit Leave Request</DialogTitle>
              <DialogDescription>
                Fill out the form to submit a new leave request.
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
                <Label htmlFor="leave-type">Leave Type</Label>
                <Select>
                  <SelectTrigger id="leave-type">
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="vacation">Vacation</SelectItem>
                    <SelectItem value="personal">Personal Leave</SelectItem>
                    <SelectItem value="bereavement">Bereavement</SelectItem>
                    <SelectItem value="professional">
                      Professional Development
                    </SelectItem>
                  </SelectContent>
                </Select>
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
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Leave</Label>
                <Textarea
                  id="reason"
                  placeholder="Provide details about your leave request"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="documents">
                  Supporting Documents (Optional)
                </Label>
                <Input id="documents" type="file" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Submit Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search leave requests..."
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
            <DropdownMenuItem>Leave Type</DropdownMenuItem>
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
              Pending Requests
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Approved Leaves
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Rejected Requests
            </CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              On Leave Today
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Employees absent</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={request.employee.avatar}
                              alt={request.employee.name}
                            />
                            <AvatarFallback>
                              {request.employee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {request.employee.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {request.employee.department}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{request.type}</TableCell>
                      <TableCell>{request.duration}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-xs">
                            From: {request.startDate}
                          </span>
                          <span className="text-xs">To: {request.endDate}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            request.status === "Approved"
                              ? "default"
                              : request.status === "Rejected"
                              ? "destructive"
                              : "outline"
                          }
                        >
                          {request.status}
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
                            <DropdownMenuItem>Approve</DropdownMenuItem>
                            <DropdownMenuItem>Reject</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              Request Documents
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
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Showing pending leave requests only.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="approved" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Showing approved leave requests only.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rejected" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Showing rejected leave requests only.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Leave Balances</CardTitle>
          <CardDescription>
            Current leave balances for all employees
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaveBalances.map((balance, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{balance.type}</span>
                  <span className="text-sm text-muted-foreground">
                    {balance.remaining}/{balance.total} days remaining
                  </span>
                </div>
                <Progress
                  value={(balance.remaining / balance.total) * 100}
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
