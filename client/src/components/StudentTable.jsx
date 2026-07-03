import React from 'react';
import { Link } from 'react-router-dom';

function StudentTable({ students, confirmDelete }) {
  return (
    <div className="glass-panel table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Register Number</th>
            <th>Department</th>
            <th>Year</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((st) => (
            <tr key={st._id}>
              <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>{st.name}</td>
              <td>{st.registerNumber}</td>
              <td>
                <span className={`badge badge-${st.department.toLowerCase()}`}>
                  {st.department}
                </span>
              </td>
              <td>{st.year}</td>
              <td>{st.email}</td>
              <td>{st.phone}</td>
              <td>
                <div className="action-buttons">
                  <Link to={`/students/edit/${st._id}`} className="btn-icon edit-btn" title="Edit Student Details">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </Link>
                  <button onClick={() => confirmDelete(st)} className="btn-icon delete-btn" title="Delete Student Record">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      <line x1="10" y1="11" x2="10" y2="17"/>
                      <line x1="14" y1="11" x2="14" y2="17"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
