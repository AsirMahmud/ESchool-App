import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  UserPlus,
  Search,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Student Admissions",
  description: "Manage student admission applications",
};

export default function StudentAdmissionsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Student Admissions
        </h1>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                New Application
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>New Student Application</DialogTitle>
                <DialogDescription>
                  Enter the student details to create a new admission
                  application.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter last name" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="grade">Applying for Grade</Label>
                    <Select>
                      <SelectTrigger id="grade">
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">Grade 6</SelectItem>
                        <SelectItem value="7">Grade 7</SelectItem>
                        <SelectItem value="8">Grade 8</SelectItem>
                        <SelectItem value="9">Grade 9</SelectItem>
                        <SelectItem value="10">Grade 10</SelectItem>
                        <SelectItem value="11">Grade 11</SelectItem>
                        <SelectItem value="12">Grade 12</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="academicYear">Academic Year</Label>
                    <Select>
                      <SelectTrigger id="academicYear">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2025-2026">2025-2026</SelectItem>
                        <SelectItem value="2026-2027">2026-2027</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentName">Parent/Guardian Name</Label>
                  <Input
                    id="parentName"
                    placeholder="Enter parent/guardian name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="previousSchool">
                    Previous School (if any)
                  </Label>
                  <Input
                    id="previousSchool"
                    placeholder="Enter previous school name"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Submit Application</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

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
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Applications</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="document">Document Verification</SelectItem>
            <SelectItem value="interview">Interview Scheduled</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="waitlisted">Waitlisted</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Grades</SelectItem>
            <SelectItem value="6">Grade 6</SelectItem>
            <SelectItem value="7">Grade 7</SelectItem>
            <SelectItem value="8">Grade 8</SelectItem>
            <SelectItem value="9">Grade 9</SelectItem>
            <SelectItem value="10">Grade 10</SelectItem>
            <SelectItem value="11">Grade 11</SelectItem>
            <SelectItem value="12">Grade 12</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Application Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: "APP-2025-001",
                      name: "Aisha Rahman",
                      grade: "Grade 9",
                      date: "Mar 28, 2025",
                      status: "Pending",
                      statusIcon: <Clock className="h-4 w-4 text-yellow-500" />,
                    },
                    {
                      id: "APP-2025-002",
                      name: "John Smith",
                      grade: "Grade 7",
                      date: "Mar 27, 2025",
                      status: "Document Verification",
                      statusIcon: (
                        <FileText className="h-4 w-4 text-blue-500" />
                      ),
                    },
                    {
                      id: "APP-2025-003",
                      name: "Maria Garcia",
                      grade: "Grade 10",
                      date: "Mar 26, 2025",
                      status: "Interview Scheduled",
                      statusIcon: <Clock className="h-4 w-4 text-blue-500" />,
                    },
                    {
                      id: "APP-2025-004",
                      name: "David Lee",
                      grade: "Grade 8",
                      date: "Mar 25, 2025",
                      status: "Approved",
                      statusIcon: (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ),
                    },
                    {
                      id: "APP-2025-005",
                      name: "Sophia Chen",
                      grade: "Grade 6",
                      date: "Mar 24, 2025",
                      status: "Waitlisted",
                      statusIcon: <Clock className="h-4 w-4 text-orange-500" />,
                    },
                    {
                      id: "APP-2025-006",
                      name: "Mohammed Al-Farsi",
                      grade: "Grade 11",
                      date: "Mar 23, 2025",
                      status: "Rejected",
                      statusIcon: <XCircle className="h-4 w-4 text-red-500" />,
                    },
                    {
                      id: "APP-2025-007",
                      name: "Emma Thompson",
                      grade: "Grade 10",
                      date: "Mar 22, 2025",
                      status: "Approved",
                      statusIcon: (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ),
                    },
                  ].map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">
                        {application.id}
                      </TableCell>
                      <TableCell>{application.name}</TableCell>
                      <TableCell>{application.grade}</TableCell>
                      <TableCell>{application.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {application.statusIcon}
                          <span
                            className={`${
                              application.status === "Approved"
                                ? "text-green-600 dark:text-green-400"
                                : application.status === "Rejected"
                                ? "text-red-600 dark:text-red-400"
                                : application.status === "Pending" ||
                                  application.status === "Waitlisted"
                                ? "text-yellow-600 dark:text-yellow-400"
                                : "text-blue-600 dark:text-blue-400"
                            }`}
                          >
                            {application.status}
                          </span>
                        </div>
                      </TableCell>
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

        {/* Other tab contents would be similar to the "all" tab but filtered by status */}
        <TabsContent value="pending" className="space-y-4">
          {/* Similar table with only pending applications */}
        </TabsContent>
        <TabsContent value="processing" className="space-y-4">
          {/* Similar table with only processing applications */}
        </TabsContent>
        <TabsContent value="approved" className="space-y-4">
          {/* Similar table with only approved applications */}
        </TabsContent>
        <TabsContent value="rejected" className="space-y-4">
          {/* Similar table with only rejected applications */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
 