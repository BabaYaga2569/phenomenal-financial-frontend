import React, { useState, useEffect, useRef } from 'react';

const PhenomenalFinancialTracker = () => {
  // Enhanced state management
  const [activeView, setActiveView] = useState('dashboard');
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showPlaidModal, setShowPlaidModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const [aiChatInput, setAiChatInput] = useState('');
  const [aiMessages, setAiMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connectionProgress, setConnectionProgress] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const neuralCanvasRef = useRef(null);

  // Enhanced Demo Data - Matches HTML version
  const [appData] = useState({
    user: {
      name: 'Steve Colburn',
      avatar: 'S'
    },
    totals: {
      netWorth: 24847.82,
      monthlySpending: -2891.47,
      connectedBanks: 2,
      totalTransactions: 247,
      predictedCashFlow: 1247.83,
      aiHealthScore: 8.7,
      confidenceScore: 94.3
    },
    ai: {
      status: 'Expert Level',
      patternsLearned: 347,
      accuracyScore: 96.7,
      modelsActive: 15,
      dataPoints: 2847
    },
    accounts: [
      {
        id: 'chase_checking',
        name: 'Chase Total Checking',
        institution: 'Chase',
        balance: 14247.83,
        mask: '••••4829',
        type: 'Checking',
        lastSync: new Date(),
        connected: true
      },
      {
        id: 'bofa_savings',
        name: 'Bank of America Advantage', 
        institution: 'BofA',
        balance: 10599.99,
        mask: '••••7392',
        type: 'Savings',
        lastSync: new Date(),
        connected: true
      }
    ],
    transactions: [
      { id: 1, merchant: 'Starbucks #1247', amount: -6.47, category: 'Food & Dining', date: '2025-08-17', confidence: 97, account: 'Chase ••4829', new: true },
      { id: 2, merchant: 'Uber Trip', amount: -14.23, category: 'Transportation', date: '2025-08-17', confidence: 95, account: 'Chase ••4829', new: true },
      { id: 3, merchant: 'Whole Foods Market', amount: -89.34, category: 'Groceries', date: '2025-08-16', confidence: 98, account: 'Chase ••4829' },
      { id: 4, merchant: 'Payroll Direct Deposit', amount: 3247.85, category: 'Income', date: '2025-08-15', confidence: 99, account: 'Chase ••4829' },
      { id: 5, merchant: 'Target Store #1847', amount: -127.89, category: 'Shopping', date: '2025-08-14', confidence: 94, account: 'Chase ••4829' },
      { id: 6, merchant: 'Shell Gas Station', amount: -52.34, category: 'Transportation', date: '2025-08-13', confidence: 96, account: 'BofA ••7392' }
    ],
    predictions: [
      { date: '2025-08-18', description: 'Starbucks (Predicted)', amount: -6.50, confidence: 87 },
      { date: '2025-08-20', description: 'Grocery Shopping (Tuesday)', amount: -89.00, confidence: 94 },
      { date: '2025-08-22', description: 'Comcast Internet Bill', amount: -89.99, confidence: 99 },
      { date: '2025-08-25', description: 'PG&E Electric Bill', amount: -127.00, confidence: 92 },
      { date: '2025-08-29', description: 'PAYDAY - Direct Deposit', amount: 3247.85, confidence: 99 }
    ],
    insights: [
      { title: 'Transactions Analyzed', value: '247', type: 'data' },
      { title: 'Savings Opportunity', value: '$47/mo', type: 'optimization' },
      { title: 'Best Grocery Day', value: 'Tuesday', type: 'pattern' },
      { title: 'Unused Subscriptions', value: '3', type: 'waste' }
    ],
    categories: [
      { name: 'Housing', amount: 1850, percentage: 64, budget: 1850, status: 'on-target' },
      { name: 'Groceries', amount: 356, percentage: 12, budget: 420, status: 'under' },
      { name: 'Food & Dining', amount: 313, percentage: 11, budget: 255, status: 'over' },
      { name: 'Transportation', amount: 287, percentage: 10, budget: 300, status: 'on-target' }
    ],
    bills: [
      { name: 'Rent Payment', amount: 1850, due: 'Aug 30', status: 'due-soon', type: 'housing' },
      { name: 'PG&E Electric', amount: 127, due: 'Aug 25', status: 'due-soon', type: 'utilities' },
      { name: 'Comcast Internet', amount: 89.99, due: 'Aug 22', status: 'due-soon', type: 'utilities' }
    ],
    subscriptions: [
      { name: 'Netflix Standard', amount: 15.99, usage: 'daily', status: 'keep' },
      { name: 'Spotify Premium', amount: 9.99, usage: 'daily', status: 'keep' },
      { name: 'Adobe Creative', amount: 52.99, usage: '67 days unused', status: 'cancel' },
      { name: 'Gym Membership', amount: 89.99, usage: '12x this month', status: 'keep' }
    ]
  });

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  // Initialize neural network visualization
  useEffect(() => {
    if (neuralCanvasRef.current) {
      const canvas = neuralCanvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const nodes = [];
      const connections = [];

      // Create nodes
      for (let i = 0; i < 15; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          pulse: Math.random() * Math.PI * 2
        });
      }

      // Create connections
      nodes.forEach((node, i) => {
        nodes.forEach((otherNode, j) => {
          if (i !== j) {
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) + 
              Math.pow(node.y - otherNode.y, 2)
            );
            if (distance < 120) {
              connections.push({ from: i, to: j, opacity: Math.random() * 0.5 + 0.2 });
            }
          }
        });
      });

      let animationFrame;
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw connections
        connections.forEach(conn => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];
          
          ctx.strokeStyle = `rgba(78, 205, 196, ${conn.opacity * Math.sin(Date.now() * 0.001) + 0.3})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.stroke();
        });

        // Update and draw nodes
        nodes.forEach(node => {
          // Update position
          node.x += node.vx;
          node.y += node.vy;
          node.pulse += 0.05;
          
          // Bounce off walls
          if (node.x <= 6 || node.x >= canvas.width - 6) node.vx *= -1;
          if (node.y <= 6 || node.y >= canvas.height - 6) node.vy *= -1;
          
          // Draw node
          const pulseSize = 3 + Math.sin(node.pulse) * 2;
          ctx.fillStyle = `rgba(124, 92, 255, ${0.8 + Math.sin(node.pulse) * 0.2})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
          ctx.fill();
        });
        
        animationFrame = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, []);

  // Initialize app
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setAiMessages([{
        type: 'ai',
        message: "Hi Steve! I've analyzed your 247 transactions from Chase and Bank of America. Based on your spending patterns, you typically spend $89 on groceries every Tuesday. Want to see your personalized cash flow prediction?",
        timestamp: new Date()
      }]);
    }, 2000);
  }, []);

  // AI Response Generator
  const generateAIResponse = (message) => {
    const msg = message.toLowerCase();
    
    const responses = {
      cashflow: [
        "Based on 6 months of transaction data, I predict your next expenses: Groceries in 2 days ($85-95), Rent in 12 days ($1,850), Gas in 4 days ($45-55). Your cash flow prediction shows +$1,247 by month-end with 94.3% confidence.",
        "My neural network analyzed your bi-weekly payroll pattern ($3,247.85) and spending trends. Next month prediction: Income $6,495, Expenses $5,248, Net positive $1,247. Confidence: 94.3%"
      ],
      patterns: [
        "Fascinating patterns in your data! You spend 34% more on weekends vs weekdays. Your Starbucks visits peak on Monday/Wednesday. Grocery shopping on Tuesdays saves you $67/month. Your income timing is perfectly consistent every 2 weeks.",
        "Your spending personality: Disciplined grocery shopper (Tuesdays), consistent coffee routine (18 Starbucks visits/month), weekend social spender (+34%), and excellent bill management (never late). Financial health score: 8.7/10!"
      ],
      savings: [
        "I've analyzed your spending patterns and found 3 immediate opportunities: 1) Coffee optimization saves $47/month (you visit Starbucks 18 times/month), 2) Weekend spending is 34% higher - setting limits saves $108/month, 3) You have 3 unused subscriptions worth $23/month. Total potential: $178/month!",
        "Your Tuesday grocery shopping is brilliant! Whole Foods prices are 15% lower on Tuesdays. You're already saving $67/month with this pattern. Want me to find more optimization opportunities?"
      ],
      default: [
        "I'm here with insights from your 247 real transactions! Your financial health score is 8.7/10. Ask me about budget optimization, spending patterns, or savings opportunities.",
        "With your Chase and Bank of America data, I can provide detailed analysis on any aspect. Your bi-weekly income pattern and Tuesday grocery shopping show excellent financial discipline!"
      ]
    };

    if (msg.includes('cash') || msg.includes('flow') || msg.includes('predict')) {
      return responses.cashflow[Math.floor(Math.random() * responses.cashflow.length)];
    }
    if (msg.includes('pattern') || msg.includes('behavior') || msg.includes('spend')) {
      return responses.patterns[Math.floor(Math.random() * responses.patterns.length)];
    }
    if (msg.includes('save') || msg.includes('optimize') || msg.includes('money')) {
      return responses.savings[Math.floor(Math.random() * responses.savings.length)];
    }
    
    return responses.default[Math.floor(Math.random() * responses.default.length)];
  };

  // AI Chat Handler
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

  // Export Functions
  const exportData = (type) => {
    const timestamp = new Date().toISOString().split('T')[0];
    
    switch(type) {
      case 'transactions-csv':
        exportTransactionsCSV(timestamp);
        break;
      case 'budget-excel':
        exportBudgetExcel(timestamp);
        break;
      case 'cashflow-excel':
        exportCashFlowExcel(timestamp);
        break;
      case 'ai-report-pdf':
        exportAIReport(timestamp);
        break;
      case 'tax-summary':
        exportTaxSummary(timestamp);
        break;
    }
    
    setShowExportModal(false);
  };

  const exportTransactionsCSV = (timestamp) => {
    const csvContent = [
      ['Date', 'Merchant', 'Amount', 'Category', 'Account', 'AI_Confidence'],
      ...appData.transactions.map(tx => [
        tx.date,
        tx.merchant,
        tx.amount,
        tx.category,
        tx.account,
        `${tx.confidence}%`
      ])
    ];
    downloadCSV(csvContent, `phenomenal-transactions-${timestamp}.csv`);
  };

  const exportCashFlowExcel = (timestamp) => {
    const csvContent = [
      ['Phenomenal Financial Tracker - Cash Flow Analysis'],
      ['Generated:', new Date().toLocaleString()],
      [''],
      ['DATE', 'DESCRIPTION', 'AMOUNT', 'BALANCE'],
      ['8/17/2025', 'Current Total Balance', formatCurrency(appData.totals.netWorth), formatCurrency(appData.totals.netWorth)],
      ...appData.predictions.map((pred, i) => [
        pred.date.split('-').slice(1).join('/') + '/25',
        pred.description,
        pred.amount > 0 ? `+${formatCurrency(pred.amount)}` : `-${formatCurrency(Math.abs(pred.amount))}`,
        formatCurrency(appData.totals.netWorth + (i + 1) * 100)
      ]),
      [''],
      ['SUMMARY'],
      ['Current Balance', formatCurrency(appData.totals.netWorth)],
      ['Predicted Cash Flow', formatCurrency(appData.totals.predictedCashFlow)],
      ['AI Confidence', `${appData.totals.confidenceScore}%`]
    ];
    downloadCSV(csvContent, `phenomenal-cashflow-${timestamp}.csv`);
  };

  const exportBudgetExcel = (timestamp) => {
    const csvContent = [
      ['Category', 'Budgeted', 'Actual', 'Difference', 'AI_Insight'],
      ...appData.categories.map(cat => [
        cat.name,
        formatCurrency(cat.budget),
        formatCurrency(cat.amount),
        formatCurrency(cat.amount - cat.budget),
        cat.status === 'over' ? 'Reduce spending' : cat.status === 'under' ? 'Room for more' : 'On target'
      ])
    ];
    downloadCSV(csvContent, `phenomenal-budget-${timestamp}.csv`);
  };

  const exportAIReport = (timestamp) => {
    const report = `
PHENOMENAL FINANCIAL TRACKER - AI ANALYSIS REPORT
Generated: ${new Date().toLocaleString()}

FINANCIAL HEALTH SCORE: ${appData.totals.aiHealthScore}/10 (Excellent)

AI ANALYSIS:
• ${appData.totals.totalTransactions} transactions analyzed with ${appData.ai.accuracyScore}% accuracy
• ${appData.ai.patternsLearned} patterns learned across ${appData.ai.modelsActive} AI models
• ${appData.ai.dataPoints} data points processed

CASH FLOW PREDICTION:
• Next 30 days: ${formatCurrency(appData.totals.predictedCashFlow)} positive
• Confidence score: ${appData.totals.confidenceScore}%

SPENDING OPTIMIZATION:
• Coffee optimization: Save $47/month
• Tuesday grocery shopping: Already saving $67/month
• Weekend spending 34% higher than weekdays

RECOMMENDATIONS:
1. Reduce Starbucks visits from 18 to 12/month
2. Continue Tuesday grocery shopping
3. Cancel unused subscriptions (Adobe Creative)
4. Set weekend spending limit

Total optimization potential: $178/month
    `;
    
    downloadTextFile(report, `phenomenal-ai-report-${timestamp}.txt`);
  };

  const exportTaxSummary = (timestamp) => {
    const csvContent = [
      ['Category', 'Amount', 'Tax_Deductible', 'Notes'],
      ['Income', formatCurrency(6495.70), 'No', 'Bi-weekly salary'],
      ['Business Software', formatCurrency(52.99), 'Maybe', 'Adobe Creative Suite'],
      ['Medical Expenses', formatCurrency(58.45), 'Yes', 'Healthcare costs'],
      ['Home Office', formatCurrency(89.99), 'Partial', 'Internet if working from home']
    ];
    downloadCSV(csvContent, `phenomenal-tax-summary-${timestamp}.csv`);
  };

  const downloadCSV = (data, filename) => {
    const csv = data.map(row => 
      Array.isArray(row) ? row.join(',') : row
    ).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    downloadBlob(blob, filename);
  };

  const downloadTextFile = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' });
    downloadBlob(blob, filename);
  };

  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Connection simulation
  const simulateConnection = () => {
    setIsConnecting(true);
    setConnectionProgress(0);
    setShowPlaidModal(true);
    
    const steps = [
      { progress: 15, message: 'Initializing secure connection...', delay: 800 },
      { progress: 35, message: 'Authenticating with bank...', delay: 1200 },
      { progress: 55, message: 'Retrieving account information...', delay: 1000 },
      { progress: 75, message: 'Importing transactions...', delay: 1500 },
      { progress: 90, message: 'AI analyzing patterns...', delay: 800 },
      { progress: 100, message: 'Connection complete!', delay: 500 }
    ];
    
    let currentStep = 0;
    
    const processStep = () => {
      if (currentStep < steps.length) {
        setConnectionProgress(steps[currentStep].progress);
        currentStep++;
        setTimeout(processStep, steps[currentStep - 1]?.delay || 500);
      } else {
        setTimeout(() => {
          setIsConnecting(false);
          setShowPlaidModal(false);
          alert('✅ Demo bank connection successful!');
        }, 1000);
      }
    };
    
    processStep();
  };

  // Modal handlers
  const showModal = (title, content) => {
    setModalContent({ title, content });
    setShowDetailsModal(true);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            border: '4px solid rgba(124, 92, 255, 0.3)',
            borderTop: '4px solid #7c5cff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '12px' }}>
            Loading Phenomenal Financial Tracker
          </h2>
          <p style={{ color: '#9aa3b2' }}>
            AI System Initializing • Neural Networks Loading • {appData.totals.totalTransactions} Transactions
          </p>
        </div>
        
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `
        }} />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
      color: '#e7ecf3',
      position: 'relative'
    }}>
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
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px', position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          padding: '20px 0',
          backdropFilter: 'blur(20px)',
          background: 'rgba(15, 17, 22, 0.8)',
          borderRadius: '0 0 24px 24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff6b9d 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              boxShadow: '0 0 20px rgba(255, 107, 157, 0.3)'
            }}>
              🧠
            </div>
            <div>
              <h1 style={{
                margin: 0,
                fontSize: '28px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff6b9d 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Phenomenal Financial Tracker
              </h1>
              <div style={{ color: '#9aa3b2', fontSize: '14px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '700',
                  background: 'rgba(255, 107, 157, 0.1)',
                  border: '1px solid rgba(255, 107, 157, 0.3)',
                  color: '#ff6b9d'
                }}>
                  AI System Active
                </span>
                • AI-Powered • Plaid Connected • Predictive Intelligence
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              background: 'rgba(23, 201, 100, 0.1)',
              border: '1px solid rgba(23, 201, 100, 0.3)',
              borderRadius: '20px',
              fontSize: '12px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#17c964',
                animation: 'pulse 2s infinite'
              }} />
              {appData.totals.connectedBanks} Banks Connected
            </div>
            
            <button 
              onClick={() => setShowAIAssistant(true)}
              style={{
                background: 'linear-gradient(135deg, #ff6b9d 0%, #e84393 100%)',
                border: '1px solid #ff6b9d',
                color: '#fff',
                padding: '12px 16px',
                borderRadius: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(255, 107, 157, 0.3)'
              }}
            >
              🧠 AI Assistant
            </button>
            
            <button 
              onClick={simulateConnection}
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
                border: '1px solid #00d4ff',
                color: '#fff',
                padding: '12px 16px',
                borderRadius: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(0, 212, 255, 0.3)'
              }}
            >
              🔗 Connect Bank
            </button>
            
            <button 
              onClick={() => setShowExportModal(true)}
              style={{
                background: 'linear-gradient(135deg, #4ecdc4 0%, #00b894 100%)',
                border: '1px solid #4ecdc4',
                color: '#fff',
                padding: '12px 16px',
                borderRadius: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 0 15px rgba(78, 205, 196, 0.4)'
              }}
            >
              📊 Export Data
            </button>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 16px',
              background: 'rgba(20, 22, 27, 0.8)',
              borderRadius: '20px',
              backdropFilter: 'blur(20px)'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                color: '#fff'
              }}>
                {appData.user.avatar}
              </div>
              <span>{appData.user.name}</span>
            </div>
          </div>
        </header>

        {/* AI-Enhanced Dashboard Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {/* Enhanced Demo Tiles */}
          <div 
            onClick={() => showModal('💎 Total Balance Breakdown', `
              <div style="display: grid; gap: 16px; margin: 20px 0;">
                ${appData.accounts.map(acc => `
                  <div style="display: flex; justify-content: space-between; padding: 12px; background: rgba(23,201,100,0.1); border-radius: 12px;">
                    <span>${acc.name}</span>
                    <span style="font-weight: 700; color: #17c964;">${formatCurrency(acc.balance)}</span>
                  </div>
                `).join('')}
                <div style="border-top: 1px solid rgba(255,255,255,0.1); margin: 12px 0;"></div>
                <div style="display: flex; justify-content: space-between; padding: 12px; background: rgba(255,107,157,0.1); border-radius: 12px;">
                  <span style="font-size: 18px; font-weight: 700;">Total Net Worth</span>
                  <span style="font-size: 18px; font-weight: 700; color: #ff6b9d;">${formatCurrency(appData.totals.netWorth)}</span>
                </div>
              </div>
            `)}
            style={{
              padding: '24px',
              background: 'rgba(20, 22, 27, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.4s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #7c5cff, #00d7c0, #ff6b9d, #4ecdc4)'
            }} />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <div style={{ color: '#9aa3b2', fontSize: '14px', fontWeight: '600' }}>Total Balance</div>
              <div style={{ fontSize: '20px' }}>💎</div>
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: '800',
              margin: '8px 0',
              background: 'linear-gradient(135deg, #e7ecf3 0%, #7c5cff 50%, #ff6b9d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {formatCurrency(appData.totals.netWorth)}
            </div>
            <div style={{
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(23,201,100,.1)',
              color: '#17c964',
              border: '1px solid rgba(23,201,100,.3)'
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#17c964',
                animation: 'pulse 2s infinite'
              }} />
              +$2,340 this month
            </div>
          </div>

          <div 
            onClick={() => showModal('📊 Monthly Spending Analysis', `
              <div style="margin: 20px 0;">
                <h4 style="color: #ff6b9d; margin: 0 0 12px 0;">🧠 AI Spending Breakdown</h4>
                ${appData.categories.map(cat => `
                  <div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(255,107,157,0.05); border-radius: 8px; margin-bottom: 4px;">
                    <span>${cat.name}</span>
                    <span style="font-weight: 700;">${formatCurrency(cat.amount)} (${cat.percentage}%)</span>
                  </div>
                `).join('')}
                <div style="margin-top: 12px; padding: 12px; background: rgba(255,183,3,0.1); border-radius: 12px; border: 1px solid rgba(255,183,3,0.3);">
                  <strong style="color: #ffb703;">⚠️ Budget Alert:</strong> Food & Dining category is 23% over budget. Consider reducing coffee visits.
                </div>
              </div>
            `)}
            style={{
              padding: '24px',
              background: 'rgba(20, 22, 27, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.4s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #7c5cff, #00d7c0, #ff6b9d, #4ecdc4)'
            }} />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <div style={{ color: '#9aa3b2', fontSize: '14px', fontWeight: '600' }}>Monthly Spending</div>
              <div style={{ fontSize: '20px' }}>📊</div>
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: '800',
              margin: '8px 0',
              background: 'linear-gradient(135deg, #e7ecf3 0%, #7c5cff 50%, #ff6b9d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {formatCurrency(Math.abs(appData.totals.monthlySpending))}
            </div>
            <div style={{
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255,183,3,.1)',
              color: '#ffb703',
              border: '1px solid rgba(255,183,3,.3)'
            }}>
              15% above target
            </div>
          </div>

          <div 
            onClick={() => showModal('🎯 AI Cash Flow Prediction', `
              <div style="margin: 20px 0;">
                <div style="text-align: center; margin-bottom: 20px;">
                  <div style="font-size: 32px; font-weight: 800; color: #ff6b9d;">+${formatCurrency(appData.totals.predictedCashFlow)}</div>
                  <div style="color: #4ecdc4;">Predicted Available Cash (30 days)</div>
                </div>
                <h4 style="color: #ff6b9d; margin: 16px 0 8px 0;">🧠 Prediction Breakdown:</h4>
                <div style="margin-bottom: 16px;">
                  <div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(23,201,100,0.1); border-radius: 8px; margin-bottom: 4px;">
                    <span>💰 Expected Income (2 paychecks)</span>
                    <span style="color: #17c964; font-weight: 700;">+$6,495.70</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(255,84,112,0.1); border-radius: 8px;">
                    <span>💸 Predicted Expenses</span>
                    <span style="color: #ff5470; font-weight: 700;">-$5,247.87</span>
                  </div>
                </div>
                <div style="padding: 12px; background: rgba(78,205,196,0.1); border-radius: 12px;">
                  <strong style="color: #4ecdc4;">🔮 AI Confidence: ${appData.totals.confidenceScore}%</strong>
                </div>
              </div>
            `)}
            style={{
              padding: '24px',
              background: 'rgba(20, 22, 27, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 107, 157, 0.2)',
              borderRadius: '24px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.4s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 107, 157, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #7c5cff, #00d7c0, #ff6b9d, #4ecdc4)'
            }} />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <div style={{ color: '#9aa3b2', fontSize: '14px', fontWeight: '600' }}>AI Cash Flow</div>
              <div style={{ fontSize: '20px' }}>🎯</div>
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: '800',
              margin: '8px 0',
              background: 'linear-gradient(135deg, #e7ecf3 0%, #7c5cff 50%, #ff6b9d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              +{formatCurrency(appData.totals.predictedCashFlow)}
            </div>
            <div style={{
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255,107,157,.1)',
              color: '#ff6b9d',
              border: '1px solid rgba(255,107,157,.3)'
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#ff6b9d',
                animation: 'pulse 2s infinite'
              }} />
              {appData.totals.confidenceScore}% confidence
            </div>
          </div>

          <div 
            onClick={() => showModal('🧠 AI Financial Health Score', `
              <div style="margin: 20px 0;">
                <div style="text-align: center; margin-bottom: 20px;">
                  <div style="font-size: 48px; font-weight: 800; color: #17c964;">${appData.totals.aiHealthScore}/10</div>
                  <div style="color: #17c964; font-size: 18px; font-weight: 700;">Excellent Financial Health</div>
                </div>
                <div style="display: grid; gap: 8px; margin-bottom: 16px;">
                  <div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(23,201,100,0.1); border-radius: 8px;">
                    <span>💰 Savings Rate</span>
                    <span style="color: #17c964; font-weight: 700;">18.4%</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(23,201,100,0.1); border-radius: 8px;">
                    <span>💳 Debt Management</span>
                    <span style="color: #17c964; font-weight: 700;">8.2%</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(255,183,3,0.1); border-radius: 8px;">
                    <span>🎯 Budget Variance</span>
                    <span style="color: #ffb703; font-weight: 700;">3.1%</span>
                  </div>
                </div>
                <div style="padding: 12px; background: rgba(23,201,100,0.1); border-radius: 12px;">
                  <strong style="color: #17c964;">🎯 You're in the top 15% of financial health!</strong>
                </div>
              </div>
            `)}
            style={{
              padding: '24px',
              background: 'rgba(20, 22, 27, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.4s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #7c5cff, #00d7c0, #ff6b9d, #4ecdc4)'
            }} />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <div style={{ color: '#9aa3b2', fontSize: '14px', fontWeight: '600' }}>AI Health Score</div>
              <div style={{ fontSize: '20px' }}>🧠</div>
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: '800',
              margin: '8px 0',
              background: 'linear-gradient(135deg, #e7ecf3 0%, #7c5cff 50%, #ff6b9d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {appData.totals.aiHealthScore}/10
            </div>
            <div style={{
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(23,201,100,.1)',
              color: '#17c964',
              border: '1px solid rgba(23,201,100,.3)'
            }}>
              Excellent
            </div>
          </div>
        </div>

        {/* AI Predictions & Insights */}
        <div style={{
          background: 'rgba(20, 22, 27, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 107, 157, 0.2)',
          borderRadius: '24px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <h2 style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '0 0 16px 0',
            fontWeight: '800'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #ff6b9d, #4ecdc4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              boxShadow: '0 0 20px rgba(255, 107, 157, 0.3)'
            }}>
              🔮
            </div>
            AI Financial Predictions
            <div style={{ marginLeft: 'auto', fontSize: '14px' }}>
              <div style={{
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: '700',
                background: 'rgba(255,107,157,0.1)',
                color: '#ff6b9d',
                border: '1px solid rgba(255,107,157,0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#ff6b9d',
                  animation: 'pulse 2s infinite'
                }} />
                Expert Level
              </div>
            </div>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            margin: '20px 0'
          }}>
            {appData.insights.map((insight, index) => (
              <div
                key={index}
                onClick={() => showModal(`📊 ${insight.title}`, `
                  <div style="text-align: center; padding: 20px;">
                    <div style="font-size: 32px; margin-bottom: 12px;">${
                      insight.type === 'data' ? '📊' :
                      insight.type === 'optimization' ? '💡' :
                      insight.type === 'pattern' ? '🔍' : '⚠️'
                    }</div>
                    <div style="font-size: 24px; font-weight: 800; color: #ff6b9d; margin-bottom: 8px;">${insight.value}</div>
                    <div style="color: #9aa3b2;">${insight.title}</div>
                  </div>
                `)}
                style={{
                  padding: '16px',
                  background: 'rgba(255,107,157,0.05)',
                  border: '1px solid rgba(255,107,157,0.2)',
                  borderRadius: '12px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,107,157,0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,107,157,0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#ff6b9d', margin: '8px 0' }}>
                  {insight.value}
                </div>
                <div style={{ fontSize: '12px', color: '#9aa3b2' }}>
                  {insight.title}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(255,107,157,0.05)',
            border: '1px solid rgba(255,107,157,0.2)',
            borderRadius: '16px',
            padding: '20px',
            marginTop: '20px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#ff6b9d', display: 'flex', alignItems: 'center', gap: '8px' }}>
              💡 Cash Flow Prediction (Next 30 Days)
            </h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '18px', fontWeight: '700' }}>
                +{formatCurrency(appData.totals.predictedCashFlow)}
              </span>
              <span style={{ fontSize: '12px', color: '#9aa3b2' }}>
                Confidence: {appData.totals.confidenceScore}%
              </span>
            </div>
            <div style={{
              height: '6px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '10px',
              overflow: 'hidden',
              marginBottom: '8px'
            }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, #ff6b9d, #4ecdc4)',
                borderRadius: '10px',
                width: `${appData.totals.confidenceScore}%`,
                transition: 'width 1s ease'
              }} />
            </div>
            <div style={{ fontSize: '12px', color: '#9aa3b2', lineHeight: '1.4' }}>
              Based on your spending patterns: $89 groceries every Tuesday, rent in 12 days, and seasonal adjustment for August
            </div>
          </div>
        </div>

        {/* Neural Network Visualization */}
        <div style={{
          background: 'rgba(20, 22, 27, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 107, 157, 0.2)',
          borderRadius: '24px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <h3 style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '0 0 16px 0',
            fontWeight: '800'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #ff6b9d, #4ecdc4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              boxShadow: '0 0 20px rgba(255, 107, 157, 0.3)'
            }}>
              🧬
            </div>
            AI Learning Network
            <div style={{ marginLeft: 'auto' }}>
              <div style={{
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: '700',
                background: 'rgba(78,205,196,0.1)',
                color: '#4ecdc4',
                border: '1px solid rgba(78,205,196,0.3)'
              }}>
                Training Active
              </div>
            </div>
          </h3>
          
          <canvas 
            ref={neuralCanvasRef}
            style={{
              width: '100%',
              height: '200px',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '16px',
              marginBottom: '16px'
            }}
          />
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '12px',
            fontSize: '12px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#4ecdc4' }}>
                {appData.ai.patternsLearned}
              </div>
              <div style={{ color: '#9aa3b2' }}>Patterns Learned</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#ff6b9d' }}>
                {appData.ai.accuracyScore}%
              </div>
              <div style={{ color: '#9aa3b2' }}>Prediction Accuracy</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#17c964' }}>
                {appData.ai.modelsActive}
              </div>
              <div style={{ color: '#9aa3b2' }}>AI Models Active</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#ffb703' }}>
                {appData.ai.dataPoints}
              </div>
              <div style={{ color: '#9aa3b2' }}>Data Points Analyzed</div>
            </div>
          </div>
        </div>

        {/* Smart Account Management */}
        <div style={{
          background: 'rgba(20, 22, 27, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <h2 style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '0 0 16px 0',
            fontWeight: '800'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px'
            }}>
              🏦
            </div>
            Smart Account Management
            <div style={{ marginLeft: 'auto', fontSize: '14px' }}>
              <div style={{
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: '700',
                background: 'rgba(0,212,255,0.1)',
                color: '#00d4ff',
                border: '1px solid rgba(0,212,255,0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#00d4ff',
                  animation: 'pulse 2s infinite'
                }} />
                Live Sync Active
              </div>
            </div>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {appData.accounts.map(account => (
              <div
                key={account.id}
                onClick={() => showModal(`🏦 ${account.name}`, `
                  <div style="margin: 20px 0;">
                    <div style="text-center; padding: 20px; background: rgba(0,102,178,0.1); border-radius: 12px; margin-bottom: 16px;">
                      <div style="font-size: 32px; font-weight: 800; color: #00d4ff;">${formatCurrency(account.balance)}</div>
                      <div style="color: #9aa3b2;">${account.type} ${account.mask}</div>
                    </div>
                    <div style="margin-bottom: 16px;">
                      <h4 style="color: #ff6b9d; margin: 0 0 8px 0;">Recent Activity:</h4>
                      ${appData.transactions.filter(tx => tx.account.includes(account.institution)).slice(0, 3).map(tx => `
                        <div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(255,255,255,0.03); border-radius: 8px; margin-bottom: 4px;">
                          <div>
                            <div style="font-weight: 600;">${tx.merchant}</div>
                            <div style="font-size: 12px; color: #9aa3b2;">${tx.date}</div>
                          </div>
                          <div style="font-weight: 700; color: ${tx.amount > 0 ? '#17c964' : '#e7ecf3'};">${tx.amount > 0 ? '+' : ''}${formatCurrency(Math.abs(tx.amount))}</div>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                `)}
                style={{
                  background: 'rgba(20, 22, 27, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  padding: '20px',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: account.institution === 'Chase' ? 
                    'linear-gradient(90deg, #0066b2, #0088cc)' : 
                    'linear-gradient(90deg, #e31837, #ff4444)'
                }} />

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800',
                      fontSize: '16px',
                      color: '#fff',
                      background: account.institution === 'Chase' ? 
                        'linear-gradient(135deg, #0066b2, #0088cc)' : 
                        'linear-gradient(135deg, #e31837, #ff4444)'
                    }}>
                      {account.institution}
                    </div>
                    <div>
                      <div style={{ fontWeight: '700' }}>{account.name}</div>
                      <div style={{ fontSize: '12px', color: '#9aa3b2' }}>
                        {account.type} {account.mask}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '700',
                    background: 'rgba(0,212,255,0.1)',
                    color: '#00d4ff',
                    border: '1px solid rgba(0,212,255,0.3)'
                  }}>
                    Plaid Connected
                  </div>
                </div>

                <div style={{
                  fontSize: '28px',
                  fontWeight: '800',
                  margin: '8px 0',
                  background: 'linear-gradient(135deg, #e7ecf3, #7c5cff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {formatCurrency(account.balance)}
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: '#9aa3b2'
                }}>
                  <span>Last sync: 2 min ago • Plaid</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#17c964',
                      animation: 'pulse 2s infinite'
                    }} />
                    Live
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cash Flow to Next Payday */}
        <div style={{
          background: 'rgba(20, 22, 27, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <h3 style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '0 0 16px 0',
            fontWeight: '800'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px'
            }}>
              💰
            </div>
            Cash Flow to Next Payday
            <div style={{ marginLeft: 'auto', fontSize: '12px' }}>
              <div style={{
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: '700',
                background: 'rgba(255,107,157,0.1)',
                color: '#ff6b9d',
                border: '1px solid rgba(255,107,157,0.3)'
              }}>
                🗓️ 12 days remaining
              </div>
            </div>
          </h3>

          <div style={{ margin: '20px 0' }}>
            {/* Payday countdown */}
            <div style={{
              textAlign: 'center',
              marginBottom: '20px',
              padding: '16px',
              background: 'rgba(0,212,255,0.1)',
              borderRadius: '12px'
            }}>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#00d4ff' }}>
                Next Payday: Aug 29
              </div>
              <div style={{ color: '#9aa3b2' }}>Expected: $3,247.85</div>
            </div>

            {/* Running balance table */}
            <div style={{
              background: 'rgba(20, 22, 27, 0.8)',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 100px 100px',
                gap: '8px',
                padding: '12px',
                background: 'rgba(124,92,255,0.1)',
                fontWeight: '700',
                fontSize: '12px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div>DATE</div>
                <div>DESCRIPTION</div>
                <div>AMOUNT</div>
                <div>BALANCE</div>
              </div>
              
              {/* Current balance */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 100px 100px',
                gap: '8px',
                padding: '8px 12px',
                fontSize: '14px',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ color: '#9aa3b2' }}>8/17</div>
                <div style={{ fontWeight: '600' }}>💎 Current Total Balance</div>
                <div style={{ color: '#00d4ff', fontWeight: '700' }}>
                  {formatCurrency(appData.totals.netWorth)}
                </div>
                <div style={{ color: '#00d4ff', fontWeight: '700' }}>
                  {formatCurrency(appData.totals.netWorth)}
                </div>
              </div>

              {/* Predicted transactions */}
              {appData.predictions.map((pred, index) => {
                const runningBalance = appData.totals.netWorth + (index + 1) * 50; // Simplified for demo
                const isPayday = pred.description.includes('PAYDAY');
                
                return (
                  <div 
                    key={index}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '80px 1fr 100px 100px',
                      gap: '8px',
                      padding: '8px 12px',
                      fontSize: '14px',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      background: isPayday ? 'rgba(23,201,100,0.1)' : 'rgba(255,255,255,0.02)'
                    }}
                  >
                    <div style={{ color: '#9aa3b2' }}>
                      {new Date(pred.date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}
                    </div>
                    <div style={isPayday ? { fontWeight: 'bold', color: '#17c964' } : {}}>
                      {pred.description}
                    </div>
                    <div style={{
                      fontWeight: '700',
                      color: pred.amount > 0 ? '#17c964' : '#ff5470'
                    }}>
                      {pred.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(pred.amount))}
                    </div>
                    <div style={{
                      fontWeight: '700',
                      color: isPayday ? '#17c964' : '#00d4ff'
                    }}>
                      {formatCurrency(runningBalance)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
              <div style={{
                padding: '12px',
                background: 'rgba(255,107,157,0.1)',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#ff6b9d' }}>
                  $24,401
                </div>
                <div style={{ fontSize: '12px', color: '#9aa3b2' }}>Balance Before Payday</div>
              </div>
              <div style={{
                padding: '12px',
                background: 'rgba(23,201,100,0.1)',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#17c964' }}>
                  $27,649
                </div>
                <div style={{ fontSize: '12px', color: '#9aa3b2' }}>Balance After Payday</div>
              </div>
            </div>

            <div style={{
              marginTop: '12px',
              padding: '10px',
              background: 'rgba(78,205,196,0.1)',
              borderRadius: '12px'
            }}>
              <span style={{ color: '#4ecdc4', fontWeight: 'bold' }}>🧠 AI Cash Flow Insight:</span>
              <span style={{ color: '#9aa3b2', marginLeft: '8px' }}>
                You'll have $24,401 available until next payday. That's a healthy $2,034/day average spend capacity with 94% confidence.
              </span>
            </div>
          </div>
        </div>

        {/* Intelligent Transaction Stream */}
        <div style={{
          background: 'rgba(20, 22, 27, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '24px'
        }}>
          <h3 style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '0 0 16px 0',
            fontWeight: '800'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px'
            }}>
              ⚡
            </div>
            Intelligent Transaction Stream
            <div style={{ marginLeft: 'auto', fontSize: '12px' }}>
              <div style={{
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: '700',
                background: 'rgba(255,107,157,0.1)',
                color: '#ff6b9d',
                border: '1px solid rgba(255,107,157,0.3)'
              }}>
                AI-Powered
              </div>
            </div>
          </h3>

          <div style={{
            maxHeight: '400px',
            overflowY: 'auto',
            background: 'rgba(20, 22, 27, 0.8)',
            borderRadius: '16px',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {appData.transactions.map(tx => (
              <div
                key={tx.id}
                onClick={() => showModal(`💳 ${tx.merchant}`, `
                  <div style="margin: 20px 0;">
                    <div style="text-center; padding: 20px; background: rgba(255,107,157,0.1); border-radius: 12px; margin-bottom: 16px;">
                      <div style="font-size: 32px; font-weight: 800; color: ${tx.amount > 0 ? '#17c964' : '#ff6b9d'};">${tx.amount > 0 ? '+' : ''}${formatCurrency(Math.abs(tx.amount))}</div>
                      <div style="color: #9aa3b2;">${tx.merchant}</div>
                      <div style="font-size: 12px; color: #9aa3b2;">${tx.date} • AI: ${tx.confidence}%</div>
                    </div>
                    <div style="padding: 12px; background: rgba(78,205,196,0.1); border-radius: 12px;">
                      <strong style="color: #4ecdc4;">🧠 AI Analysis:</strong> High confidence transaction in ${tx.category} category.
                    </div>
                  </div>
                `)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  background: tx.new ? 'rgba(0, 212, 255, 0.05)' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(124, 92, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = tx.new ? 'rgba(0, 212, 255, 0.05)' : 'transparent';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 
                      tx.category === 'Income' ? '#00d4ff' :
                      tx.category === 'Groceries' ? '#17c964' :
                      tx.category === 'Transportation' ? '#7c5cff' :
                      tx.category === 'Food & Dining' ? '#ffb703' : '#ff5470',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px'
                  }}>
                    {tx.category === 'Income' ? '💰' :
                     tx.category === 'Groceries' ? '🥬' :
                     tx.category === 'Transportation' ? '🚗' :
                     tx.category === 'Food & Dining' ? '☕' : '🛍️'}
                  </div>
                  <div>
                    <div style={{ fontWeight: '700' }}>{tx.merchant}</div>
                    <div style={{ fontSize: '12px', color: '#9aa3b2' }}>
                      {tx.date} • {tx.account} • AI: {tx.confidence}%
                    </div>
                    <div style={{ fontSize: '10px', color: '#7c5cff', fontWeight: '600' }}>
                      {tx.category}
                    </div>
                  </div>
                </div>
                <div style={{
                  fontWeight: '800',
                  fontSize: '16px',
                  color: tx.amount > 0 ? '#17c964' : '#ff5470'
                }}>
                  {tx.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(tx.amount))}
                </div>
                {tx.new && (
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: '#00d4ff',
                    color: '#fff',
                    fontSize: '8px',
                    padding: '2px 6px',
                    borderRadius: '8px',
                    fontWeight: '700'
                  }}>
                    NEW
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Assistant Modal */}
      {showAIAssistant && (
        <div style={{
          position: 'fixed',
          inset: '0',
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '10000',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            background: 'rgba(20, 22, 27, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 107, 157, 0.3)',
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '600px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff6b9d, #4ecdc4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}>
                  🧠
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: '#ff6b9d' }}>Financial AI</div>
                  <div style={{ fontSize: '10px', color: '#9aa3b2' }}>
                    Your Personal Finance Assistant
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowAIAssistant(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#e7ecf3',
                  cursor: 'pointer',
                  fontSize: '20px'
                }}
              >
                ✕
              </button>
            </div>
            
            <div style={{
              flex: '1',
              maxHeight: '300px',
              overflowY: 'auto',
              marginBottom: '16px'
            }}>
              {aiMessages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: '12px',
                    padding: '12px',
                    borderRadius: '12px',
                    background: msg.type === 'ai' ? 
                      'rgba(255,107,157,0.1)' : 'rgba(124,92,255,0.1)',
                    border: msg.type === 'ai' ? 
                      '1px solid rgba(255,107,157,0.2)' : '1px solid rgba(124,92,255,0.2)'
                  }}
                >
                  <strong style={{ 
                    color: msg.type === 'ai' ? '#ff6b9d' : '#7c5cff',
                    fontSize: '12px'
                  }}>
                    {msg.type === 'ai' ? '🧠 AI Assistant:' : '👤 You:'}
                  </strong>
                  <br />
                  <span style={{ fontSize: '14px' }}>{msg.message}</span>
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={aiChatInput}
                onChange={(e) => setAiChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAIMessage()}
                placeholder="Ask me anything about your finances..."
                style={{
                  flex: '1',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  color: '#e7ecf3',
                  fontSize: '14px'
                }}
              />
              <button
                onClick={handleAIMessage}
                style={{
                  background: 'linear-gradient(135deg, #ff6b9d, #4ecdc4)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                🚀
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div style={{
          position: 'fixed',
          inset: '0',
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '10000',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            background: 'rgba(20, 22, 27, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '600px',
            width: '90%'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px'
            }}>
              <h3 style={{ margin: 0, fontSize: '24px' }}>📊 Export Financial Data</h3>
              <button
                onClick={() => setShowExportModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#e7ecf3',
                  cursor: 'pointer',
                  fontSize: '20px'
                }}
              >
                ✕
              </button>
            </div>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              {[
                {
                  id: 'transactions-csv',
                  title: '📊 Transactions CSV',
                  desc: 'All 247 transactions with AI categorization',
                  color: '#17c964'
                },
                {
                  id: 'budget-excel',
                  title: '📈 Budget Analysis Excel',
                  desc: 'Spending by category with AI insights',
                  color: '#4ecdc4'
                },
                {
                  id: 'cashflow-excel',
                  title: '💰 Cash Flow Tracker Excel',
                  desc: 'Your payday-to-payday tracking like Google Sheets',
                  color: '#00d4ff'
                },
                {
                  id: 'ai-report-pdf',
                  title: '🧠 AI Financial Report PDF',
                  desc: 'Complete analysis with predictions and insights',
                  color: '#ff6b9d'
                },
                {
                  id: 'tax-summary',
                  title: '📋 Tax Summary CSV',
                  desc: 'Income and deductible expenses for tax prep',
                  color: '#7c5cff'
                }
              ].map(option => (
                <button
                  key={option.id}
                  onClick={() => exportData(option.id)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: `rgba(${
                      option.color === '#17c964' ? '23,201,100' :
                      option.color === '#4ecdc4' ? '78,205,196' :
                      option.color === '#00d4ff' ? '0,212,255' :
                      option.color === '#ff6b9d' ? '255,107,157' : '124,92,255'
                    },0.1)`,
                    border: `1px solid rgba(${
                      option.color === '#17c964' ? '23,201,100' :
                      option.color === '#4ecdc4' ? '78,205,196' :
                      option.color === '#00d4ff' ? '0,212,255' :
                      option.color === '#ff6b9d' ? '255,107,157' : '124,92,255'
                    },0.3)`,
                    borderRadius: '12px',
                    color: '#e7ecf3',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
