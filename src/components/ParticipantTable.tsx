import React, { useEffect, useState } from 'react';

type Participant = {
  id: number;
  name: string;
  // Добавьте другие поля по вашей структуре таблицы participants
};

const ParticipantTable: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // @ts-ignore
    window.api.getParticipants().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setParticipants(data);
      }
    });
  }, []);

  if (error) return <div>Ошибка: {error}</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          {/* Добавьте другие заголовки */}
        </tr>
      </thead>
      <tbody>
        {participants.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.name}</td>
            {/* Добавьте другие ячейки */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ParticipantTable; 