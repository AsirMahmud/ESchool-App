"use client";
import { ArrowUpDown, Download, Filter, Plus, Search, Eye, CheckCircle } from "lucide-react";
import { useState } from "react";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
import { usePayments, usePaymentSummary, useCreatePayment, useMarkPaymentPaid } from "@/hooks/use-payments";
import { useStudents } from "@/hooks/use-students";
import { useParents } from "@/hooks/use-parents";

export default function FeeManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isAddFeeOpen, setIsAddFeeOpen] = useState(false);
  const [newFee, setNewFee] = useState({
    student: "",
    parent: "",
    payment_type: "tuition",
    amount: "",
    due_date: "",
    academic_year: new Date().getFullYear().toString(),
    description: "",
  });

  // API hooks
  const { data: payments, isLoading } = usePayments({
    search: searchTerm,
    status: statusFilter,
  });
  const { data: paymentSummary } = usePaymentSummary();
  const { data: students } = useStudents();
  const { data: parents } = useParents();
  const createPayment = useCreatePayment();
  const markPaid = useMarkPaymentPaid();

  const handleCreateFee = async () => {
    try {
      await createPayment.mutateAsync({
        ...newFee,
        parent: parseInt(newFee.parent),
      });
      setIsAddFeeOpen(false);
      setNewFee({
        student: "",
        parent: "",
        payment_type: "tuition",
        amount: "",
        due_date: "",
        academic_year: new Date().getFullYear().toString(),
        description: "",
      });
    } catch (error) {
      console.error("Failed to create payment:", error);
    }
  };

  const handleMarkPaid = async (paymentId: number) => {
    try {
      await markPaid.mutateAsync(paymentId);
    } catch (error) {
      console.error("Failed to mark payment as paid:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      case 'partial':
        return <Badge className="bg-blue-100 text-blue-800">Partial</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const filteredPayments = payments?.results || [];
  const pendingPayments = filteredPayments.filter((p: any) => p.status === 'pending');
  const paidPayments = filteredPayments.filter((p: any) => p.status === 'paid');
  const overduePayments = filteredPayments.filter((p: any) => p.status === 'overdue' || p.is_overdue);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Student Payment Management</h1>
        <p className="text-muted-foreground">
          Manage student fees, payments, and generate invoices.
        </p>
      </div>

      {/* Summary Cards */}
      {paymentSummary && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{paymentSummary.total_payments}</div>
              <p className="text-xs text-muted-foreground">
                ${paymentSummary.total_amount?.toLocaleString() || 0}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${paymentSummary.paid_amount?.toLocaleString() || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                ${paymentSummary.pending_amount?.toLocaleString() || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {paymentSummary.overdue_count || 0}
              </div>
              <p className="text-xs text-muted-foreground">payments</p>
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
              placeholder="Search students..."
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
          <Dialog open={isAddFeeOpen} onOpenChange={setIsAddFeeOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Student Fee
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add Student Fee</DialogTitle>
                <DialogDescription>
                  Create a new fee payment for a student.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="student">Student</Label>
                    <Select value={newFee.student} onValueChange={(value) => setNewFee({...newFee, student: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        {students?.map((student: any) => (
                          <SelectItem key={student.s_id} value={student.s_id}>
                            {student.name} ({student.student_number})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parent">Parent</Label>
                    <Select value={newFee.parent} onValueChange={(value) => setNewFee({...newFee, parent: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select parent" />
                      </SelectTrigger>
                      <SelectContent>
                        {parents?.map((parent: any) => (
                          <SelectItem key={parent.p_id} value={parent.p_id.toString()}>
                            {parent.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="payment_type">Fee Type</Label>
                    <Select value={newFee.payment_type} onValueChange={(value) => setNewFee({...newFee, payment_type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tuition">Tuition Fee</SelectItem>
                        <SelectItem value="transport">Transport Fee</SelectItem>
                        <SelectItem value="library">Library Fee</SelectItem>
                        <SelectItem value="laboratory">Laboratory Fee</SelectItem>
                        <SelectItem value="sports">Sports Fee</SelectItem>
                        <SelectItem value="examination">Examination Fee</SelectItem>
                        <SelectItem value="development">Development Fee</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={newFee.amount}
                      onChange={(e) => setNewFee({...newFee, amount: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="due_date">Due Date</Label>
                    <Input
                      id="due_date"
                      type="date"
                      value={newFee.due_date}
                      onChange={(e) => setNewFee({...newFee, due_date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="academic_year">Academic Year</Label>
                    <Input
                      id="academic_year"
                      placeholder="2025"
                      value={newFee.academic_year}
                      onChange={(e) => setNewFee({...newFee, academic_year: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Additional notes..."
                    value={newFee.description}
                    onChange={(e) => setNewFee({...newFee, description: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCreateFee} disabled={createPayment.isPending}>
                  {createPayment.isPending ? "Creating..." : "Create Fee"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all-fees" className="w-full">
        <TabsList>
          <TabsTrigger value="all-fees">All Fees ({filteredPayments.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingPayments.length})</TabsTrigger>
          <TabsTrigger value="paid">Paid ({paidPayments.length})</TabsTrigger>
          <TabsTrigger value="overdue">Overdue ({overduePayments.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-fees" className="border-none p-0 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Payment Records</CardTitle>
              <CardDescription>
                Manage and track all student payment records
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Loading payments...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Parent</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment: any) => (
                      <TableRow key={payment.pay_id}>
                        <TableCell className="font-medium">PAY-{payment.pay_id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{payment.student_name}</div>
                            <div className="text-sm text-muted-foreground">{payment.student_number}</div>
                          </div>
                        </TableCell>
                        <TableCell>{payment.parent_name}</TableCell>
                        <TableCell className="capitalize">{payment.payment_type.replace('_', ' ')}</TableCell>
                        <TableCell>${parseFloat(payment.amount).toLocaleString()}</TableCell>
                        <TableCell>{new Date(payment.due_date).toLocaleDateString()}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1 justify-end">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {payment.status === 'pending' && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleMarkPaid(payment.pay_id)}
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
              <CardTitle>Pending Payments</CardTitle>
              <CardDescription>Payments awaiting completion</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingPayments.map((payment: any) => (
                    <TableRow key={payment.pay_id}>
                      <TableCell>{payment.student_name}</TableCell>
                      <TableCell className="capitalize">{payment.payment_type.replace('_', ' ')}</TableCell>
                      <TableCell>${parseFloat(payment.amount).toLocaleString()}</TableCell>
                      <TableCell>{new Date(payment.due_date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleMarkPaid(payment.pay_id)}
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
              <CardTitle>Paid Payments</CardTitle>
              <CardDescription>Completed payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paidPayments.map((payment: any) => (
                    <TableRow key={payment.pay_id}>
                      <TableCell>{payment.student_name}</TableCell>
                      <TableCell className="capitalize">{payment.payment_type.replace('_', ' ')}</TableCell>
                      <TableCell>${parseFloat(payment.amount).toLocaleString()}</TableCell>
                      <TableCell>{payment.payment_date ? new Date(payment.payment_date).toLocaleDateString() : 'N/A'}</TableCell>
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
              <CardTitle>Overdue Payments</CardTitle>
              <CardDescription>Payments past their due date</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Days Overdue</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {overduePayments.map((payment: any) => (
                    <TableRow key={payment.pay_id}>
                      <TableCell>{payment.student_name}</TableCell>
                      <TableCell className="capitalize">{payment.payment_type.replace('_', ' ')}</TableCell>
                      <TableCell>${parseFloat(payment.amount).toLocaleString()}</TableCell>
                      <TableCell className="text-red-600">{payment.days_overdue} days</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleMarkPaid(payment.pay_id)}
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
