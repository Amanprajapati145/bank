import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import apiService from '../services/api';
import AccountCard from '../components/AccountCard';
import AccountForm from '../components/AccountForm';
import './Dashboard.css';

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAccounts();
      setAccounts(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch accounts. Please try again.');
      console.error('Error fetching accounts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAccount = () => {
    setEditingAccount(null);
    setShowForm(true);
  };

  const handleEditAccount = (account) => {
    setEditingAccount(account);
    setShowForm(true);
  };

  const handleSaveAccount = async (accountData) => {
    try {
      if (editingAccount) {
        await apiService.updateAccount(editingAccount._id, accountData);
      } else {
        await apiService.createAccount(accountData);
      }
      await fetchAccounts();
      setShowForm(false);
      setEditingAccount(null);
    } catch (err) {
      setError(`Failed to ${editingAccount ? 'update' : 'create'} account. Please try again.`);
      console.error('Error saving account:', err);
    }
  };

  const handleDeleteAccount = async (id) => {
    try {
      await apiService.deleteAccount(id);
      await fetchAccounts();
    } catch (err) {
      setError('Failed to delete account. Please try again.');
      console.error('Error deleting account:', err);
    }
  };

  const handleDeposit = async (id, amount) => {
    try {
      await apiService.deposit(id, amount);
      await fetchAccounts();
    } catch (err) {
      setError('Failed to deposit money. Please try again.');
      console.error('Error depositing:', err);
    }
  };

  const handleWithdraw = async (id, amount) => {
    try {
      await apiService.withdraw(id, amount);
      await fetchAccounts();
    } catch (err) {
      if (err.message.includes('Insufficient Balance')) {
        setError('Insufficient Balance');
      } else {
        setError('Failed to withdraw money. Please try again.');
      }
      console.error('Error withdrawing:', err);
    }
  };

  const totalBalance = accounts.reduce((sum, account) => sum + (account.balance || 0), 0);

  return (
    <div className={`dashboard ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="dashboard-header">
        <h1>Bank Dashboard</h1>
        <div className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-label">Total Accounts</span>
            <span className="stat-value">{accounts.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Balance</span>
            <span className="stat-value">₹{totalBalance.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <span>⚠️ {error}</span>
          <button onClick={() => setError('')}>×</button>
        </div>
      )}

      <div className="dashboard-content">
        <div className="accounts-header">
          <h2>Accounts</h2>
          <button className="btn btn-primary add-account-btn" onClick={handleAddAccount}>
            ➕ Add New Account
          </button>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <span>Loading accounts...</span>
          </div>
        ) : accounts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏦</div>
            <h3>No accounts found</h3>
            <p>Create your first account to get started</p>
            <button className="btn btn-primary" onClick={handleAddAccount}>
              Create First Account
            </button>
          </div>
        ) : (
          <div className="accounts-grid">
            {accounts.map((account) => (
              <AccountCard
                key={account._id}
                account={account}
                onEdit={handleEditAccount}
                onDelete={handleDeleteAccount}
                onDeposit={handleDeposit}
                onWithdraw={handleWithdraw}
              />
            ))}
          </div>
        )}
      </div>

      <AccountForm
        account={editingAccount}
        onSave={handleSaveAccount}
        onClose={() => {
          setShowForm(false);
          setEditingAccount(null);
        }}
        isOpen={showForm}
      />
    </div>
  );
};

export default Dashboard;
