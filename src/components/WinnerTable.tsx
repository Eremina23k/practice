import React from 'react';

type Winner = {
  id: number;
  name?: string;
  team?: string;
  gender?: 'male' | 'female';
  time?: number; // время в секундах или строкой, если строка — привести к числу
  type?: 'participant' | 'team';
  totalTime?: number; // для команд
  position?: number;
  [key: string]: any;
};

interface WinnerTableProps {
  winners: Winner[];
  teamWinners: Winner[]; // отдельный список для команд
}

const getTop3 = (arr: Winner[], timeField: 'time' | 'totalTime') =>
  [...arr]
    .filter(w => w[timeField] !== undefined && w[timeField] !== null)
    .sort((a, b) => Number(a[timeField]) - Number(b[timeField]))
    .slice(0, 3);

const WinnerTable: React.FC<WinnerTableProps> = ({ winners, teamWinners }) => {
  const women = getTop3(winners.filter(w => w.gender === 'female'), 'time');
  const men = getTop3(winners.filter(w => w.gender === 'male'), 'time');
  const teams = getTop3(teamWinners, 'totalTime');

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <div>
        <h3>Команды</h3>
        <Table
          data={teams}
          columns={[
            { key: 'id', label: 'Номер' },
            { key: 'name', label: 'Название команды' },
            { key: 'totalTime', label: 'Общее время' },
            { key: 'position', label: 'Место' },
          ]}
        />
      </div>
      <div>
        <h3>Женщины</h3>
        <Table
          data={women}
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Имя' },
            { key: 'team', label: 'Команда' },
            { key: 'time', label: 'Время' },
          ]}
        />
      </div>
      <div>
        <h3>Мужчины</h3>
        <Table
          data={men}
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Имя' },
            { key: 'team', label: 'Команда' },
            { key: 'time', label: 'Время' },
          ]}
        />
      </div>
    </div>
  );
};

// Универсальный компонент таблицы
const Table: React.FC<{ data: Winner[]; columns: { key: string; label: string }[] }> = ({ data, columns }) => {
  if (!data || data.length === 0) return <div>Нет данных</div>;
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((w, idx) => (
          <tr key={w.id || idx}>
            {columns.map(col => (
              <td key={col.key}>{w[col.key] ?? '-'}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WinnerTable; 