import { api, endpoints } from './api'

// Subject types
export interface Subject {
  id: number
  name: string
  code: string
  description: string
  credits: number
  department_id: number
  level_id: number
  is_active: boolean
  created_at: string
  updated_at: string
  // Related data
  department?: {
    id: number
    name: string
  }
  level?: {
    id: number
    name: string
  }
}

export interface CreateSubjectData {
  name: string
  code: string
  description: string
  credits: number
  department_id: number
  level_id: number
}

export interface UpdateSubjectData extends Partial<CreateSubjectData> {
  id: number
}

export interface SubjectFilters {
  department_id?: number
  level_id?: number
  is_active?: boolean
  search?: string
}

export interface SubjectTeacher {
  id: number
  subject_id: number
  teacher_id: number
  class_id: number
  academic_year: string
  is_active: boolean
}

// Subject API functions
export const subjectApi = {
  // Get all subjects with optional filters
  getAll: (filters?: SubjectFilters): Promise<Subject[]> => {
    const params = new URLSearchParams()
    if (filters?.department_id) params.append('department_id', filters.department_id.toString())
    if (filters?.level_id) params.append('level_id', filters.level_id.toString())
    if (filters?.is_active !== undefined) params.append('is_active', filters.is_active.toString())
    if (filters?.search) params.append('search', filters.search)
    
    const queryString = params.toString()
    const endpoint = queryString ? `${endpoints.subjects}?${queryString}` : endpoints.subjects
    
    return api.get<Subject[]>(endpoint)
  },

  // Get subject by ID
  getById: (id: number): Promise<Subject> =>
    api.get<Subject>(endpoints.subject(id)),

  // Create new subject
  create: (data: CreateSubjectData): Promise<Subject> =>
    api.post<Subject>(endpoints.subjects, data),

  // Update subject
  update: (data: UpdateSubjectData): Promise<Subject> =>
    api.put<Subject>(endpoints.subject(data.id), data),

  // Delete subject
  delete: (id: number): Promise<{ message: string }> =>
    api.delete<{ message: string }>(endpoints.subject(id)),

  // Get subject teachers
  getTeachers: (subjectId: number): Promise<SubjectTeacher[]> =>
    api.get<SubjectTeacher[]>(`${endpoints.subject(subjectId)}/teachers/`),

  // Assign teacher to subject
  assignTeacher: (subjectId: number, data: {
    teacher_id: number
    class_id: number
    academic_year: string
  }): Promise<SubjectTeacher> =>
    api.post<SubjectTeacher>(`${endpoints.subject(subjectId)}/teachers/`, data),

  // Remove teacher from subject
  removeTeacher: (subjectId: number, teacherId: number): Promise<{ message: string }> =>
    api.delete<{ message: string }>(`${endpoints.subject(subjectId)}/teachers/${teacherId}/`),

  // Get subject classes
  getClasses: (subjectId: number): Promise<any[]> =>
    api.get<any[]>(`${endpoints.subject(subjectId)}/classes/`),

  // Get subject students
  getStudents: (subjectId: number, classId?: number): Promise<any[]> => {
    const params = classId ? `?class_id=${classId}` : ''
    return api.get<any[]>(`${endpoints.subject(subjectId)}/students/${params}`)
  },

  // Get subject syllabus
  getSyllabus: (subjectId: number): Promise<any[]> =>
    api.get<any[]>(`${endpoints.subject(subjectId)}/syllabus/`),

  // Update subject syllabus
  updateSyllabus: (subjectId: number, syllabus: any[]): Promise<any[]> =>
    api.put<any[]>(`${endpoints.subject(subjectId)}/syllabus/`, syllabus),

  // Get subject materials
  getMaterials: (subjectId: number): Promise<any[]> =>
    api.get<any[]>(`${endpoints.subject(subjectId)}/materials/`),

  // Upload subject material
  uploadMaterial: (subjectId: number, data: FormData): Promise<any> =>
    api.post<any>(`${endpoints.subject(subjectId)}/materials/`, data),

  // Delete subject material
  deleteMaterial: (subjectId: number, materialId: number): Promise<{ message: string }> =>
    api.delete<{ message: string }>(`${endpoints.subject(subjectId)}/materials/${materialId}/`),

  // Get subject assignments
  getAssignments: (subjectId: number, classId?: number): Promise<any[]> => {
    const params = classId ? `?class_id=${classId}` : ''
    return api.get<any[]>(`${endpoints.subject(subjectId)}/assignments/${params}`)
  },

  // Create subject assignment
  createAssignment: (subjectId: number, data: any): Promise<any> =>
    api.post<any>(`${endpoints.subject(subjectId)}/assignments/`, data),

  // Update subject assignment
  updateAssignment: (subjectId: number, assignmentId: number, data: any): Promise<any> =>
    api.put<any>(`${endpoints.subject(subjectId)}/assignments/${assignmentId}/`, data),

  // Delete subject assignment
  deleteAssignment: (subjectId: number, assignmentId: number): Promise<{ message: string }> =>
    api.delete<{ message: string }>(`${endpoints.subject(subjectId)}/assignments/${assignmentId}/`),

  // Get subject grades
  getGrades: (subjectId: number, classId?: number, studentId?: number): Promise<any[]> => {
    const params = new URLSearchParams()
    if (classId) params.append('class_id', classId.toString())
    if (studentId) params.append('student_id', studentId.toString())
    
    const queryString = params.toString()
    const endpoint = queryString ? `${endpoints.subject(subjectId)}/grades/?${queryString}` : `${endpoints.subject(subjectId)}/grades/`
    
    return api.get<any[]>(endpoint)
  },

  // Update subject grades
  updateGrades: (subjectId: number, grades: any[]): Promise<any[]> =>
    api.post<any[]>(`${endpoints.subject(subjectId)}/grades/`, grades),

  // Update subject status
  updateStatus: (id: number, isActive: boolean): Promise<Subject> =>
    api.patch<Subject>(`${endpoints.subject(id)}/status/`, { is_active: isActive }),

  // Bulk operations
  bulkUpdate: (data: { ids: number[], updates: Partial<CreateSubjectData> }): Promise<Subject[]> =>
    api.patch<Subject[]>(`${endpoints.subjects}bulk-update/`, data),

  bulkDelete: (ids: number[]): Promise<{ message: string }> =>
    api.post<{ message: string }>(`${endpoints.subjects}bulk-delete/`, { ids }),
}





