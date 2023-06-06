import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { RocThemeProvider } from './providers/RocThemeProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RocThemeProvider>
        <App />
      </RocThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
