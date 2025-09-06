import { useApiQuery, useApiMutation } from './use-api'
import { api, endpoints } from '@/lib/api'
import { useCurrentStudent } from './use-students'

export interface Exam {
  exam_id: number
  exam_name: string
  exam_type: 'midterm' | 'final' | 'quiz' | 'assignment' | 'project' | 'practical' | 'oral' | 'entrance' | 'placement' | 'other'
  subject: string // Subject code (s_code)
  subject_name: string
  subject_code: string
  level: number
  level_name: string
  section?: number
  section_name?: string
  duration: string // DurationField as string
  total_marks: number
  passing_marks: number
  exam_date: string
  start_time: string
  end_time: string
  class_room?: number
  class_room_name?: string
  invigilator?: number
  invigilator_name?: string
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled' | 'postponed'
  instructions?: string
  academic_year: string
  semester?: string
  is_ongoing: boolean
  participant_count: number
  created_at: string
  updated_at: string
}

export interface ExamResult {
  id: number
  exam: number
  student: string
  student_name: string
  student_number: string
  marks_obtained: number
  grade: 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'F'
  is_passed: boolean
  remarks?: string
  submitted_at?: string
  graded_by?: number
  graded_by_name?: string
  graded_at?: string
  created_at: string
  updated_at: string
}

export interface CreateExamData {
  exam_name: string
  exam_type: Exam['exam_type']
  subject: string // Subject code (s_code)
  level: number
  section?: number
  duration: string // "HH:MM:SS" format
  total_marks: number
  passing_marks: number
  exam_date: string
  start_time: string
  end_time: string
  class_room?: number
  invigilator?: number
  status?: Exam['status']
  instructions?: string
  academic_year: string
  semester?: string
}

export interface CreateExamResultData {
  exam: number // Exam ID is required
  student: string
  marks_obtained: number
  grade: ExamResult['grade']
  is_passed: boolean
  remarks?: string
  submitted_at?: string
  graded_by?: number
}

export interface UpdateExamData extends Partial<CreateExamData> {
  exam_id: number
}

export interface UpdateExamResultData extends Partial<CreateExamResultData> {
  id: number
}

// Hooks
export function useExams(filters?: {
  exam_type?: string
  subject?: string // Subject code (s_code)
  level?: number
  section?: number
  status?: string
  academic_year?: string
  search?: string
}) {
  return useApiQuery<Exam[]>(
    ['exams', JSON.stringify(filters || {})],
    async () => {
      const params = new URLSearchParams()
      if (filters?.exam_type) params.append('exam_type', filters.exam_type)
      if (filters?.subject) params.append('subject', filters.subject)
      if (filters?.level) params.append('level', filters.level.toString())
      if (filters?.section) params.append('section', filters.section.toString())
      if (filters?.status) params.append('status', filters.status)
      if (filters?.academic_year) params.append('academic_year', filters.academic_year)
      if (filters?.search) params.append('search', filters.search)
      
      const queryString = params.toString()
      const endpoint = queryString ? `${endpoints.exams}?${queryString}` : endpoints.exams
      
      const data: any = await api.get(endpoint)
      if (Array.isArray(data)) return data as Exam[]
      if (data && Array.isArray(data.results)) return data.results as Exam[]
      return []
    },
    {
      staleTime: 1000 * 60 * 2,
    }
  )
}

export function useExam(id: number | string) {
  return useApiQuery<Exam>(
    ['exam', id.toString()],
    () => api.get(endpoints.exam(id)),
    { enabled: !!id, staleTime: 1000 * 60 * 5 }
  )
}

export function useCreateExam() {
  return useApiMutation<Exam, CreateExamData>(
    (data) => api.post(endpoints.exams, data),
    { invalidateQueries: [['exams']] }
  )
}

export function useUpdateExam() {
  return useApiMutation<Exam, UpdateExamData>(
    (data) => api.put(`${endpoints.exams}${data.exam_id}/`, data),
    { invalidateQueries: [['exams'], ['exam']] }
  )
}

export function useDeleteExam() {
  return useApiMutation<void, number>(
    (id) => api.delete(`${endpoints.exams}${id}/`),
    { invalidateQueries: [['exams']] }
  )
}

// Exam Results
export function useExamResults(examId: number | string) {
  return useApiQuery<ExamResult[]>(
    ['exam', examId.toString(), 'results'],
    () => api.get(`${endpoints.exam(examId)}results/`),
    { enabled: !!examId, staleTime: 1000 * 60 * 5 }
  )
}

export function useCreateExamResult() {
  return useApiMutation<ExamResult, CreateExamResultData>(
    (data) => api.post(`${endpoints.exam(data.exam)}add_result/`, data),
    { invalidateQueries: [['exam'], ['exams']] }
  )
}

export function useUpdateExamResult() {
  return useApiMutation<ExamResult, UpdateExamResultData>(
    (data) => api.put(`${endpoints.examResults}/${data.id}/`, data),
    { invalidateQueries: [['exam'], ['exams']] }
  )
}

export function useDeleteExamResult() {
  return useApiMutation<void, number>(
    (id) => api.delete(`${endpoints.examResults}/${id}/`),
    { invalidateQueries: [['exam'], ['exams']] }
  )
}

// Fetch exam results for the current logged-in student
export function useExamResultsByStudent(studentId?: string) {
  const { data: student, isLoading } = useCurrentStudent()
  const targetStudentId = studentId || student?.s_id

  return useApiQuery<ExamResult[]>(
    ['exam-results-by-student', targetStudentId || ''],
    async () => {
      if (!targetStudentId) return []
      // Filter global exam-results by student UUID
      const params = new URLSearchParams({ student: String(targetStudentId) })
      const endpoint = `${endpoints.examResults}?${params.toString()}`
      const data: any = await api.get(endpoint)
      if (Array.isArray(data)) return data as ExamResult[]
      if (data && Array.isArray(data.results)) return data.results as ExamResult[]
      return []
    },
    {
      enabled: !!targetStudentId && (!studentId || !isLoading),
      staleTime: 1000 * 60 * 5,
    }
  )
}

// Fetch exams for a specific student
export function useExamsByStudent(studentId?: string) {
  const { data: student, isLoading } = useCurrentStudent()
  const targetStudentId = studentId || student?.s_id

  return useApiQuery<Exam[]>(
    ['exams-by-student', targetStudentId || ''],
    async () => {
      if (!targetStudentId) return []
      const params = new URLSearchParams({ student: String(targetStudentId) })
      const endpoint = `${endpoints.exams}?${params.toString()}`
      const data: any = await api.get(endpoint)
      if (Array.isArray(data)) return data as Exam[]
      if (data && Array.isArray(data.results)) return data.results as Exam[]
      return []
    },
    {
      enabled: !!targetStudentId && (!studentId || !isLoading),
      staleTime: 1000 * 60 * 5,
    }
  )
}
