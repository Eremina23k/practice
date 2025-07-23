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

  // Фильтры и поиск
  const [filterDate, setFilterDate] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterTeam, setFilterTeam] = useState('');
  const [search, setSearch] = useState('');

  // Для выпадающих списков
  const [dates, setDates] = useState<string[]>([]);
  const [teams, setTeams] = useState<string[]>([]);

  const loadParticipants = () => {
    setLoading(true);
    getParticipants()
      .then(data => {
        const arr = Array.isArray(data) ? data : [];
        setParticipants(arr);
        setDates([...new Set(arr.map((p: any) => p.date).filter(Boolean))]);
        setTeams([...new Set(arr.map((p: any) => p.team).filter(Boolean))]);
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

  // Фильтрация и поиск
  const filtered = participants.filter(p => {
    return (
      (!filterDate || p.date === filterDate) &&
      (!filterGender || p.gender === filterGender) &&
      (!filterTeam || p.team === filterTeam) &&
      (!search ||
        (p.surname && p.surname.toLowerCase().includes(search.toLowerCase())) ||
        (p.name && p.name.toLowerCase().includes(search.toLowerCase()))
      )
    );
  });

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
          <select value={filterDate} onChange={e => setFilterDate(e.target.value)}>
            <option value="">Дата соревнований</option>
            {dates.map(date => <option key={date} value={date}>{date}</option>)}
          </select>
          <select value={filterGender} onChange={e => setFilterGender(e.target.value)}>
            <option value="">Пол</option>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </select>
          <select value={filterTeam} onChange={e => setFilterTeam(e.target.value)}>
            <option value="">Команда</option>
            {teams.map(team => <option key={team} value={team}>{team}</option>)}
          </select>
          <div className="participants-search">
            <input type="text" placeholder="Поиск..." value={search} onChange={e => setSearch(e.target.value)} />
            <button disabled>🔍</button>
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
              {filtered.map((p) => (
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