import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Aircraft {
  id: number
  type: string
  operator: string
  status: 'active' | 'inactive'
  components: number
  last_check: string
  authenticity: number
  created_at?: string
  updated_at?: string
}

export interface Operator {
  id: number
  region: string
  name: string
  count: number
  compliant: number
  created_at?: string
  updated_at?: string
}

export interface Component {
  id: number
  aircraft_id: number
  name: string
  type: string
  status: 'authentic' | 'questionable' | 'non_authentic'
  last_check: string
  serial_number: string
  passport_duplicate: boolean
  resource_expired: boolean
  created_at?: string
  updated_at?: string
}

export interface MonitoringResult {
  id: number
  criterion: string
  value: number
  color: string
  description: string
  created_at?: string
  updated_at?: string
}

// API functions
export const aircraftAPI = {
  getAll: async (): Promise<Aircraft[]> => {
    const { data, error } = await supabase
      .from('aircraft')
      .select('*')
      .order('id', { ascending: true })
    
    if (error) throw error
    return data || []
  },

  getById: async (id: number): Promise<Aircraft | null> => {
    const { data, error } = await supabase
      .from('aircraft')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  create: async (aircraft: Omit<Aircraft, 'id' | 'created_at' | 'updated_at'>): Promise<Aircraft> => {
    const { data, error } = await supabase
      .from('aircraft')
      .insert(aircraft)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

export const operatorAPI = {
  getAll: async (): Promise<Operator[]> => {
    const { data, error } = await supabase
      .from('operators')
      .select('*')
      .order('region', { ascending: true })
    
    if (error) throw error
    return data || []
  },

  getByRegion: async (region: string): Promise<Operator[]> => {
    const { data, error } = await supabase
      .from('operators')
      .select('*')
      .eq('region', region)
    
    if (error) throw error
    return data || []
  }
}

export const componentAPI = {
  getByAircraftId: async (aircraftId: number): Promise<Component[]> => {
    const { data, error } = await supabase
      .from('components')
      .select('*')
      .eq('aircraft_id', aircraftId)
      .order('name', { ascending: true })
    
    if (error) throw error
    return data || []
  },

  getProblematic: async (): Promise<Component[]> => {
    const { data, error } = await supabase
      .from('components')
      .select('*')
      .or('passport_duplicate.eq.true,resource_expired.eq.true,status.eq.non_authentic')
    
    if (error) throw error
    return data || []
  }
}

export const monitoringAPI = {
  getAll: async (): Promise<MonitoringResult[]> => {
    const { data, error } = await supabase
      .from('monitoring_results')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  }
}