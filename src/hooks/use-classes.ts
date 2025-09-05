import { useApiQuery, useApiMutation } from './use-api'
import { api, endpoints } from '@/lib/api'

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
      invalidateQueries: [['classes'], ['class', data => data.id.toString()]],
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


