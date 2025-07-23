import React, { useEffect, useState } from 'react';
import { getParticipants } from '../api/participantApi';
import './Participants.css';

const Participants: React.FC = () => {
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getParticipants()
      .then(data => {
        setParticipants(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Ошибка загрузки данных');
        setLoading(false);
      });
  }, []);

  return (
    <div className="participants-page">
      <h2 className="participants-title">Список участников</h2>
      <div className="participants-table-container">
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