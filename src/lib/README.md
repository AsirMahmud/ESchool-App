# ESchool App API Documentation

This directory contains all the API functions and React Query hooks for the ESchool application.

## Structure

```
src/lib/
├── api.ts                 # Core API configuration and HTTP methods
├── auth-api.ts           # Authentication API functions
├── teacher-api.ts        # Teacher management API
├── class-api.ts          # Class management API
├── subject-api.ts        # Subject management API
├── department-api.ts     # Department management API
├── event-api.ts          # Event management API
├── react-query.ts        # React Query configuration
└── index.ts              # Export all APIs
```

## Core API Configuration

The `api.ts` file provides:
- Base API URL configuration
- HTTP method wrappers (GET, POST, PUT, PATCH, DELETE)
- Error handling
- Common headers management
- API endpoint constants

## Authentication API

Located in `auth-api.ts`, provides:
- User login/logout
- User registration
- Password management
- Token utilities
- Profile management

## Entity APIs

Each entity has its own API file with:
- CRUD operations
- Filtering and search
- Related data fetching
- Bulk operations
- Status management

## React Query Setup

### Provider Setup

The app is wrapped with `QueryProvider` in the root layout:

```tsx
import QueryProvider from "@/components/providers/query-provider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
```

### Custom Hooks

#### Generic API Hooks

```tsx
import { useApiQuery, useApiMutation } from '@/hooks/use-api';

// For GET requests
const { data, isLoading, error } = useApiQuery(
  ['students'],
  () => api.get('/students/'),
  { staleTime: 1000 * 60 * 2 }
);

// For mutations
const createStudent = useApiMutation(
  (data) => api.post('/students/', data),
  {
    invalidateQueries: [['students']],
    onSuccess: (data) => console.log('Student created:', data)
  }
);
```

#### Authentication Hooks

```tsx
import { useLogin, useUser, useLogout } from '@/hooks/use-auth';

// Login
const login = useLogin();
login.mutate({ email: 'user@example.com', password: 'password' });

// Get current user
const { data: user, isLoading } = useUser();

// Logout
const logout = useLogout();
logout.mutate();
```

#### Entity-Specific Hooks

```tsx
import { useStudents, useCreateStudent } from '@/hooks/use-students';

// Get all students
const { data: students, isLoading } = useStudents();

// Create student
const createStudent = useCreateStudent();
createStudent.mutate({
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  // ... other fields
});
```

## Usage Examples

### Fetching Data

```tsx
import { useQuery } from '@tanstack/react-query';
import { teacherApi } from '@/lib';

function TeachersList() {
  const { data: teachers, isLoading, error } = useQuery({
    queryKey: ['teachers'],
    queryFn: () => teacherApi.getAll(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {teachers?.map(teacher => (
        <div key={teacher.id}>{teacher.user.first_name}</div>
      ))}
    </div>
  );
}
```

### Creating Data

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { classApi } from '@/lib';

function CreateClassForm() {
  const queryClient = useQueryClient();
  
  const createClass = useMutation({
    mutationFn: classApi.create,
    onSuccess: () => {
      // Invalidate and refetch classes
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
  });

  const handleSubmit = (data) => {
    createClass.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

### Optimistic Updates

```tsx
import { useOptimisticMutation } from '@/hooks/use-api';

function UpdateStudentForm() {
  const updateStudent = useOptimisticMutation(
    (data) => api.put(`/students/${data.id}/`, data),
    {
      queryKey: ['students'],
      updateFn: (oldData, variables) => {
        return oldData?.map(student => 
          student.id === variables.id 
            ? { ...student, ...variables }
            : student
        ) || [];
      },
    }
  );

  // The UI will update immediately, then sync with server
  updateStudent.mutate(updatedData);
}
```

## Error Handling

All API functions include proper error handling:

```tsx
const { data, error, isError } = useQuery({
  queryKey: ['students'],
  queryFn: () => api.get('/students/'),
  retry: (failureCount, error) => {
    if (error?.status === 401) return false; // Don't retry auth errors
    return failureCount < 3;
  },
});

if (isError) {
  return <div>Error: {error.message}</div>;
}
```

## Environment Variables

Set the API base URL in your `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Best Practices

1. **Query Keys**: Use consistent, hierarchical query keys
2. **Stale Time**: Set appropriate stale times for different data types
3. **Error Boundaries**: Implement error boundaries for better UX
4. **Loading States**: Always show loading states during API calls
5. **Optimistic Updates**: Use optimistic updates for better perceived performance
6. **Cache Management**: Properly invalidate queries after mutations
7. **Type Safety**: Use TypeScript interfaces for all API responses



