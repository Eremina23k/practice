import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
// Импортируйте loginUser из api (создайте, если нет)
import { loginUser } from '../api/authApi.tsx';

const Login: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(login, password);
      // Ожидается, что backend вернёт токен и роль
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Ошибка авторизации');
    } finally {
      setLoading(false);
    }
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
            <button type="submit" className="login-button" disabled={loading}>{loading ? 'Вход...' : 'Войти'}</button>
            <Link to="/register" className="login-link">зарегистрируйтесь</Link>
          </div>
          {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login; 