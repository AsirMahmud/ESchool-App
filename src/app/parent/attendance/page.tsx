'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCurrentParent, useParentChildren } from '@/hooks/use-parents'
import { StudentAttendance } from '@/components/student-attendance'
import { Card, CardContent } from '@/components/ui/card'
import { Users } from 'lucide-react'

function ParentAttendanceContent() {
    const searchParams = useSearchParams()
    const selectedChildId = searchParams.get('child')

    const { data: parent } = useCurrentParent()
    const { data: children } = useParentChildren(parent?.p_id)

    const selectedChild = children?.find(child => child.s_id === selectedChildId) || children?.[0]

    if (!selectedChild) {
        return (
            <div className="p-8">
                <Card className="border-dashed border-2">
                    <CardContent className="flex flex-col items-center justify-center py-20">
                        <div className="bg-gray-100 p-4 rounded-full mb-4">
                            <Users className="h-10 w-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">No Child Selected</h3>
                        <p className="text-gray-500 mt-2 max-w-sm text-center">
                            Please select a child from the sidebar to view their attendance.
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="p-8">
            <StudentAttendance
                studentId={selectedChild.s_id}
                studentName={selectedChild.name}
                readOnly={true}
            />
        </div>
    )
}

function LoadingState() {
    return (
        <div className="p-8 animate-pulse">
            <div className="h-8 w-64 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-24 bg-gray-100 rounded-lg"></div>
                ))}
            </div>
            <div className="h-96 bg-gray-100 rounded-xl"></div>
        </div>
    )
}

export default function ParentAttendancePage() {
    return (
        <Suspense fallback={<LoadingState />}>
            <ParentAttendanceContent />
        </Suspense>
    )
}
