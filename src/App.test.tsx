import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { RocThemeProvider } from './providers/RocThemeProvider';
import { HelmetProvider } from 'react-helmet-async';

test('renders home page', () => {
  render(
    <BrowserRouter>
      <HelmetProvider>
        <RocThemeProvider>
          <App />
        </RocThemeProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
  const logoElement = screen.getByAltText('Roofstock onChain Logo');
  expect(logoElement).toBeInTheDocument();
});
