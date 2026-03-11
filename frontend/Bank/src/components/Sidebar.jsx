import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './Sidebar.css';

const Sidebar = ({ isOpen, activePage, onPageChange }) => {
  const { isDarkMode } = useTheme();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'accounts', label: 'Accounts', icon: '💳' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'} ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h2>Menu</h2>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.id} className="nav-item">
                <button
                  className={`nav-button ${activePage === item.id ? 'active' : ''}`}
                  onClick={() => onPageChange(item.id)}
                  title={item.label}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
