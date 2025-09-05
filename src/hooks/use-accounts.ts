import { useApiQuery, useApiMutation } from './use-api'
import { api, endpoints } from '@/lib/api'

export interface UserAccount {
  id: number
  email: string
  username: string
  first_name: string
  last_name: string
  role: 'admin' | 'teacher' | 'student' | 'parent' | 'staff'
  phone?: string
  is_active: boolean
  is_staff: boolean
  is_superuser: boolean
  last_login?: string
  date_joined: string
}

export interface ProfileWithoutAccount {
  id: number | string  // Can be UUID for students or number for teachers/employees
  name: string
  email: string
  identifier: string // student_number, employee_id, etc.
}

export interface CreateAccountData {
  profile_type: 'student' | 'teacher' | 'employee'
  profile_id: number | string  // Can be UUID for students or number for teachers/employees
  role: 'student' | 'teacher' | 'staff'
}

export interface CreateAccountResponse {
  message: string
  user: UserAccount
  generated_password: string
  profile_type: string
  profile_id: number
}

export interface ResetPasswordResponse {
  message: string
  new_password: string
  user: UserAccount
}

// Hooks
export function useUsersWithoutAccounts() {
  return useApiQuery<{
    students: ProfileWithoutAccount[]
    teachers: ProfileWithoutAccount[]
    employees: ProfileWithoutAccount[]
  }>(
    ['users-without-accounts'],
    () => api.get(`${endpoints.accounts}users-without-accounts/`),
    { staleTime: 1000 * 60 * 5 }
  )
}

export function useUserAccounts() {
  return useApiQuery<UserAccount[]>(
    ['user-accounts'],
    () => api.get(`${endpoints.accounts}list-accounts/`),
    { staleTime: 1000 * 60 * 2 }
  )
}

export function useCreateAccountForProfile() {
  return useApiMutation<CreateAccountResponse, CreateAccountData>(
    (data) => api.post(`${endpoints.accounts}create-account-for-profile/`, data),
    { invalidateQueries: [['users-without-accounts'], ['user-accounts']] }
  )
}

export function useResetUserPassword() {
  return useApiMutation<ResetPasswordResponse, { user_id: number }>(
    (data) => api.post(`${endpoints.accounts}reset-password/`, data),
    { invalidateQueries: [['user-accounts']] }
  )
}
