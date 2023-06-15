import React from 'react';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { RocThemeProvider } from './providers/RocThemeProvider';
import { HelmetProvider } from 'react-helmet-async';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root') as Element;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <RocThemeProvider>
          <App />
        </RocThemeProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
