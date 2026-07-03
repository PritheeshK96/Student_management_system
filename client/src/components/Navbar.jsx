import React from 'react';
import '../css/navbar.css';

function Navbar({ sidebarOpen, setSidebarOpen, logout }) {
  return (
    <header className="mobile-navbar">
      <button 
        className="menu-toggle-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle Navigation Menu"
      >
        {sidebarOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        )}
      </button>

      <div className="sidebar-brand" style={{ padding: 0, borderBottom: 'none' }}>
        <div className="sidebar-logo" style={{ width: '28px', height: '28px', fontSize: '0.9rem' }}>S</div>
        <h2 style={{ fontSize: '0.95rem' }}>Smart SMS</h2>
      </div>

      <button className="btn-icon delete-btn" onClick={logout} style={{ padding: '6px' }} title="Logout">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      </button>
    </header>
  );
}

export default Navbar;
