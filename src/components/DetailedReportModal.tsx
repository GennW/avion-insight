import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, FileText, Clock, Shield, X } from 'lucide-react';

interface DetailedReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  issue: {
    issue: string;
    count: number;
    severity: 'high' | 'medium';
    description: string;
  } | null;
}

const DetailedReportModal: React.FC<DetailedReportModalProps> = ({ isOpen, onClose, issue }) => {
  if (!issue) return null;

  // Генерируем детальные данные на основе типа проблемы
  const getDetailedData = () => {
    switch (issue.issue) {
      case 'Компоненты с дубликатами паспортов':
        return [
          {
            id: 'C001',
            aircraft: 'Ми-8АМT № 22977',
            component: 'Двигатель ТВ3-117ВМ',
            serialNumber: 'ДВ-12345',
            duplicateSerial: 'ДВ-12345',
            operator: 'Ютэйр-Инжиниринг',
            lastCheck: '2009-09-02',
            status: 'Требует проверки',
            risk: 'Высокий'
          },
          {
            id: 'C002',
            aircraft: 'Ми-8МТ № 22978',
            component: 'Редуктор главный ВР-8А',
            serialNumber: 'РД-67890',
            duplicateSerial: 'РД-67890',
            operator: 'Аэрогео',
            lastCheck: '2009-08-15',
            status: 'Требует проверки',
            risk: 'Высокий'
          },
          {
            id: 'C003',
            aircraft: 'Ми-26Т № 22979',
            component: 'Лопасть несущего винта',
            serialNumber: 'ЛН-11111',
            duplicateSerial: 'ЛН-11111',
            operator: 'Геликс',
            lastCheck: '2009-07-10',
            status: 'Требует проверки',
            risk: 'Критический'
          }
        ];
      
      case 'Компоненты, отработавшие ресурсы':
        return [
          {
            id: 'R001',
            aircraft: 'Ми-171 № 22980',
            component: 'Подшипник опорный',
            serialNumber: 'ПО-55555',
            resourceLimit: '2000 часов',
            currentResource: '2150 часов',
            operator: 'Авиация Колымы',
            lastCheck: '2009-08-22',
            status: 'Превышен ресурс',
            risk: 'Критический'
          },
          {
            id: 'R002',
            aircraft: 'Ми-8АМT № 22977',
            component: 'Фильтр масляный',
            serialNumber: 'ФМ-33333',
            resourceLimit: '500 часов',
            currentResource: '520 часов',
            operator: 'Ютэйр-Инжиниринг',
            lastCheck: '2009-09-02',
            status: 'Превышен ресурс',
            risk: 'Высокий'
          }
        ];
      
      default:
        return [];
    }
  };

  const detailedData = getDetailedData();
  const isDuplicatePassports = issue.issue === 'Компоненты с дубликатами паспортов';
  const isExpiredResource = issue.issue === 'Компоненты, отработавшие ресурсы';

  const getIcon = () => {
    if (isDuplicatePassports) return <FileText className="w-5 h-5" />;
    if (isExpiredResource) return <Clock className="w-5 h-5" />;
    return <AlertTriangle className="w-5 h-5" />;
  };

  const getSeverityColor = (risk: string) => {
    switch (risk) {
      case 'Критический':
        return 'bg-destructive/20 text-destructive border-destructive';
      case 'Высокий':
        return 'bg-warning/20 text-warning border-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              issue.severity === 'high' 
                ? 'bg-destructive/20 text-destructive' 
                : 'bg-warning/20 text-warning'
            }`}>
              {getIcon()}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{issue.issue}</h2>
              <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Сводка */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-lg p-4 border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Всего проблем</p>
                  <p className="text-2xl font-bold text-foreground">{issue.count}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-warning opacity-20" />
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-4 border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Критических</p>
                  <p className="text-2xl font-bold text-destructive">
                    {detailedData.filter(item => item.risk === 'Критический').length}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-destructive opacity-20" />
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-4 border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Требует действий</p>
                  <p className="text-2xl font-bold text-warning">{detailedData.length}</p>
                </div>
                <FileText className="w-8 h-8 text-warning opacity-20" />
              </div>
            </div>
          </div>

          {/* Детальная таблица */}
          <div className="bg-card rounded-lg border">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Детальная информация</h3>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Воздушное судно</TableHead>
                    <TableHead>Компонент</TableHead>
                    <TableHead>Серийный номер</TableHead>
                    {isDuplicatePassports && <TableHead>Дубликат</TableHead>}
                    {isExpiredResource && <TableHead>Лимит ресурса</TableHead>}
                    {isExpiredResource && <TableHead>Текущий ресурс</TableHead>}
                    <TableHead>Оператор</TableHead>
                    <TableHead>Последняя проверка</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Риск</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detailedData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-sm">{item.id}</TableCell>
                      <TableCell className="font-medium">{item.aircraft}</TableCell>
                      <TableCell>{item.component}</TableCell>
                      <TableCell className="font-mono text-sm">{item.serialNumber}</TableCell>
                      {isDuplicatePassports && (
                        <TableCell className="font-mono text-sm text-destructive">
                          {(item as any).duplicateSerial}
                        </TableCell>
                      )}
                      {isExpiredResource && (
                        <TableCell className="text-sm">
                          {(item as any).resourceLimit}
                        </TableCell>
                      )}
                      {isExpiredResource && (
                        <TableCell className="text-sm font-medium text-destructive">
                          {(item as any).currentResource}
                        </TableCell>
                      )}
                      <TableCell>{item.operator}</TableCell>
                      <TableCell className="text-sm">{item.lastCheck}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-xs ${getSeverityColor(item.risk)}`}>
                          {item.risk}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Рекомендации */}
          <div className="bg-accent/50 rounded-lg p-4 border border-accent">
            <h3 className="text-lg font-semibold text-accent-foreground mb-3">
              Рекомендуемые действия
            </h3>
            <div className="space-y-2 text-sm text-accent-foreground/80">
              {isDuplicatePassports && (
                <>
                  <p>• Провести дополнительную проверку подлинности паспортов компонентов</p>
                  <p>• Связаться с поставщиками для уточнения происхождения компонентов</p>
                  <p>• Временно исключить сомнительные компоненты из эксплуатации</p>
                  <p>• Уведомить соответствующие надзорные органы</p>
                </>
              )}
              {isExpiredResource && (
                <>
                  <p>• Немедленно вывести компоненты из эксплуатации</p>
                  <p>• Провести внеплановое техническое обслуживание</p>
                  <p>• Заменить компоненты на новые или отремонтированные</p>
                  <p>• Пересмотреть график технического обслуживания</p>
                </>
              )}
              {!isDuplicatePassports && !isExpiredResource && (
                <>
                  <p>• Провести детальную проверку выявленных проблем</p>
                  <p>• Принять корректирующие меры в соответствии с регламентом</p>
                  <p>• Документировать все выполненные действия</p>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailedReportModal;