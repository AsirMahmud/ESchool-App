import { useApiQuery, useApiMutation } from './use-api'
import { api, endpoints } from '@/lib/api'

// Types
export interface LevelSubject {
  id: number
  level: number
  level_name: string
  subject: string
  subject_name: string
  subject_code: string
  is_compulsory: boolean
  weekly_hours: number
  is_active: boolean
  created_at: string
}

export interface SectionSubject {
  id: number
  section: number
  section_name: string
  subject: string
  subject_name: string
  subject_code: string
  teacher?: number
  teacher_name?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CreateLevelSubjectData {
  level: number
  subject: string
  is_compulsory?: boolean
  weekly_hours?: number
  is_active?: boolean
}

export interface CreateSectionSubjectData {
  section: number
  subject: string
  teacher?: number
  is_active?: boolean
}

// Hooks
export function useLevelSubjects(levelId?: number | string) {
  const queryParams = new URLSearchParams()
  if (levelId) queryParams.append('level', levelId.toString())

  return useApiQuery<LevelSubject[]>(
    ['level-subjects', levelId],
    async () => {
      const endpoint = queryParams.toString() 
        ? `${endpoints.levelSubjects}?${queryParams.toString()}`
        : endpoints.levelSubjects
      
      const data: any = await api.get(endpoint)
      if (Array.isArray(data)) return data as LevelSubject[]
      if (data && Array.isArray(data.results)) return data.results as LevelSubject[]
      return []
    },
    {
      enabled: !!levelId,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  )
}

export function useSectionSubjects(sectionId?: number | string) {
  const queryParams = new URLSearchParams()
  if (sectionId) queryParams.append('section', sectionId.toString())

  return useApiQuery<SectionSubject[]>(
    ['section-subjects', sectionId],
    async () => {
      const endpoint = queryParams.toString() 
        ? `${endpoints.sectionSubjects}?${queryParams.toString()}`
        : endpoints.sectionSubjects
      
      const data: any = await api.get(endpoint)
      if (Array.isArray(data)) return data as SectionSubject[]
      if (data && Array.isArray(data.results)) return data.results as SectionSubject[]
      return []
    },
    {
      enabled: !!sectionId,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  )
}

export function useSubjectsByLevelAndSection(levelId?: number | string, sectionId?: number | string) {
  return useApiQuery<SectionSubject[]>(
    ['subjects-by-level-section', levelId, sectionId],
    async () => {
      if (!levelId || !sectionId) return []
      
      // First get level subjects to know which subjects are available for this level
      const levelSubjects = await api.get(`${endpoints.levelSubjects}?level=${levelId}`)
      const levelSubjectCodes = Array.isArray(levelSubjects) 
        ? levelSubjects.map((ls: any) => ls.subject)
        : levelSubjects?.results?.map((ls: any) => ls.subject) || []
      
      // Then get section subjects filtered by level subjects
      const sectionSubjects = await api.get(`${endpoints.sectionSubjects}?section=${sectionId}`)
      const sectionSubjectsArray = Array.isArray(sectionSubjects) 
        ? sectionSubjects 
        : sectionSubjects?.results || []
      
      // Filter section subjects to only include those available for the level
      return sectionSubjectsArray.filter((ss: any) => 
        levelSubjectCodes.includes(ss.subject)
      ) as SectionSubject[]
    },
    {
      enabled: !!levelId && !!sectionId,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  )
}

export function useCreateLevelSubject() {
  return useApiMutation<LevelSubject, CreateLevelSubjectData>(
    (data) => api.post(endpoints.levelSubjects, data),
    {
      invalidateQueries: [['level-subjects']],
      onSuccess: () => {
        console.log('Level subject created successfully')
      },
      onError: (error) => {
        console.error('Failed to create level subject:', error)
      },
    }
  )
}

export function useCreateSectionSubject() {
  return useApiMutation<SectionSubject, CreateSectionSubjectData>(
    (data) => api.post(endpoints.sectionSubjects, data),
    {
      invalidateQueries: [['section-subjects'], ['subjects-by-level-section']],
      onSuccess: () => {
        console.log('Section subject created successfully')
      },
      onError: (error) => {
        console.error('Failed to create section subject:', error)
      },
    }
  )
}

export function useDeleteLevelSubject() {
  return useApiMutation<void, number>(
    (id) => api.delete(`${endpoints.levelSubjects}${id}/`),
    {
      invalidateQueries: [['level-subjects']],
      onSuccess: () => {
        console.log('Level subject deleted successfully')
      },
      onError: (error) => {
        console.error('Failed to delete level subject:', error)
      },
    }
  )
}

export function useDeleteSectionSubject() {
  return useApiMutation<void, number>(
    (id) => api.delete(`${endpoints.sectionSubjects}${id}/`),
    {
      invalidateQueries: [['section-subjects'], ['subjects-by-level-section']],
      onSuccess: () => {
        console.log('Section subject deleted successfully')
      },
      onError: (error) => {
        console.error('Failed to delete section subject:', error)
      },
    }
  )
}
