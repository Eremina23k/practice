import React, { useState, useEffect } from 'react';
import CompetitionForm from '../components/CompetitionForm';
import TeamForm from '../components/TeamForm';
import ParticipantForm from '../components/ParticipantForm';
import FileUpload from '../components/FileUpload';
import { uploadParticipantsFile } from '../api/participantApi';
import { getCompetitions, drawCompetition } from '../api/competitionApi';
import './AdminPanel.css';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'add' | 'edit' | 'run'>('add');
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [drawMessage, setDrawMessage] = useState<string | null>(null);
  const [drawError, setDrawError] = useState<string | null>(null);
  const [competitions, setCompetitions] = useState<any[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<number | null>(null);

  useEffect(() => {
    getCompetitions().then(data => {
      setCompetitions(Array.isArray(data) ? data : []);
    });
  }, []);

  // Загрузка файла на backend
  const handleFileUpload = async (file: File) => {
    setUploadMessage(null);
    setUploadError(null);
    try {
      await uploadParticipantsFile(file);
      setUploadMessage('Файл успешно загружен!');
    } catch (err: any) {
      setUploadError(err?.response?.data?.detail || 'Ошибка загрузки файла');
    }
  };

  // Вызов жеребьёвки
  const handleDraw = async () => {
    setDrawMessage(null);
    setDrawError(null);
    if (!selectedCompetition) {
      setDrawError('Выберите соревнование');
      return;
    }
    try {
      await drawCompetition(selectedCompetition);
      setDrawMessage('Жеребьёвка успешно проведена!');
    } catch (err: any) {
      setDrawError(err?.response?.data?.detail || 'Ошибка жеребьёвки');
    }
  };

  return (
    <div className="admin-panel-page">
      <div className="admin-panel-container">
        <h2 className="admin-panel-title">Проведение соревнования</h2>
        <div className="admin-panel-controls">
          <button className="admin-panel-btn" onClick={() => setActiveTab('add')}>Добавить</button>
          <button className="admin-panel-btn" onClick={() => setActiveTab('edit')}>Редактировать</button>
          <button className="admin-panel-btn" onClick={() => setActiveTab('run')}>Провести</button>
        </div>
        <div className="admin-panel-section admin-panel-section-active">
          {activeTab === 'add' && (
            <>
              <CompetitionForm onSuccess={() => {}} />
              <TeamForm onSuccess={() => {}} />
              <ParticipantForm onSuccess={() => {}} />
              <div className="admin-panel-input-row">
                <label>Загрузить файл с участниками:</label>
                <FileUpload onFileUpload={handleFileUpload} />
                {uploadMessage && <div style={{ color: 'green', marginTop: 8 }}>{uploadMessage}</div>}
                {uploadError && <div style={{ color: 'red', marginTop: 8 }}>{uploadError}</div>}
              </div>
            </>
          )}
          {activeTab === 'edit' && (
            <>
              <p>Редактирование данных реализовано на соответствующих страницах (Соревнования, Команды, Участники).</p>
            </>
          )}
          {activeTab === 'run' && (
            <>
              <div className="admin-panel-input-row">
                <label>Выберите соревнование для жеребьёвки:</label>
                <select
                  value={selectedCompetition ?? ''}
                  onChange={e => setSelectedCompetition(Number(e.target.value) || null)}
                >
                  <option value="">Выберите...</option>
                  {competitions.map((c: any) => (
                    <option key={c.id} value={c.id}>{c.date}</option>
                  ))}
                </select>
                <button className="admin-panel-btn" onClick={handleDraw}>Провести жеребьёвку</button>
              </div>
              {drawMessage && <div style={{ color: 'green', marginTop: 8 }}>{drawMessage}</div>}
              {drawError && <div style={{ color: 'red', marginTop: 8 }}>{drawError}</div>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 