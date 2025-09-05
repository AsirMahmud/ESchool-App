"use client";

import { useDepartments, useDeleteDepartment, useCreateDepartment } from "@/hooks/use-departments";
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, RefreshCcw, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type NewDepartmentForm = {
  d_name: string
  location: string
  d_type: 'academic' | 'administrative' | 'support' | 'finance' | 'hr'
  description: string
}

export default function AdminDepartmentsPage() {
  const { data: departments, isLoading, error, refetch } = useDepartments();
  const deleteDepartment = useDeleteDepartment();
  const createDepartment = useCreateDepartment();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<NewDepartmentForm>({ d_name: "", location: "", d_type: 'academic', description: "" })
  const [errors, setErrors] = useState<Partial<Record<keyof NewDepartmentForm, string>>>({})

  const filtered = useMemo(() => {
    const list = Array.isArray(departments) ? departments : [];
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((d) =>
      [d.d_name, d.description, d.location]
        .filter(Boolean)
        .some((val) => String(val).toLowerCase().includes(q))
    );
  }, [departments, query]);

  const handleDelete = (d_name: string) => {
    if (confirm("Delete this department?")) {
      deleteDepartment.mutate(d_name);
    }
  };

  const onChange = (key: keyof NewDepartmentForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target?.value ?? ''
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const resetForm = () => {
    setForm({ d_name: "", location: "", d_type: 'academic', description: "" })
    setErrors({})
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors: Partial<Record<keyof NewDepartmentForm, string>> = {}
    if (!form.d_name.trim()) nextErrors.d_name = "Department name is required"
    if (!form.location.trim()) nextErrors.location = "Location is required"
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    createDepartment.mutate(
      {
        d_name: form.d_name.trim(),
        location: form.location.trim(),
        d_type: form.d_type,
        description: form.description.trim(),
      },
      {
        onSuccess: () => {
          resetForm()
          setOpen(false)
        }
      } as any
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading departments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Failed to load departments</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Departments</h2>
          <p className="text-muted-foreground">Manage school departments.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => refetch()} className="gap-2">
            <RefreshCcw className="h-4 w-4" /> Refresh
          </Button>
          <Dialog open={open} onOpenChange={(openValue: boolean) => { setOpen(openValue); if (!openValue) resetForm() }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> New Department
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create Department</DialogTitle>
                <DialogDescription>Fill in details to add a new department.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="d_name">Name</Label>
                  <Input id="d_name" value={form.d_name} onChange={onChange('d_name')} placeholder="e.g., Mathematics" />
                  {errors.d_name && <p className="text-xs text-red-600">{errors.d_name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" value={form.location} onChange={onChange('location')} placeholder="e.g., Building A, Room 101" />
                  {errors.location && <p className="text-xs text-red-600">{errors.location}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="d_type">Type</Label>
                  <Input id="d_type" value={form.d_type} onChange={onChange('d_type')} placeholder="academic, administrative, support, finance, hr" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" value={form.description} onChange={onChange('description')} placeholder="Short description" />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={createDepartment.isPending}>
                    {createDepartment.isPending ? 'Creating...' : 'Create'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle>All Departments</CardTitle>
              <CardDescription>List of all departments from backend.</CardDescription>
            </div>
            <div className="relative w-full sm:w-[280px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, location, description..."
                className="pl-8"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((d) => (
                <TableRow key={d.d_name}>
                  <TableCell className="font-mono">{d.d_name}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{d.d_name}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        {d.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{d.location}</TableCell>
                  <TableCell>
                    {d.created_at ? new Date(d.created_at).toLocaleDateString() : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(d.d_name)}
                      disabled={deleteDepartment.isPending}
                      aria-label="Delete department"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-sm text-muted-foreground">
                    No departments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}


