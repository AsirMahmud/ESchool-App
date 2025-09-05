'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useIsAdminAuthenticated } from '@/hooks/use-admin-auth'
import { Loader2 } from 'lucide-react'

interface AdminAuthWrapperProps {
  children: React.ReactNode
}

export default function AdminAuthWrapper({ children }: AdminAuthWrapperProps) {
  const { isAuthenticated, user, isInitialized } = useIsAdminAuthenticated()
  const router = useRouter()

  useEffect(() => {
    // Only run authentication check after initialization
    if (isInitialized) {
      if (!isAuthenticated) {
        router.push('/admin/login')
      }
    }
  }, [isAuthenticated, isInitialized, router])

  // Show loading during SSR and initial client-side check
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}

