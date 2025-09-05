import { useApiQuery, useApiMutation } from './use-api'
import { api, endpoints } from '@/lib/api'

// Types
export interface Assessment {
  id: number
  title: string
  description?: string
  subject: number
  subject_name: string
  class_room: number
  class_name: string
  teacher: number
  teacher_name: string
  assessment_type: 'quiz' | 'assignment' | 'exam' | 'project' | 'homework'
  total_marks: number
  passing_marks: number
  due_date: string
  start_date?: string
  duration_minutes?: number
  instructions?: string
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface AssessmentSubmission {
  id: number
  assessment: number
  student: number
  student_name: string
  student_id: string
  submitted_at?: string
  marks_obtained?: number
  grade?: string
  feedback?: string
  status: 'not_submitted' | 'submitted' | 'graded' | 'late'
  created_at: string
  updated_at: string
}

export interface CreateAssessmentData {
  title: string
  description?: string
  subject: number
  class_room: number
  assessment_type: 'quiz' | 'assignment' | 'exam' | 'project' | 'homework'
  total_marks: number
  passing_marks: number
  due_date: string
  start_date?: string
  duration_minutes?: number
  instructions?: string
  is_published?: boolean
}

export interface UpdateAssessmentData extends Partial<CreateAssessmentData> {
  id: number
}

export interface GradeSubmissionData {
  marks_obtained: number
  feedback?: string
}

export interface AssessmentStatistics {
  total_assessments: number
  published_assessments: number
  total_submissions: number
  graded_submissions: number
  average_marks: number
  pass_rate: number
}

// Hooks
export function useAssessments(filters?: {
  subject?: number
  class_room?: number
  teacher?: number
  assessment_type?: string
  is_published?: boolean
}) {
  const queryParams = new URLSearchParams()
  if (filters?.subject) queryParams.append('subject', filters.subject.toString())
  if (filters?.class_room) queryParams.append('class_room', filters.class_room.toString())
  if (filters?.teacher) queryParams.append('teacher', filters.teacher.toString())
  if (filters?.assessment_type) queryParams.append('assessment_type', filters.assessment_type)
  if (filters?.is_published !== undefined) queryParams.append('is_published', filters.is_published.toString())

  return useApiQuery<Assessment[]>(
    ['assessments', filters],
    async () => {
      const data: any = await api.get(`${endpoints.assessments}?${queryParams.toString()}`)
      if (Array.isArray(data)) return data as Assessment[]
      if (data && Array.isArray(data.results)) return data.results as Assessment[]
      return []
    },
    {
      staleTime: 1000 * 60 * 2, // 2 minutes
    }
  )
}

export function useAssessment(id: number | string) {
  return useApiQuery<Assessment>(
    ['assessment', id.toString()],
    () => api.get(`${endpoints.assessments}${id}/`),
    {
      enabled: !!id,
      staleTime: 1000 * 60 * 5,
    }
  )
}

export function useCreateAssessment() {
  return useApiMutation<Assessment, CreateAssessmentData>(
    (data) => api.post(endpoints.assessments, data),
    {
      invalidateQueries: [['assessments']],
      onSuccess: () => {
        console.log('Assessment created successfully')
      },
      onError: (error) => {
        console.error('Failed to create assessment:', error)
      },
    }
  )
}

export function useUpdateAssessment() {
  return useApiMutation<Assessment, UpdateAssessmentData>(
    (data) => api.put(`${endpoints.assessments}${data.id}/`, data),
    {
      invalidateQueries: [['assessments'], ['assessment', data.id.toString()]],
      onSuccess: () => {
        console.log('Assessment updated successfully')
      },
      onError: (error) => {
        console.error('Failed to update assessment:', error)
      },
    }
  )
}

export function useDeleteAssessment() {
  return useApiMutation<void, number>(
    (id) => api.delete(`${endpoints.assessments}${id}/`),
    {
      invalidateQueries: [['assessments']],
      onSuccess: () => {
        console.log('Assessment deleted successfully')
      },
      onError: (error) => {
        console.error('Failed to delete assessment:', error)
      },
    }
  )
}

// Assessment Submissions
export function useAssessmentSubmissions(assessmentId: number | string) {
  return useApiQuery<AssessmentSubmission[]>(
    ['assessment', assessmentId.toString(), 'submissions'],
    () => api.get(`${endpoints.assessments}${assessmentId}/submissions/`),
    {
      enabled: !!assessmentId,
      staleTime: 1000 * 60 * 2,
    }
  )
}

export function useGradeSubmission() {
  return useApiMutation<AssessmentSubmission, { submissionId: number; data: GradeSubmissionData }>(
    ({ submissionId, data }) => api.post(`${endpoints.assessments}submissions/${submissionId}/grade/`, data),
    {
      invalidateQueries: [['assessment'], ['assessments']],
      onSuccess: () => {
        console.log('Submission graded successfully')
      },
      onError: (error) => {
        console.error('Failed to grade submission:', error)
      },
    }
  )
}

export function useBulkGradeSubmissions() {
  return useApiMutation<AssessmentSubmission[], { submissions: Array<{ id: number; marks_obtained: number; feedback?: string }> }>(
    ({ submissions }) => api.post(`${endpoints.assessments}bulk_grade/`, { submissions }),
    {
      invalidateQueries: [['assessment'], ['assessments']],
      onSuccess: () => {
        console.log('Bulk grading completed successfully')
      },
      onError: (error) => {
        console.error('Failed to bulk grade submissions:', error)
      },
    }
  )
}

// Assessment Statistics
export function useAssessmentStatistics(filters?: {
  subject?: number
  class_room?: number
  teacher?: number
  date_range?: { start: string; end: string }
}) {
  const queryParams = new URLSearchParams()
  if (filters?.subject) queryParams.append('subject', filters.subject.toString())
  if (filters?.class_room) queryParams.append('class_room', filters.class_room.toString())
  if (filters?.teacher) queryParams.append('teacher', filters.teacher.toString())
  if (filters?.date_range) {
    queryParams.append('date_start', filters.date_range.start)
    queryParams.append('date_end', filters.date_range.end)
  }

  return useApiQuery<AssessmentStatistics>(
    ['assessments', 'statistics', filters],
    () => api.get(`${endpoints.assessments}statistics/?${queryParams.toString()}`),
    {
      staleTime: 1000 * 60 * 5,
    }
  )
}

// Student Assessment History
export function useStudentAssessmentHistory(studentId: number | string, filters?: {
  subject?: number
  class_room?: number
  date_range?: { start: string; end: string }
}) {
  const queryParams = new URLSearchParams()
  if (filters?.subject) queryParams.append('subject', filters.subject.toString())
  if (filters?.class_room) queryParams.append('class_room', filters.class_room.toString())
  if (filters?.date_range) {
    queryParams.append('date_start', filters.date_range.start)
    queryParams.append('date_end', filters.date_range.end)
  }

  return useApiQuery<AssessmentSubmission[]>(
    ['assessments', 'student', studentId.toString(), filters],
    () => api.get(`${endpoints.assessments}student/${studentId}/?${queryParams.toString()}`),
    {
      enabled: !!studentId,
      staleTime: 1000 * 60 * 5,
    }
  )
}

// Upcoming Assessments
export function useUpcomingAssessments(teacherId?: number, days?: number) {
  const queryParams = new URLSearchParams()
  if (teacherId) queryParams.append('teacher', teacherId.toString())
  if (days) queryParams.append('days', days.toString())

  return useApiQuery<Assessment[]>(
    ['assessments', 'upcoming', teacherId, days],
    () => api.get(`${endpoints.assessments}upcoming/?${queryParams.toString()}`),
    {
      staleTime: 1000 * 60 * 5,
    }
  )
}

// Assessment Analytics
export function useAssessmentAnalytics(assessmentId: number | string) {
  return useApiQuery<{
    total_students: number
    submitted_count: number
    graded_count: number
    average_marks: number
    highest_marks: number
    lowest_marks: number
    pass_rate: number
    grade_distribution: Record<string, number>
  }>(
    ['assessment', assessmentId.toString(), 'analytics'],
    () => api.get(`${endpoints.assessments}${assessmentId}/analytics/`),
    {
      enabled: !!assessmentId,
      staleTime: 1000 * 60 * 5,
    }
  )
}
