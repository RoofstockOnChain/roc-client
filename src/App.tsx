import React from 'react';
import { TopBar } from './layout/TopBar';
import { Route, Routes } from 'react-router-dom';
import { List } from './pages/List';
import { Mint } from './pages/Mint';
import { Burn } from './pages/Burn';
import { Administration } from './pages/Administration';
import { Box } from '@mui/material';
import { Detail } from './pages/Detail';

function App() {
  return (
    <>
      <TopBar />
      <Box padding={2}>
        <Routes>
          <Route index element={<List />} />
          <Route
            path="/properties/:contractAddress/:token"
            element={<Detail />}
          />
          <Route path="mint" element={<Mint />} />
          <Route path="mint" element={<Burn />} />
          <Route path="admin" element={<Administration />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
