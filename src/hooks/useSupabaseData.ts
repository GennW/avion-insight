import { useQuery } from '@tanstack/react-query'
import { aircraftAPI, operatorAPI, componentAPI, monitoringAPI } from '@/lib/supabase'

export const useAircraft = () => {
  return useQuery({
    queryKey: ['aircraft'],
    queryFn: aircraftAPI.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useOperators = () => {
  return useQuery({
    queryKey: ['operators'],
    queryFn: operatorAPI.getAll,
    staleTime: 5 * 60 * 1000,
  })
}

export const useMonitoringResults = () => {
  return useQuery({
    queryKey: ['monitoring-results'],
    queryFn: monitoringAPI.getAll,
    staleTime: 5 * 60 * 1000,
  })
}

export const useProblematicComponents = () => {
  return useQuery({
    queryKey: ['problematic-components'],
    queryFn: componentAPI.getProblematic,
    staleTime: 5 * 60 * 1000,
  })
}

export const useComponentsByAircraft = (aircraftId: number) => {
  return useQuery({
    queryKey: ['components', aircraftId],
    queryFn: () => componentAPI.getByAircraftId(aircraftId),
    enabled: !!aircraftId,
    staleTime: 5 * 60 * 1000,
  })
}