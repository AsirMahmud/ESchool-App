'use client'

import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCurrentParent, useParentChildren } from '@/hooks/use-parents'
import { useExamResultsByStudent } from '@/hooks/use-exams'
import { FileText, Calendar, Trophy } from 'lucide-react'
import { format } from 'date-fns'

export default function ParentResultsPage() {
  const searchParams = useSearchParams()
  const selectedChildId = searchParams.get('child')

  const { data: parent } = useCurrentParent()
  const { data: children } = useParentChildren(parent?.p_id)

  const selectedChild = children?.find(child => child.s_id === selectedChildId) || children?.[0]
  const { data: results, isLoading } = useExamResultsByStudent(selectedChild?.s_id)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exam Results</h1>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Exam Results</h1>
        <p className="text-gray-600">
          {selectedChild
            ? `${selectedChild.name}'s examination results`
            : 'Select a child to view their results'
          }
        </p>
      </div>

      {selectedChild && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results && results.length > 0 ? (
            results.map((result) => (
              <Card key={result.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg">{result.exam_name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Subject:</span>
                      <Badge variant="outline">{result.subject_name}</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Score:</span>
                      <div className="flex items-center space-x-1">
                        <Trophy className="h-4 w-4 text-green-600" />
                        <span className="font-semibold">{result.score}/{result.total_marks}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Grade:</span>
                      <Badge
                        variant={result.grade === 'A' ? 'default' : result.grade === 'B' ? 'secondary' : 'outline'}
                        className={
                          result.grade === 'A' ? 'bg-green-100 text-green-800' :
                          result.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }
                      >
                        {result.grade}
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{result.exam_date ? format(new Date(result.exam_date), 'MMM dd, yyyy') : 'N/A'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full">
              <Card>
                <CardContent className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No exam results found for {selectedChild.name}.</p>
                    <p className="text-sm text-gray-500 mt-2">Results will appear here after examinations are completed.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
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

