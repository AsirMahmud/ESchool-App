"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useMonthlyPaymentStatus, useStudentPaymentSummary } from "@/hooks/use-student-payments"

function getCurrentYearMonth() {
  const now = new Date()
  return { year: now.getFullYear(), month: now.getMonth() + 1 }
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function StudentPaymentsPage() {
  const searchParams = useSearchParams()
  const initialStudent = searchParams.get("student")
  const { year: currentYear, month: currentMonth } = getCurrentYearMonth()

  const [studentId, setStudentId] = useState<string>(initialStudent || "")
  const [year, setYear] = useState<number>(currentYear)
  const [month, setMonth] = useState<number>(currentMonth)

  const { data: monthly, isLoading, error, refetch } = useMonthlyPaymentStatus(
    studentId,
    year,
    month
  )

  const { data: summary } = useStudentPaymentSummary(studentId, {})

  useEffect(() => {
    // refetch when params change
    if (studentId) refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId, year, month])

  const headerTitle = useMemo(() => {
    const label = MONTHS[month - 1] || ""
    return `Monthly Payments — ${label} ${year}`
  }, [month, year])

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{headerTitle}</CardTitle>
            <CardDescription>
              View detailed payment status for the selected month.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Student ID</label>
                <Input
                  placeholder="Enter student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Month</label>
                <Select value={String(month)} onValueChange={(v) => setMonth(Number(v))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHS.map((m, idx) => (
                      <SelectItem key={m} value={String(idx + 1)}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Year</label>
                <Input
                  type="number"
                  min={2000}
                  max={2100}
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button onClick={() => studentId && refetch()} disabled={!studentId || isLoading}>
                {isLoading ? "Loading..." : "Refresh"}
              </Button>
              {error && (
                <span className="text-sm text-destructive">Failed to load payments.</span>
              )}
            </div>

            <Separator />

            {!studentId ? (
              <div className="text-sm text-muted-foreground">
                Enter a student ID to view monthly payments.
              </div>
            ) : (
              <div className="space-y-3">
                {(monthly || []).length === 0 ? (
                  <div className="text-sm text-muted-foreground">No payments found for this month.</div>
                ) : (
                  <div className="space-y-3">
                    {(monthly || []).map((p) => (
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
                        <div className="flex items-center gap-2">
                          {p.status !== "paid" && (
                            <Badge variant="outline">Pending</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>Overall status for this student</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {!studentId ? (
              <div className="text-sm text-muted-foreground">Enter a student ID to view summary.</div>
            ) : !summary ? (
              <div className="text-sm text-muted-foreground">Loading summary...</div>
            ) : (
              <div className="space-y-2 text-sm">
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
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


