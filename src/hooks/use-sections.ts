import { useApiQuery, useApiMutation } from './use-api'
import { api, endpoints } from '@/lib/api'

// Types
export interface Section {
  id: number
  level: number
  sec_no: string
  section_name: string
  section_type: string
  max_students: number
  class_teacher?: number
  room?: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CreateSectionData {
  level: number
  sec_no: string
  section_name: string
  section_type?: string
  max_students?: number
  class_teacher?: number
  room?: number
  is_active?: boolean
}

export interface UpdateSectionData extends Partial<CreateSectionData> {
  id: number
}

// Hooks
export function useSections() {
  return useApiQuery<Section[]>(
    ['sections'],
    async () => {
      const data: any = await api.get(endpoints.sections)
      // Handle DRF pagination { count, next, previous, results }
      if (Array.isArray(data)) return data as Section[]
      if (data && Array.isArray(data.results)) return data.results as Section[]
      return []
    },
    {
      staleTime: 1000 * 60 * 2, // 2 minutes
    }
  )
}

export function useSection(id: number | string) {
  return useApiQuery<Section>(
    ['section', id.toString()],
    () => api.get(endpoints.section(id)),
    {
      enabled: !!id,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  )
}

export function useCreateSection() {
  return useApiMutation<Section, CreateSectionData>(
    (data) => api.post(endpoints.sections, data),
    {
      invalidateQueries: [['sections']],
      onSuccess: (data) => {
        console.log('Section created successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to create section:', error)
      },
    }
  )
}

export function useUpdateSection() {
  return useApiMutation<Section, UpdateSectionData>(
    (data) => api.put(endpoints.section(data.id), data),
    {
      invalidateQueries: [['sections'], ['section', data => data.id.toString()]],
      onSuccess: (data) => {
        console.log('Section updated successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to update section:', error)
      },
    }
  )
}

export function useDeleteSection() {
  return useApiMutation<void, number>(
    (id) => api.delete(endpoints.section(id)),
    {
      invalidateQueries: [['sections']],
      onSuccess: () => {
        console.log('Section deleted successfully')
      },
      onError: (error) => {
        console.error('Failed to delete section:', error)
      },
    }
  )
}
