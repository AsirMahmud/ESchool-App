// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'

// Common headers
const getHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  }
}

// Generic API response type
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

// Generic error type
export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}

// Base fetch wrapper with error handling
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config: RequestInit = {
    headers: getHeaders(),
    ...options,
  }

  try {
    let response = await fetch(url, config)

    // If unauthorized, attempt token refresh once
    if (response.status === 401) {
      let shouldRetry = false
      try {
        const body = await response.clone().json().catch(() => null)
        const code = body?.code || body?.detail || ''
        if (
          typeof window !== 'undefined' &&
          (code === 'token_not_valid' || response.status === 401)
        ) {
          const refresh = localStorage.getItem('refresh_token')
          if (refresh) {
            const refreshResp = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ refresh }),
            })
            if (refreshResp.ok) {
              const refreshData = await refreshResp.json()
              const newAccess = refreshData.access || refreshData.access_token
              if (newAccess) {
                localStorage.setItem('access_token', newAccess)
                // retry original request with new header
                const retryHeaders = getHeaders()
                response = await fetch(url, { ...config, headers: retryHeaders })
                shouldRetry = true
              }
            } else {
              // Refresh failed; clear tokens
              localStorage.removeItem('access_token')
              localStorage.removeItem('refresh_token')
              localStorage.removeItem('user')
            }
          }
        }
      } catch (_) {
        // ignore refresh errors; fall through to normal error handling
      } finally {
        if (!shouldRetry && response.status === 401) {
          // Ensure tokens cleared on persistent 401
          if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('user')
          }
        }
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('An unexpected error occurred')
  }
}

// HTTP methods
export const api = {
  // GET request
  get: <T>(endpoint: string): Promise<T> => 
    apiRequest<T>(endpoint, { method: 'GET' }),

  // POST request
  post: <T>(endpoint: string, data?: any): Promise<T> => 
    apiRequest<T>(endpoint, { 
      method: 'POST', 
      body: data ? JSON.stringify(data) : undefined 
    }),

  // PUT request
  put: <T>(endpoint: string, data?: any): Promise<T> => 
    apiRequest<T>(endpoint, { 
      method: 'PUT', 
      body: data ? JSON.stringify(data) : undefined 
    }),

  // PATCH request
  patch: <T>(endpoint: string, data?: any): Promise<T> => 
    apiRequest<T>(endpoint, { 
      method: 'PATCH', 
      body: data ? JSON.stringify(data) : undefined 
    }),

  // DELETE request
  delete: <T>(endpoint: string): Promise<T> => 
    apiRequest<T>(endpoint, { method: 'DELETE' }),
}

// API endpoints
export const endpoints = {
  // Students
  students: '/students/',
  student: (id: string | number) => `/students/${id}/`,
  studentParents: '/student-parents/',
  studentParent: (id: string | number) => `/student-parents/${id}/`,
  studentActivities: '/student-activities/',
  studentActivity: (id: string | number) => `/student-activities/${id}/`,
  studentDiary: '/student-diary/',
  studentDiaryEntry: (id: string | number) => `/student-diary/${id}/`,
  scholarships: '/scholarships/',
  scholarship: (id: string | number) => `/scholarships/${id}/`,
  studentScholarships: '/student-scholarships/',
  studentScholarship: (id: string | number) => `/student-scholarships/${id}/`,
  
  // Teachers
  teachers: '/teachers/',
  teacher: (id: string | number) => `/teachers/${id}/`,
  teacherSubjects: '/teacher-subjects/',
  teacherClasses: '/teacher-classes/',
  teacherPerformance: '/teacher-performance/',
  
  // Classes
  classes: '/classes/',
  class: (id: string | number) => `/classes/${id}/`,
  // Class schedules
  classSchedules: '/class-schedules/',
  classSchedule: (id: string | number) => `/class-schedules/${id}/`,
  
  // Subjects
  subjects: '/subjects/',
  subject: (id: string | number) => `/subjects/${id}/`,
  
  // Departments
  departments: '/departments/',
  department: (id: string | number) => `/departments/${id}/`,
  
  // Employees
  employees: '/employees/',
  employee: (id: string | number) => `/employees/${id}/`,
  
  // Events
  events: '/events/',
  event: (id: string | number) => `/events/${id}/`,
  
  // Activities (Clubs, Sports Teams, etc.)
  activities: '/activities/',
  activity: (id: string | number) => `/activities/${id}/`,
  clubs: '/clubs/',
  club: (id: string | number) => `/clubs/${id}/`,
  sportsTeams: '/sports-teams/',
  sportsTeam: (id: string | number) => `/sports-teams/${id}/`,
  activityParticipation: '/activity-participation/',
  activityParticipant: (id: string | number) => `/activity-participation/${id}/`,
  
  // Levels
  levels: '/levels/',
  level: (id: string | number) => `/levels/${id}/`,
  levelSubjects: '/level-subjects/',
  levelSubject: (id: string | number) => `/level-subjects/${id}/`,
  
  // Sections
  sections: '/sections/',
  section: (id: string | number) => `/sections/${id}/`,
  sectionSubjects: '/section-subjects/',
  sectionSubject: (id: string | number) => `/section-subjects/${id}/`,
  
  // Parents
  parents: '/parents/',
  parent: (id: string | number) => `/parents/${id}/`,
  
  // Admissions
  admissions: '/admissions/',
  admission: (id: string | number) => `/admissions/${id}/`,
  
  // Attendance
  attendance: '/attendance/',
  attendanceRecord: (id: string | number) => `/attendance/${id}/`,
  attendanceStatistics: '/attendance/statistics/',
  attendanceBulk: '/attendance/bulk/',
  
  // Assessments
  assessments: '/assessments/',
  
  // Exams
  exams: '/exams/',
  exam: (id: string | number) => `/exams/${id}/`,
  examResults: '/exam-results/',
  examResult: (id: string | number) => `/exam-results/${id}/`,
  
  // Accounts (under auth endpoints)
  accounts: '/auth/',
  account: (id: string | number) => `/auth/${id}/`,
}
