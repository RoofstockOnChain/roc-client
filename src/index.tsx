import React from 'react';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { RocThemeProvider } from './providers/RocThemeProvider';
import { HelmetProvider } from 'react-helmet-async';
import { hydrate, render } from 'react-dom';

const Index = () => (
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

const rootElement = document.getElementById('root');
if (rootElement?.hasChildNodes()) {
  hydrate(<Index />, rootElement);
} else {
  render(<Index />, rootElement);
}

reportWebVitals();
