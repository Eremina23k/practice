import React from 'react';
import './AdminPanel.css';

const AdminPanel: React.FC = () => {
  return (
    <div className="admin-panel-page">
      <div className="admin-panel-container">
        <h2 className="admin-panel-title">Проведение соревнования</h2>
        <div className="admin-panel-controls">
          <button className="admin-panel-btn">Добавить</button>
          <button className="admin-panel-btn">Редактировать</button>
          <button className="admin-panel-btn">Провести</button>
        </div>
        <div className="admin-panel-section admin-panel-section-active">
          <div className="admin-panel-input-row">
            <label>Дата соревнований:</label>
            <input type="text" placeholder="дд.мм.гггг" />
          </div>
          <div className="admin-panel-input-row">
            <label>Загрузить файл в формате</label><br />
            <table className="admin-panel-table"><thead><tr><th>ФИО</th><th>Пол</th><th>Команда</th></tr></thead></table>
          </div>
          <div className="admin-panel-input-row">
            <input type="text" placeholder="Путь к файлу" />
            <button className="admin-panel-btn">Загрузить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 