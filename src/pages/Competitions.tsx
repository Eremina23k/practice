import React, { useEffect, useState } from 'react';
import { getCompetitions, deleteCompetition } from '../api/competitionApi';
import CompetitionForm from '../components/CompetitionForm';
import './Competitions.css';

const Competitions: React.FC = () => {
  const [competitions, setCompetitions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editCompetition, setEditCompetition] = useState<any | null>(null);
  const [search, setSearch] = useState('');

  const loadCompetitions = () => {
    setLoading(true);
    getCompetitions()
      .then(data => {
        setCompetitions(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Ошибка загрузки данных');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCompetitions();
  }, []);

  const handleAdd = () => {
    setEditCompetition(null);
    setShowForm(true);
  };

  const handleEdit = (competition: any) => {
    setEditCompetition(competition);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Удалить соревнование?')) {
      await deleteCompetition(id);
      loadCompetitions();
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditCompetition(null);
    loadCompetitions();
  };

  // Фильтрация по поиску
  const filtered = competitions.filter(c =>
    !search || (c.date && c.date.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="competitions-page">
      <h2 className="competitions-title">Список дат соревнований</h2>
      <div className="competitions-table-container">
        <button onClick={handleAdd} style={{ marginBottom: 16 }}>Добавить соревнование</button>
        {showForm && (
          <CompetitionForm initialData={editCompetition} onSuccess={handleFormSuccess} />
        )}
        <div className="participants-filters">
          <label>Поиск:</label>
          <div className="participants-search">
            <input type="text" placeholder="Поиск по дате..." value={search} onChange={e => setSearch(e.target.value)} />
            <button disabled>🔍</button>
          </div>
        </div>
        {loading && <div>Загрузка...</div>}
        {error && <div>{error}</div>}
        {!loading && !error && (
          <table className="competitions-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Дата</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.date || '-'}</td>
                  <td>
                    <button onClick={() => handleEdit(c)}>Редактировать</button>
                    <button onClick={() => handleDelete(c.id)} style={{ marginLeft: 8 }}>Удалить</button>
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

export default Competitions; 