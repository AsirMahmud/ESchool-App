import { api, endpoints } from './api'

// Activity Participation types
export interface ActivityParticipation {
  id: number
  student_id: number
  activity_id: number
  activity_type: 'club' | 'sports' | 'event'
  role: 'member' | 'president' | 'vice_president' | 'treasurer' | 'secretary' | 'captain' | 'vice_captain' | 'participant' | 'volunteer'
  joined_date: string
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  attendance_rate: number
  last_activity: string
  notes: string
  created_at: string
  updated_at: string
  // Related data
  student?: {
    id: number
    first_name: string
    last_name: string
    class_name: string
    student_id: string
    email: string
    phone: string
  }
  activity?: {
    id: number
    name: string
    type: string
    description: string
  }
}

export interface CreateParticipationData {
  student_id: number
  activity_id: number
  activity_type: 'club' | 'sports' | 'event'
  role?: 'member' | 'president' | 'vice_president' | 'treasurer' | 'secretary' | 'captain' | 'vice_captain' | 'participant' | 'volunteer'
  notes?: string
}

export interface UpdateParticipationData {
  role?: 'member' | 'president' | 'vice_president' | 'treasurer' | 'secretary' | 'captain' | 'vice_captain' | 'participant' | 'volunteer'
  status?: 'active' | 'inactive' | 'pending' | 'suspended'
  notes?: string
}

export interface ParticipationFilters {
  student_id?: number
  activity_id?: number
  activity_type?: 'club' | 'sports' | 'event'
  role?: 'member' | 'president' | 'vice_president' | 'treasurer' | 'secretary' | 'captain' | 'vice_captain' | 'participant' | 'volunteer'
  status?: 'active' | 'inactive' | 'pending' | 'suspended'
  class_name?: string
  search?: string
}

export interface AttendanceRecord {
  id: number
  participation_id: number
  activity_id: number
  activity_type: 'club' | 'sports' | 'event'
  attendance_date: string
  status: 'present' | 'absent' | 'late' | 'excused'
  notes: string
  created_at: string
  // Related data
  student?: {
    id: number
    first_name: string
    last_name: string
    class_name: string
  }
}

export interface RecordAttendanceData {
  participation_id: number
  attendance_date: string
  status: 'present' | 'absent' | 'late' | 'excused'
  notes?: string
}

export interface ParticipationStatistics {
  total_participations: number
  active_participations: number
  by_activity_type: {
    club: number
    sports: number
    event: number
  }
  by_role: {
    member: number
    president: number
    vice_president: number
    treasurer: number
    secretary: number
    captain: number
    vice_captain: number
    participant: number
    volunteer: number
  }
  average_attendance: number
  top_activities: {
    activity_name: string
    participation_count: number
  }[]
}

// Activity Participation API functions
export const activityParticipationApi = {
  // Get all participations with optional filters
  getAll: (filters?: ParticipationFilters): Promise<ActivityParticipation[]> => {
    const params = new URLSearchParams()
    if (filters?.student_id) params.append('student_id', filters.student_id.toString())
    if (filters?.activity_id) params.append('activity_id', filters.activity_id.toString())
    if (filters?.activity_type) params.append('activity_type', filters.activity_type)
    if (filters?.role) params.append('role', filters.role)
    if (filters?.status) params.append('status', filters.status)
    if (filters?.class_name) params.append('class_name', filters.class_name)
    if (filters?.search) params.append('search', filters.search)
    
    const queryString = params.toString()
    const endpoint = queryString ? `${endpoints.activityParticipation}?${queryString}` : endpoints.activityParticipation
    
    return api.get<ActivityParticipation[]>(endpoint)
  },

  // Get participation by ID
  getById: (id: number): Promise<ActivityParticipation> =>
    api.get<ActivityParticipation>(endpoints.activityParticipant(id)),

  // Create new participation
  create: (data: CreateParticipationData): Promise<ActivityParticipation> =>
    api.post<ActivityParticipation>(endpoints.activityParticipation, data),

  // Update participation
  update: (id: number, data: UpdateParticipationData): Promise<ActivityParticipation> =>
    api.patch<ActivityParticipation>(endpoints.activityParticipant(id), data),

  // Delete participation
  delete: (id: number): Promise<{ message: string }> =>
    api.delete<{ message: string }>(endpoints.activityParticipant(id)),

  // Get participations by student
  getByStudent: (studentId: number): Promise<ActivityParticipation[]> =>
    api.get<ActivityParticipation[]>(`${endpoints.activityParticipation}student/${studentId}/`),

  // Get participations by activity
  getByActivity: (activityId: number, activityType: 'club' | 'sports' | 'event'): Promise<ActivityParticipation[]> =>
    api.get<ActivityParticipation[]>(`${endpoints.activityParticipation}activity/${activityId}/${activityType}/`),

  // Get participations by class
  getByClass: (className: string): Promise<ActivityParticipation[]> =>
    api.get<ActivityParticipation[]>(`${endpoints.activityParticipation}class/${className}/`),

  // Get participations by activity type
  getByActivityType: (activityType: 'club' | 'sports' | 'event'): Promise<ActivityParticipation[]> =>
    api.get<ActivityParticipation[]>(`${endpoints.activityParticipation}type/${activityType}/`),

  // Update participation status
  updateStatus: (id: number, status: 'active' | 'inactive' | 'pending' | 'suspended'): Promise<ActivityParticipation> =>
    api.patch<ActivityParticipation>(`${endpoints.activityParticipant(id)}/status/`, { status }),

  // Get attendance records
  getAttendanceRecords: (participationId: number, startDate?: string, endDate?: string): Promise<AttendanceRecord[]> => {
    const params = new URLSearchParams()
    if (startDate) params.append('start_date', startDate)
    if (endDate) params.append('end_date', endDate)
    
    const queryString = params.toString()
    const endpoint = queryString 
      ? `${endpoints.activityParticipant(participationId)}/attendance/?${queryString}`
      : `${endpoints.activityParticipant(participationId)}/attendance/`
    
    return api.get<AttendanceRecord[]>(endpoint)
  },

  // Record attendance
  recordAttendance: (data: RecordAttendanceData): Promise<AttendanceRecord> =>
    api.post<AttendanceRecord>(`${endpoints.activityParticipation}attendance/`, data),

  // Update attendance record
  updateAttendance: (recordId: number, data: Partial<RecordAttendanceData>): Promise<AttendanceRecord> =>
    api.patch<AttendanceRecord>(`${endpoints.activityParticipation}attendance/${recordId}/`, data),

  // Delete attendance record
  deleteAttendance: (recordId: number): Promise<{ message: string }> =>
    api.delete<{ message: string }>(`${endpoints.activityParticipation}attendance/${recordId}/`),

  // Get participation statistics
  getStatistics: (filters?: {
    student_id?: number
    activity_id?: number
    activity_type?: 'club' | 'sports' | 'event'
    class_name?: string
    start_date?: string
    end_date?: string
  }): Promise<ParticipationStatistics> => {
    const params = new URLSearchParams()
    if (filters?.student_id) params.append('student_id', filters.student_id.toString())
    if (filters?.activity_id) params.append('activity_id', filters.activity_id.toString())
    if (filters?.activity_type) params.append('activity_type', filters.activity_type)
    if (filters?.class_name) params.append('class_name', filters.class_name)
    if (filters?.start_date) params.append('start_date', filters.start_date)
    if (filters?.end_date) params.append('end_date', filters.end_date)
    
    const queryString = params.toString()
    const endpoint = queryString 
      ? `${endpoints.activityParticipation}statistics/?${queryString}`
      : `${endpoints.activityParticipation}statistics/`
    
    return api.get<ParticipationStatistics>(endpoint)
  },

  // Get student activity summary
  getStudentSummary: (studentId: number): Promise<{
    total_activities: number
    active_activities: number
    by_type: {
      club: number
      sports: number
      event: number
    }
    average_attendance: number
    leadership_roles: number
    recent_activities: ActivityParticipation[]
  }> =>
    api.get<{
      total_activities: number
      active_activities: number
      by_type: {
        club: number
        sports: number
        event: number
      }
      average_attendance: number
      leadership_roles: number
      recent_activities: ActivityParticipation[]
    }>(`${endpoints.activityParticipation}student/${studentId}/summary/`),

  // Get activity participation summary
  getActivitySummary: (activityId: number, activityType: 'club' | 'sports' | 'event'): Promise<{
    total_participants: number
    active_participants: number
    average_attendance: number
    by_role: Record<string, number>
    recent_joiners: ActivityParticipation[]
  }> =>
    api.get<{
      total_participants: number
      active_participants: number
      average_attendance: number
      by_role: Record<string, number>
      recent_joiners: ActivityParticipation[]
    }>(`${endpoints.activityParticipation}activity/${activityId}/${activityType}/summary/`),

  // Bulk operations
  bulkUpdate: (data: { ids: number[], updates: Partial<UpdateParticipationData> }): Promise<ActivityParticipation[]> =>
    api.patch<ActivityParticipation[]>(`${endpoints.activityParticipation}bulk-update/`, data),

  bulkDelete: (ids: number[]): Promise<{ message: string }> =>
    api.post<{ message: string }>(`${endpoints.activityParticipation}bulk-delete/`, { ids }),

  // Export participation data
  exportData: (filters?: ParticipationFilters, format: 'csv' | 'pdf' | 'excel' = 'csv'): Promise<Blob> => {
    const params = new URLSearchParams()
    if (filters?.student_id) params.append('student_id', filters.student_id.toString())
    if (filters?.activity_id) params.append('activity_id', filters.activity_id.toString())
    if (filters?.activity_type) params.append('activity_type', filters.activity_type)
    if (filters?.role) params.append('role', filters.role)
    if (filters?.status) params.append('status', filters.status)
    if (filters?.class_name) params.append('class_name', filters.class_name)
    if (filters?.search) params.append('search', filters.search)
    params.append('format', format)
    
    const queryString = params.toString()
    const endpoint = queryString 
      ? `${endpoints.activityParticipation}export/?${queryString}`
      : `${endpoints.activityParticipation}export/?format=${format}`
    
    return api.get<Blob>(endpoint)
  },
}
