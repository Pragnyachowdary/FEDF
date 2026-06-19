import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import { api, setAuthToken } from './api';

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('hospitalUser');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('hospitalToken') || '');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      localStorage.setItem('hospitalToken', token);
    } else {
      localStorage.removeItem('hospitalToken');
    }
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('hospitalUser', JSON.stringify(user));
    else localStorage.removeItem('hospitalUser');
  }, [user]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    setUser(response.data.user);
    setToken(response.data.token);
    return response.data.user;
  };

  const logout = () => {
    setUser(null);
    setToken('');
  };

  return (
    <div className={`app-shell ${theme}`}> 
      <BrowserRouter>
        <Navbar user={user} onLogout={logout} theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<LandingPage onLogin={login} />} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard user={user} logout={logout} /> : <Navigate to="/" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
