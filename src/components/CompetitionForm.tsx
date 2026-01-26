import React, { useState } from 'react';
import { createCompetition, updateCompetition } from '../api/competitionApi';

interface Competition {
  id?: number;
  date?: string;
  [key: string]: any;
}

interface Props {
  initialData?: Competition;
  onSuccess?: () => void;
}

const CompetitionForm: React.FC<Props> = ({ initialData, onSuccess }) => {
  const [date, setDate] = useState(initialData?.date || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = { date };
      if (initialData?.id) {
        await updateCompetition(initialData.id, data);
      } else {
        await createCompetition(data);
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
      <input type="date" placeholder="Дата" value={date} onChange={e => setDate(e.target.value)} required />
      <button type="submit" disabled={loading}>{loading ? 'Сохранение...' : (initialData ? 'Сохранить' : 'Добавить')}</button>
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
    </form>
  );
};

export default CompetitionForm; 