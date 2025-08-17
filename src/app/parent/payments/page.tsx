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
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  Calendar,
  FileText,
  Download,
  CreditCard,
  CheckCircle,
  Clock,
  Filter,
  Plus,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export default function ParentPayments() {
  // Sample payment data
  const children = [
    {
      id: 1,
      name: "Emma Johnson",
      grade: "Grade 8",
      class: "8-A",
      feeStatus: {
        tuition: {
          paid: 8000,
          total: 12000,
          dueDate: "May 30, 2025",
          status: "Partially Paid",
        },
        transport: {
          paid: 1200,
          total: 1200,
          dueDate: "May 15, 2025",
          status: "Paid",
        },
        activities: {
          paid: 500,
          total: 800,
          dueDate: "June 10, 2025",
          status: "Partially Paid",
        },
      },
      recentPayments: [
        {
          id: 1,
          amount: 4000,
          date: "February 15, 2025",
          method: "Credit Card",
          description: "Tuition Fee - Term 2 (First Installment)",
          status: "Completed",
          receiptNo: "REC-2025-0458",
        },
        {
          id: 2,
          amount: 1200,
          date: "February 15, 2025",
          method: "Credit Card",
          description: "Transport Fee - Term 2",
          status: "Completed",
          receiptNo: "REC-2025-0459",
        },
        {
          id: 3,
          amount: 500,
          date: "March 5, 2025",
          method: "Bank Transfer",
          description: "Extracurricular Activities - Term 2 (Partial)",
          status: "Completed",
          receiptNo: "REC-2025-0612",
        },
      ],
      upcomingPayments: [
        {
          id: 1,
          amount: 4000,
          dueDate: "May 30, 2025",
          description: "Tuition Fee - Term 2 (Second Installment)",
          status: "Pending",
        },
        {
          id: 2,
          amount: 300,
          dueDate: "June 10, 2025",
          description: "Extracurricular Activities - Term 2 (Remaining)",
          status: "Pending",
        },
      ],
    },
    {
      id: 2,
      name: "Noah Johnson",
      grade: "Grade 5",
      class: "5-C",
      feeStatus: {
        tuition: {
          paid: 6000,
          total: 9000,
          dueDate: "May 30, 2025",
          status: "Partially Paid",
        },
        transport: {
          paid: 1000,
          total: 1000,
          dueDate: "May 15, 2025",
          status: "Paid",
        },
        activities: {
          paid: 400,
          total: 600,
          dueDate: "June 10, 2025",
          status: "Partially Paid",
        },
      },
      recentPayments: [
        {
          id: 1,
          amount: 3000,
          date: "February 15, 2025",
          method: "Credit Card",
          description: "Tuition Fee - Term 2 (First Installment)",
          status: "Completed",
          receiptNo: "REC-2025-0460",
        },
        {
          id: 2,
          amount: 1000,
          date: "February 15, 2025",
          method: "Credit Card",
          description: "Transport Fee - Term 2",
          status: "Completed",
          receiptNo: "REC-2025-0461",
        },
        {
          id: 3,
          amount: 400,
          date: "March 5, 2025",
          method: "Bank Transfer",
          description: "Extracurricular Activities - Term 2 (Partial)",
          status: "Completed",
          receiptNo: "REC-2025-0613",
        },
      ],
      upcomingPayments: [
        {
          id: 1,
          amount: 3000,
          dueDate: "May 30, 2025",
          description: "Tuition Fee - Term 2 (Second Installment)",
          status: "Pending",
        },
        {
          id: 2,
          amount: 200,
          dueDate: "June 10, 2025",
          description: "Extracurricular Activities - Term 2 (Remaining)",
          status: "Pending",
        },
      ],
    },
  ];

  // Sample payment methods
  const paymentMethods = [
    {
      id: 1,
      type: "Credit Card",
      last4: "4242",
      expiry: "05/26",
      default: true,
    },
    {
      id: 2,
      type: "Bank Account",
      accountNo: "****6789",
      bank: "National Bank",
      default: false,
    },
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground">
          Manage school fees and payment history
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Payments</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {children.map((child) => (
            <Card key={child.id}>
              <CardHeader>
                <CardTitle>{child.name}'s Fee Status</CardTitle>
                <CardDescription>
                  {child.grade} | {child.class}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(child.feeStatus).map(([feeType, data]) => (
                    <Card key={feeType}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base capitalize">
                          {feeType} Fee
                        </CardTitle>
                        <CardDescription>Due: {data.dueDate}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Payment Status
                            </span>
                            <Badge
                              variant={
                                data.status === "Paid"
                                  ? "default"
                                  : data.status === "Partially Paid"
                                  ? "outline"
                                  : "destructive"
                              }
                            >
                              {data.status}
                            </Badge>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progress</span>
                              <span>
                                {Math.round((data.paid / data.total) * 100)}%
                              </span>
                            </div>
                            <Progress
                              value={(data.paid / data.total) * 100}
                              className="h-2"
                            />
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div>
                              <div className="text-sm text-muted-foreground">
                                Paid
                              </div>
                              <div className="font-medium">
                                ${data.paid.toLocaleString()}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">
                                Total
                              </div>
                              <div className="font-medium">
                                ${data.total.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        {data.status !== "Paid" && (
                          <Button className="w-full">
                            <DollarSign className="h-4 w-4 mr-2" />
                            Pay Now
                          </Button>
                        )}
                        {data.status === "Paid" && (
                          <Button variant="outline" className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Receipt
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    View Fee Structure
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Payment Schedule
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download Receipts
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
              <CardDescription>
                Overall payment status for all children
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">
                    Total Fees (2024-2025)
                  </div>
                  <div className="text-2xl font-bold">$24,600</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    For all children
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">
                    Amount Paid
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    $17,100
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    69% of total fees
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">
                    Remaining Balance
                  </div>
                  <div className="text-2xl font-bold text-amber-600">
                    $7,500
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Due by June 10, 2025
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Payment History</h2>
              <p className="text-sm text-muted-foreground">
                Record of all previous payments
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Child" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Children</SelectItem>
                  <SelectItem value="emma">Emma Johnson</SelectItem>
                  <SelectItem value="noah">Noah Johnson</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Receipt No.
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Date
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Description
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Child
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Method
                        </th>
                        <th className="h-12 px-4 text-right align-middle font-medium">
                          Amount
                        </th>
                        <th className="h-12 px-4 text-center align-middle font-medium">
                          Status
                        </th>
                        <th className="h-12 px-4 text-center align-middle font-medium">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {children.flatMap((child) =>
                        child.recentPayments.map((payment) => (
                          <tr
                            key={`${child.id}-${payment.id}`}
                            className="border-b transition-colors hover:bg-muted/50"
                          >
                            <td className="p-4 align-middle">
                              {payment.receiptNo}
                            </td>
                            <td className="p-4 align-middle">{payment.date}</td>
                            <td className="p-4 align-middle">
                              {payment.description}
                            </td>
                            <td className="p-4 align-middle">{child.name}</td>
                            <td className="p-4 align-middle">
                              {payment.method}
                            </td>
                            <td className="p-4 align-middle text-right">
                              ${payment.amount.toLocaleString()}
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex justify-center">
                                <Badge
                                  variant={
                                    payment.status === "Completed"
                                      ? "default"
                                      : "outline"
                                  }
                                >
                                  {payment.status === "Completed" && (
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                  )}
                                  {payment.status}
                                </Badge>
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex justify-center gap-2">
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4" />
                                  <span className="sr-only">Download</span>
                                </Button>
                                <Button variant="outline" size="sm">
                                  <FileText className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4 flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing 6 of 24 payments
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Upcoming Payments</h2>
              <p className="text-sm text-muted-foreground">
                Payments due in the coming months
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Child" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Children</SelectItem>
                  <SelectItem value="emma">Emma Johnson</SelectItem>
                  <SelectItem value="noah">Noah Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {children.flatMap((child) =>
                  child.upcomingPayments.map((payment) => (
                    <div
                      key={`${child.id}-${payment.id}`}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-md ${
                            new Date(payment.dueDate) <
                            new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                              ? "bg-red-100"
                              : "bg-amber-100"
                          }`}
                        >
                          <Clock
                            className={`h-5 w-5 ${
                              new Date(payment.dueDate) <
                              new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                                ? "text-red-600"
                                : "text-amber-600"
                            }`}
                          />
                        </div>
                        <div>
                          <div className="font-medium">
                            {payment.description}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {child.name} | {child.grade}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                        <Badge variant="outline">Due: {payment.dueDate}</Badge>
                        <div className="font-semibold">
                          ${payment.amount.toLocaleString()}
                        </div>
                        <Button>Pay Now</Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Schedule</CardTitle>
              <CardDescription>
                Upcoming fee schedule for the academic year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">
                      Term 2 - Second Installment
                    </div>
                    <Badge variant="outline">Due: May 30, 2025</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Emma Johnson - Tuition Fee</span>
                      <span className="font-medium">$4,000</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Noah Johnson - Tuition Fee</span>
                      <span className="font-medium">$3,000</span>
                    </div>
                    <div className="flex items-center justify-between font-medium pt-2 border-t mt-2">
                      <span>Total</span>
                      <span>$7,000</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">
                      Term 2 - Extracurricular Activities (Remaining)
                    </div>
                    <Badge variant="outline">Due: June 10, 2025</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Emma Johnson - Activities Fee</span>
                      <span className="font-medium">$300</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Noah Johnson - Activities Fee</span>
                      <span className="font-medium">$200</span>
                    </div>
                    <div className="flex items-center justify-between font-medium pt-2 border-t mt-2">
                      <span>Total</span>
                      <span>$500</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">
                      Term 3 - First Installment
                    </div>
                    <Badge variant="outline">Due: September 15, 2025</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Emma Johnson - Tuition Fee</span>
                      <span className="font-medium">$4,000</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Emma Johnson - Transport Fee</span>
                      <span className="font-medium">$1,200</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Noah Johnson - Tuition Fee</span>
                      <span className="font-medium">$3,000</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Noah Johnson - Transport Fee</span>
                      <span className="font-medium">$1,000</span>
                    </div>
                    <div className="flex items-center justify-between font-medium pt-2 border-t mt-2">
                      <span>Total</span>
                      <span>$9,200</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Payment Methods</h2>
              <p className="text-sm text-muted-foreground">
                Manage your payment options
              </p>
            </div>

            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <Card key={method.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        {method.type === "Credit Card" ? (
                          <CreditCard className="h-5 w-5 text-primary" />
                        ) : (
                          <DollarSign className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">
                          {method.type}
                          {method.default && (
                            <Badge variant="outline" className="ml-2">
                              Default
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {method.type === "Credit Card" ? (
                            <>
                              Ending in {method.last4} • Expires {method.expiry}
                            </>
                          ) : (
                            <>
                              {method.bank} • Account {method.accountNo}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      {!method.default && (
                        <Button variant="outline" size="sm">
                          Set as Default
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Other Payment Options</CardTitle>
              <CardDescription>
                Alternative ways to pay school fees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="font-medium mb-1">Bank Transfer</div>
                  <p className="text-sm text-muted-foreground mb-2">
                    You can make a direct bank transfer to the school account.
                    Please use your child's ID as the reference.
                  </p>
                  <div className="bg-muted p-3 rounded-md text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div>Bank Name:</div>
                      <div className="font-medium">National Education Bank</div>
                      <div>Account Name:</div>
                      <div className="font-medium">EduManage School</div>
                      <div>Account Number:</div>
                      <div className="font-medium">1234567890</div>
                      <div>Sort Code:</div>
                      <div className="font-medium">12-34-56</div>
                      <div>Reference:</div>
                      <div className="font-medium">[Child's ID]</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="font-medium mb-1">In-Person Payment</div>
                  <p className="text-sm text-muted-foreground">
                    You can pay in person at the school's finance office during
                    working hours (Monday to Friday, 8:00 AM to 4:00 PM).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
