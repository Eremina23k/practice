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

  const loadTeams = () => {
    setLoading(true);
    getTeams()
      .then(data => {
        setTeams(Array.isArray(data) ? data : []);
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

  return (
    <div className="teams-page">
      <h2 className="teams-title">Список команд</h2>
      <div className="teams-table-container">
        <button onClick={handleAdd} style={{ marginBottom: 16 }}>Добавить команду</button>
        {showForm && (
          <TeamForm initialData={editTeam} onSuccess={handleFormSuccess} />
        )}
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
              {teams.map((t) => (
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