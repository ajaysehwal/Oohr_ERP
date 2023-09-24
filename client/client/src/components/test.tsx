// src/components/FileUpload.tsx
import React, { useCallback } from 'react';

const Test: React.FC = () => {
  const handleFileDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    // Handle the dropped files as needed
    console.log(files);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // Handle the selected files as needed
    console.log(files);
  };

  return (
    <div
      className="border-dashed border-2 border-gray-400 p-4 rounded-lg text-center"
      onDrop={handleFileDrop}
      onDragOver={handleDragOver}
    >
      <p className="mb-2">Drag and drop files here or</p>
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .pdf" // Define accepted file types
        multiple
        onChange={handleFileInputChange}
      />
      <p className="text-xs mt-2">Supported file types: JPG, JPEG, PNG, PDF</p>
    </div>
  );
};

export default Test;
