import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Loginpage from './Loginpage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Loginpage" element={<Loginpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
