import { useApiQuery, useApiMutation } from './use-api'
import { api, endpoints } from '@/lib/api'

// Types
export interface StudentDiaryEntry {
  id: number
  student: string
  student_name: string
  subject: string
  subject_name: string
  task: string
  due_date: string
  completion_date?: string
  feedback?: string
  grade?: string
  is_completed: boolean
  created_at: string
  updated_at: string
}

export interface CreateDiaryEntryData {
  student: string
  subject: string
  task: string
  due_date: string
  completion_date?: string
  feedback?: string
  grade?: string
  is_completed?: boolean
}

export interface UpdateDiaryEntryData extends Partial<CreateDiaryEntryData> {
  id: number
}

// Hooks
export function useStudentDiaryEntries(filters?: {
  student?: string
  subject?: string
  is_completed?: boolean
  overdue?: boolean
}) {
  const queryParams = new URLSearchParams()
  if (filters?.student) queryParams.append('student', filters.student)
  if (filters?.subject) queryParams.append('subject', filters.subject)
  if (filters?.is_completed !== undefined) queryParams.append('is_completed', filters.is_completed.toString())

  return useApiQuery<StudentDiaryEntry[]>(
    ['student-diary', filters],
    async () => {
      let endpoint = endpoints.studentDiary
      if (filters?.overdue) {
        endpoint = `${endpoints.studentDiary}overdue/`
      } else if (queryParams.toString()) {
        endpoint = `${endpoints.studentDiary}?${queryParams.toString()}`
      }
      
      const data: any = await api.get(endpoint)
      if (Array.isArray(data)) return data as StudentDiaryEntry[]
      if (data && Array.isArray(data.results)) return data.results as StudentDiaryEntry[]
      return []
    },
    {
      staleTime: 1000 * 60 * 2, // 2 minutes
    }
  )
}

export function useStudentDiaryEntry(id: number | string) {
  return useApiQuery<StudentDiaryEntry>(
    ['student-diary', id.toString()],
    () => api.get(`${endpoints.studentDiary}${id}/`),
    {
      enabled: !!id,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  )
}

export function useCreateDiaryEntry() {
  return useApiMutation<StudentDiaryEntry, CreateDiaryEntryData>(
    (data) => api.post(endpoints.studentDiary, data),
    {
      invalidateQueries: [['student-diary']],
      onSuccess: () => {
        console.log('Diary entry created successfully')
      },
      onError: (error) => {
        console.error('Failed to create diary entry:', error)
      },
    }
  )
}

export function useUpdateDiaryEntry() {
  return useApiMutation<StudentDiaryEntry, UpdateDiaryEntryData>(
    (data) => api.patch(`${endpoints.studentDiary}${data.id}/`, data),
    {
      invalidateQueries: [['student-diary']],
      onSuccess: () => {
        console.log('Diary entry updated successfully')
      },
      onError: (error) => {
        console.error('Failed to update diary entry:', error)
      },
    }
  )
}

export function useDeleteDiaryEntry() {
  return useApiMutation<void, number>(
    (id) => api.delete(`${endpoints.studentDiary}${id}/`),
    {
      invalidateQueries: [['student-diary']],
      onSuccess: () => {
        console.log('Diary entry deleted successfully')
      },
      onError: (error) => {
        console.error('Failed to delete diary entry:', error)
      },
    }
  )
}

// Mark diary entry as completed
export function useMarkDiaryEntryCompleted() {
  return useApiMutation<StudentDiaryEntry, { id: number; completion_date?: string; grade?: string }>(
    (data) => api.patch(`${endpoints.studentDiary}${data.id}/`, {
      is_completed: true,
      completion_date: data.completion_date || new Date().toISOString().split('T')[0],
      grade: data.grade
    }),
    {
      invalidateQueries: [['student-diary']],
      onSuccess: () => {
        console.log('Diary entry marked as completed')
      },
      onError: (error) => {
        console.error('Failed to mark diary entry as completed:', error)
      },
    }
  )
}
