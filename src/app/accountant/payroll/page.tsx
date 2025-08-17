"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarIcon,
  Download,
  FileSpreadsheet,
  Filter,
  Printer,
  Search,
  UserPlus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";

export default function PayrollPage() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [paymentDate, setPaymentDate] = useState<Date>();
  const [employeeStartDate, setEmployeeStartDate] = useState<Date>();

  // Sample data for demonstration
  const payrollSummary = {
    totalSalary: "$124,500.00",
    paidAmount: "$98,750.00",
    pendingAmount: "$25,750.00",
    totalEmployees: 45,
  };

  const employees = [
    {
      id: 1,
      name: "John Smith",
      position: "Senior Math Teacher",
      department: "Mathematics",
      salary: "$4,500.00",
      status: "Paid",
      paymentDate: "Mar 25, 2025",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "English Teacher",
      department: "Languages",
      salary: "$3,800.00",
      status: "Paid",
      paymentDate: "Mar 25, 2025",
    },
    {
      id: 3,
      name: "Michael Brown",
      position: "Physics Teacher",
      department: "Science",
      salary: "$4,200.00",
      status: "Pending",
      paymentDate: "N/A",
    },
    {
      id: 4,
      name: "Emily Davis",
      position: "History Teacher",
      department: "Humanities",
      salary: "$3,900.00",
      status: "Paid",
      paymentDate: "Mar 25, 2025",
    },
    {
      id: 5,
      name: "Robert Wilson",
      position: "PE Teacher",
      department: "Physical Education",
      salary: "$3,600.00",
      status: "Pending",
      paymentDate: "N/A",
    },
    {
      id: 6,
      name: "Jennifer Lee",
      position: "Chemistry Teacher",
      department: "Science",
      salary: "$4,100.00",
      status: "Paid",
      paymentDate: "Mar 25, 2025",
    },
    {
      id: 7,
      name: "David Martinez",
      position: "Art Teacher",
      department: "Arts",
      salary: "$3,500.00",
      status: "Paid",
      paymentDate: "Mar 25, 2025",
    },
    {
      id: 8,
      name: "Lisa Anderson",
      position: "Biology Teacher",
      department: "Science",
      salary: "$4,000.00",
      status: "Pending",
      paymentDate: "N/A",
    },
  ];

  const recentPayments = [
    {
      id: 1,
      name: "March 2025 Payroll",
      date: "Mar 25, 2025",
      amount: "$98,750.00",
      employees: 42,
    },
    {
      id: 2,
      name: "February 2025 Payroll",
      date: "Feb 25, 2025",
      amount: "$97,500.00",
      employees: 41,
    },
    {
      id: 3,
      name: "January 2025 Payroll",
      date: "Jan 25, 2025",
      amount: "$96,800.00",
      employees: 40,
    },
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Payroll Management
          </h1>
          <p className="text-muted-foreground">
            Manage employee salaries and payment processing
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>
                  Enter the employee details to add them to the payroll system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="First Name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Last Name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" placeholder="Position" />
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
                        <SelectItem value="languages">Languages</SelectItem>
                        <SelectItem value="humanities">Humanities</SelectItem>
                        <SelectItem value="arts">Arts</SelectItem>
                        <SelectItem value="physical-education">
                          Physical Education
                        </SelectItem>
                        <SelectItem value="administration">
                          Administration
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary">Base Salary</Label>
                    <Input id="salary" placeholder="0.00" type="number" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <DatePicker
                    selected={employeeStartDate}
                    onSelect={setEmployeeStartDate}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Employee</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Run Payroll</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Run Payroll</DialogTitle>
                <DialogDescription>
                  Process payments for the current pay period.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="payrollName">Payroll Name</Label>
                  <Input id="payrollName" defaultValue="April 2025 Payroll" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="payPeriodStart">Pay Period Start</Label>
                    <DatePicker selected={startDate} onSelect={setStartDate} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payPeriodEnd">Pay Period End</Label>
                    <DatePicker selected={endDate} onSelect={setEndDate} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentDate">Payment Date</Label>
                  <DatePicker
                    selected={paymentDate}
                    onSelect={setPaymentDate}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="allEmployees" />
                  <Label htmlFor="allEmployees">
                    Process for all eligible employees
                  </Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Process Payroll</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Salary</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {payrollSummary.totalSalary}
            </div>
            <p className="text-xs text-muted-foreground">
              Monthly salary budget
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {payrollSummary.paidAmount}
            </div>
            <p className="text-xs text-muted-foreground">Current month paid</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Amount
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {payrollSummary.pendingAmount}
            </div>
            <p className="text-xs text-muted-foreground">
              Remaining to be paid
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {payrollSummary.totalEmployees}
            </div>
            <p className="text-xs text-muted-foreground">Active on payroll</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="employees" className="space-y-4">
        <TabsList>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="employees" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search employees..."
                  className="w-[250px] pl-8"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
            </div>
          </div>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="selectAll" />
                      <Label
                        htmlFor="selectAll"
                        className="text-xs font-normal"
                      >
                        Employee
                      </Label>
                    </div>
                  </th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                    Position
                  </th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                    Department
                  </th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                    Salary
                  </th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                    Payment Date
                  </th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id} className="border-b">
                    <td className="p-4 align-middle">
                      <div className="flex items-center space-x-2">
                        <Checkbox id={`select-${employee.id}`} />
                        <Label
                          htmlFor={`select-${employee.id}`}
                          className="font-medium"
                        >
                          {employee.name}
                        </Label>
                      </div>
                    </td>
                    <td className="p-4 align-middle">{employee.position}</td>
                    <td className="p-4 align-middle">{employee.department}</td>
                    <td className="p-4 align-middle">{employee.salary}</td>
                    <td className="p-4 align-middle">
                      <Badge
                        variant={
                          employee.status === "Paid" ? "success" : "outline"
                        }
                      >
                        {employee.status}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">{employee.paymentDate}</td>
                    <td className="p-4 align-middle">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="payments" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search payments..."
                  className="w-[250px] pl-8"
                />
              </div>
              <Button variant="outline" size="sm">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Date Range
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export to Excel
              </Button>
            </div>
          </div>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                    Payment Name
                  </th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                    Amount
                  </th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                    Employees
                  </th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="p-4 align-middle font-medium">
                      {payment.name}
                    </td>
                    <td className="p-4 align-middle">{payment.date}</td>
                    <td className="p-4 align-middle">{payment.amount}</td>
                    <td className="p-4 align-middle">{payment.employees}</td>
                    <td className="p-4 align-middle">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Salary Report</CardTitle>
                <CardDescription>
                  Detailed breakdown of salary payments by department
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <div className="flex space-x-2">
                    <DatePicker />
                    <DatePicker />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="languages">Languages</SelectItem>
                      <SelectItem value="humanities">Humanities</SelectItem>
                      <SelectItem value="arts">Arts</SelectItem>
                      <SelectItem value="physical-education">
                        Physical Education
                      </SelectItem>
                      <SelectItem value="administration">
                        Administration
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Generate Report</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tax Report</CardTitle>
                <CardDescription>
                  Tax deductions and contributions summary
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tax Year</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="2025" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Report Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Annual Summary" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annual">Annual Summary</SelectItem>
                      <SelectItem value="quarterly">
                        Quarterly Report
                      </SelectItem>
                      <SelectItem value="monthly">Monthly Breakdown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Generate Report</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payroll Analysis</CardTitle>
                <CardDescription>
                  Trends and analytics for payroll expenses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Time Period</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Last 12 Months" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12months">Last 12 Months</SelectItem>
                      <SelectItem value="6months">Last 6 Months</SelectItem>
                      <SelectItem value="3months">Last 3 Months</SelectItem>
                      <SelectItem value="1month">Last Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Chart Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Line Chart" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="pie">Pie Chart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Generate Analysis</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
