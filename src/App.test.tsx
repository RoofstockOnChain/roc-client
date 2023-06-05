import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { RocThemeProvider } from './providers/RocThemeProvider';

test('renders learn react link', () => {
  render(
    <BrowserRouter>
      <RocThemeProvider>
        <App />
      </RocThemeProvider>
    </BrowserRouter>
  );
  const logoElement = screen.getByAltText('Roofstock onChain Logo');
  expect(logoElement).toBeInTheDocument();
});
