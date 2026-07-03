import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/navbar.css';

function Sidebar({ logout, adminUser, isOpen, setIsOpen }) {
  const location = useLocation();

  const isLinkActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-brand">
        <div className="sidebar-logo">S</div>
        <h2>Smart SMS</h2>
      </div>

      <ul className="sidebar-menu">
        <li className={`sidebar-item ${isLinkActive('/') ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
          <Link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="9" rx="1"/>
              <rect x="14" y="3" width="7" height="5" rx="1"/>
              <rect x="14" y="12" width="7" height="9" rx="1"/>
              <rect x="3" y="16" width="7" height="5" rx="1"/>
            </svg>
            Dashboard
          </Link>
        </li>
        <li className={`sidebar-item ${isLinkActive('/students') ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
          <Link to="/students">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Students
          </Link>
        </li>
      </ul>

      <div className="sidebar-footer">
        <div className="admin-profile">
          <div className="admin-avatar">
            {adminUser ? adminUser.charAt(0) : 'A'}
          </div>
          <div className="admin-info">
            <h4>{adminUser || 'Admin'}</h4>
            <p>Administrator</p>
          </div>
        </div>
        
        <button className="btn btn-secondary" style={{ width: '100%', height: '40px', padding: '0px' }} onClick={logout}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
