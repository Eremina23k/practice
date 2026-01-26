import React from 'react';

type Team = {
  id: number;
  name?: string;
  [key: string]: any;
};

const TeamTable: React.FC<{ teams: Team[] }> = ({ teams }) => {
  if (!teams || teams.length === 0) {
    return <div>Нет данных о командах</div>;
  }
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((t) => (
          <tr key={t.id}>
            <td>{t.id}</td>
            <td>{t.name || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TeamTable; 