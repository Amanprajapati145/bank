import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = ({ toggleSidebar, onProfileClick }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className={`navbar ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="navbar-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <span className="hamburger"></span>
        </button>
        <div className="logo">
          <h1>🏦 Bank Management</h1>
        </div>
      </div>
      
      <div className="navbar-right">
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        
        <button className="profile-btn" onClick={onProfileClick} title="Profile">
          <div className="profile-icon">
            <span>👤</span>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
