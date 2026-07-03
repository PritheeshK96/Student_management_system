import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [adminUser, setAdminUser] = useState(localStorage.getItem('adminUser') || '');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const login = (newToken, username) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('adminUser', username);
    setToken(newToken);
    setAdminUser(username);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminUser');
    setToken('');
    setAdminUser('');
  };

  // Protected Routes wrapper to secure dashboard pages
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return (
      <div className="app-container">
        <Sidebar logout={logout} adminUser={adminUser} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} logout={logout} />
          <main className="main-content">
            {children}
          </main>
        </div>
      </div>
    );
  };

  // Public Routes wrapper for Login page
  const PublicRoute = ({ children }) => {
    if (token) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login login={login} />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students/add"
          element={
            <ProtectedRoute>
              <AddStudent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students/edit/:id"
          element={
            <ProtectedRoute>
              <EditStudent />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;