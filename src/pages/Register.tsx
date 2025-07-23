import React, { useState } from 'react';
import './Register.css';

const Register: React.FC = () => {
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [accessCode, setAccessCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: добавить обработку регистрации
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
          <button type="submit" className="register-button">Зарегистрироваться</button>
        </form>
      </div>
    </div>
  );
};

export default Register; 