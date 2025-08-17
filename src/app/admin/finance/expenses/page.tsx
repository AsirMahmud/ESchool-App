import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { DatePicker } from "@/components/ui/date-picker";
import {
  ArrowUpDown,
  Download,
  Eye,
  Filter,
  Plus,
  Printer,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import Link from "next/link";

export default function ExpensesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
          <p className="text-muted-foreground">
            Track and manage all school expenses
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/finance/expenses/add">
            <Button variant="default">
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </Link>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search expenses..."
              className="pl-8 w-full md:w-[250px]"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="salary">Salary</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
              <SelectItem value="supplies">Supplies</SelectItem>
              <SelectItem value="events">Events</SelectItem>
              <SelectItem value="others">Others</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2 items-center">
            <DatePicker placeholder="From Date" />
            <span className="text-muted-foreground">to</span>
            <DatePicker placeholder="To Date" />
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filter
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Expense Transactions</CardTitle>
            <CardDescription>
              A list of all expense transactions in the system
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Columns
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="flex items-center">
                    Expense ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  id: "EXP-2023-001",
                  description: "Staff Salary - July 2023",
                  category: "Salary",
                  date: "31/07/2023",
                  method: "Bank Transfer",
                  amount: "₹1,250,000",
                  status: "Paid",
                },
                {
                  id: "EXP-2023-002",
                  description: "Electricity Bill - July 2023",
                  category: "Utilities",
                  date: "15/07/2023",
                  method: "Online Payment",
                  amount: "₹45,000",
                  status: "Paid",
                },
                {
                  id: "EXP-2023-003",
                  description: "Water Bill - July 2023",
                  category: "Utilities",
                  date: "15/07/2023",
                  method: "Online Payment",
                  amount: "₹12,000",
                  status: "Paid",
                },
                {
                  id: "EXP-2023-004",
                  description: "Classroom Furniture",
                  category: "Maintenance",
                  date: "10/07/2023",
                  method: "Cheque",
                  amount: "₹85,000",
                  status: "Paid",
                },
                {
                  id: "EXP-2023-005",
                  description: "Library Books Purchase",
                  category: "Supplies",
                  date: "08/07/2023",
                  method: "Bank Transfer",
                  amount: "₹120,000",
                  status: "Pending",
                },
                {
                  id: "EXP-2023-006",
                  description: "Sports Equipment",
                  category: "Supplies",
                  date: "05/07/2023",
                  method: "Cheque",
                  amount: "₹65,000",
                  status: "Paid",
                },
                {
                  id: "EXP-2023-007",
                  description: "Annual Day Preparations",
                  category: "Events",
                  date: "03/07/2023",
                  method: "Cash",
                  amount: "₹35,000",
                  status: "Paid",
                },
                {
                  id: "EXP-2023-008",
                  description: "Computer Lab Maintenance",
                  category: "Maintenance",
                  date: "01/07/2023",
                  method: "Bank Transfer",
                  amount: "₹28,000",
                  status: "Paid",
                },
                {
                  id: "EXP-2023-009",
                  description: "Stationery Supplies",
                  category: "Supplies",
                  date: "01/07/2023",
                  method: "Cash",
                  amount: "₹18,000",
                  status: "Paid",
                },
                {
                  id: "EXP-2023-010",
                  description: "Building Repair Work",
                  category: "Maintenance",
                  date: "28/06/2023",
                  method: "Cheque",
                  amount: "₹75,000",
                  status: "Pending",
                },
              ].map((expense, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.method}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        expense.status === "Paid"
                          ? "bg-green-50 text-green-700 hover:bg-green-50"
                          : "bg-yellow-50 text-yellow-700 hover:bg-yellow-50"
                      }
                    >
                      {expense.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Printer className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              Showing <strong>1</strong> to <strong>10</strong> of{" "}
              <strong>45</strong> results
            </div>
            <div className="space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
