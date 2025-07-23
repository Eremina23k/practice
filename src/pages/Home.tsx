import React from 'react';
import './Home.css';

const Home: React.FC = () => (
  <div className="home-page">
    <div className="home-logo-row">
      <span className="home-logo">ТурТрек</span>
    </div>
    <main className="home-main">
      <div className="home-info-box">
        <div className="home-left">
          <h1 className="home-left-h1">Данное приложение предназначено для просмотра данных соревнований.</h1>
          <p className="home-left-p">
            Вы можете создать свой профиль, чтобы отслеживать свои соревнования. Пользователи имеющие доступ администратора могут вносить данные и проводить соревнования.
          </p>
        </div>
        <div className="home-right">
          <h2 className="home-right-h2">Просмотр данных:</h2>
          <ul className="home-right-ul">
            <li className="home-right-li">список участников</li>
            <li className="home-right-li">даты соревнований</li>
            <li className="home-right-li">прошлые победители</li>
          </ul>
        </div>
      </div>
    </main>
  </div>
);

export default Home; 