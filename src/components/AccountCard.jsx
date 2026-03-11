import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import './AccountCard.css';

const AccountCard = ({ account, onEdit, onDelete, onDeposit, onWithdraw }) => {
  const { isDarkMode } = useTheme();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [amount, setAmount] = useState('');

  const handleDeposit = () => {
    if (amount && parseFloat(amount) > 0) {
      onDeposit(account._id, parseFloat(amount));
      setAmount('');
      setShowDepositModal(false);
    }
  };

  const handleWithdraw = () => {
    if (amount && parseFloat(amount) > 0) {
      onWithdraw(account._id, parseFloat(amount));
      setAmount('');
      setShowWithdrawModal(false);
    }
  };

  return (
    <div className={`account-card ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="card-header">
        <h3 className="account-holder">{account.accountHolderName}</h3>
        <span className="account-number">#{account.accountNumber}</span>
      </div>
      
      <div className="card-body">
        <div className="account-details">
          <div className="detail-row">
            <span className="label">Type:</span>
            <span className="value">{account.accountType}</span>
          </div>
          <div className="detail-row">
            <span className="label">Branch:</span>
            <span className="value">{account.branch}</span>
          </div>
          <div className="detail-row balance">
            <span className="label">Balance:</span>
            <span className="value">₹{account.balance?.toLocaleString() || 0}</span>
          </div>
        </div>
      </div>
      
      <div className="card-actions">
        <div className="action-row">
          <button 
            className="btn btn-deposit" 
            onClick={() => setShowDepositModal(true)}
          >
            💰 Deposit
          </button>
          <button 
            className="btn btn-withdraw" 
            onClick={() => setShowWithdrawModal(true)}
          >
            💸 Withdraw
          </button>
        </div>
        <div className="action-row">
          <button 
            className="btn btn-edit" 
            onClick={() => onEdit(account)}
          >
            ✏️ Edit
          </button>
          <button 
            className="btn btn-delete" 
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this account?')) {
                onDelete(account._id);
              }
            }}
          >
            🗑️ Delete
          </button>
        </div>
      </div>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="modal-overlay">
          <div className={`modal ${isDarkMode ? 'dark' : 'light'}`}>
            <h3>Deposit Money</h3>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="modal-input"
            />
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={handleDeposit}>
                Deposit
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  setShowDepositModal(false);
                  setAmount('');
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="modal-overlay">
          <div className={`modal ${isDarkMode ? 'dark' : 'light'}`}>
            <h3>Withdraw Money</h3>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="modal-input"
            />
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={handleWithdraw}>
                Withdraw
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  setShowWithdrawModal(false);
                  setAmount('');
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountCard;
