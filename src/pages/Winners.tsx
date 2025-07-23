import React from 'react';
import './Winners.css';

const Winners: React.FC = () => {
  return (
    <div className="winners-page">
      <div className="winners-container">
        <h1 className="winners-title">Победители соревнований</h1>
        <h3 className="winners-subtitle">Выберите дату, чтобы посмотреть победителей:</h3>
        <div className="winners-dates">
          <div className="winners-date-item">01.05.2025</div>
          <div className="winners-date-item">12.06.2025</div>
          <div className="winners-date-item">21.07.2025</div>
          <div className="winners-date-item">01.09.2025</div>
          <div className="winners-date-item">10.10.2025</div>
          <div className="winners-date-item">31.12.2025</div>
        </div>
        <div className="winners-tables">
          <div className="winners-section-title">Команды:</div>
          <table className="winners-table">
            <thead><tr><th>Название</th><th>Место</th></tr></thead>
            <tbody>
              <tr><td>Огонь</td><td>1</td></tr>
              <tr><td>Ветер</td><td>2</td></tr>
            </tbody>
          </table>
          <div className="winners-section-title">Участники:</div>
          <table className="winners-table">
            <thead><tr><th>Имя</th><th>Фамилия</th><th>Место</th></tr></thead>
            <tbody>
              <tr><td>Иван</td><td>Иванов</td><td>1</td></tr>
              <tr><td>Петр</td><td>Петров</td><td>2</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Winners; 