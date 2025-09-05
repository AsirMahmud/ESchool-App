import { useApiQuery, useApiMutation } from './use-api'
import { api, endpoints } from '@/lib/api'

// Types
export interface Level {
  level_no: number
  level_name: string
  level_type: string
  description?: string
  age_range_min?: number
  age_range_max?: number
  classroom?: number | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CreateLevelData {
  level_no: number
  level_name: string
  level_type: string
  description?: string
  age_range_min?: number
  age_range_max?: number
  classroom?: number | null
  number_of_sections?: number
  is_active?: boolean
}

export interface UpdateLevelData extends Partial<CreateLevelData> {
  level_no: number
}

// Hooks
export function useLevels() {
  return useApiQuery<Level[]>(
    ['levels'],
    async () => {
      const data: any = await api.get(endpoints.levels)
      // Handle DRF pagination { count, next, previous, results }
      if (Array.isArray(data)) return data as Level[]
      if (data && Array.isArray(data.results)) return data.results as Level[]
      return []
    },
    {
      staleTime: 1000 * 60 * 2, // 2 minutes
    }
  )
}

export function useLevel(levelNo: number | string) {
  return useApiQuery<Level>(
    ['level', levelNo.toString()],
    () => api.get(endpoints.level(levelNo)),
    {
      enabled: !!levelNo,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  )
}

export function useCreateLevel() {
  return useApiMutation<Level, CreateLevelData>(
    (data) => api.post(endpoints.levels, data),
    {
      invalidateQueries: [['levels']],
      onSuccess: (data) => {
        console.log('Level created successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to create level:', error)
      },
    }
  )
}

export function useUpdateLevel() {
  return useApiMutation<Level, UpdateLevelData>(
    (data) => api.put(endpoints.level(data.level_no), data),
    {
      invalidateQueries: [['levels'], ['level', data => data.level_no.toString()]],
      onSuccess: (data) => {
        console.log('Level updated successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to update level:', error)
      },
    }
  )
}

export function useDeleteLevel() {
  return useApiMutation<void, number>(
    (id) => api.delete(endpoints.level(id)),
    {
      invalidateQueries: [['levels']],
      onSuccess: () => {
        console.log('Level deleted successfully')
      },
      onError: (error) => {
        console.error('Failed to delete level:', error)
      },
    }
  )
}
