import { useApiQuery, useApiMutation } from './use-api'
import { api, endpoints } from '@/lib/api'

// Types
export interface Teacher {
  teacher_id: string | number
  teacher_name: string
  teacher_email: string
  teacher_phone: string
  department_name: string
  qualification: string
  specialization: string
  years_of_experience: number
  is_class_teacher: boolean
  max_classes: number
  bio?: string
  email?: string
  phone?: string
  address?: string
  emergency_contact?: string
  emergency_phone?: string
  education?: string
  certifications?: string
  skills?: string
  experience_details?: string
  achievements?: string
  social_links?: any
  profile_photo?: string
  created_at: string
  updated_at: string
}

export interface TeacherDetail extends Teacher {
  current_subjects: TeacherSubject[]
  current_classes: TeacherClass[]
  subjects_taught: TeacherSubject[]
  classes_taught: TeacherClass[]
  performance_records: TeacherPerformance[]
}

export interface TeacherSubject {
  id: number
  teacher: number
  teacher_name: string
  subject: number
  subject_name: string
  subject_code: string
  is_active: boolean
  start_date: string
  end_date?: string
  created_at: string
}

export interface TeacherClass {
  id: number
  teacher: number
  teacher_name: string
  class_room: number
  class_room_name: string
  subject: number
  subject_name: string
  is_active: boolean
  start_date: string
  end_date?: string
  created_at: string
}

export interface TeacherPerformance {
  id: number
  teacher: number
  teacher_name: string
  evaluation_date: string
  academic_performance: 'excellent' | 'good' | 'satisfactory' | 'needs_improvement' | 'poor'
  classroom_management: 'excellent' | 'good' | 'satisfactory' | 'needs_improvement' | 'poor'
  student_interaction: 'excellent' | 'good' | 'satisfactory' | 'needs_improvement' | 'poor'
  professional_development: 'excellent' | 'good' | 'satisfactory' | 'needs_improvement' | 'poor'
  overall_rating: 'excellent' | 'good' | 'satisfactory' | 'needs_improvement' | 'poor'
  comments?: string
  evaluator?: number
  evaluator_name?: string
  created_at: string
}

export interface CreateTeacherData {
  teacher_id: number
  qualification: string
  specialization: string
  years_of_experience: number
  is_class_teacher: boolean
  max_classes: number
  bio?: string
  email?: string
  phone?: string
  address?: string
  emergency_contact?: string
  emergency_phone?: string
  education?: string
  certifications?: string
  skills?: string
  experience_details?: string
  achievements?: string
  social_links?: any
  profile_photo?: string
}

export interface UpdateTeacherData extends Partial<CreateTeacherData> {
  teacher_id: number
}

export interface CreateTeacherSubjectData {
  subject: string // Subject code (s_code)
  start_date: string
  end_date?: string
}

export interface CreateTeacherClassData {
  class_room: number
  subject: string // Subject code (s_code)
  start_date: string
  end_date?: string
}

export interface CreateTeacherPerformanceData {
  evaluation_date: string
  academic_performance: 'excellent' | 'good' | 'satisfactory' | 'needs_improvement' | 'poor'
  classroom_management: 'excellent' | 'good' | 'satisfactory' | 'needs_improvement' | 'poor'
  student_interaction: 'excellent' | 'good' | 'satisfactory' | 'needs_improvement' | 'poor'
  professional_development: 'excellent' | 'good' | 'satisfactory' | 'needs_improvement' | 'poor'
  overall_rating: 'excellent' | 'good' | 'satisfactory' | 'needs_improvement' | 'poor'
  comments?: string
  evaluator?: number
}

// Hooks
export function useTeachers() {
  return useApiQuery<Teacher[]>(
    ['teachers'],
    async () => {
      const data: any = await api.get(endpoints.teachers)
      // Handle DRF pagination { count, next, previous, results }
      if (Array.isArray(data)) return data as Teacher[]
      if (data && Array.isArray(data.results)) return data.results as Teacher[]
      return []
    },
    {
      staleTime: 1000 * 60 * 2, // 2 minutes
    }
  )
}

export function useTeacher(id: number | string) {
  return useApiQuery<TeacherDetail>(
    ['teacher', id.toString()],
    () => api.get(endpoints.teacher(id)),
    {
      enabled: !!id,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  )
}

export function useCreateTeacher() {
  return useApiMutation<Teacher, CreateTeacherData>(
    (data) => api.post(endpoints.teachers, data),
    {
      invalidateQueries: [['teachers']],
      onSuccess: (data) => {
        console.log('Teacher created successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to create teacher:', error)
      },
    }
  )
}

export function useUpdateTeacher() {
  return useApiMutation<Teacher, UpdateTeacherData>(
    (data) => api.put(endpoints.teacher(data.teacher_id), data),
    {
      invalidateQueries: [['teachers'], ['teacher']],
      onSuccess: (data) => {
        console.log('Teacher updated successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to update teacher:', error)
      },
    }
  )
}

export function useDeleteTeacher() {
  return useApiMutation<void, number>(
    (id) => api.delete(endpoints.teacher(id)),
    {
      invalidateQueries: [['teachers']],
      onSuccess: () => {
        console.log('Teacher deleted successfully')
      },
      onError: (error) => {
        console.error('Failed to delete teacher:', error)
      },
    }
  )
}

// Teacher Subjects
export function useTeacherSubjects(teacherId: number | string) {
  return useApiQuery<TeacherSubject[]>(
    ['teacher', teacherId.toString(), 'subjects'],
    () => api.get(`${endpoints.teacher(teacherId)}subjects/`),
    {
      enabled: !!teacherId,
      staleTime: 1000 * 60 * 5,
    }
  )
}

export function useAddTeacherSubject() {
  return useApiMutation<TeacherSubject, { teacherId: number; data: CreateTeacherSubjectData }>(
    ({ teacherId, data }) => api.post(`${endpoints.teacher(teacherId)}add_subject/`, data),
    {
      invalidateQueries: [['teacher'], ['teachers']],
      onSuccess: () => {
        console.log('Subject added to teacher successfully')
      },
      onError: (error) => {
        console.error('Failed to add subject to teacher:', error)
      },
    }
  )
}

// Teacher Classes
export function useTeacherClasses(teacherId: number | string) {
  return useApiQuery<TeacherClass[]>(
    ['teacher', teacherId.toString(), 'classes'],
    () => api.get(`${endpoints.teacher(teacherId)}classes/`),
    {
      enabled: !!teacherId,
      staleTime: 1000 * 60 * 5,
    }
  )
}

export function useAddTeacherClass() {
  return useApiMutation<TeacherClass, { teacherId: number; data: CreateTeacherClassData }>(
    ({ teacherId, data }) => api.post(`${endpoints.teacher(teacherId)}add_class/`, data),
    {
      invalidateQueries: [['teacher'], ['teachers']],
      onSuccess: () => {
        console.log('Class added to teacher successfully')
      },
      onError: (error) => {
        console.error('Failed to add class to teacher:', error)
      },
    }
  )
}

// Teacher Performance
export function useTeacherPerformance(teacherId: number | string) {
  return useApiQuery<TeacherPerformance[]>(
    ['teacher', teacherId.toString(), 'performance'],
    () => api.get(`${endpoints.teacher(teacherId)}/performance/`),
    {
      enabled: !!teacherId,
      staleTime: 1000 * 60 * 5,
    }
  )
}

export function useCreateTeacherPerformance() {
  return useApiMutation<TeacherPerformance, CreateTeacherPerformanceData>(
    (data) => api.post(endpoints.teacherPerformance, data),
    {
      invalidateQueries: [['teacher'], ['teachers']],
      onSuccess: () => {
        console.log('Teacher performance record created successfully')
      },
      onError: (error) => {
        console.error('Failed to create teacher performance record:', error)
      },
    }
  )
}

// Teacher Statistics
export function useTeacherStatistics() {
  return useApiQuery<any>(
    ['teachers', 'statistics'],
    () => api.get(`${endpoints.teachers}/statistics/`),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  )
}

// Class Teachers
export function useClassTeachers() {
  return useApiQuery<Teacher[]>(
    ['teachers', 'class_teachers'],
    () => api.get(`${endpoints.teachers}/class_teachers/`),
    {
      staleTime: 1000 * 60 * 5,
    }
  )
}

// Teachers by Specialization
export function useTeachersBySpecialization() {
  return useApiQuery<any[]>(
    ['teachers', 'by_specialization'],
    () => api.get(`${endpoints.teachers}/by_specialization/`),
    {
      staleTime: 1000 * 60 * 10,
    }
  )
}

