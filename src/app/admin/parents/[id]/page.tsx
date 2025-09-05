'use client'

import { useParams, useRouter } from 'next/navigation'
import { useParent, useParentChildren, useParentPayments } from '@/hooks/use-parents'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArrowLeft, Users, Phone, Mail } from 'lucide-react'

export default function ParentProfilePage() {
  const params = useParams() as { id: string }
  const router = useRouter()
  const id = params?.id
  const { data: parent, isLoading } = useParent(id)
  const { data: children = [] } = useParentChildren(id)
  const { data: payments = [] } = useParentPayments(id)

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Parent Profile</h1>
          <p className="text-muted-foreground">Details, children and payments</p>
        </div>
      </div>

      {isLoading || !parent ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>{parent.name}</CardTitle>
              <CardDescription>{parent.workplace || parent.occupation}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> {parent.email}</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> {parent.phone}</div>
              <div className="text-muted-foreground">{parent.address}</div>
              <div>Primary: {parent.is_primary_contact ? 'Yes' : 'No'}</div>
              <div>Emergency: {parent.is_emergency_contact ? 'Yes' : 'No'}</div>
              <div>Notes: {parent.notes || '-'}</div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Children</CardTitle>
                <CardDescription>Linked students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Student No</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Section</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {children.length === 0 ? (
                        <TableRow><TableCell colSpan={4}>No children linked.</TableCell></TableRow>
                      ) : children.map((c) => (
                        <TableRow key={c.s_id} className="cursor-pointer" onClick={() => router.push(`/admin/students/${c.s_id}`)}>
                          <TableCell className="font-medium">{c.name}</TableCell>
                          <TableCell>{c.student_number}</TableCell>
                          <TableCell>{c.level_name || '-'}</TableCell>
                          <TableCell>{c.section_name || '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
                <CardDescription>Payments made for children</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.length === 0 ? (
                        <TableRow><TableCell colSpan={5}>No payments.</TableCell></TableRow>
                      ) : payments.slice(0, 10).map((p) => (
                        <TableRow key={p.pay_id}>
                          <TableCell>{p.student_name}</TableCell>
                          <TableCell className="capitalize">{p.payment_type.replace('_',' ')}</TableCell>
                          <TableCell>${p.amount}</TableCell>
                          <TableCell>{p.due_date}</TableCell>
                          <TableCell className="capitalize">{p.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}


