import './App.css';
import { Login } from './pages/login';
import { Dashboard } from './pages/dashboard';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import { SidebarProvider } from './components/ui/sidebar';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <SidebarProvider>
          <Toaster richColors />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </SidebarProvider>
      </BrowserRouter>  
    </AuthProvider>
  )
}

export default App
