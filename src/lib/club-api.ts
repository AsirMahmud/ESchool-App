import { api, endpoints } from './api'

// Club types
export interface Club {
  id: number
  name: string
  description: string
  category: 'academic' | 'arts' | 'technology' | 'service' | 'sports' | 'other'
  advisor_id: number
  meeting_schedule: string
  meeting_location: string
  max_members: number
  current_members: number
  grade_level: 'all' | 'elementary' | 'middle' | 'high'
  requires_approval: boolean
  is_active: boolean
  created_at: string
  updated_at: string
  // Related data
  advisor?: {
    id: number
    first_name: string
    last_name: string
    email: string
  }
  members?: ClubMember[]
}

export interface ClubMember {
  id: number
  club_id: number
  student_id: number
  role: 'member' | 'president' | 'vice_president' | 'treasurer' | 'secretary'
  joined_date: string
  status: 'active' | 'inactive' | 'pending'
  attendance_rate: number
  last_activity: string
  // Related data
  student?: {
    id: number
    first_name: string
    last_name: string
    class_name: string
    student_id: string
  }
}

export interface CreateClubData {
  name: string
  description: string
  category: 'academic' | 'arts' | 'technology' | 'service' | 'sports' | 'other'
  advisor_id: number
  meeting_schedule: string
  meeting_location: string
  max_members: number
  grade_level: 'all' | 'elementary' | 'middle' | 'high'
  requires_approval: boolean
}

export interface UpdateClubData extends Partial<CreateClubData> {
  id: number
}

export interface ClubFilters {
  category?: 'academic' | 'arts' | 'technology' | 'service' | 'sports' | 'other'
  grade_level?: 'all' | 'elementary' | 'middle' | 'high'
  advisor_id?: number
  is_active?: boolean
  search?: string
}

export interface AddMemberData {
  student_id: number
  role?: 'member' | 'president' | 'vice_president' | 'treasurer' | 'secretary'
}

export interface UpdateMemberData {
  role?: 'member' | 'president' | 'vice_president' | 'treasurer' | 'secretary'
  status?: 'active' | 'inactive' | 'pending'
}

// Club API functions
export const clubApi = {
  // Get all clubs with optional filters
  getAll: (filters?: ClubFilters): Promise<Club[]> => {
    const params = new URLSearchParams()
    if (filters?.category) params.append('category', filters.category)
    if (filters?.grade_level) params.append('grade_level', filters.grade_level)
    if (filters?.advisor_id) params.append('advisor_id', filters.advisor_id.toString())
    if (filters?.is_active !== undefined) params.append('is_active', filters.is_active.toString())
    if (filters?.search) params.append('search', filters.search)
    
    const queryString = params.toString()
    const endpoint = queryString ? `${endpoints.clubs}?${queryString}` : endpoints.clubs
    
    return api.get<Club[]>(endpoint)
  },

  // Get club by ID
  getById: (id: number): Promise<Club> =>
    api.get<Club>(endpoints.club(id)),

  // Create new club
  create: (data: CreateClubData): Promise<Club> =>
    api.post<Club>(endpoints.clubs, data),

  // Update club
  update: (data: UpdateClubData): Promise<Club> =>
    api.put<Club>(endpoints.club(data.id), data),

  // Delete club
  delete: (id: number): Promise<{ message: string }> =>
    api.delete<{ message: string }>(endpoints.club(id)),

  // Get club members
  getMembers: (clubId: number): Promise<ClubMember[]> =>
    api.get<ClubMember[]>(`${endpoints.club(clubId)}/members/`),

  // Add member to club
  addMember: (clubId: number, data: AddMemberData): Promise<ClubMember> =>
    api.post<ClubMember>(`${endpoints.club(clubId)}/members/`, data),

  // Update member
  updateMember: (clubId: number, memberId: number, data: UpdateMemberData): Promise<ClubMember> =>
    api.patch<ClubMember>(`${endpoints.club(clubId)}/members/${memberId}/`, data),

  // Remove member from club
  removeMember: (clubId: number, memberId: number): Promise<{ message: string }> =>
    api.delete<{ message: string }>(`${endpoints.club(clubId)}/members/${memberId}/`),

  // Get clubs by category
  getByCategory: (category: 'academic' | 'arts' | 'technology' | 'service' | 'sports' | 'other'): Promise<Club[]> =>
    api.get<Club[]>(`${endpoints.clubs}category/${category}/`),

  // Get clubs by grade level
  getByGradeLevel: (gradeLevel: 'all' | 'elementary' | 'middle' | 'high'): Promise<Club[]> =>
    api.get<Club[]>(`${endpoints.clubs}grade-level/${gradeLevel}/`),

  // Get clubs by advisor
  getByAdvisor: (advisorId: number): Promise<Club[]> =>
    api.get<Club[]>(`${endpoints.clubs}advisor/${advisorId}/`),

  // Update club status
  updateStatus: (id: number, isActive: boolean): Promise<Club> =>
    api.patch<Club>(`${endpoints.club(id)}/status/`, { is_active: isActive }),

  // Get club statistics
  getStatistics: (clubId: number): Promise<{
    total_members: number
    active_members: number
    average_attendance: number
    meeting_count: number
    last_meeting: string
  }> =>
    api.get<{
      total_members: number
      active_members: number
      average_attendance: number
      meeting_count: number
      last_meeting: string
    }>(`${endpoints.club(clubId)}/statistics/`),

  // Record meeting attendance
  recordAttendance: (clubId: number, data: {
    meeting_date: string
    attendees: number[]
    absent: number[]
  }): Promise<{ message: string }> =>
    api.post<{ message: string }>(`${endpoints.club(clubId)}/attendance/`, data),

  // Get attendance history
  getAttendanceHistory: (clubId: number, startDate?: string, endDate?: string): Promise<{
    meeting_date: string
    attendees: number
    absent: number
    attendance_rate: number
  }[]> => {
    const params = new URLSearchParams()
    if (startDate) params.append('start_date', startDate)
    if (endDate) params.append('end_date', endDate)
    
    const queryString = params.toString()
    const endpoint = queryString 
      ? `${endpoints.club(clubId)}/attendance/?${queryString}`
      : `${endpoints.club(clubId)}/attendance/`
    
    return api.get<{
      meeting_date: string
      attendees: number
      absent: number
      attendance_rate: number
    }[]>(endpoint)
  },

  // Bulk operations
  bulkUpdate: (data: { ids: number[], updates: Partial<CreateClubData> }): Promise<Club[]> =>
    api.patch<Club[]>(`${endpoints.clubs}bulk-update/`, data),

  bulkDelete: (ids: number[]): Promise<{ message: string }> =>
    api.post<{ message: string }>(`${endpoints.clubs}bulk-delete/`, { ids }),

  // Export club data
  exportData: (clubId: number, format: 'csv' | 'pdf' | 'excel' = 'csv'): Promise<Blob> =>
    api.get<Blob>(`${endpoints.club(clubId)}/export/?format=${format}`),
}
