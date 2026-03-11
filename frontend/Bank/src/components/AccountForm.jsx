import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import './AccountForm.css';

const AccountForm = ({ account, onSave, onClose, isOpen }) => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    accountHolderName: '',
    accountNumber: '',
    accountType: 'Savings',
    branch: '',
    balance: 0
  });

  useEffect(() => {
    if (account) {
      setFormData({
        accountHolderName: account.accountHolderName || '',
        accountNumber: account.accountNumber || '',
        accountType: account.accountType || 'Savings',
        branch: account.branch || '',
        balance: account.balance || 0
      });
    } else {
      setFormData({
        accountHolderName: '',
        accountNumber: '',
        accountType: 'Savings',
        branch: '',
        balance: 0
      });
    }
  }, [account]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'balance' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`account-form-modal ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="modal-header">
          <h2>{account ? 'Edit Account' : 'Add New Account'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="form-content">
          <div className="form-group">
            <label htmlFor="accountHolderName">Account Holder Name</label>
            <input
              type="text"
              id="accountHolderName"
              name="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter account holder name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="accountNumber">Account Number</label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter account number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="accountType">Account Type</label>
            <select
              id="accountType"
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              className="form-input"
            >
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
              <option value="Fixed Deposit">Fixed Deposit</option>
              <option value="Recurring Deposit">Recurring Deposit</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="branch">Branch</label>
            <input
              type="text"
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter branch name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="balance">Initial Balance</label>
            <input
              type="number"
              id="balance"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="form-input"
              placeholder="Enter initial balance"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {account ? 'Update Account' : 'Create Account'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;
