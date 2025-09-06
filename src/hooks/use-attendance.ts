import { useApiQuery, useApiMutation } from './use-api'
import { api, endpoints } from '@/lib/api'

// Types
export interface AttendanceRecord {
  id: number
  student: string
  student_name: string
  student_number: string
  date: string
  status: 'present' | 'absent' | 'late' | 'excused'
  check_in_time?: string
  check_out_time?: string
  notes?: string
  marked_by?: string
  marked_by_name?: string
  subject?: string
  subject_name?: string
  class_period?: number
  created_at: string
  updated_at: string
}

export interface AttendanceSummary {
  student: string
  student_name: string
  student_number: string
  total_days: number
  present_days: number
  absent_days: number
  late_days: number
  excused_days: number
  attendance_percentage: number
  period_start: string
  period_end: string
}

export interface ClassAttendance {
  date: string
  subject?: string
  subject_name?: string
  class_period?: number
  total_students: number
  present_count: number
  absent_count: number
  late_count: number
  excused_count: number
  attendance_records: AttendanceRecord[]
}

export interface CreateAttendanceData {
  student: string
  date: string
  status: 'present' | 'absent' | 'late' | 'excused'
  check_in_time?: string
  check_out_time?: string
  notes?: string
  // Subject is optional for student attendance
  subject?: string
  class_period?: number
}

export interface UpdateAttendanceData extends Partial<CreateAttendanceData> {
  id: number
}

export interface BulkAttendanceData {
  date: string
  // Subject is optional for student attendance
  subject?: string
  class_period?: number
  attendance_records: Array<{
    student: string
    status: 'present' | 'absent' | 'late' | 'excused'
    check_in_time?: string
    check_out_time?: string
    notes?: string
  }>
}

// Hooks

// Get attendance records for a specific student
export function useStudentAttendance(studentId: string, params?: {
  start_date?: string
  end_date?: string
  subject?: string
}) {
  const queryParams = new URLSearchParams()
  if (params?.start_date) queryParams.append('start_date', params.start_date)
  if (params?.end_date) queryParams.append('end_date', params.end_date)
  if (params?.subject) queryParams.append('subject', params.subject)
  
  const queryString = queryParams.toString()
  const endpoint = `${endpoints.students}${studentId}/attendance/${queryString ? `?${queryString}` : ''}`
  
  return useApiQuery<AttendanceRecord[]>(
    ['student-attendance', studentId, params],
    () => api.get(endpoint),
    {
      enabled: !!studentId,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  )
}

// Get attendance summary for a student
export function useStudentAttendanceSummary(studentId: string, params?: {
  start_date?: string
  end_date?: string
}) {
  const queryParams = new URLSearchParams()
  if (params?.start_date) queryParams.append('start_date', params.start_date)
  if (params?.end_date) queryParams.append('end_date', params.end_date)
  
  const queryString = queryParams.toString()
  const endpoint = `${endpoints.students}${studentId}/attendance/summary/${queryString ? `?${queryString}` : ''}`
  
  return useApiQuery<AttendanceSummary>(
    ['student-attendance-summary', studentId, params],
    () => api.get(endpoint),
    {
      enabled: !!studentId,
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  )
}

// Get class attendance for a specific date/class
export function useClassAttendance(params: {
  date: string
  level?: number
  section?: number
  subject?: string
  class_period?: number
}) {
  const queryParams = new URLSearchParams()
  // The AttendanceViewSet supports filtering by date and subject (primary key s_code)
  queryParams.append('date', params.date)
  if (params.subject) queryParams.append('subject', params.subject)
  // Note: section/level are not filterset fields on list endpoint; kept for future compatibility
  if (params.level) queryParams.append('level', params.level.toString())
  if (params.section) queryParams.append('section', params.section.toString())
  if (params.class_period) queryParams.append('class_period', params.class_period.toString())
  
  const attendanceBase = endpoints.attendance.endsWith('/')
    ? endpoints.attendance.slice(0, -1)
    : endpoints.attendance
  const endpoint = `${attendanceBase}/?${queryParams.toString()}`
  
  return useApiQuery<ClassAttendance>(
    ['class-attendance', params],
    async () => {
      const data: any = await api.get(endpoint)
      const records: AttendanceRecord[] = Array.isArray(data) ? data : (data?.results || [])
      const present = records.filter(r => r.status === 'present').length
      const absent = records.filter(r => r.status === 'absent').length
      const late = records.filter(r => r.status === 'late').length
      const excused = records.filter(r => r.status === 'excused').length
      const subjectName = records[0]?.subject_name
      return {
        date: params.date,
        subject: params.subject,
        subject_name: subjectName,
        class_period: params.class_period,
        total_students: records.length,
        present_count: present,
        absent_count: absent,
        late_count: late,
        excused_count: excused,
        attendance_records: records,
      }
    },
    {
      enabled: !!params.date,
      staleTime: 1000 * 60 * 2, // 2 minutes
    }
  )
}

// Get all attendance records with filters
export function useAttendanceRecords(params?: {
  date?: string
  start_date?: string
  end_date?: string
  student?: string
  level?: number
  section?: number
  subject?: string
  status?: string
  page?: number
  page_size?: number
}) {
  const queryParams = new URLSearchParams()
  if (params?.date) queryParams.append('date', params.date)
  if (params?.start_date) queryParams.append('start_date', params.start_date)
  if (params?.end_date) queryParams.append('end_date', params.end_date)
  if (params?.student) queryParams.append('student', params.student)
  if (params?.level) queryParams.append('level', params.level.toString())
  if (params?.section) queryParams.append('section', params.section.toString())
  if (params?.subject) queryParams.append('subject', params.subject)
  if (params?.status) queryParams.append('status', params.status)
  if (params?.page) queryParams.append('page', params.page.toString())
  if (params?.page_size) queryParams.append('page_size', params.page_size.toString())
  
  const queryString = queryParams.toString()
  const attendanceBase = endpoints.attendance.endsWith('/')
    ? endpoints.attendance.slice(0, -1)
    : endpoints.attendance
  const endpoint = `${attendanceBase}/${queryString ? `?${queryString}` : ''}`
  
  return useApiQuery<{
    count: number
    next: string | null
    previous: string | null
    results: AttendanceRecord[]
  }>(
    ['attendance-records', params],
    () => api.get(endpoint),
    {
      staleTime: 1000 * 60 * 2, // 2 minutes
    }
  )
}

// Create single attendance record
export function useCreateAttendance() {
  return useApiMutation<AttendanceRecord, CreateAttendanceData>(
    (data) => {
      // Ensure proper time format and handle optional fields
      const formattedData = {
        ...data,
        check_in_time: data.check_in_time && !data.check_in_time.includes(':00')
          ? `${data.check_in_time}:00`
          : data.check_in_time,
        check_out_time: data.check_out_time && !data.check_out_time.includes(':00')
          ? `${data.check_out_time}:00`
          : data.check_out_time,
        subject: data.subject || undefined, // Convert empty string to undefined
      }

      // Use student-specific endpoint if student is provided
      const studentsBase = endpoints.students.endsWith('/')
        ? endpoints.students
        : `${endpoints.students}/`
      const attendanceBase = endpoints.attendance.endsWith('/')
        ? endpoints.attendance
        : `${endpoints.attendance}/`
      const endpoint = data.student
        ? `${studentsBase}${data.student}/add_attendance/`
        : attendanceBase

      return api.post(endpoint, formattedData)
    },
    {
      invalidateQueries: [['attendance-records'], ['student-attendance'], ['class-attendance']],
      onSuccess: (data) => {
        console.log('Attendance record created successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to create attendance record:', error)
      },
    }
  )
}

// Update attendance record
export function useUpdateAttendance() {
  return useApiMutation<AttendanceRecord, UpdateAttendanceData>(
    (data) => {
      // Ensure proper time format and handle optional fields
      const { id, ...updateData } = data
      const formattedData = {
        ...updateData,
        check_in_time: updateData.check_in_time && !updateData.check_in_time.includes(':00') 
          ? `${updateData.check_in_time}:00` 
          : updateData.check_in_time,
        check_out_time: updateData.check_out_time && !updateData.check_out_time.includes(':00') 
          ? `${updateData.check_out_time}:00` 
          : updateData.check_out_time,
        subject: updateData.subject || undefined, // Convert empty string to undefined
      }
      const attendanceBase = endpoints.attendance.endsWith('/')
        ? endpoints.attendance.slice(0, -1)
        : endpoints.attendance
      return api.put(`${attendanceBase}/${id}/`, formattedData)
    },
    {
      invalidateQueries: [['attendance-records'], ['student-attendance'], ['class-attendance']],
      onSuccess: (data) => {
        console.log('Attendance record updated successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to update attendance record:', error)
      },
    }
  )
}

// Delete attendance record
export function useDeleteAttendance() {
  return useApiMutation<void, number>(
    (id) => {
      const attendanceBase = endpoints.attendance.endsWith('/')
        ? endpoints.attendance.slice(0, -1)
        : endpoints.attendance
      return api.delete(`${attendanceBase}/${id}/`)
    },
    {
      invalidateQueries: [['attendance-records'], ['student-attendance'], ['class-attendance']],
      onSuccess: () => {
        console.log('Attendance record deleted successfully')
      },
      onError: (error) => {
        console.error('Failed to delete attendance record:', error)
      },
    }
  )
}

// Bulk create/update attendance records
export function useBulkAttendance() {
  return useApiMutation<AttendanceRecord[], BulkAttendanceData>(
    (data) => {
      // Format the bulk data properly
      const formattedData = {
        ...data,
        subject: data.subject || undefined,
        attendance_records: data.attendance_records.map(record => ({
          ...record,
          check_in_time: record.check_in_time && !record.check_in_time.includes(':00')
            ? `${record.check_in_time}:00`
            : record.check_in_time,
          check_out_time: record.check_out_time && !record.check_out_time.includes(':00')
            ? `${record.check_out_time}:00`
            : record.check_out_time,
        }))
      }
      const attendanceBase = endpoints.attendance.endsWith('/')
        ? endpoints.attendance
        : `${endpoints.attendance}/`
      return api.post(`${attendanceBase}bulk/`, formattedData)
    },
    {
      invalidateQueries: [['attendance-records'], ['student-attendance'], ['class-attendance']],
      onSuccess: (data) => {
        console.log('Bulk attendance records processed successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to process bulk attendance records:', error)
      },
    }
  )
}

// Get attendance statistics
export function useAttendanceStatistics(params?: {
  start_date?: string
  end_date?: string
  level?: number
  section?: number
  subject?: string
}) {
  const queryParams = new URLSearchParams()
  if (params?.start_date) queryParams.append('start_date', params.start_date)
  if (params?.end_date) queryParams.append('end_date', params.end_date)
  if (params?.level) queryParams.append('level', params.level.toString())
  if (params?.section) queryParams.append('section', params.section.toString())
  if (params?.subject) queryParams.append('subject', params.subject)
  
  const queryString = queryParams.toString()
  const attendanceBase = endpoints.attendance.endsWith('/')
    ? endpoints.attendance.slice(0, -1)
    : endpoints.attendance
  const endpoint = `${attendanceBase}/statistics/${queryString ? `?${queryString}` : ''}`
  
  return useApiQuery<{
    total_students: number
    total_records: number
    average_attendance: number
    present_percentage: number
    absent_percentage: number
    late_percentage: number
    excused_percentage: number
    daily_stats: Array<{
      date: string
      total_students: number
      present: number
      absent: number
      late: number
      excused: number
      attendance_rate: number
    }>
  }>(
    ['attendance-statistics', params],
    () => api.get(endpoint),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  )
}