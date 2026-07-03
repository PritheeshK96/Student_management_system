import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardCard from '../components/DashboardCard';
import '../css/dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/dashboard/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setStats(response.data.stats);
        } else {
          setError('Failed to fetch dashboard metrics.');
        }
      } catch (err) {
        console.error('Fetch stats error:', err);
        setError(
          err.response?.data?.error || 
          'Failed to connect to serverless API functions. Ensure database is running.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '100px 0', color: 'var(--text-muted)' }}>
        <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>Loading dashboard statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel" style={{ padding: '24px', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.25)', background: 'rgba(239, 68, 68, 0.05)' }}>
        <h3>Error Loading Dashboard</h3>
        <p style={{ marginTop: '8px', fontSize: '0.95rem' }}>{error}</p>
      </div>
    );
  }

  const { totalStudents, totalDepartments, departmentStats, recentStudents } = stats || {
    totalStudents: 0,
    totalDepartments: 5,
    departmentStats: [],
    recentStudents: [],
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div>
      <div className="dashboard-title-section">
        <h1>Dashboard Overview</h1>
        <p>Real-time analytics and student metrics</p>
      </div>

      <div className="stats-grid">
        <DashboardCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          }
          count={totalStudents}
          label="Total Students"
        />
        <DashboardCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
          }
          count={totalDepartments}
          label="Total Departments"
        />
      </div>

      <div className="dashboard-grid">
        <div className="glass-panel dashboard-section">
          <h2>Departmental Breakdown</h2>
          <div className="dept-stat-list">
            {departmentStats.map((dept) => {
              const pct = totalStudents > 0 ? (dept.count / totalStudents) * 100 : 0;
              const deptLower = dept.department.toLowerCase();

              return (
                <div key={dept.department} className="dept-stat-item">
                  <div className="dept-stat-header">
                    <div className="dept-stat-name">
                      <span className={`dept-dot dot-${deptLower}`}></span>
                      {dept.department}
                    </div>
                    <span>{dept.count} Students ({pct.toFixed(1)}%)</span>
                  </div>
                  <div className="dept-progress-bg">
                    <div 
                      className={`dept-progress-bar bg-${deptLower}`} 
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-panel dashboard-section">
          <h2>Recent Admissions</h2>
          {recentStudents.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80%', color: 'var(--text-dim)', gap: '10px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p style={{ fontSize: '0.9rem' }}>No student records in database yet.</p>
            </div>
          ) : (
            <div className="recent-list">
              {recentStudents.map((st) => (
                <div key={st._id} className="recent-item">
                  <div className="recent-student-info">
                    <h4>{st.name}</h4>
                    <p>{st.registerNumber}</p>
                  </div>
                  <div className="recent-student-meta">
                    <span className={`badge badge-${st.department.toLowerCase()}`}>{st.department}</span>
                    <span className="recent-time">{formatDate(st.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
