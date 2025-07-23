import React, { useEffect, useState } from 'react';
import { getParticipants } from '../api/participantApi';
import ParticipantTable from '../components/ParticipantTable';

type Participant = {
  id: number;
  name?: string;
  [key: string]: any;
};

const Participants: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getParticipants()
      .then((data) => {
        setParticipants(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Ошибка загрузки данных');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Список участников</h2>
      <ParticipantTable participants={participants} />
    </div>
  );
};

export default Participants; 