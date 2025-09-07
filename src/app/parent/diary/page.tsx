'use client'

import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCurrentParent, useParentChildren } from '@/hooks/use-parents'
import { useStudentDiary } from '@/hooks/use-diary'
import { FileText, Calendar, User } from 'lucide-react'
import { format } from 'date-fns'

export default function ParentDiaryPage() {
  const searchParams = useSearchParams()
  const selectedChildId = searchParams.get('child')

  const { data: parent } = useCurrentParent()
  const { data: children } = useParentChildren(parent?.p_id)

  const selectedChild = children?.find(child => child.s_id === selectedChildId) || children?.[0]
  const { data: diaryEntries, isLoading } = useStudentDiary(selectedChild?.s_id)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Diary</h1>
          <p className="text-gray-600">Loading diary entries...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Diary</h1>
        <p className="text-gray-600">
          {selectedChild
            ? `${selectedChild.name}'s diary entries and notes`
            : 'Select a child to view their diary'
          }
        </p>
      </div>

      {selectedChild && (
        <div className="space-y-4">
          {diaryEntries && diaryEntries.length > 0 ? (
            diaryEntries.map((entry) => (
              <Card key={entry.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-lg">{entry.title}</CardTitle>
                    </div>
                    <Badge variant="outline">
                      {entry.entry_type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-gray-700">{entry.content}</p>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>{entry.teacher_name || 'Teacher'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{format(new Date(entry.created_at), 'MMM dd, yyyy')}</span>
                        </div>
                      </div>

                      {entry.is_important && (
                        <Badge variant="destructive" className="text-xs">
                          Important
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No diary entries found for {selectedChild.name}.</p>
                  <p className="text-sm text-gray-500 mt-2">Diary entries will appear here when teachers add them.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {!selectedChild && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-gray-600">No children found associated with your account.</p>
              <p className="text-sm text-gray-500 mt-2">Please contact the school administration if this seems incorrect.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

