import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/student.css';

function AddStudent() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [department, setDepartment] = useState('CSE');
  const [year, setYear] = useState('1st Year');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !registerNumber || !email || !phone) {
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
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/students',
        { name, registerNumber, department, year, email, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        navigate('/students');
      } else {
        setError(response.data.error || 'Failed to save student record.');
      }
    } catch (err) {
      console.error('Add student submit error:', err);
      setError(
        err.response?.data?.error || 
        'An error occurred while adding the student record.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel form-container">
      <div className="form-header">
        <h2>Add New Student</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>Fill in the details below to register a new student</p>
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
            <label className="form-label" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="registerNumber">Register Number</label>
            <input
              type="text"
              id="registerNumber"
              className="form-input"
              placeholder="e.g. 21CS001"
              value={registerNumber}
              onChange={(e) => setRegisterNumber(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="department">Department</label>
            <select
              id="department"
              className="form-input form-select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/students')}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Adding Student...' : 'Register Student'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddStudent;
