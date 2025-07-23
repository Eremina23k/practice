import React, { useRef } from 'react';

interface FileUploadProps {
  onFileUpload?: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileUpload) {
      onFileUpload(file);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv,.xlsx,.xls,.txt"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleFileChange}
      />
      <button type="button" onClick={handleButtonClick}>
        Выбрать файл
      </button>
    </div>
  );
};

export default FileUpload; 