import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Search,
  Plus,
  MoreVertical,
  Download,
  Calendar,
  CheckCircle,
  AlertCircle,
  Eye,
} from "lucide-react";

export default function PoliciesPage() {
  // Sample policies data
  const policies = [
    {
      id: 1,
      title: "Employee Code of Conduct",
      category: "General",
      lastUpdated: "2025-01-15",
      effectiveDate: "2025-02-01",
      status: "Active",
      approvedBy: "Board of Directors",
      acknowledgementRequired: true,
      acknowledgementRate: 92,
    },
    {
      id: 2,
      title: "Leave Policy",
      category: "Benefits",
      lastUpdated: "2025-01-20",
      effectiveDate: "2025-02-01",
      status: "Active",
      approvedBy: "HR Director",
      acknowledgementRequired: true,
      acknowledgementRate: 88,
    },
    {
      id: 3,
      title: "Performance Evaluation Process",
      category: "Performance",
      lastUpdated: "2024-12-10",
      effectiveDate: "2025-01-01",
      status: "Active",
      approvedBy: "Principal",
      acknowledgementRequired: true,
      acknowledgementRate: 85,
    },
    {
      id: 4,
      title: "Workplace Safety Guidelines",
      category: "Safety",
      lastUpdated: "2024-11-05",
      effectiveDate: "2024-12-01",
      status: "Active",
      approvedBy: "Safety Committee",
      acknowledgementRequired: true,
      acknowledgementRate: 95,
    },
    {
      id: 5,
      title: "Technology Usage Policy",
      category: "IT",
      lastUpdated: "2024-10-20",
      effectiveDate: "2024-11-01",
      status: "Active",
      approvedBy: "IT Director",
      acknowledgementRequired: true,
      acknowledgementRate: 90,
    },
    {
      id: 6,
      title: "Anti-Discrimination Policy",
      category: "Compliance",
      lastUpdated: "2024-09-15",
      effectiveDate: "2024-10-01",
      status: "Active",
      approvedBy: "Board of Directors",
      acknowledgementRequired: true,
      acknowledgementRate: 97,
    },
    {
      id: 7,
      title: "Professional Development Guidelines",
      category: "Training",
      lastUpdated: "2025-02-10",
      effectiveDate: "2025-03-01",
      status: "Draft",
      approvedBy: "Pending Approval",
      acknowledgementRequired: false,
      acknowledgementRate: 0,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Policies & Procedures</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Policy
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Policy</DialogTitle>
              <DialogDescription>
                Add a new policy or procedure to the system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Policy Title</Label>
                <Input id="title" placeholder="Enter policy title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="benefits">Benefits</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="safety">Safety</SelectItem>
                      <SelectItem value="it">IT</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="effective-date">Effective Date</Label>
                  <Input id="effective-date" type="date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="review">Under Review</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="approved-by">Approved By</Label>
                  <Input id="approved-by" placeholder="Enter approver" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="acknowledgement">
                  Acknowledgement Required
                </Label>
                <Select>
                  <SelectTrigger id="acknowledgement">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Policy Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter policy description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="document">Upload Policy Document</Label>
                <Input id="document" type="file" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Create Policy</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search policies..."
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Policies
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Active and archived policies
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Recently Updated
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">In the last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Acknowledgement Rate
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91%</div>
            <p className="text-xs text-muted-foreground">
              Average across all policies
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Reviews
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Policies under review
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Policies</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Policy Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Acknowledgement</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {policies.map((policy) => (
                    <TableRow key={policy.id}>
                      <TableCell>
                        <div className="font-medium">{policy.title}</div>
                      </TableCell>
                      <TableCell>{policy.category}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            policy.status === "Active"
                              ? "default"
                              : policy.status === "Draft"
                              ? "outline"
                              : "secondary"
                          }
                        >
                          {policy.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{policy.lastUpdated}</TableCell>
                      <TableCell>
                        {policy.acknowledgementRequired ? (
                          <div className="flex items-center gap-1">
                            <span>{policy.acknowledgementRate}%</span>
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          </div>
                        ) : (
                          <span className="text-muted-foreground">
                            Not Required
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Policy
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit Policy</DropdownMenuItem>
                            <DropdownMenuItem>
                              Track Acknowledgements
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Archive Policy
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Showing active policies only.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="draft" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Showing draft policies only.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="archived" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Showing archived policies only.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
