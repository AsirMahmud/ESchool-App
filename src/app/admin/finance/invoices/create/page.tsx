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
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CreateInvoicePage() {
  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-2">
        <Link href="/admin/finance">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">
          Create New Invoice
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
          <CardDescription>
            Create a new invoice for a student or class
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="invoice-number">Invoice Number</Label>
              <Input
                id="invoice-number"
                placeholder="INV-00001"
                readOnly
                value="INV-00001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoice-date">Invoice Date</Label>
              <DatePicker />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="invoice-type">Invoice Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select invoice type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tuition">Tuition Fee</SelectItem>
                  <SelectItem value="transport">Transport Fee</SelectItem>
                  <SelectItem value="exam">Examination Fee</SelectItem>
                  <SelectItem value="library">Library Fee</SelectItem>
                  <SelectItem value="other">Other Fee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="due-date">Due Date</Label>
              <DatePicker />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Invoice For</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select invoice target" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Individual Student</SelectItem>
                    <SelectItem value="class">Entire Class</SelectItem>
                    <SelectItem value="grade">Entire Grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student/class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student1">
                      Rahul Sharma (ID: ST-001)
                    </SelectItem>
                    <SelectItem value="student2">
                      Priya Patel (ID: ST-002)
                    </SelectItem>
                    <SelectItem value="student3">
                      Amit Kumar (ID: ST-003)
                    </SelectItem>
                    <SelectItem value="class1">Class 10-A</SelectItem>
                    <SelectItem value="class2">Class 9-B</SelectItem>
                    <SelectItem value="grade1">
                      Grade 8 (All Sections)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Invoice Items</h3>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>

            <div className="border rounded-md">
              <div className="grid grid-cols-12 gap-2 p-4 border-b bg-muted/50 font-medium text-sm">
                <div className="col-span-5">Description</div>
                <div className="col-span-2">Quantity</div>
                <div className="col-span-2">Rate (₹)</div>
                <div className="col-span-2">Amount (₹)</div>
                <div className="col-span-1"></div>
              </div>

              {[
                {
                  id: 1,
                  desc: "Tuition Fee - Term 1",
                  qty: 1,
                  rate: 25000,
                  amount: 25000,
                },
                {
                  id: 2,
                  desc: "Laboratory Fee",
                  qty: 1,
                  rate: 5000,
                  amount: 5000,
                },
                {
                  id: 3,
                  desc: "Library Fee",
                  qty: 1,
                  rate: 2000,
                  amount: 2000,
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-2 p-4 border-b items-center"
                >
                  <div className="col-span-5">
                    <Input value={item.desc} />
                  </div>
                  <div className="col-span-2">
                    <Input type="number" value={item.qty} min="1" />
                  </div>
                  <div className="col-span-2">
                    <Input type="number" value={item.rate} min="0" />
                  </div>
                  <div className="col-span-2">
                    <Input value={item.amount} readOnly />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-12 gap-2 p-4 items-center">
                <div className="col-span-5 md:col-span-7 text-right font-medium">
                  Subtotal:
                </div>
                <div className="col-span-6 md:col-span-4 flex justify-between">
                  <span>₹</span>
                  <span>32,000.00</span>
                </div>
                <div className="col-span-1"></div>
              </div>

              <div className="grid grid-cols-12 gap-2 px-4 pb-2 items-center">
                <div className="col-span-5 md:col-span-7 text-right font-medium">
                  Tax (18% GST):
                </div>
                <div className="col-span-6 md:col-span-4 flex justify-between">
                  <span>₹</span>
                  <span>5,760.00</span>
                </div>
                <div className="col-span-1"></div>
              </div>

              <div className="grid grid-cols-12 gap-2 px-4 pb-4 items-center">
                <div className="col-span-5 md:col-span-7 text-right font-medium text-lg">
                  Total:
                </div>
                <div className="col-span-6 md:col-span-4 flex justify-between font-bold text-lg">
                  <span>₹</span>
                  <span>37,760.00</span>
                </div>
                <div className="col-span-1"></div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter any additional notes or payment instructions"
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Save as Draft</Button>
          <div className="space-x-2">
            <Button variant="outline">Preview</Button>
            <Button>Create & Send Invoice</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
