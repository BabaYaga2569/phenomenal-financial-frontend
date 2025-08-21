import React, { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import './App.css';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://phenomenal-financial-backend.onrender.com'
  : 'http://localhost:3001';

function App() {
  const [linkToken, setLinkToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = 'user_' + Math.random().toString(36).substr(2, 9);

  // Create link token
  useEffect(() => {
    const createLinkToken = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/create_link_token`, {
          user_id: userId
        });
        setLinkToken(response.data.link_token);
      } catch (error) {
        console.error('Error creating link token:', error);
        setError('Failed to initialize Plaid. Please try again.');
      }
    };

    createLinkToken();
  }, [userId]);

  // Plaid Link configuration
  const config = {
    token: linkToken,
    onSuccess: async (public_token, metadata) => {
      setLoading(true);
      try {
        const response = await axios.post(`${API_BASE_URL}/api/exchange_public_token`, {
          public_token,
          user_id: userId
        });

        if (response.data.success) {
          setAccessToken(true);
          await fetchAccounts();
        }
      } catch (error) {
        console.error('Error exchanging token:', error);
        setError('Failed to connect your bank. Please try again.');
      }
      setLoading(false);
    },
    onExit: (err, metadata) => {
      if (err) {
        console.error('Plaid Link exit error:', err);
        setError('Bank connection was cancelled or failed.');
      }
    },
  };

  const { open, ready } = usePlaidLink(config);

  // Fetch accounts
  const fetchAccounts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/accounts/${userId}`);
      setAccounts(response.data.accounts);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setError('Failed to fetch accounts. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Connecting to your bank...</p>
      </div>
    );
  }

  if (accessToken && accounts.length > 0) {
    return (
      <div className="dashboard">
        <h1>💰 Your Accounts</h1>
        {accounts.map((account) => (
          <div key={account.account_id} className="account-card">
            <h3>{account.name}</h3>
            <p>Balance: ${account.balances.current}</p>
            <p>Type: {account.type}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>💰 Phenomenal Financial Tracker</h1>
        <p>Connect your bank accounts securely with Plaid</p>
      </header>

      {error && (
        <div className="error-message">
          <p>❌ {error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      <div className="connect-section">
        <button
          onClick={() => open()}
          disabled={!ready}
          className="connect-button"
        >
          {ready ? '🔗 Connect Your Bank' : '⏳ Loading...'}
        </button>
      </div>
    </div>
  );
}

export default App;