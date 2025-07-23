import React, { useEffect, useState } from 'react';
import { getTeams } from '../api/teamApi';
import TeamTable from '../components/TeamTable';

type Team = {
  id: number;
  name?: string;
  [key: string]: any;
};

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTeams()
      .then((data) => {
        setTeams(Array.isArray(data) ? data : []);
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
      <h2>Список команд</h2>
      <TeamTable teams={teams} />
    </div>
  );
};

export default Teams; 