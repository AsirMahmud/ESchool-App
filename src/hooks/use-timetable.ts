import { useApiQuery } from './use-api'
import { api, endpoints } from '@/lib/api'

// Timetable entry interface
export interface TimetableEntry {
  id: number
  day_of_week: string
  start_time: string
  end_time: string
  subject_name: string
  subject_code?: string
  teacher_name?: string
  room?: string
}

/**
 * Hook to get timetable for a specific student
 */
export function useTimetableByStudent(studentId?: string | number) {
  return useApiQuery<TimetableEntry[]>(
    ['timetable', 'student', studentId?.toString() || ''],
    async () => {
      if (!studentId) return []
      
      // Try to get class schedules for the student's class
      // First, we need to get the student's class information
      // For now, we'll use a generic endpoint or return empty array
      // In a real implementation, you would have a student timetable endpoint
      try {
        // Attempt to fetch from class schedules endpoint
        // This is a placeholder - adjust based on your actual API structure
        const data: any = await api.get(`${endpoints.classSchedules}?student=${studentId}`)
        
        if (Array.isArray(data)) {
          return data.map((entry: any) => ({
            id: entry.id || entry.schedule_id,
            day_of_week: entry.day_of_week || entry.day,
            start_time: entry.start_time || entry.period_start,
            end_time: entry.end_time || entry.period_end,
            subject_name: entry.subject_name || entry.subject?.s_name || 'Unknown',
            subject_code: entry.subject_code || entry.subject?.s_code,
            teacher_name: entry.teacher_name || entry.teacher?.name,
            room: entry.room || entry.classroom,
          })) as TimetableEntry[]
        }
        
        if (data?.results && Array.isArray(data.results)) {
          return data.results.map((entry: any) => ({
            id: entry.id || entry.schedule_id,
            day_of_week: entry.day_of_week || entry.day,
            start_time: entry.start_time || entry.period_start,
            end_time: entry.end_time || entry.period_end,
            subject_name: entry.subject_name || entry.subject?.s_name || 'Unknown',
            subject_code: entry.subject_code || entry.subject?.s_code,
            teacher_name: entry.teacher_name || entry.teacher?.name,
            room: entry.room || entry.classroom,
          })) as TimetableEntry[]
        }
        
        return []
      } catch (error) {
        // If the endpoint doesn't exist or fails, return empty array
        console.warn('Timetable endpoint not available:', error)
        return []
      }
    },
    {
      enabled: !!studentId,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  )
}

