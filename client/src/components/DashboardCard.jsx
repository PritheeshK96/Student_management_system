import React from 'react';

function DashboardCard({ icon, count, label }) {
  return (
    <div className="glass-panel stat-card">
      <div className="stat-icon">
        {icon}
      </div>
      <div className="stat-info">
        <h3>{count}</h3>
        <p>{label}</p>
      </div>
    </div>
  );
}

export default DashboardCard;
