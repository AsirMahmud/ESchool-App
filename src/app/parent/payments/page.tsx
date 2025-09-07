'use client'

import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCurrentParent, useParentChildren, useParentPayments } from '@/hooks/use-parents'
import { CreditCard, Calendar, AlertCircle, CheckCircle, Clock, DollarSign } from 'lucide-react'
import { format } from 'date-fns'

export default function ParentPaymentsPage() {
  const searchParams = useSearchParams()
  const selectedChildId = searchParams.get('child')

  const { data: parent } = useCurrentParent()
  const { data: children } = useParentChildren(parent?.p_id)

  const selectedChild = children?.find(child => child.s_id === selectedChildId) || children?.[0]
  const { data: payments, isLoading } = useParentPayments(parent?.p_id)

  // Filter payments for the selected child
  const childPayments = payments?.filter(payment => payment.student_id === selectedChild?.s_id) || []

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600">Loading payment information...</p>
        </div>
      </div>
    )
  }

  const pendingPayments = childPayments.filter(p => p.status === 'pending')
  const paidPayments = childPayments.filter(p => p.status === 'paid')
  const overduePayments = childPayments.filter(p => p.status === 'overdue')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-600">
          {selectedChild
            ? `${selectedChild.name}'s payment history and outstanding fees`
            : 'Select a child to view their payments'
          }
        </p>
      </div>

      {selectedChild && (
        <>
          {/* Payment Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold">{pendingPayments.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Paid</p>
                    <p className="text-2xl font-bold">{paidPayments.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Overdue</p>
                    <p className="text-2xl font-bold">{overduePayments.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Due</p>
                    <p className="text-2xl font-bold">
                      ${pendingPayments.reduce((sum, p) => sum + (p.amount - (p.discount || 0)), 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Payment History</h2>

            {childPayments.length > 0 ? (
              childPayments.map((payment) => (
                <Card key={payment.pay_id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                          <div>
                            <h3 className="font-semibold">{payment.payment_type}</h3>
                            <p className="text-sm text-gray-600">{payment.description || 'No description'}</p>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Amount</p>
                            <p className="font-semibold">${payment.amount}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Due Date</p>
                            <p className="font-semibold">{format(new Date(payment.due_date), 'MMM dd, yyyy')}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Academic Year</p>
                            <p className="font-semibold">{payment.academic_year}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Status</p>
                            <Badge
                              variant={
                                payment.status === 'paid' ? 'default' :
                                payment.status === 'pending' ? 'secondary' :
                                'destructive'
                              }
                              className={
                                payment.status === 'paid' ? 'bg-green-100 text-green-800' :
                                payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }
                            >
                              {payment.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No payment records found for {selectedChild.name}.</p>
                    <p className="text-sm text-gray-500 mt-2">Payment history will appear here when available.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}

      {!selectedChild && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-gray-600">No children found associated with your account.</p>
              <p className="text-sm text-gray-500 mt-2">Please contact the school administration if this seems incorrect.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

