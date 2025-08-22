import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/accounts');
      if (!response.ok) throw new Error('Failed to fetch accounts');
      const data = await response.json();
      setAccounts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getAccountIcon = (name) => {
    if (name.toLowerCase().includes('sofi')) return '🏦';
    if (name.toLowerCase().includes('bank of america') || name.toLowerCase().includes('bofa')) return '🏛️';
    return '💳';
  };

  const getTotalBalance = () => {
    return accounts.reduce((total, account) => total + account.balance, 0);
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading your accounts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Connection Error</h2>
          <p>{error}</p>
          <button onClick={fetchAccounts} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header Section */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-icon">💰</span>
            PayCheck Tracker
          </h1>
          <p className="header-subtitle">Live Cash Flow Management</p>
          <div className="current-time">
            {new Date().toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              timeZoneName: 'short'
            })}
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="dashboard">
        {/* Total Balance Card */}
        <div className="balance-card main-balance">
          <div className="card-header">
            <h2>💼 Total Balance</h2>
            <div className="balance-status online"></div>
          </div>
          <div className="balance-amount">
            {formatCurrency(getTotalBalance())}
          </div>
          <div className="balance-subtitle">
            Live from {accounts.length} connected account{accounts.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Account Cards Grid */}
        <div className="accounts-grid">
          {accounts.map((account) => (
            <div key={account.id} className="account-card">
              <div className="card-header">
                <div className="account-info">
                  <span className="account-icon">
                    {getAccountIcon(account.institution_name)}
                  </span>
                  <div>
                    <h3 className="account-name">{account.institution_name}</h3>
                    <p className="account-type">{account.type}</p>
                  </div>
                </div>
                <div className="account-status online"></div>
              </div>
              
              <div className="account-balance">
                {formatCurrency(account.balance)}
              </div>
              
              <div className="account-details">
                <div className="detail-item">
                  <span className="detail-label">Account</span>
                  <span className="detail-value">
                    ****{account.mask || '0000'}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Last Updated</span>
                  <span className="detail-value">Just now</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button className="action-button primary" onClick={fetchAccounts}>
            <span className="button-icon">🔄</span>
            Refresh Accounts
          </button>
          <button className="action-button secondary">
            <span className="button-icon">📊</span>
            View Details
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>🔒 Bank-level security • Real-time updates • Built by BabaYaga2569</p>
      </footer>
    </div>
  );
};

export default App;
