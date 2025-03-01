import './App.css';
import { Login } from './pages/login';
import { Dashboard } from './pages/dashboard';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster richColors />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>  
    </AuthProvider>
  )
}

export default App
