import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { ArrowLeft, Trash2, Upload } from "lucide-react";
import Link from "next/link";

export default function AddExpensePage() {
  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-2">
        <Link href="/admin/finance">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Add New Expense</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expense Details</CardTitle>
          <CardDescription>Record a new expense for the school</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="expense-number">Expense ID</Label>
              <Input
                id="expense-number"
                placeholder="EXP-00001"
                readOnly
                value="EXP-00001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expense-date">Expense Date</Label>
              <DatePicker />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="expense-category">Expense Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select expense category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salary">Salary & Wages</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="supplies">Educational Supplies</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="transport">Transportation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expense-title">Expense Title</Label>
            <Input
              id="expense-title"
              placeholder="Enter a title for this expense"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input id="amount" type="number" placeholder="0.00" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vendor">Vendor/Payee</Label>
            <Input id="vendor" placeholder="Enter vendor or payee name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reference">
              Reference Number (Invoice/Bill Number)
            </Label>
            <Input id="reference" placeholder="Enter reference number" />
          </div>

          <div className="space-y-4">
            <Label>Attachments</Label>
            <div className="border-2 border-dashed rounded-md p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Supports: PDF, JPG, PNG (Max size: 5MB)
              </p>
              <Button variant="outline" className="mt-4">
                Upload Receipt
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center">
                  <div className="bg-muted p-2 rounded mr-2">
                    <FileIcon className="h-4 w-4 text-primary" />
                  </div>
                  <span>Invoice-123.pdf</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Description/Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter any additional details about this expense"
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <div className="space-x-2">
            <Button variant="outline">Save as Draft</Button>
            <Button>Record Expense</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

// Simple file icon component
function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}
