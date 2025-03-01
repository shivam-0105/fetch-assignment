import './App.css';
import { Login } from './pages/login';
import { Dashboard } from './pages/dashboard';
import { BrowserRouter , Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>  
  )
}

export default App
