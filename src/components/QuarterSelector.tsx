import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from 'lucide-react'

interface QuarterSelectorProps {
  selectedYear: number
  selectedQuarter: number
  onYearChange: (year: number) => void
  onQuarterChange: (quarter: number) => void
}

export const QuarterSelector: React.FC<QuarterSelectorProps> = ({
  selectedYear,
  selectedQuarter,
  onYearChange,
  onQuarterChange
}) => {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i + 5)
  
  const quarters = [
    { value: 1, label: 'I квартал (янв-мар)' },
    { value: 2, label: 'II квартал (апр-июн)' },
    { value: 3, label: 'III квартал (июл-сен)' },
    { value: 4, label: 'IV квартал (окт-дек)' }
  ]

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Выбор периода отчетности
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Год
            </label>
            <Select value={selectedYear.toString()} onValueChange={(value) => onYearChange(parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите год" />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Квартал
            </label>
            <Select value={selectedQuarter.toString()} onValueChange={(value) => onQuarterChange(parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите квартал" />
              </SelectTrigger>
              <SelectContent>
                {quarters.map(quarter => (
                  <SelectItem key={quarter.value} value={quarter.value.toString()}>
                    {quarter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}