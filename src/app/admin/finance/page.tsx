import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CreditCard,
  DollarSign,
  Download,
  FileText,
  LineChart,
  PieChart,
  Plus,
  Receipt,
  RefreshCw,
  Wallet,
} from "lucide-react";

export default function FinancePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Financial Management
          </h1>
          <p className="text-muted-foreground">
            Manage all financial aspects of the school including fees, invoices,
            payments, and expenses
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹24,500,000</div>
            <div className="flex items-center text-sm text-green-500">
              <span className="font-medium">+5.2%</span>
              <span className="text-muted-foreground ml-1">
                from last month
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹18,250,000</div>
            <div className="flex items-center text-sm text-red-500">
              <span className="font-medium">+3.8%</span>
              <span className="text-muted-foreground ml-1">
                from last month
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Fee Collection Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.5%</div>
            <div className="flex items-center text-sm text-green-500">
              <span className="font-medium">+2.1%</span>
              <span className="text-muted-foreground ml-1">
                from last month
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Outstanding Dues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹3,250,000</div>
            <div className="flex items-center text-sm text-red-500">
              <span className="font-medium">-1.5%</span>
              <span className="text-muted-foreground ml-1">
                from last month
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Finance Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Finance Dashboard</CardTitle>
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>
              Comprehensive overview of financial status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Budget Utilization</span>
                  <span className="font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="flex justify-between text-sm">
                <span>Revenue vs Target</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  On Track
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/admin/finance/dashboard" passHref>
              <Button variant="outline" className="w-full">
                View Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Fee Structure</CardTitle>
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>
              Manage fee structures for different classes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Active Fee Structures</span>
                <span className="font-medium">15</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Last Updated</span>
                <span>2 days ago</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/admin/finance/fee-structure" passHref>
              <Button variant="outline" className="w-full">
                Manage Fee Structure
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Invoices</CardTitle>
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>
              Generate and manage student invoices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Total Invoices</span>
                <span className="font-medium">1,250</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Pending Invoices</span>
                <span className="font-medium text-amber-600">45</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/admin/finance/invoices" passHref>
              <Button variant="outline" className="w-full">
                Manage Invoices
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Payments</CardTitle>
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>Track and record fee payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Recent Payments</span>
                <span className="font-medium">78</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>This Month</span>
                <span className="font-medium text-green-600">₹1,850,000</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/admin/finance/payments" passHref>
              <Button variant="outline" className="w-full">
                View Payments
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Expenses</CardTitle>
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>Manage and track school expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Recent Expenses</span>
                <span className="font-medium">32</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>This Month</span>
                <span className="font-medium text-red-600">₹1,250,000</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/admin/finance/expenses" passHref>
              <Button variant="outline" className="w-full">
                Manage Expenses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Financial Ecosystem</CardTitle>
              <PieChart className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>
              Complete financial management with automated tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Student Payments</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Auto Revenue
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Salary Payments</span>
                <Badge variant="outline" className="bg-red-50 text-red-700">
                  Auto Expense
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/admin/finance/financial-ecosystem" passHref>
              <Button variant="outline" className="w-full">
                Manage Ecosystem
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Financial Reports</CardTitle>
              <LineChart className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>
              Generate comprehensive financial reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Available Reports</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Last Generated</span>
                <span>Yesterday</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Generate Reports
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center justify-center gap-2"
          >
            <Plus className="h-5 w-5" />
            <span>Create Invoice</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center justify-center gap-2"
          >
            <Receipt className="h-5 w-5" />
            <span>Record Payment</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center justify-center gap-2"
          >
            <DollarSign className="h-5 w-5" />
            <span>Add Expense</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center justify-center gap-2"
          >
            <PieChart className="h-5 w-5" />
            <span>View Budget</span>
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Financial Activity</CardTitle>
          <CardDescription>
            Latest transactions and financial events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: "TRX-7829",
                date: "2023-07-15",
                description: "Fee Payment - Grade 10",
                amount: "₹45,000",
                type: "Income",
              },
              {
                id: "TRX-7830",
                date: "2023-07-14",
                description: "Salary Payment - Teaching Staff",
                amount: "₹1,250,000",
                type: "Expense",
              },
              {
                id: "TRX-7831",
                date: "2023-07-14",
                description: "Utility Bills Payment",
                amount: "₹85,000",
                type: "Expense",
              },
              {
                id: "TRX-7832",
                date: "2023-07-13",
                description: "Library Books Purchase",
                amount: "₹120,000",
                type: "Expense",
              },
              {
                id: "TRX-7833",
                date: "2023-07-12",
                description: "Transport Fee Collection",
                amount: "₹350,000",
                type: "Income",
              },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 rounded-full p-2 ${
                      activity.type === "Income" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {activity.type === "Income" ? (
                      <DollarSign className="h-4 w-4 text-green-600" />
                    ) : (
                      <Wallet className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{activity.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{activity.id}</span>
                      <span className="mx-1">•</span>
                      <span>{activity.date}</span>
                    </div>
                  </div>
                </div>
                <div
                  className={`font-medium ${
                    activity.type === "Income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {activity.type === "Income" ? "+" : "-"}
                  {activity.amount}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Transactions
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
