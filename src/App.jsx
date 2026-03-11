import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import './App.css';

function App() {
  const [activePage, setActivePage] = React.useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <ThemeProvider>
      <div className="app">
        <Navbar 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onProfileClick={() => setActivePage('profile')}
        />
        <div className="app-content">
          <Sidebar 
            isOpen={sidebarOpen}
            activePage={activePage}
            onPageChange={setActivePage}
          />
          <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            {activePage === 'dashboard' ? <Dashboard /> : <Profile />}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
