import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { DatePicker } from "@/components/ui/date-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function EditEmployeePage({
  params,
}: {
  params: { id: string };
}) {
  // In a real application, you would fetch the employee data based on the ID
  const employee = {
    id: params.id,
    name: "John Smith",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@eschool.edu",
    phone: "+1 (555) 123-4567",
    department: "Administration",
    position: "Principal",
    role: "Administrator",
    status: "Active",
    joinDate: "2020-08-15",
    address: "123 School Street, Education City, EC 12345",
    avatar: "/placeholder.svg?height=128&width=128",
    bio: "John Smith is an experienced educational administrator with over 15 years of experience in school management and leadership. He has a passion for creating positive learning environments and implementing innovative educational strategies.",
    employeeId: "EMP-001",
    emergencyContact: {
      name: "Jane Smith",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543",
    },
    bankDetails: {
      accountName: "John Smith",
      accountNumber: "****4567",
      bankName: "Education Credit Union",
    },
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/admin/employees/${params.id}/profile`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Edit Employee</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Employee
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-32 w-32">
              <AvatarImage
                src={employee.avatar || "/placeholder.svg"}
                alt={employee.name}
              />
              <AvatarFallback>
                {employee.firstName[0]}
                {employee.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" className="mt-4 w-full">
              Change Photo
            </Button>
            <Button variant="ghost" className="mt-2 w-full">
              Remove Photo
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6 md:col-span-3">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="employment">Employment</TabsTrigger>
              <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update the employee's personal details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input
                        id="first-name"
                        defaultValue={employee.firstName}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue={employee.lastName} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={employee.email}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue={employee.phone} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" defaultValue={employee.address} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" defaultValue={employee.bio} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                  <CardDescription>
                    Who to contact in case of emergency
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergency-name">Contact Name</Label>
                      <Input
                        id="emergency-name"
                        defaultValue={employee.emergencyContact.name}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergency-relationship">
                        Relationship
                      </Label>
                      <Input
                        id="emergency-relationship"
                        defaultValue={employee.emergencyContact.relationship}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency-phone">Contact Phone</Label>
                    <Input
                      id="emergency-phone"
                      defaultValue={employee.emergencyContact.phone}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="employment" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Employment Details</CardTitle>
                  <CardDescription>
                    Update job-related information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="employee-id">Employee ID</Label>
                      <Input
                        id="employee-id"
                        defaultValue={employee.employeeId}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="join-date">Join Date</Label>
                      <DatePicker defaultDate={new Date(employee.joinDate)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select defaultValue={employee.role.toLowerCase()}>
                        <SelectTrigger id="role">
                          <SelectValue />
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
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select defaultValue={employee.department.toLowerCase()}>
                        <SelectTrigger id="department">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="administration">
                            Administration
                          </SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="mathematics">
                            Mathematics
                          </SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="human-resources">
                            Human Resources
                          </SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input id="position" defaultValue={employee.position} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select defaultValue={employee.status.toLowerCase()}>
                        <SelectTrigger id="status">
                          <SelectValue />
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bank Details</CardTitle>
                  <CardDescription>Update payment information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bank-name">Bank Name</Label>
                      <Input
                        id="bank-name"
                        defaultValue={employee.bankDetails.bankName}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-name">Account Name</Label>
                      <Input
                        id="account-name"
                        defaultValue={employee.bankDetails.accountName}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account-number">Account Number</Label>
                    <Input
                      id="account-number"
                      defaultValue={employee.bankDetails.accountNumber}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="qualifications" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                  <CardDescription>
                    Add or update educational qualifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="degree-1">Degree/Certificate</Label>
                        <Input
                          id="degree-1"
                          defaultValue="Ph.D. in Educational Leadership"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="institution-1">Institution</Label>
                        <Input
                          id="institution-1"
                          defaultValue="University of Education"
                        />
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="year-1">Year</Label>
                        <Input id="year-1" defaultValue="2010" />
                      </div>
                      <div className="flex items-end">
                        <Button variant="outline" className="w-full">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">Add Education</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                  <CardDescription>
                    Add or update professional certifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-md border p-4">
                      <Input
                        defaultValue="Advanced Educational Leadership Certification"
                        className="w-3/4"
                      />
                      <Button variant="outline" size="sm">
                        Remove
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md border p-4">
                      <Input
                        defaultValue="School Management and Administration License"
                        className="w-3/4"
                      />
                      <Button variant="outline" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline">Add Certification</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription>
                    Add or update professional skills
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm">
                        Educational Leadership
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-1 h-4 w-4 rounded-full p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                      <div className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm">
                        Curriculum Development
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-1 h-4 w-4 rounded-full p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                      <div className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm">
                        Staff Management
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-1 h-4 w-4 rounded-full p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                      <div className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm">
                        Budget Planning
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-1 h-4 w-4 rounded-full p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Add a new skill" />
                    <Button>Add</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage account and security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Change Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="New password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <Button>Update Password</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Access</CardTitle>
                  <CardDescription>
                    Manage system permissions and access
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="access-dashboard" defaultChecked />
                      <Label htmlFor="access-dashboard">Dashboard Access</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="access-students" defaultChecked />
                      <Label htmlFor="access-students">Student Records</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="access-finance" defaultChecked />
                      <Label htmlFor="access-finance">Financial Records</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="access-hr" defaultChecked />
                      <Label htmlFor="access-hr">HR Records</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="access-reports" defaultChecked />
                      <Label htmlFor="access-reports">Reports</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="access-settings" defaultChecked />
                      <Label htmlFor="access-settings">System Settings</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Danger Zone</CardTitle>
                  <CardDescription>Irreversible actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md border border-red-200 bg-red-50 p-4">
                    <h3 className="font-medium text-red-800">
                      Delete Employee Account
                    </h3>
                    <p className="mt-1 text-sm text-red-700">
                      This action cannot be undone. All data associated with
                      this employee will be permanently removed.
                    </p>
                    <Button variant="destructive" className="mt-4">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
