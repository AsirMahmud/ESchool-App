import { useApiQuery, useApiMutation } from './use-api'
import { api, endpoints } from '@/lib/api'

export interface Parent {
  p_id: number
  name: string
  email: string
  phone: string
  alternate_phone?: string | null
  gender: 'male' | 'female' | 'other'
  date_of_birth?: string | null
  age?: number | null
  occupation:
    | 'employed'
    | 'self_employed'
    | 'business'
    | 'professional'
    | 'government'
    | 'private'
    | 'unemployed'
    | 'retired'
    | 'student'
    | 'other'
  job_title?: string | null
  workplace?: string | null
  address: string
  emergency_contact?: string | null
  emergency_phone?: string | null
  is_primary_contact?: boolean
  is_emergency_contact?: boolean
  notes?: string | null
  children_count?: number
  created_at?: string
  updated_at?: string
}

export interface CreateParentData {
  name: string
  email: string
  phone: string
  alternate_phone?: string
  gender: Parent['gender']
  date_of_birth?: string
  occupation: Parent['occupation']
  job_title?: string
  workplace?: string
  address: string
  emergency_contact?: string
  emergency_phone?: string
  is_primary_contact?: boolean
  is_emergency_contact?: boolean
  notes?: string
}

export interface UpdateParentData extends Partial<CreateParentData> {
  p_id: number
}

export function useParents(search?: string) {
  return useApiQuery<Parent[]>(
    ['parents', search || ''],
    async () => {
      const endpoint = search ? `${endpoints.parents}?search=${encodeURIComponent(search)}` : endpoints.parents
      const data: any = await api.get(endpoint)
      if (Array.isArray(data)) return data as Parent[]
      if (data && Array.isArray(data.results)) return data.results as Parent[]
      return []
    },
    {
      staleTime: 1000 * 60 * 2,
    }
  )
}

export function useParent(id: number | string) {
  return useApiQuery<Parent>(
    ['parent', id.toString()],
    () => api.get(endpoints.parent(id)),
    { enabled: !!id, staleTime: 1000 * 60 * 5 }
  )
}

export function useCreateParent() {
  return useApiMutation<Parent, CreateParentData>(
    (data) => api.post(endpoints.parents, data),
    { invalidateQueries: [['parents']] }
  )
}

export function useUpdateParent() {
  return useApiMutation<Parent, UpdateParentData>(
    (data) => api.put(`${endpoints.parents}${data.p_id}/`, data),
    { invalidateQueries: [['parents'], ['parent']] }
  )
}

export function useDeleteParent() {
  return useApiMutation<void, number>(
    (id) => api.delete(`${endpoints.parents}${id}/`),
    { invalidateQueries: [['parents']] }
  )
}

export interface ParentChild {
  s_id: string
  name: string
  student_number: string
  level_name?: string
  section_name?: string
}

export function useParentChildren(parentId: number | string) {
  return useApiQuery<ParentChild[]>(
    ['parent', parentId.toString(), 'children'],
    () => api.get(`${endpoints.parent(parentId)}children/`),
    { enabled: !!parentId, staleTime: 1000 * 60 * 5 }
  )
}

export interface ParentPayment {
  pay_id: number
  student_name: string
  payment_type: string
  amount: number
  due_date: string
  status: string
}

export function useParentPayments(parentId: number | string) {
  return useApiQuery<ParentPayment[]>(
    ['parent', parentId.toString(), 'payments'],
    () => api.get(`${endpoints.parent(parentId)}payments/`),
    { enabled: !!parentId, staleTime: 1000 * 60 * 5 }
  )
}


