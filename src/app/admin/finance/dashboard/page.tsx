import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LineChart, BarChart, PieChart } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Filter, RefreshCw } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";

export default function FinanceDashboardPage() {
  // Sample data for charts
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [3200, 3500, 3800, 3600, 3900, 4100],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const expensesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Expenses",
        data: [2800, 2900, 3100, 2950, 3200, 3300],
        borderColor: "rgb(244, 63, 94)",
        backgroundColor: "rgba(244, 63, 94, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const feeCollectionData = {
    labels: ["Tuition", "Transport", "Hostel", "Books", "Uniform", "Others"],
    datasets: [
      {
        label: "Fee Collection",
        data: [65, 12, 8, 5, 7, 3],
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(244, 63, 94, 0.8)",
          "rgba(234, 179, 8, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(59, 130, 246, 0.8)",
        ],
      },
    ],
  };

  const expenseBreakdownData = {
    labels: [
      "Salaries",
      "Maintenance",
      "Utilities",
      "Supplies",
      "Events",
      "Others",
    ],
    datasets: [
      {
        data: [55, 15, 10, 8, 7, 5],
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(244, 63, 94, 0.8)",
          "rgba(234, 179, 8, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(59, 130, 246, 0.8)",
        ],
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Finance Dashboard
          </h1>
          <p className="text-muted-foreground">
            Overview of the school's financial status and performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DatePicker />
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
            <CardDescription>
              Monthly comparison for the current year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [
                  {
                    label: "Revenue",
                    data: [3200, 3500, 3800, 3600, 3900, 4100],
                    borderColor: "rgb(99, 102, 241)",
                    backgroundColor: "rgba(99, 102, 241, 0.1)",
                    tension: 0.4,
                  },
                  {
                    label: "Expenses",
                    data: [2800, 2900, 3100, 2950, 3200, 3300],
                    borderColor: "rgb(244, 63, 94)",
                    backgroundColor: "rgba(244, 63, 94, 0.1)",
                    tension: 0.4,
                  },
                ],
              }}
              height={300}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fee Collection by Category</CardTitle>
            <CardDescription>Distribution of collected fees</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart data={feeCollectionData} height={300} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>
              Distribution of expenses by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart data={expenseBreakdownData} height={300} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Fee Collection</CardTitle>
            <CardDescription>
              Fee collection trend for the current year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [
                  {
                    label: "Fee Collection",
                    data: [3000, 3200, 3100, 3400, 3600, 3800],
                    backgroundColor: "rgba(99, 102, 241, 0.8)",
                  },
                ],
              }}
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest financial transactions</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-5 p-4 font-medium border-b">
                <div>Transaction ID</div>
                <div>Date</div>
                <div>Description</div>
                <div>Amount</div>
                <div>Status</div>
              </div>
              {[
                {
                  id: "TRX-7829",
                  date: "2023-07-15",
                  description: "Fee Payment - Grade 10",
                  amount: "₹45,000",
                  status: "Completed",
                },
                {
                  id: "TRX-7830",
                  date: "2023-07-14",
                  description: "Salary Payment - Teaching Staff",
                  amount: "₹1,250,000",
                  status: "Completed",
                },
                {
                  id: "TRX-7831",
                  date: "2023-07-14",
                  description: "Utility Bills Payment",
                  amount: "₹85,000",
                  status: "Completed",
                },
                {
                  id: "TRX-7832",
                  date: "2023-07-13",
                  description: "Library Books Purchase",
                  amount: "₹120,000",
                  status: "Pending",
                },
                {
                  id: "TRX-7833",
                  date: "2023-07-12",
                  description: "Transport Fee Collection",
                  amount: "₹350,000",
                  status: "Completed",
                },
              ].map((transaction, i) => (
                <div
                  key={i}
                  className="grid grid-cols-5 p-4 border-b last:border-0 items-center"
                >
                  <div className="font-medium">{transaction.id}</div>
                  <div className="text-muted-foreground">
                    {transaction.date}
                  </div>
                  <div>{transaction.description}</div>
                  <div>{transaction.amount}</div>
                  <div>
                    <Badge
                      variant={
                        transaction.status === "Completed"
                          ? "outline"
                          : "secondary"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
