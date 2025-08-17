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
  Receipt,
  Search,
  SlidersHorizontal,
} from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">
            Track and manage all payment transactions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Record Payment
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
              placeholder="Search payments..."
              className="pl-8 w-full md:w-[250px]"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Payment Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Modes</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="cheque">Cheque</SelectItem>
              <SelectItem value="online">Online Transfer</SelectItem>
              <SelectItem value="card">Card Payment</SelectItem>
              <SelectItem value="upi">UPI</SelectItem>
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
            <CardTitle>Payment Transactions</CardTitle>
            <CardDescription>
              A list of all payment transactions in the system
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
                    Transaction ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Invoice #</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Payment Mode</TableHead>
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
                  id: "TRX-78291",
                  student: "Rahul Sharma",
                  invoice: "INV-2023-001",
                  date: "15/07/2023",
                  mode: "Online Transfer",
                  amount: "₹45,000",
                  status: "Successful",
                },
                {
                  id: "TRX-78292",
                  student: "Priya Patel",
                  invoice: "INV-2023-002",
                  date: "14/07/2023",
                  mode: "UPI",
                  amount: "₹38,000",
                  status: "Successful",
                },
                {
                  id: "TRX-78293",
                  student: "Vikram Singh",
                  invoice: "INV-2023-005",
                  date: "13/07/2023",
                  mode: "Cheque",
                  amount: "₹48,000",
                  status: "Pending",
                },
                {
                  id: "TRX-78294",
                  student: "Ananya Mishra",
                  invoice: "INV-2023-008",
                  date: "12/07/2023",
                  mode: "Cash",
                  amount: "₹34,000",
                  status: "Successful",
                },
                {
                  id: "TRX-78295",
                  student: "Amit Kumar",
                  invoice: "INV-2023-003",
                  date: "10/07/2023",
                  mode: "Card Payment",
                  amount: "₹26,000",
                  status: "Successful",
                },
                {
                  id: "TRX-78296",
                  student: "Amit Kumar",
                  invoice: "INV-2023-003",
                  date: "10/07/2023",
                  mode: "Card Payment",
                  amount: "₹26,000",
                  status: "Failed",
                },
                {
                  id: "TRX-78297",
                  student: "Neha Verma",
                  invoice: "INV-2023-006",
                  date: "09/07/2023",
                  mode: "UPI",
                  amount: "₹21,000",
                  status: "Successful",
                },
                {
                  id: "TRX-78298",
                  student: "Neha Verma",
                  invoice: "INV-2023-006",
                  date: "09/07/2023",
                  mode: "UPI",
                  amount: "₹21,000",
                  status: "Refunded",
                },
                {
                  id: "TRX-78299",
                  student: "Divya Joshi",
                  invoice: "INV-2023-010",
                  date: "08/07/2023",
                  mode: "Online Transfer",
                  amount: "₹15,000",
                  status: "Successful",
                },
                {
                  id: "TRX-78300",
                  student: "Karan Malhotra",
                  invoice: "INV-2023-009",
                  date: "07/07/2023",
                  mode: "Cheque",
                  amount: "₹16,000",
                  status: "Pending",
                },
              ].map((payment, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.student}</TableCell>
                  <TableCell>{payment.invoice}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.mode}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        payment.status === "Successful"
                          ? "bg-green-50 text-green-700 hover:bg-green-50"
                          : payment.status === "Pending"
                          ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-50"
                          : payment.status === "Failed"
                          ? "bg-red-50 text-red-700 hover:bg-red-50"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-50"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Receipt className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Printer className="h-4 w-4" />
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
              <strong>50</strong> results
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
