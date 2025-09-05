import { api, endpoints } from './api'

// Authentication types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  password_confirm: string
  first_name: string
  last_name: string
  role: 'admin' | 'teacher' | 'student' | 'parent' | 'staff'
  phone?: string
}

export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  role: 'admin' | 'teacher' | 'student' | 'parent' | 'staff'
  phone?: string
  is_active: boolean
  last_login?: string
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  user: User
  access_token: string
  refresh_token: string
  token_type: string
}

export interface RefreshTokenResponse {
  access_token: string
  refresh_token: string
}

export interface PasswordChangeData {
  current_password: string
  new_password: string
  new_password_confirm: string
}

export interface PasswordResetData {
  email: string
}

export interface PasswordResetConfirmData {
  token: string
  new_password: string
  new_password_confirm: string
}

// Authentication API functions
export const authApi = {
  // Login user
  login: (credentials: LoginCredentials): Promise<AuthResponse> =>
    api.post<AuthResponse>('/auth/login/', credentials),

  // Register new user
  register: (data: RegisterData): Promise<AuthResponse> =>
    api.post<AuthResponse>('/auth/register/', data),

  // Logout user
  logout: (): Promise<{ message: string }> =>
    api.post<{ message: string }>('/auth/logout/', {}),

  // Refresh access token
  refreshToken: (refreshToken: string): Promise<RefreshTokenResponse> =>
    api.post<RefreshTokenResponse>('/auth/refresh/', { refresh: refreshToken }),

  // Get current user profile
  getProfile: (): Promise<User> =>
    api.get<User>('/auth/profile/'),

  // Update user profile
  updateProfile: (data: Partial<User>): Promise<User> =>
    api.patch<User>('/auth/profile/', data),

  // Change password
  changePassword: (data: PasswordChangeData): Promise<{ message: string }> =>
    api.post<{ message: string }>('/auth/change-password/', data),

  // Request password reset
  requestPasswordReset: (data: PasswordResetData): Promise<{ message: string }> =>
    api.post<{ message: string }>('/auth/password-reset/', data),

  // Confirm password reset
  confirmPasswordReset: (data: PasswordResetConfirmData): Promise<{ message: string }> =>
    api.post<{ message: string }>('/auth/password-reset/confirm/', data),

  // Verify email
  verifyEmail: (token: string): Promise<{ message: string }> =>
    api.post<{ message: string }>('/auth/verify-email/', { token }),

  // Resend verification email
  resendVerificationEmail: (email: string): Promise<{ message: string }> =>
    api.post<{ message: string }>('/auth/resend-verification/', { email }),
}

// Token management utilities
export const tokenUtils = {
  // Get token from localStorage
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token')
    }
    return null
  },

  // Get refresh token from localStorage
  getRefreshToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refresh_token')
    }
    return null
  },

  // Set tokens in localStorage
  setTokens: (accessToken: string, refreshToken: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('refresh_token', refreshToken)
    }
  },

  // Remove tokens from localStorage
  removeTokens: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }
  },

  // Check if token is expired
  isTokenExpired: (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.exp * 1000 < Date.now()
    } catch {
      return true
    }
  },

  // Decode token payload
  decodeToken: (token: string): any => {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch {
      return null
    }
  },
}



