'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/components/providers/auth-provider'
import { useCurrentStudent } from '@/hooks/use-students'
import { Badge } from '@/components/ui/badge'

export default function StudentProfilePage() {
  const { user } = useAuth()
  const { data: student } = useCurrentStudent()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600">Personal and academic information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between"><span>Name</span><span className="font-medium">{user?.first_name} {user?.last_name}</span></div>
            <div className="flex justify-between"><span>Email</span><span className="font-medium">{user?.email}</span></div>
            <div className="flex justify-between"><span>Phone</span><span className="font-medium">{user?.phone || '-'}</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Academic Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between"><span>Student No.</span><span className="font-medium">{student?.student_number}</span></div>
            <div className="flex justify-between"><span>Level</span><span className="font-medium">{student?.level_name || '-'}</span></div>
            <div className="flex justify-between"><span>Section</span><span className="font-medium">{student?.section_name || '-'}</span></div>
            <div className="flex justify-between"><span>Status</span><span className="font-medium capitalize">{student?.status}</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Emergency & Misc</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between"><span>Emergency Contact</span><span className="font-medium">{student?.emergency_contact_name || '-'}</span></div>
            <div className="flex justify-between"><span>Emergency Phone</span><span className="font-medium">{student?.emergency_contact_phone || '-'}</span></div>
            <div className="flex justify-between"><span>DOB</span><span className="font-medium">{student?.date_of_birth || '-'}</span></div>
            <div className="flex justify-between"><span>Gender</span><span className="font-medium capitalize">{student?.gender || '-'}</span></div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Address</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700">
            <div>{student?.address || '-'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Health & Achievements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between"><span>Medical Conditions</span><span className="font-medium">{student?.medical_conditions || '-'}</span></div>
            <div className="flex justify-between"><span>Achievements</span><span className="font-medium">{student?.achievements || '-'}</span></div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


