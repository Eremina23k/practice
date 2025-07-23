import React from 'react';
import { Link } from 'react-router-dom';

const getRole = (): 'guest' | 'user' | 'admin' => {
  // В реальном приложении используйте контекст или глобальный стейт
  return (localStorage.getItem('role') as 'guest' | 'user' | 'admin') || 'guest';
};

const Header: React.FC = () => {
  const role = getRole();

  return (
    <header style={{ background: '#f5f5f5', padding: '1rem 2rem', marginBottom: '2rem' }}>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/">Главная</Link>
        <Link to="/participants">Участники</Link>
        <Link to="/teams">Команды</Link>
        <Link to="/competitions">Соревнования</Link>
        <Link to="/winners">Победители</Link>
        {role === 'admin' && <Link to="/admin">Проведение</Link>}
        {role === 'guest' && <><Link to="/login">Вход</Link><Link to="/register">Регистрация</Link></>}
        {(role === 'user' || role === 'admin') && <Link to="/profile">Профиль</Link>}
        {(role === 'user' || role === 'admin') && <Link to="/logout">Выход</Link>}
      </nav>
    </header>
  );
};

export default Header; 