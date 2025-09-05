import { useApiQuery, useApiMutation } from './use-api'
import { api, endpoints } from '@/lib/api'

// Types
export interface Department {
  id: number
  d_name: string
  location: string
  d_type: 'academic' | 'administrative' | 'support' | 'finance' | 'hr'
  description?: string | null
  head_of_department?: number | null
  head_of_department_name?: string | null
  employee_count?: number
  student_count?: number
  created_at: string
  updated_at: string
}

export interface CreateDepartmentData {
  d_name: string
  location: string
  d_type?: Department['d_type']
  description?: string
  head_of_department?: number | null
}

export interface UpdateDepartmentData extends Partial<CreateDepartmentData> {
  d_name: string
}

// Hooks
export function useDepartments() {
  return useApiQuery<Department[]>(
    ['departments'],
    async () => {
      const data: any = await api.get(endpoints.departments)
      if (Array.isArray(data)) return data as Department[]
      if (data && Array.isArray(data.results)) return data.results as Department[]
      return []
    },
    {
      staleTime: 0,
      gcTime: 0,
      refetchOnMount: 'always',
      refetchOnWindowFocus: true,
    }
  )
}

export function useDepartment(id: number | string) {
  return useApiQuery<Department>(
    ['department', id.toString()],
    () => api.get(endpoints.department(id)),
    {
      enabled: !!id,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  )
}

export function useCreateDepartment() {
  return useApiMutation<Department, CreateDepartmentData>(
    (data) => api.post(endpoints.departments, data),
    {
      invalidateQueries: [['departments']],
      onSuccess: (data) => {
        console.log('Department created successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to create department:', error)
      },
    }
  )
}

export function useUpdateDepartment() {
  return useApiMutation<Department, UpdateDepartmentData>(
    (data) => api.put(endpoints.department(data.d_name), data),
    {
      invalidateQueries: [['departments']],
      onSuccess: (data) => {
        console.log('Department updated successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to update department:', error)
      },
    }
  )
}

export function useDeleteDepartment() {
  return useApiMutation<void, string>(
    (d_name) => api.delete(endpoints.department(d_name)),
    {
      invalidateQueries: [['departments']],
      onSuccess: () => {
        console.log('Department deleted successfully')
      },
      onError: (error) => {
        console.error('Failed to delete department:', error)
      },
    }
  )
}
