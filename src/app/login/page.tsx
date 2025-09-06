'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
  Mail,
  Lock,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useLogin, useAuthStatus } from '@/hooks/use-auth'
import { PublicRoute } from '@/components/providers/auth-provider'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  const router = useRouter()
  const loginMutation = useLogin()
  const { isAuthenticated, user } = useAuthStatus()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      redirectUserBasedOnRole(user.role)
    }
  }, [isAuthenticated, user])

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const redirectUserBasedOnRole = (role: string) => {
    switch (role) {
      case 'admin':
        router.push('/admin/dashboard')
        break
      case 'teacher':
        router.push('/teacher/dashboard')
        break
      case 'student':
        router.push('/student/dashboard')
        break
      case 'parent':
        router.push('/parent/dashboard')
        break
      case 'staff':
        router.push('/staff/dashboard')
        break
      default:
        router.push('/admin/dashboard') // Default fallback
    }
  }

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      setError(null)
      setSuccess(null)

      const result = await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
      })

      setSuccess('Login successful! Redirecting...')
      
      // Redirect based on user role
      setTimeout(() => {
        redirectUserBasedOnRole(result.user.role)
      }, 1500)

    } catch (err: any) {
      console.error('Login error:', err)
      setError(
        err?.response?.data?.detail || 
        err?.message || 
        'Login failed. Please check your credentials.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = () => {
    // Navigate to forgot password page (to be created)
    router.push('/forgot-password')
  }

  return (
    <PublicRoute>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your E-School account</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Success Alert */}
            {success && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">{success}</AlertDescription>
              </Alert>
            )}

            {/* Login Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="teacher@school.edu"
                          disabled={isLoading}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            disabled={isLoading}
                            className="h-11 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="link"
                    className="px-0 text-sm text-blue-600 hover:text-blue-800"
                    onClick={handleForgotPassword}
                    disabled={isLoading}
                  >
                    Forgot your password?
                  </Button>
                </div>

                {/* Login Button */}
                <Button 
                  type="submit" 
                  className="w-full h-11" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </Form>

            {/* Demo Accounts */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center text-sm text-gray-600 mb-4">
                Demo Accounts (for testing)
              </div>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900">Teacher Account</div>
                  <div className="text-gray-600">teacher@gmail.com / ZUDhlPQOoWIl</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900">Admin Account</div>
                  <div className="text-gray-600">asirmahmuhddd@gmail.com / (check database)</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900">Student Account</div>
                  <div className="text-gray-600">asirmahmdsdfuhddd@gmail.com / (check database)</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>© 2024 E-School Management System. All rights reserved.</p>
        </div>
      </div>
      </div>
    </PublicRoute>
  )
}
