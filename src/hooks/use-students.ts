import { useApiQuery, useApiMutation, useOptimisticMutation } from './use-api'
import { api, endpoints } from '@/lib/api'

// Types
export interface Student {
  s_id: string
  student_number: string
  name: string
  email: string
  phone?: string
  gender: 'male' | 'female' | 'other'
  date_of_birth: string
  enroll_date: string
  address: string
  previous_education?: string
  status: 'active' | 'inactive' | 'graduated' | 'transferred' | 'suspended' | 'expelled'
  level?: number
  level_name?: string
  section?: number
  section_name?: string
  department?: number
  department_name?: string
  emergency_contact_name: string
  emergency_contact_phone: string
  medical_conditions?: string
  achievements?: string
  photo?: string
  age?: number
  created_at: string
  updated_at: string
}

export interface StudentParent {
  id: number
  student: string
  student_name: string
  parent: string
  parent_name: string
  parent_email: string
  parent_phone: string
  relationship: 'father' | 'mother' | 'guardian' | 'grandfather' | 'grandmother' | 'uncle' | 'aunt' | 'other'
  is_primary_contact: boolean
  is_emergency_contact: boolean
  is_active: boolean
  created_at: string
}

export interface StudentActivity {
  id: number
  student: string
  student_name: string
  activity_name: string
  activity_type: 'sports' | 'academic' | 'cultural' | 'social' | 'volunteer' | 'leadership' | 'art' | 'music' | 'drama' | 'debate' | 'other'
  description?: string
  start_date: string
  end_date?: string
  position?: string
  achievements?: string
  is_active: boolean
  created_at: string
}

export interface StudentDiary {
  id: number
  student: string
  student_name: string
  subject: string
  subject_name: string
  task: string
  due_date: string
  completion_date?: string
  feedback?: string
  grade?: string
  is_completed: boolean
  created_at: string
  updated_at: string
}

export interface Scholarship {
  sch_id: number
  name: string
  scholarship_type: 'merit' | 'need' | 'sports' | 'academic' | 'cultural' | 'special'
  description: string
  amount: number
  criteria: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface StudentScholarship {
  id: number
  student: string
  student_name: string
  scholarship: number
  scholarship_name: string
  award_date: string
  amount_awarded: number
  academic_year: string
  is_active: boolean
  created_at: string
}

export interface StudentDetail extends Student {
  current_parents: StudentParent[]
  parents: StudentParent[]
  activities: StudentActivity[]
  diary_entries: StudentDiary[]
  scholarships: StudentScholarship[]
}

export interface CreateStudentData {
  student_number: string
  name: string
  email: string
  phone?: string
  gender: 'male' | 'female' | 'other'
  date_of_birth: string
  enroll_date: string
  address: string
  previous_education?: string
  status?: 'active' | 'inactive' | 'graduated' | 'transferred' | 'suspended' | 'expelled'
  level: number
  section?: number
  department?: number
  emergency_contact_name: string
  emergency_contact_phone: string
  medical_conditions?: string
  achievements?: string
  photo?: string
}

export interface CreateStudentParentData {
  parent: number
  relationship: 'father' | 'mother' | 'guardian' | 'grandfather' | 'grandmother' | 'uncle' | 'aunt' | 'other'
  is_primary_contact?: boolean
  is_emergency_contact?: boolean
}

export interface CreateStudentActivityData {
  activity_name: string
  activity_type: 'sports' | 'academic' | 'cultural' | 'social' | 'volunteer' | 'leadership' | 'art' | 'music' | 'drama' | 'debate' | 'other'
  description?: string
  start_date: string
  end_date?: string
  position?: string
  achievements?: string
}

export interface CreateStudentDiaryData {
  subject: string
  task: string
  due_date: string
  completion_date?: string
  feedback?: string
  grade?: string
  is_completed?: boolean
}

export interface CreateScholarshipData {
  name: string
  scholarship_type: 'merit' | 'need' | 'sports' | 'academic' | 'cultural' | 'special'
  description: string
  amount: number
  criteria: string
}

export interface CreateStudentScholarshipData {
  scholarship: number
  award_date: string
  amount_awarded: number
  academic_year: string
}

export interface UpdateStudentData extends Partial<CreateStudentData> {
  s_id: string
}

export interface UpdateStudentParentData extends Partial<CreateStudentParentData> {
  id: number
}

export interface UpdateStudentActivityData extends Partial<CreateStudentActivityData> {
  id: number
}

export interface UpdateStudentDiaryData extends Partial<CreateStudentDiaryData> {
  id: number
}

export interface UpdateScholarshipData extends Partial<CreateScholarshipData> {
  sch_id: number
}

export interface UpdateStudentScholarshipData extends Partial<CreateStudentScholarshipData> {
  id: number
}

// Hooks
export function useStudents() {
  return useApiQuery<Student[]>(
    ['students'],
    async () => {
      try {
        const data: any = await api.get(endpoints.students)
        console.log('Raw API response:', data)
        
        // Handle DRF pagination { count, next, previous, results }
        if (Array.isArray(data)) {
          console.log('Data is array, returning as is')
          return data as Student[]
        }
        
        if (data && Array.isArray(data.results)) {
          console.log('Data has results array, returning results')
          return data.results as Student[]
        }
        
        console.log('Data is not array or has no results, returning empty array')
        return []
      } catch (error) {
        console.error('Error fetching students:', error)
        throw error
      }
    },
    {
      staleTime: 1000 * 60 * 2, // 2 minutes
    }
  )
}

export function useStudent(id: string) {
  return useApiQuery<Student>(
    ['student', id],
    () => api.get(endpoints.student(id)),
    {
      enabled: !!id,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  )
}

export function useCreateStudent() {
  return useApiMutation<Student, CreateStudentData>(
    (data) => api.post(endpoints.students, data),
    {
      invalidateQueries: [['students']],
      onSuccess: (data) => {
        console.log('Student created successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to create student:', error)
      },
    }
  )
}

export function useUpdateStudent() {
  return useApiMutation<Student, UpdateStudentData>(
    (data) => api.put(endpoints.student(data.s_id), data),
    {
      invalidateQueries: [['students'], ['student']],
      onSuccess: (data) => {
        console.log('Student updated successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to update student:', error)
      },
    }
  )
}

export function useDeleteStudent() {
  return useApiMutation<void, string>(
    (id) => api.delete(endpoints.student(id)),
    {
      invalidateQueries: [['students']],
      onSuccess: () => {
        console.log('Student deleted successfully')
      },
      onError: (error) => {
        console.error('Failed to delete student:', error)
      },
    }
  )
}

// Optimistic update example
export function useOptimisticUpdateStudent() {
  return useOptimisticMutation<Student[], UpdateStudentData>(
    (data) => api.patch(endpoints.student(data.s_id), data),
    {
      queryKey: ['students'],
      updateFn: (oldData: Student[] | undefined, variables: UpdateStudentData) => {
        if (!oldData) return []
        return oldData.map((student: Student) => 
          student.s_id === variables.s_id 
            ? { ...student, ...variables }
            : student
        )
      },
      onSuccess: (data) => {
        console.log('Student updated optimistically:', data)
      },
      onError: (error) => {
        console.error('Failed to update student:', error)
      },
    }
  )
}

// Student Detail Hook
export function useStudentDetail(id: string) {
  return useApiQuery<StudentDetail>(
    ['student-detail', id],
    () => api.get(endpoints.student(id)),
    {
      enabled: !!id,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  )
}

// Student Parents Hooks
export function useStudentParents(studentId: string) {
  return useApiQuery<StudentParent[]>(
    ['student-parents', studentId],
    () => api.get(`${endpoints.student(studentId)}parents/`),
    {
      enabled: !!studentId,
      staleTime: 1000 * 60 * 5,
    }
  )
}

export function useCreateStudentParent() {
  return useApiMutation<StudentParent, CreateStudentParentData & { studentId: string }>(
    (data) => api.post(`${endpoints.student(data.studentId)}add_parent/`, data),
    {
      invalidateQueries: [['student-parents'], ['student-detail']],
      onSuccess: (data) => {
        console.log('Student parent added successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to add student parent:', error)
      },
    }
  )
}

export function useUpdateStudentParent() {
  return useApiMutation<StudentParent, UpdateStudentParentData>(
    (data) => api.put(`${endpoints.studentParents}/${data.id}/`, data),
    {
      invalidateQueries: [['student-parents'], ['student-detail']],
      onSuccess: (data) => {
        console.log('Student parent updated successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to update student parent:', error)
      },
    }
  )
}

export function useDeleteStudentParent() {
  return useApiMutation<void, number>(
    (id) => api.delete(`${endpoints.studentParents}/${id}/`),
    {
      invalidateQueries: [['student-parents'], ['student-detail']],
      onSuccess: () => {
        console.log('Student parent deleted successfully')
      },
      onError: (error) => {
        console.error('Failed to delete student parent:', error)
      },
    }
  )
}

// Student Activities Hooks
export function useStudentActivities(studentId: string) {
  return useApiQuery<StudentActivity[]>(
    ['student-activities', studentId],
    () => api.get(`${endpoints.student(studentId)}activities/`),
    {
      enabled: !!studentId,
      staleTime: 1000 * 60 * 5,
    }
  )
}

export function useCreateStudentActivity() {
  return useApiMutation<StudentActivity, CreateStudentActivityData & { studentId: string }>(
    (data) => api.post(`${endpoints.student(data.studentId)}add_activity/`, data),
    {
      invalidateQueries: [['student-activities'], ['student-detail']],
      onSuccess: (data) => {
        console.log('Student activity added successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to add student activity:', error)
      },
    }
  )
}

export function useUpdateStudentActivity() {
  return useApiMutation<StudentActivity, UpdateStudentActivityData>(
    (data) => api.put(`${endpoints.studentActivities}/${data.id}/`, data),
    {
      invalidateQueries: [['student-activities'], ['student-detail']],
      onSuccess: (data) => {
        console.log('Student activity updated successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to update student activity:', error)
      },
    }
  )
}

export function useDeleteStudentActivity() {
  return useApiMutation<void, number>(
    (id) => api.delete(`${endpoints.studentActivities}/${id}/`),
    {
      invalidateQueries: [['student-activities'], ['student-detail']],
      onSuccess: () => {
        console.log('Student activity deleted successfully')
      },
      onError: (error) => {
        console.error('Failed to delete student activity:', error)
      },
    }
  )
}

// Student Diary Hooks
export function useStudentDiary(studentId: string) {
  return useApiQuery<StudentDiary[]>(
    ['student-diary', studentId],
    () => api.get(`${endpoints.student(studentId)}diary/`),
    {
      enabled: !!studentId,
      staleTime: 1000 * 60 * 2,
    }
  )
}

export function useCreateStudentDiary() {
  return useApiMutation<StudentDiary, CreateStudentDiaryData & { studentId: string }>(
    (data) => api.post(`${endpoints.studentDiary}`, { ...data, student: data.studentId }),
    {
      invalidateQueries: [['student-diary'], ['student-detail']],
      onSuccess: (data) => {
        console.log('Student diary entry created successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to create student diary entry:', error)
      },
    }
  )
}

export function useUpdateStudentDiary() {
  return useApiMutation<StudentDiary, UpdateStudentDiaryData>(
    (data) => api.put(`${endpoints.studentDiary}/${data.id}/`, data),
    {
      invalidateQueries: [['student-diary'], ['student-detail']],
      onSuccess: (data) => {
        console.log('Student diary entry updated successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to update student diary entry:', error)
      },
    }
  )
}

export function useDeleteStudentDiary() {
  return useApiMutation<void, number>(
    (id) => api.delete(`${endpoints.studentDiary}/${id}/`),
    {
      invalidateQueries: [['student-diary'], ['student-detail']],
      onSuccess: () => {
        console.log('Student diary entry deleted successfully')
      },
      onError: (error) => {
        console.error('Failed to delete student diary entry:', error)
      },
    }
  )
}

// Scholarship Hooks
export function useScholarships() {
  return useApiQuery<Scholarship[]>(
    ['scholarships'],
    () => api.get(endpoints.scholarships),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  )
}

export function useCreateScholarship() {
  return useApiMutation<Scholarship, CreateScholarshipData>(
    (data) => api.post(endpoints.scholarships, data),
    {
      invalidateQueries: [['scholarships']],
      onSuccess: (data) => {
        console.log('Scholarship created successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to create scholarship:', error)
      },
    }
  )
}

export function useUpdateScholarship() {
  return useApiMutation<Scholarship, UpdateScholarshipData>(
    (data) => api.put(`${endpoints.scholarships}/${data.sch_id}/`, data),
    {
      invalidateQueries: [['scholarships']],
      onSuccess: (data) => {
        console.log('Scholarship updated successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to update scholarship:', error)
      },
    }
  )
}

export function useDeleteScholarship() {
  return useApiMutation<void, number>(
    (id) => api.delete(`${endpoints.scholarships}/${id}/`),
    {
      invalidateQueries: [['scholarships']],
      onSuccess: () => {
        console.log('Scholarship deleted successfully')
      },
      onError: (error) => {
        console.error('Failed to delete scholarship:', error)
      },
    }
  )
}

// Student Scholarships Hooks
export function useStudentScholarships(studentId: string) {
  return useApiQuery<StudentScholarship[]>(
    ['student-scholarships', studentId],
    () => api.get(`${endpoints.student(studentId)}scholarships/`),
    {
      enabled: !!studentId,
      staleTime: 1000 * 60 * 5,
    }
  )
}

export function useCreateStudentScholarship() {
  return useApiMutation<StudentScholarship, CreateStudentScholarshipData & { studentId: string }>(
    (data) => api.post(`${endpoints.studentScholarships}`, { ...data, student: data.studentId }),
    {
      invalidateQueries: [['student-scholarships'], ['student-detail']],
      onSuccess: (data) => {
        console.log('Student scholarship created successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to create student scholarship:', error)
      },
    }
  )
}

export function useUpdateStudentScholarship() {
  return useApiMutation<StudentScholarship, UpdateStudentScholarshipData>(
    (data) => api.put(`${endpoints.studentScholarships}/${data.id}/`, data),
    {
      invalidateQueries: [['student-scholarships'], ['student-detail']],
      onSuccess: (data) => {
        console.log('Student scholarship updated successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to update student scholarship:', error)
      },
    }
  )
}

export function useDeleteStudentScholarship() {
  return useApiMutation<void, number>(
    (id) => api.delete(`${endpoints.studentScholarships}/${id}/`),
    {
      invalidateQueries: [['student-scholarships'], ['student-detail']],
      onSuccess: () => {
        console.log('Student scholarship deleted successfully')
      },
      onError: (error) => {
        console.error('Failed to delete student scholarship:', error)
      },
    }
  )
}

// Student Statistics Hook
export function useStudentStatistics() {
  return useApiQuery<any>(
    ['student-statistics'],
    () => api.get(`${endpoints.students}/statistics/`),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  )
}


