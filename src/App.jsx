// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from './Layout/Mainlayout';
import Home from './pages/Home';
import Loginpage from './pages/Loginpage';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ArtworkDetail from './pages/ArtworkDetail';
import ProtectedRoute from './components/ProtectedRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="art/:id" element={<ArtworkDetail />} />
          <Route path="/Loginpage" element={<Loginpage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
