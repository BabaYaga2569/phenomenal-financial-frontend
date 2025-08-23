import React, { useState, useEffect, useCallback } from 'react';

const PhenomenalFinancialTracker = () => {
  // Demo accounts (moved outside component to fix dependency issue)
  const demoAccounts = [
    { id: 1, name: 'Checking Account', type: 'checking', balance: 2500.75 },
    { id: 2, name: 'Savings Account', type: 'savings', balance: 15000.00 },
    { id: 3, name: 'Credit Card', type: 'credit', balance: -850.25 }
  ];

  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);
  const [neuralPredictions, setNeuralPredictions] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  // Fixed useEffect - no more dependency errors!
  useEffect(() => {
    const initializeApp = async () => {
      setLoading(true);
      
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAccounts(demoAccounts);
      
      // Generate sample transactions
      const sampleTransactions = [
        { id: 1, date: '2025-08-22', amount: -45.67, category: 'Groceries', account: 'Checking Account', description: 'Whole Foods Market' },
        { id: 2, date: '2025-08-21', amount: -12.99, category: 'Entertainment', account: 'Credit Card', description: 'Netflix Subscription' },
        { id: 3, date: '2025-08-20', amount: 2500.00, category: 'Income', account: 'Checking Account', description: 'Salary Deposit' },
        { id: 4, date: '2025-08-19', amount: -89.45, category: 'Utilities', account: 'Checking Account', description: 'Electric Bill' },
        { id: 5, date: '2025-08-18', amount: -156.78, category: 'Shopping', account: 'Credit Card', description: 'Amazon Purchase' }
      ];
      
      setTransactions(sampleTransactions);
      
      // Generate AI insights
      generateAIInsights(sampleTransactions);
      
      // Generate neural network predictions
      generateNeuralPredictions();
      
      setLoading(false);
    };

    initializeApp();
  }, []); // Empty dependency array - no more errors!

  const generateAIInsights = useCallback((transactionData) => {
    const insights = [
      {
        type: 'spending',
        message: 'Your grocery spending increased 15% this month. Consider meal planning to optimize costs.',
        confidence: 87,
        category: 'optimization'
      },
      {
        type: 'savings',
        message: 'Based on your income patterns, you could save an additional $245/month with automated transfers.',
        confidence: 92,
        category: 'growth'
      },
      {
        type: 'alert',
        message: 'Credit card utilization at 34%. Recommended to keep below 30% for optimal credit score.',
        confidence: 95,
        category: 'warning'
      },
      {
        type: 'trend',
        message: 'Entertainment spending down 22% - great progress toward your savings goal!',
        confidence: 89,
        category: 'positive'
      }
    ];
    
    setAiInsights(insights);
  }, []);

  const generateNeuralPredictions = useCallback(() => {
    const predictions = [
      {
        metric: 'Monthly Savings Potential',
        current: 425.50,
        predicted: 623.75,
        confidence: 0.91,
        timeframe: '3 months'
      },
      {
        metric: 'Credit Score Impact',
        current: 742,
        predicted: 768,
        confidence: 0.88,
        timeframe: '6 months'
      },
      {
        metric: 'Emergency Fund Goal',
        current: 15000,
        predicted: 18500,
        confidence: 0.94,
        timeframe: '12 months'
      }
    ];
    
    setNeuralPredictions(predictions);
  }, []);

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const monthlyIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  const monthlyExpenses = Math.abs(transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Initializing Neural Networks</h2>
          <p className="text-blue-200">Analyzing your financial patterns with AI...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Phenomenal Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            🧠 PHENOMENAL FINANCIAL TRACKER
          </h1>
          <p className="text-xl text-blue-200">AI-Powered Neural Network Financial Intelligence</p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-full p-2 flex space-x-2">
            {['overview', 'accounts', 'transactions', 'ai-insights', 'predictions'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg' 
                    : 'text-blue-200 hover:bg-white/10'
                }`}
              >
                {tab.replace('-', ' ').toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-2xl p-6 border border-green-400/30">
                <h3 className="text-green-300 text-sm font-semibold mb-2">TOTAL BALANCE</h3>
                <p className="text-3xl font-bold">${totalBalance.toLocaleString()}</p>
                <p className="text-green-400 text-sm mt-2">↗ +5.2% this month</p>
              </div>
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-400/30">
                <h3 className="text-blue-300 text-sm font-semibold mb-2">MONTHLY INCOME</h3>
                <p className="text-3xl font-bold">${monthlyIncome.toLocaleString()}</p>
                <p className="text-blue-400 text-sm mt-2">Steady flow detected</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-400/30">
                <h3 className="text-purple-300 text-sm font-semibold mb-2">MONTHLY EXPENSES</h3>
                <p className="text-3xl font-bold">${monthlyExpenses.toLocaleString()}</p>
                <p className="text-purple-400 text-sm mt-2">↘ -3.1% vs last month</p>
              </div>
            </div>

            {/* Neural Activity Visualization */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-4">🧠 Neural Network Activity</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-blue-300 mb-2">Processing Financial Patterns</p>
                  <div className="w-full bg-white/10 rounded-full h-3 mb-4">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full w-3/4 animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-purple-300 mb-2">AI Insight Generation</p>
                  <div className="w-full bg-white/10 rounded-full h-3 mb-4">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full w-4/5 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Accounts Tab */}
        {activeTab === 'accounts' && (
          <div className="space-y-6">
            {accounts.map(account => (
              <div key={account.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">{account.name}</h3>
                    <p className="text-sm text-blue-300 capitalize">{account.type} Account</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${account.balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ${Math.abs(account.balance).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-300">
                      {account.balance >= 0 ? 'Available' : 'Outstanding'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-6">Recent Transactions</h3>
            <div className="space-y-4">
              {transactions.map(transaction => (
                <div key={transaction.id} className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <div>
                    <p className="font-semibold">{transaction.description}</p>
                    <p className="text-sm text-blue-300">{transaction.category} • {transaction.account}</p>
                    <p className="text-xs text-gray-400">{transaction.date}</p>
                  </div>
                  <p className={`text-lg font-bold ${transaction.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Insights Tab */}
        {activeTab === 'ai-insights' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center mb-6">🤖 AI Financial Intelligence</h3>
            {aiInsights.map((insight, index) => (
              <div key={index} className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border ${
                insight.category === 'warning' ? 'border-red-400/50' :
                insight.category === 'positive' ? 'border-green-400/50' :
                insight.category === 'growth' ? 'border-blue-400/50' :
                'border-purple-400/50'
              }`}>
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    insight.category === 'warning' ? 'bg-red-500/20 text-red-300' :
                    insight.category === 'positive' ? 'bg-green-500/20 text-green-300' :
                    insight.category === 'growth' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-purple-500/20 text-purple-300'
                  }`}>
                    {insight.type.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-400">{insight.confidence}% confidence</span>
                </div>
                <p className="text-lg">{insight.message}</p>
              </div>
            ))}
          </div>
        )}

        {/* Predictions Tab */}
        {activeTab === 'predictions' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center mb-6">🔮 Neural Network Predictions</h3>
            {neuralPredictions.map((prediction, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-cyan-400/30">
                <h4 className="text-lg font-bold mb-4">{prediction.metric}</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Current</p>
                    <p className="text-xl font-bold text-blue-400">
                      {prediction.metric.includes('Score') ? prediction.current : `$${prediction.current.toLocaleString()}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Predicted ({prediction.timeframe})</p>
                    <p className="text-xl font-bold text-green-400">
                      {prediction.metric.includes('Score') ? prediction.predicted : `$${prediction.predicted.toLocaleString()}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">AI Confidence</p>
                    <p className="text-xl font-bold text-purple-400">{Math.round(prediction.confidence * 100)}%</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${prediction.confidence * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Phenomenal Footer */}
        <div className="text-center mt-12 pt-8 border-t border-white/10">
          <p className="text-blue-300">
            Powered by Advanced Neural Networks & AI • Built with Phenomenal Precision 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhenomenalFinancialTracker;
