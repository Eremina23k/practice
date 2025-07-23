import React from 'react';

const Modal: React.FC<{ open: boolean; onClose: () => void; children: React.ReactNode }> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', minWidth: '300px' }}>
        <button onClick={onClose} style={{ float: 'right' }}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal; 