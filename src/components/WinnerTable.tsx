import React from 'react';
import axios from 'axios';
const API_URL = 'http://localhost:8000';

export const getParticipants = async () => {
  const response = await axios.get(`${API_URL}/participant/`);
  return response.data;
};

type Winner = {
  id: number;
  name?: string;
  team?: string;
  position?: number;
  totalTime?: string;
  time?: string;
  [key: string]: any;
};

const WinnerTable: React.FC<{ winners: Winner[] }> = ({ winners }) => {
  if (!winners || winners.length === 0) {
    return <div>Нет данных</div>;
  }
  // Определяем колонки динамически по типу данных
  const isTeam = winners[0].team === undefined && (winners[0].name === undefined || winners[0].totalTime !== undefined);
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {isTeam ? (
            <>
              <th>Номер</th>
              <th>Название команды</th>
              <th>Общее время</th>
              <th>Место</th>
            </>
          ) : (
            <>
              <th>ID</th>
              <th>Имя</th>
              <th>Команда</th>
              <th>Место</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {winners.map((w) => (
          <tr key={w.id}>
            {isTeam ? (
              <>
                <td>{w.id}</td>
                <td>{w.name || '-'}</td>
                <td>{w.totalTime || w.time || '-'}</td>
                <td>{w.position || '-'}</td>
              </>
            ) : (
              <>
                <td>{w.id}</td>
                <td>{w.name || '-'}</td>
                <td>{w.team || '-'}</td>
                <td>{w.position || '-'}</td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WinnerTable;
 