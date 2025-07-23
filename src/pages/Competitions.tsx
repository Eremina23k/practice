import React, { useEffect, useState } from 'react';
import { getCompetitions } from '../api/competitionApi';
import './Competitions.css';

const Competitions: React.FC = () => {
  const [competitions, setCompetitions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCompetitions()
      .then(data => {
        setCompetitions(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Ошибка загрузки данных');
        setLoading(false);
      });
  }, []);

  return (
    <div className="competitions-page">
      <h2 className="competitions-title">Список дат соревнований</h2>
      <div className="competitions-table-container">
        {loading && <div>Загрузка...</div>}
        {error && <div>{error}</div>}
        {!loading && !error && (
          <table className="competitions-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Дата</th>
              </tr>
            </thead>
            <tbody>
              {competitions.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.date || '-'}</td>
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