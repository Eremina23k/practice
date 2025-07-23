import React from 'react';

type Competition = {
  id: number;
  date?: string;
  [key: string]: any;
};

const CompetitionTable: React.FC<{ competitions: Competition[] }> = ({ competitions }) => {
  if (!competitions || competitions.length === 0) {
    return <div>Нет данных о соревнованиях</div>;
  }
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Дата</th>
        </tr>
      </thead>
      <tbody>
        {competitions.map((comp) => (
          <tr key={comp.id}>
            <td>{comp.id}</td>
            <td>{comp.date || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CompetitionTable; 