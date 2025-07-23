import React, { useEffect, useState } from 'react';
import { getParticipants, deleteParticipant } from '../api/participantApi';
import ParticipantForm from '../components/ParticipantForm';
import './Participants.css';

const Participants: React.FC = () => {
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editParticipant, setEditParticipant] = useState<any | null>(null);

  const loadParticipants = () => {
    setLoading(true);
    getParticipants()
      .then(data => {
        setParticipants(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Ошибка загрузки данных');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadParticipants();
  }, []);

  const handleAdd = () => {
    setEditParticipant(null);
    setShowForm(true);
  };

  const handleEdit = (participant: any) => {
    setEditParticipant(participant);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Удалить участника?')) {
      await deleteParticipant(id);
      loadParticipants();
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditParticipant(null);
    loadParticipants();
  };

  return (
    <div className="participants-page">
      <h2 className="participants-title">Список участников</h2>
      <div className="participants-table-container">
        <button onClick={handleAdd} style={{ marginBottom: 16 }}>Добавить участника</button>
        {showForm && (
          <ParticipantForm initialData={editParticipant} onSuccess={handleFormSuccess} />
        )}
        <div className="participants-filters">
          <label>Фильтры:</label>
          <select><option>Дата соревнований</option></select>
          <select><option>Пол</option></select>
          <select><option>Команда</option></select>
          <div className="participants-search">
            <input type="text" placeholder="Поиск..." />
            <button>🔍</button>
          </div>
        </div>
        {loading && <div>Загрузка...</div>}
        {error && <div>{error}</div>}
        {!loading && !error && (
          <table className="participants-table">
            <thead>
              <tr>
                <th>Фамилия</th>
                <th>Имя</th>
                <th>Пол</th>
                <th>Команда</th>
                <th>Дата</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => (
                <tr key={p.id}>
                  <td>{p.surname || '-'}</td>
                  <td>{p.name || '-'}</td>
                  <td>{p.gender || '-'}</td>
                  <td>{p.team || '-'}</td>
                  <td>{p.date || '-'}</td>
                  <td>
                    <button onClick={() => handleEdit(p)}>Редактировать</button>
                    <button onClick={() => handleDelete(p.id)} style={{ marginLeft: 8 }}>Удалить</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Participants; 