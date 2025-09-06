"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MonthYearPicker } from "@/components/ui/month-year-picker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Receipt,
  CreditCard,
  Wallet,
  PiggyBank,
  Calculator,
  FileText,
  Download,
  Filter,
  Search,
  Calendar,
  Users,
  GraduationCap,
  Building2,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import {
  useFinancialOverview,
  useMonthlyTrend,
  useCategoryBreakdown,
  useFinancialTransactions,
  useRecordStudentPayment,
  useRecordSalaryPayment,
  useCreateFinancialTransaction,
  formatCurrency,
} from "@/hooks/use-financial-ecosystem";
import { api } from "@/lib/api";
import { useStudents } from "@/hooks/use-students";
import { useEmployees } from "@/hooks/use-employees";
import { toast } from "sonner";

export default function FinancialEcosystemPage() {
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isSalaryDialogOpen, setIsSalaryDialogOpen] = useState(false);
  const [isRevenueDialogOpen, setIsRevenueDialogOpen] = useState(false);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // API hooks
  const { data: financialOverview, isLoading: overviewLoading } = useFinancialOverview();
  const { data: monthlyTrend, isLoading: trendLoading } = useMonthlyTrend();
  const { data: expenseBreakdown, isLoading: breakdownLoading } = useCategoryBreakdown({ type: 'expense' });
  const { data: transactions, isLoading: transactionsLoading } = useFinancialTransactions();
  const { data: students } = useStudents();
  const { data: employees } = useEmployees();

  // Mutations
  const recordStudentPayment = useRecordStudentPayment();
  const recordSalaryPayment = useRecordSalaryPayment();
  const createTransaction = useCreateFinancialTransaction();

  const [paymentForm, setPaymentForm] = useState({
    student: "",
    parent: "",
    amount: "",
    paymentType: "tuition",
    method: "cash",
    description: "",
    academic_year: new Date().getFullYear().toString(),
  });

  const [salaryForm, setSalaryForm] = useState({
    employee: "",
    amount: "",
    month: "",
    type: "monthly",
    description: "",
  });

  const [revenueForm, setRevenueForm] = useState({
    source: "",
    amount: "",
    category: "other_revenue",
    description: "",
    date: new Date().toISOString().split('T')[0],
  });

  const [expenseForm, setExpenseForm] = useState({
    category: "utilities",
    amount: "",
    type: "operational",
    description: "",
    date: new Date().toISOString().split('T')[0],
  });

  const handleStudentPayment = async () => {
    try {
      // Validation
      if (!paymentForm.student || !paymentForm.amount) {
        toast.error("Please fill in all required fields");
        return;
      }

      if (parseFloat(paymentForm.amount) <= 0) {
        toast.error("Amount must be greater than 0");
        return;
      }

      const today = new Date().toISOString().split('T')[0];
      
      // Create a simple parent record if none exists
      let parentId = paymentForm.parent ? parseInt(paymentForm.parent) : null;
      
      if (!parentId) {
        // Create a basic parent record using student info
        const studentsArray = Array.isArray(students) ? students : (students as any)?.results || [];
        const selectedStudent = studentsArray?.find((s: any) => 
          (s.student_id?.toString() === paymentForm.student) || (s.s_id?.toString() === paymentForm.student)
        );
        if (selectedStudent) {
          try {
            const parentResponse: any = await api.post('/parents/', {
              name: `Parent of ${selectedStudent.name}`,
              email: selectedStudent.email || `parent.${selectedStudent.student_id}@school.com`,
              phone: selectedStudent.phone || '0000000000',
              gender: 'other',
              occupation: 'other',
              address: selectedStudent.address || 'Not provided',
            });
            parentId = parentResponse.data.p_id;
          } catch (parentError) {
            console.error("Failed to create parent:", parentError);
            toast.error("Failed to create parent record");
            return;
          }
        }
      }
      
      const paymentData = {
        parent: parentId,
        student: parseInt(paymentForm.student),
        payment_type: paymentForm.paymentType,
        amount: paymentForm.amount,
        due_date: today,
        payment_date: today,
        status: 'paid', // Mark as paid immediately to trigger revenue recording
        payment_method: paymentForm.method,
        academic_year: paymentForm.academic_year,
        description: paymentForm.description,
        late_fee: "0",
        discount: "0",
      };
      
      console.log("Sending payment data:", paymentData);
      await recordStudentPayment.mutateAsync(paymentData);
      
      toast.success("Student payment recorded successfully!");
      setIsPaymentDialogOpen(false);
      setPaymentForm({
        student: "",
        parent: "",
        amount: "",
        paymentType: "tuition",
        method: "cash",
        description: "",
        academic_year: new Date().getFullYear().toString(),
      });
    } catch (error) {
      toast.error("Failed to record student payment");
      console.error("Error recording student payment:", error);
    }
  };

  const handleSalaryPayment = async () => {
    try {
      // Validation
      if (!salaryForm.employee || !salaryForm.amount || !salaryForm.month) {
        toast.error("Please fill in all required fields");
        return;
      }

      if (parseFloat(salaryForm.amount) <= 0) {
        toast.error("Amount must be greater than 0");
        return;
      }

      const salaryData = {
        employee: parseInt(salaryForm.employee),
        salary_type: salaryForm.type,
        amount: salaryForm.amount,
        month: salaryForm.month,
        basic_salary: salaryForm.amount, // Simplified for now
        notes: salaryForm.description,
      };
      
      console.log("Sending salary data:", salaryData);
      await recordSalaryPayment.mutateAsync(salaryData);
      
      toast.success("Salary payment recorded successfully!");
      setIsSalaryDialogOpen(false);
      setSalaryForm({
        employee: "",
        amount: "",
        month: "",
        type: "monthly",
        description: "",
      });
    } catch (error) {
      toast.error("Failed to record salary payment");
      console.error("Error recording salary payment:", error);
    }
  };

  const handleManualRevenue = async () => {
    try {
      // Validation
      if (!revenueForm.amount || !revenueForm.source || !revenueForm.description) {
        toast.error("Please fill in all required fields");
        return;
      }

      if (parseFloat(revenueForm.amount) <= 0) {
        toast.error("Amount must be greater than 0");
        return;
      }

      await createTransaction.mutateAsync({
        transaction_type: 'revenue',
        category: revenueForm.category,
        amount: parseFloat(revenueForm.amount),
        description: `${revenueForm.source} - ${revenueForm.description}`,
        transaction_date: revenueForm.date,
        reference_type: 'manual',
        notes: revenueForm.description,
      });
      
      toast.success("Revenue entry added successfully!");
      setIsRevenueDialogOpen(false);
      setRevenueForm({
        source: "",
        amount: "",
        category: "other_revenue",
        description: "",
        date: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      toast.error("Failed to add revenue entry");
      console.error("Error adding revenue:", error);
    }
  };

  const handleManualExpense = async () => {
    try {
      // Validation
      if (!expenseForm.amount || !expenseForm.category || !expenseForm.description) {
        toast.error("Please fill in all required fields");
        return;
      }

      if (parseFloat(expenseForm.amount) <= 0) {
        toast.error("Amount must be greater than 0");
        return;
      }

      await createTransaction.mutateAsync({
        transaction_type: 'expense',
        category: expenseForm.category,
        amount: parseFloat(expenseForm.amount),
        description: `${expenseForm.category} - ${expenseForm.description}`,
        transaction_date: expenseForm.date,
        reference_type: 'manual',
        notes: expenseForm.description,
      });
      
      toast.success("Expense entry added successfully!");
      setIsExpenseDialogOpen(false);
      setExpenseForm({
        category: "utilities",
        amount: "",
        type: "operational",
        description: "",
        date: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      toast.error("Failed to add expense entry");
      console.error("Error adding expense:", error);
    }
  };

  const transactionsArray = Array.isArray(transactions) ? transactions : (transactions as any)?.results || [];
  const filteredTransactions = transactionsArray?.filter(
    (transaction: any) =>
      (filterType === "all" || transaction.transaction_type === filterType) &&
      (searchTerm === "" ||
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Financial Ecosystem
          </h1>
          <p className="text-muted-foreground">
            Complete financial management system with automated revenue and expense tracking
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {overviewLoading ? "Loading..." : formatCurrency((financialOverview as any)?.total_revenue || 0)}
            </div>
            <div className="text-sm text-muted-foreground">
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Expenses
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {overviewLoading ? "Loading..." : formatCurrency((financialOverview as any)?.total_expenses || 0)}
            </div>
            <div className="text-sm text-muted-foreground">
              +8.3% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Net Profit
              </CardTitle>
              <DollarSign className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {overviewLoading ? "Loading..." : formatCurrency((financialOverview as any)?.net_profit || 0)}
            </div>
            <div className="text-sm text-muted-foreground">
              +18.7% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Profit Margin
              </CardTitle>
              <Calculator className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {overviewLoading ? "Loading..." : `${(financialOverview as any)?.profit_margin?.toFixed(1) || 0}%`}
            </div>
            <div className="text-sm text-muted-foreground">
              Healthy margin
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-20 flex flex-col items-center justify-center gap-2">
              <Receipt className="h-6 w-6" />
              <span>Collect Student Payment</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Collect Student Payment</DialogTitle>
              <DialogDescription>
                Record a student fee payment. This will automatically be added to revenue.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="student" className="text-right">
                  Student
                </Label>
                <Select onValueChange={(value) => {
                  const studentsArray = Array.isArray(students) ? students : (students as any)?.results || [];
                  const selectedStudent = studentsArray?.find((s: any) => 
                    (s.student_id?.toString() === value) || (s.s_id?.toString() === value)
                  );
                  setPaymentForm({
                    ...paymentForm, 
                    student: value,
                    parent: selectedStudent?.current_parents?.[0]?.parent?.toString() || ""
                  });
                }}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Array.isArray(students) ? students : (students as any)?.results || [])?.map((student: any) => (
                      <SelectItem key={student.student_id || student.s_id} value={(student.student_id || student.s_id)?.toString()}>
                        {student.name} - {student.level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {paymentForm.parent && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Parent</Label>
                  <div className="col-span-3 text-sm text-muted-foreground">
                    Auto-selected from student record
                  </div>
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm({...paymentForm, amount: e.target.value})}
                  placeholder="₹0.00"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="paymentType" className="text-right">
                  Type
                </Label>
                <Select onValueChange={(value) => setPaymentForm({...paymentForm, paymentType: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tuition">Tuition Fee</SelectItem>
                    <SelectItem value="transport">Transport Fee</SelectItem>
                    <SelectItem value="library">Library Fee</SelectItem>
                    <SelectItem value="sports">Sports Fee</SelectItem>
                    <SelectItem value="examination">Examination Fee</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="method" className="text-right">
                  Method
                </Label>
                <Select onValueChange={(value) => setPaymentForm({...paymentForm, method: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="debit_card">Debit Card</SelectItem>
                    <SelectItem value="online">Online Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={paymentForm.description}
                  onChange={(e) => setPaymentForm({...paymentForm, description: e.target.value})}
                  placeholder="Optional description"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleStudentPayment} disabled={recordStudentPayment.isPending}>
                {recordStudentPayment.isPending ? "Recording..." : "Record Payment"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isSalaryDialogOpen} onOpenChange={setIsSalaryDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <Users className="h-6 w-6" />
              <span>Pay Salary</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Pay Employee Salary</DialogTitle>
              <DialogDescription>
                Record a salary payment. This will automatically be added to expenses.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="employee" className="text-right">
                  Employee
                </Label>
                <Select onValueChange={(value) => setSalaryForm({...salaryForm, employee: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Array.isArray(employees) ? employees : (employees as any)?.results || [])?.map((employee: any) => (
                      <SelectItem key={employee.emp_id || employee.id} value={(employee.emp_id || employee.id)?.toString()}>
                        {employee.name} - {employee.position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="salaryAmount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="salaryAmount"
                  value={salaryForm.amount}
                  onChange={(e) => setSalaryForm({...salaryForm, amount: e.target.value})}
                  placeholder="₹0.00"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="month" className="text-right">
                  Month
                </Label>
                <div className="col-span-3">
                  <MonthYearPicker
                    value={salaryForm.month}
                    onChange={(value) => setSalaryForm({...salaryForm, month: value})}
                    placeholder="Select month and year"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="salaryType" className="text-right">
                  Type
                </Label>
                <Select onValueChange={(value) => setSalaryForm({...salaryForm, type: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Salary type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly Salary</SelectItem>
                    <SelectItem value="bonus">Bonus</SelectItem>
                    <SelectItem value="overtime">Overtime</SelectItem>
                    <SelectItem value="allowance">Allowance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="salaryDescription" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="salaryDescription"
                  value={salaryForm.description}
                  onChange={(e) => setSalaryForm({...salaryForm, description: e.target.value})}
                  placeholder="Optional description"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSalaryPayment} disabled={recordSalaryPayment.isPending}>
                {recordSalaryPayment.isPending ? "Processing..." : "Process Payment"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isRevenueDialogOpen} onOpenChange={setIsRevenueDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <TrendingUp className="h-6 w-6" />
              <span>Add Revenue</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Manual Revenue</DialogTitle>
              <DialogDescription>
                Record revenue from other sources like donations, grants, etc.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="source" className="text-right">
                  Source
                </Label>
                <Input
                  id="source"
                  value={revenueForm.source}
                  onChange={(e) => setRevenueForm({...revenueForm, source: e.target.value})}
                  placeholder="Revenue source"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="revenueAmount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="revenueAmount"
                  value={revenueForm.amount}
                  onChange={(e) => setRevenueForm({...revenueForm, amount: e.target.value})}
                  placeholder="₹0.00"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="revenueCategory" className="text-right">
                  Category
                </Label>
                <Select onValueChange={(value) => setRevenueForm({...revenueForm, category: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Revenue category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="donations">Donations</SelectItem>
                    <SelectItem value="grants">Grants</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="facility_rentals">Facility Rentals</SelectItem>
                    <SelectItem value="other_revenue">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="revenueDate" className="text-right">
                  Date
                </Label>
                <Input
                  id="revenueDate"
                  type="date"
                  value={revenueForm.date}
                  onChange={(e) => setRevenueForm({...revenueForm, date: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="revenueDescription" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="revenueDescription"
                  value={revenueForm.description}
                  onChange={(e) => setRevenueForm({...revenueForm, description: e.target.value})}
                  placeholder="Description"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleManualRevenue} disabled={createTransaction.isPending}>
                {createTransaction.isPending ? "Adding..." : "Add Revenue"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isExpenseDialogOpen} onOpenChange={setIsExpenseDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <TrendingDown className="h-6 w-6" />
              <span>Add Expense</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Manual Expense</DialogTitle>
              <DialogDescription>
                Record expenses like utilities, supplies, maintenance, etc.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="expenseCategory" className="text-right">
                  Category
                </Label>
                <Select onValueChange={(value) => setExpenseForm({...expenseForm, category: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Expense category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="supplies">Supplies</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="other_expenses">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="expenseAmount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="expenseAmount"
                  value={expenseForm.amount}
                  onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})}
                  placeholder="₹0.00"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="expenseType" className="text-right">
                  Type
                </Label>
                <Select onValueChange={(value) => setExpenseForm({...expenseForm, type: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Expense type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operational">Operational</SelectItem>
                    <SelectItem value="capital">Capital</SelectItem>
                    <SelectItem value="recurring">Recurring</SelectItem>
                    <SelectItem value="one-time">One-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="expenseDate" className="text-right">
                  Date
                </Label>
                <Input
                  id="expenseDate"
                  type="date"
                  value={expenseForm.date}
                  onChange={(e) => setExpenseForm({...expenseForm, date: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="expenseDescription" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="expenseDescription"
                  value={expenseForm.description}
                  onChange={(e) => setExpenseForm({...expenseForm, description: e.target.value})}
                  placeholder="Description"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleManualExpense} disabled={createTransaction.isPending}>
                {createTransaction.isPending ? "Adding..." : "Add Expense"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expenses Trend</CardTitle>
            <CardDescription>Monthly comparison over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              {trendLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div>Loading chart data...</div>
                </div>
              ) : (
                <LineChart data={Array.isArray(monthlyTrend) ? monthlyTrend : []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month_name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
                  <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
                </LineChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>Distribution of expenses by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              {breakdownLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div>Loading breakdown data...</div>
                </div>
              ) : (
                <PieChart>
                  <Pie
                    data={Array.isArray(expenseBreakdown) ? expenseBreakdown?.map((item: any, index: number) => ({
                      ...item,
                      name: item.category,
                      value: item.total,
                      color: `hsl(${index * 60}, 70%, 50%)`
                    })) : []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {Array.isArray(expenseBreakdown) ? expenseBreakdown?.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 50%)`} />
                    )) : []}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                </PieChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest financial activities</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionsLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    Loading transactions...
                  </TableCell>
                </TableRow>
              ) : filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((transaction: any) => (
                  <TableRow key={transaction.transaction_id}>
                    <TableCell className="font-medium">TRX-{transaction.transaction_id}</TableCell>
                    <TableCell>
                      <Badge
                        variant={transaction.transaction_type === "revenue" ? "default" : "destructive"}
                        className={
                          transaction.transaction_type === "revenue"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {transaction.transaction_type === "revenue" ? "Revenue" : "Expense"}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="capitalize">{transaction.category.replace('_', ' ')}</TableCell>
                    <TableCell className="capitalize">{transaction.payment_method?.replace('_', ' ') || 'N/A'}</TableCell>
                    <TableCell
                      className={
                        transaction.transaction_type === "revenue" ? "text-green-600" : "text-red-600"
                      }
                    >
                      {transaction.transaction_type === "revenue" ? "+" : "-"}{formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell>{new Date(transaction.transaction_date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
