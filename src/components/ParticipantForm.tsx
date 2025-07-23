import React, { useState } from 'react';
import { createParticipant, updateParticipant } from '../api/participantApi';

type Participant = {
  id?: number;
  name: string;
  // добавьте другие поля по необходимости
};

type Props = {
  initialData?: Participant;
  onSuccess?: () => void;
};

const ParticipantForm: React.FC<Props> = ({ initialData, onSuccess }) => {
  const [name, setName] = useState(initialData?.name || '');
  // добавьте другие useState для остальных полей

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { name }; // добавьте остальные поля
    try {
      if (initialData?.id) {
        await updateParticipant(initialData.id, data);
      } else {
        await createParticipant(data);
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      alert('Ошибка при сохранении');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Имя</label>
        <input value={name} onChange={e => setName(e.target.value)} required />
      </div>
      {/* другие поля */}
      <button type="submit">{initialData ? 'Сохранить' : 'Добавить'}</button>
    </form>
  );
};

export default ParticipantForm;