"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useEmployee } from "@/hooks/use-employees";
import { useDepartments } from "@/hooks/use-departments";
import { api, endpoints } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function EditEmployeePage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const router = useRouter()
  const { id } = React.use(params as any)
  const { data: employee, isLoading } = useEmployee(id)
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
    about: "",
    education: "",
    skills: "",
    experience: "",
    certification: "",
    salary: "",
    address: "",
    emergency_contact: "",
    emergency_phone: "",
  })

  useEffect(() => {
    if (!employee) return
    setForm({
      name: employee.name || "",
      email: employee.email || "",
      phone: employee.phone || "",
      position: employee.position || "",
      role: employee.role || "teacher",
      status: employee.status || "active",
      join_date: employee.join_date || "",
      department: (employee as any).department || "",
      teacher_room: (employee as any).teacher_room || "",
      about: (employee as any).about || "",
      education: (employee as any).education || "",
      skills: (employee as any).skills || "",
      experience: (employee as any).experience || "",
      certification: (employee as any).certification || "",
      salary: employee.salary ? String(employee.salary) : "",
      address: (employee as any).address || "",
      emergency_contact: (employee as any).emergency_contact || "",
      emergency_phone: (employee as any).emergency_phone || "",
    })
  }, [employee])

  const onChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const onSave = async () => {
    const payload: any = {
      ...form,
      salary: form.salary ? Number(form.salary) : undefined,
      department: form.department || null,
    }
    await api.put(endpoints.employee(id), payload)
    router.push(`/admin/employee/${id}/profile`)
  }

  if (isLoading) {
    return <div className="py-10 text-center">Loading...</div>
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/admin/employee/${id}/profile`}>Back</Link>
          </Button>
          <h1 className="text-2xl font-bold">Edit Employee</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Update core employee details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={form.name} onChange={(e) => onChange("name", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => onChange("email", e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={form.phone} onChange={(e) => onChange("phone", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input id="position" value={form.position} onChange={(e) => onChange("position", e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={form.role} onValueChange={(v) => onChange("role", v)}>
                <SelectTrigger id="role">
                  <SelectValue />
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={form.status} onValueChange={(v) => onChange("status", v)}>
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="terminated">Terminated</SelectItem>
                  <SelectItem value="on_leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="join_date">Join Date</Label>
              <Input id="join_date" type="date" value={form.join_date} onChange={(e) => onChange("join_date", e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select value={form.department} onValueChange={(v) => onChange("department", v)}>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {(departments || []).map((d) => (
                    <SelectItem key={d.d_name} value={d.d_name}>{d.d_name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="teacher_room">Teacher Room</Label>
              <Input id="teacher_room" value={form.teacher_room} onChange={(e) => onChange("teacher_room", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary">Salary</Label>
              <Input id="salary" type="number" value={form.salary} onChange={(e) => onChange("salary", e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
          <CardDescription>Optional profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" value={form.address} onChange={(e) => onChange("address", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="about">About</Label>
              <Textarea id="about" value={form.about} onChange={(e) => onChange("about", e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Textarea id="education" value={form.education} onChange={(e) => onChange("education", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Textarea id="skills" value={form.skills} onChange={(e) => onChange("skills", e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              <Textarea id="experience" value={form.experience} onChange={(e) => onChange("experience", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="certification">Certification</Label>
              <Textarea id="certification" value={form.certification} onChange={(e) => onChange("certification", e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="emergency_contact">Emergency Contact</Label>
              <Input id="emergency_contact" value={form.emergency_contact} onChange={(e) => onChange("emergency_contact", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergency_phone">Emergency Phone</Label>
              <Input id="emergency_phone" value={form.emergency_phone} onChange={(e) => onChange("emergency_phone", e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
