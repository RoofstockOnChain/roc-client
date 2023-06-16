import React, { FC, ReactNode } from 'react';
import { TopBar } from './layout/TopBar';
import { Footer } from './layout/Footer';
import '../index.css';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <TopBar />
      {children}
      <Footer />
    </>
  );
};
