import React, { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'https://phenomenal-financial-backend.onrender.com';

function App() {
  const [linkToken, setLinkToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [backendStatus, setBackendStatus] = useState('checking');
  
  // Fixed: Use consistent user ID
  const [userId] = useState('user_steve_001');

  // Test backend connection first
  useEffect(() => {
    const testBackend = async () => {
      try {
        console.log('🔗 Testing backend connection...');
        const response = await axios.get(`${API_BASE_URL}/health`);
        console.log('✅ Backend health check:', response.data);
        setBackendStatus('connected');
      } catch (error) {
        console.error('❌ Backend connection failed:', error);
        setBackendStatus('failed');
        setError(`Backend connection failed: ${error.message}`);
      }
    };
    testBackend();
  }, []);

  // Create link token after backend is confirmed working
  useEffect(() => {
    if (backendStatus !== 'connected') return;
    
    const createLinkToken = async () => {
      try {
        console.log('🔗 Creating link token for user:', userId);
        const response = await axios.post(`${API_BASE_URL}/api/create_link_token`, {
          user_id: userId
        });
        console.log('✅ Link token created:', response.data);
        setLinkToken(response.data.link_token);
      } catch (error) {
        console.error('❌ Error creating link token:', error);
        setError(`Failed to create link token: ${error.response?.data?.error || error.message}`);
      }
    };
    createLinkToken();
  }, [userId, backendStatus]);

  // Plaid Link configuration
  const config = {
    token: linkToken,
    onSuccess: async (public_token, metadata) => {
      console.log('🎉 Plaid success!', { public_token, metadata });
      setLoading(true);
      try {
        console.log('🔄 Exchanging public token...');
        const response = await axios.post(`${API_BASE_URL}/api/exchange_public_token`, {
          public_token,
          user_id: userId
        });
        console.log('✅ Token exchange successful:', response.data);
        
        if (response.data.success) {
          setAccessToken(true);
          await fetchAccounts();
        }
      } catch (error) {
        console.error('❌ Error exchanging token:', error);
        setError(`Failed to exchange token: ${error.response?.data?.error || error.message}`);
      }
      setLoading(false);
    },
    onExit: (err, metadata) => {
      console.log('🚪 Plaid Link exited:', { err, metadata });
      if (err) {
        console.error('Plaid Link exit error:', err);
        setError(`Bank connection cancelled: ${err.error_message || err.error_code}`);
      }
    },
    onEvent: (eventName, metadata) => {
      console.log('📊 Plaid event:', eventName, metadata);
    },
  };

  const { open, ready } = usePlaidLink(config);

  // Fetch accounts
  const fetchAccounts = async () => {
    try {
      console.log('📊 Fetching accounts for user:', userId);
      const response = await axios.get(`${API_BASE_URL}/api/accounts/${userId}`);
      console.log('✅ Accounts fetched:', response.data);
      setAccounts(response.data.accounts);
    } catch (error) {
      console.error('❌ Error fetching accounts:', error);
      setError(`Failed to fetch accounts: ${error.response?.data?.error || error.message}`);
    }
  };

  // Debug function for testing
  const runDebugTest = async () => {
    console.log('🧪 Running debug test...');
    try {
      // Test 1: Backend health
      const healthResponse = await axios.get(`${API_BASE_URL}/health`);
      console.log('✅ Health check:', healthResponse.data);
      
      // Test 2: Link token creation
      const linkResponse = await axios.post(`${API_BASE_URL}/api/create_link_token`, {
        user_id: userId
      });
      console.log('✅ Link token test:', linkResponse.data);
      
      alert('✅ Debug test passed! Check console for details.');
    } catch (error) {
      console.error('❌ Debug test failed:', error);
      alert(`❌ Debug test failed: ${error.message}`);
    }
  };

  if (backendStatus === 'checking') {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>🔗 Checking backend connection...</p>
      </div>
    );
  }

  if (backendStatus === 'failed') {
    return (
      <div className="App">
        <header className="app-header">
          <h1>💰 Phenomenal Financial Tracker</h1>
          <div className="error-message">
            <p>❌ Backend Connection Failed</p>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>🔄 Retry</button>
          </div>
        </header>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>🔗 Connecting to your bank...</p>
      </div>
    );
  }

  if (accessToken && accounts.length > 0) {
    return (
      <div className="dashboard">
        <h1>🎉 Success! Your Connected Accounts</h1>
        <div className="success-message">
          <p>✅ Backend connected ✅ Plaid connected ✅ Accounts loaded</p>
        </div>
        {accounts.map((account) => (
          <div key={account.account_id} className="account-card">
            <h3>{account.name}</h3>
            <p><strong>Balance:</strong> ${account.balances.current}</p>
            <p><strong>Type:</strong> {account.type} • {account.subtype}</p>
            <p><strong>Institution:</strong> {account.institution_name}</p>
          </div>
        ))}
        <button onClick={() => fetchAccounts()}>🔄 Refresh Accounts</button>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>💰 Phenomenal Financial Tracker</h1>
        <p>Connect your bank accounts securely with Plaid</p>
        <div className="status-badges">
          <span className="badge success">✅ Backend Connected</span>
          <span className="badge success">✅ Production Ready</span>
        </div>
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
          disabled={!ready || !linkToken}
          className="connect-button"
        >
          {!linkToken ? '⏳ Preparing Plaid...' : 
           !ready ? '⏳ Loading Plaid...' : 
           '🚀 Connect Your Bank'}
        </button>
        
        <div className="debug-section">
          <button onClick={runDebugTest} className="debug-button">
            🧪 Run Debug Test
          </button>
          <p className="debug-info">
            Backend: {API_BASE_URL}<br/>
            User ID: {userId}<br/>
            Link Token: {linkToken ? '✅ Ready' : '⏳ Creating...'}<br/>
            Plaid Ready: {ready ? '✅ Yes' : '❌ No'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
