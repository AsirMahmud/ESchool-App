import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Download,
  FileText,
  PieChart,
  Plus,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BudgetPage() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/admin/finance">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">
            Budget Management
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Budget
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <p className="text-muted-foreground">
          Manage and track school budget allocations and expenditures
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select defaultValue="2023-2024">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select academic year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023-2024">2023-2024</SelectItem>
              <SelectItem value="2022-2023">2022-2023</SelectItem>
              <SelectItem value="2021-2022">2021-2022</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="q2">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select quarter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="q1">Q1 (Apr-Jun)</SelectItem>
              <SelectItem value="q2">Q2 (Jul-Sep)</SelectItem>
              <SelectItem value="q3">Q3 (Oct-Dec)</SelectItem>
              <SelectItem value="q4">Q4 (Jan-Mar)</SelectItem>
              <SelectItem value="all">All Quarters</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹48,500,000</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Academic Year 2023-2024</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Spent to Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹32,125,000</div>
            <div className="flex items-center text-sm">
              <span className="text-amber-500 font-medium">
                66.2% of budget
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Remaining Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹16,375,000</div>
            <div className="flex items-center text-sm">
              <span className="text-green-500 font-medium">
                33.8% remaining
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
              <CardDescription>
                Overall budget allocation and utilization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-center items-center">
                  <div className="w-64 h-64 rounded-full border-8 border-primary/20 relative flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full border-8 border-primary/40 relative flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-primary/10 flex flex-col items-center justify-center">
                        <PieChart className="h-8 w-8 text-primary mb-1" />
                        <span className="text-xl font-bold">66.2%</span>
                        <span className="text-xs text-muted-foreground">
                          Budget Used
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 -mr-2 -mt-2">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        On Track
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Budget Utilization by Quarter
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Q1 (Apr-Jun)</span>
                        <span className="font-medium">100%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Q2 (Jul-Sep)</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Q3 (Oct-Dec)</span>
                        <span className="font-medium">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Q4 (Jan-Mar)</span>
                        <span className="font-medium">0%</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Major Budget Categories</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Salaries & Benefits</span>
                      <span className="font-medium">₹24,250,000 (50%)</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Infrastructure & Maintenance</span>
                      <span className="font-medium">₹9,700,000 (20%)</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Educational Resources</span>
                      <span className="font-medium">₹7,275,000 (15%)</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Administrative Expenses</span>
                      <span className="font-medium">₹4,850,000 (10%)</span>
                    </div>
                    <Progress value={55} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Miscellaneous</span>
                      <span className="font-medium">₹2,425,000 (5%)</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Budget Adjustments</CardTitle>
              <CardDescription>
                Latest changes to budget allocations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "ADJ-001",
                    date: "2023-08-15",
                    description: "Increased IT infrastructure budget",
                    amount: "+₹500,000",
                    category: "Infrastructure",
                    approvedBy: "Principal",
                  },
                  {
                    id: "ADJ-002",
                    date: "2023-08-10",
                    description: "Reduced administrative supplies budget",
                    amount: "-₹150,000",
                    category: "Administrative",
                    approvedBy: "Finance Committee",
                  },
                  {
                    id: "ADJ-003",
                    date: "2023-07-28",
                    description: "Additional funds for science lab equipment",
                    amount: "+₹350,000",
                    category: "Educational Resources",
                    approvedBy: "Board of Directors",
                  },
                  {
                    id: "ADJ-004",
                    date: "2023-07-15",
                    description: "Emergency building repairs",
                    amount: "+₹275,000",
                    category: "Maintenance",
                    approvedBy: "Principal",
                  },
                ].map((adjustment, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full p-2 bg-muted">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{adjustment.description}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>{adjustment.id}</span>
                          <span className="mx-1">•</span>
                          <span>{adjustment.date}</span>
                          <span className="mx-1">•</span>
                          <span>{adjustment.category}</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`font-medium ${
                        adjustment.amount.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {adjustment.amount}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Adjustments
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Budgets</CardTitle>
              <CardDescription>
                Budget allocation and utilization by department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    name: "Academic Department",
                    allocated: 18500000,
                    spent: 12950000,
                  },
                  {
                    name: "Administrative Department",
                    allocated: 8500000,
                    spent: 5950000,
                  },
                  {
                    name: "Facilities & Maintenance",
                    allocated: 7500000,
                    spent: 4875000,
                  },
                  {
                    name: "Sports & Extra-curricular",
                    allocated: 5000000,
                    spent: 3250000,
                  },
                  { name: "IT Department", allocated: 4500000, spent: 3150000 },
                  { name: "Library", allocated: 2500000, spent: 1250000 },
                  { name: "Transportation", allocated: 2000000, spent: 700000 },
                ].map((dept, i) => {
                  const percentSpent = Math.round(
                    (dept.spent / dept.allocated) * 100
                  );
                  return (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{dept.name}</h3>
                        <Badge
                          variant="outline"
                          className={`${
                            percentSpent > 90
                              ? "bg-red-50 text-red-700"
                              : percentSpent > 75
                              ? "bg-amber-50 text-amber-700"
                              : "bg-green-50 text-green-700"
                          }`}
                        >
                          {percentSpent}% Used
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">
                          ₹{(dept.spent / 1000000).toFixed(1)}M of ₹
                          {(dept.allocated / 1000000).toFixed(1)}M
                        </span>
                        <span className="font-medium">
                          ₹
                          {((dept.allocated - dept.spent) / 1000000).toFixed(1)}
                          M left
                        </span>
                      </div>
                      <Progress value={percentSpent} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Department Budget Details
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Categories</CardTitle>
              <CardDescription>
                Budget allocation and utilization by expense category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    name: "Salaries & Benefits",
                    allocated: 24250000,
                    spent: 16975000,
                  },
                  {
                    name: "Infrastructure & Maintenance",
                    allocated: 9700000,
                    spent: 6305000,
                  },
                  {
                    name: "Educational Resources",
                    allocated: 7275000,
                    spent: 5820000,
                  },
                  {
                    name: "Administrative Expenses",
                    allocated: 4850000,
                    spent: 2667500,
                  },
                  { name: "Utilities", allocated: 1455000, spent: 1018500 },
                  { name: "Transportation", allocated: 970000, spent: 339500 },
                ].map((category, i) => {
                  const percentSpent = Math.round(
                    (category.spent / category.allocated) * 100
                  );
                  return (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{category.name}</h3>
                        <Badge
                          variant="outline"
                          className={`${
                            percentSpent > 90
                              ? "bg-red-50 text-red-700"
                              : percentSpent > 75
                              ? "bg-amber-50 text-amber-700"
                              : "bg-green-50 text-green-700"
                          }`}
                        >
                          {percentSpent}% Used
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">
                          ₹{(category.spent / 1000000).toFixed(1)}M of ₹
                          {(category.allocated / 1000000).toFixed(1)}M
                        </span>
                        <span className="font-medium">
                          ₹
                          {(
                            (category.allocated - category.spent) /
                            1000000
                          ).toFixed(1)}
                          M left
                        </span>
                      </div>
                      <Progress value={percentSpent} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Category Budget Details
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Reports</CardTitle>
              <CardDescription>
                Generate and view budget reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Quarterly Budget Report",
                    description:
                      "Detailed breakdown of budget utilization by quarter",
                    icon: <FileText className="h-8 w-8 text-primary" />,
                  },
                  {
                    title: "Department Expense Report",
                    description: "Expense analysis by department with variance",
                    icon: <PieChart className="h-8 w-8 text-primary" />,
                  },
                  {
                    title: "Budget vs Actual Report",
                    description:
                      "Comparison of planned budget against actual expenses",
                    icon: <FileText className="h-8 w-8 text-primary" />,
                  },
                  {
                    title: "Budget Forecast Report",
                    description: "Projected expenses for upcoming quarters",
                    icon: <PieChart className="h-8 w-8 text-primary" />,
                  },
                ].map((report, i) => (
                  <Card key={i} className="border-dashed">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="bg-primary/10 p-3 rounded-full mb-4">
                        {report.icon}
                      </div>
                      <h3 className="font-medium mb-1">{report.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {report.description}
                      </p>
                      <Button variant="outline" className="w-full">
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
