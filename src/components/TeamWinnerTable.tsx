import React from 'react';

type TeamWinner = {
  id: number;
  name?: string;
  totalTime?: string;
  position?: number;
  [key: string]: any;
};

const TeamWinnerTable: React.FC<{ winners: TeamWinner[] }> = ({ winners }) => {
  if (!winners || winners.length === 0) {
    return <div>Нет данных о командах-победителях</div>;
  }
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Команда</th>
          <th>Общее время</th>
          <th>Место</th>
        </tr>
      </thead>
      <tbody>
        {winners.map((w) => (
          <tr key={w.id}>
            <td>{w.id}</td>
            <td>{w.name || '-'}</td>
            <td>{w.totalTime || '-'}</td>
            <td>{w.position || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TeamWinnerTable; 