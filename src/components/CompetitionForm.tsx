import React, { useState } from 'react';
import { createCompetition, updateCompetition } from '../api/competitionApi';

type Competition = {
  id?: number;
  date: string;
};

type Props = {
  initialData?: Competition;
  onSuccess?: () => void;
};

const CompetitionForm: React.FC<Props> = ({ initialData, onSuccess }) => {
  const [date, setDate] = useState(initialData?.date || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { date };
    try {
      if (initialData?.id) {
        await updateCompetition(initialData.id, data);
      } else {
        await createCompetition(data);
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      alert('Ошибка при сохранении');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Дата</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      </div>
      <button type="submit">{initialData ? 'Сохранить' : 'Добавить'}</button>
    </form>
  );
};

export default CompetitionForm; 