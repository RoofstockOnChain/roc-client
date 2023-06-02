import React from 'react';
import { TopBar } from './layout/TopBar';
import { Route, Routes } from 'react-router-dom';
import { List } from './pages/List';
import { Mint } from './pages/Mint';
import { Burn } from './pages/Burn';
import { Administration } from './pages/Administration';
import { Box } from '@mui/material';
import { Detail } from './pages/Detail';
import { Home } from './pages/Home';
import { Footer } from './layout/Footer';

function App() {
  return (
    <>
      <TopBar />
      <Box padding={2}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="properties" element={<List />} />
          <Route
            path="/properties/:contractAddress/:token"
            element={<Detail />}
          />
          <Route path="mint" element={<Mint />} />
          <Route path="burn" element={<Burn />} />
          <Route path="admin" element={<Administration />} />
        </Routes>
      </Box>
      <Footer />
    </>
  );
}

export default App;
