import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './Profile.css';

const Profile = () => {
  const { isDarkMode } = useTheme();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // In a real app, this would handle logout logic
      alert('Logged out successfully!');
    }
  };

  return (
    <div className={`profile-page ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="profile-container">
        <div className="profile-header">
          <h1>Profile</h1>
        </div>

        <div className="profile-card">
          <div className="profile-avatar">
            <div className="avatar-circle">
              <span className="avatar-text">👤</span>
            </div>
          </div>

          <div className="profile-info">
            <h2>John Doe</h2>
            <p className="profile-role">Bank Manager</p>
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-label">📧 Email</span>
              <span className="detail-value">john.doe@bank.com</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">📱 Phone</span>
              <span className="detail-value">+91 98765 43210</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">🏢 Department</span>
              <span className="detail-value">Banking Operations</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">📍 Location</span>
              <span className="detail-value">Delhi, India</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">📅 Joined</span>
              <span className="detail-value">January 15, 2023</span>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn btn-edit-profile">
              ✏️ Edit Profile
            </button>
            <button className="btn btn-logout" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>

        <div className="stats-section">
          <h3>Account Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">24</span>
              <span className="stat-text">Total Accounts Managed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">₹2.5M</span>
              <span className="stat-text">Total Portfolio Value</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-text">Customer Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
