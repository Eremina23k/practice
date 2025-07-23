import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

type Role = 'guest' | 'user' | 'admin';

const getRole = (): Role => {
  return (localStorage.getItem('role') as Role) || 'guest';
};

const Header: React.FC = () => {
  const [role, setRole] = useState<Role>(getRole());
  const navigate = useNavigate();

  useEffect(() => {
    const onStorage = () => setRole(getRole());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    setRole(getRole());
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.setItem('role', 'guest');
    setRole('guest');
    navigate('/login');
  };

  return (
    <header className="header">
      <Link to="/" className="logo-minimal" aria-label="Главная" />
      <nav className="nav">
        {role === 'admin' && <Link to="/admin">Проведение</Link>}
        <Link to="/participants">Участники</Link>
        <Link to="/competitions">Даты соревнований</Link>
        <Link to="/winners">Победители</Link>
      </nav>
      <div className="actions">
        {role === 'guest' && <><Link to="/login" className="btn btn-primary">Вход</Link><Link to="/register" className="btn">Регистрация</Link></>}
        {role === 'user' && <><Link to="/profile" className="btn">Профиль</Link><button className="btn" onClick={handleLogout}>Выход</button></>}
        {role === 'admin' && <><Link to="/profile" className="btn">Профиль</Link><button className="btn" onClick={handleLogout}>Выход</button></>}
      </div>
    </header>
  );
};

export default Header; 