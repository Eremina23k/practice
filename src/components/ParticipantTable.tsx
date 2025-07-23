import React from 'react';

type Participant = {
  id: number;
  name?: string;
  [key: string]: any;
};

const ParticipantTable: React.FC<{ participants: Participant[] }> = ({ participants }) => {
  if (!participants || participants.length === 0) {
    return <div>Нет данных об участниках</div>;
  }
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
        </tr>
      </thead>
      <tbody>
        {participants.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.name || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ParticipantTable; 