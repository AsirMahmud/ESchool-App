import { useApiQuery, useApiMutation, useOptimisticMutation } from './use-api'
import { api, endpoints } from '@/lib/api'

// Types
export interface Student {
  s_id: string
  student_number: string
  name: string
  email: string
  phone?: string
  gender: 'male' | 'female' | 'other'
  date_of_birth: string
  enroll_date: string
  address: string
  previous_education?: string
  status: 'active' | 'inactive' | 'graduated' | 'transferred' | 'suspended' | 'expelled'
  level?: number
  level_name?: string
  section?: number
  section_name?: string
  department?: number
  department_name?: string
  emergency_contact_name: string
  emergency_contact_phone: string
  medical_conditions?: string
  achievements?: string
  photo?: string
  age?: number
  created_at: string
  updated_at: string
}

export interface CreateStudentData {
  student_number: string
  name: string
  email: string
  phone?: string
  gender: 'male' | 'female' | 'other'
  date_of_birth: string
  enroll_date: string
  address: string
  previous_education?: string
  status?: 'active' | 'inactive' | 'graduated' | 'transferred' | 'suspended' | 'expelled'
  level: number
  section?: number
  department?: number
  emergency_contact_name: string
  emergency_contact_phone: string
  medical_conditions?: string
  achievements?: string
  photo?: string
}

export interface UpdateStudentData extends Partial<CreateStudentData> {
  s_id: string
}

// Hooks
export function useStudents() {
  return useApiQuery<Student[]>(
    ['students'],
    async () => {
      try {
        const data: any = await api.get(endpoints.students)
        console.log('Raw API response:', data)
        
        // Handle DRF pagination { count, next, previous, results }
        if (Array.isArray(data)) {
          console.log('Data is array, returning as is')
          return data as Student[]
        }
        
        if (data && Array.isArray(data.results)) {
          console.log('Data has results array, returning results')
          return data.results as Student[]
        }
        
        console.log('Data is not array or has no results, returning empty array')
        return []
      } catch (error) {
        console.error('Error fetching students:', error)
        throw error
      }
    },
    {
      staleTime: 1000 * 60 * 2, // 2 minutes
    }
  )
}

export function useStudent(id: string) {
  return useApiQuery<Student>(
    ['student', id],
    () => api.get(endpoints.student(id)),
    {
      enabled: !!id,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  )
}

export function useCreateStudent() {
  return useApiMutation<Student, CreateStudentData>(
    (data) => api.post(endpoints.students, data),
    {
      invalidateQueries: [['students']],
      onSuccess: (data) => {
        console.log('Student created successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to create student:', error)
      },
    }
  )
}

export function useUpdateStudent() {
  return useApiMutation<Student, UpdateStudentData>(
    (data) => api.put(endpoints.student(data.s_id), data),
    {
      invalidateQueries: [['students'], ['student', data => data.s_id]],
      onSuccess: (data) => {
        console.log('Student updated successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to update student:', error)
      },
    }
  )
}

export function useDeleteStudent() {
  return useApiMutation<void, string>(
    (id) => api.delete(endpoints.student(id)),
    {
      invalidateQueries: [['students']],
      onSuccess: () => {
        console.log('Student deleted successfully')
      },
      onError: (error) => {
        console.error('Failed to delete student:', error)
      },
    }
  )
}

// Optimistic update example
export function useOptimisticUpdateStudent() {
  return useOptimisticMutation<Student, UpdateStudentData>(
    (data) => api.patch(endpoints.student(data.s_id), data),
    {
      queryKey: ['students'],
      updateFn: (oldData, variables) => {
        if (!oldData) return []
        return oldData.map(student => 
          student.s_id === variables.s_id 
            ? { ...student, ...variables }
            : student
        )
      },
      onSuccess: (data) => {
        console.log('Student updated optimistically:', data)
      },
      onError: (error) => {
        console.error('Failed to update student:', error)
      },
    }
  )
}


