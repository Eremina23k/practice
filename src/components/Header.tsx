import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

type Role = 'guest' | 'user' | 'admin';

interface HeaderProps {
  role?: Role;
}

const Header: React.FC<HeaderProps> = ({ role = 'guest' }) => {
  return (
    <header className="header">
      <div className="logo">ТурТрек</div>
      <nav className="nav">
        {role === 'admin' && <Link to="/admin">Проведение</Link>}
        <Link to="/participants">Участники</Link>
        <Link to="/competitions">Даты соревнований</Link>
        <Link to="/winners">Победители</Link>
      </nav>
      <div className="actions">
        {role === 'guest' && <><Link to="/login" className="btn btn-primary">Вход</Link><Link to="/register" className="btn">Регистрация</Link></>}
        {role === 'user' && <><Link to="/profile" className="btn">Профиль</Link><Link to="/logout" className="btn">Выход</Link></>}
        {role === 'admin' && <><Link to="/profile" className="btn">Профиль</Link><Link to="/logout" className="btn">Выход</Link></>}
      </div>
    </header>
  );
};

export default Header; 