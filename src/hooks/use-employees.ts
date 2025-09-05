import { useApiQuery, useApiMutation } from './use-api'
import { api, endpoints } from '@/lib/api'

// Types
export interface Employee {
  id: number
  emp_id: string
  name: string
  email: string
  phone: string
  position: string
  role: string
  status: string
  join_date: string
  department: string
  salary: number
  address: string
  created_at: string
  updated_at: string
}

export interface EmployeeAttendanceRecord {
  id: number
  employee: string
  employee_name: string
  date: string
  check_in_time?: string | null
  check_out_time?: string | null
  status: 'present' | 'absent' | 'late' | 'half_day' | 'on_leave'
  notes?: string | null
  working_hours?: string | null
  created_at: string
  updated_at: string
}

export interface CreateEmployeeData {
  name: string
  email: string
  phone: string
  position: string
  role: string
  join_date: string
  department: string
  salary: number
  address: string
}

export interface UpdateEmployeeData extends Partial<CreateEmployeeData> {
  id: number
}

// Hooks
export function useEmployees() {
  return useApiQuery<Employee[]>(
    ['employees'],
    () => api.get(endpoints.employees),
    {
      staleTime: 1000 * 60 * 2, // 2 minutes
    }
  )
}

export function useEmployee(id: number | string) {
  return useApiQuery<Employee>(
    ['employee', id.toString()],
    () => api.get(endpoints.employee(id)),
    {
      enabled: !!id,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  )
}

// Attendance queries/mutations
export function useEmployeeAttendanceByDate(employeeId: string, date: string) {
  return useApiQuery<EmployeeAttendanceRecord[]>(
    ['employee-attendance', employeeId, date],
    () => api.get(`${endpoints.employees.replace(/\/$/, '')}/${employeeId}/attendance/`)
      .then((records: any) => {
        if (!Array.isArray(records)) return [] as EmployeeAttendanceRecord[]
        return (records as EmployeeAttendanceRecord[]).filter(r => r.date === date)
      }),
    {
      enabled: !!employeeId && !!date,
      staleTime: 1000 * 30,
    }
  )
}

export function useEmployeeAttendanceList(employeeId: string) {
  return useApiQuery<EmployeeAttendanceRecord[]>(
    ['employee-attendance', employeeId],
    () => api.get(`${endpoints.employees.replace(/\/$/, '')}/${employeeId}/attendance/`),
    {
      enabled: !!employeeId,
      staleTime: 1000 * 60,
    }
  )
}

export function useMarkEmployeeAttendance() {
  return useApiMutation<EmployeeAttendanceRecord, { employeeId: string, data: Omit<EmployeeAttendanceRecord, 'id' | 'employee' | 'employee_name' | 'working_hours' | 'created_at' | 'updated_at'> }>(
    ({ employeeId, data }) => api.post(`${endpoints.employees.replace(/\/$/, '')}/${employeeId}/mark_attendance/`, data),
    {
      invalidateQueries: [['employee-attendance']],
      onSuccess: () => {
        console.log('Attendance marked successfully')
      },
      onError: (error) => {
        console.error('Failed to mark attendance:', error)
      },
    }
  )
}

export function useCreateEmployee() {
  return useApiMutation<Employee, CreateEmployeeData>(
    (data) => api.post(endpoints.employees, data),
    {
      invalidateQueries: [['employees']],
      onSuccess: (data) => {
        console.log('Employee created successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to create employee:', error)
      },
    }
  )
}

export function useUpdateEmployee() {
  return useApiMutation<Employee, UpdateEmployeeData>(
    (data) => api.put(endpoints.employee(data.id), data),
    {
      invalidateQueries: [['employees'], ['employee', data => data.id.toString()]],
      onSuccess: (data) => {
        console.log('Employee updated successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to update employee:', error)
      },
    }
  )
}

export function useDeleteEmployee() {
  return useApiMutation<void, number>(
    (id) => api.delete(endpoints.employee(id)),
    {
      invalidateQueries: [['employees']],
      onSuccess: () => {
        console.log('Employee deleted successfully')
      },
      onError: (error) => {
        console.error('Failed to delete employee:', error)
      },
    }
  )
}


