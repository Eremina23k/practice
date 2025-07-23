import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/userApi';
import './Register.css';

const Register: React.FC = () => {
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const role = accessCode === '9999' ? 'admin' : 'user';
    try {
      await registerUser({
        full_name: `${surname} ${name} ${patronymic}`,
        login,
        password,
        role,
        access_code: accessCode,
      });
      navigate('/login');
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        <h2 className="register-title">Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Фамилия" value={surname} onChange={e => setSurname(e.target.value)} required className="register-input" />
          <input type="text" placeholder="Имя" value={name} onChange={e => setName(e.target.value)} required className="register-input" />
          <input type="text" placeholder="Отчество" value={patronymic} onChange={e => setPatronymic(e.target.value)} required className="register-input" />
          <input type="text" placeholder="Логин" value={login} onChange={e => setLogin(e.target.value)} required className="register-input" />
          <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} required className="register-input" />
          <input type="text" placeholder="Код доступа" value={accessCode} onChange={e => setAccessCode(e.target.value)} className="register-input" />
          <button type="submit" className="register-button" disabled={loading}>{loading ? 'Регистрация...' : 'Зарегистрироваться'}</button>
          {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Register; 