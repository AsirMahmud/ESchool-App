"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  CalendarIcon,
  DownloadIcon,
  FilterIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

export default function ExpensesManagement() {
  return (
    <div className="flex flex-col gap-5 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Expense Management
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FilterIcon className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>
              Current month expense distribution by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Salaries", value: 12000 },
                      { name: "Utilities", value: 3500 },
                      { name: "Supplies", value: 2200 },
                      { name: "Maintenance", value: 1800 },
                      { name: "Technology", value: 4500 },
                      { name: "Other", value: 1200 },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    <Cell fill="#8884d8" />
                    <Cell fill="#82ca9d" />
                    <Cell fill="#ffc658" />
                    <Cell fill="#ff8042" />
                    <Cell fill="#0088fe" />
                    <Cell fill="#00C49F" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Add Expense</CardTitle>
            <CardDescription>Record a new expense</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salaries">Salaries</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="supplies">Supplies</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <div className="flex">
                  <Input id="date" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Enter description" />
              </div>
              <Button type="submit" class Name="w-full">
                Add Expense
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Recent Expenses</CardTitle>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="search"
                placeholder="Search expenses..."
                className="h-9"
                prefix={
                  <SearchIcon className="h-4 w-4 text-muted-foreground" />
                }
              />
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="salaries">Salaries</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="supplies">Supplies</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  id: "EXP001",
                  category: "Salaries",
                  description: "Teacher Salaries - March",
                  date: "2025-03-25",
                  amount: "$12,000.00",
                  paymentMethod: "Bank Transfer",
                },
                {
                  id: "EXP002",
                  category: "Utilities",
                  description: "Electricity Bill",
                  date: "2025-03-22",
                  amount: "$1,250.00",
                  paymentMethod: "Direct Debit",
                },
                {
                  id: "EXP003",
                  category: "Supplies",
                  description: "Classroom Materials",
                  date: "2025-03-20",
                  amount: "$850.75",
                  paymentMethod: "Credit Card",
                },
                {
                  id: "EXP004",
                  category: "Maintenance",
                  description: "Plumbing Repairs",
                  date: "2025-03-18",
                  amount: "$450.00",
                  paymentMethod: "Cash",
                },
                {
                  id: "EXP005",
                  category: "Technology",
                  description: "Computer Lab Equipment",
                  date: "2025-03-15",
                  amount: "$3,200.00",
                  paymentMethod: "Bank Transfer",
                },
                {
                  id: "EXP006",
                  category: "Utilities",
                  description: "Water Bill",
                  date: "2025-03-12",
                  amount: "$780.50",
                  paymentMethod: "Direct Debit",
                },
                {
                  id: "EXP007",
                  category: "Supplies",
                  description: "Office Supplies",
                  date: "2025-03-10",
                  amount: "$325.25",
                  paymentMethod: "Credit Card",
                },
              ].map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.id}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        expense.category === "Salaries"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : expense.category === "Utilities"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : expense.category === "Supplies"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : expense.category === "Maintenance"
                          ? "bg-orange-50 text-orange-700 border-orange-200"
                          : expense.category === "Technology"
                          ? "bg-purple-50 text-purple-700 border-purple-200"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                      }
                    >
                      {expense.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{expense.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="ghost" size="icon">
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t px-6 py-4">
          <div className="text-xs text-muted-foreground">
            Showing <strong>7</strong> of <strong>42</strong> expenses
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
