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
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RecordPaymentPage() {
  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-2">
        <Link href="/admin/finance">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Record Payment</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>
            Record a new payment from a student or parent
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="payment-number">Payment Receipt Number</Label>
              <Input
                id="payment-number"
                placeholder="RCT-00001"
                readOnly
                value="RCT-00001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-date">Payment Date</Label>
              <DatePicker />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Student Information</Label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input placeholder="Search by student ID or name" />
              </div>
              <Button variant="secondary" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Student ID</p>
                  <p className="font-medium">ST-001</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Student Name</p>
                  <p className="font-medium">Rahul Sharma</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Class</p>
                  <p className="font-medium">10-A</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Parent Name</p>
                  <p className="font-medium">Vikram Sharma</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Label>Outstanding Invoices</Label>
            <div className="border rounded-md">
              <div className="grid grid-cols-12 gap-2 p-4 border-b bg-muted/50 font-medium text-sm">
                <div className="col-span-1">Select</div>
                <div className="col-span-3">Invoice Number</div>
                <div className="col-span-3">Date</div>
                <div className="col-span-2">Amount (₹)</div>
                <div className="col-span-3">Status</div>
              </div>

              {[
                {
                  id: "INV-00123",
                  date: "2023-06-15",
                  amount: 37760,
                  status: "Unpaid",
                  selected: true,
                },
                {
                  id: "INV-00098",
                  date: "2023-05-10",
                  amount: 12500,
                  status: "Partially Paid",
                  selected: false,
                },
                {
                  id: "INV-00076",
                  date: "2023-04-05",
                  amount: 8000,
                  status: "Unpaid",
                  selected: false,
                },
              ].map((invoice) => (
                <div
                  key={invoice.id}
                  className="grid grid-cols-12 gap-2 p-4 border-b items-center"
                >
                  <div className="col-span-1">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      defaultChecked={invoice.selected}
                    />
                  </div>
                  <div className="col-span-3 font-medium">{invoice.id}</div>
                  <div className="col-span-3">{invoice.date}</div>
                  <div className="col-span-2">
                    ₹{invoice.amount.toLocaleString()}
                  </div>
                  <div className="col-span-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        invoice.status === "Unpaid"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-12 gap-2 p-4 items-center font-medium">
                <div className="col-span-7 md:col-span-9 text-right">
                  Total Selected:
                </div>
                <div className="col-span-5 md:col-span-3">₹37,760.00</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="payment-amount">Payment Amount (₹)</Label>
              <Input
                id="payment-amount"
                type="number"
                placeholder="0.00"
                value="37760.00"
              />
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
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 payment-details">
            <Label>Payment Details</Label>
            <RadioGroup defaultValue="full" className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full" id="full" />
                <Label htmlFor="full" className="cursor-pointer">
                  Full Payment
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partial" id="partial" />
                <Label htmlFor="partial" className="cursor-pointer">
                  Partial Payment
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reference">
              Reference Number (Cheque/Transaction ID)
            </Label>
            <Input id="reference" placeholder="Enter reference number" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter any additional notes about this payment"
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <div className="space-x-2">
            <Button variant="outline">Save as Draft</Button>
            <Button>Record Payment</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
