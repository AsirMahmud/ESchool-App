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
import { useMemo, useState } from "react";
import { useCreateEmployee } from "@/hooks/use-employees";
import { useDepartments } from "@/hooks/use-departments";
import { useRouter } from "next/navigation";

export default function AddEmployeePage() {
  const router = useRouter()
  const { data: departments } = useDepartments()
  const createEmployee = useCreateEmployee()

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

  const onChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const errors = useMemo(() => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email is required'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    if (!form.position.trim()) e.position = 'Position is required'
    if (!form.role) e.role = 'Role is required'
    if (!form.status) e.status = 'Status is required'
    if (!form.join_date) e.join_date = 'Join date is required'
    if (form.role === 'teacher' && !form.teacher_room.trim()) e.teacher_room = 'Teacher room is required for teachers'
    return e
  }, [form])

  const onSubmit = async () => {
    if (Object.keys(errors).length > 0) return
    const payload: any = {
      ...form,
      salary: form.salary ? Number(form.salary) : undefined,
      department: form.department || null,
    }
    await createEmployee.mutateAsync(payload as any)
    router.push("/admin/employee")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Add Employee</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/employee">Cancel</Link>
          </Button>
          <Button onClick={onSubmit} disabled={createEmployee.isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {createEmployee.isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Core details required to create an employee</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={form.name} onChange={(e) => onChange("name", e.target.value)} />
              {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => onChange("email", e.target.value)} />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={form.phone} onChange={(e) => onChange("phone", e.target.value)} />
              {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input id="position" value={form.position} onChange={(e) => onChange("position", e.target.value)} />
              {errors.position && <p className="text-sm text-red-600">{errors.position}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
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
              <Label htmlFor="status">Status</Label>
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
              <Label htmlFor="join_date">Join Date</Label>
              <Input id="join_date" type="date" value={form.join_date} onChange={(e) => onChange("join_date", e.target.value)} />
              {errors.join_date && <p className="text-sm text-red-600">{errors.join_date}</p>}
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
              {errors.teacher_room && <p className="text-sm text-red-600">{errors.teacher_room}</p>}
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
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 w-full">
            <div className="space-y-2">
              <Label htmlFor="emergency_contact">Emergency Contact</Label>
              <Input id="emergency_contact" value={form.emergency_contact} onChange={(e) => onChange("emergency_contact", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergency_phone">Emergency Phone</Label>
              <Input id="emergency_phone" value={form.emergency_phone} onChange={(e) => onChange("emergency_phone", e.target.value)} />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
