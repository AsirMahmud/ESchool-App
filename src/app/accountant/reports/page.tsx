"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Download, FileText, Printer } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AccountantReportsPage() {
  // Sample data for charts
  const monthlyRevenueData = [
    { name: "Jan", revenue: 45000, expenses: 32000 },
    { name: "Feb", revenue: 52000, expenses: 34000 },
    { name: "Mar", revenue: 48000, expenses: 36000 },
    { name: "Apr", revenue: 51000, expenses: 35000 },
    { name: "May", revenue: 54000, expenses: 37000 },
    { name: "Jun", revenue: 58000, expenses: 39000 },
    { name: "Jul", revenue: 59000, expenses: 38000 },
    { name: "Aug", revenue: 62000, expenses: 40000 },
    { name: "Sep", revenue: 65000, expenses: 41000 },
    { name: "Oct", revenue: 68000, expenses: 42000 },
    { name: "Nov", revenue: 72000, expenses: 45000 },
    { name: "Dec", revenue: 75000, expenses: 48000 },
  ];

  const feeCollectionData = [
    { name: "Tuition Fees", value: 65 },
    { name: "Transport Fees", value: 15 },
    { name: "Library Fees", value: 10 },
    { name: "Lab Fees", value: 5 },
    { name: "Other Fees", value: 5 },
  ];

  const expenseBreakdownData = [
    { name: "Salaries", value: 55 },
    { name: "Infrastructure", value: 20 },
    { name: "Utilities", value: 10 },
    { name: "Supplies", value: 8 },
    { name: "Miscellaneous", value: 7 },
  ];

  const classWiseFeeData = [
    { name: "Class 1", paid: 95, pending: 5 },
    { name: "Class 2", paid: 90, pending: 10 },
    { name: "Class 3", paid: 85, pending: 15 },
    { name: "Class 4", paid: 92, pending: 8 },
    { name: "Class 5", paid: 88, pending: 12 },
    { name: "Class 6", paid: 80, pending: 20 },
    { name: "Class 7", paid: 82, pending: 18 },
    { name: "Class 8", paid: 78, pending: 22 },
    { name: "Class 9", paid: 75, pending: 25 },
    { name: "Class 10", paid: 70, pending: 30 },
  ];

  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
  const EXPENSE_COLORS = [
    "#FF8042",
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#8884d8",
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Financial Reports
          </h1>
          <p className="text-muted-foreground">
            Comprehensive financial analytics and reporting tools
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[240px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>Date Range: Last 30 days</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                defaultMonth={new Date()}
                numberOfMonths={2}
                className="border rounded-md"
              />
              <div className="p-3 border-t flex justify-between">
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Apply Range</Button>
              </div>
            </PopoverContent>
          </Popover>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="fee-collection">Fee Collection</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$709,000</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last year
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Expenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$467,000</div>
                <p className="text-xs text-muted-foreground">
                  +12.5% from last year
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Net Profit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$242,000</div>
                <p className="text-xs text-muted-foreground">
                  +38.2% from last year
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Fee Collection Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87.5%</div>
                <p className="text-xs text-muted-foreground">
                  +2.5% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Revenue vs Expenses</CardTitle>
                <CardDescription>
                  Monthly financial comparison for the current year
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyRevenueData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#0088FE"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="expenses"
                        stroke="#FF8042"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Fee Collection by Category</CardTitle>
                <CardDescription>Distribution of fee types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={feeCollectionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {feeCollectionData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fee-collection" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Fees Collected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$458,500</div>
                <p className="text-xs text-muted-foreground">
                  +15.3% from last year
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Fees
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$65,750</div>
                <p className="text-xs text-muted-foreground">
                  -3.2% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Overdue Fees
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$32,800</div>
                <p className="text-xs text-muted-foreground">
                  +5.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Fee Defaulters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124</div>
                <p className="text-xs text-muted-foreground">
                  +12 from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Class-wise Fee Collection Status</CardTitle>
              <CardDescription>
                Percentage of fees paid vs pending by class
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={classWiseFeeData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="paid"
                      stackId="a"
                      fill="#0088FE"
                      name="Paid %"
                    />
                    <Bar
                      dataKey="pending"
                      stackId="a"
                      fill="#FF8042"
                      name="Pending %"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">View Detailed Report</Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Expenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$467,000</div>
                <p className="text-xs text-muted-foreground">
                  +12.5% from last year
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Salary Expenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$256,850</div>
                <p className="text-xs text-muted-foreground">
                  +8.3% from last year
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Infrastructure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$93,400</div>
                <p className="text-xs text-muted-foreground">
                  +22.7% from last year
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Operational Costs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$116,750</div>
                <p className="text-xs text-muted-foreground">
                  +15.2% from last year
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>
                  Distribution of expenses by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseBreakdownData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {expenseBreakdownData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Monthly Expense Trend</CardTitle>
                <CardDescription>
                  Expense pattern over the current year
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyRevenueData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="expenses"
                        stroke="#FF8042"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payroll" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Payroll
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$256,850</div>
                <p className="text-xs text-muted-foreground">
                  +8.3% from last year
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Teaching Staff
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$178,500</div>
                <p className="text-xs text-muted-foreground">
                  +7.2% from last year
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Admin Staff
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$52,350</div>
                <p className="text-xs text-muted-foreground">
                  +10.5% from last year
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Support Staff
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$26,000</div>
                <p className="text-xs text-muted-foreground">
                  +12.1% from last year
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payroll Distribution</CardTitle>
              <CardDescription>
                Monthly payroll breakdown by department
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      {
                        month: "Jan",
                        teaching: 14800,
                        admin: 4300,
                        support: 2100,
                      },
                      {
                        month: "Feb",
                        teaching: 14800,
                        admin: 4300,
                        support: 2100,
                      },
                      {
                        month: "Mar",
                        teaching: 14800,
                        admin: 4300,
                        support: 2100,
                      },
                      {
                        month: "Apr",
                        teaching: 14800,
                        admin: 4300,
                        support: 2100,
                      },
                      {
                        month: "May",
                        teaching: 14900,
                        admin: 4400,
                        support: 2200,
                      },
                      {
                        month: "Jun",
                        teaching: 14900,
                        admin: 4400,
                        support: 2200,
                      },
                      {
                        month: "Jul",
                        teaching: 14900,
                        admin: 4400,
                        support: 2200,
                      },
                      {
                        month: "Aug",
                        teaching: 14900,
                        admin: 4400,
                        support: 2200,
                      },
                      {
                        month: "Sep",
                        teaching: 15000,
                        admin: 4500,
                        support: 2300,
                      },
                      {
                        month: "Oct",
                        teaching: 15000,
                        admin: 4500,
                        support: 2300,
                      },
                      {
                        month: "Nov",
                        teaching: 15000,
                        admin: 4500,
                        support: 2300,
                      },
                      {
                        month: "Dec",
                        teaching: 15000,
                        admin: 4500,
                        support: 2300,
                      },
                    ]}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="teaching"
                      fill="#0088FE"
                      name="Teaching Staff"
                    />
                    <Bar dataKey="admin" fill="#00C49F" name="Admin Staff" />
                    <Bar
                      dataKey="support"
                      fill="#FFBB28"
                      name="Support Staff"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
              <CardDescription>
                Create customized financial reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Report Type</label>
                  <Select defaultValue="financial">
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="financial">
                        Financial Summary
                      </SelectItem>
                      <SelectItem value="fee">Fee Collection</SelectItem>
                      <SelectItem value="expense">Expense Analysis</SelectItem>
                      <SelectItem value="payroll">Payroll Report</SelectItem>
                      <SelectItem value="budget">Budget Comparison</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time Period</label>
                  <Select defaultValue="monthly">
                    <SelectTrigger>
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <label className="text-sm font-medium">Data Fields</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="revenue"
                      className="rounded border-gray-300"
                      defaultChecked
                    />
                    <label htmlFor="revenue">Revenue</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="expenses"
                      className="rounded border-gray-300"
                      defaultChecked
                    />
                    <label htmlFor="expenses">Expenses</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="profit"
                      className="rounded border-gray-300"
                      defaultChecked
                    />
                    <label htmlFor="profit">Net Profit</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="fees"
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="fees">Fee Details</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="payroll"
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="payroll">Payroll</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="budget"
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="budget">Budget</label>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <label className="text-sm font-medium">Chart Type</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="chart"
                      id="bar"
                      className="rounded border-gray-300"
                      defaultChecked
                    />
                    <label htmlFor="bar">Bar Chart</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="chart"
                      id="line"
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="line">Line Chart</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="chart"
                      id="pie"
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="pie">Pie Chart</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="chart"
                      id="table"
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="table">Table Only</label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save Template</Button>
              <Button>Generate Report</Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Saved Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>Monthly Financial Summary</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>Quarterly Fee Collection</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>Annual Budget Analysis</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>Staff Salary Report</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
