import { useStudentDiaryEntries } from './use-student-diary'

// Diary entry interface for parent view
export interface DiaryEntry {
  id: number
  title: string
  content: string
  entry_type: string
  teacher_name?: string
  created_at: string
  is_important?: boolean
}

/**
 * Hook to get student diary entries formatted for parent view
 */
export function useStudentDiary(studentId?: string | number) {
  const { data, isLoading, error } = useStudentDiaryEntries({
    student: studentId?.toString(),
  })

  // Transform the API data to match the expected format
  const diaryEntries: DiaryEntry[] | undefined = data?.map((entry) => ({
    id: entry.id,
    title: `${entry.subject_name} - ${entry.task.substring(0, 50)}${entry.task.length > 50 ? '...' : ''}`,
    content: entry.task,
    entry_type: entry.is_completed ? 'Completed' : 'Assignment',
    teacher_name: undefined, // Not available in current API structure
    created_at: entry.created_at,
    is_important: !entry.is_completed && new Date(entry.due_date) < new Date(),
  }))

  return {
    data: diaryEntries,
    isLoading,
    error,
  }
}

