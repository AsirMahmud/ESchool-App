"use client";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  DollarSign,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePaymentSummary } from "@/hooks/use-payments";
import { useSalarySummary } from "@/hooks/use-salaries";

export default function AccountantDashboard() {
  const { data: paymentSummary } = usePaymentSummary();
  const { data: salarySummary } = useSalarySummary();

  const totalRevenue = paymentSummary?.paid_amount || 0;
  const pendingFees = paymentSummary?.pending_amount || 0;
  const totalExpenses = salarySummary?.paid_amount || 0;
  const pendingPayroll = salarySummary?.pending_amount || 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Financial Dashboard
        </h1>
        <p className="text-muted-foreground">
          Overview of the school's financial status and recent transactions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Student payments received
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingFees.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {paymentSummary?.overdue_count || 0} overdue payments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Salary Expenses
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Employee salaries paid
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Payroll</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingPayroll.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {salarySummary?.overdue_count || 0} overdue salaries
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent-transactions" className="w-full">
        <TabsList>
          <TabsTrigger value="recent-transactions">
            Recent Transactions
          </TabsTrigger>
          <TabsTrigger value="financial-summary">Financial Summary</TabsTrigger>
        </TabsList>
        <TabsContent
          value="recent-transactions"
          className="border-none p-0 pt-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Overview of the latest financial transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-lg border p-4">
                  <div>
                    <div className="font-medium">Tuition Fee Payment</div>
                    <div className="text-sm text-muted-foreground">
                      John Smith (Grade 10) - Receipt #45982
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="font-medium text-green-600">+$1,250.00</div>
                    <div className="text-xs text-muted-foreground">
                      Today, 10:24 AM
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-lg border p-4">
                  <div>
                    <div className="font-medium">Cafeteria Supplies</div>
                    <div className="text-sm text-muted-foreground">
                      Monthly grocery order - Invoice #8754
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="font-medium text-red-600">-$3,420.00</div>
                    <div className="text-xs text-muted-foreground">
                      Yesterday, 2:15 PM
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-lg border p-4">
                  <div>
                    <div className="font-medium">Library Fee Payment</div>
                    <div className="text-sm text-muted-foreground">
                      Sarah Johnson (Grade 8) - Receipt #45983
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="font-medium text-green-600">+$150.00</div>
                    <div className="text-xs text-muted-foreground">
                      Yesterday, 11:30 AM
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-lg border p-4">
                  <div>
                    <div className="font-medium">Utility Payment</div>
                    <div className="text-sm text-muted-foreground">
                      Electricity bill - March 2023
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="font-medium text-red-600">-$2,845.00</div>
                    <div className="text-xs text-muted-foreground">
                      Mar 28, 9:00 AM
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-lg border p-4">
                  <div>
                    <div className="font-medium">Registration Fee</div>
                    <div className="text-sm text-muted-foreground">
                      Michael Brown (Grade 6) - Receipt #45980
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="font-medium text-green-600">+$500.00</div>
                    <div className="text-xs text-muted-foreground">
                      Mar 27, 3:45 PM
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/accountant/transactions">
                  View All Transactions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="financial-summary" className="border-none p-0 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
              <CardDescription>
                Monthly breakdown of income and expenses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] rounded-lg border bg-muted/20 p-6">
                <div className="flex h-full flex-col items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    Financial chart visualization would appear here
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <div className="text-sm font-medium text-muted-foreground">
                    Income Breakdown
                  </div>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-center justify-between">
                      <span className="text-sm">Tuition Fees</span>
                      <span className="font-medium">78%</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-sm">Registration Fees</span>
                      <span className="font-medium">12%</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-sm">Miscellaneous</span>
                      <span className="font-medium">10%</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="text-sm font-medium text-muted-foreground">
                    Expense Breakdown
                  </div>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-center justify-between">
                      <span className="text-sm">Salaries</span>
                      <span className="font-medium">65%</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-sm">Facilities</span>
                      <span className="font-medium">20%</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-sm">Supplies</span>
                      <span className="font-medium">15%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/accountant/reports">
                  Generate Detailed Reports
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Fee Deadlines</CardTitle>
            <CardDescription>
              Students with upcoming payment deadlines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Grade 9 Tuition (Q2)</p>
                  <p className="text-sm text-muted-foreground">32 students</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">April 15, 2023</p>
                  <p className="text-sm text-muted-foreground">18 days left</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Grade 11 Lab Fees</p>
                  <p className="text-sm text-muted-foreground">24 students</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">April 10, 2023</p>
                  <p className="text-sm text-muted-foreground">13 days left</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Grade 7 Field Trip</p>
                  <p className="text-sm text-muted-foreground">45 students</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">April 5, 2023</p>
                  <p className="text-sm text-muted-foreground">8 days left</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/accountant/fee-management">
                Manage Fee Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>
              Financial requests awaiting your approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Science Lab Equipment</p>
                  <p className="text-sm text-muted-foreground">
                    Requested by: Mr. Johnson
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$2,450.00</p>
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sports Department Budget</p>
                  <p className="text-sm text-muted-foreground">
                    Requested by: Ms. Williams
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$5,800.00</p>
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Library Books</p>
                  <p className="text-sm text-muted-foreground">
                    Requested by: Mrs. Davis
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$1,200.00</p>
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/accountant/approvals">
                View All Pending Approvals
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
