import React, { useEffect, useState } from 'react';
import { getTeams, deleteTeam } from '../api/teamApi';
import TeamForm from '../components/TeamForm';
import './Teams.css';

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editTeam, setEditTeam] = useState<any | null>(null);

  // Фильтр и поиск
  const [filterDate, setFilterDate] = useState('');
  const [search, setSearch] = useState('');
  const [dates, setDates] = useState<string[]>([]);

  const loadTeams = () => {
    setLoading(true);
    getTeams()
      .then(data => {
        const arr = Array.isArray(data) ? data : [];
        setTeams(arr);
        setDates([...new Set(arr.map((t: any) => t.competitions_id).filter(Boolean))]);
        setLoading(false);
      })
      .catch(() => {
        setError('Ошибка загрузки данных');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const handleAdd = () => {
    setEditTeam(null);
    setShowForm(true);
  };

  const handleEdit = (team: any) => {
    setEditTeam(team);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Удалить команду?')) {
      await deleteTeam(id);
      loadTeams();
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditTeam(null);
    loadTeams();
  };

  // Фильтрация и поиск
  const filtered = teams.filter(t => {
    return (
      (!filterDate || String(t.competitions_id) === filterDate) &&
      (!search || (t.name && t.name.toLowerCase().includes(search.toLowerCase())))
    );
  });

  return (
    <div className="teams-page">
      <h2 className="teams-title">Список команд</h2>
      <div className="teams-table-container">
        <button onClick={handleAdd} style={{ marginBottom: 16 }}>Добавить команду</button>
        {showForm && (
          <TeamForm initialData={editTeam} onSuccess={handleFormSuccess} />
        )}
        <div className="participants-filters">
          <label>Фильтр:</label>
          <select value={filterDate} onChange={e => setFilterDate(e.target.value)}>
            <option value="">Дата соревнования (ID)</option>
            {dates.map(date => <option key={date} value={date}>{date}</option>)}
          </select>
          <div className="participants-search">
            <input type="text" placeholder="Поиск по названию..." value={search} onChange={e => setSearch(e.target.value)} />
            <button disabled>🔍</button>
          </div>
        </div>
        {loading && <div>Загрузка...</div>}
        {error && <div>{error}</div>}
        {!loading && !error && (
          <table className="teams-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Соревнование (ID)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.name || '-'}</td>
                  <td>{t.competitions_id || '-'}</td>
                  <td>
                    <button onClick={() => handleEdit(t)}>Редактировать</button>
                    <button onClick={() => handleDelete(t.id)} style={{ marginLeft: 8 }}>Удалить</button>
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

export default Teams; 