import { useQuery } from '@tanstack/react-query'
import { rosInf25API, rosOfStatAPI } from '@/lib/supabase'

export const useRosInf25 = () => {
  return useQuery({
    queryKey: ['ros-inf-25'],
    queryFn: rosInf25API.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useRosInf25ByQuarter = (year: number, quarter: number) => {
  return useQuery({
    queryKey: ['ros-inf-25', year, quarter],
    queryFn: () => rosInf25API.getByQuarter(year, quarter),
    enabled: !!year && !!quarter,
    staleTime: 5 * 60 * 1000,
  })
}

export const useRosInf25Duplicates = () => {
  return useQuery({
    queryKey: ['ros-inf-25-duplicates'],
    queryFn: rosInf25API.getDuplicates,
    staleTime: 5 * 60 * 1000,
  })
}

export const useRosOfStat = () => {
  return useQuery({
    queryKey: ['ros-of-stat'],
    queryFn: rosOfStatAPI.getAll,
    staleTime: 5 * 60 * 1000,
  })
}

export const useRosOfStatByQuarter = (year: number, quarter: number) => {
  return useQuery({
    queryKey: ['ros-of-stat', year, quarter],
    queryFn: () => rosOfStatAPI.getByQuarter(year, quarter),
    enabled: !!year && !!quarter,
    staleTime: 5 * 60 * 1000,
  })
}

export const useRosOfStatStatistics = () => {
  return useQuery({
    queryKey: ['ros-of-stat-statistics'],
    queryFn: rosOfStatAPI.getStatistics,
    staleTime: 5 * 60 * 1000,
  })
}