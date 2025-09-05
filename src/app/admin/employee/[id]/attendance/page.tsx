"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEmployee, useEmployeeAttendanceList, useMarkEmployeeAttendance } from "@/hooks/use-employees";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function EmployeeAttendancePage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const { id } = React.use(params as any)
  const { data: employee } = useEmployee(id)
  const { data: attendance, refetch } = useEmployeeAttendanceList(id)
  const markAttendance = useMarkEmployeeAttendance()

  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    status: "present" as "present" | "absent" | "late" | "half_day" | "on_leave",
    check_in_time: "",
    check_out_time: "",
    notes: "",
  })

  const canSubmit = useMemo(() => !!form.date && !!form.status, [form])

  const onSubmit = async () => {
    if (!canSubmit) return
    await markAttendance.mutateAsync({
      employeeId: id,
      data: {
        date: form.date,
        status: form.status,
        check_in_time: form.check_in_time || null,
        check_out_time: form.check_out_time || null,
        notes: form.notes || null,
      },
    })
    setForm((prev) => ({ ...prev, notes: "" }))
    refetch()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/admin/employee/${params.id}/profile`}>Back to Profile</Link>
          </Button>
          <h1 className="text-2xl font-bold">Attendance</h1>
        </div>
        <div className="text-sm text-muted-foreground">{employee?.name}</div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-5">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={form.status} onValueChange={(v) => setForm((p) => ({ ...p, status: v as any }))}>
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="half_day">Half Day</SelectItem>
                <SelectItem value="on_leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="check_in">Check-in</Label>
            <Input id="check_in" type="time" value={form.check_in_time} onChange={(e) => setForm((p) => ({ ...p, check_in_time: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="check_out">Check-out</Label>
            <Input id="check_out" type="time" value={form.check_out_time} onChange={(e) => setForm((p) => ({ ...p, check_out_time: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Input id="notes" placeholder="Optional" value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} />
          </div>
          <div className="sm:col-span-5">
            <Button onClick={onSubmit} disabled={!canSubmit || markAttendance.isLoading}>{markAttendance.isLoading ? 'Saving...' : 'Save Attendance'}</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(attendance || []).map((rec) => (
                <TableRow key={rec.id}>
                  <TableCell>{rec.date}</TableCell>
                  <TableCell className="capitalize">{rec.status.replace('_', ' ')}</TableCell>
                  <TableCell>{rec.check_in_time || '-'}</TableCell>
                  <TableCell>{rec.check_out_time || '-'}</TableCell>
                  <TableCell>{rec.notes || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}


