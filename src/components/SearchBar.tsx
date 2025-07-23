import React, { useState } from 'react';

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value = '', onChange, placeholder = 'Поиск...' }) => {
  const [input, setInput] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder={placeholder}
        style={{ padding: '0.5rem', width: '200px' }}
      />
    </div>
  );
};

export default SearchBar; 