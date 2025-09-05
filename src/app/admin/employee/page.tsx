"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreVertical, Trash2, Eye, UserPlus } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input" // ✅ FIXED
import { useEmployees, useDeleteEmployee, useCreateEmployee } from "@/hooks/use-employees"
import { useDepartments } from "@/hooks/use-departments"

export default function EmployeesPage() {
  const { data: employees, isLoading, error } = useEmployees()
  const deleteEmployeeMutation = useDeleteEmployee()
  const createEmployee = useCreateEmployee()
  const { data: departments } = useDepartments()

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    role: "teacher",
    status: "active",
    join_date: "",
    department: "",
    teacher_room: "",
    salary: "",
    address: "",
    emergency_contact: "",
    emergency_phone: "",
  })

  const onChange = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const errors = useMemo(() => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = "Name is required"
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Valid email is required"
    if (!form.phone.trim()) e.phone = "Phone is required"
    if (!form.position.trim()) e.position = "Position is required"
    if (!form.role) e.role = "Role is required"
    if (!form.status) e.status = "Status is required"
    if (!form.join_date) e.join_date = "Join date is required"
    if (form.role === "teacher" && !form.teacher_room.trim()) e.teacher_room = "Teacher room is required for teachers"
    return e
  }, [form])

  const handleCreateEmployee = async () => {
    if (Object.keys(errors).length > 0) return
    const payload: any = {
      ...form,
      salary: form.salary ? Number(form.salary) : undefined,
      department: form.department || null,
    }
    await createEmployee.mutateAsync(payload)
    setForm({
      name: "",
      email: "",
      phone: "",
      position: "",
      role: "teacher",
      status: "active",
      join_date: "",
      department: "",
      teacher_room: "",
      salary: "",
      address: "",
      emergency_contact: "",
      emergency_phone: "",
    })
    ;(document.getElementById("close-add-employee") as HTMLButtonElement | null)?.click()
  }

  const handleDeleteEmployee = (id: number) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      deleteEmployeeMutation.mutate(id)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading employees...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error loading employees: {(error as any).message}</div>
      </div>
    )
  }

  // Helpers
  const employeesData = Array.isArray(employees)
    ? employees
    : employees?.results || employees?.data || []

  const getEmployeeId = (emp: any) => emp?.emp_id || emp?.id

  const formatTitle = (value: string | undefined) => {
    if (!value) return ""
    return value
      .replace(/_/g, " ")
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Employee Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>
                Enter the details of the new employee. Fields marked * are required.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" placeholder="Enter full name" value={form.name} onChange={(e) => onChange("name", e.target.value)} />
                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="name@eschool.edu" value={form.email} onChange={(e) => onChange("email", e.target.value)} />
                  {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" placeholder="+1 (555) 000-0000" value={form.phone} onChange={(e) => onChange("phone", e.target.value)} />
                  {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                </div>
              </div>

              {/* Role + Department */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <Select value={form.role} onValueChange={(v) => onChange("role", v)}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="principal">Principal</SelectItem>
                      <SelectItem value="vice_principal">Vice Principal</SelectItem>
                      <SelectItem value="coordinator">Coordinator</SelectItem>
                      <SelectItem value="librarian">Librarian</SelectItem>
                      <SelectItem value="counselor">Counselor</SelectItem>
                      <SelectItem value="nurse">Nurse</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="cleaner">Cleaner</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && <p className="text-sm text-red-600">{errors.role}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={form.department} onValueChange={(v) => onChange("department", v)}>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {(departments || []).map((d: any) => (
                        <SelectItem key={d.d_name} value={d.d_name}>
                          {d.d_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Position + Join Date */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position *</Label>
                  <Input id="position" placeholder="Enter position" value={form.position} onChange={(e) => onChange("position", e.target.value)} />
                  {errors.position && <p className="text-sm text-red-600">{errors.position}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="join-date">Join Date *</Label>
                  <Input id="join-date" type="date" value={form.join_date} onChange={(e) => onChange("join_date", e.target.value)} />
                  {errors.join_date && <p className="text-sm text-red-600">{errors.join_date}</p>}
                </div>
              </div>

              {/* Status + Teacher Room */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select value={form.status} onValueChange={(v) => onChange("status", v)}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="terminated">Terminated</SelectItem>
                      <SelectItem value="on_leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && <p className="text-sm text-red-600">{errors.status}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacher_room">Teacher Room</Label>
                  <Input id="teacher_room" placeholder="If role is teacher" value={form.teacher_room} onChange={(e) => onChange("teacher_room", e.target.value)} />
                  {errors.teacher_room && <p className="text-sm text-red-600">{errors.teacher_room}</p>}
                </div>
              </div>

              {/* Salary + Address */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary</Label>
                  <Input id="salary" type="number" placeholder="e.g. 50000" value={form.salary} onChange={(e) => onChange("salary", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" placeholder="Enter full address" value={form.address} onChange={(e) => onChange("address", e.target.value)} />
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact">Emergency Contact</Label>
                  <Input id="emergency_contact" placeholder="Contact person" value={form.emergency_contact} onChange={(e) => onChange("emergency_contact", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency_phone">Emergency Phone</Label>
                  <Input id="emergency_phone" placeholder="Contact phone" value={form.emergency_phone} onChange={(e) => onChange("emergency_phone", e.target.value)} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogTrigger asChild>
                <Button id="close-add-employee" variant="outline">
                  Cancel
                </Button>
              </DialogTrigger>
              <Button onClick={handleCreateEmployee}>Add Employee</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeesData.map((employee: any) => (
                <TableRow key={getEmployeeId(employee)}>
                  <TableCell>
                    <Link href={`/admin/employee/${getEmployeeId(employee)}/profile`} className="flex items-center gap-3 hover:underline">
                      <Avatar>
                        <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                        <AvatarFallback>{employee.name?.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-xs text-muted-foreground">{employee.email}</p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{formatTitle(employee.role)}</Badge>
                  </TableCell>
                  <TableCell>{employee.department_name || employee.department || "-"}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    <Badge variant={employee.status === "active" ? "default" : "secondary"}>{formatTitle(employee.status)}</Badge>
                  </TableCell>
                  <TableCell>{employee.join_date}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/employee/${getEmployeeId(employee)}/profile`}>
                            <div className="flex items-center">
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </div>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteEmployee(getEmployeeId(employee))}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
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
  )
}
