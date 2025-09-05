import { api, endpoints } from './api'

// Teacher types
export interface Teacher {
  id: number
  user_id: number
  employee_id: string
  department_id: number
  qualification: string
  experience_years: number
  specialization: string
  joining_date: string
  salary: number
  is_active: boolean
  created_at: string
  updated_at: string
  // Related data
  user?: {
    id: number
    first_name: string
    last_name: string
    email: string
    phone?: string
  }
  department?: {
    id: number
    name: string
  }
}

export interface CreateTeacherData {
  user_id: number
  employee_id: string
  department_id: number
  qualification: string
  experience_years: number
  specialization: string
  joining_date: string
  salary: number
}

export interface UpdateTeacherData extends Partial<CreateTeacherData> {
  id: number
}

export interface TeacherFilters {
  department_id?: number
  specialization?: string
  is_active?: boolean
  search?: string
}

// Teacher API functions
export const teacherApi = {
  // Get all teachers with optional filters
  getAll: (filters?: TeacherFilters): Promise<Teacher[]> => {
    const params = new URLSearchParams()
    if (filters?.department_id) params.append('department_id', filters.department_id.toString())
    if (filters?.specialization) params.append('specialization', filters.specialization)
    if (filters?.is_active !== undefined) params.append('is_active', filters.is_active.toString())
    if (filters?.search) params.append('search', filters.search)
    
    const queryString = params.toString()
    const endpoint = queryString ? `${endpoints.teachers}?${queryString}` : endpoints.teachers
    
    return api.get<Teacher[]>(endpoint)
  },

  // Get teacher by ID
  getById: (id: number): Promise<Teacher> =>
    api.get<Teacher>(endpoints.teacher(id)),

  // Create new teacher
  create: (data: CreateTeacherData): Promise<Teacher> =>
    api.post<Teacher>(endpoints.teachers, data),

  // Update teacher
  update: (data: UpdateTeacherData): Promise<Teacher> =>
    api.put<Teacher>(endpoints.teacher(data.id), data),

  // Delete teacher
  delete: (id: number): Promise<{ message: string }> =>
    api.delete<{ message: string }>(endpoints.teacher(id)),

  // Get teacher's classes
  getClasses: (teacherId: number): Promise<any[]> =>
    api.get<any[]>(`${endpoints.teacher(teacherId)}/classes/`),

  // Get teacher's subjects
  getSubjects: (teacherId: number): Promise<any[]> =>
    api.get<any[]>(`${endpoints.teacher(teacherId)}/subjects/`),

  // Get teacher's schedule
  getSchedule: (teacherId: number, date?: string): Promise<any[]> => {
    const params = date ? `?date=${date}` : ''
    return api.get<any[]>(`${endpoints.teacher(teacherId)}/schedule/${params}`)
  },

  // Get teacher's students
  getStudents: (teacherId: number): Promise<any[]> =>
    api.get<any[]>(`${endpoints.teacher(teacherId)}/students/`),

  // Update teacher status
  updateStatus: (id: number, isActive: boolean): Promise<Teacher> =>
    api.patch<Teacher>(`${endpoints.teacher(id)}/status/`, { is_active: isActive }),

  // Bulk operations
  bulkUpdate: (data: { ids: number[], updates: Partial<CreateTeacherData> }): Promise<Teacher[]> =>
    api.patch<Teacher[]>(`${endpoints.teachers}bulk-update/`, data),

  bulkDelete: (ids: number[]): Promise<{ message: string }> =>
    api.post<{ message: string }>(`${endpoints.teachers}bulk-delete/`, { ids }),
}



