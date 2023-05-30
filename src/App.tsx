import React from 'react';
import { TopBar } from './layout/TopBar';
import { Route, Routes } from 'react-router-dom';
import { List } from './pages/List';
import { Mint } from './pages/Mint';
import { Burn } from './pages/Burn';
import { Administration } from './pages/Administration';

function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route index element={<List />} />
        <Route path="mint" element={<Mint />} />
        <Route path="mint" element={<Burn />} />
        <Route path="admin" element={<Administration />} />
      </Routes>
    </>
  );
}

export default App;
