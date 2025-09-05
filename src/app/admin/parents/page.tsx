'use client'

import { useState } from 'react'
import { useParents } from '@/hooks/use-parents'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Users } from 'lucide-react'

export default function ParentsPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const { data: parents = [], isLoading } = useParents(query)

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2"><Users className="h-6 w-6" /> Parents</h1>
          <p className="text-muted-foreground">Manage parents and guardians</p>
        </div>
        <Button onClick={() => router.push('/admin/parents/add')}>
          <Plus className="h-4 w-4 mr-2" /> Add Parent
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Parents</CardTitle>
          <CardDescription>Search and manage parent records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, phone, workplace"
                className="pl-8"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Occupation</TableHead>
                  <TableHead>Workplace</TableHead>
                  <TableHead>Primary</TableHead>
                  <TableHead>Children</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7}>Loading...</TableCell>
                  </TableRow>
                ) : parents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7}>No parents found.</TableCell>
                  </TableRow>
                ) : (
                  parents.map((p) => (
                    <TableRow key={p.p_id} className="cursor-pointer" onClick={() => router.push(`/admin/parents/${p.p_id}`)}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell>{p.email}</TableCell>
                      <TableCell>{p.phone}</TableCell>
                      <TableCell className="capitalize">{p.occupation?.toString().replace('_',' ')}</TableCell>
                      <TableCell>{p.workplace || '-'}</TableCell>
                      <TableCell>{p.is_primary_contact ? <Badge>Primary</Badge> : '-'}</TableCell>
                      <TableCell>{p.children_count ?? 0}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


