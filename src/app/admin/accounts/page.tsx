'use client'

import { useState } from 'react'
import { useUsersWithoutAccounts, useUserAccounts, useCreateAccountForProfile, useResetUserPassword } from '@/hooks/use-accounts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Users, UserPlus, Key, Mail, UserCheck, AlertCircle, Search, Filter, Download, Upload } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { format } from 'date-fns'

export default function AccountManagementPage() {
  const [selectedProfile, setSelectedProfile] = useState<{
    type: 'student' | 'teacher' | 'employee'
    id: number | string
    name: string
    email: string
    identifier: string
  } | null>(null)
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'staff'>('student')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [generatedPassword, setGeneratedPassword] = useState<string | null>(null)
  const [resetPassword, setResetPassword] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'students' | 'teachers' | 'employees'>('all')
  const [selectedProfiles, setSelectedProfiles] = useState<Set<string>>(new Set())

  const { data: usersWithoutAccounts, isLoading: loadingProfiles, error: profilesError } = useUsersWithoutAccounts()
  const { data: userAccounts, isLoading: loadingAccounts } = useUserAccounts()
  const createAccount = useCreateAccountForProfile()
  const resetPasswordMutation = useResetUserPassword()

  // Debug logging
  console.log('Users without accounts data:', usersWithoutAccounts)
  console.log('Loading profiles:', loadingProfiles)
  console.log('Profiles error:', profilesError)

  const handleCreateAccount = async () => {
    if (!selectedProfile) return

    try {
      const result = await createAccount.mutateAsync({
        profile_type: selectedProfile.type,
        profile_id: selectedProfile.id,
        role: selectedRole
      })
      
      setGeneratedPassword(result.generated_password)
      setIsCreateDialogOpen(false)
      setSelectedProfile(null)
    } catch (error) {
      console.error('Failed to create account:', error)
    }
  }

  const handleResetPassword = async (userId: number) => {
    try {
      const result = await resetPasswordMutation.mutateAsync({ user_id: userId })
      setResetPassword(result.new_password)
    } catch (error) {
      console.error('Failed to reset password:', error)
    }
  }

  const handleBulkAccountCreation = async () => {
    if (selectedProfiles.size === 0) return

    const profiles = Array.from(selectedProfiles).map(profileKey => {
      const [type, id] = profileKey.split('-')
      return { type, id: type === 'student' ? id : parseInt(id) }  // Keep UUID as string for students
    })

    const results = []
    for (const profile of profiles) {
      try {
        const result = await createAccount.mutateAsync({
          profile_type: profile.type as 'student' | 'teacher' | 'employee',
          profile_id: profile.id,
          role: profile.type === 'employee' ? 'staff' : profile.type as 'student' | 'teacher'
        })
        results.push({ success: true, result, profile })
      } catch (error) {
        results.push({ success: false, error, profile })
      }
    }

    setSelectedProfiles(new Set())
    // Show results summary
    const successCount = results.filter(r => r.success).length
    const failCount = results.filter(r => !r.success).length
    alert(`Bulk account creation completed: ${successCount} successful, ${failCount} failed`)
  }

  const toggleProfileSelection = (profileKey: string) => {
    const newSelection = new Set(selectedProfiles)
    if (newSelection.has(profileKey)) {
      newSelection.delete(profileKey)
    } else {
      newSelection.add(profileKey)
    }
    setSelectedProfiles(newSelection)
  }

  const filteredStudents = usersWithoutAccounts?.students?.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.identifier.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const filteredTeachers = usersWithoutAccounts?.teachers?.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.identifier.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const filteredEmployees = usersWithoutAccounts?.employees?.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.identifier.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'teacher': return 'bg-blue-100 text-blue-800'
      case 'student': return 'bg-green-100 text-green-800'
      case 'parent': return 'bg-purple-100 text-purple-800'
      case 'staff': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6" />
            Account Management
          </h1>
          <p className="text-muted-foreground">Manage user accounts for students, teachers, and employees</p>
        </div>
        {selectedProfiles.size > 0 && (
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleBulkAccountCreation}
              disabled={createAccount.isPending}
              className="bg-green-600 hover:bg-green-700"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Create {selectedProfiles.size} Accounts
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setSelectedProfiles(new Set())}
            >
              Clear Selection
            </Button>
          </div>
        )}
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="students">Students Only</SelectItem>
              <SelectItem value="teachers">Teachers Only</SelectItem>
              <SelectItem value="employees">Employees Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="without-accounts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="without-accounts">Profiles Without Accounts</TabsTrigger>
          <TabsTrigger value="existing-accounts">Existing Accounts</TabsTrigger>
        </TabsList>

        <TabsContent value="without-accounts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Students Without Accounts */}
            {(filterType === 'all' || filterType === 'students') && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    Students
                  </CardTitle>
                  <CardDescription>
                    {filteredStudents.length} students without accounts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingProfiles ? (
                    <div className="text-center py-4">Loading...</div>
                  ) : profilesError ? (
                    <div className="text-center py-4 text-red-500">
                      Error loading students: {profilesError.message}
                    </div>
                  ) : filteredStudents.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      {searchTerm ? 'No students match your search' : 'All students have accounts'}
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {filteredStudents.map((student) => {
                        const profileKey = `student-${student.id}`
                        const isSelected = selectedProfiles.has(profileKey)
                        return (
                          <div key={student.id} className={`flex items-center justify-between p-2 border rounded ${isSelected ? 'bg-blue-50 border-blue-200' : ''}`}>
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleProfileSelection(profileKey)}
                                className="rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{student.name}</p>
                                <p className="text-sm text-muted-foreground truncate">{student.email}</p>
                                <p className="text-xs text-muted-foreground">ID: {student.identifier}</p>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedProfile({
                                  type: 'student',
                                  id: student.id,
                                  name: student.name,
                                  email: student.email,
                                  identifier: student.identifier
                                })
                                setSelectedRole('student')
                                setIsCreateDialogOpen(true)
                              }}
                            >
                              <UserPlus className="h-4 w-4" />
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Teachers Without Accounts */}
            {(filterType === 'all' || filterType === 'teachers') && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    Teachers
                  </CardTitle>
                  <CardDescription>
                    {filteredTeachers.length} teachers without accounts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingProfiles ? (
                    <div className="text-center py-4">Loading...</div>
                  ) : profilesError ? (
                    <div className="text-center py-4 text-red-500">
                      Error loading teachers: {profilesError.message}
                    </div>
                  ) : filteredTeachers.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      {searchTerm ? 'No teachers match your search' : 'All teachers have accounts'}
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {filteredTeachers.map((teacher) => {
                        const profileKey = `teacher-${teacher.id}`
                        const isSelected = selectedProfiles.has(profileKey)
                        return (
                          <div key={teacher.id} className={`flex items-center justify-between p-2 border rounded ${isSelected ? 'bg-blue-50 border-blue-200' : ''}`}>
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleProfileSelection(profileKey)}
                                className="rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{teacher.name}</p>
                                <p className="text-sm text-muted-foreground truncate">{teacher.email}</p>
                                <p className="text-xs text-muted-foreground">ID: {teacher.identifier}</p>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedProfile({
                                  type: 'teacher',
                                  id: teacher.id,
                                  name: teacher.name,
                                  email: teacher.email,
                                  identifier: teacher.identifier
                                })
                                setSelectedRole('teacher')
                                setIsCreateDialogOpen(true)
                              }}
                            >
                              <UserPlus className="h-4 w-4" />
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Employees Without Accounts */}
            {(filterType === 'all' || filterType === 'employees') && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    Employees
                  </CardTitle>
                  <CardDescription>
                    {filteredEmployees.length} employees without accounts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingProfiles ? (
                    <div className="text-center py-4">Loading...</div>
                  ) : profilesError ? (
                    <div className="text-center py-4 text-red-500">
                      Error loading employees: {profilesError.message}
                    </div>
                  ) : filteredEmployees.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      {searchTerm ? 'No employees match your search' : 'All employees have accounts'}
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {filteredEmployees.map((employee) => {
                        const profileKey = `employee-${employee.id}`
                        const isSelected = selectedProfiles.has(profileKey)
                        return (
                          <div key={employee.id} className={`flex items-center justify-between p-2 border rounded ${isSelected ? 'bg-blue-50 border-blue-200' : ''}`}>
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleProfileSelection(profileKey)}
                                className="rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{employee.name}</p>
                                <p className="text-sm text-muted-foreground truncate">{employee.email}</p>
                                <p className="text-xs text-muted-foreground">ID: {employee.identifier}</p>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedProfile({
                                  type: 'employee',
                                  id: employee.id,
                                  name: employee.name,
                                  email: employee.email,
                                  identifier: employee.identifier
                                })
                                setSelectedRole('staff')
                                setIsCreateDialogOpen(true)
                              }}
                            >
                              <UserPlus className="h-4 w-4" />
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="existing-accounts">
          <Card>
            <CardHeader>
              <CardTitle>Existing User Accounts</CardTitle>
              <CardDescription>Manage existing user accounts and reset passwords</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingAccounts ? (
                <div className="text-center py-8">Loading accounts...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Password</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userAccounts?.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.first_name} {user.last_name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.is_active)}>
                            {user.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.last_login ? format(new Date(user.last_login), 'MMM dd, yyyy HH:mm') : 'Never'}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {user.last_login ? 'Set' : 'Not Set'}
                            </Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleResetPassword(user.id)}
                              disabled={resetPasswordMutation.isPending}
                              className="h-6 px-2 text-xs"
                            >
                              {resetPasswordMutation.isPending ? 'Resetting...' : 'Reset'}
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleResetPassword(user.id)}
                            disabled={resetPasswordMutation.isPending}
                            className="bg-blue-50 hover:bg-blue-100"
                          >
                            <Key className="h-4 w-4 mr-1" />
                            Generate New Password
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Account Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create User Account</DialogTitle>
            <DialogDescription>
              Create a user account for {selectedProfile?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Profile Type</Label>
              <Input value={selectedProfile?.type} disabled />
            </div>
            <div>
              <Label>Name</Label>
              <Input value={selectedProfile?.name} disabled />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={selectedProfile?.email} disabled />
            </div>
            <div>
              <Label>User Role</Label>
              <Select value={selectedRole} onValueChange={(value: any) => setSelectedRole(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreateAccount}
                disabled={createAccount.isPending}
              >
                {createAccount.isPending ? 'Creating...' : 'Create Account'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Generated Password Alert */}
      {generatedPassword && (
        <Alert className="mt-4 border-green-200 bg-green-50">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <div className="space-y-3">
              <div>
                <strong className="text-lg">Account Created Successfully!</strong>
              </div>
              <div className="bg-white p-3 rounded border">
                <div className="text-sm text-gray-600 mb-1">Generated Password:</div>
                <div className="font-mono text-lg font-bold bg-gray-100 px-3 py-2 rounded border">
                  {generatedPassword}
                </div>
              </div>
              <div className="text-sm">
                <strong>Login Email:</strong> {selectedProfile?.email}<br />
                <em className="text-gray-600">Please share these credentials with the user securely.</em>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setGeneratedPassword(null)}
                  className="bg-white hover:bg-gray-50"
                >
                  Close
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedPassword);
                    // You could add a toast notification here
                  }}
                  className="bg-white hover:bg-gray-50"
                >
                  Copy Password
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Reset Password Alert */}
      {resetPassword && (
        <Alert className="mt-4 border-green-200 bg-green-50">
          <Key className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <div className="space-y-3">
              <div>
                <strong className="text-lg">Password Reset Successfully!</strong>
              </div>
              <div className="bg-white p-3 rounded border">
                <div className="text-sm text-gray-600 mb-1">New Password:</div>
                <div className="font-mono text-lg font-bold bg-gray-100 px-3 py-2 rounded border">
                  {resetPassword}
                </div>
              </div>
              <div className="text-sm">
                <strong>Login Email:</strong> {userAccounts?.find(u => u.id === resetPasswordMutation.variables?.user_id)?.email || 'N/A'}<br />
                <em className="text-gray-600">Please share these credentials with the user securely.</em>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setResetPassword(null)}
                  className="bg-white hover:bg-gray-50"
                >
                  Close
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(resetPassword);
                    // You could add a toast notification here
                  }}
                  className="bg-white hover:bg-gray-50"
                >
                  Copy Password
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
