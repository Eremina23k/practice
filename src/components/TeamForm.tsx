import React, { useState } from 'react';
import { createTeam, updateTeam } from '../api/teamApi';

interface Team {
  id?: number;
  name?: string;
  competitions_id?: number;
  [key: string]: any;
}

interface Props {
  initialData?: Team;
  onSuccess?: () => void;
}

const TeamForm: React.FC<Props> = ({ initialData, onSuccess }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [competitionsId, setCompetitionsId] = useState(initialData?.competitions_id || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = { name, competitions_id: competitionsId };
      if (initialData?.id) {
        await updateTeam(initialData.id, data);
      } else {
        await createTeam(data);
      }
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Ошибка сохранения');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input type="text" placeholder="Название команды" value={name} onChange={e => setName(e.target.value)} required />
      <input type="number" placeholder="ID соревнования" value={competitionsId} onChange={e => setCompetitionsId(e.target.value)} required />
      <button type="submit" disabled={loading}>{loading ? 'Сохранение...' : (initialData ? 'Сохранить' : 'Добавить')}</button>
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
    </form>
  );
};

export default TeamForm; 