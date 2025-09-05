import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authApi, tokenUtils, LoginCredentials, RegisterData, User, PasswordChangeData, PasswordResetData, PasswordResetConfirmData } from '@/lib/auth-api'

// Authentication hooks
export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // Store tokens
      tokenUtils.setTokens(data.access_token, data.refresh_token)
      
      // Set user data in cache
      queryClient.setQueryData(['user'], data.user)
      
      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error) => {
      console.error('Login failed:', error)
    },
  })
}

export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      // Store tokens
      tokenUtils.setTokens(data.access_token, data.refresh_token)
      
      // Set user data in cache
      queryClient.setQueryData(['user'], data.user)
      
      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error) => {
      console.error('Registration failed:', error)
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Remove tokens
      tokenUtils.removeTokens()
      
      // Clear user data from cache
      queryClient.removeQueries({ queryKey: ['user'] })
      queryClient.clear()
    },
    onError: (error) => {
      console.error('Logout failed:', error)
      // Even if logout fails, clear local data
      tokenUtils.removeTokens()
      queryClient.removeQueries({ queryKey: ['user'] })
      queryClient.clear()
    },
  })
}

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: authApi.getProfile,
    enabled: !!tokenUtils.getToken(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount, error: any) => {
      if (error?.status === 401) {
        return false // Don't retry on unauthorized
      }
      return failureCount < 3
    },
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (data) => {
      // Update user data in cache
      queryClient.setQueryData(['user'], data)
    },
    onError: (error) => {
      console.error('Profile update failed:', error)
    },
  })
}

export function useChangePassword() {
  return useMutation({
    mutationFn: authApi.changePassword,
    onSuccess: () => {
      console.log('Password changed successfully')
    },
    onError: (error) => {
      console.error('Password change failed:', error)
    },
  })
}

export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: authApi.requestPasswordReset,
    onSuccess: () => {
      console.log('Password reset email sent')
    },
    onError: (error) => {
      console.error('Password reset request failed:', error)
    },
  })
}

export function useConfirmPasswordReset() {
  return useMutation({
    mutationFn: authApi.confirmPasswordReset,
    onSuccess: () => {
      console.log('Password reset successful')
    },
    onError: (error) => {
      console.error('Password reset confirmation failed:', error)
    },
  })
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: authApi.verifyEmail,
    onSuccess: () => {
      console.log('Email verified successfully')
    },
    onError: (error) => {
      console.error('Email verification failed:', error)
    },
  })
}

export function useResendVerificationEmail() {
  return useMutation({
    mutationFn: authApi.resendVerificationEmail,
    onSuccess: () => {
      console.log('Verification email resent')
    },
    onError: (error) => {
      console.error('Failed to resend verification email:', error)
    },
  })
}

// Utility hooks
export function useIsAuthenticated() {
  const { data: user, isLoading } = useUser()
  return {
    isAuthenticated: !!user,
    isLoading,
    user,
  }
}

export function useAuthStatus() {
  const { data: user, isLoading, error } = useUser()
  const token = tokenUtils.getToken()
  
  return {
    isAuthenticated: !!user && !!token,
    isLoading,
    user,
    error,
    hasToken: !!token,
  }
}





