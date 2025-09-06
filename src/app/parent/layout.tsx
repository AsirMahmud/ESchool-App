'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  Calendar,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Home,
  Menu,
  User,
  Users,
  X,
  LogOut,
  BookOpen,
  CreditCard,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { RoleBasedRoute, useAuth } from '@/components/providers/auth-provider'
import { useLogout } from '@/hooks/use-auth'
import { useCurrentParent, useParentChildren, ParentChild } from '@/hooks/use-parents'

const navigation = [
  { name: 'Dashboard', href: '/parent/dashboard', icon: Home },
  { name: 'Subjects', href: '/parent/subjects', icon: BookOpen },
  { name: 'Timetable', href: '/parent/timetable', icon: Calendar },
  { name: 'Exam Schedule', href: '/parent/exams', icon: ClipboardCheck },
  { name: 'Results', href: '/parent/results', icon: FileText },
  { name: 'Diary', href: '/parent/diary', icon: FileText },
  { name: 'Teachers', href: '/parent/teachers', icon: Users },
  { name: 'Payments', href: '/parent/payments', icon: CreditCard },
]

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user } = useAuth()
  const logoutMutation = useLogout()

  // Get current parent and their children
  const { data: parent } = useCurrentParent()
  const { data: parentChildren } = useParentChildren(parent?.p_id || 0)

  // Get selected child from URL params
  const selectedChildId = searchParams.get('child')

  // Set default child if none selected
  useEffect(() => {
    if (parentChildren && parentChildren.length > 0 && !selectedChildId) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('child', parentChildren[0].s_id)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }
  }, [parentChildren, selectedChildId, pathname, router, searchParams])

  const selectedChild = parentChildren?.find(child => child.s_id === selectedChildId) || parentChildren?.[0]

  const handleChildChange = (childId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('child', childId)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
      router.push('/login')
    }
  }

  return (
    <RoleBasedRoute role="parent">
      <div className="min-h-screen bg-gray-50">
        {/* Mobile menu */}
        <div className="lg:hidden bg-white shadow-sm border-b px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Parent Portal</h1>
          <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between px-4 py-6 border-b">
                <h2 className="text-lg font-medium text-gray-900">Menu</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Child selector for mobile */}
              {parentChildren && parentChildren.length > 1 && (
                <div className="px-4 py-4 border-b">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Child</label>
                  <Select value={selectedChildId || ''} onValueChange={handleChildChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a child" />
                    </SelectTrigger>
                    <SelectContent>
                      {parentChildren.map((child) => (
                        <SelectItem key={child.s_id} value={child.s_id}>
                          {child.name} ({child.student_number})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <nav className="mt-6 px-4 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={`${item.href}?child=${selectedChildId || parentChildren?.[0]?.s_id || ''}`}
                      className={cn(
                        'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                        isActive ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        )}

        <div className="lg:flex">
          {/* Desktop sidebar */}
          <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
            <div className="flex flex-col flex-grow bg-white shadow-sm border-r">
              <div className="flex items-center px-6 py-6 border-b">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <GraduationCap className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h1 className="text-xl font-bold text-gray-900">Parent Portal</h1>
                    <p className="text-sm text-gray-500">E-School System</p>
                  </div>
                </div>
              </div>

              {/* Child selector */}
              {parentChildren && parentChildren.length > 0 && (
                <div className="px-6 py-4 border-b">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Child</label>
                  <Select value={selectedChildId || parentChildren[0]?.s_id || ''} onValueChange={handleChildChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a child" />
                    </SelectTrigger>
                    <SelectContent>
                      {parentChildren.map((child) => (
                        <SelectItem key={child.s_id} value={child.s_id}>
                          <div className="flex flex-col">
                            <span>{child.name}</span>
                            <span className="text-xs text-gray-500">{child.student_number} • {child.level_name} {child.section_name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <nav className="mt-6 flex-1 px-4 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={`${item.href}?child=${selectedChildId || parentChildren?.[0]?.s_id || ''}`}
                      className={cn(
                        'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                        isActive ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      )}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>

              <div className="flex-shrink-0 px-4 py-4 border-t">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start px-3">
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarFallback>
                          {user?.first_name?.[0]}{user?.last_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium">{user?.first_name} {user?.last_name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:pl-64 flex flex-col flex-1">
            <main className="flex-1">
              {children}
            </main>
          </div>
        </div>
      </div>
    </RoleBasedRoute>
  )
}
