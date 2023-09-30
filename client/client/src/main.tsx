import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import './satoshi.css';
import { CssBaseline } from '@mui/material';


import AuthContextProvider from './context/AuthContext';
import { ThemeProvider } from "@material-tailwind/react";
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";                                       
import { PrimeReactProvider} from 'primereact/api';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
  <Router>
      <AuthContextProvider>
      <ThemeProvider>
      <CssBaseline />
      <PrimeReactProvider>
      <App />
      </PrimeReactProvider>
     
      
      </ThemeProvider>
      </AuthContextProvider>
     
    </Router>
);
