import React, { useState } from 'react';

const Register: React.FC = () => {
  const [fio, setFio] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [accessCode, setAccessCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: добавить обработку регистрации
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ФИО</label>
          <input type="text" value={fio} onChange={e => setFio(e.target.value)} required />
        </div>
        <div>
          <label>Логин</label>
          <input type="text" value={login} onChange={e => setLogin(e.target.value)} required />
        </div>
        <div>
          <label>Пароль</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Код доступа</label>
          <input type="text" value={accessCode} onChange={e => setAccessCode(e.target.value)} />
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default Register; 