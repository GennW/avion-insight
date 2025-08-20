import React, { useState } from 'react'
import { QuarterSelector } from './QuarterSelector'
import { useRosInf25ByQuarter, useRosOfStatByQuarter, useRosInf25Duplicates, useRosOfStatStatistics } from '@/hooks/useRosData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { FileText, Download, AlertTriangle, TrendingUp, Database, Eye } from 'lucide-react'

export const QuarterlyReports: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const currentQuarter = Math.ceil((new Date().getMonth() + 1) / 3)
  
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [selectedQuarter, setSelectedQuarter] = useState(currentQuarter)
  const [selectedRow, setSelectedRow] = useState<any>(null)

  const { data: rosInf25Data = [], isLoading: rosInf25Loading } = useRosInf25ByQuarter(selectedYear, selectedQuarter)
  const { data: rosOfStatData = [], isLoading: rosOfStatLoading } = useRosOfStatByQuarter(selectedYear, selectedQuarter)
  const { data: duplicatesData = [] } = useRosInf25Duplicates()
  const { data: statistics } = useRosOfStatStatistics()

  const isLoading = rosInf25Loading || rosOfStatLoading

  // Format date helper
  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return '-'
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString('ru-RU')
    } catch {
      return '-'
    }
  }

  // Prepare chart data - using 'dn' field for quarterly filtering
  const monthlyData = React.useMemo(() => {
    const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    const quarterMonths = months.slice((selectedQuarter - 1) * 3, selectedQuarter * 3)
    
    return quarterMonths.map((month, index) => {
      const monthIndex = (selectedQuarter - 1) * 3 + index + 1
      const inf25Count = rosInf25Data.filter(item => {
        if (!item.dn) return false
        const date = new Date(item.dn)
        return date.getMonth() + 1 === monthIndex && date.getFullYear() === selectedYear
      }).length
      
      const ofStatCount = rosOfStatData.filter(item => {
        if (!item.date_in) return false
        const date = new Date(item.date_in)
        return date.getMonth() + 1 === monthIndex && date.getFullYear() === selectedYear
      }).length
      
      return {
        month,
        'Обработанные данные': inf25Count,
        'Статистика файлов': ofStatCount
      }
    })
  }, [rosInf25Data, rosOfStatData, selectedQuarter, selectedYear])

  const statusDistribution = React.useMemo(() => {
    const distribution = rosInf25Data.reduce((acc, item) => {
      let status = 'Обычные'
      if (item.who_pasp_dubl) status = 'Дубликаты'
      else if (item.comment?.includes('неисправен')) status = 'Проблемные'
      
      acc[status] = (acc[status] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    return Object.entries(distribution).map(([status, count]) => ({
      name: status,
      value: count,
      color: status === 'Дубликаты' ? '#EF4444' : status === 'Проблемные' ? '#F59E0B' : '#10B981'
    }))
  }, [rosInf25Data])

  const handleRowClick = (row: any) => {
    setSelectedRow(row)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка данных за выбранный период...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <QuarterSelector
        selectedYear={selectedYear}
        selectedQuarter={selectedQuarter}
        onYearChange={setSelectedYear}
        onQuarterChange={setSelectedQuarter}
      />

      {/* Info Block */}
      <Card className="border-l-4 border-l-primary bg-primary/5">
        <CardContent className="pt-4">
          <p className="text-sm text-muted-foreground">
            <strong>Примечание:</strong> Периоды (квартал/месяц) определяются по полю <code className="bg-muted px-1 py-0.5 rounded text-xs">dn</code> (дата установки/снятия) из таблицы ros_inf_25.
          </p>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Обработано записей</p>
                <p className="text-2xl font-bold text-primary">{rosInf25Data.length}</p>
              </div>
              <Database className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Файлов статистики</p>
                <p className="text-2xl font-bold text-success">{rosOfStatData.length}</p>
              </div>
              <FileText className="w-8 h-8 text-success opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Дубликаты</p>
                <p className="text-2xl font-bold text-destructive">{duplicatesData.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Всего экспертов</p>
                <p className="text-2xl font-bold text-warning">{Object.keys(statistics?.byExpert || {}).length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-warning opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Помесячная динамика</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Обработанные данные" fill="hsl(var(--primary))" />
                  <Bar dataKey="Статистика файлов" fill="hsl(var(--success))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Распределение по статусам</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="hsl(var(--primary))"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <Tabs defaultValue="ros-inf-25" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ros-inf-25">Результаты обработки информации</TabsTrigger>
          <TabsTrigger value="duplicates">Двойники</TabsTrigger>
          <TabsTrigger value="statistics">Статистика по файлам</TabsTrigger>
        </TabsList>

        <TabsContent value="ros-inf-25" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Результаты обработки информации, представленной МТУ и АК</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Экспорт
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-auto max-h-96">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Государственный номер</TableHead>
                      <TableHead>Заводской номер</TableHead>
                      <TableHead>Центр сервиса</TableHead>
                      <TableHead>Дата установки/снятия</TableHead>
                      <TableHead>Источник</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rosInf25Data.slice(0, 10).map((item, index) => (
                      <TableRow key={index} className="cursor-pointer hover:bg-muted/50" onClick={() => handleRowClick(item)}>
                        <TableCell className="font-medium">{item.gn}</TableCell>
                        <TableCell>{item.zn}</TableCell>
                        <TableCell>{item.csd}</TableCell>
                        <TableCell>
                          {formatDate(item.dn)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={item.source === 'МТУ' ? 'default' : 'secondary'}>
                            {item.source || 'Неизвестно'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {rosInf25Data.length > 10 && (
                <p className="text-sm text-muted-foreground mt-2">
                  Показано 10 из {rosInf25Data.length} записей
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="duplicates" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Двойники, выявленные при локальной обработке</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Экспорт
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-auto max-h-96">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Государственный номер</TableHead>
                      <TableHead>Заводской номер</TableHead>
                      <TableHead>Кто выявил дубликат</TableHead>
                      <TableHead>Дата выявления</TableHead>
                      <TableHead>Комментарий</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {duplicatesData.slice(0, 10).map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.gn}</TableCell>
                        <TableCell>{item.zn}</TableCell>
                        <TableCell>
                          <Badge variant="destructive">
                            {item.who_pasp_dubl || 'Не указано'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {formatDate(item.dat_pasp_dubl)}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {item.comment || '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Статистика по присылаемым обменным файлам</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Экспорт
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-auto max-h-96">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Код центра</TableHead>
                      <TableHead>Имя файла</TableHead>
                      <TableHead>Эксперт</TableHead>
                      <TableHead>Дата поступления</TableHead>
                      <TableHead>Тип файла</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rosOfStatData.slice(0, 10).map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.ca || '-'}</TableCell>
                        <TableCell>{item.fn || '-'}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {item.expert || 'Не назначен'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {formatDate(item.date_in)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {item.file_ext || 'Неизвестно'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {rosOfStatData.length > 10 && (
                <p className="text-sm text-muted-foreground mt-2">
                  Показано 10 из {rosOfStatData.length} записей
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}