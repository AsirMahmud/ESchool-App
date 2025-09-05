import { api, endpoints } from './api'

// Sports Team types
export interface SportsTeam {
  id: number
  name: string
  sport: string
  description: string
  coach_id: number
  practice_schedule: string
  practice_location: string
  max_players: number
  current_players: number
  level: 'varsity' | 'junior_varsity' | 'freshman' | 'recreational'
  requires_tryout: boolean
  season: 'fall' | 'winter' | 'spring' | 'summer' | 'all_year'
  is_active: boolean
  created_at: string
  updated_at: string
  // Related data
  coach?: {
    id: number
    first_name: string
    last_name: string
    email: string
  }
  players?: TeamPlayer[]
  games?: Game[]
}

export interface TeamPlayer {
  id: number
  team_id: number
  student_id: number
  position: string
  jersey_number: number
  joined_date: string
  status: 'active' | 'inactive' | 'injured' | 'suspended'
  is_captain: boolean
  is_vice_captain: boolean
  // Related data
  student?: {
    id: number
    first_name: string
    last_name: string
    class_name: string
    student_id: string
  }
}

export interface Game {
  id: number
  team_id: number
  opponent: string
  game_date: string
  game_time: string
  location: string
  home_away: 'home' | 'away'
  score_team: number | null
  score_opponent: number | null
  result: 'win' | 'loss' | 'tie' | 'pending'
  notes: string
  created_at: string
  updated_at: string
}

export interface CreateTeamData {
  name: string
  sport: string
  description: string
  coach_id: number
  practice_schedule: string
  practice_location: string
  max_players: number
  level: 'varsity' | 'junior_varsity' | 'freshman' | 'recreational'
  requires_tryout: boolean
  season: 'fall' | 'winter' | 'spring' | 'summer' | 'all_year'
}

export interface UpdateTeamData extends Partial<CreateTeamData> {
  id: number
}

export interface TeamFilters {
  sport?: string
  level?: 'varsity' | 'junior_varsity' | 'freshman' | 'recreational'
  season?: 'fall' | 'winter' | 'spring' | 'summer' | 'all_year'
  coach_id?: number
  is_active?: boolean
  search?: string
}

export interface AddPlayerData {
  student_id: number
  position: string
  jersey_number: number
  is_captain?: boolean
  is_vice_captain?: boolean
}

export interface UpdatePlayerData {
  position?: string
  jersey_number?: number
  status?: 'active' | 'inactive' | 'injured' | 'suspended'
  is_captain?: boolean
  is_vice_captain?: boolean
}

export interface CreateGameData {
  opponent: string
  game_date: string
  game_time: string
  location: string
  home_away: 'home' | 'away'
  notes?: string
}

export interface UpdateGameData extends Partial<CreateGameData> {
  id: number
  score_team?: number
  score_opponent?: number
  result?: 'win' | 'loss' | 'tie' | 'pending'
}

// Sports Team API functions
export const sportsTeamApi = {
  // Get all teams with optional filters
  getAll: (filters?: TeamFilters): Promise<SportsTeam[]> => {
    const params = new URLSearchParams()
    if (filters?.sport) params.append('sport', filters.sport)
    if (filters?.level) params.append('level', filters.level)
    if (filters?.season) params.append('season', filters.season)
    if (filters?.coach_id) params.append('coach_id', filters.coach_id.toString())
    if (filters?.is_active !== undefined) params.append('is_active', filters.is_active.toString())
    if (filters?.search) params.append('search', filters.search)
    
    const queryString = params.toString()
    const endpoint = queryString ? `${endpoints.sportsTeams}?${queryString}` : endpoints.sportsTeams
    
    return api.get<SportsTeam[]>(endpoint)
  },

  // Get team by ID
  getById: (id: number): Promise<SportsTeam> =>
    api.get<SportsTeam>(endpoints.sportsTeam(id)),

  // Create new team
  create: (data: CreateTeamData): Promise<SportsTeam> =>
    api.post<SportsTeam>(endpoints.sportsTeams, data),

  // Update team
  update: (data: UpdateTeamData): Promise<SportsTeam> =>
    api.put<SportsTeam>(endpoints.sportsTeam(data.id), data),

  // Delete team
  delete: (id: number): Promise<{ message: string }> =>
    api.delete<{ message: string }>(endpoints.sportsTeam(id)),

  // Get team players
  getPlayers: (teamId: number): Promise<TeamPlayer[]> =>
    api.get<TeamPlayer[]>(`${endpoints.sportsTeam(teamId)}/players/`),

  // Add player to team
  addPlayer: (teamId: number, data: AddPlayerData): Promise<TeamPlayer> =>
    api.post<TeamPlayer>(`${endpoints.sportsTeam(teamId)}/players/`, data),

  // Update player
  updatePlayer: (teamId: number, playerId: number, data: UpdatePlayerData): Promise<TeamPlayer> =>
    api.patch<TeamPlayer>(`${endpoints.sportsTeam(teamId)}/players/${playerId}/`, data),

  // Remove player from team
  removePlayer: (teamId: number, playerId: number): Promise<{ message: string }> =>
    api.delete<{ message: string }>(`${endpoints.sportsTeam(teamId)}/players/${playerId}/`),

  // Get team games
  getGames: (teamId: number): Promise<Game[]> =>
    api.get<Game[]>(`${endpoints.sportsTeam(teamId)}/games/`),

  // Add game
  addGame: (teamId: number, data: CreateGameData): Promise<Game> =>
    api.post<Game>(`${endpoints.sportsTeam(teamId)}/games/`, data),

  // Update game
  updateGame: (teamId: number, gameId: number, data: UpdateGameData): Promise<Game> =>
    api.patch<Game>(`${endpoints.sportsTeam(teamId)}/games/${gameId}/`, data),

  // Delete game
  deleteGame: (teamId: number, gameId: number): Promise<{ message: string }> =>
    api.delete<{ message: string }>(`${endpoints.sportsTeam(teamId)}/games/${gameId}/`),

  // Get teams by sport
  getBySport: (sport: string): Promise<SportsTeam[]> =>
    api.get<SportsTeam[]>(`${endpoints.sportsTeams}sport/${sport}/`),

  // Get teams by level
  getByLevel: (level: 'varsity' | 'junior_varsity' | 'freshman' | 'recreational'): Promise<SportsTeam[]> =>
    api.get<SportsTeam[]>(`${endpoints.sportsTeams}level/${level}/`),

  // Get teams by season
  getBySeason: (season: 'fall' | 'winter' | 'spring' | 'summer' | 'all_year'): Promise<SportsTeam[]> =>
    api.get<SportsTeam[]>(`${endpoints.sportsTeams}season/${season}/`),

  // Get teams by coach
  getByCoach: (coachId: number): Promise<SportsTeam[]> =>
    api.get<SportsTeam[]>(`${endpoints.sportsTeams}coach/${coachId}/`),

  // Update team status
  updateStatus: (id: number, isActive: boolean): Promise<SportsTeam> =>
    api.patch<SportsTeam>(`${endpoints.sportsTeam(id)}/status/`, { is_active: isActive }),

  // Get team statistics
  getStatistics: (teamId: number): Promise<{
    total_players: number
    active_players: number
    games_played: number
    wins: number
    losses: number
    ties: number
    win_percentage: number
    current_streak: string
  }> =>
    api.get<{
      total_players: number
      active_players: number
      games_played: number
      wins: number
      losses: number
      ties: number
      win_percentage: number
      current_streak: string
    }>(`${endpoints.sportsTeam(teamId)}/statistics/`),

  // Get upcoming games
  getUpcomingGames: (teamId: number, limit?: number): Promise<Game[]> => {
    const params = limit ? `?limit=${limit}` : ''
    return api.get<Game[]>(`${endpoints.sportsTeam(teamId)}/upcoming-games/${params}`)
  },

  // Get game results
  getGameResults: (teamId: number, startDate?: string, endDate?: string): Promise<Game[]> => {
    const params = new URLSearchParams()
    if (startDate) params.append('start_date', startDate)
    if (endDate) params.append('end_date', endDate)
    
    const queryString = params.toString()
    const endpoint = queryString 
      ? `${endpoints.sportsTeam(teamId)}/game-results/?${queryString}`
      : `${endpoints.sportsTeam(teamId)}/game-results/`
    
    return api.get<Game[]>(endpoint)
  },

  // Bulk operations
  bulkUpdate: (data: { ids: number[], updates: Partial<CreateTeamData> }): Promise<SportsTeam[]> =>
    api.patch<SportsTeam[]>(`${endpoints.sportsTeams}bulk-update/`, data),

  bulkDelete: (ids: number[]): Promise<{ message: string }> =>
    api.post<{ message: string }>(`${endpoints.sportsTeams}bulk-delete/`, { ids }),

  // Export team data
  exportData: (teamId: number, format: 'csv' | 'pdf' | 'excel' = 'csv'): Promise<Blob> =>
    api.get<Blob>(`${endpoints.sportsTeam(teamId)}/export/?format=${format}`),
}
