'use client'

import { useExamResultsByStudent } from '@/hooks/use-exams'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useApiQuery } from '@/hooks/use-api'
import { api, endpoints } from '@/lib/api'
import type { Exam } from '@/hooks/use-exams'

export default function StudentResultsPage() {
  const { data: results } = useExamResultsByStudent()
  const examIds = Array.from(new Set((results || []).map(r => r.exam))).filter(Boolean) as (number | string)[]
  const { data: examMap } = useApiQuery<Record<string, Exam>>(
    ['exam-map', examIds.join(',')],
    async () => {
      if (examIds.length === 0) return {}
      const entries = await Promise.all(
        examIds.map(async (id) => {
          try {
            const exam = await api.get<Exam>(endpoints.exam(id))
            return [String(id), exam] as const
          } catch {
            return [String(id), undefined] as const
          }
        })
      )
      return entries.reduce<Record<string, Exam>>((acc, [id, exam]) => {
        if (exam) acc[id] = exam
        return acc
      }, {})
    },
    { enabled: examIds.length > 0, staleTime: 1000 * 60 * 5 }
  )
  // Compute pass-rate using the latest result per exam (avoid duplicates)
  const normalized = (results || [])
  const examKeys = Array.from(new Set(normalized.map(r => r.exam)))
  const latestPerExam = examKeys
    .map((id) => {
      const group = normalized.filter(r => r.exam === id)
      const sorted = group.sort((a, b) => {
        const da = new Date(a.graded_at || a.updated_at || '').getTime()
        const db = new Date(b.graded_at || b.updated_at || '').getTime()
        return db - da
      })
      return sorted[0]
    })
    .filter(Boolean)

  const totals = latestPerExam.reduce(
    (acc, r) => {
      acc.total += 1
      acc.passed += r.is_passed ? 1 : 0
      acc.sum += r.marks_obtained
      return acc
    },
    { total: 0, passed: 0, sum: 0 }
  )
  const passRate = totals.total ? Math.round((totals.passed / totals.total) * 100) : 0
  const avg = totals.total ? Math.round(totals.sum / totals.total) : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Results</h1>
        <p className="text-gray-600">View your exam performance and grades.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Overall Pass Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-semibold">{passRate}%</div>
              <Badge variant={passRate >= 60 ? 'default' : 'destructive'}>{totals.passed}/{totals.total} Passed</Badge>
            </div>
            <Progress value={passRate} className="h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Marks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{avg}</div>
            <p className="text-sm text-gray-600">Across {totals.total} results</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Latest Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {latestPerExam
                .slice()
                .sort((a, b) => new Date(b.graded_at || b.updated_at || '').getTime() - new Date(a.graded_at || a.updated_at || '').getTime())
                .slice(0, 3)
                .map(r => (
                <div key={r.id} className="flex items-center justify-between text-sm">
                  <span className="truncate max-w-[60%]">{r.student_name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={r.is_passed ? 'default' : 'destructive'}>{r.grade}</Badge>
                    <span className="text-gray-700">{r.marks_obtained}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {(results || []).map((r) => (
          <Card key={r.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="truncate">
                  {examMap?.[String(r.exam)]?.exam_name || `Exam #${r.exam}`}
                </span>
                <Badge variant={r.is_passed ? 'default' : 'destructive'}>{r.grade}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {examMap?.[String(r.exam)] && (
                <div className="text-xs text-gray-600 mb-2">
                  Subject: {examMap[String(r.exam)].subject_name} • Date: {examMap[String(r.exam)].exam_date} • Type: {examMap[String(r.exam)].exam_type.toUpperCase()}
                </div>
              )}
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-700">Marks</span>
                <span className="font-medium">{r.marks_obtained}</span>
              </div>
              <Progress value={Math.min(100, r.marks_obtained)} className="h-2 mb-2" />
              <div className="text-xs text-gray-600">{r.is_passed ? 'Passed' : 'Failed'}</div>
              {r.remarks && <div className="text-sm text-gray-600 mt-3">{r.remarks}</div>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


