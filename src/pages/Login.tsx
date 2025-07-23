import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: добавить обработку входа
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2 className="login-title">Вход</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Логин"
            value={login}
            onChange={e => setLogin(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <div className="login-form-actions">
            <button type="submit" className="login-button">Войти</button>
            <Link to="/register" className="login-link">зарегистрируйтесь</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 