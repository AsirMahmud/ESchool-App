import { useApiQuery, useApiMutation } from './use-api'
import { api, endpoints } from '@/lib/api'

// Types
export interface AttendanceRecord {
  id: number
  student: number
  student_name: string
  student_id: string
  class_room: number
  class_name: string
  subject: number
  subject_name: string
  teacher: number
  teacher_name: string
  date: string
  status: 'present' | 'absent' | 'late' | 'excused'
  check_in_time?: string
  check_out_time?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface CreateAttendanceData {
  student: number
  class_room: number
  subject: number
  date: string
  status: 'present' | 'absent' | 'late' | 'excused'
  check_in_time?: string
  check_out_time?: string
  notes?: string
}

export interface UpdateAttendanceData extends Partial<CreateAttendanceData> {
  id: number
}

export interface AttendanceSummary {
  total_students: number
  present: number
  absent: number
  late: number
  excused: number
  attendance_rate: number
}

// Hooks
export function useAttendanceRecords(filters?: {
  class_room?: number
  subject?: number
  teacher?: number
  date?: string
  date_range?: { start: string; end: string }
}) {
  const queryParams = new URLSearchParams()
  if (filters?.class_room) queryParams.append('class_room', filters.class_room.toString())
  if (filters?.subject) queryParams.append('subject', filters.subject.toString())
  if (filters?.teacher) queryParams.append('teacher', filters.teacher.toString())
  if (filters?.date) queryParams.append('date', filters.date)
  if (filters?.date_range) {
    queryParams.append('date_start', filters.date_range.start)
    queryParams.append('date_end', filters.date_range.end)
  }

  return useApiQuery<AttendanceRecord[]>(
    ['attendance', filters],
    async () => {
      const data: any = await api.get(`${endpoints.attendance}?${queryParams.toString()}`)
      if (Array.isArray(data)) return data as AttendanceRecord[]
      if (data && Array.isArray(data.results)) return data.results as AttendanceRecord[]
      return []
    },
    {
      staleTime: 1000 * 60 * 2, // 2 minutes
    }
  )
}

export function useAttendanceRecord(id: number | string) {
  return useApiQuery<AttendanceRecord>(
    ['attendance', id.toString()],
    () => api.get(`${endpoints.attendance}${id}/`),
    {
      enabled: !!id,
      staleTime: 1000 * 60 * 5,
    }
  )
}

export function useCreateAttendanceRecord() {
  return useApiMutation<AttendanceRecord, CreateAttendanceData>(
    (data) => api.post(endpoints.attendance, data),
    {
      invalidateQueries: [['attendance']],
      onSuccess: () => {
        console.log('Attendance record created successfully')
      },
      onError: (error) => {
        console.error('Failed to create attendance record:', error)
      },
    }
  )
}

export function useUpdateAttendanceRecord() {
  return useApiMutation<AttendanceRecord, UpdateAttendanceData>(
    (data) => api.put(`${endpoints.attendance}${data.id}/`, data),
    {
      invalidateQueries: [['attendance'], ['attendance', data.id.toString()]],
      onSuccess: () => {
        console.log('Attendance record updated successfully')
      },
      onError: (error) => {
        console.error('Failed to update attendance record:', error)
      },
    }
  )
}

export function useDeleteAttendanceRecord() {
  return useApiMutation<void, number>(
    (id) => api.delete(`${endpoints.attendance}${id}/`),
    {
      invalidateQueries: [['attendance']],
      onSuccess: () => {
        console.log('Attendance record deleted successfully')
      },
      onError: (error) => {
        console.error('Failed to delete attendance record:', error)
      },
    }
  )
}

// Bulk attendance operations
export function useBulkCreateAttendance() {
  return useApiMutation<AttendanceRecord[], CreateAttendanceData[]>(
    (data) => api.post(`${endpoints.attendance}bulk_create/`, { records: data }),
    {
      invalidateQueries: [['attendance']],
      onSuccess: () => {
        console.log('Bulk attendance records created successfully')
      },
      onError: (error) => {
        console.error('Failed to create bulk attendance records:', error)
      },
    }
  )
}

export function useBulkUpdateAttendance() {
  return useApiMutation<AttendanceRecord[], UpdateAttendanceData[]>(
    (data) => api.post(`${endpoints.attendance}bulk_update/`, { records: data }),
    {
      invalidateQueries: [['attendance']],
      onSuccess: () => {
        console.log('Bulk attendance records updated successfully')
      },
      onError: (error) => {
        console.error('Failed to update bulk attendance records:', error)
      },
    }
  )
}

// Attendance summary and statistics
export function useAttendanceSummary(filters?: {
  class_room?: number
  subject?: number
  teacher?: number
  date?: string
  date_range?: { start: string; end: string }
}) {
  const queryParams = new URLSearchParams()
  if (filters?.class_room) queryParams.append('class_room', filters.class_room.toString())
  if (filters?.subject) queryParams.append('subject', filters.subject.toString())
  if (filters?.teacher) queryParams.append('teacher', filters.teacher.toString())
  if (filters?.date) queryParams.append('date', filters.date)
  if (filters?.date_range) {
    queryParams.append('date_start', filters.date_range.start)
    queryParams.append('date_end', filters.date_range.end)
  }

  return useApiQuery<AttendanceSummary>(
    ['attendance', 'summary', filters],
    () => api.get(`${endpoints.attendance}summary/?${queryParams.toString()}`),
    {
      staleTime: 1000 * 60 * 5,
    }
  )
}

// Student attendance history
export function useStudentAttendanceHistory(studentId: number | string, filters?: {
  class_room?: number
  subject?: number
  date_range?: { start: string; end: string }
}) {
  const queryParams = new URLSearchParams()
  if (filters?.class_room) queryParams.append('class_room', filters.class_room.toString())
  if (filters?.subject) queryParams.append('subject', filters.subject.toString())
  if (filters?.date_range) {
    queryParams.append('date_start', filters.date_range.start)
    queryParams.append('date_end', filters.date_range.end)
  }

  return useApiQuery<AttendanceRecord[]>(
    ['attendance', 'student', studentId.toString(), filters],
    () => api.get(`${endpoints.attendance}student/${studentId}/?${queryParams.toString()}`),
    {
      enabled: !!studentId,
      staleTime: 1000 * 60 * 5,
    }
  )
}

// Class attendance for a specific date
export function useClassAttendanceForDate(classId: number | string, date: string) {
  return useApiQuery<AttendanceRecord[]>(
    ['attendance', 'class', classId.toString(), date],
    () => api.get(`${endpoints.attendance}class/${classId}/date/${date}/`),
    {
      enabled: !!classId && !!date,
      staleTime: 1000 * 60 * 2,
    }
  )
}
