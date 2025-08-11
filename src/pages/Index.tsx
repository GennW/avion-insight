import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Search, Filter, Download, AlertTriangle, CheckCircle, Info, TrendingUp, Database, Users, FileText } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Data from the provided files
  const monitoringData = [
    { name: 'Соответствие номенклатуре', value: 53, color: 'hsl(var(--success))' },
    { name: 'Агрегаты с неутвержденными документами', value: 0, color: 'hsl(var(--destructive))' },
    { name: 'Компоненты с дубликатами паспортов', value: 17, color: 'hsl(var(--warning))' },
    { name: 'Компоненты, отработавшие ресурсы', value: 2, color: 'hsl(var(--destructive))' },
    { name: 'Неутвержденные экспертами', value: 0, color: 'hsl(var(--destructive))' }
  ];

  const aircraftData = [
    { id: 22977, type: 'Ми-8АМT', operator: 'Ютэйр-Инжиниринг', status: 'active', components: 53, lastCheck: '02.09.2009', authenticity: 96.2 },
    { id: 22978, type: 'Ми-8МТ', operator: 'Аэрогео', status: 'active', components: 48, lastCheck: '15.08.2009', authenticity: 98.5 },
    { id: 22979, type: 'Ми-26Т', operator: 'Геликс', status: 'active', components: 32, lastCheck: '10.07.2009', authenticity: 94.8 },
    { id: 22980, type: 'Ми-171', operator: 'Авиация Колымы', status: 'active', components: 41, lastCheck: '22.08.2009', authenticity: 97.3 }
  ];

  const operatorsData = [
    { region: 'Архангельское', count: 3, compliant: 0 },
    { region: 'Восточно-Сибирское', count: 8, compliant: 2 },
    { region: 'Дальневосточное', count: 8, compliant: 3 },
    { region: 'Западно-Сибирское', count: 8, compliant: 1 },
    { region: 'Камчатское', count: 1, compliant: 1 },
    { region: 'Коми', count: 1, compliant: 0 },
    { region: 'Красноярское', count: 10, compliant: 6 },
    { region: 'Приволжское', count: 5, compliant: 1 },
    { region: 'Росавиация', count: 10, compliant: 1 },
    { region: 'Саха (Якутие)', count: 4, compliant: 4 },
    { region: 'Северо-Восточное', count: 4, compliant: 4 },
    { region: 'Северо-Западное', count: 8, compliant: 2 },
    { region: 'Тюменское', count: 9, compliant: 3 },
    { region: 'Уральское', count: 2, compliant: 1 },
    { region: 'Центральное', count: 15, compliant: 3 },
    { region: 'Южное', count: 8, compliant: 1 }
  ];

  const authenticityCriteria = [
    {
      criterion: 'Поставленные без прав',
      description: 'Составные части, поставленные непосредственно их пользователю субподрядчиком, не наделенным такими правами',
      measure: 'Сертификация организаций-поставщиков авиационно-технического имущества (АТИ)',
      icon: '🏭'
    },
    {
      criterion: 'ТО/ремонт без прав',
      description: 'Составные части, прошедшие ТО или ремонт и допущенные к дальнейшей эксплуатации лицом или организацией, не наделенными такими правами',
      measure: 'Контроль по БД сертификатов на соответствие ФАП-285 и АП-145; Электронная выверка с авиапредприятиями',
      icon: '🔧'
    },
    {
      criterion: 'Не по документации',
      description: 'Составные части, ТОиР которых проводились не в соответствии с требованиями распространяющейся на них утвержденной документации',
      measure: 'Контроль документации с использованием БД Центральной нормативно-методической библиотеки ГА',
      icon: '📋'
    },
    {
      criterion: 'Истекший срок',
      description: 'Составные части, достигшие ограничения срока их эксплуатации, включая, в необходимых случаях, срок хранения',
      measure: 'Отслеживание и контроль жизненного цикла компонентов ВС с использованием программно-аппаратных средств ИАС МЛГ ВС',
      icon: '⏱️'
    },
    {
      criterion: 'Несоответствие документации',
      description: 'Компонент ВС, имеющий неутвержденную, т.е. оформленную с отклонениями от требований нормативно-технических документов, сопроводительную и пономерную документацию',
      measure: 'Проведение работ по оценке аутентичности при сертификации экземпляра ВС; Организация процесса мониторинга летной годности ВС',
      icon: '📄'
    }
  ];

  const issuesData = [
    { issue: 'Компоненты с дубликатами паспортов', count: 17, severity: 'high', description: 'Обнаружено 17 компонентов с дублированными паспортами' },
    { issue: 'Компоненты, отработавшие ресурсы', count: 2, severity: 'high', description: '2 компонента превысили установленный срок эксплуатации' },
    { issue: 'Сомнительные компоненты', count: 0, severity: 'medium', description: 'Компоненты, вызывающие вопросы по результатам экспертной оценки' },
    { issue: 'Несоответствие документации', count: 0, severity: 'medium', description: 'Выявлены расхождения в сопроводительной документации' }
  ];

  const filteredOperators = operatorsData.filter(region => 
    selectedRegion === 'all' || region.region === selectedRegion
  );

  const filteredAircraft = aircraftData.filter(aircraft =>
    aircraft.operator.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aircraft.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalOperators = operatorsData.reduce((sum, region) => sum + region.count, 0);
  const compliantOperators = operatorsData.reduce((sum, region) => sum + region.compliant, 0);
  const complianceRate = (compliantOperators / totalOperators) * 100;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card shadow-elegant border-b-4 border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                <Database className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">МЛГ ВС</h1>
                <p className="text-sm text-muted-foreground">Мониторинг Летной Годности Воздушных Судов</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              {['dashboard', 'aircraft', 'operators', 'criteria', 'reports'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-accent text-accent-foreground shadow-card'
                      : 'text-muted-foreground hover:text-primary hover:bg-accent/50'
                  }`}
                >
                  {tab === 'dashboard' && 'Панель'}
                  {tab === 'aircraft' && 'Воздушные Суда'}
                  {tab === 'operators' && 'Авиакомпании'}
                  {tab === 'criteria' && 'Критерии'}
                  {tab === 'reports' && 'Отчеты'}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-slide-in">
            {/* Hero Section */}
            <div className="bg-gradient-hero rounded-2xl shadow-elegant overflow-hidden">
              <div className="px-6 py-12 md:px-12">
                <div className="max-w-3xl">
                  <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                    Система оценки аутентичности компонентов воздушных судов
                  </h2>
                  <p className="text-primary-foreground/80 text-lg mb-6">
                    Интегрированная информационно-аналитическая система мониторинга летной годности воздушных судов
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-card/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-card/30">
                      <span className="text-primary-foreground font-semibold">ФГУП ГосНИИ ГА</span>
                    </div>
                    <div className="bg-card/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-card/30">
                      <span className="text-primary-foreground font-semibold">Методика № 24.10-966 ГА</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card rounded-xl shadow-card p-6 border border-border hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Всего авиакомпаний</p>
                    <p className="text-3xl font-bold text-foreground">{totalOperators}</p>
                  </div>
                  <Users className="w-12 h-12 text-primary opacity-20" />
                </div>
              </div>

              <div className="bg-card rounded-xl shadow-card p-6 border border-border hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Соответствующих</p>
                    <p className="text-3xl font-bold text-success">{compliantOperators}</p>
                  </div>
                  <CheckCircle className="w-12 h-12 text-success opacity-20" />
                </div>
              </div>

              <div className="bg-card rounded-xl shadow-card p-6 border border-border hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Самолетов в БД</p>
                    <p className="text-3xl font-bold text-primary">{aircraftData.length}</p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-primary opacity-20" />
                </div>
              </div>

              <div className="bg-card rounded-xl shadow-card p-6 border border-border hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Общий уровень</p>
                    <p className="text-3xl font-bold text-warning">{complianceRate.toFixed(1)}%</p>
                  </div>
                  <FileText className="w-12 h-12 text-warning opacity-20" />
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Authenticity Distribution */}
              <div className="bg-card rounded-xl shadow-card p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">Распределение компонентов по критериям аутентичности</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={monitoringData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="hsl(var(--primary))"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {monitoringData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Regional Compliance */}
              <div className="bg-card rounded-xl shadow-card p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">Соответствие по регионам</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={operatorsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="region" angle={-45} textAnchor="end" height={70} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="compliant" name="Соответствующие" fill="hsl(var(--success))" />
                      <Bar dataKey="count" name="Всего" fill="hsl(var(--destructive))" fillOpacity={0.3} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Critical Issues */}
            <div className="bg-card rounded-xl shadow-card p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-6">Критические проблемы</h3>
              <div className="space-y-4">
                {issuesData.map((issue, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 transition-all duration-300 hover:shadow-card ${
                    issue.severity === 'high' 
                      ? 'bg-destructive/10 border-destructive' 
                      : 'bg-warning/10 border-warning'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className={`w-5 h-5 ${
                          issue.severity === 'high' ? 'text-destructive' : 'text-warning'
                        }`} />
                        <div>
                          <p className="font-medium text-foreground">{issue.issue}</p>
                          <p className="text-sm text-muted-foreground">{issue.description}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        issue.severity === 'high' 
                          ? 'bg-destructive/20 text-destructive' 
                          : 'bg-warning/20 text-warning'
                      }`}>
                        {issue.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Aircraft Tab */}
        {activeTab === 'aircraft' && (
          <div className="space-y-6 animate-slide-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold text-foreground">Воздушные Суда</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Поиск по оператору или типу..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-foreground"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAircraft.map((aircraft) => (
                <div key={aircraft.id} className="bg-card rounded-xl shadow-card overflow-hidden hover:shadow-elegant transition-all duration-300 border border-border">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{aircraft.type}</h3>
                        <p className="text-sm text-muted-foreground">№ {aircraft.id}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        aircraft.status === 'active' 
                          ? 'bg-success/20 text-success' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {aircraft.status === 'active' ? 'Активен' : 'Неактивен'}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Оператор</p>
                        <p className="text-sm text-foreground">{aircraft.operator}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Компоненты</p>
                        <p className="text-sm text-foreground">{aircraft.components}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Последняя проверка</p>
                        <p className="text-sm text-foreground">{aircraft.lastCheck}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Уровень аутентичности</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-500"
                              style={{ width: `${aircraft.authenticity}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold text-foreground w-16">
                            {aircraft.authenticity}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Operators Tab */}
        {activeTab === 'operators' && (
          <div className="space-y-6 animate-slide-in">
            <h2 className="text-2xl font-bold text-foreground">Авиакомпании и МТУ</h2>
            
            <div className="bg-card rounded-xl shadow-card p-6 border border-border">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-foreground"
                >
                  <option value="all">Все регионы</option>
                  {operatorsData.map((region) => (
                    <option key={region.region} value={region.region}>
                      {region.region}
                    </option>
                  ))}
                </select>
                
                <div className="text-sm text-muted-foreground">
                  Показано {filteredOperators.length} из {operatorsData.length} регионов
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Регион</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Кол-во</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Соответствуют</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Процент</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOperators.map((region, index) => {
                      const compliance = region.count > 0 ? (region.compliant / region.count) * 100 : 0;
                      return (
                        <tr key={index} className="border-b border-border hover:bg-accent/50 transition-colors duration-200">
                          <td className="py-4 px-4 text-foreground">{region.region}</td>
                          <td className="py-4 px-4 text-muted-foreground">{region.count}</td>
                          <td className="py-4 px-4 text-muted-foreground">{region.compliant}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 bg-muted rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full transition-all duration-500 ${
                                    compliance >= 70 ? 'bg-success' : compliance >= 40 ? 'bg-warning' : 'bg-destructive'
                                  }`}
                                  style={{ width: `${compliance}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-foreground w-12">
                                {compliance.toFixed(0)}%
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              compliance >= 70 ? 'bg-success/20 text-success' : 
                              compliance >= 40 ? 'bg-warning/20 text-warning' : 'bg-destructive/20 text-destructive'
                            }`}>
                              {compliance >= 70 ? 'Высокий' : compliance >= 40 ? 'Средний' : 'Низкий'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Criteria Tab */}
        {activeTab === 'criteria' && (
          <div className="space-y-6 animate-slide-in">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Критерии оценки аутентичности</h2>
              <p className="text-muted-foreground">В соответствии с рекомендациями ИКАО DOC 9760 и Методикой № 24.10-966 ГА</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {authenticityCriteria.map((criterion, index) => (
                <div key={index} className="bg-card rounded-xl shadow-card p-6 hover:shadow-elegant transition-all duration-300 border border-border">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl mt-1">{criterion.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{criterion.criterion}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{criterion.description}</p>
                      <div className="bg-accent/50 rounded-lg p-3">
                        <p className="text-sm font-medium text-accent-foreground">Меры контроля:</p>
                        <p className="text-sm text-accent-foreground/80 mt-1">{criterion.measure}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-xl shadow-card p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Определение неаутентичных компонентов</h3>
              <div className="prose max-w-none">
                <p className="text-muted-foreground mb-4">
                  Неаутентичные компоненты ВС - это компоненты ВС, несоответствующие установленным условиям производства, технического обслуживания, ремонта и(или), имеющие оформленную документации с нарушениями установленных требований.
                </p>
                <p className="text-muted-foreground">
                  ФГУП ГосНИИ ГА - единственная в Российской Федерации организация, занимающаяся на профессиональном уровне проведением работ по оценке аутентичности и мониторингу жизненного цикла компонентов ВС.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6 animate-slide-in">
            <h2 className="text-2xl font-bold text-foreground">Отчеты и документация</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl shadow-card p-6 border border-border hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <FileText className="w-8 h-8 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Интегрированный отчет</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">ВС: Ми-8АМT № 22977</p>
                  <p className="text-sm text-muted-foreground">Оператор: Ютэйр-Инжиниринг</p>
                  <p className="text-sm text-muted-foreground">Дата: 02.09.2009</p>
                  <div className="pt-2">
                    <button className="flex items-center space-x-2 text-primary hover:text-primary-glow text-sm font-medium transition-colors duration-200">
                      <Download className="w-4 h-4" />
                      <span>Скачать PDF</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl shadow-card p-6 border border-border hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <Database className="w-8 h-8 text-success" />
                  <h3 className="text-lg font-semibold text-foreground">База данных</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Компонентов в БД: 53</p>
                  <p className="text-sm text-muted-foreground">Проблемных: 19</p>
                  <p className="text-sm text-muted-foreground">Последнее обновление: 02.09.2009</p>
                  <div className="pt-2">
                    <button className="flex items-center space-x-2 text-success hover:opacity-80 text-sm font-medium transition-opacity duration-200">
                      <Search className="w-4 h-4" />
                      <span>Просмотреть данные</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl shadow-card p-6 border border-border hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <Info className="w-8 h-8 text-warning" />
                  <h3 className="text-lg font-semibold text-foreground">Методика 24.10-966 ГА</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">2-я редакция</p>
                  <p className="text-sm text-muted-foreground">Утверждена: 23.11.2005</p>
                  <p className="text-sm text-muted-foreground">Орган: Управление авиационной промышленности Роспрома</p>
                  <div className="pt-2">
                    <button className="flex items-center space-x-2 text-warning hover:opacity-80 text-sm font-medium transition-opacity duration-200">
                      <Download className="w-4 h-4" />
                      <span>Скачать методику</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-accent/50 to-accent/30 rounded-xl p-6 border border-accent">
              <h3 className="text-lg font-semibold text-accent-foreground mb-4">О системе мониторинга</h3>
              <div className="prose max-w-none">
                <p className="text-accent-foreground/80">
                  Информационно-аналитическая система мониторинга летной годности ВС (ИАС МЛГ ВС) предназначена для отслеживания и контроля жизненного цикла компонентов воздушных судов. Система позволяет выявлять неаутентичные компоненты, проводить оценку аутентичности и обеспечивать соответствие требованиям ИКАО DOC 9760 и российских нормативных документов.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-foreground text-background py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-background/80">
              © 2024 ФГУП ГосНИИ ГА. Система оценки аутентичности компонентов воздушных судов.
            </p>
            <p className="text-background/60 text-sm mt-2">
              Методика оценки аутентичности компонентов ВС № 24.10-966 ГА (2-я редакция)
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;