import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import './satoshi.css';
import AuthContextProvider from './context/AuthContext';
import { ThemeProvider } from "@material-tailwind/react";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
  <Router>
      <AuthContextProvider>
      <ThemeProvider>
      <App />
      </ThemeProvider>
      </AuthContextProvider>
     
    </Router>
);
