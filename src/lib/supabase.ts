import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if we have valid Supabase credentials
const hasValidSupabaseConfig = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  supabaseAnonKey !== 'your-anon-key-here'

let supabase: any = null

if (hasValidSupabaseConfig) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  console.warn('Supabase not configured properly. Using fallback data.')
}

export { supabase }

// Fallback data for when Supabase is not available
const fallbackAircraftData: Aircraft[] = [
  { id: 22977, type: 'Ми-8АМT', operator: 'Ютэйр-Инжиниринг', status: 'active', components: 53, last_check: '2009-09-02', authenticity: 96.2 },
  { id: 22978, type: 'Ми-8МТ', operator: 'Аэрогео', status: 'active', components: 48, last_check: '2009-08-15', authenticity: 98.5 },
  { id: 22979, type: 'Ми-26Т', operator: 'Геликс', status: 'active', components: 32, last_check: '2009-07-10', authenticity: 94.8 },
  { id: 22980, type: 'Ми-171', operator: 'Авиация Колымы', status: 'active', components: 41, last_check: '2009-08-22', authenticity: 97.3 }
]

const fallbackOperatorData: Operator[] = [
  { id: 1, region: 'Архангельское', name: 'МТУ Архангельское', count: 3, compliant: 0 },
  { id: 2, region: 'Восточно-Сибирское', name: 'МТУ Восточно-Сибирское', count: 8, compliant: 2 },
  { id: 3, region: 'Дальневосточное', name: 'МТУ Дальневосточное', count: 8, compliant: 3 },
  { id: 4, region: 'Западно-Сибирское', name: 'МТУ Западно-Сибирское', count: 8, compliant: 1 },
  { id: 5, region: 'Камчатское', name: 'МТУ Камчатское', count: 1, compliant: 1 },
  { id: 6, region: 'Коми', name: 'МТУ Коми', count: 1, compliant: 0 },
  { id: 7, region: 'Красноярское', name: 'МТУ Красноярское', count: 10, compliant: 6 },
  { id: 8, region: 'Приволжское', name: 'МТУ Приволжское', count: 5, compliant: 1 },
  { id: 9, region: 'Росавиация', name: 'Росавиация', count: 10, compliant: 1 },
  { id: 10, region: 'Саха (Якутие)', name: 'МТУ Саха (Якутия)', count: 4, compliant: 4 },
  { id: 11, region: 'Северо-Восточное', name: 'МТУ Северо-Восточное', count: 4, compliant: 4 },
  { id: 12, region: 'Северо-Западное', name: 'МТУ Северо-Западное', count: 8, compliant: 2 },
  { id: 13, region: 'Тюменское', name: 'МТУ Тюменское', count: 9, compliant: 3 },
  { id: 14, region: 'Уральское', name: 'МТУ Уральское', count: 2, compliant: 1 },
  { id: 15, region: 'Центральное', name: 'МТУ Центральное', count: 15, compliant: 3 },
  { id: 16, region: 'Южное', name: 'МТУ Южное', count: 8, compliant: 1 }
]

const fallbackMonitoringData: MonitoringResult[] = [
  { id: 1, criterion: 'Соответствие номенклатуре', value: 53, color: '#10B981', description: 'Компоненты, соответствующие утвержденной номенклатуре' },
  { id: 2, criterion: 'Агрегаты с неутвержденными документами', value: 0, color: '#EF4444', description: 'Агрегаты без требуемых разрешительных документов' },
  { id: 3, criterion: 'Компоненты с дубликатами паспортов', value: 17, color: '#F59E0B', description: 'Выявлены дублированные паспорта компонентов' },
  { id: 4, criterion: 'Компоненты, отработавшие ресурсы', value: 2, color: '#EF4444', description: 'Компоненты, превысившие установленный ресурс' },
  { id: 5, criterion: 'Неутвержденные экспертами', value: 0, color: '#EF4444', description: 'Компоненты, не прошедшие экспертную оценку' }
]

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
    if (!supabase) {
      return fallbackAircraftData
    }

    try {
    const { data, error } = await supabase
      .from('aircraft')
      .select('*')
      .order('id', { ascending: true })
    
    if (error) throw error
    return data || []
    } catch (error) {
      console.warn('Failed to fetch from Supabase, using fallback data:', error)
      return fallbackAircraftData
    }
  },

  getById: async (id: number): Promise<Aircraft | null> => {
    if (!supabase) {
      return fallbackAircraftData.find(aircraft => aircraft.id === id) || null
    }

    try {
    const { data, error } = await supabase
      .from('aircraft')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
    } catch (error) {
      console.warn('Failed to fetch from Supabase, using fallback data:', error)
      return fallbackAircraftData.find(aircraft => aircraft.id === id) || null
    }
  },

  create: async (aircraft: Omit<Aircraft, 'id' | 'created_at' | 'updated_at'>): Promise<Aircraft> => {
    if (!supabase) {
      throw new Error('Supabase not configured. Cannot create aircraft.')
    }

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
    if (!supabase) {
      return fallbackOperatorData
    }

    try {
    const { data, error } = await supabase
      .from('operators')
      .select('*')
      .order('region', { ascending: true })
    
    if (error) throw error
    return data || []
    } catch (error) {
      console.warn('Failed to fetch from Supabase, using fallback data:', error)
      return fallbackOperatorData
    }
  },

  getByRegion: async (region: string): Promise<Operator[]> => {
    if (!supabase) {
      return fallbackOperatorData.filter(op => op.region === region)
    }

    try {
    const { data, error } = await supabase
      .from('operators')
      .select('*')
      .eq('region', region)
    
    if (error) throw error
    return data || []
    } catch (error) {
      console.warn('Failed to fetch from Supabase, using fallback data:', error)
      return fallbackOperatorData.filter(op => op.region === region)
    }
  }
}

export const componentAPI = {
  getByAircraftId: async (aircraftId: number): Promise<Component[]> => {
    if (!supabase) {
      return []
    }

    try {
    const { data, error } = await supabase
      .from('components')
      .select('*')
      .eq('aircraft_id', aircraftId)
      .order('name', { ascending: true })
    
    if (error) throw error
    return data || []
    } catch (error) {
      console.warn('Failed to fetch from Supabase, using fallback data:', error)
      return []
    }
  },

  getProblematic: async (): Promise<Component[]> => {
    if (!supabase) {
      return []
    }

    try {
    const { data, error } = await supabase
      .from('components')
      .select('*')
      .or('passport_duplicate.eq.true,resource_expired.eq.true,status.eq.non_authentic')
    
    if (error) throw error
    return data || []
    } catch (error) {
      console.warn('Failed to fetch from Supabase, using fallback data:', error)
      return []
    }
  }
}

export const monitoringAPI = {
  getAll: async (): Promise<MonitoringResult[]> => {
    if (!supabase) {
      return fallbackMonitoringData
    }

    try {
    const { data, error } = await supabase
      .from('monitoring_results')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
    } catch (error) {
      console.warn('Failed to fetch from Supabase, using fallback data:', error)
      return fallbackMonitoringData
    }
  }
}