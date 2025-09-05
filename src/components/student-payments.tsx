"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMonthlyPaymentStatus, useStudentPaymentSummary } from "@/hooks/use-student-payments"

const MONTHS = [
  "January","February","March","April","May","June","July","August","September","October","November","December"
]

function getCurrentYearMonth() {
  const now = new Date()
  return { year: now.getFullYear(), month: now.getMonth() + 1 }
}

export function StudentPayments({ studentId, studentName }: { studentId: number | string, studentName?: string }) {
  const { year: currentYear, month: currentMonth } = getCurrentYearMonth()
  const [year, setYear] = useState<number>(currentYear)
  const [month, setMonth] = useState<number>(currentMonth)

  const { data: monthly } = useMonthlyPaymentStatus(studentId, year, month)
  const { data: summary } = useStudentPaymentSummary(studentId, {})

  const headerTitle = useMemo(() => {
    const label = MONTHS[month - 1] || ""
    return `Payments — ${label} ${year}`
  }, [month, year])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{studentName || "Student"} Payments</h2>
          <p className="text-sm text-muted-foreground">Monthly status and overall summary</p>
        </div>
        <div className="flex gap-2">
          <Select value={String(month)} onValueChange={(v) => setMonth(Number(v))}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="Month" /></SelectTrigger>
            <SelectContent>
              {MONTHS.map((m, idx) => (
                <SelectItem key={m} value={String(idx + 1)}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={String(year)} onValueChange={(v) => setYear(Number(v))}>
            <SelectTrigger className="w-[120px]"><SelectValue placeholder="Year" /></SelectTrigger>
            <SelectContent>
              {Array.from({ length: 6 }).map((_, i) => {
                const y = currentYear - 2 + i
                return <SelectItem key={y} value={String(y)}>{y}</SelectItem>
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{headerTitle}</CardTitle>
            <CardDescription>All payments due in the selected month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {(monthly || []).length === 0 ? (
              <div className="text-sm text-muted-foreground">No payments found for this month.</div>
            ) : (
              (monthly || []).map((p) => (
                <div key={p.pay_id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium capitalize">{p.payment_type}</span>
                      <Badge variant={p.status === "paid" ? "default" : p.status === "overdue" ? "destructive" : "secondary"}>
                        {p.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Due {new Date(p.due_date).toLocaleDateString()} {p.payment_date ? `• Paid ${new Date(p.payment_date).toLocaleDateString()}` : ""}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Amount: {Number(p.total_amount ?? p.amount).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>Overall financial status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {!summary ? (
              <div className="text-muted-foreground">Loading...</div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span>Total Due</span>
                  <span className="font-medium">{Number(summary.total_due).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total Paid</span>
                  <span className="font-medium">{Number(summary.total_paid).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total Overdue</span>
                  <span className="font-medium">{Number(summary.total_overdue).toLocaleString()}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center justify-between">
                  <span>Pending Payments</span>
                  <span className="font-medium">{summary.pending_payments}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Overdue Payments</span>
                  <span className="font-medium">{summary.overdue_payments}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Payment Rate</span>
                  <span className="font-medium">{summary.payment_rate}%</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


