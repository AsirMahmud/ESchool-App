import { useState, useEffect } from 'react'
import { useApiQuery, useApiMutation } from './use-api'
import { api } from '@/lib/api'

// Admin Authentication Types
export interface AdminUser {
  id: number
  email: string
  username: string
  first_name: string
  last_name: string
  role: 'admin' | 'teacher' | 'student' | 'parent' | 'staff'
  phone: string
  is_active: boolean
  is_staff: boolean
  is_superuser: boolean
  date_joined: string
  last_login: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  access?: string
  refresh?: string
  access_token?: string
  refresh_token?: string
  user: AdminUser
}

// Admin Authentication Hooks
export function useAdminLogin() {
  return useApiMutation<AuthResponse, LoginCredentials>(
    (credentials) => api.post('/auth/login/', credentials),
    {
      onSuccess: (data) => {
        // Support both { access, refresh } and { access_token, refresh_token }
        const access = data.access ?? data.access_token
        const refresh = data.refresh ?? data.refresh_token

        if (access && refresh) {
          localStorage.setItem('access_token', access)
          localStorage.setItem('refresh_token', refresh)
          localStorage.setItem('user', JSON.stringify(data.user))
        } else {
          console.error('Login succeeded but tokens missing in response')
        }
      },
      onError: (error) => {
        console.error('Login failed:', error)
      },
    }
  )
}

export function useAdminLogout() {
  return useApiMutation<void, void>(
    () => api.post('/auth/logout/'),
    {
      onSuccess: () => {
        // Clear tokens from localStorage
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user')
      },
      onError: (error) => {
        console.error('Logout failed:', error)
        // Clear tokens anyway
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user')
      },
    }
  )
}

export function useAdminProfile() {
  const [hasToken, setHasToken] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasToken(!!localStorage.getItem('access_token'))
    }
  }, [])

  return useApiQuery<AdminUser>(
    ['admin-profile'],
    () => api.get('/auth/profile/'),
    {
      enabled: hasToken,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  )
}

export function useIsAdminAuthenticated() {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean
    user: AdminUser | null
    token: string | null
  }>({
    isAuthenticated: false,
    user: null,
    token: null
  })

  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      try {
        const token = localStorage.getItem('access_token')
        const user = localStorage.getItem('user')
        
        setAuthState({
          isAuthenticated: !!(token && user),
          user: user ? JSON.parse(user) : null,
          token
        })
      } catch (error) {
        console.error('Error reading from localStorage:', error)
        setAuthState({
          isAuthenticated: false,
          user: null,
          token: null
        })
      } finally {
        setIsInitialized(true)
      }
    }
  }, [])

  return {
    ...authState,
    isInitialized
  }
}
