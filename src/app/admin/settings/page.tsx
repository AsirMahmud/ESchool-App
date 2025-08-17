import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Database,
  Download,
  FileText,
  School,
  Settings,
  Upload,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Admin Settings</h2>
        <p className="text-muted-foreground">
          Configure system-wide settings and preferences
        </p>
      </div>

      <Tabs defaultValue="school" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto">
          <TabsTrigger value="school">
            <School className="mr-2 h-4 w-4" />
            School Profile
          </TabsTrigger>
          <TabsTrigger value="academic">
            <Calendar className="mr-2 h-4 w-4" />
            Academic
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="financial">
            <FileText className="mr-2 h-4 w-4" />
            Financial
          </TabsTrigger>
          <TabsTrigger value="system">
            <Settings className="mr-2 h-4 w-4" />
            System
          </TabsTrigger>
        </TabsList>

        {/* School Profile Settings */}
        <TabsContent value="school" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>School Information</CardTitle>
              <CardDescription>
                Update your school's basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="school-name">School Name</Label>
                  <Input id="school-name" defaultValue="Evergreen Academy" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school-tagline">Tagline/Motto</Label>
                  <Input
                    id="school-tagline"
                    defaultValue="Excellence in Education"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="established">Established Year</Label>
                    <Input id="established" defaultValue="1985" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="school-code">School Code</Label>
                    <Input id="school-code" defaultValue="EVG-12345" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school-description">Brief Description</Label>
                  <Textarea
                    id="school-description"
                    rows={3}
                    defaultValue="Evergreen Academy is a premier educational institution dedicated to fostering academic excellence and character development in a supportive learning environment."
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Update your school's contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" defaultValue="info@evergreenacademy.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="(555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fax">Fax Number</Label>
                  <Input id="fax" defaultValue="(555) 123-4568" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    defaultValue="https://www.evergreenacademy.edu"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Education Lane" />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="Learnville" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" defaultValue="CA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP/Postal Code</Label>
                  <Input id="zip" defaultValue="90210" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select defaultValue="us">
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="in">India</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>School Branding</CardTitle>
              <CardDescription>
                Customize your school's visual identity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>School Logo</Label>
                  <div className="flex flex-col items-center justify-center rounded-md border-2 border-dashed border-muted p-6">
                    <div className="mb-4 h-24 w-24 overflow-hidden rounded-md bg-muted">
                      <img
                        src="/placeholder.svg?height=96&width=96"
                        alt="School logo"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Logo
                    </Button>
                    <p className="mt-2 text-xs text-muted-foreground">
                      PNG, JPG or SVG (max. 2MB)
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>School Favicon</Label>
                  <div className="flex flex-col items-center justify-center rounded-md border-2 border-dashed border-muted p-6">
                    <div className="mb-4 h-12 w-12 overflow-hidden rounded-md bg-muted">
                      <img
                        src="/placeholder.svg?height=48&width=48"
                        alt="School favicon"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Favicon
                    </Button>
                    <p className="mt-2 text-xs text-muted-foreground">
                      ICO, PNG (max. 1MB)
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>School Colors</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-md bg-primary"></div>
                      <Input id="primary-color" defaultValue="#0f172a" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-md bg-[#4f46e5]"></div>
                      <Input id="secondary-color" defaultValue="#4f46e5" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Academic Settings */}
        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Year Configuration</CardTitle>
              <CardDescription>
                Configure your school's academic calendar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="current-year">Current Academic Year</Label>
                  <Select defaultValue="2023-2024">
                    <SelectTrigger id="current-year">
                      <SelectValue placeholder="Select academic year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2022-2023">2022-2023</SelectItem>
                      <SelectItem value="2023-2024">2023-2024</SelectItem>
                      <SelectItem value="2024-2025">2024-2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year-format">Academic Year Format</Label>
                  <Select defaultValue="aug-may">
                    <SelectTrigger id="year-format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jan-dec">
                        January - December
                      </SelectItem>
                      <SelectItem value="aug-may">August - May</SelectItem>
                      <SelectItem value="sep-jun">September - June</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start-date">Academic Year Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    defaultValue="2023-08-15"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">Academic Year End Date</Label>
                  <Input id="end-date" type="date" defaultValue="2024-05-31" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Semesters/Terms</Label>
                <div className="space-y-2">
                  {[
                    {
                      name: "Fall Semester",
                      start: "2023-08-15",
                      end: "2023-12-20",
                    },
                    {
                      name: "Spring Semester",
                      start: "2024-01-10",
                      end: "2024-05-31",
                    },
                  ].map((term, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-md border p-3"
                    >
                      <div>
                        <p className="font-medium">{term.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {term.start} to {term.end}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  <span className="mr-1">+</span> Add Term
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Grading System</CardTitle>
              <CardDescription>
                Configure your school's grading scales and policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="grading-scale">Default Grading Scale</Label>
                <Select defaultValue="letter">
                  <SelectTrigger id="grading-scale">
                    <SelectValue placeholder="Select grading scale" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="letter">
                      Letter Grade (A, B, C, D, F)
                    </SelectItem>
                    <SelectItem value="percentage">
                      Percentage (0-100%)
                    </SelectItem>
                    <SelectItem value="gpa">GPA (0.0-4.0)</SelectItem>
                    <SelectItem value="custom">Custom Scale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Grade Mappings</Label>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left">Grade</th>
                        <th className="p-2 text-left">Percentage Range</th>
                        <th className="p-2 text-left">GPA Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { grade: "A", range: "90-100%", gpa: "4.0" },
                        { grade: "B", range: "80-89%", gpa: "3.0" },
                        { grade: "C", range: "70-79%", gpa: "2.0" },
                        { grade: "D", range: "60-69%", gpa: "1.0" },
                        { grade: "F", range: "0-59%", gpa: "0.0" },
                      ].map((item, index) => (
                        <tr
                          key={index}
                          className={index !== 4 ? "border-b" : ""}
                        >
                          <td className="p-2">{item.grade}</td>
                          <td className="p-2">{item.range}</td>
                          <td className="p-2">{item.gpa}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  Customize Grade Scale
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Passing Grade</Label>
                <RadioGroup defaultValue="d" className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="d" id="pass-d" />
                    <Label htmlFor="pass-d">D (60%)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="c" id="pass-c" />
                    <Label htmlFor="pass-c">C (70%)</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attendance Policy</CardTitle>
              <CardDescription>
                Configure attendance tracking and policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="attendance-method">
                  Attendance Tracking Method
                </Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="attendance-method">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily (Once per day)</SelectItem>
                    <SelectItem value="period">
                      Period-wise (Each class)
                    </SelectItem>
                    <SelectItem value="hybrid">
                      Hybrid (Both options)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Attendance Statuses</Label>
                <div className="space-y-2">
                  {[
                    { status: "Present", code: "P", color: "bg-green-500" },
                    { status: "Absent", code: "A", color: "bg-red-500" },
                    { status: "Late", code: "L", color: "bg-yellow-500" },
                    { status: "Excused", code: "E", color: "bg-blue-500" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-md border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-4 w-4 rounded-full ${item.color}`}
                        ></div>
                        <div>
                          <p className="font-medium">{item.status}</p>
                          <p className="text-sm text-muted-foreground">
                            Code: {item.code}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  <span className="mr-1">+</span> Add Status
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-absent">Automatic Absent Marking</Label>
                  <Switch id="auto-absent" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Automatically mark students as absent if attendance is not
                  taken
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* User Management Settings */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Roles & Permissions</CardTitle>
              <CardDescription>
                Configure user roles and their permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>System Roles</Label>
                <div className="space-y-2">
                  {[
                    { role: "Super Admin", users: 2, editable: false },
                    { role: "Administrator", users: 5, editable: true },
                    { role: "Teacher", users: 48, editable: true },
                    { role: "Student", users: 850, editable: true },
                    { role: "Parent", users: 720, editable: true },
                    { role: "Staff", users: 15, editable: true },
                  ].map((role, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-md border p-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{role.role}</p>
                          {!role.editable && (
                            <Badge variant="outline" className="text-xs">
                              System
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {role.users} users assigned
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Permissions
                        </Button>
                        {role.editable && (
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  <span className="mr-1">+</span> Create New Role
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Registration</CardTitle>
              <CardDescription>
                Configure user registration settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="allow-registration">
                    Allow Public Registration
                  </Label>
                  <Switch id="allow-registration" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Allow users to register accounts through the public
                  registration page
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-verification">
                    Require Email Verification
                  </Label>
                  <Switch id="email-verification" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Users must verify their email address before accessing the
                  system
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="admin-approval">Require Admin Approval</Label>
                  <Switch id="admin-approval" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  New user accounts require administrator approval before
                  activation
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="default-role">Default User Role</Label>
                <Select defaultValue="student">
                  <SelectTrigger id="default-role">
                    <SelectValue placeholder="Select default role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="guest">Guest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password Policy</CardTitle>
              <CardDescription>
                Configure password requirements and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="min-length">Minimum Password Length</Label>
                <Select defaultValue="8">
                  <SelectTrigger id="min-length">
                    <SelectValue placeholder="Select minimum length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6 characters</SelectItem>
                    <SelectItem value="8">8 characters</SelectItem>
                    <SelectItem value="10">10 characters</SelectItem>
                    <SelectItem value="12">12 characters</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="require-uppercase">
                    Require Uppercase Letters
                  </Label>
                  <Switch id="require-uppercase" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="require-numbers">Require Numbers</Label>
                  <Switch id="require-numbers" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="require-symbols">
                    Require Special Characters
                  </Label>
                  <Switch id="require-symbols" defaultChecked />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-expiry">Password Expiration</Label>
                <Select defaultValue="90">
                  <SelectTrigger id="password-expiry">
                    <SelectValue placeholder="Select expiration period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="force-2fa">
                    Force Two-Factor Authentication
                  </Label>
                  <Switch id="force-2fa" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Require all users to set up two-factor authentication
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Financial Settings */}
        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fee Structure</CardTitle>
              <CardDescription>
                Configure fee categories and payment schedules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Fee Categories</Label>
                <div className="space-y-2">
                  {[
                    {
                      name: "Tuition Fee",
                      type: "Recurring",
                      frequency: "Monthly",
                    },
                    {
                      name: "Admission Fee",
                      type: "One-time",
                      frequency: "At admission",
                    },
                    {
                      name: "Examination Fee",
                      type: "Recurring",
                      frequency: "Semester",
                    },
                    {
                      name: "Library Fee",
                      type: "Recurring",
                      frequency: "Annual",
                    },
                    {
                      name: "Transportation Fee",
                      type: "Recurring",
                      frequency: "Monthly",
                    },
                  ].map((fee, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-md border p-3"
                    >
                      <div>
                        <p className="font-medium">{fee.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {fee.type} • {fee.frequency}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  <span className="mr-1">+</span> Add Fee Category
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="late-fee">Late Fee Policy</Label>
                <Select defaultValue="percentage">
                  <SelectTrigger id="late-fee">
                    <SelectValue placeholder="Select late fee type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Late Fee</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                    <SelectItem value="percentage">
                      Percentage of Due Amount
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="late-fee-amount">Late Fee Amount</Label>
                  <Input id="late-fee-amount" defaultValue="5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grace-period">Grace Period (Days)</Label>
                  <Input id="grace-period" type="number" defaultValue="5" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Configure accepted payment methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[
                  { method: "Cash", enabled: true },
                  { method: "Credit/Debit Card", enabled: true },
                  { method: "Bank Transfer", enabled: true },
                  { method: "PayPal", enabled: false },
                  { method: "Mobile Payment", enabled: false },
                ].map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <Label htmlFor={`payment-${index}`}>
                        {payment.method}
                      </Label>
                    </div>
                    <Switch
                      id={`payment-${index}`}
                      defaultChecked={payment.enabled}
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="default-payment">Default Payment Method</Label>
                <Select defaultValue="cash">
                  <SelectTrigger id="default-payment">
                    <SelectValue placeholder="Select default method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Invoice Settings</CardTitle>
              <CardDescription>
                Configure invoice generation and templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="invoice-prefix">Invoice Number Prefix</Label>
                <Input id="invoice-prefix" defaultValue="INV-" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoice-start">Starting Invoice Number</Label>
                <Input id="invoice-start" defaultValue="1001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoice-footer">Invoice Footer Text</Label>
                <Textarea
                  id="invoice-footer"
                  rows={2}
                  defaultValue="Thank you for your payment. For any queries, please contact the accounts department."
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-invoice">
                    Automatic Invoice Generation
                  </Label>
                  <Switch id="auto-invoice" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Automatically generate invoices for recurring fees
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-invoice">
                    Email Invoices Automatically
                  </Label>
                  <Switch id="email-invoice" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Automatically email invoices to parents/guardians
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Maintenance</CardTitle>
              <CardDescription>
                Configure system maintenance and backup settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Database Backup</Label>
                <div className="rounded-md border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Automatic Backups</h4>
                      <p className="text-sm text-muted-foreground">
                        Last backup: March 27, 2025, 02:15 AM
                      </p>
                    </div>
                    <Switch id="auto-backup" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="backup-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Database className="mr-2 h-4 w-4" />
                      Manual Backup
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download Latest
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>System Logs</Label>
                <div className="rounded-md border p-4">
                  <div className="mb-4">
                    <h4 className="font-medium">Log Retention</h4>
                    <p className="text-sm text-muted-foreground">
                      Configure how long system logs are kept
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="log-retention">Retention Period</Label>
                    <Select defaultValue="90">
                      <SelectTrigger id="log-retention">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" className="mt-4">
                    <Download className="mr-2 h-4 w-4" />
                    Download System Logs
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Localization</CardTitle>
              <CardDescription>
                Configure system language and regional settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-language">
                  Default System Language
                </Label>
                <Select defaultValue="en">
                  <SelectTrigger id="default-language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                    <SelectItem value="ar">Arabic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">System Time Zone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">
                      UTC (Coordinated Universal Time)
                    </SelectItem>
                    <SelectItem value="est">
                      Eastern Standard Time (EST)
                    </SelectItem>
                    <SelectItem value="cst">
                      Central Standard Time (CST)
                    </SelectItem>
                    <SelectItem value="mst">
                      Mountain Standard Time (MST)
                    </SelectItem>
                    <SelectItem value="pst">
                      Pacific Standard Time (PST)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="mdy">
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time-format">Time Format</Label>
                  <Select defaultValue="12h">
                    <SelectTrigger id="time-format">
                      <SelectValue placeholder="Select time format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                      <SelectItem value="24h">24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="allow-user-lang">
                    Allow User Language Selection
                  </Label>
                  <Switch id="allow-user-lang" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Allow users to select their preferred language
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>
                View system information and status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">System Details</h3>
                <div className="rounded-md border">
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Version</td>
                        <td className="p-2">E-School v3.5.2</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Last Updated</td>
                        <td className="p-2">March 15, 2025</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Database</td>
                        <td className="p-2">MySQL 8.0.32</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Server</td>
                        <td className="p-2">Node.js 20.10.0</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium">License</td>
                        <td className="p-2">
                          <Badge>Enterprise</Badge>
                          <span className="ml-2 text-sm text-muted-foreground">
                            Valid until Dec 31, 2025
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">System Health</h3>
                <div className="rounded-md border p-4">
                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Database Status
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <p className="font-medium">Healthy</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Storage Usage
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <p className="font-medium">75% (15GB/20GB)</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Memory Usage
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <p className="font-medium">45% (3.6GB/8GB)</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">CPU Usage</p>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <p className="font-medium">32%</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Detailed System Report
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Check for Updates</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
