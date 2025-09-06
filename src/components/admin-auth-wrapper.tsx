'use client'

import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/auth-provider'

interface AdminAuthWrapperProps {
  children: ReactNode
}

export default function AdminAuthWrapper({ children }: AdminAuthWrapperProps) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Store the intended destination
        sessionStorage.setItem('redirectAfterLogin', window.location.pathname)
        router.push('/login')
        return
      }

      if (user && user.role !== 'admin') {
        // Redirect non-admin users to their appropriate dashboard
        const redirectPath = getRoleBasedPath(user.role)
        router.push(redirectPath)
        return
      }
    }
  }, [isAuthenticated, isLoading, user, router])

  // Show loading while checking authentication
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

  // Show nothing if not authenticated or not admin (will redirect)
  if (!isAuthenticated || !user || user.role !== 'admin') {
    return null
  }

  return <>{children}</>
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