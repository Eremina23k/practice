import React, { useState } from 'react';
import { createParticipant, updateParticipant } from '../api/participantApi';

interface Participant {
  id?: number;
  surname?: string;
  name?: string;
  gender?: string;
  team?: string;
  date?: string;
  [key: string]: any;
}

interface Props {
  initialData?: Participant;
  onSuccess?: () => void;
}

const ParticipantForm: React.FC<Props> = ({ initialData, onSuccess }) => {
  const [surname, setSurname] = useState(initialData?.surname || '');
  const [name, setName] = useState(initialData?.name || '');
  const [gender, setGender] = useState(initialData?.gender || '');
  const [team, setTeam] = useState(initialData?.team || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = { surname, name, gender, team, date };
      if (initialData?.id) {
        await updateParticipant(initialData.id, data);
      } else {
        await createParticipant(data);
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
      <input type="text" placeholder="Фамилия" value={surname} onChange={e => setSurname(e.target.value)} required />
      <input type="text" placeholder="Имя" value={name} onChange={e => setName(e.target.value)} required />
      <select value={gender} onChange={e => setGender(e.target.value)} required>
        <option value="">Пол</option>
        <option value="male">Мужской</option>
        <option value="female">Женский</option>
      </select>
      <input type="text" placeholder="Команда" value={team} onChange={e => setTeam(e.target.value)} required />
      <input type="date" placeholder="Дата" value={date} onChange={e => setDate(e.target.value)} required />
      <button type="submit" disabled={loading}>{loading ? 'Сохранение...' : (initialData ? 'Сохранить' : 'Добавить')}</button>
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
    </form>
  );
};

export default ParticipantForm;