import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Participants from './pages/Participants';
import Teams from './pages/Teams';
import Competitions from './pages/Competitions';
import Winners from './pages/Winners';
import AdminPanel from './pages/AdminPanel';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      {/* Здесь может быть Header */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/participants" element={<Participants />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/winners" element={<Winners />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </>
  );
}

export default App;
