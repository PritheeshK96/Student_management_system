import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/student.css';

function EditStudent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [department, setDepartment] = useState('CSE');
  const [year, setYear] = useState('1st Year');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/students/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          const { student } = response.data;
          setName(student.name);
          setRegisterNumber(student.registerNumber);
          setDepartment(student.department);
          setYear(student.year);
          setEmail(student.email);
          setPhone(student.phone);
        } else {
          setError('Failed to fetch student details.');
        }
      } catch (err) {
        console.error('Fetch student details error:', err);
        setError(err.response?.data?.error || 'Student record could not be found.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!department || !year || !email || !phone) {
      setError('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const cleanPhone = phone.replace(/[^0-9+\-\s()]/g, '');
    if (cleanPhone.length < 7) {
      setError('Please enter a valid phone number (minimum 7 characters).');
      return;
    }

    setError('');
    setSaveLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `/api/students/${id}`,
        { department, year, email, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        navigate('/students');
      } else {
        setError(response.data.error || 'Failed to update student record.');
      }
    } catch (err) {
      console.error('Update student submit error:', err);
      setError(
        err.response?.data?.error || 
        'An error occurred while updating the student record.'
      );
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '100px 0', color: 'var(--text-muted)' }}>
        <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>Loading student details...</p>
      </div>
    );
  }

  return (
    <div className="glass-panel form-container">
      <div className="form-header">
        <h2>Edit Student Record</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>Modify the student's program details or contact information</p>
      </div>

      {error && (
        <div className="login-error">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span style={{ marginLeft: '8px' }}>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name (Read Only)</label>
            <input
              type="text"
              id="name"
              className="form-input"
              value={name}
              disabled
              style={{ opacity: 0.6, cursor: 'not-allowed' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="registerNumber">Register Number (Read Only)</label>
            <input
              type="text"
              id="registerNumber"
              className="form-input"
              value={registerNumber}
              disabled
              style={{ opacity: 0.6, cursor: 'not-allowed' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="department">Department</label>
            <select
              id="department"
              className="form-input form-select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              disabled={saveLoading}
              required
            >
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="CIVIL">CIVIL</option>
              <option value="MECH">MECH</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="year">Year of Study</label>
            <select
              id="year"
              className="form-input form-select"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              disabled={saveLoading}
              required
            >
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="e.g. john@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={saveLoading}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              className="form-input"
              placeholder="e.g. +91 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={saveLoading}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/students')}
            disabled={saveLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saveLoading}
          >
            {saveLoading ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditStudent;
