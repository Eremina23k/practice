import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  // TODO: добавить логику отображения ссылок в зависимости от роли пользователя
  return (
    <header style={{ background: '#f5f5f5', padding: '1rem 2rem', marginBottom: '2rem' }}>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/">Главная</Link>
        <Link to="/participants">Участники</Link>
        <Link to="/teams">Команды</Link>
        <Link to="/competitions">Соревнования</Link>
        <Link to="/winners">Победители</Link>
        {/* <Link to="/admin">Проведение</Link> // для админа */}
        <Link to="/login">Вход</Link>
        <Link to="/register">Регистрация</Link>
      </nav>
    </header>
  );
};

export default Header; 