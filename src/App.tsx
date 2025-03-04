import './App.css';
import { Login } from './pages/login';
import { Dashboard } from './pages/dashboard';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { FilterProvider } from './contexts/FilterContext';
import { SidebarProvider } from './components/ui/sidebar';
import { SelectedDogsProvider } from './contexts/SelectedDogsContext';
import { ThemeProvider } from './contexts/ThemeContext';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SelectedDogsProvider>
          <FilterProvider>
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
          </FilterProvider>
        </SelectedDogsProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
