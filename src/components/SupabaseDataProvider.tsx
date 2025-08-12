import React from 'react'
import { useAircraft, useOperators, useMonitoringResults, useProblematicComponents } from '@/hooks/useSupabaseData'
import { Loader2 } from 'lucide-react'

interface SupabaseDataProviderProps {
  children: (data: {
    aircraftData: any[]
    operatorsData: any[]
    monitoringData: any[]
    problematicComponents: any[]
    isLoading: boolean
    error: any
  }) => React.ReactNode
}

export const SupabaseDataProvider: React.FC<SupabaseDataProviderProps> = ({ children }) => {
  const { data: aircraftData = [], isLoading: aircraftLoading, error: aircraftError } = useAircraft()
  const { data: operatorsData = [], isLoading: operatorsLoading, error: operatorsError } = useOperators()
  const { data: monitoringData = [], isLoading: monitoringLoading, error: monitoringError } = useMonitoringResults()
  const { data: problematicComponents = [], isLoading: componentsLoading, error: componentsError } = useProblematicComponents()

  const isLoading = aircraftLoading || operatorsLoading || monitoringLoading || componentsLoading
  const error = aircraftError || operatorsError || monitoringError || componentsError

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Загрузка данных из Supabase...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-destructive mb-2">Ошибка загрузки данных</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {children({
        aircraftData,
        operatorsData,
        monitoringData,
        problematicComponents,
        isLoading,
        error
      })}
    </>
  )
}