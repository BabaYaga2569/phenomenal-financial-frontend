import React, { useState, useEffect } from 'react';

// Move demoAccounts OUTSIDE component to fix dependency issue
const demoAccounts = [
  { id: 1, name: 'Chase Total Checking', institution: 'chase', balance: 14247.83, mask: '4829', type: 'checking' },
  { id: 2, name: 'Bank of America Advantage', institution: 'bofa', balance: 10599.99, mask: '7392', type: 'savings' }
];

const demoTransactions = [
  { id: 1, merchant: 'Starbucks #1247', amount: -6.47, category: 'Food & Dining', date: '2 min ago', account: 'Chase ••4829' },
  { id: 2, merchant: 'Uber Trip', amount: -14.23, category: 'Transportation', date: '1 hour ago', account: 'Chase ••4829' },
  { id: 3, merchant: 'Whole Foods Market', amount: -89.34, category: 'Groceries', date: 'Yesterday', account: 'Chase ••4829' },
  { id: 4, merchant: 'Payroll Direct Deposit', amount: 3247.85, category: 'Income', date: '2 days ago', account: 'Chase ••4829' }
];

const PhenomenalFinancialTracker = () => {
  const [loading, setLoading] = useState(true);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const totalBalance = 24847.82;
  const monthlySpending = 2891.47;

  // FIXED useEffect - no dependency issues!
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setChatHistory([{
        type: 'ai',
        message: "Hi Steve! I've analyzed your 247 transactions from Chase and Bank of America. Based on your spending patterns, you typically spend $89 on groceries every Tuesday. Want to see your personalized cash flow prediction?",
        timestamp: new Date()
      }]);
    }, 1500);
    return () => clearTimeout(timer);
  }, []); // Empty dependency array is now safe

  const handleChatSubmit = () => {
    if (!chatMessage.trim()) return;
    
    setChatHistory(prev => [...prev, {
      type: 'user',
      message: chatMessage,
      timestamp: new Date()
    }]);
    
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        type: 'ai',
        message: "I'm analyzing your financial patterns with 94.3% confidence. Your Tuesday grocery shopping saves $67/month vs weekend prices. Coffee optimization could save another $47/month!",
        timestamp: new Date()
      }]);
    }, 1000);
    
    setChatMessage('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{
        background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
        color: '#e7ecf3'
      }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Initializing Neural Networks</h2>
          <p className="text-blue-200">Analyzing your financial patterns with AI...</p>
        </div>
      </div>
    );
  }

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
    color: '#e7ecf3',
    position: 'relative',
    overflow: 'hidden'
  };

  const glassStyle = {
    background: 'rgba(20, 22, 27, 0.8)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: '24px',
    transition: 'all 0.4s ease'
  };

  return (
    <div style={containerStyle}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(120,119,198,0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255,107,157,0.08) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(78,205,196,0.06) 0%, transparent 50%)
        `,
        animation: 'float 40s ease-in-out infinite alternate',
        pointerEvents: 'none'
      }} />

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 p-6" style={{
          ...glassStyle,
          borderRadius: '0 0 24px 24px',
          marginBottom: '32px'
        }}>
          <div className="flex items-center gap-4">
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff6b9d 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              boxShadow: '0 0 20px rgba(255, 107, 157, 0.3)',
              animation: 'float 6s ease-in-out infinite'
            }}>
              🧠
            </div>
            <div>
              <h1 className="text-3xl font-bold" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff6b9d 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Phenomenal Financial Tracker
              </h1>
              <div className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-pink-500/20 border border-pink-500/30 text-pink-400">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                  AI System Active
                </span>
                • AI-Powered • Plaid Connected • Predictive Intelligence
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2" style={{...glassStyle, padding: '8px 16px'}}>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">2 Banks Connected</span>
            </div>
            
            <button 
              onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
              className="px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:transform hover:-translate-y-1"
              style={{
                background: 'linear-gradient(135deg, #ff6b9d 0%, #e84393 100%)',
                color: 'white',
                border: '1px solid #ff6b9d',
                boxShadow: '0 0 20px rgba(255, 107, 157, 0.3)'
              }}
            >
              🧠 AI Assistant
            </button>
            
            <div className="flex items-center gap-3 px-4 py-2" style={{...glassStyle, padding: '8px 16px'}}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                S
              </div>
              <span>Steve Colburn</span>
            </div>
          </div>
        </header>

        {/* Dashboard Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div style={glassStyle} className="hover:transform hover:-translate-y-1 cursor-pointer">
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm text-gray-400 font-semibold">TOTAL BALANCE</div>
              <div className="text-xl">💎</div>
            </div>
            <div className="text-3xl font-bold mb-2" style={{
              background: 'linear-gradient(135deg, #e7ecf3 0%, #7c5cff 50%, #ff6b9d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              ${totalBalance.toLocaleString()}
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              +$2,340 this month
            </div>
          </div>

          <div style={glassStyle} className="hover:transform hover:-translate-y-1 cursor-pointer">
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm text-gray-400 font-semibold">MONTHLY SPENDING</div>
              <div className="text-xl">📊</div>
            </div>
            <div className="text-3xl font-bold mb-2" style={{
              background: 'linear-gradient(135deg, #e7ecf3 0%, #7c5cff 50%, #ff6b9d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              ${monthlySpending.toLocaleString()}
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/20 text-yellow-400">
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></div>
              15% above target
            </div>
          </div>

          <div style={glassStyle} className="hover:transform hover:-translate-y-1 cursor-pointer">
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm text-gray-400 font-semibold">AI CASH FLOW</div>
              <div className="text-xl">🎯</div>
            </div>
            <div className="text-3xl font-bold mb-2" style={{
              background: 'linear-gradient(135deg, #e7ecf3 0%, #7c5cff 50%, #ff6b9d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              +$1,247
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-pink-500/20 text-pink-400">
              <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse"></div>
              94% confidence
            </div>
          </div>

          <div style={glassStyle} className="hover:transform hover:-translate-y-1 cursor-pointer">
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm text-gray-400 font-semibold">AI HEALTH SCORE</div>
              <div className="text-xl">🧠</div>
            </div>
            <div className="text-3xl font-bold mb-2" style={{
              background: 'linear-gradient(135deg, #e7ecf3 0%, #7c5cff 50%, #ff6b9d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              8.7/10
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              Excellent
            </div>
          </div>
        </div>

        {/* AI Predictions Card */}
        <div style={{...glassStyle, border: '1px solid rgba(255, 107, 157, 0.2)', marginBottom: '24px'}}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="flex items-center gap-3 text-xl font-bold">
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #ff6b9d, #4ecdc4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(255, 107, 157, 0.3)'
              }}>
                🔮
              </div>
              AI Financial Predictions
            </h2>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-pink-500/20 text-pink-400">
              <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse"></div>
              Expert Level
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-pink-500/10 border border-pink-500/20 rounded-xl cursor-pointer hover:bg-pink-500/20 transition-all">
              <div className="text-2xl font-bold text-pink-400">247</div>
              <div className="text-xs text-gray-400">Transactions Analyzed</div>
            </div>
            <div className="text-center p-4 bg-pink-500/10 border border-pink-500/20 rounded-xl cursor-pointer hover:bg-pink-500/20 transition-all">
              <div className="text-2xl font-bold text-pink-400">$47/mo</div>
              <div className="text-xs text-gray-400">Savings Opportunity</div>
            </div>
            <div className="text-center p-4 bg-pink-500/10 border border-pink-500/20 rounded-xl cursor-pointer hover:bg-pink-500/20 transition-all">
              <div className="text-2xl font-bold text-pink-400">Tuesday</div>
              <div className="text-xs text-gray-400">Best Grocery Day</div>
            </div>
            <div className="text-center p-4 bg-pink-500/10 border border-pink-500/20 rounded-xl cursor-pointer hover:bg-pink-500/20 transition-all">
              <div className="text-2xl font-bold text-pink-400">3</div>
              <div className="text-xs text-gray-400">Unused Subscriptions</div>
            </div>
          </div>

          <div className="p-6 bg-pink-500/10 border border-pink-500/20 rounded-xl relative">
            <div className="absolute top-4 right-4 text-2xl opacity-60">🔮</div>
            <h4 className="text-pink-400 font-bold mb-3">💡 Cash Flow Prediction (Next 30 Days)</h4>
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-bold">+$1,247.83</span>
              <span className="text-xs text-gray-400">Confidence: 94.3%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 mb-3">
              <div 
                className="h-2 rounded-full transition-all duration-1000"
                style={{
                  width: '94%',
                  background: 'linear-gradient(90deg, #ff6b9d, #4ecdc4)'
                }}
              ></div>
            </div>
            <div className="text-xs text-gray-400">
              Based on your spending patterns: $89 groceries every Tuesday, rent in 12 days, and seasonal adjustment for August
            </div>
          </div>
        </div>

        {/* Cash Flow Tracker */}
        <div style={glassStyle} className="mb-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="flex items-center gap-3 text-xl font-bold">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                💰
              </div>
              Cash Flow to Next Payday
            </h3>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-400">
              🗓️ 12 days remaining
            </div>
          </div>

          <div className="text-center mb-6 p-4 bg-cyan-500/10 rounded-xl">
            <div className="text-2xl font-bold text-cyan-400 mb-1">Next Payday: Aug 29</div>
            <div className="text-gray-400">Expected: $3,247.85</div>
          </div>

          {/* Cash Flow Table */}
          <div className="bg-gray-800/50 rounded-xl overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-3 bg-purple-500/20 text-xs font-bold">
              <div>DATE</div>
              <div>DESCRIPTION</div>
              <div>AMOUNT</div>
              <div>BALANCE</div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 p-3 text-sm border-b border-gray-700">
              <div className="text-gray-400">8/17</div>
              <div className="font-semibold">💎 Current Total Balance</div>
              <div className="text-cyan-400 font-bold">$24,847</div>
              <div className="text-cyan-400 font-bold">$24,847</div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 p-3 text-sm border-b border-gray-700">
              <div className="text-gray-400">8/18</div>
              <div>☕ Starbucks (Predicted)</div>
              <div className="text-red-400 font-bold">-$6.50</div>
              <div className="font-bold">$24,841</div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 p-3 text-sm border-b border-gray-700">
              <div className="text-gray-400">8/20</div>
              <div>🥬 Grocery Shopping (Tuesday)</div>
              <div className="text-red-400 font-bold">-$89.00</div>
              <div className="font-bold">$24,752</div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 p-3 text-sm bg-green-500/20 border border-green-500/30">
              <div className="text-green-400 font-bold">8/29</div>
              <div className="text-green-400 font-bold">💰 PAYDAY - Direct Deposit</div>
              <div className="text-green-400 font-bold">+$3,248</div>
              <div className="text-green-400 font-bold text-lg">$27,649</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center p-3 bg-pink-500/10 rounded-xl">
              <div className="text-lg font-bold text-pink-400">$24,401</div>
              <div className="text-xs text-gray-400">Balance Before Payday</div>
            </div>
            <div className="text-center p-3 bg-green-500/10 rounded-xl">
              <div className="text-lg font-bold text-green-400">$27,649</div>
              <div className="text-xs text-gray-400">Balance After Payday</div>
            </div>
          </div>
        </div>

        {/* Account Cards */}
        <div style={glassStyle} className="mb-6">
          <h2 className="flex items-center gap-3 text-xl font-bold mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              🏦
            </div>
            Smart Account Management
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {demoAccounts.map(account => (
              <div key={account.id} style={glassStyle} className="hover:transform hover:-translate-y-1 cursor-pointer">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white ${
                      account.institution === 'chase' 
                        ? 'bg-gradient-to-br from-blue-600 to-blue-800' 
                        : 'bg-gradient-to-br from-red-600 to-red-800'
                    }`}>
                      {account.institution === 'chase' ? 'Chase' : 'BofA'}
                    </div>
                    <div>
                      <div className="font-bold">{account.name}</div>
                      <div className="text-xs text-gray-400">{account.type} ••••{account.mask}</div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-400">
                    Plaid Connected
                  </div>
                </div>
                <div className="text-2xl font-bold mb-2">${account.balance.toLocaleString()}</div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Last sync: 2 min ago • Plaid</span>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    Live
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction Stream */}
        <div style={glassStyle}>
          <h3 className="flex items-center gap-3 text-xl font-bold mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              ⚡
            </div>
            Intelligent Transaction Stream
          </h3>
          
          <div className="space-y-3">
            {demoTransactions.map(tx => (
              <div key={tx.id} className="flex justify-between items-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer hover:transform hover:translate-x-1">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                    tx.category === 'Food & Dining' ? 'bg-yellow-500/20' :
                    tx.category === 'Transportation' ? 'bg-blue-500/20' :
                    tx.category === 'Groceries' ? 'bg-green-500/20' :
                    'bg-cyan-500/20'
                  }`}>
                    {tx.category === 'Food & Dining' ? '☕' :
                     tx.category === 'Transportation' ? '🚗' :
                     tx.category === 'Groceries' ? '🥬' :
                     '💰'}
                  </div>
                  <div>
                    <div className="font-bold">{tx.merchant}</div>
                    <div className="text-xs text-gray-400">{tx.date} • {tx.account} • AI: 97%</div>
                    <div className="text-xs font-semibold text-purple-400">{tx.category}</div>
                  </div>
                </div>
                <div className={`text-lg font-bold ${tx.amount > 0 ? 'text-green-400' : 'text-white'}`}>
                  {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Assistant */}
      {aiAssistantOpen && (
        <div className="fixed bottom-5 right-5 w-80 max-h-96 z-50" style={{
          ...glassStyle,
          border: '1px solid #ff6b9d',
          boxShadow: '0 0 20px rgba(255, 107, 157, 0.3)'
        }}>
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-cyan-400 rounded-full flex items-center justify-center animate-pulse">
                🧠
              </div>
              <div>
                <div className="font-bold text-pink-400">Financial AI</div>
                <div className="text-xs text-gray-400">Your Personal Finance Assistant</div>
              </div>
            </div>
            <button 
              onClick={() => setAiAssistantOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="max-h-48 overflow-y-auto mb-4">
            {chatHistory.map((msg, i) => (
              <div key={i} className="mb-3 p-3 rounded-xl bg-pink-500/10 border border-pink-500/20">
                <strong className="text-pink-400">
                  {msg.type === 'ai' ? '🧠 AI Assistant:' : '👤 You:'}
                </strong>
                <br />
                {msg.message}
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
              placeholder="Ask me anything about your finances..."
              className="flex-1 px-3 py-2 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-400"
            />
            <button 
              onClick={handleChatSubmit}
              className="w-10 h-10 bg-gradient-to-br from-pink-500 to-cyan-400 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              🚀
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(1deg); }
        }
      `}</style>
    </div>
  );
};

export default PhenomenalFinancialTracker;
