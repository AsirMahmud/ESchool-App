import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileCheck,
  Search,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Printer,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Certificate Management",
  description: "Manage student certificates and requests",
};

export default function CertificateManagementPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Certificate Management
        </h1>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <FileCheck className="mr-2 h-4 w-4" />
                New Certificate
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Generate New Certificate</DialogTitle>
                <DialogDescription>
                  Enter the details to generate a new certificate for a student.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input id="studentId" placeholder="Enter student ID" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Name</Label>
                  <Input id="studentName" placeholder="Enter student name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certificateType">Certificate Type</Label>
                  <Select>
                    <SelectTrigger id="certificateType">
                      <SelectValue placeholder="Select certificate type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transfer">
                        Transfer Certificate
                      </SelectItem>
                      <SelectItem value="character">
                        Character Certificate
                      </SelectItem>
                      <SelectItem value="graduation">
                        Graduation Certificate
                      </SelectItem>
                      <SelectItem value="bonafide">
                        Bonafide Certificate
                      </SelectItem>
                      <SelectItem value="migration">
                        Migration Certificate
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="issueDate">Issue Date</Label>
                    <Input id="issueDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="validUntil">
                      Valid Until (if applicable)
                    </Label>
                    <Input id="validUntil" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose</Label>
                  <Input
                    id="purpose"
                    placeholder="Enter purpose of certificate"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="remarks">Remarks (Optional)</Label>
                  <Input
                    id="remarks"
                    placeholder="Enter any additional remarks"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Generate Certificate</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search certificates..."
            className="pl-8"
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Certificates</SelectItem>
            <SelectItem value="transfer">Transfer Certificate</SelectItem>
            <SelectItem value="character">Character Certificate</SelectItem>
            <SelectItem value="graduation">Graduation Certificate</SelectItem>
            <SelectItem value="bonafide">Bonafide Certificate</SelectItem>
            <SelectItem value="migration">Migration Certificate</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="ready">Ready for Collection</SelectItem>
            <SelectItem value="issued">Issued</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Certificates</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="ready">Ready</TabsTrigger>
          <TabsTrigger value="issued">Issued</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certificate ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Certificate Type</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: "CERT-2025-001",
                      name: "Fatima Ali",
                      type: "Transfer Certificate",
                      date: "Mar 28, 2025",
                      status: "Pending",
                      statusIcon: <Clock className="h-4 w-4 text-yellow-500" />,
                    },
                    {
                      id: "CERT-2025-002",
                      name: "James Wilson",
                      type: "Character Certificate",
                      date: "Mar 27, 2025",
                      status: "Processing",
                      statusIcon: (
                        <FileText className="h-4 w-4 text-blue-500" />
                      ),
                    },
                    {
                      id: "CERT-2025-003",
                      name: "Priya Sharma",
                      type: "Graduation Certificate",
                      date: "Mar 26, 2025",
                      status: "Ready for Collection",
                      statusIcon: (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ),
                    },
                    {
                      id: "CERT-2025-004",
                      name: "Carlos Rodriguez",
                      type: "Bonafide Certificate",
                      date: "Mar 25, 2025",
                      status: "Issued",
                      statusIcon: (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ),
                    },
                    {
                      id: "CERT-2025-005",
                      name: "Emma Thompson",
                      type: "Migration Certificate",
                      date: "Mar 24, 2025",
                      status: "Issued",
                      statusIcon: (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ),
                    },
                    {
                      id: "CERT-2025-006",
                      name: "Ahmed Khan",
                      type: "Transfer Certificate",
                      date: "Mar 23, 2025",
                      status: "Rejected",
                      statusIcon: <XCircle className="h-4 w-4 text-red-500" />,
                    },
                    {
                      id: "CERT-2025-007",
                      name: "Lisa Wong",
                      type: "Character Certificate",
                      date: "Mar 22, 2025",
                      status: "Issued",
                      statusIcon: (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ),
                    },
                  ].map((certificate) => (
                    <TableRow key={certificate.id}>
                      <TableCell className="font-medium">
                        {certificate.id}
                      </TableCell>
                      <TableCell>{certificate.name}</TableCell>
                      <TableCell>{certificate.type}</TableCell>
                      <TableCell>{certificate.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {certificate.statusIcon}
                          <span
                            className={`${
                              certificate.status === "Issued" ||
                              certificate.status === "Ready for Collection"
                                ? "text-green-600 dark:text-green-400"
                                : certificate.status === "Rejected"
                                ? "text-red-600 dark:text-red-400"
                                : certificate.status === "Pending"
                                ? "text-yellow-600 dark:text-yellow-400"
                                : "text-blue-600 dark:text-blue-400"
                            }`}
                          >
                            {certificate.status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button size="sm">Process</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tab contents would be similar to the "all" tab but filtered by status */}
        <TabsContent value="pending" className="space-y-4">
          {/* Similar table with only pending certificates */}
        </TabsContent>
        <TabsContent value="ready" className="space-y-4">
          {/* Similar table with only ready certificates */}
        </TabsContent>
        <TabsContent value="issued" className="space-y-4">
          {/* Similar table with only issued certificates */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
