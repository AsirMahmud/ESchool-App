'use client'

import { useState } from 'react'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Award,
  Shield,
  Edit,
  Save,
  Eye,
  EyeOff,
  Camera
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
// Toast functionality - using simple alerts for now
import { useCurrentTeacher, useUpdateTeacher } from '@/hooks/use-teachers'

export default function TeacherProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const toast = (options: { title: string; description: string; variant?: string }) => {
    alert(`${options.title}: ${options.description}`)
  }
  
  // For now using mock teacher ID - in real app this would come from auth context
  const { data: teacher, isLoading: teacherLoading } = useCurrentTeacher()
  const teacherId = teacher?.teacher_id
  const updateTeacherMutation = useUpdateTeacher()

  const [formData, setFormData] = useState({
    // Personal Info
    bio: teacher?.bio || '',
    email: teacher?.email || '',
    phone: teacher?.phone || '',
    address: teacher?.address || '',
    emergency_contact: teacher?.emergency_contact || '',
    emergency_phone: teacher?.emergency_phone || '',
    
    // Professional Info
    qualification: teacher?.qualification || '',
    specialization: teacher?.specialization || '',
    education: teacher?.education || '',
    certifications: teacher?.certifications || '',
    skills: teacher?.skills || '',
    experience_details: teacher?.experience_details || '',
    achievements: teacher?.achievements || '',
    
    // Password Change
    current_password: '',
    new_password: '',
    confirm_password: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = async () => {
    if (!teacherId) return;
    
    try {
      const updateData = {
      teacher_id: teacherId as number,
        bio: formData.bio,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        emergency_contact: formData.emergency_contact,
        emergency_phone: formData.emergency_phone,
        qualification: formData.qualification,
        specialization: formData.specialization,
        education: formData.education,
        certifications: formData.certifications,
        skills: formData.skills,
        experience_details: formData.experience_details,
        achievements: formData.achievements
      }

      await updateTeacherMutation.mutateAsync(updateData)
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      })
    }
  }

  const handleChangePassword = async () => {
    if (formData.new_password !== formData.confirm_password) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive"
      })
      return
    }

    if (formData.new_password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive"
      })
      return
    }

    try {
      // In a real app, you would call a password change API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Success",
        description: "Password changed successfully",
      })
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        current_password: '',
        new_password: '',
        confirm_password: ''
      }))
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password",
        variant: "destructive"
      })
    }
  }

  if (teacherLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">
                  Manage your personal and professional information
                </p>
              </div>
        <div className="flex items-center gap-3">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                onClick={() => {
                  setIsEditing(false)
                  // Reset form data to original values
                  setFormData({
                    bio: teacher?.bio || '',
                    email: teacher?.email || '',
                    phone: teacher?.phone || '',
                    address: teacher?.address || '',
                    emergency_contact: teacher?.emergency_contact || '',
                    emergency_phone: teacher?.emergency_phone || '',
                    qualification: teacher?.qualification || '',
                    specialization: teacher?.specialization || '',
                    education: teacher?.education || '',
                    certifications: teacher?.certifications || '',
                    skills: teacher?.skills || '',
                    experience_details: teacher?.experience_details || '',
                    achievements: teacher?.achievements || '',
                    current_password: '',
                    new_password: '',
                    confirm_password: ''
                  })
                }}
                    >
                      Cancel
                    </Button>
              <Button 
                onClick={handleSaveProfile}
                disabled={updateTeacherMutation.isPending}
              >
                {updateTeacherMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>

      {/* Profile Header Card */}
            <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col items-center sm:items-start">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={teacher?.profile_photo} />
                  <AvatarFallback className="text-xl">
                    {teacher?.teacher_name?.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                {isEditing && (
                          <Button
                    size="sm" 
                    variant="outline" 
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                          >
                            <Camera className="h-4 w-4" />
                          </Button>
                )}
                            </div>
                          </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{teacher?.teacher_name}</h2>
                <p className="text-gray-600">{teacher?.specialization}</p>
                <p className="text-sm text-gray-500">{teacher?.department_name}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="px-3 py-1">
                  {teacher?.years_of_experience} years experience
                </Badge>
                {teacher?.is_class_teacher && (
                  <Badge className="px-3 py-1">Class Teacher</Badge>
                )}
                <Badge variant="outline" className="px-3 py-1">
                  {teacher?.current_subjects?.length || 0} subjects
                </Badge>
                    </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{teacher?.teacher_email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{teacher?.teacher_phone}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Details Tabs */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="subjects">My Subjects</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Your personal contact and emergency information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Personal Email</Label>
                          <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    placeholder="your.email@example.com"
                  />
                      </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Personal Phone</Label>
                          <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    placeholder="+1 (555) 123-4567"
                  />
                      </div>
                    </div>

                      <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Your home address"
                  rows={3}
                />
                        </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Emergency Contact
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergency_contact">Contact Name</Label>
                    <Input
                      id="emergency_contact"
                      value={formData.emergency_contact}
                      onChange={(e) => handleInputChange('emergency_contact', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Emergency contact name"
                    />
                        </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="emergency_phone">Contact Phone</Label>
                    <Input
                      id="emergency_phone"
                      value={formData.emergency_phone}
                      onChange={(e) => handleInputChange('emergency_phone', e.target.value)}
                      disabled={!isEditing}
                      placeholder="+1 (555) 987-6543"
                    />
                        </div>
                      </div>
                    </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
              </div>
                  </CardContent>
                </Card>
        </TabsContent>

        <TabsContent value="professional" className="space-y-6">
                <Card>
                  <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>
                Your qualifications, experience, and achievements
              </CardDescription>
                  </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                  <Label htmlFor="qualification">Qualification</Label>
                  <Input
                    id="qualification"
                    value={formData.qualification}
                    onChange={(e) => handleInputChange('qualification', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Your highest qualification"
                  />
                        </div>
                
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    value={formData.specialization}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Your area of specialization"
                  />
                              </div>
                            </div>

              <div className="space-y-2">
                <Label htmlFor="education">Education</Label>
                <Textarea
                  id="education"
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Your educational background and degrees"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="certifications">Certifications</Label>
                <Textarea
                  id="certifications"
                  value={formData.certifications}
                  onChange={(e) => handleInputChange('certifications', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Professional certifications and licenses"
                  rows={3}
                />
                          </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <Textarea
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Teaching skills and competencies"
                  rows={3}
                />
                    </div>

              <div className="space-y-2">
                <Label htmlFor="experience_details">Experience Details</Label>
                <Textarea
                  id="experience_details"
                  value={formData.experience_details}
                  onChange={(e) => handleInputChange('experience_details', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Detailed work experience"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="achievements">Achievements</Label>
                <Textarea
                  id="achievements"
                  value={formData.achievements}
                  onChange={(e) => handleInputChange('achievements', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Awards and achievements"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your account password for security
              </CardDescription>
                  </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current_password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current_password"
                    type={showPassword ? "text" : "password"}
                    value={formData.current_password}
                    onChange={(e) => handleInputChange('current_password', e.target.value)}
                    placeholder="Enter your current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                          </Button>
                      </div>
                    </div>

              <div className="space-y-2">
                <Label htmlFor="new_password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new_password"
                    type={showNewPassword ? "text" : "password"}
                    value={formData.new_password}
                    onChange={(e) => handleInputChange('new_password', e.target.value)}
                    placeholder="Enter your new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                          </Button>
                      </div>
                <p className="text-xs text-gray-500">
                  Password must be at least 8 characters long
                      </p>
                    </div>

              <div className="space-y-2">
                <Label htmlFor="confirm_password">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm_password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirm_password}
                    onChange={(e) => handleInputChange('confirm_password', e.target.value)}
                    placeholder="Confirm your new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                          </Button>
                      </div>
                    </div>

              <Button 
                onClick={handleChangePassword}
                disabled={!formData.current_password || !formData.new_password || !formData.confirm_password}
                className="w-full sm:w-auto"
              >
                <Shield className="h-4 w-4 mr-2" />
                Change Password
                      </Button>
            </CardContent>
          </Card>
                  </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
                    <Card>
            <CardHeader>
              <CardTitle>My Subjects</CardTitle>
              <CardDescription>
                Subjects you are currently teaching
              </CardDescription>
            </CardHeader>
            <CardContent>
              {teacher?.current_subjects?.length === 0 ? (
                <div className="text-center py-8">
                  <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Subjects Assigned</h3>
                  <p className="text-gray-500">You don't have any subjects assigned yet.</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {teacher?.current_subjects?.map((subject, index) => (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold">{subject.subject_name}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              Code: {subject.subject_code}
                            </p>
                            {subject.section_name && (
                              <p className="text-sm text-blue-600 mt-1">
                                Section: {subject.section_name}
                              </p>
                            )}
                            <p className="text-sm text-gray-500 mt-1">
                              Started: {new Date(subject.start_date).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Active
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                        </div>
                    )}
                  </CardContent>
                </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}