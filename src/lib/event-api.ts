import { api, endpoints } from './api'

// Event types
export interface Event {
  id: number
  title: string
  description: string
  event_type: 'academic' | 'sports' | 'cultural' | 'other'
  start_date: string
  end_date: string
  start_time: string
  end_time: string
  location: string
  organizer_id: number
  max_participants: number
  current_participants: number
  is_active: boolean
  created_at: string
  updated_at: string
  // Related data
  organizer?: {
    id: number
    first_name: string
    last_name: string
  }
}

export interface CreateEventData {
  title: string
  description: string
  event_type: 'academic' | 'sports' | 'cultural' | 'other'
  start_date: string
  end_date: string
  start_time: string
  end_time: string
  location: string
  organizer_id: number
  max_participants: number
}

export interface UpdateEventData extends Partial<CreateEventData> {
  id: number
}

export interface EventFilters {
  event_type?: 'academic' | 'sports' | 'cultural' | 'other'
  start_date?: string
  end_date?: string
  organizer_id?: number
  is_active?: boolean
  search?: string
}

export interface EventParticipant {
  id: number
  event_id: number
  user_id: number
  role: 'participant' | 'volunteer' | 'organizer'
  registration_date: string
  is_confirmed: boolean
}

// Event API functions
export const eventApi = {
  // Get all events with optional filters
  getAll: (filters?: EventFilters): Promise<Event[]> => {
    const params = new URLSearchParams()
    if (filters?.event_type) params.append('event_type', filters.event_type)
    if (filters?.start_date) params.append('start_date', filters.start_date)
    if (filters?.end_date) params.append('end_date', filters.end_date)
    if (filters?.organizer_id) params.append('organizer_id', filters.organizer_id.toString())
    if (filters?.is_active !== undefined) params.append('is_active', filters.is_active.toString())
    if (filters?.search) params.append('search', filters.search)
    
    const queryString = params.toString()
    const endpoint = queryString ? `${endpoints.events}?${queryString}` : endpoints.events
    
    return api.get<Event[]>(endpoint)
  },

  // Get event by ID
  getById: (id: number): Promise<Event> =>
    api.get<Event>(endpoints.event(id)),

  // Create new event
  create: (data: CreateEventData): Promise<Event> =>
    api.post<Event>(endpoints.events, data),

  // Update event
  update: (data: UpdateEventData): Promise<Event> =>
    api.put<Event>(endpoints.event(data.id), data),

  // Delete event
  delete: (id: number): Promise<{ message: string }> =>
    api.delete<{ message: string }>(endpoints.event(id)),

  // Get event participants
  getParticipants: (eventId: number): Promise<EventParticipant[]> =>
    api.get<EventParticipant[]>(`${endpoints.event(eventId)}/participants/`),

  // Register for event
  register: (eventId: number, data: {
    user_id: number
    role?: 'participant' | 'volunteer'
  }): Promise<EventParticipant> =>
    api.post<EventParticipant>(`${endpoints.event(eventId)}/register/`, data),

  // Unregister from event
  unregister: (eventId: number, userId: number): Promise<{ message: string }> =>
    api.delete<{ message: string }>(`${endpoints.event(eventId)}/unregister/${userId}/`),

  // Confirm participant
  confirmParticipant: (eventId: number, participantId: number): Promise<EventParticipant> =>
    api.patch<EventParticipant>(`${endpoints.event(eventId)}/participants/${participantId}/confirm/`, {}),

  // Get upcoming events
  getUpcoming: (limit?: number): Promise<Event[]> => {
    const params = limit ? `?limit=${limit}` : ''
    return api.get<Event[]>(`${endpoints.events}upcoming/${params}`)
  },

  // Get events by date range
  getByDateRange: (startDate: string, endDate: string): Promise<Event[]> =>
    api.get<Event[]>(`${endpoints.events}date-range/?start_date=${startDate}&end_date=${endDate}`),

  // Get events by type
  getByType: (eventType: 'academic' | 'sports' | 'cultural' | 'other'): Promise<Event[]> =>
    api.get<Event[]>(`${endpoints.events}type/${eventType}/`),

  // Update event status
  updateStatus: (id: number, isActive: boolean): Promise<Event> =>
    api.patch<Event>(`${endpoints.event(id)}/status/`, { is_active: isActive }),

  // Send event notifications
  sendNotification: (eventId: number, data: {
    message: string
    recipients: 'all' | 'participants' | 'organizers'
  }): Promise<{ message: string }> =>
    api.post<{ message: string }>(`${endpoints.event(eventId)}/notify/`, data),

  // Bulk operations
  bulkUpdate: (data: { ids: number[], updates: Partial<CreateEventData> }): Promise<Event[]> =>
    api.patch<Event[]>(`${endpoints.events}bulk-update/`, data),

  bulkDelete: (ids: number[]): Promise<{ message: string }> =>
    api.post<{ message: string }>(`${endpoints.events}bulk-delete/`, { ids }),
}



