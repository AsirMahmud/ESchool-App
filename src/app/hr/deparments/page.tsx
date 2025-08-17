import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Briefcase,
  Users,
  Plus,
  MoreVertical,
  Search,
  UserPlus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function DepartmentsPage() {
  // Sample department data
  const departments = [
    {
      id: 1,
      name: "Science Department",
      head: "Dr. Robert Chen",
      employees: 18,
      positions: 20,
      vacancies: 2,
      budget: "$245,000",
      status: "Active",
    },
    {
      id: 2,
      name: "Mathematics Department",
      head: "Prof. Sarah Johnson",
      employees: 15,
      positions: 16,
      vacancies: 1,
      budget: "$210,000",
      status: "Active",
    },
    {
      id: 3,
      name: "English Department",
      head: "Dr. Michael Brown",
      employees: 12,
      positions: 12,
      vacancies: 0,
      budget: "$180,000",
      status: "Active",
    },
    {
      id: 4,
      name: "History Department",
      head: "Prof. Emily Davis",
      employees: 8,
      positions: 10,
      vacancies: 2,
      budget: "$150,000",
      status: "Active",
    },
    {
      id: 5,
      name: "Art Department",
      head: "Jennifer Martinez",
      employees: 6,
      positions: 8,
      vacancies: 2,
      budget: "$120,000",
      status: "Active",
    },
    {
      id: 6,
      name: "Physical Education",
      head: "David Wilson",
      employees: 7,
      positions: 8,
      vacancies: 1,
      budget: "$130,000",
      status: "Active",
    },
    {
      id: 7,
      name: "Administration",
      head: "Lisa Anderson",
      employees: 12,
      positions: 12,
      vacancies: 0,
      budget: "$280,000",
      status: "Active",
    },
    {
      id: 8,
      name: "Support Staff",
      head: "Robert Taylor",
      employees: 15,
      positions: 18,
      vacancies: 3,
      budget: "$200,000",
      status: "Active",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Department Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Department</DialogTitle>
              <DialogDescription>
                Add a new department to the school structure.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Department Name</Label>
                <Input id="name" placeholder="Enter department name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="head">Department Head</Label>
                <Input id="head" placeholder="Select department head" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="positions">Total Positions</Label>
                  <Input id="positions" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Annual Budget</Label>
                  <Input id="budget" placeholder="$0" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter department description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Create Department</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search departments..."
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Departments
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              All academic and administrative departments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">93</div>
            <p className="text-xs text-muted-foreground">
              Across all departments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Open Positions
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11</div>
            <p className="text-xs text-muted-foreground">
              Vacancies to be filled
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.52M</div>
            <p className="text-xs text-muted-foreground">
              Annual departmental budget
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Departments</CardTitle>
          <CardDescription>
            Manage school departments and their structures.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Head</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((department) => (
                <TableRow key={department.id}>
                  <TableCell className="font-medium">
                    {department.name}
                  </TableCell>
                  <TableCell>{department.head}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-xs">
                        <span>
                          {department.employees}/{department.positions}
                        </span>
                        <span className="text-muted-foreground">
                          {Math.round(
                            (department.employees / department.positions) * 100
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          (department.employees / department.positions) * 100
                        }
                        className="h-1"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{department.budget}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{department.status}</Badge>
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
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Department</DropdownMenuItem>
                        <DropdownMenuItem>Manage Staff</DropdownMenuItem>
                        <DropdownMenuItem>Budget Planning</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Deactivate
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
    </div>
  );
}
