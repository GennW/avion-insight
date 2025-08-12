-- Создание таблиц для системы мониторинга аутентичности компонентов ВС

-- Таблица воздушных судов
CREATE TABLE IF NOT EXISTS aircraft (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  operator VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  components INTEGER DEFAULT 0,
  last_check DATE,
  authenticity DECIMAL(5,2) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица операторов по регионам
CREATE TABLE IF NOT EXISTS operators (
  id SERIAL PRIMARY KEY,
  region VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  count INTEGER DEFAULT 0,
  compliant INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица компонентов
CREATE TABLE IF NOT EXISTS components (
  id SERIAL PRIMARY KEY,
  aircraft_id INTEGER REFERENCES aircraft(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  status VARCHAR(20) DEFAULT 'authentic' CHECK (status IN ('authentic', 'questionable', 'non_authentic')),
  last_check DATE,
  serial_number VARCHAR(100),
  passport_duplicate BOOLEAN DEFAULT FALSE,
  resource_expired BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица результатов мониторинга
CREATE TABLE IF NOT EXISTS monitoring_results (
  id SERIAL PRIMARY KEY,
  criterion VARCHAR(255) NOT NULL,
  value INTEGER DEFAULT 0,
  color VARCHAR(7) DEFAULT '#6B7280',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Вставка тестовых данных для операторов
INSERT INTO operators (region, name, count, compliant) VALUES
('Архангельское', 'МТУ Архангельское', 3, 0),
('Восточно-Сибирское', 'МТУ Восточно-Сибирское', 8, 2),
('Дальневосточное', 'МТУ Дальневосточное', 8, 3),
('Западно-Сибирское', 'МТУ Западно-Сибирское', 8, 1),
('Камчатское', 'МТУ Камчатское', 1, 1),
('Коми', 'МТУ Коми', 1, 0),
('Красноярское', 'МТУ Красноярское', 10, 6),
('Приволжское', 'МТУ Приволжское', 5, 1),
('Росавиация', 'Росавиация', 10, 1),
('Саха (Якутие)', 'МТУ Саха (Якутия)', 4, 4),
('Северо-Восточное', 'МТУ Северо-Восточное', 4, 4),
('Северо-Западное', 'МТУ Северо-Западное', 8, 2),
('Тюменское', 'МТУ Тюменское', 9, 3),
('Уральское', 'МТУ Уральское', 2, 1),
('Центральное', 'МТУ Центральное', 15, 3),
('Южное', 'МТУ Южное', 8, 1)
ON CONFLICT DO NOTHING;

-- Вставка тестовых данных для воздушных судов
INSERT INTO aircraft (id, type, operator, status, components, last_check, authenticity) VALUES
(22977, 'Ми-8АМT', 'Ютэйр-Инжиниринг', 'active', 53, '2009-09-02', 96.2),
(22978, 'Ми-8МТ', 'Аэрогео', 'active', 48, '2009-08-15', 98.5),
(22979, 'Ми-26Т', 'Геликс', 'active', 32, '2009-07-10', 94.8),
(22980, 'Ми-171', 'Авиация Колымы', 'active', 41, '2009-08-22', 97.3)
ON CONFLICT DO NOTHING;

-- Вставка данных мониторинга
INSERT INTO monitoring_results (criterion, value, color, description) VALUES
('Соответствие номенклатуре', 53, '#10B981', 'Компоненты, соответствующие утвержденной номенклатуре'),
('Агрегаты с неутвержденными документами', 0, '#EF4444', 'Агрегаты без требуемых разрешительных документов'),
('Компоненты с дубликатами паспортов', 17, '#F59E0B', 'Выявлены дублированные паспорта компонентов'),
('Компоненты, отработавшие ресурсы', 2, '#EF4444', 'Компоненты, превысившие установленный ресурс'),
('Неутвержденные экспертами', 0, '#EF4444', 'Компоненты, не прошедшие экспертную оценку')
ON CONFLICT DO NOTHING;

-- Создание функции для обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Создание триггеров для автоматического обновления updated_at
CREATE TRIGGER update_aircraft_updated_at BEFORE UPDATE ON aircraft
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_operators_updated_at BEFORE UPDATE ON operators
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_components_updated_at BEFORE UPDATE ON components
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_monitoring_results_updated_at BEFORE UPDATE ON monitoring_results
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Включение Row Level Security (RLS)
ALTER TABLE aircraft ENABLE ROW LEVEL SECURITY;
ALTER TABLE operators ENABLE ROW LEVEL SECURITY;
ALTER TABLE components ENABLE ROW LEVEL SECURITY;
ALTER TABLE monitoring_results ENABLE ROW LEVEL SECURITY;

-- Создание политик доступа (базовые политики для чтения)
CREATE POLICY "Allow read access for all users" ON aircraft FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON operators FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON components FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON monitoring_results FOR SELECT USING (true);