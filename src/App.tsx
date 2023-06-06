import React from 'react';
import { TopBar } from './layout/TopBar';
import { Route, Routes } from 'react-router-dom';
import { List } from './pages/List';
import { Mint as MembershipMint } from './pages/membership/Mint';
import { Mint as AdminMint } from './pages/admin/Mint';
import { Burn } from './pages/admin/Burn';
import { Administration } from './pages/admin/Administration';
import { Detail } from './pages/Detail';
import { Home } from './pages/Home';
import { Footer } from './layout/Footer';
import { Profile } from './pages/Profile';

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
        <Route path="mint" element={<MembershipMint />} />
        <Route path="profile" element={<Profile />} />
        <Route path="admin">
          <Route index element={<Administration />} />
          <Route path="mint" element={<AdminMint />} />
          <Route path="burn" element={<Burn />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
