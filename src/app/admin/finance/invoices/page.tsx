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
  Download,
  Edit,
  Eye,
  Filter,
  Mail,
  Plus,
  Printer,
  Search,
  SlidersHorizontal,
} from "lucide-react";

export default function InvoicesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">
            Manage and track all invoices generated in the system
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
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
              placeholder="Search invoices..."
              className="pl-8 w-full md:w-[250px]"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
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
            <CardTitle>All Invoices</CardTitle>
            <CardDescription>
              A list of all invoices generated in the system
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
                <TableHead>Invoice #</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  id: "INV-2023-001",
                  student: "Rahul Sharma",
                  class: "Class 10-A",
                  issueDate: "01/07/2023",
                  dueDate: "15/07/2023",
                  amount: "₹45,000",
                  status: "Paid",
                },
                {
                  id: "INV-2023-002",
                  student: "Priya Patel",
                  class: "Class 8-B",
                  issueDate: "01/07/2023",
                  dueDate: "15/07/2023",
                  amount: "₹38,000",
                  status: "Paid",
                },
                {
                  id: "INV-2023-003",
                  student: "Amit Kumar",
                  class: "Class 12-A",
                  issueDate: "01/07/2023",
                  dueDate: "15/07/2023",
                  amount: "₹52,000",
                  status: "Pending",
                },
                {
                  id: "INV-2023-004",
                  student: "Sneha Gupta",
                  class: "Class 5-C",
                  issueDate: "01/07/2023",
                  dueDate: "15/07/2023",
                  amount: "₹35,000",
                  status: "Overdue",
                },
                {
                  id: "INV-2023-005",
                  student: "Vikram Singh",
                  class: "Class 11-B",
                  issueDate: "01/07/2023",
                  dueDate: "15/07/2023",
                  amount: "₹48,000",
                  status: "Paid",
                },
                {
                  id: "INV-2023-006",
                  student: "Neha Verma",
                  class: "Class 9-A",
                  issueDate: "01/07/2023",
                  dueDate: "15/07/2023",
                  amount: "₹42,000",
                  status: "Pending",
                },
                {
                  id: "INV-2023-007",
                  student: "Rajesh Khanna",
                  class: "Class 7-B",
                  issueDate: "01/07/2023",
                  dueDate: "15/07/2023",
                  amount: "₹36,000",
                  status: "Cancelled",
                },
                {
                  id: "INV-2023-008",
                  student: "Ananya Mishra",
                  class: "Class 6-A",
                  issueDate: "01/07/2023",
                  dueDate: "15/07/2023",
                  amount: "₹34,000",
                  status: "Paid",
                },
                {
                  id: "INV-2023-009",
                  student: "Karan Malhotra",
                  class: "Class 4-B",
                  issueDate: "01/07/2023",
                  dueDate: "15/07/2023",
                  amount: "₹32,000",
                  status: "Overdue",
                },
                {
                  id: "INV-2023-010",
                  student: "Divya Joshi",
                  class: "Class 3-C",
                  issueDate: "01/07/2023",
                  dueDate: "15/07/2023",
                  amount: "₹30,000",
                  status: "Pending",
                },
              ].map((invoice, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.student}</TableCell>
                  <TableCell>{invoice.class}</TableCell>
                  <TableCell>{invoice.issueDate}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        invoice.status === "Paid"
                          ? "bg-green-50 text-green-700 hover:bg-green-50"
                          : invoice.status === "Pending"
                          ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-50"
                          : invoice.status === "Overdue"
                          ? "bg-red-50 text-red-700 hover:bg-red-50"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-50"
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Printer className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Mail className="h-4 w-4" />
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
              <strong>100</strong> results
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
