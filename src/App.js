import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';

const App = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(null);
  const [useMockData, setUseMockData] = useState(false);

  // Mock data for testing the UI
  const mockAccounts = useMemo(() => [
    {
      id: '1',
      institution_name: 'SoFi',
      type: 'checking',
      balance: 400.00,
      mask: '1234'
    },
    {
      id: '2',
      institution_name: 'Bank of America',
      type: 'checking',
      balance: 2400.00,
      mask: '5678'
    }
  ], []);

  const fetchAccounts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (useMockData) {
        // Use mock data for UI testing
        setTimeout(() => {
          setAccounts(mockAccounts);
          setLoading(false);
        }, 1000);
        return;
      }

      const response = await fetch('https://phenomenal-financial-backend.onrender.com/api/accounts');
      if (!response.ok) throw new Error(`Failed to fetch accounts: ${response.status}`);
      const data = await response.json();
      setAccounts(data);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message);
      // Auto-switch to mock data if API fails
      setUseMockData(true);
      setAccounts(mockAccounts);
    } finally {
      setLoading(false);
    }
  }, [useMockData, mockAccounts]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

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
          <p className="loading-text">Connecting to your banks...</p>
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
            Family Financial Tracker
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
        {/* Connection Status */}
        {useMockData && (
          <div className="status-banner">
            🧪 Demo Mode - Using sample data while fixing API connection
          </div>
        )}

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
            {useMockData ? 'Demo data from' : 'Live from'} {accounts.length} connected account{accounts.length !== 1 ? 's' : ''}
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
                <div className={`account-status ${useMockData ? 'demo' : 'online'}`}></div>
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
                  <span className="detail-value">{useMockData ? 'Demo data' : 'Just now'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button className="action-button primary" onClick={fetchAccounts}>
            <span className="button-icon">🔄</span>
            {useMockData ? 'Try Real API' : 'Refresh Accounts'}
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
