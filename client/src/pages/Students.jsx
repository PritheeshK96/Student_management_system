import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StudentTable from '../components/StudentTable';
import '../css/student.css';

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      let url = '/api/students';
      const params = [];
      if (search) params.push(`search=${encodeURIComponent(search)}`);
      if (selectedDept) params.push(`department=${encodeURIComponent(selectedDept)}`);
      if (params.length > 0) {
        url += `?${params.join('&')}`;
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setStudents(response.data.students);
      } else {
        setError('Failed to fetch student directory.');
      }
    } catch (err) {
      console.error('Fetch students error:', err);
      setError(
        err.response?.data?.error || 
        'Failed to connect to student records API. Verify database connection is healthy.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search, selectedDept]);

  const confirmDelete = (st) => {
    setStudentToDelete(st);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!studentToDelete) return;
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`/api/students/${studentToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setStudents(students.filter((st) => st._id !== studentToDelete._id));
        setDeleteModalOpen(false);
        setStudentToDelete(null);
      } else {
        alert(response.data.error || 'Failed to delete student.');
      }
    } catch (err) {
      console.error('Delete student error:', err);
      alert(err.response?.data?.error || 'An error occurred while deleting the student record.');
    } finally {
      setActionLoading(false);
    }
  };

  const departments = ['CSE', 'ECE', 'EEE', 'CIVIL', 'MECH'];

  return (
    <div>
      <div className="students-header">
        <h1>Students Directory</h1>
        <Link to="/students/add" className="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Student
        </Link>
      </div>

      <div className="controls-panel glass-panel" style={{ padding: '20px' }}>
        <div className="search-box">
          <svg className="search-icon-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search by name or reg no..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <button 
            className={`filter-btn ${selectedDept === '' ? 'active' : ''}`}
            onClick={() => setSelectedDept('')}
          >
            All Departments
          </button>
          {departments.map((dept) => (
            <button
              key={dept}
              className={`filter-btn ${selectedDept === dept ? 'active' : ''}`}
              onClick={() => setSelectedDept(dept)}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>Loading students directory...</p>
        </div>
      ) : error ? (
        <div className="glass-panel" style={{ padding: '24px', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.25)', background: 'rgba(239, 68, 68, 0.05)' }}>
          <h3>Error Loading Students</h3>
          <p style={{ marginTop: '8px', fontSize: '0.95rem' }}>{error}</p>
        </div>
      ) : students.length === 0 ? (
        <div className="glass-panel empty-state">
          <span className="empty-state-icon">🔍</span>
          <h3>No students found</h3>
          <p style={{ fontSize: '0.95rem', marginTop: '6px' }}>Try adjusting your search criteria or department filter.</p>
        </div>
      ) : (
        <StudentTable students={students} confirmDelete={confirmDelete} />
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content">
            <h3>Delete Student Record</h3>
            <p>
              Are you sure you want to permanently delete student <strong>{studentToDelete?.name}</strong> (Register Number: {studentToDelete?.registerNumber})? This action cannot be undone.
            </p>
            <div className="modal-buttons">
              <button 
                className="btn btn-secondary" 
                onClick={() => { setDeleteModalOpen(false); setStudentToDelete(null); }}
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger" 
                onClick={handleDelete}
                disabled={actionLoading}
              >
                {actionLoading ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;
