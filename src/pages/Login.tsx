import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: добавить обработку входа
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Вход в аккаунт</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Логин</label>
          <input type="text" value={login} onChange={e => setLogin(e.target.value)} required />
        </div>
        <div>
          <label>Пароль</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Войти</button>
      </form>
      <p>
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </p>
    </div>
  );
};

export default Login; 