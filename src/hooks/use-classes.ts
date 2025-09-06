import { useApiQuery, useApiMutation } from './use-api'
import { api, endpoints } from '@/lib/api'

export interface ClassScheduleItem {
  id: number
  class_room: number
  class_room_name: string
  day_of_week: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
  start_time: string
  end_time: string
  subject: string
  subject_name: string
  teacher: number
  teacher_name: string
  level: number
  level_name: string
  section?: number
  section_name?: string
  is_active: boolean
  academic_year: string
}

export function useClassSchedules(filters?: {
  level?: number | string
  section?: number | string
  teacher?: number | string
  subject?: string
  is_active?: boolean
}) {
  return useApiQuery<ClassScheduleItem[]>(
    ['class-schedules', filters],
    async () => {
      const params = new URLSearchParams()
      if (filters?.level) params.append('level', String(filters.level))
      if (filters?.section) params.append('section', String(filters.section))
      if (filters?.teacher) params.append('teacher', String(filters.teacher))
      if (filters?.subject) params.append('subject', String(filters.subject))
      if (filters?.is_active !== undefined) params.append('is_active', String(filters.is_active))

      const endpoint = params.toString()
        ? `${endpoints.classSchedules}?${params.toString()}`
        : endpoints.classSchedules

      const data: any = await api.get(endpoint)
      if (Array.isArray(data)) return data as ClassScheduleItem[]
      if (data && Array.isArray(data.results)) return data.results as ClassScheduleItem[]
      return []
    },
    { staleTime: 1000 * 60 * 2 }
  )
}

// Types
export interface Class {
  id: number
  floor: number
  room_no: string
  room_name?: string
  room_type: string
  capacity: number
  description?: string
  equipment?: string
  is_available: boolean
  is_air_conditioned: boolean
  has_projector: boolean
  has_whiteboard: boolean
  has_computers: boolean
  created_at: string
  updated_at: string
}

export interface CreateClassData {
  floor: number
  room_no: string
  room_name?: string
  room_type: string
  capacity: number
  description?: string
  equipment?: string
  is_available?: boolean
  is_air_conditioned?: boolean
  has_projector?: boolean
  has_whiteboard?: boolean
  has_computers?: boolean
}

export interface UpdateClassData extends Partial<CreateClassData> {
  id: number
}

// Hooks
export function useClasses() {
  return useApiQuery<Class[]>(
    ['classes'],
    async () => {
      const data: any = await api.get(endpoints.classes)
      // Handle DRF pagination { count, next, previous, results }
      if (Array.isArray(data)) return data as Class[]
      if (data && Array.isArray(data.results)) return data.results as Class[]
      return []
    },
    {
      staleTime: 1000 * 60 * 2, // 2 minutes
    }
  )
}

export function useClass(id: number | string) {
  return useApiQuery<Class>(
    ['class', id.toString()],
    () => api.get(endpoints.class(id)),
    {
      enabled: !!id,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  )
}

export function useCreateClass() {
  return useApiMutation<Class, CreateClassData>(
    (data) => api.post(endpoints.classes, data),
    {
      invalidateQueries: [['classes']],
      onSuccess: (data) => {
        console.log('Class created successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to create class:', error)
      },
    }
  )
}

export function useUpdateClass() {
  return useApiMutation<Class, UpdateClassData>(
    (data) => api.put(endpoints.class(data.id), data),
    {
      invalidateQueries: [['classes'], ['class']],
      onSuccess: (data) => {
        console.log('Class updated successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to update class:', error)
      },
    }
  )
}

export function useDeleteClass() {
  return useApiMutation<void, number>(
    (id) => api.delete(endpoints.class(id)),
    {
      invalidateQueries: [['classes']],
      onSuccess: () => {
        console.log('Class deleted successfully')
      },
      onError: (error) => {
        console.error('Failed to delete class:', error)
      },
    }
  )
}


