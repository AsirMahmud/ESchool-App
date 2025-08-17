import { ArrowUpDown, Download, Filter, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FeeManagement() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Fee Management</h1>
        <p className="text-muted-foreground">
          Manage student fees, payments, and generate invoices.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
              className="w-full pl-8 sm:w-[300px]"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Fee
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all-fees" className="w-full">
        <TabsList>
          <TabsTrigger value="all-fees">All Fees</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>
        <TabsContent value="all-fees" className="border-none p-0 pt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Fee Records</CardTitle>
                  <CardDescription>
                    Manage and track all student fee records
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="current">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Term</SelectItem>
                      <SelectItem value="previous">Previous Term</SelectItem>
                      <SelectItem value="all">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        Student Name
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Fee Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">FEE-1001</TableCell>
                    <TableCell>John Smith</TableCell>
                    <TableCell>Grade 10-A</TableCell>
                    <TableCell>Tuition Fee</TableCell>
                    <TableCell>$1,250.00</TableCell>
                    <TableCell>Apr 15, 2023</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                        Pending
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">FEE-1002</TableCell>
                    <TableCell>Sarah Johnson</TableCell>
                    <TableCell>Grade 8-B</TableCell>
                    <TableCell>Library Fee</TableCell>
                    <TableCell>$150.00</TableCell>
                    <TableCell>Mar 30, 2023</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Paid
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">FEE-1003</TableCell>
                    <TableCell>Michael Brown</TableCell>
                    <TableCell>Grade 6-C</TableCell>
                    <TableCell>Registration Fee</TableCell>
                    <TableCell>$500.00</TableCell>
                    <TableCell>Mar 25, 2023</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Paid
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">FEE-1004</TableCell>
                    <TableCell>Emily Davis</TableCell>
                    <TableCell>Grade 11-A</TableCell>
                    <TableCell>Lab Fee</TableCell>
                    <TableCell>$350.00</TableCell>
                    <TableCell>Mar 15, 2023</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                        Overdue
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">FEE-1005</TableCell>
                    <TableCell>David Wilson</TableCell>
                    <TableCell>Grade 9-B</TableCell>
                    <TableCell>Tuition Fee</TableCell>
                    <TableCell>$1,250.00</TableCell>
                    <TableCell>Apr 15, 2023</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                        Pending
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="border-none p-0 pt-4">
          {/* Similar content for pending fees */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Fees</CardTitle>
              <CardDescription>
                All fees that are pending payment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Pending fees content would appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="paid" className="border-none p-0 pt-4">
          {/* Similar content for paid fees */}
          <Card>
            <CardHeader>
              <CardTitle>Paid Fees</CardTitle>
              <CardDescription>All fees that have been paid</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Paid fees content would appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="overdue" className="border-none p-0 pt-4">
          {/* Similar content for overdue fees */}
          <Card>
            <CardHeader>
              <CardTitle>Overdue Fees</CardTitle>
              <CardDescription>
                All fees that are past their due date
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Overdue fees content would appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
