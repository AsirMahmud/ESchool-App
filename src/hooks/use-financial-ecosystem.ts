import { useApiQuery, useApiMutation } from './use-api'
import { api, endpoints } from '@/lib/api'

// Types
export interface FinancialTransaction {
  transaction_id: number
  transaction_type: 'revenue' | 'expense'
  category: string
  amount: number
  description: string
  transaction_date: string
  payment_method?: string
  reference_id?: string
  reference_type?: string
  created_by?: number
  created_by_name?: string
  notes?: string
  is_revenue: boolean
  is_expense: boolean
  created_at: string
  updated_at: string
}

export interface FinancialSummary {
  summary_id: number
  period_type: 'monthly' | 'yearly'
  year: number
  month?: number
  total_revenue: number
  total_expenses: number
  net_profit: number
  student_fees_revenue: number
  salary_expenses: number
  operational_expenses: number
  transaction_count: number
  profit_margin: number
  period_display: string
  created_at: string
  updated_at: string
}

export interface Budget {
  budget_id: number
  name: string
  budget_type: 'annual' | 'quarterly' | 'monthly'
  category: 'revenue' | 'expense'
  year: number
  quarter?: number
  month?: number
  budgeted_amount: number
  actual_amount: number
  variance: number
  variance_percentage: number
  utilization_percentage: number
  is_over_budget: boolean
  description?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface FinancialOverview {
  total_revenue: number
  total_expenses: number
  net_profit: number
  profit_margin: number
  student_fees_revenue: number
  other_revenue: number
  salary_expenses: number
  operational_expenses: number
  total_transactions: number
}

export interface MonthlyTrend {
  month: number
  month_name: string
  revenue: number
  expenses: number
  net_profit: number
}

export interface CategoryBreakdown {
  category: string
  total: number
  count: number
}

export interface StudentPaymentRequest {
  parent: number
  student: number
  payment_type: string
  amount: string
  due_date: string
  payment_date: string
  status: string
  payment_method?: string
  transaction_id?: string
  academic_year: string
  semester?: string
  description?: string
  late_fee?: string
  discount?: string
}

export interface SalaryPaymentRequest {
  employee: number
  salary_type: string
  amount: string
  month: string
  basic_salary: string
  pay_date: string
  allowances?: string
  deductions?: string
  overtime_hours?: string
  overtime_rate?: string
  tax_deduction?: string
  notes?: string
}

// Hooks for Financial Transactions
export function useFinancialTransactions(params?: {
  transaction_type?: string
  category?: string
  search?: string
  start_date?: string
  end_date?: string
}) {
  return useApiQuery({
    queryKey: ['financial-transactions', params],
    queryFn: () => api.get('/financial-transactions/', { params }),
  })
}

export function useFinancialTransaction(id: number) {
  return useApiQuery({
    queryKey: ['financial-transaction', id],
    queryFn: () => api.get(`/financial-transactions/${id}/`),
    enabled: !!id,
  })
}

export function useCreateFinancialTransaction() {
  return useApiMutation(
    (data: Partial<FinancialTransaction>) =>
      api.post('/financial-transactions/', data),
    {
      invalidateQueries: [['financial-transactions'], ['financial-overview'], ['monthly-trend']],
    }
  )
}

export function useUpdateFinancialTransaction() {
  return useApiMutation(
    ({ id, ...data }: { id: number } & Partial<FinancialTransaction>) =>
      api.patch(`/financial-transactions/${id}/`, data),
    {
      invalidateQueries: [['financial-transactions'], ['financial-overview'], ['monthly-trend']],
    }
  )
}

export function useDeleteFinancialTransaction() {
  return useApiMutation({
    mutationFn: (id: number) => api.delete(`/financial-transactions/${id}/`),
    invalidateQueries: [['financial-transactions'], ['financial-overview'], ['monthly-trend']],
  })
}

// Financial Overview
export function useFinancialOverview(params?: {
  start_date?: string
  end_date?: string
}) {
  return useApiQuery({
    queryKey: ['financial-overview', params],
    queryFn: () => api.get('/financial-transactions/overview/', { params }),
  })
}

// Monthly Trends
export function useMonthlyTrend(year?: number) {
  return useApiQuery({
    queryKey: ['monthly-trend', year],
    queryFn: () => api.get('/financial-transactions/monthly_trend/', { 
      params: year ? { year } : {} 
    }),
  })
}

// Category Breakdown
export function useCategoryBreakdown(params?: {
  type?: 'revenue' | 'expense'
  start_date?: string
  end_date?: string
}) {
  return useApiQuery({
    queryKey: ['category-breakdown', params],
    queryFn: () => api.get('/financial-transactions/category_breakdown/', { params }),
  })
}

// Student Payment Recording
export function useRecordStudentPayment() {
  return useApiMutation(
    async (data: StudentPaymentRequest) => {
      console.log('Recording student payment with data:', data);
      try {
        const response = await api.post('/financial-transactions/record_student_payment/', data);
        console.log('Student payment response:', response);
        return response;
      } catch (error) {
        console.error('Student payment error:', error);
        throw error;
      }
    },
    {
      invalidateQueries: [
        ['financial-transactions'], 
        ['financial-overview'], 
        ['payments'],
        ['monthly-trend']
      ],
    }
  )
}

// Salary Payment Recording
export function useRecordSalaryPayment() {
  return useApiMutation(
    async (data: SalaryPaymentRequest) => {
      console.log('Recording salary payment with data:', data);
      try {
        const response = await api.post('/financial-transactions/record_salary_payment/', data);
        console.log('Salary payment response:', response);
        return response;
      } catch (error) {
        console.error('Salary payment error:', error);
        throw error;
      }
    },
    {
      invalidateQueries: [
        ['financial-transactions'], 
        ['financial-overview'], 
        ['employee-salaries'],
        ['monthly-trend']
      ],
    }
  )
}

// Hooks for Financial Summaries
export function useFinancialSummaries(params?: {
  period_type?: string
  year?: number
  month?: number
}) {
  return useApiQuery({
    queryKey: ['financial-summaries', params],
    queryFn: () => api.get('/financial-summaries/', { params }),
  })
}

export function useGenerateFinancialSummary() {
  return useApiMutation({
    mutationFn: (data: { period_type: string; year: number; month?: number }) =>
      api.post('/financial-summaries/generate_summary/', data),
    invalidateQueries: [['financial-summaries']],
  })
}

// Hooks for Budgets
export function useBudgets(params?: {
  budget_type?: string
  category?: string
  year?: number
  is_active?: boolean
}) {
  return useApiQuery({
    queryKey: ['budgets', params],
    queryFn: () => api.get('/budgets/', { params }),
  })
}

export function useBudget(id: number) {
  return useApiQuery({
    queryKey: ['budget', id],
    queryFn: () => api.get(`/budgets/${id}/`),
    enabled: !!id,
  })
}

export function useCreateBudget() {
  return useApiMutation({
    mutationFn: (data: Partial<Budget>) =>
      api.post('/budgets/', data),
    invalidateQueries: [['budgets']],
  })
}

export function useUpdateBudget() {
  return useApiMutation({
    mutationFn: ({ id, ...data }: { id: number } & Partial<Budget>) =>
      api.patch(`/budgets/${id}/`, data),
    invalidateQueries: [['budgets']],
  })
}

export function useDeleteBudget() {
  return useApiMutation({
    mutationFn: (id: number) => api.delete(`/budgets/${id}/`),
    invalidateQueries: [['budgets']],
  })
}

export function useCurrentYearBudgets() {
  return useApiQuery({
    queryKey: ['current-year-budgets'],
    queryFn: () => api.get('/budgets/current_year/'),
  })
}

export function useOverBudgetItems() {
  return useApiQuery({
    queryKey: ['over-budget-items'],
    queryFn: () => api.get('/budgets/over_budget/'),
  })
}

export function useUpdateBudgetActual() {
  return useApiMutation({
    mutationFn: ({ id, actual_amount }: { id: number; actual_amount: number }) =>
      api.post(`/budgets/${id}/update_actual/`, { actual_amount }),
    invalidateQueries: [['budgets'], ['over-budget-items']],
  })
}

// Utility functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const calculateProfitMargin = (revenue: number, expenses: number): number => {
  if (revenue === 0) return 0
  return ((revenue - expenses) / revenue) * 100
}

export const getTransactionTypeColor = (type: 'revenue' | 'expense'): string => {
  return type === 'revenue' ? 'text-green-600' : 'text-red-600'
}

export const getTransactionTypeBadgeVariant = (type: 'revenue' | 'expense') => {
  return type === 'revenue' ? 'default' : 'destructive'
}
