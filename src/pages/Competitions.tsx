import React, { useEffect, useState } from 'react';
import { getCompetitions } from '../api/competitionApi';
import CompetitionTable from '../components/CompetitionTable';

type Competition = {
  id: number;
  date?: string;
  [key: string]: any;
};

const Competitions: React.FC = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCompetitions()
      .then((data) => {
        setCompetitions(Array.isArray(data) ? data : []);
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
      <h2>Список дат соревнований</h2>
      <CompetitionTable competitions={competitions} />
    </div>
  );
};

export default Competitions; 