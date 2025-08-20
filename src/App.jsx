import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/Security-Dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
