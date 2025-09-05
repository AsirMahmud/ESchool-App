import { useApiQuery, useApiMutation } from './use-api'
import { api, endpoints } from '@/lib/api'

// Types
export interface Subject {
  s_code: string
  s_name: string
  subject_type: string
  difficulty_level: string
  description?: string
  department: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CreateSubjectData {
  s_code: string
  s_name: string
  subject_type: string
  difficulty_level: string
  description?: string
  department: string
  is_active?: boolean
}

export interface UpdateSubjectData extends Partial<CreateSubjectData> {
  s_code: string
}

// Hooks
export function useSubjects() {
  return useApiQuery<Subject[]>(
    ['subjects'],
    async () => {
      const data: any = await api.get(endpoints.subjects)
      // Handle DRF pagination { count, next, previous, results }
      if (Array.isArray(data)) return data as Subject[]
      if (data && Array.isArray(data.results)) return data.results as Subject[]
      return []
    },
    {
      staleTime: 1000 * 60 * 2, // 2 minutes
    }
  )
}

export function useSubject(code: string) {
  return useApiQuery<Subject>(
    ['subject', code],
    () => api.get(endpoints.subject(code)),
    {
      enabled: !!code,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  )
}

export function useCreateSubject() {
  return useApiMutation<Subject, CreateSubjectData>(
    (data) => api.post(endpoints.subjects, data),
    {
      invalidateQueries: [['subjects']],
      onSuccess: (data) => {
        console.log('Subject created successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to create subject:', error)
      },
    }
  )
}

export function useUpdateSubject() {
  return useApiMutation<Subject, UpdateSubjectData>(
    (data) => api.put(endpoints.subject(data.s_code), data),
    {
      invalidateQueries: [['subjects'], ['subject']],
      onSuccess: (data) => {
        console.log('Subject updated successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to update subject:', error)
      },
    }
  )
}

export function useDeleteSubject() {
  return useApiMutation<void, string>(
    (code) => api.delete(endpoints.subject(code)),
    {
      invalidateQueries: [['subjects']],
      onSuccess: () => {
        console.log('Subject deleted successfully')
      },
      onError: (error) => {
        console.error('Failed to delete subject:', error)
      },
    }
  )
}


