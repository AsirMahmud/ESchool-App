import { api, endpoints } from './api'

// Class types
export interface Class {
  id: number
  name: string
  level_id: number
  section_id: number
  teacher_id: number
  capacity: number
  current_students: number
  academic_year: string
  is_active: boolean
  created_at: string
  updated_at: string
  // Related data
  level?: {
    id: number
    name: string
  }
  section?: {
    id: number
    name: string
  }
  teacher?: {
    id: number
    user: {
      first_name: string
      last_name: string
    }
  }
}

export interface CreateClassData {
  name: string
  level_id: number
  section_id: number
  teacher_id: number
  capacity: number
  academic_year: string
}

export interface UpdateClassData extends Partial<CreateClassData> {
  id: number
}

export interface ClassFilters {
  level_id?: number
  section_id?: number
  teacher_id?: number
  academic_year?: string
  is_active?: boolean
  search?: string
}

export interface ClassSchedule {
  id: number
  class_id: number
  subject_id: number
  teacher_id: number
  day_of_week: number
  start_time: string
  end_time: string
  room: string
}

// Class API functions
export const classApi = {
  // Get all classes with optional filters
  getAll: (filters?: ClassFilters): Promise<Class[]> => {
    const params = new URLSearchParams()
    if (filters?.level_id) params.append('level_id', filters.level_id.toString())
    if (filters?.section_id) params.append('section_id', filters.section_id.toString())
    if (filters?.teacher_id) params.append('teacher_id', filters.teacher_id.toString())
    if (filters?.academic_year) params.append('academic_year', filters.academic_year)
    if (filters?.is_active !== undefined) params.append('is_active', filters.is_active.toString())
    if (filters?.search) params.append('search', filters.search)
    
    const queryString = params.toString()
    const endpoint = queryString ? `${endpoints.classes}?${queryString}` : endpoints.classes
    
    return api.get<Class[]>(endpoint)
  },

  // Get class by ID
  getById: (id: number): Promise<Class> =>
    api.get<Class>(endpoints.class(id)),

  // Create new class
  create: (data: CreateClassData): Promise<Class> =>
    api.post<Class>(endpoints.classes, data),

  // Update class
  update: (data: UpdateClassData): Promise<Class> =>
    api.put<Class>(endpoints.class(data.id), data),

  // Delete class
  delete: (id: number): Promise<{ message: string }> =>
    api.delete<{ message: string }>(endpoints.class(id)),

  // Get class students
  getStudents: (classId: number): Promise<any[]> =>
    api.get<any[]>(`${endpoints.class(classId)}/students/`),

  // Add student to class
  addStudent: (classId: number, studentId: number): Promise<{ message: string }> =>
    api.post<{ message: string }>(`${endpoints.class(classId)}/students/`, { student_id: studentId }),

  // Remove student from class
  removeStudent: (classId: number, studentId: number): Promise<{ message: string }> =>
    api.delete<{ message: string }>(`${endpoints.class(classId)}/students/${studentId}/`),

  // Get class schedule
  getSchedule: (classId: number): Promise<ClassSchedule[]> =>
    api.get<ClassSchedule[]>(`${endpoints.class(classId)}/schedule/`),

  // Update class schedule
  updateSchedule: (classId: number, schedule: Partial<ClassSchedule>[]): Promise<ClassSchedule[]> =>
    api.put<ClassSchedule[]>(`${endpoints.class(classId)}/schedule/`, schedule),

  // Get class subjects
  getSubjects: (classId: number): Promise<any[]> =>
    api.get<any[]>(`${endpoints.class(classId)}/subjects/`),

  // Add subject to class
  addSubject: (classId: number, subjectId: number): Promise<{ message: string }> =>
    api.post<{ message: string }>(`${endpoints.class(classId)}/subjects/`, { subject_id: subjectId }),

  // Remove subject from class
  removeSubject: (classId: number, subjectId: number): Promise<{ message: string }> =>
    api.delete<{ message: string }>(`${endpoints.class(classId)}/subjects/${subjectId}/`),

  // Get class attendance
  getAttendance: (classId: number, date?: string): Promise<any[]> => {
    const params = date ? `?date=${date}` : ''
    return api.get<any[]>(`${endpoints.class(classId)}/attendance/${params}`)
  },

  // Update class attendance
  updateAttendance: (classId: number, date: string, attendance: any[]): Promise<any[]> =>
    api.post<any[]>(`${endpoints.class(classId)}/attendance/`, { date, attendance }),

  // Get class performance
  getPerformance: (classId: number, subjectId?: number): Promise<any[]> => {
    const params = subjectId ? `?subject_id=${subjectId}` : ''
    return api.get<any[]>(`${endpoints.class(classId)}/performance/${params}`)
  },

  // Update class status
  updateStatus: (id: number, isActive: boolean): Promise<Class> =>
    api.patch<Class>(`${endpoints.class(id)}/status/`, { is_active: isActive }),

  // Bulk operations
  bulkUpdate: (data: { ids: number[], updates: Partial<CreateClassData> }): Promise<Class[]> =>
    api.patch<Class[]>(`${endpoints.classes}bulk-update/`, data),

  bulkDelete: (ids: number[]): Promise<{ message: string }> =>
    api.post<{ message: string }>(`${endpoints.classes}bulk-delete/`, { ids }),
}



