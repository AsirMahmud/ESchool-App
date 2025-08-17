import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Download, Edit, Filter, Plus, Search, Trash2 } from "lucide-react";

export default function FeeStructurePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fee Structure</h1>
          <p className="text-muted-foreground">
            Manage fee structures for different classes and categories
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Fee Structure
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
              placeholder="Search fee structures..."
              className="pl-8 w-full md:w-[250px]"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Academic Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="2023-2024">2023-2024</SelectItem>
              <SelectItem value="2022-2023">2022-2023</SelectItem>
              <SelectItem value="2021-2022">2021-2022</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="nursery">Nursery</SelectItem>
              <SelectItem value="kg">Kindergarten</SelectItem>
              <SelectItem value="1">Class 1</SelectItem>
              <SelectItem value="2">Class 2</SelectItem>
              <SelectItem value="3">Class 3</SelectItem>
              <SelectItem value="4">Class 4</SelectItem>
              <SelectItem value="5">Class 5</SelectItem>
              <SelectItem value="6">Class 6</SelectItem>
              <SelectItem value="7">Class 7</SelectItem>
              <SelectItem value="8">Class 8</SelectItem>
              <SelectItem value="9">Class 9</SelectItem>
              <SelectItem value="10">Class 10</SelectItem>
              <SelectItem value="11">Class 11</SelectItem>
              <SelectItem value="12">Class 12</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filter
        </Button>
      </div>

      <Tabs defaultValue="class-wise">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="class-wise">Class-wise</TabsTrigger>
          <TabsTrigger value="category-wise">Category-wise</TabsTrigger>
          <TabsTrigger value="special-fees">Special Fees</TabsTrigger>
        </TabsList>

        <TabsContent value="class-wise">
          <Card>
            <CardHeader>
              <CardTitle>Class-wise Fee Structure</CardTitle>
              <CardDescription>
                Fee structure organized by class for the academic year 2023-2024
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Tuition Fee</TableHead>
                    <TableHead>Development Fee</TableHead>
                    <TableHead>Computer Fee</TableHead>
                    <TableHead>Library Fee</TableHead>
                    <TableHead>Sports Fee</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      class: "Nursery",
                      tuition: "₹25,000",
                      development: "₹5,000",
                      computer: "₹2,000",
                      library: "₹1,000",
                      sports: "₹2,000",
                      total: "₹35,000",
                      status: "Active",
                    },
                    {
                      class: "Kindergarten",
                      tuition: "₹28,000",
                      development: "₹5,500",
                      computer: "₹2,500",
                      library: "₹1,200",
                      sports: "₹2,200",
                      total: "₹39,400",
                      status: "Active",
                    },
                    {
                      class: "Class 1",
                      tuition: "₹32,000",
                      development: "₹6,000",
                      computer: "₹3,000",
                      library: "₹1,500",
                      sports: "₹2,500",
                      total: "₹45,000",
                      status: "Active",
                    },
                    {
                      class: "Class 2",
                      tuition: "₹32,000",
                      development: "₹6,000",
                      computer: "₹3,000",
                      library: "₹1,500",
                      sports: "₹2,500",
                      total: "₹45,000",
                      status: "Active",
                    },
                    {
                      class: "Class 3",
                      tuition: "₹35,000",
                      development: "₹6,500",
                      computer: "₹3,500",
                      library: "₹1,800",
                      sports: "₹2,800",
                      total: "₹49,600",
                      status: "Active",
                    },
                    {
                      class: "Class 4",
                      tuition: "₹35,000",
                      development: "₹6,500",
                      computer: "₹3,500",
                      library: "₹1,800",
                      sports: "₹2,800",
                      total: "₹49,600",
                      status: "Active",
                    },
                    {
                      class: "Class 5",
                      tuition: "₹38,000",
                      development: "₹7,000",
                      computer: "₹4,000",
                      library: "₹2,000",
                      sports: "₹3,000",
                      total: "₹54,000",
                      status: "Active",
                    },
                  ].map((fee, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{fee.class}</TableCell>
                      <TableCell>{fee.tuition}</TableCell>
                      <TableCell>{fee.development}</TableCell>
                      <TableCell>{fee.computer}</TableCell>
                      <TableCell>{fee.library}</TableCell>
                      <TableCell>{fee.sports}</TableCell>
                      <TableCell className="font-medium">{fee.total}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 hover:bg-green-50"
                        >
                          {fee.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="category-wise">
          <Card>
            <CardHeader>
              <CardTitle>Category-wise Fee Structure</CardTitle>
              <CardDescription>
                Fee structure organized by category for the academic year
                2023-2024
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Applicable Classes</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      category: "Tuition Fee",
                      description: "Regular teaching and learning activities",
                      amount: "₹25,000 - ₹45,000",
                      frequency: "Quarterly",
                      classes: "All Classes",
                      status: "Active",
                    },
                    {
                      category: "Development Fee",
                      description: "Infrastructure and facility development",
                      amount: "₹5,000 - ₹8,000",
                      frequency: "Annual",
                      classes: "All Classes",
                      status: "Active",
                    },
                    {
                      category: "Computer Fee",
                      description: "Computer lab and IT infrastructure",
                      amount: "₹2,000 - ₹5,000",
                      frequency: "Annual",
                      classes: "All Classes",
                      status: "Active",
                    },
                    {
                      category: "Library Fee",
                      description: "Library resources and maintenance",
                      amount: "₹1,000 - ₹2,500",
                      frequency: "Annual",
                      classes: "All Classes",
                      status: "Active",
                    },
                    {
                      category: "Sports Fee",
                      description: "Sports equipment and activities",
                      amount: "₹2,000 - ₹3,500",
                      frequency: "Annual",
                      classes: "All Classes",
                      status: "Active",
                    },
                    {
                      category: "Laboratory Fee",
                      description: "Science lab equipment and consumables",
                      amount: "₹3,000 - ₹5,000",
                      frequency: "Annual",
                      classes: "Classes 6-12",
                      status: "Active",
                    },
                    {
                      category: "Transport Fee",
                      description: "School bus transportation",
                      amount: "₹8,000 - ₹15,000",
                      frequency: "Quarterly",
                      classes: "Optional for All",
                      status: "Active",
                    },
                  ].map((fee, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        {fee.category}
                      </TableCell>
                      <TableCell>{fee.description}</TableCell>
                      <TableCell>{fee.amount}</TableCell>
                      <TableCell>{fee.frequency}</TableCell>
                      <TableCell>{fee.classes}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 hover:bg-green-50"
                        >
                          {fee.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="special-fees">
          <Card>
            <CardHeader>
              <CardTitle>Special Fees</CardTitle>
              <CardDescription>
                One-time or special purpose fees for the academic year 2023-2024
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fee Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Applicable For</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "Admission Fee",
                      description: "One-time fee for new admissions",
                      amount: "₹10,000",
                      applicable: "New Students",
                      dueDate: "At Admission",
                      status: "Active",
                    },
                    {
                      name: "Registration Fee",
                      description: "Fee for registration process",
                      amount: "₹2,000",
                      applicable: "New Applicants",
                      dueDate: "Before Admission Test",
                      status: "Active",
                    },
                    {
                      name: "Examination Fee",
                      description: "Fee for term examinations",
                      amount: "₹1,500",
                      applicable: "All Students",
                      dueDate: "Before Each Term",
                      status: "Active",
                    },
                    {
                      name: "Annual Day Fee",
                      description: "For annual day celebrations",
                      amount: "₹1,000",
                      applicable: "All Students",
                      dueDate: "December 2023",
                      status: "Active",
                    },
                    {
                      name: "Educational Trip",
                      description: "For educational excursions",
                      amount: "₹3,500",
                      applicable: "Classes 6-12",
                      dueDate: "November 2023",
                      status: "Active",
                    },
                    {
                      name: "Smart Class Fee",
                      description: "For digital classroom facilities",
                      amount: "₹2,500",
                      applicable: "All Students",
                      dueDate: "July 2023",
                      status: "Active",
                    },
                    {
                      name: "Caution Deposit",
                      description: "Refundable security deposit",
                      amount: "₹5,000",
                      applicable: "New Students",
                      dueDate: "At Admission",
                      status: "Active",
                    },
                  ].map((fee, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{fee.name}</TableCell>
                      <TableCell>{fee.description}</TableCell>
                      <TableCell>{fee.amount}</TableCell>
                      <TableCell>{fee.applicable}</TableCell>
                      <TableCell>{fee.dueDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 hover:bg-green-50"
                        >
                          {fee.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
