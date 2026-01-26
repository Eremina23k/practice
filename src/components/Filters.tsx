import React from 'react';

interface FiltersProps {
  date?: string;
  gender?: string;
  team?: string;
  onDateChange?: (date: string) => void;
  onGenderChange?: (gender: string) => void;
  onTeamChange?: (team: string) => void;
  teamOptions?: string[];
}

const DateFilter: React.FC<{ value: string; onChange?: (date: string) => void }> = ({ value, onChange }) => (
  <div>
    <label>Дата: </label>
    <input type="date" value={value} onChange={e => onChange?.(e.target.value)} />
  </div>
);

const GenderFilter: React.FC<{ value: string; onChange?: (gender: string) => void }> = ({ value, onChange }) => (
  <div>
    <label>Пол: </label>
    <select value={value} onChange={e => onChange?.(e.target.value)}>
      <option value="">Все</option>
      <option value="male">Мужской</option>
      <option value="female">Женский</option>
    </select>
  </div>
);

const TeamFilter: React.FC<{ value: string; onChange?: (team: string) => void; options: string[] }> = ({ value, onChange, options }) => (
  <div>
    <label>Команда: </label>
    <select value={value} onChange={e => onChange?.(e.target.value)}>
      <option value="">Все</option>
      {options.map((t) => (
        <option key={t} value={t}>{t}</option>
      ))}
    </select>
  </div>
);

const Filters: React.FC<FiltersProps> = ({
  date = '',
  gender = '',
  team = '',
  onDateChange,
  onGenderChange,
  onTeamChange,
  teamOptions = [],
}) => (
  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
    <DateFilter value={date} onChange={onDateChange} />
    <GenderFilter value={gender} onChange={onGenderChange} />
    <TeamFilter value={team} onChange={onTeamChange} options={teamOptions} />
  </div>
);

export default Filters; 