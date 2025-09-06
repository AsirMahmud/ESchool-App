'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStatus } from '@/hooks/use-auth'
import { User } from '@/lib/auth-api'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: any
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { isAuthenticated, isLoading, user, error } = useAuthStatus()

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
  fallbackPath?: string
}

export function ProtectedRoute({ 
  children, 
  allowedRoles = [], 
  fallbackPath = '/login' 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Store the intended destination
        sessionStorage.setItem('redirectAfterLogin', pathname)
        router.push(fallbackPath)
        return
      }

      if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on role
        const redirectPath = getRoleBasedPath(user.role)
        router.push(redirectPath)
        return
      }

      setIsChecking(false)
    }
  }, [isAuthenticated, isLoading, user, allowedRoles, router, pathname, fallbackPath])

  // Show loading while checking authentication
  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show nothing if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null
  }

  // Show nothing if role not allowed (will redirect)
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}

// Role-based Route Component
interface RoleBasedRouteProps {
  children: React.ReactNode
  role: string
}

export function RoleBasedRoute({ children, role }: RoleBasedRouteProps) {
  return (
    <ProtectedRoute allowedRoles={[role]}>
      {children}
    </ProtectedRoute>
  )
}

// Utility function to get role-based path
function getRoleBasedPath(role: string): string {
  switch (role) {
    case 'admin':
      return '/admin/dashboard'
    case 'teacher':
      return '/teacher/dashboard'
    case 'student':
      return '/student/dashboard'
    case 'parent':
      return '/parent/dashboard'
    case 'staff':
      return '/staff/dashboard'
    default:
      return '/login'
  }
}

// Public Route Component (for login, register, etc.)
interface PublicRouteProps {
  children: React.ReactNode
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      // Check for stored redirect path
      const redirectPath = sessionStorage.getItem('redirectAfterLogin')
      if (redirectPath) {
        sessionStorage.removeItem('redirectAfterLogin')
        router.push(redirectPath)
      } else {
        // Redirect to role-based dashboard
        const defaultPath = getRoleBasedPath(user.role)
        router.push(defaultPath)
      }
    }
  }, [isAuthenticated, isLoading, user, router])

  // Show loading while checking
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show nothing if authenticated (will redirect)
  if (isAuthenticated) {
    return null
  }

  return <>{children}</>
}
