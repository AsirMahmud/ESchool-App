import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

// Types
export interface EmployeeSalary {
  sal_id: number;
  employee: string;
  employee_name: string;
  employee_position: string;
  department_name: string;
  salary_type: 'monthly' | 'bonus' | 'overtime' | 'allowance' | 'deduction' | 'other';
  amount: string;
  month: string;
  pay_date: string;
  paid_date?: string;
  status: 'pending' | 'paid' | 'cancelled' | 'on_hold';
  basic_salary: string;
  allowances: string;
  deductions: string;
  overtime_hours: string;
  overtime_rate: string;
  tax_deduction: string;
  net_salary: string;
  is_overdue: boolean;
  gross_salary: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateSalaryData {
  employee: string;
  salary_type?: string;
  month: string;
  pay_date: string;
  basic_salary: string;
  allowances?: string;
  deductions?: string;
  overtime_hours?: string;
  overtime_rate?: string;
  tax_deduction?: string;
  notes?: string;
}

export interface SalarySummary {
  total_salaries: number;
  total_amount: number;
  paid_amount: number;
  pending_amount: number;
  overdue_count: number;
  by_status: Array<{
    status: string;
    count: number;
    total: number;
  }>;
  by_department: Array<{
    employee__department__d_name: string;
    count: number;
    total: number;
  }>;
}

export interface MonthlySalarySummary {
  month: string;
  total_employees: number;
  total_amount: number;
  paid_amount: number;
  pending_amount: number;
  by_type: Array<{
    salary_type: string;
    count: number;
    total: number;
  }>;
}

// Hooks
export function useSalaries(filters?: Record<string, any>) {
  return useQuery({
    queryKey: ['salaries', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            params.append(key, String(value));
          }
        });
      }
      
      const response = await api.get(`/employee-salaries/?${params.toString()}`);
      return response.data as { results: EmployeeSalary[]; count: number; next: string | null; previous: string | null; };
    },
  });
}

export function useSalary(salaryId: number) {
  return useQuery({
    queryKey: ['salary', salaryId],
    queryFn: async () => {
      const response = await api.get(`/employee-salaries/${salaryId}/`);
      return response.data as EmployeeSalary;
    },
    enabled: !!salaryId,
  });
}

export function useSalarySummary() {
  return useQuery({
    queryKey: ['salary-summary'],
    queryFn: async () => {
      const response = await api.get('/employee-salaries/summary/');
      return response.data as SalarySummary;
    },
  });
}

export function useMonthlySalarySummary(month: string) {
  return useQuery({
    queryKey: ['monthly-salary-summary', month],
    queryFn: async () => {
      const response = await api.get(`/employee-salaries/monthly_summary/?month=${month}`);
      return response.data as MonthlySalarySummary;
    },
    enabled: !!month,
  });
}

export function usePendingSalaries() {
  return useQuery({
    queryKey: ['pending-salaries'],
    queryFn: async () => {
      const response = await api.get('/employee-salaries/pending/');
      return response.data;
    },
  });
}

export function useOverdueSalaries() {
  return useQuery({
    queryKey: ['overdue-salaries'],
    queryFn: async () => {
      const response = await api.get('/employee-salaries/overdue/');
      return response.data;
    },
  });
}

export function useEmployeeSalaryRecords(employeeId: string) {
  return useQuery({
    queryKey: ['employee-salary-records', employeeId],
    queryFn: async () => {
      const response = await api.get(`/employees/${employeeId}/salary_records/`);
      return response.data;
    },
    enabled: !!employeeId,
  });
}

export function useCreateSalary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateSalaryData) => {
      const response = await api.post('/employee-salaries/', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salaries'] });
      queryClient.invalidateQueries({ queryKey: ['salary-summary'] });
      queryClient.invalidateQueries({ queryKey: ['pending-salaries'] });
    },
  });
}

export function useCreateEmployeeSalary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ employeeId, data }: { employeeId: string; data: CreateSalaryData }) => {
      const response = await api.post(`/employees/${employeeId}/add_salary/`, data);
      return response.data;
    },
    onSuccess: (_, { employeeId }) => {
      queryClient.invalidateQueries({ queryKey: ['employee-salary-records', employeeId] });
      queryClient.invalidateQueries({ queryKey: ['salaries'] });
      queryClient.invalidateQueries({ queryKey: ['salary-summary'] });
    },
  });
}

export function useUpdateSalary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ salaryId, data }: { salaryId: number; data: Partial<EmployeeSalary> }) => {
      const response = await api.patch(`/employee-salaries/${salaryId}/`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['salaries'] });
      queryClient.invalidateQueries({ queryKey: ['salary', data.sal_id] });
      queryClient.invalidateQueries({ queryKey: ['salary-summary'] });
      queryClient.invalidateQueries({ queryKey: ['pending-salaries'] });
      queryClient.invalidateQueries({ queryKey: ['overdue-salaries'] });
    },
  });
}

export function useMarkSalaryPaid() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (salaryId: number) => {
      const response = await api.post(`/employee-salaries/${salaryId}/mark_paid/`);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['salaries'] });
      queryClient.invalidateQueries({ queryKey: ['salary', data.sal_id] });
      queryClient.invalidateQueries({ queryKey: ['salary-summary'] });
      queryClient.invalidateQueries({ queryKey: ['pending-salaries'] });
      queryClient.invalidateQueries({ queryKey: ['overdue-salaries'] });
    },
  });
}

export function useDeleteSalary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (salaryId: number) => {
      await api.delete(`/employee-salaries/${salaryId}/`);
      return salaryId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salaries'] });
      queryClient.invalidateQueries({ queryKey: ['salary-summary'] });
      queryClient.invalidateQueries({ queryKey: ['pending-salaries'] });
      queryClient.invalidateQueries({ queryKey: ['overdue-salaries'] });
    },
  });
}

// Bulk operations
export function useBulkMarkSalariesPaid() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (salaryIds: number[]) => {
      const promises = salaryIds.map(id => 
        api.post(`/employee-salaries/${id}/mark_paid/`)
      );
      const responses = await Promise.all(promises);
      return responses.map(response => response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salaries'] });
      queryClient.invalidateQueries({ queryKey: ['salary-summary'] });
      queryClient.invalidateQueries({ queryKey: ['pending-salaries'] });
      queryClient.invalidateQueries({ queryKey: ['overdue-salaries'] });
    },
  });
}

export function useBulkCreateSalaries() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (salariesData: CreateSalaryData[]) => {
      const promises = salariesData.map(data => 
        api.post('/employee-salaries/', data)
      );
      const responses = await Promise.all(promises);
      return responses.map(response => response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salaries'] });
      queryClient.invalidateQueries({ queryKey: ['salary-summary'] });
      queryClient.invalidateQueries({ queryKey: ['pending-salaries'] });
    },
  });
}

// Utility functions for salary calculations
export const calculateGrossSalary = (
  basicSalary: number,
  allowances: number = 0,
  overtimeHours: number = 0,
  overtimeRate: number = 0
): number => {
  return basicSalary + allowances + (overtimeHours * overtimeRate);
};

export const calculateNetSalary = (
  grossSalary: number,
  deductions: number = 0,
  taxDeduction: number = 0
): number => {
  return grossSalary - deductions - taxDeduction;
};

export const formatSalaryAmount = (amount: string | number): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
};

export const getSalaryStatusColor = (status: string): string => {
  switch (status) {
    case 'paid':
      return 'text-green-600 bg-green-100';
    case 'pending':
      return 'text-yellow-600 bg-yellow-100';
    case 'overdue':
      return 'text-red-600 bg-red-100';
    case 'cancelled':
      return 'text-gray-600 bg-gray-100';
    case 'on_hold':
      return 'text-orange-600 bg-orange-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};
