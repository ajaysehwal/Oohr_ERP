import React, { useState } from 'react';
import axios from 'axios';

const FileUpload: React.FC = () => {
  const [selectedFile1, setSelectedFile1] = useState<File | null>(null);
  const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
  const [textValue1, setTextValue1] = useState('');
  const [textValue2, setTextValue2] = useState('');
  const [textValue3, setTextValue3] = useState('');

  const handleFileChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile1(event.target.files[0]);
    }
  };

  const handleFileChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile2(event.target.files[0]);
    }
  };

  const handleTextChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue1(event.target.value);
  };

  const handleTextChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue2(event.target.value);
  };

  const handleTextChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue3(event.target.value);
  };

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedFile1 && selectedFile2) {
      const formData = new FormData();
      formData.append('file1', selectedFile1);
      formData.append('file2', selectedFile2);
      formData.append('text1', textValue1);
      formData.append('text2', textValue2);
      formData.append('text3', textValue3);

      try {
        await axios.post('http://localhost:8000/apiexceldata', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // Files uploaded successfully, do something here if needed
      } catch (error) {
        // Handle the error
      }
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <div>
        <input type="file" onChange={handleFileChange1} />
      </div>
      <div>
        <input type="file" onChange={handleFileChange2} />
      </div>
      <div>
        <input type="text" value={textValue1} onChange={handleTextChange1} placeholder="Text 1" />
      </div>
      <div>
        <input type="text" value={textValue2} onChange={handleTextChange2} placeholder="Text 2" />
      </div>
      <div>
        <input type="text" value={textValue3} onChange={handleTextChange3} placeholder="Text 3" />
      </div>
      <div>
        <button type="submit">Upload</button>
      </div>
    </form>
  );
};

export default FileUpload;
