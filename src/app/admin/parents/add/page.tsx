'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateParent, CreateParentData } from '@/hooks/use-parents'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Users } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  alternate_phone: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']),
  date_of_birth: z.string().optional(),
  occupation: z.enum(['employed','self_employed','business','professional','government','private','unemployed','retired','student','other']),
  job_title: z.string().optional(),
  workplace: z.string().optional(),
  address: z.string().min(5),
  emergency_contact: z.string().optional(),
  emergency_phone: z.string().optional(),
  is_primary_contact: z.boolean().optional().default(false),
  is_emergency_contact: z.boolean().optional().default(true),
  notes: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

export default function AddParentPage() {
  const router = useRouter()
  const createParent = useCreateParent()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '', email: '', phone: '', gender: 'male', occupation: 'employed', address: '',
      is_primary_contact: false, is_emergency_contact: true,
    },
  })

  const onSubmit = async (values: FormValues) => {
    const payload: CreateParentData = { ...values }
    await createParent.mutateAsync(payload)
    router.push('/admin/parents')
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2"><Users className="h-6 w-6" /> Add Parent</h1>
          <p className="text-muted-foreground">Create a new parent/guardian</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Parent Information</CardTitle>
          <CardDescription>Basic details and contact information</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField name="name" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl><Input placeholder="Full name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="email" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input type="email" placeholder="email@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="phone" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl><Input placeholder="Primary phone" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="alternate_phone" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alternate Phone</FormLabel>
                    <FormControl><Input placeholder="Optional" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="gender" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="occupation" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select occupation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {['employed','self_employed','business','professional','government','private','unemployed','retired','student','other'].map(o => (
                          <SelectItem key={o} value={o}>{o.replace('_',' ')}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="job_title" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl><Input placeholder="Optional" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="workplace" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workplace</FormLabel>
                    <FormControl><Input placeholder="Company/Organization" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField name="address" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl><Textarea rows={3} placeholder="Home address" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField name="emergency_contact" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact</FormLabel>
                    <FormControl><Input placeholder="Contact person" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="emergency_phone" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Phone</FormLabel>
                    <FormControl><Input placeholder="Phone number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField name="notes" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl><Textarea rows={3} placeholder="Additional notes (optional)" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="flex justify-end gap-3">
                <Button variant="outline" type="button" onClick={() => router.push('/admin/parents')}>Cancel</Button>
                <Button type="submit" disabled={createParent.isLoading}>{createParent.isLoading ? 'Saving...' : 'Save Parent'}</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}


