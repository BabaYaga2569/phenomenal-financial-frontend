import React, { useState, useEffect } from 'react';

const PhenomenalFamilyTracker = () => {
  // Enhanced state management
  const [activeView, setActiveView] = useState('dashboard');
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const [aiChatInput, setAiChatInput] = useState('');
  const [aiMessages, setAiMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Family Financial Data - Enhanced Demo
  const [familyData] = useState({
    members: [
      {
        id: 'steve',
        name: 'Steve Colburn',
        nextPayday: '2025-08-29',
        payAmount: 3247.85,
        payFrequency: 'bi-weekly',
        accounts: ['chase_checking', 'bofa_savings']
      },
      {
        id: 'wife',
        name: 'Sarah Colburn', 
        nextPayday: '2025-08-25',
        payAmount: 2890.50,
        payFrequency: 'bi-weekly',
        accounts: ['wells_checking', 'ally_savings']
      }
    ],
    accounts: [
      {
        id: 'chase_checking',
        name: 'Chase Total Checking',
        owner: 'steve',
        balance: 14247.83,
        type: 'checking',
        lastSync: new Date()
      },
      {
        id: 'bofa_savings', 
        name: 'Bank of America Savings',
        owner: 'steve',
        balance: 10599.99,
        type: 'savings',
        lastSync: new Date()
      },
      {
        id: 'wells_checking',
        name: 'Wells Fargo Checking',
        owner: 'wife',
        balance: 8420.33,
        type: 'checking',
        lastSync: new Date()
      },
      {
        id: 'ally_savings',
        name: 'Ally Online Savings',
        owner: 'wife', 
        balance: 15780.45,
        type: 'savings',
        lastSync: new Date()
      }
    ],
    transactions: [
      { id: 1, merchant: 'Starbucks #1247', amount: -6.47, category: 'Food & Dining', date: '2025-08-17', accountId: 'chase_checking', owner: 'steve', aiConfidence: 97 },
      { id: 2, merchant: 'Uber Trip', amount: -14.23, category: 'Transportation', date: '2025-08-17', accountId: 'chase_checking', owner: 'steve', aiConfidence: 95 },
      { id: 3, merchant: 'Whole Foods Market', amount: -89.34, category: 'Groceries', date: '2025-08-16', accountId: 'chase_checking', owner: 'steve', aiConfidence: 98 },
      { id: 4, merchant: 'Steve Payroll', amount: 3247.85, category: 'Income', date: '2025-08-15', accountId: 'chase_checking', owner: 'steve', aiConfidence: 99 },
      { id: 5, merchant: 'Target Store', amount: -127.89, category: 'Shopping', date: '2025-08-14', accountId: 'wells_checking', owner: 'wife', aiConfidence: 94 },
      { id: 6, merchant: 'Sarah Payroll', amount: 2890.50, category: 'Income', date: '2025-08-13', accountId: 'wells_checking', owner: 'wife', aiConfidence: 99 },
      { id: 7, merchant: 'Shell Gas Station', amount: -52.34, category: 'Transportation', date: '2025-08-13', accountId: 'wells_checking', owner: 'wife', aiConfidence: 96 },
      { id: 8, merchant: 'Netflix Subscription', amount: -15.99, category: 'Entertainment', date: '2025-08-12', accountId: 'chase_checking', owner: 'steve', aiConfidence: 99 },
      { id: 9, merchant: 'Grocery Store', amount: -156.78, category: 'Groceries', date: '2025-08-11', accountId: 'wells_checking', owner: 'wife', aiConfidence: 98 },
      { id: 10, merchant: 'Rent Payment', amount: -1850.00, category: 'Housing', date: '2025-08-01', accountId: 'chase_checking', owner: 'steve', aiConfidence: 99 }
    ],
    predictedTransactions: [
      { date: '2025-08-18', description: 'Starbucks (Predicted)', amount: -6.50, owner: 'steve', confidence: 87 },
      { date: '2025-08-20', description: 'Grocery Shopping (Tuesday)', amount: -89.00, owner: 'steve', confidence: 94 },
      { date: '2025-08-22', description: 'Comcast Internet Bill', amount: -89.99, owner: 'steve', confidence: 99 },
      { date: '2025-08-25', description: 'SARAH PAYDAY', amount: 2890.50, owner: 'wife', confidence: 99 },
      { date: '2025-08-25', description: 'PG&E Electric Bill', amount: -127.00, owner: 'steve', confidence: 92 },
      { date: '2025-08-29', description: 'STEVE PAYDAY', amount: 3247.85, owner: 'steve', confidence: 99 }
    ],
    bills: [
      { name: 'Rent', amount: 1850, due: '2025-08-30', owner: 'steve', type: 'housing' },
      { name: 'Electric', amount: 127, due: '2025-08-25', owner: 'steve', type: 'utilities' },
      { name: 'Internet', amount: 89.99, due: '2025-08-22', owner: 'steve', type: 'utilities' },
      { name: 'Car Payment', amount: 485, due: '2025-08-28', owner: 'wife', type: 'transportation' }
    ]
  });

  // AI Responses
  const aiResponses = {
    cashflow: [
      "Based on your family's dual-income pattern, I predict excellent cash flow! Steve's next payday is Aug 29 ($3,247), Sarah's is Aug 25 ($2,890). Your combined monthly income is $12,276 with current spending at $8,934. That's a healthy 27% savings rate!",
      "Your family cash flow analysis shows Steve has $24,847 total available, Sarah has $24,200. Until next paydays, you have $3,894 combined daily spending capacity. Very strong financial position!"
    ],
    family: [
      "I love analyzing dual-income families! Your household income timing is perfectly staggered - Sarah gets paid 4 days before Steve, which smooths cash flow beautifully. This natural offset prevents any cash crunches.",
      "Family financial health score: 9.2/10! Steve's Tuesday grocery shopping saves money, Sarah's consistent savings transfers show discipline. Combined you're ahead of 92% of households your age!"
    ],
    optimization: [
      "Smart family opportunity: Consolidate your 4 accounts into 2 high-yield savings for better interest. Also, coordinate your grocery shopping - Steve's Tuesday pattern at Whole Foods is optimal, Sarah should join this routine!",
      "I notice Steve spends $124/month on coffee while Sarah spends $34. Suggest making coffee at home together - save $118/month ($1,416/year) while spending quality time!"
    ]
  };

  // Initialize loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setAiMessages([{
        type: 'ai',
        message: "Hello Steve and Sarah! I've analyzed your family's financial data across 4 accounts. Your dual-income setup is excellent with perfectly staggered paydays. Want to see your combined cash flow prediction?",
        timestamp: new Date()
      }]);
    }, 2000);
  }, []);

  // Calculate totals
  const totalBalance = familyData.accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const monthlyIncome = familyData.members.reduce((sum, member) => sum + (member.payAmount * 2), 0);
  const monthlySpending = familyData.transactions
    .filter(t => t.amount < 0 && new Date(t.date).getMonth() === 7)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // Cash flow until next paydays
  const getCashFlowToNextPaydays = () => {
    const today = new Date('2025-08-17');
    const stevePayday = new Date('2025-08-29');
    const sarahPayday = new Date('2025-08-25');
    
    const steveDays = Math.ceil((stevePayday - today) / (1000 * 60 * 60 * 24));
    const sarahDays = Math.ceil((sarahPayday - today) / (1000 * 60 * 60 * 24));
    
    return {
      steve: { days: steveDays, amount: 3247.85 },
      sarah: { days: sarahDays, amount: 2890.50 }
    };
  };

  const nextPaydays = getCashFlowToNextPaydays();

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // AI Assistant Functions
  const handleAIMessage = () => {
    if (!aiChatInput.trim()) return;
    
    setAiMessages(prev => [...prev, {
      type: 'user',
      message: aiChatInput,
      timestamp: new Date()
    }]);
    
    setTimeout(() => {
      const response = generateAIResponse(aiChatInput);
      setAiMessages(prev => [...prev, {
        type: 'ai', 
        message: response,
        timestamp: new Date()
      }]);
    }, 1000);
    
    setAiChatInput('');
  };

  const generateAIResponse = (message) => {
    const msg = message.toLowerCase();
    
    if (msg.includes('cash flow') || msg.includes('payday')) {
      return aiResponses.cashflow[Math.floor(Math.random() * aiResponses.cashflow.length)];
    }
    
    if (msg.includes('family') || msg.includes('wife') || msg.includes('sarah')) {
      return aiResponses.family[Math.floor(Math.random() * aiResponses.family.length)];
    }
    
    if (msg.includes('save') || msg.includes('optimize')) {
      return aiResponses.optimization[Math.floor(Math.random() * aiResponses.optimization.length)];
    }
    
    return "I'm analyzing your family's financial data with 247 transactions across 4 accounts. Your dual-income pattern with staggered paydays creates excellent cash flow stability. What specific aspect would you like me to analyze?";
  };

  // Export Functions
  const exportData = (type) => {
    const timestamp = new Date().toISOString().split('T')[0];
    
    switch(type) {
      case 'cashflow':
        exportCashFlowData(timestamp);
        break;
      case 'transactions':
        exportTransactionsData(timestamp);
        break;
      case 'family-budget':
        exportFamilyBudget(timestamp);
        break;
      case 'ai-report':
        exportAIReport(timestamp);
        break;
    }
    
    setShowExportModal(false);
  };

  const exportCashFlowData = (timestamp) => {
    const csvContent = [
      ['Phenomenal Family Financial Tracker - Cash Flow Analysis'],
      ['Generated:', new Date().toLocaleString()],
      [''],
      ['FAMILY MEMBERS'],
      ['Name', 'Next Payday', 'Pay Amount', 'Days Until Payday'],
      ['Steve Colburn', '2025-08-29', '$3,247.85', nextPaydays.steve.days],
      ['Sarah Colburn', '2025-08-25', '$2,890.50', nextPaydays.sarah.days],
      [''],
      ['ACCOUNT BALANCES'],
      ['Account', 'Owner', 'Balance', 'Type'],
      ...familyData.accounts.map(acc => [
        acc.name, 
        acc.owner === 'steve' ? 'Steve' : 'Sarah',
        formatCurrency(acc.balance),
        acc.type
      ]),
      [''],
      ['RUNNING BALANCE TO NEXT PAYDAYS'],
      ['Date', 'Description', 'Amount', 'Owner', 'Running Balance'],
      ['8/17/2025', 'Current Family Total', formatCurrency(totalBalance), 'Combined', formatCurrency(totalBalance)],
      ...familyData.predictedTransactions.map((tx, i) => [
        tx.date,
        tx.description,
        tx.amount > 0 ? `+${formatCurrency(tx.amount)}` : formatCurrency(tx.amount),
        tx.owner === 'steve' ? 'Steve' : 'Sarah',
        formatCurrency(totalBalance + (i + 1) * 100) // Simplified calculation for demo
      ])
    ];
    
    downloadCSV(csvContent, `family-cashflow-${timestamp}.csv`);
  };

  const exportTransactionsData = (timestamp) => {
    const csvContent = [
      ['Date', 'Merchant', 'Amount', 'Category', 'Owner', 'Account', 'AI_Confidence'],
      ...familyData.transactions.map(tx => [
        tx.date,
        tx.merchant,
        tx.amount,
        tx.category,
        tx.owner === 'steve' ? 'Steve' : 'Sarah',
        familyData.accounts.find(acc => acc.id === tx.accountId)?.name || '',
        `${tx.aiConfidence}%`
      ])
    ];
    
    downloadCSV(csvContent, `family-transactions-${timestamp}.csv`);
  };

  const exportFamilyBudget = (timestamp) => {
    const csvContent = [
      ['Phenomenal Family Budget Analysis'],
      ['Month:', 'August 2025'],
      [''],
      ['INCOME'],
      ['Source', 'Amount', 'Frequency'],
      ['Steve Payroll', '$3,247.85', 'Bi-weekly'],
      ['Sarah Payroll', '$2,890.50', 'Bi-weekly'],
      ['Total Monthly', formatCurrency(monthlyIncome), ''],
      [''],
      ['EXPENSES'],
      ['Category', 'Budgeted', 'Actual', 'Difference'],
      ['Housing', '$1,850', '$1,850', '$0'],
      ['Groceries', '$500', '$246', '-$254'],
      ['Transportation', '$400', '$351', '-$49'],
      ['Food & Dining', '$300', '$178', '-$122'],
      ['Entertainment', '$150', '$16', '-$134'],
      [''],
      ['SUMMARY'],
      ['Total Income', formatCurrency(monthlyIncome)],
      ['Total Expenses', formatCurrency(monthlySpending)],
      ['Net Savings', formatCurrency(monthlyIncome - monthlySpending)],
      ['Savings Rate', `${((monthlyIncome - monthlySpending) / monthlyIncome * 100).toFixed(1)}%`]
    ];
    
    downloadCSV(csvContent, `family-budget-${timestamp}.csv`);
  };

  const exportAIReport = (timestamp) => {
    const reportContent = `
PHENOMENAL FAMILY FINANCIAL TRACKER - AI ANALYSIS REPORT
Generated: ${new Date().toLocaleString()}

FAMILY OVERVIEW:
• Steve Colburn - Next payday: Aug 29 ($3,247.85)
• Sarah Colburn - Next payday: Aug 25 ($2,890.50)
• Combined monthly income: ${formatCurrency(monthlyIncome)}
• Total family net worth: ${formatCurrency(totalBalance)}

FINANCIAL HEALTH SCORE: 9.2/10 (Excellent)

KEY AI INSIGHTS:
• Dual-income timing is perfectly staggered (4-day offset)
• Steve's Tuesday grocery pattern saves $67/month
• Sarah's savings discipline: +$500/month transfers
• Coffee optimization opportunity: Save $118/month
• Emergency fund: 89% complete ($${(totalBalance * 0.6).toFixed(0)})

CASH FLOW ANALYSIS:
• Days until Steve's payday: ${nextPaydays.steve.days}
• Days until Sarah's payday: ${nextPaydays.sarah.days}
• Combined spending capacity: $${(totalBalance / 30).toFixed(0)}/day
• Predicted month-end balance: ${formatCurrency(totalBalance + 2000)}

RECOMMENDATIONS:
1. Consolidate to 2 high-yield savings accounts
2. Coordinate grocery shopping (both use Steve's Tuesday routine)
3. Set up automatic bill pay to leverage Sarah's early payday
4. Consider joint coffee budget of $50/month (currently $158)
5. Increase emergency fund auto-transfer by $200/month

SPENDING PATTERNS:
• Steve: Higher food/dining, consistent income timing
• Sarah: More shopping/household, excellent savings rate
• Combined: 27% savings rate (target achieved!)

This AI analysis is based on ${familyData.transactions.length} transactions with 96.7% accuracy.
Family financial health rank: Top 8% of households.
    `;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `family-ai-report-${timestamp}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadCSV = (data, filename) => {
    const csv = data.map(row => 
      Array.isArray(row) ? row.map(cell => 
        typeof cell === 'string' && cell.includes(',') ? `"${cell}"` : cell
      ).join(',') : row
    ).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Modal Functions
  const showModal = (title, content) => {
    setModalContent({ title, content });
    setShowDetailsModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Phenomenal Family Tracker</h2>
          <p className="text-purple-300">Analyzing family financial data across 4 accounts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="backdrop-blur-lg bg-black/20 border-b border-purple-500/20 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl">
              🧠
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Phenomenal Family Financial Tracker
              </h1>
              <p className="text-purple-300 text-sm">AI-Powered • Dual-Income Intelligence • Live Predictions</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">4 Accounts Connected</span>
            </div>
            
            <button 
              onClick={() => setShowAIAssistant(true)}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
            >
              🧠 AI Assistant
            </button>
            
            <button 
              onClick={() => setShowExportModal(true)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
            >
              📊 Export Data
            </button>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center text-sm font-bold">
                S
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
                S
              </div>
              <span className="text-purple-300">Steve & Sarah</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* AI Enhanced Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div 
            onClick={() => showModal('Family Net Worth', `
              <div className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl">
                  <div className="text-4xl font-bold text-green-400">${formatCurrency(totalBalance)}</div>
                  <div className="text-purple-300">Combined Family Wealth</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  ${familyData.accounts.map(acc => `
                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="font-semibold">${acc.name}</div>
                      <div className="text-2xl font-bold text-blue-400">${formatCurrency(acc.balance)}</div>
                      <div className="text-sm text-purple-300">${acc.owner === 'steve' ? 'Steve' : 'Sarah'}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `)}
            className="bg-white/10 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6 cursor-pointer hover:bg-white/15 transition-all hover:scale-105"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-purple-300">Family Net Worth</span>
              <span className="text-2xl">💎</span>
            </div>
            <div className="text-3xl font-bold text-green-400 mb-2">{formatCurrency(totalBalance)}</div>
            <div className="text-sm text-green-400">+$2,847 this month</div>
          </div>
          
          <div 
            onClick={() => showModal('Monthly Income', `
              <div className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl">
                  <div className="text-4xl font-bold text-purple-400">${formatCurrency(monthlyIncome)}</div>
                  <div className="text-purple-300">Combined Monthly Income</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                    <span>Steve (Bi-weekly)</span>
                    <span className="font-bold">${formatCurrency(familyData.members[0].payAmount * 2)}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                    <span>Sarah (Bi-weekly)</span>
                    <span className="font-bold">${formatCurrency(familyData.members[1].payAmount * 2)}</span>
                  </div>
                </div>
              </div>
            `)}
            className="bg-white/10 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6 cursor-pointer hover:bg-white/15 transition-all hover:scale-105"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-purple-300">Monthly Income</span>
              <span className="text-2xl">💰</span>
            </div>
            <div className="text-3xl font-bold text-purple-400 mb-2">{formatCurrency(monthlyIncome)}</div>
            <div className="text-sm text-purple-400">Dual-income family</div>
          </div>
          
          <div 
            onClick={() => showModal('Next Paydays', `
              <div className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-xl">
                  <div className="text-2xl font-bold text-blue-400">Staggered Paydays</div>
                  <div className="text-purple-300">Perfectly Timed Cash Flow</div>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">Sarah's Payday</div>
                        <div className="text-sm text-purple-300">Aug 25, 2025</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-400">${formatCurrency(familyData.members[1].payAmount)}</div>
                        <div className="text-sm text-green-400">${nextPaydays.sarah.days} days</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">Steve's Payday</div>
                        <div className="text-sm text-purple-300">Aug 29, 2025</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-400">${formatCurrency(familyData.members[0].payAmount)}</div>
                        <div className="text-sm text-green-400">${nextPaydays.steve.days} days</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `)}
            className="bg-white/10 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6 cursor-pointer hover:bg-white/15 transition-all hover:scale-105"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-purple-300">Next Paydays</span>
              <span className="text-2xl">📅</span>
            </div>
            <div className="text-3xl font-bold text-blue-400 mb-2">{Math.min(nextPaydays.steve.days, nextPaydays.sarah.days)} days</div>
            <div className="text-sm text-blue-400">Sarah: {nextPaydays.sarah.days}d, Steve: {nextPaydays.steve.days}d</div>
          </div>
          
          <div 
            onClick={() => showModal('AI Health Score', `
              <div className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-br from-green-500/20 to-yellow-500/20 rounded-xl">
                  <div className="text-4xl font-bold text-green-400">9.2/10</div>
                  <div className="text-purple-300">Family Financial Health</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                    <span>Savings Rate</span>
                    <span className="text-green-400 font-bold">27.2%</span>
                  </div>
                  <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                    <span>Budget Adherence</span>
                    <span className="text-green-400 font-bold">94.1%</span>
                  </div>
                  <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                    <span>Cash Flow Stability</span>
                    <span className="text-green-400 font-bold">9.8/10</span>
                  </div>
                  <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                    <span>Emergency Fund</span>
                    <span className="text-yellow-400 font-bold">89%</span>
                  </div>
                </div>
              </div>
            `)}
            className="bg-white/10 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6 cursor-pointer hover:bg-white/15 transition-all hover:scale-105"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-purple-300">AI Health Score</span>
              <span className="text-2xl">🎯</span>
            </div>
            <div className="text-3xl font-bold text-green-400 mb-2">9.2/10</div>
            <div className="text-sm text-green-400">Excellent</div>
          </div>
        </div>

        {/* Cash Flow to Next Paydays - Google Sheets Style */}
        <div className="bg-white/10 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <span className="text-3xl">💰</span>
              Family Cash Flow to Next Paydays
            </h2>
            <div className="flex gap-2">
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg px-3 py-1">
                <span className="text-blue-400 text-sm">Sarah: {nextPaydays.sarah.days} days</span>
              </div>
              <div className="bg-green-600/20 border border-green-500/30 rounded-lg px-3 py-1">
                <span className="text-green-400 text-sm">Steve: {nextPaydays.steve.days} days</span>
              </div>
            </div>
          </div>

          {/* Google Sheets Style Table */}
          <div className="bg-black/20 rounded-lg overflow-hidden">
            <div className="grid grid-cols-5 gap-1 p-3 bg-purple-600/20 border-b border-purple-500/20 font-semibold text-sm">
              <div>DATE</div>
              <div>DESCRIPTION</div>
              <div>AMOUNT</div>
              <div>OWNER</div>
              <div>FAMILY BALANCE</div>
            </div>
            
            {/* Current Balance */}
            <div className="grid grid-cols-5 gap-1 p-3 border-b border-purple-500/10 bg-blue-600/10">
              <div className="text-purple-300">8/17/25</div>
              <div className="font-semibold">💎 Current Family Total</div>
              <div className="text-blue-400 font-bold">{formatCurrency(totalBalance)}</div>
              <div className="text-purple-300">Combined</div>
              <div className="text-blue-400 font-bold">{formatCurrency(totalBalance)}</div>
            </div>

            {/* Predicted Transactions */}
            {familyData.predictedTransactions.map((tx, index) => {
              const runningBalance = totalBalance + (index + 1) * (tx.amount > 0 ? tx.amount : tx.amount);
              const isPayday = tx.description.includes('PAYDAY');
              const isExpense = tx.amount < 0;
              
              return (
                <div 
                  key={index}
                  className={`grid grid-cols-5 gap-1 p-3 border-b border-purple-500/10 ${
                    isPayday ? 'bg-green-600/10' : isExpense ? 'bg-red-600/10' : 'bg-white/5'
                  }`}
                >
                  <div className="text-purple-300">{new Date(tx.date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}</div>
                  <div className={`${isPayday ? 'font-bold text-green-400' : ''}`}>
                    {isPayday && '💰 '}{tx.description}
                  </div>
                  <div className={`font-bold ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                  </div>
                  <div className="text-purple-300">
                    {tx.owner === 'steve' ? 'Steve' : 'Sarah'}
                  </div>
                  <div className={`font-bold ${runningBalance > totalBalance ? 'text-green-400' : 'text-blue-400'}`}>
                    {formatCurrency(runningBalance)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{formatCurrency(totalBalance / 30)}</div>
              <div className="text-purple-300 text-sm">Daily Spend Capacity</div>
            </div>
            <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{formatCurrency(6138.35)}</div>
              <div className="text-green-300 text-sm">Combined Next Paydays</div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-purple-600/10 border border-purple-500/20 rounded-lg">
            <span className="text-purple-400 font-semibold">🧠 AI Family Insight: </span>
            <span className="text-purple-200">
              Your staggered payday timing is perfect! Sarah's Aug 25 payday provides cash flow 4 days before Steve's Aug 29 payday. 
              This creates natural financial stability with no cash crunches. Family spending capacity: {formatCurrency(totalBalance / 30)}/day until next paydays.
            </span>
          </div>
        </div>

        {/* Family Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {familyData.accounts.map(account => (
            <div 
              key={account.id}
              onClick={() => showModal(`${account.name} Details`, `
                <div className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
                    <div className="text-4xl font-bold text-blue-400">${formatCurrency(account.balance)}</div>
                    <div className="text-purple-300">${account.name}</div>
                    <div className="text-sm text-purple-400">${account.owner === 'steve' ? 'Steve Colburn' : 'Sarah Colburn'}</div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-purple-300">Recent Transactions:</h4>
                    ${familyData.transactions
                      .filter(tx => tx.accountId === account.id)
                      .slice(0, 5)
                      .map(tx => `
                        <div className="flex justify-between p-2 bg-white/5 rounded">
                          <div>
                            <div className="font-medium">${tx.merchant}</div>
                            <div className="text-sm text-purple-300">${tx.date}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}">
                              ${tx.amount > 0 ? '+' : ''}${formatCurrency(Math.abs(tx.amount))}
                            </div>
                            <div className="text-sm text-purple-300">${tx.category}</div>
                          </div>
                        </div>
                      `).join('')}
                  </div>
                </div>
              `)}
              className="bg-white/10 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6 cursor-pointer hover:bg-white/15 transition-all hover:scale-105"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-bold text-lg">{account.name}</h3>
                  <p className="text-purple-300 text-sm">{account.owner === 'steve' ? 'Steve' : 'Sarah'} • {account.type}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  {account.type === 'checking' ? '🏦' : '💰'}
                </div>
              </div>
              
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {formatCurrency(account.balance)}
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm">Synced 2 min ago</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white/10 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-3xl">⚡</span>
            Recent Family Transactions
          </h2>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {familyData.transactions.slice(0, 10).map(tx => (
              <div 
                key={tx.id}
                onClick={() => showModal(`Transaction: ${tx.merchant}`, `
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl">
                      <div className="text-4xl font-bold ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}">
                        ${tx.amount > 0 ? '+' : ''}${formatCurrency(Math.abs(tx.amount))}
                      </div>
                      <div className="text-purple-300">${tx.merchant}</div>
                      <div className="text-sm text-purple-400">${tx.date} • ${tx.owner === 'steve' ? 'Steve' : 'Sarah'}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="text-sm text-purple-300">Category</div>
                        <div className="font-semibold">${tx.category}</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="text-sm text-purple-300">AI Confidence</div>
                        <div className="font-semibold">${tx.aiConfidence}%</div>
                      </div>
                    </div>
                  </div>
                `)}
                className="flex justify-between items-center p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    {tx.category === 'Income' ? '💰' : 
                     tx.category === 'Groceries' ? '🥬' : 
                     tx.category === 'Transportation' ? '🚗' : 
                     tx.category === 'Food & Dining' ? '🍕' : '🛍️'}
                  </div>
                  <div>
                    <div className="font-semibold">{tx.merchant}</div>
                    <div className="text-sm text-purple-300">
                      {tx.date} • {tx.owner === 'steve' ? 'Steve' : 'Sarah'} • AI: {tx.aiConfidence}%
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-bold ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {tx.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(tx.amount))}
                  </div>
                  <div className="text-sm text-purple-300">{tx.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Assistant Modal */}
      {showAIAssistant && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900/90 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6 max-w-md w-full max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  🧠
                </div>
                <div>
                  <h3 className="font-bold text-lg">Family AI Assistant</h3>
                  <p className="text-purple-300 text-sm">Analyzing 4 accounts & dual income</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAIAssistant(false)}
                className="text-purple-300 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-60">
              {aiMessages.map((msg, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg ${
                    msg.type === 'ai' 
                      ? 'bg-purple-600/20 border border-purple-500/30' 
                      : 'bg-blue-600/20 border border-blue-500/30'
                  }`}
                >
                  <div className="font-semibold text-sm mb-1">
                    {msg.type === 'ai' ? '🧠 Family AI:' : '👤 You:'}
                  </div>
                  <div className="text-sm">{msg.message}</div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={aiChatInput}
                onChange={(e) => setAiChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAIMessage()}
                placeholder="Ask about family finances..."
                className="flex-1 bg-white/10 border border-purple-500/30 rounded-lg px-3 py-2 text-white placeholder-purple-300"
              />
              <button 
                onClick={handleAIMessage}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
              >
                🚀
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900/90 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">📊 Export Family Data</h3>
              <button 
                onClick={() => setShowExportModal(false)}
                className="text-purple-300 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => exportData('cashflow')}
                className="w-full p-4 bg-green-600/20 border border-green-500/30 rounded-lg hover:bg-green-600/30 transition-colors text-left"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-green-400">💰 Family Cash Flow Tracker</div>
                    <div className="text-sm text-green-300">Google Sheets style with paydays</div>
                  </div>
                  <span className="text-2xl">💾</span>
                </div>
              </button>
              
              <button 
                onClick={() => exportData('transactions')}
                className="w-full p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-colors text-left"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-blue-400">📊 All Transactions CSV</div>
                    <div className="text-sm text-blue-300">With AI categorization & confidence</div>
                  </div>
                  <span className="text-2xl">📋</span>
                </div>
              </button>
              
              <button 
                onClick={() => exportData('family-budget')}
                className="w-full p-4 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-colors text-left"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-purple-400">📈 Family Budget Analysis</div>
                    <div className="text-sm text-purple-300">Combined income & spending breakdown</div>
                  </div>
                  <span className="text-2xl">📊</span>
                </div>
              </button>
              
              <button 
                onClick={() => exportData('ai-report')}
                className="w-full p-4 bg-pink-600/20 border border-pink-500/30 rounded-lg hover:bg-pink-600/30 transition-colors text-left"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-pink-400">🧠 AI Family Report</div>
                    <div className="text-sm text-pink-300">Complete analysis with insights</div>
                  </div>
                  <span className="text-2xl">📄</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900/90 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">{modalContent.title}</h3>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="text-purple-300 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>
            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: modalContent.content }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PhenomenalFamilyTracker;
