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
  CheckCircle,
  Eye,
  Plus,
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
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";
import { useSalaries, useSalarySummary, useCreateSalary, useMarkSalaryPaid, formatSalaryAmount, getSalaryStatusColor } from "@/hooks/use-salaries";
import { useEmployees } from "@/hooks/use-employees";

export default function PayrollPage() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [paymentDate, setPaymentDate] = useState<Date>();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isAddSalaryOpen, setIsAddSalaryOpen] = useState(false);
  const [newSalary, setNewSalary] = useState({
    employee: "",
    month: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    pay_date: "",
    basic_salary: "",
    allowances: "0",
    deductions: "0",
    overtime_hours: "0",
    overtime_rate: "0",
    tax_deduction: "0",
    notes: "",
  });

  // API hooks
  const { data: salaries, isLoading } = useSalaries({
    search: searchTerm,
    status: statusFilter,
  });
  const { data: salarySummary } = useSalarySummary();
  const { data: employees } = useEmployees();
  const createSalary = useCreateSalary();
  const markPaid = useMarkSalaryPaid();

  const handleCreateSalary = async () => {
    try {
      await createSalary.mutateAsync(newSalary);
      setIsAddSalaryOpen(false);
      setNewSalary({
        employee: "",
        month: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        pay_date: "",
        basic_salary: "",
        allowances: "0",
        deductions: "0",
        overtime_hours: "0",
        overtime_rate: "0",
        tax_deduction: "0",
        notes: "",
      });
    } catch (error) {
      console.error("Failed to create salary:", error);
    }
  };

  const handleMarkPaid = async (salaryId: number) => {
    try {
      await markPaid.mutateAsync(salaryId);
    } catch (error) {
      console.error("Failed to mark salary as paid:", error);
    }
  };

  const filteredSalaries = salaries?.results || [];
  const pendingSalaries = filteredSalaries.filter(s => s.status === 'pending');
  const paidSalaries = filteredSalaries.filter(s => s.status === 'paid');
  const overdueSalaries = filteredSalaries.filter(s => s.is_overdue);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Employee Salary Management
          </h1>
          <p className="text-muted-foreground">
            Manage employee salaries and payment processing
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddSalaryOpen} onOpenChange={setIsAddSalaryOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Salary
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add Employee Salary</DialogTitle>
                <DialogDescription>
                  Create a salary record for an employee.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="employee">Employee</Label>
                  <Select value={newSalary.employee} onValueChange={(value) => setNewSalary({...newSalary, employee: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees?.results?.map((employee) => (
                        <SelectItem key={employee.emp_id} value={employee.emp_id}>
                          {employee.name} - {employee.position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="month">Month</Label>
                    <Input
                      id="month"
                      placeholder="January 2025"
                      value={newSalary.month}
                      onChange={(e) => setNewSalary({...newSalary, month: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pay_date">Payment Date</Label>
                    <Input
                      id="pay_date"
                      type="date"
                      value={newSalary.pay_date}
                      onChange={(e) => setNewSalary({...newSalary, pay_date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="basic_salary">Basic Salary</Label>
                    <Input
                      id="basic_salary"
                      type="number"
                      placeholder="0.00"
                      value={newSalary.basic_salary}
                      onChange={(e) => setNewSalary({...newSalary, basic_salary: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allowances">Allowances</Label>
                    <Input
                      id="allowances"
                      type="number"
                      placeholder="0.00"
                      value={newSalary.allowances}
                      onChange={(e) => setNewSalary({...newSalary, allowances: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="deductions">Deductions</Label>
                    <Input
                      id="deductions"
                      type="number"
                      placeholder="0.00"
                      value={newSalary.deductions}
                      onChange={(e) => setNewSalary({...newSalary, deductions: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax_deduction">Tax Deduction</Label>
                    <Input
                      id="tax_deduction"
                      type="number"
                      placeholder="0.00"
                      value={newSalary.tax_deduction}
                      onChange={(e) => setNewSalary({...newSalary, tax_deduction: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="overtime_hours">Overtime Hours</Label>
                    <Input
                      id="overtime_hours"
                      type="number"
                      placeholder="0"
                      value={newSalary.overtime_hours}
                      onChange={(e) => setNewSalary({...newSalary, overtime_hours: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="overtime_rate">Overtime Rate</Label>
                    <Input
                      id="overtime_rate"
                      type="number"
                      placeholder="0.00"
                      value={newSalary.overtime_rate}
                      onChange={(e) => setNewSalary({...newSalary, overtime_rate: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional notes..."
                    value={newSalary.notes}
                    onChange={(e) => setNewSalary({...newSalary, notes: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCreateSalary} disabled={createSalary.isPending}>
                  {createSalary.isPending ? "Creating..." : "Create Salary"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      {salarySummary && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Salaries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{salarySummary.total_salaries}</div>
              <p className="text-xs text-muted-foreground">
                ${salarySummary.total_amount?.toLocaleString() || 0}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${salarySummary.paid_amount?.toLocaleString() || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                ${salarySummary.pending_amount?.toLocaleString() || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {salarySummary.overdue_count || 0}
              </div>
              <p className="text-xs text-muted-foreground">salaries</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search employees..."
              className="w-full pl-8 sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all-salaries" className="w-full">
        <TabsList>
          <TabsTrigger value="all-salaries">All Salaries ({filteredSalaries.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingSalaries.length})</TabsTrigger>
          <TabsTrigger value="paid">Paid ({paidSalaries.length})</TabsTrigger>
          <TabsTrigger value="overdue">Overdue ({overdueSalaries.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-salaries" className="border-none p-0 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Salary Records</CardTitle>
              <CardDescription>
                Manage and track all employee salary records
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Loading salaries...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Employee</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Month</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Pay Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSalaries.map((salary) => (
                      <TableRow key={salary.sal_id}>
                        <TableCell className="font-medium">SAL-{salary.sal_id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{salary.employee_name}</div>
                            <div className="text-sm text-muted-foreground">{salary.department_name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{salary.employee_position}</TableCell>
                        <TableCell>{salary.month}</TableCell>
                        <TableCell>{formatSalaryAmount(salary.amount)}</TableCell>
                        <TableCell>{new Date(salary.pay_date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge className={getSalaryStatusColor(salary.status)}>
                            {salary.status.charAt(0).toUpperCase() + salary.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1 justify-end">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {salary.status === 'pending' && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleMarkPaid(salary.sal_id)}
                                disabled={markPaid.isPending}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="border-none p-0 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Salaries</CardTitle>
              <CardDescription>Salaries awaiting payment</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Month</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Pay Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingSalaries.map((salary) => (
                    <TableRow key={salary.sal_id}>
                      <TableCell>{salary.employee_name}</TableCell>
                      <TableCell>{salary.month}</TableCell>
                      <TableCell>{formatSalaryAmount(salary.amount)}</TableCell>
                      <TableCell>{new Date(salary.pay_date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleMarkPaid(salary.sal_id)}
                          disabled={markPaid.isPending}
                        >
                          Mark Paid
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paid" className="border-none p-0 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Paid Salaries</CardTitle>
              <CardDescription>Completed salary payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Month</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Paid Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paidSalaries.map((salary) => (
                    <TableRow key={salary.sal_id}>
                      <TableCell>{salary.employee_name}</TableCell>
                      <TableCell>{salary.month}</TableCell>
                      <TableCell>{formatSalaryAmount(salary.amount)}</TableCell>
                      <TableCell>{salary.paid_date ? new Date(salary.paid_date).toLocaleDateString() : 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue" className="border-none p-0 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Overdue Salaries</CardTitle>
              <CardDescription>Salaries past their payment date</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Month</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Pay Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {overdueSalaries.map((salary) => (
                    <TableRow key={salary.sal_id}>
                      <TableCell>{salary.employee_name}</TableCell>
                      <TableCell>{salary.month}</TableCell>
                      <TableCell>{formatSalaryAmount(salary.amount)}</TableCell>
                      <TableCell className="text-red-600">{new Date(salary.pay_date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleMarkPaid(salary.sal_id)}
                          disabled={markPaid.isPending}
                        >
                          Mark Paid
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
