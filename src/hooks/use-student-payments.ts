import { useApiQuery, useApiMutation } from './use-api'
import { api, endpoints } from '@/lib/api'

// Types
export interface StudentPayment {
  pay_id: number
  parent: number
  parent_name: string
  student: number
  student_name: string
  student_number: string
  payment_type: 'tuition' | 'transport' | 'library' | 'laboratory' | 'sports' | 'examination' | 'development' | 'other'
  amount: number
  due_date: string
  payment_date?: string
  status: 'pending' | 'paid' | 'overdue' | 'partial' | 'cancelled' | 'refunded'
  payment_method?: 'cash' | 'bank_transfer' | 'check' | 'credit_card' | 'debit_card' | 'online' | 'other'
  transaction_id?: string
  academic_year: string
  semester?: string
  description?: string
  late_fee: number
  discount: number
  total_amount: number
  is_overdue: boolean
  days_overdue: number
  payment_history: PaymentHistory[]
  created_at: string
  updated_at: string
}

export interface PaymentHistory {
  id: number
  payment: number
  installment_number: number
  amount: number
  due_date: string
  payment_date?: string
  status: 'pending' | 'paid' | 'overdue' | 'partial' | 'cancelled' | 'refunded'
  payment_method?: 'cash' | 'bank_transfer' | 'check' | 'credit_card' | 'debit_card' | 'online' | 'other'
  transaction_id?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface CreatePaymentData {
  parent: number
  student: number
  payment_type: 'tuition' | 'transport' | 'library' | 'laboratory' | 'sports' | 'examination' | 'development' | 'other'
  amount: number
  due_date: string
  payment_date?: string
  status?: 'pending' | 'paid' | 'overdue' | 'partial' | 'cancelled' | 'refunded'
  payment_method?: 'cash' | 'bank_transfer' | 'check' | 'credit_card' | 'debit_card' | 'online' | 'other'
  transaction_id?: string
  academic_year: string
  semester?: string
  description?: string
  late_fee?: number
  discount?: number
}

export interface UpdatePaymentData extends Partial<CreatePaymentData> {
  pay_id: number
}

export interface PaymentSummary {
  total_due: number
  total_paid: number
  total_overdue: number
  pending_payments: number
  overdue_payments: number
  payment_rate: number
}

// Hooks
export function useStudentPayments(filters?: {
  student?: number
  parent?: number
  payment_type?: string
  status?: string
  academic_year?: string
  semester?: string
  overdue?: boolean
}) {
  const queryParams = new URLSearchParams()
  if (filters?.student) queryParams.append('student', filters.student.toString())
  if (filters?.parent) queryParams.append('parent', filters.parent.toString())
  if (filters?.payment_type) queryParams.append('payment_type', filters.payment_type)
  if (filters?.status) queryParams.append('status', filters.status)
  if (filters?.academic_year) queryParams.append('academic_year', filters.academic_year)
  if (filters?.semester) queryParams.append('semester', filters.semester)
  if (filters?.overdue) queryParams.append('overdue', 'true')

  return useApiQuery<StudentPayment[]>(
    ['student-payments', filters],
    async () => {
      const endpoint = queryParams.toString() 
        ? `${endpoints.studentPayments}?${queryParams.toString()}`
        : endpoints.studentPayments
      
      const data: any = await api.get(endpoint)
      if (Array.isArray(data)) return data as StudentPayment[]
      if (data && Array.isArray(data.results)) return data.results as StudentPayment[]
      return []
    },
    {
      enabled: !!filters,
      staleTime: 1000 * 60 * 2, // 2 minutes
    }
  )
}

export function useStudentPayment(id: number | string) {
  return useApiQuery<StudentPayment>(
    ['student-payment', id.toString()],
    () => api.get(`${endpoints.studentPayments}${id}/`),
    {
      enabled: !!id,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  )
}

export function useCreatePayment() {
  return useApiMutation<StudentPayment, CreatePaymentData>(
    (data) => api.post(endpoints.studentPayments, data),
    {
      invalidateQueries: [['student-payments']],
      onSuccess: () => {
        console.log('Payment created successfully')
      },
      onError: (error) => {
        console.error('Failed to create payment:', error)
      },
    }
  )
}

export function useUpdatePayment() {
  return useApiMutation<StudentPayment, UpdatePaymentData>(
    (data) => api.put(`${endpoints.studentPayments}${data.pay_id}/`, data),
    {
      invalidateQueries: [['student-payments'], ['student-payment', data => data.pay_id.toString()]],
      onSuccess: () => {
        console.log('Payment updated successfully')
      },
      onError: (error) => {
        console.error('Failed to update payment:', error)
      },
    }
  )
}

export function useDeletePayment() {
  return useApiMutation<void, number>(
    (id) => api.delete(`${endpoints.studentPayments}${id}/`),
    {
      invalidateQueries: [['student-payments']],
      onSuccess: () => {
        console.log('Payment deleted successfully')
      },
      onError: (error) => {
        console.error('Failed to delete payment:', error)
      },
    }
  )
}

// Payment summary for a student
export function useStudentPaymentSummary(studentId: number | string, filters?: {
  academic_year?: string
  semester?: string
}) {
  const queryParams = new URLSearchParams()
  if (filters?.academic_year) queryParams.append('academic_year', filters.academic_year)
  if (filters?.semester) queryParams.append('semester', filters.semester)

  return useApiQuery<PaymentSummary>(
    ['student-payment-summary', studentId.toString(), filters],
    () => api.get(`${endpoints.studentPayments}summary/${studentId}/?${queryParams.toString()}`),
    {
      enabled: !!studentId,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  )
}

// Monthly payment status
export function useMonthlyPaymentStatus(studentId: number | string, year: number, month: number) {
  return useApiQuery<StudentPayment[]>(
    ['monthly-payment-status', studentId.toString(), year.toString(), month.toString()],
    () => api.get(`${endpoints.studentPayments}monthly/${studentId}/${year}/${month}/`),
    {
      enabled: !!studentId && !!year && !!month,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  )
}

// Mark payment as paid
export function useMarkPaymentAsPaid() {
  return useApiMutation<StudentPayment, { 
    pay_id: number; 
    payment_date?: string; 
    payment_method?: string; 
    transaction_id?: string 
  }>(
    (data) => api.patch(`${endpoints.studentPayments}${data.pay_id}/`, {
      status: 'paid',
      payment_date: data.payment_date || new Date().toISOString().split('T')[0],
      payment_method: data.payment_method,
      transaction_id: data.transaction_id
    }),
    {
      invalidateQueries: [['student-payments']],
      onSuccess: () => {
        console.log('Payment marked as paid')
      },
      onError: (error) => {
        console.error('Failed to mark payment as paid:', error)
      },
    }
  )
}
