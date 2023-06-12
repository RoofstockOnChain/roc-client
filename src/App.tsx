import React from 'react';
import { TopBar } from './layout/TopBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { List } from './pages/List';
import { Membership } from './pages/Membership';
import { Detail } from './pages/Detail';
import { Home } from './pages/Home';
import { Footer } from './layout/Footer';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="properties" element={<List />} />
        <Route
          path="/properties/:contractAddress/:token"
          element={<Detail />}
        />
        <Route path="membership" element={<Membership />} />
        {/* Leave this old route here for now, remove in the future */}
        <Route path="mint" element={<Navigate to="/membership" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
