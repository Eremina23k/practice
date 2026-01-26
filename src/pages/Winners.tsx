import React, { useEffect, useState } from 'react';
import { getCompetitions } from '../api/competitionApi';
import { getParticipantResults } from '../api/participantResultApi';
import { getTeamResults } from '../api/teamResultApi';
import WinnerTable from '../components/WinnerTable';
import './Winners.css';

const Winners: React.FC = () => {
  const [dates, setDates] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [participantResults, setParticipantResults] = useState<any[]>([]);
  const [teamResults, setTeamResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getCompetitions(),
      getParticipantResults(),
      getTeamResults()
    ])
      .then(([datesData, partRes, teamRes]) => {
        setDates(Array.isArray(datesData) ? datesData : []);
        setParticipantResults(Array.isArray(partRes) ? partRes : []);
        setTeamResults(Array.isArray(teamRes) ? teamRes : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Ошибка загрузки данных');
        setLoading(false);
      });
  }, []);

  // Фильтрация по дате
  const filteredParticipants = participantResults.filter(r => r.date === selectedDate);
  const filteredTeams = teamResults.filter(r => r.date === selectedDate);

  // Топ-3 мужчины
  const men = filteredParticipants.filter(p => p.gender === 'male')
    .sort((a, b) => Number(a.total_time) - Number(b.total_time)).slice(0, 3);
  // Топ-3 женщины
  const women = filteredParticipants.filter(p => p.gender === 'female')
    .sort((a, b) => Number(a.total_time) - Number(b.total_time)).slice(0, 3);
  // Топ-3 команды
  const teams = filteredTeams
    .sort((a, b) => Number(a.total_time) - Number(b.total_time)).slice(0, 3);

  return (
    <div className="winners-page">
      <div className="winners-container">
        <h1 className="winners-title">Победители соревнований</h1>
        <h3 className="winners-subtitle">Выберите дату, чтобы посмотреть победителей:</h3>
        <div className="winners-dates">
          {dates.map((d: any) => (
            <div
              key={d.id}
              className={`winners-date-item${selectedDate === d.date ? ' active' : ''}`}
              onClick={() => setSelectedDate(d.date)}
            >
              {d.date}
            </div>
          ))}
        </div>
        {loading && <div>Загрузка...</div>}
        {error && <div>{error}</div>}
        {!loading && !error && selectedDate && (
          <div className="winners-tables">
            <div className="winners-section-title">Команды:</div>
            <WinnerTable winners={teams} />
            <div className="winners-section-title">Мужчины:</div>
            <WinnerTable winners={men} />
            <div className="winners-section-title">Женщины:</div>
            <WinnerTable winners={women} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Winners; 