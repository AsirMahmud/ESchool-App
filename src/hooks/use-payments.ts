import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

// Types
export interface Payment {
  pay_id: number;
  parent: number;
  parent_name: string;
  student: string;
  student_name: string;
  student_number: string;
  payment_type: string;
  amount: string;
  due_date: string;
  payment_date?: string;
  status: 'pending' | 'paid' | 'overdue' | 'partial' | 'cancelled' | 'refunded';
  payment_method?: string;
  transaction_id?: string;
  academic_year: string;
  semester?: string;
  description?: string;
  late_fee: string;
  discount: string;
  total_amount: string;
  is_overdue: boolean;
  days_overdue: number;
  payment_history: PaymentHistory[];
  created_at: string;
  updated_at: string;
}

export interface PaymentHistory {
  id: number;
  payment: number;
  installment_number: number;
  amount: string;
  due_date: string;
  payment_date?: string;
  status: string;
  payment_method?: string;
  transaction_id?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePaymentData {
  parent: number;
  student: string;
  payment_type: string;
  amount: string;
  due_date: string;
  academic_year: string;
  semester?: string;
  description?: string;
  late_fee?: string;
  discount?: string;
}

export interface PaymentSummary {
  total_payments: number;
  total_amount: number;
  paid_amount: number;
  pending_amount: number;
  overdue_count: number;
  by_status: Array<{
    status: string;
    count: number;
    total: number;
  }>;
}

export interface StudentPaymentSummary {
  total_due: number;
  total_paid: number;
  total_overdue: number;
  pending_payments: number;
  overdue_payments: number;
  payment_rate: number;
}

// Hooks
export function usePayments(filters?: Record<string, any>) {
  return useQuery({
    queryKey: ['payments', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            params.append(key, String(value));
          }
        });
      }
      
      const response = await api.get(`/payments/?${params.toString()}`);
      return response.data;
    },
  });
}

export function usePayment(paymentId: number) {
  return useQuery({
    queryKey: ['payment', paymentId],
    queryFn: async () => {
      const response = await api.get(`/payments/${paymentId}/`);
      return response.data as Payment;
    },
    enabled: !!paymentId,
  });
}

export function usePaymentSummary() {
  return useQuery({
    queryKey: ['payment-summary'],
    queryFn: async () => {
      const response = await api.get('/payments/summary/');
      return response.data as PaymentSummary;
    },
  });
}

export function useStudentPaymentSummary(studentId: string) {
  return useQuery({
    queryKey: ['student-payment-summary', studentId],
    queryFn: async () => {
      const response = await api.get(`/payments/summary/${studentId}/`);
      return response.data as StudentPaymentSummary;
    },
    enabled: !!studentId,
  });
}

export function usePendingPayments() {
  return useQuery({
    queryKey: ['pending-payments'],
    queryFn: async () => {
      const response = await api.get('/payments/pending/');
      return response.data;
    },
  });
}

export function useOverduePayments() {
  return useQuery({
    queryKey: ['overdue-payments'],
    queryFn: async () => {
      const response = await api.get('/payments/overdue/');
      return response.data;
    },
  });
}

export function usePaymentsByType() {
  return useQuery({
    queryKey: ['payments-by-type'],
    queryFn: async () => {
      const response = await api.get('/payments/by_type/');
      return response.data;
    },
  });
}

export function usePaymentsByStatus() {
  return useQuery({
    queryKey: ['payments-by-status'],
    queryFn: async () => {
      const response = await api.get('/payments/by_status/');
      return response.data;
    },
  });
}

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePaymentData) => {
      const response = await api.post('/payments/', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['payment-summary'] });
      queryClient.invalidateQueries({ queryKey: ['pending-payments'] });
      queryClient.invalidateQueries({ queryKey: ['payments-by-status'] });
    },
  });
}

export function useUpdatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ paymentId, data }: { paymentId: number; data: Partial<Payment> }) => {
      const response = await api.patch(`/payments/${paymentId}/`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['payment', data.pay_id] });
      queryClient.invalidateQueries({ queryKey: ['payment-summary'] });
      queryClient.invalidateQueries({ queryKey: ['pending-payments'] });
      queryClient.invalidateQueries({ queryKey: ['overdue-payments'] });
    },
  });
}

export function useMarkPaymentPaid() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (paymentId: number) => {
      const response = await api.post(`/payments/${paymentId}/mark_paid/`);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['payment', data.pay_id] });
      queryClient.invalidateQueries({ queryKey: ['payment-summary'] });
      queryClient.invalidateQueries({ queryKey: ['pending-payments'] });
      queryClient.invalidateQueries({ queryKey: ['overdue-payments'] });
      queryClient.invalidateQueries({ queryKey: ['payments-by-status'] });
    },
  });
}

export function useDeletePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (paymentId: number) => {
      await api.delete(`/payments/${paymentId}/`);
      return paymentId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['payment-summary'] });
      queryClient.invalidateQueries({ queryKey: ['pending-payments'] });
      queryClient.invalidateQueries({ queryKey: ['overdue-payments'] });
    },
  });
}

// Parent-specific payment hooks
export function useParentPayments(parentId: number) {
  return useQuery({
    queryKey: ['parent-payments', parentId],
    queryFn: async () => {
      const response = await api.get(`/parents/${parentId}/payments/`);
      return response.data;
    },
    enabled: !!parentId,
  });
}

export function useCreateParentPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ parentId, data }: { parentId: number; data: CreatePaymentData }) => {
      const response = await api.post(`/parents/${parentId}/make_payment/`, data);
      return response.data;
    },
    onSuccess: (_, { parentId }) => {
      queryClient.invalidateQueries({ queryKey: ['parent-payments', parentId] });
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['payment-summary'] });
    },
  });
}

// Monthly payments for students
export function useMonthlyPayments(studentId: string, year: number, month: number) {
  return useQuery({
    queryKey: ['monthly-payments', studentId, year, month],
    queryFn: async () => {
      const response = await api.get(`/payments/monthly/${studentId}/${year}/${month}/`);
      return response.data;
    },
    enabled: !!(studentId && year && month),
  });
}
