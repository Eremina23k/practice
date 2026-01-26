import React from 'react';
import ParticipantTable from '../components/ParticipantTable';
import './Participants.css';

const Participants: React.FC = () => {
  return (
    <div>
      <h1>Участники</h1>
      <ParticipantTable />
    </div>
  );
};

export default Participants; 