"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen, Save, Shield, Users, Wallet } from "lucide-react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

export default function EmployeePermissionsPage({
  params,
}: {
  params: { id: string };
}) {
  // In a real application, you would fetch the employee data based on the ID
  const employee = {
    id: params.id,
    name: "John Smith",
    email: "john.smith@eschool.edu",
    role: "Administrator",
    department: "Administration",
    position: "Principal",
    avatar: "/placeholder.svg?height=40&width=40",
  };

  const handleSaveChanges = () => {
    // In a real application, you would save the permissions to the database
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
          <h1 className="text-2xl font-bold">Manage Permissions</h1>
        </div>
        <Button onClick={handleSaveChanges}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={employee.avatar || "/placeholder.svg"}
                alt={employee.name}
              />
              <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-medium">{employee.name}</h2>
              <p className="text-sm text-muted-foreground">{employee.email}</p>
            </div>
            <Badge
              variant="outline"
              className="ml-auto bg-purple-100 text-purple-800 border-purple-200"
            >
              {employee.role}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="modules" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="modules">Module Access</TabsTrigger>
          <TabsTrigger value="actions">Action Permissions</TabsTrigger>
          <TabsTrigger value="data">Data Access</TabsTrigger>
        </TabsList>
        <TabsContent value="modules" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Module Access</CardTitle>
              <CardDescription>
                Control which modules this employee can access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">Administration</h3>
                      <p className="text-sm text-muted-foreground">
                        Access to administrative functions
                      </p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="mt-4 ml-7 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="admin-dashboard" defaultChecked />
                    <Label htmlFor="admin-dashboard">Dashboard</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="admin-users" defaultChecked />
                    <Label htmlFor="admin-users">User Management</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="admin-roles" defaultChecked />
                    <Label htmlFor="admin-roles">Role Management</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="admin-settings" defaultChecked />
                    <Label htmlFor="admin-settings">System Settings</Label>
                  </div>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">HR Management</h3>
                      <p className="text-sm text-muted-foreground">
                        Access to HR functions
                      </p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="mt-4 ml-7 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hr-dashboard" defaultChecked />
                    <Label htmlFor="hr-dashboard">Dashboard</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hr-employees" defaultChecked />
                    <Label htmlFor="hr-employees">Employee Management</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hr-departments" defaultChecked />
                    <Label htmlFor="hr-departments">
                      Department Management
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hr-leave" defaultChecked />
                    <Label htmlFor="hr-leave">Leave Management</Label>
                  </div>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">Academic Management</h3>
                      <p className="text-sm text-muted-foreground">
                        Access to academic functions
                      </p>
                    </div>
                  </div>
                  <Switch />
                </div>
                <div className="mt-4 ml-7 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="academic-classes" />
                    <Label htmlFor="academic-classes">Class Management</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="academic-subjects" />
                    <Label htmlFor="academic-subjects">
                      Subject Management
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="academic-exams" />
                    <Label htmlFor="academic-exams">Exam Management</Label>
                  </div>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">Financial Management</h3>
                      <p className="text-sm text-muted-foreground">
                        Access to financial functions
                      </p>
                    </div>
                  </div>
                  <Switch />
                </div>
                <div className="mt-4 ml-7 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="finance-fees" />
                    <Label htmlFor="finance-fees">Fee Management</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="finance-expenses" />
                    <Label htmlFor="finance-expenses">Expense Management</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="finance-payroll" />
                    <Label htmlFor="finance-payroll">Payroll</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="finance-reports" />
                    <Label htmlFor="finance-reports">Financial Reports</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Action Permissions</CardTitle>
              <CardDescription>
                Control what actions this employee can perform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">User Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="action-create-user" defaultChecked />
                    <Label htmlFor="action-create-user">Create Users</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="action-edit-user" defaultChecked />
                    <Label htmlFor="action-edit-user">Edit Users</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="action-delete-user" />
                    <Label htmlFor="action-delete-user">Delete Users</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="action-reset-password" defaultChecked />
                    <Label htmlFor="action-reset-password">
                      Reset User Passwords
                    </Label>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Employee Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="action-create-employee" defaultChecked />
                    <Label htmlFor="action-create-employee">
                      Create Employees
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="action-edit-employee" defaultChecked />
                    <Label htmlFor="action-edit-employee">Edit Employees</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="action-delete-employee" />
                    <Label htmlFor="action-delete-employee">
                      Delete Employees
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="action-manage-permissions" defaultChecked />
                    <Label htmlFor="action-manage-permissions">
                      Manage Permissions
                    </Label>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Financial Operations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="action-approve-expenses" />
                    <Label htmlFor="action-approve-expenses">
                      Approve Expenses
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="action-process-payroll" />
                    <Label htmlFor="action-process-payroll">
                      Process Payroll
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="action-manage-fees" />
                    <Label htmlFor="action-manage-fees">
                      Manage Fee Structure
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="action-generate-reports" />
                    <Label htmlFor="action-generate-reports">
                      Generate Financial Reports
                    </Label>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Academic Operations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="action-create-class" />
                    <Label htmlFor="action-create-class">Create Classes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="action-assign-teachers" />
                    <Label htmlFor="action-assign-teachers">
                      Assign Teachers
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="action-manage-exams" />
                    <Label htmlFor="action-manage-exams">Manage Exams</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="action-publish-results" />
                    <Label htmlFor="action-publish-results">
                      Publish Results
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Access</CardTitle>
              <CardDescription>
                Control what data this employee can access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Student Data</h3>
                <RadioGroup defaultValue="department">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="data-students-all" />
                    <Label htmlFor="data-students-all">All Students</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="department"
                      id="data-students-department"
                    />
                    <Label htmlFor="data-students-department">
                      Department Students Only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="assigned"
                      id="data-students-assigned"
                    />
                    <Label htmlFor="data-students-assigned">
                      Assigned Students Only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="data-students-none" />
                    <Label htmlFor="data-students-none">No Access</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Employee Data</h3>
                <RadioGroup defaultValue="department">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="data-employees-all" />
                    <Label htmlFor="data-employees-all">All Employees</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="department"
                      id="data-employees-department"
                    />
                    <Label htmlFor="data-employees-department">
                      Department Employees Only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="self" id="data-employees-self" />
                    <Label htmlFor="data-employees-self">Self Only</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Financial Data</h3>
                <RadioGroup defaultValue="none">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="data-financial-all" />
                    <Label htmlFor="data-financial-all">
                      All Financial Data
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="department"
                      id="data-financial-department"
                    />
                    <Label htmlFor="data-financial-department">
                      Department Financial Data Only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="summary"
                      id="data-financial-summary"
                    />
                    <Label htmlFor="data-financial-summary">
                      Summary Reports Only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="data-financial-none" />
                    <Label htmlFor="data-financial-none">No Access</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Academic Data</h3>
                <RadioGroup defaultValue="assigned">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="data-academic-all" />
                    <Label htmlFor="data-academic-all">All Academic Data</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="department"
                      id="data-academic-department"
                    />
                    <Label htmlFor="data-academic-department">
                      Department Academic Data Only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="assigned"
                      id="data-academic-assigned"
                    />
                    <Label htmlFor="data-academic-assigned">
                      Assigned Classes Only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="data-academic-none" />
                    <Label htmlFor="data-academic-none">No Access</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveChanges}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
