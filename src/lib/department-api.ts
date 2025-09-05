import { api, endpoints } from './api'

// Department types
export interface Department {
  id: number
  name: string
  code: string
  description: string
  head_teacher_id: number
  total_teachers: number
  total_students: number
  is_active: boolean
  created_at: string
  updated_at: string
  // Related data
  head_teacher?: {
    id: number
    user: {
      first_name: string
      last_name: string
    }
  }
}

export interface CreateDepartmentData {
  name: string
  code: string
  description: string
  head_teacher_id: number
}

export interface UpdateDepartmentData extends Partial<CreateDepartmentData> {
  id: number
}

export interface DepartmentFilters {
  is_active?: boolean
  search?: string
}

export interface DepartmentStats {
  total_teachers: number
  total_students: number
  total_classes: number
  total_subjects: number
}

// Department API functions
export const departmentApi = {
  // Get all departments with optional filters
  getAll: (filters?: DepartmentFilters): Promise<Department[]> => {
    const params = new URLSearchParams()
    if (filters?.is_active !== undefined) params.append('is_active', filters.is_active.toString())
    if (filters?.search) params.append('search', filters.search)
    
    const queryString = params.toString()
    const endpoint = queryString ? `${endpoints.departments}?${queryString}` : endpoints.departments
    
    return api.get<Department[]>(endpoint)
  },

  // Get department by ID
  getById: (id: number): Promise<Department> =>
    api.get<Department>(endpoints.department(id)),

  // Create new department
  create: (data: CreateDepartmentData): Promise<Department> =>
    api.post<Department>(endpoints.departments, data),

  // Update department
  update: (data: UpdateDepartmentData): Promise<Department> =>
    api.put<Department>(endpoints.department(data.id), data),

  // Delete department
  delete: (id: number): Promise<{ message: string }> =>
    api.delete<{ message: string }>(endpoints.department(id)),

  // Get department teachers
  getTeachers: (departmentId: number): Promise<any[]> =>
    api.get<any[]>(`${endpoints.department(departmentId)}/teachers/`),

  // Get department students
  getStudents: (departmentId: number): Promise<any[]> =>
    api.get<any[]>(`${endpoints.department(departmentId)}/students/`),

  // Get department classes
  getClasses: (departmentId: number): Promise<any[]> =>
    api.get<any[]>(`${endpoints.department(departmentId)}/classes/`),

  // Get department subjects
  getSubjects: (departmentId: number): Promise<any[]> =>
    api.get<any[]>(`${endpoints.department(departmentId)}/subjects/`),

  // Get department statistics
  getStats: (departmentId: number): Promise<DepartmentStats> =>
    api.get<DepartmentStats>(`${endpoints.department(departmentId)}/stats/`),

  // Update department head
  updateHead: (id: number, headTeacherId: number): Promise<Department> =>
    api.patch<Department>(`${endpoints.department(id)}/head/`, { head_teacher_id: headTeacherId }),

  // Update department status
  updateStatus: (id: number, isActive: boolean): Promise<Department> =>
    api.patch<Department>(`${endpoints.department(id)}/status/`, { is_active: isActive }),

  // Bulk operations
  bulkUpdate: (data: { ids: number[], updates: Partial<CreateDepartmentData> }): Promise<Department[]> =>
    api.patch<Department[]>(`${endpoints.departments}bulk-update/`, data),

  bulkDelete: (ids: number[]): Promise<{ message: string }> =>
    api.post<{ message: string }>(`${endpoints.departments}bulk-delete/`, { ids }),
}





