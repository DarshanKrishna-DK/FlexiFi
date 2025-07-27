import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChartLine,
  FaChartPie,
  FaChartBar,
  FaTimes,
  FaExpand,
  FaCompress,
  FaDollarSign,
  FaArrowUp,
  FaWallet,
  FaCreditCard,
  FaHome,
  FaCar,
  FaGraduationCap,
  FaPaperPlane,
  FaUser,
  FaRobot
} from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
import './Dashboard.css';

interface DashboardData {
  totalAssets: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  netWorth: number;
  portfolioGrowth: number;
  savingsRate: number;
}

const Dashboard: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  const [dashboardData] = useState<DashboardData>({
    totalAssets: 125000,
    monthlyIncome: 8500,
    monthlyExpenses: 5200,
    netWorth: 89000,
    portfolioGrowth: 12.5,
    savingsRate: 38.8
  });

  // Mock data for charts - in real implementation, this would come from Fi MCP
  const expenseCategories = [
    { name: 'Housing', value: 2100, color: '#8B5CF6' },
    { name: 'Transportation', value: 800, color: '#A855F7' },
    { name: 'Food', value: 650, color: '#C084FC' },
    { name: 'Utilities', value: 400, color: '#DDD6FE' },
    { name: 'Entertainment', value: 350, color: '#F3E8FF' },
    { name: 'Other', value: 900, color: '#7C3AED' }
  ];

  const monthlyTrends = [
    { month: 'Jan', income: 8200, expenses: 5100 },
    { month: 'Feb', income: 8400, expenses: 5300 },
    { month: 'Mar', income: 8600, expenses: 5000 },
    { month: 'Apr', income: 8300, expenses: 5400 },
    { month: 'May', income: 8700, expenses: 5200 },
    { month: 'Jun', income: 8500, expenses: 5200 }
  ];

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };



  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // In real implementation, this would send to the AI chatbot
      console.log('Sending message:', chatMessage);
      setChatMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderContent = () => {
    return (
      <>
        {/* Key Metrics Cards */}
            <div className="metrics-grid">
              <motion.div 
                className="metric-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="metric-icon">
                  <FaWallet />
                </div>
                <div className="metric-content">
                  <h3>Total Assets</h3>
                  <p className="metric-value">${dashboardData.totalAssets.toLocaleString()}</p>
                  <span className="metric-change positive">
                    <FaArrowUp /> +5.2%
                  </span>
                </div>
              </motion.div>

              <motion.div 
                className="metric-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="metric-icon">
                  <FaDollarSign />
                </div>
                <div className="metric-content">
                  <h3>Net Worth</h3>
                  <p className="metric-value">${dashboardData.netWorth.toLocaleString()}</p>
                  <span className="metric-change positive">
                    <FaArrowUp /> +8.1%
                  </span>
                </div>
              </motion.div>

              <motion.div 
                className="metric-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="metric-icon">
                  <FaChartLine />
                </div>
                <div className="metric-content">
                  <h3>Portfolio Growth</h3>
                  <p className="metric-value">{dashboardData.portfolioGrowth}%</p>
                  <span className="metric-change positive">
                    <FaArrowUp /> +2.3%
                  </span>
                </div>
              </motion.div>

              <motion.div 
                className="metric-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="metric-icon">
                  <FaChartPie />
                </div>
                <div className="metric-content">
                  <h3>Savings Rate</h3>
                  <p className="metric-value">{dashboardData.savingsRate}%</p>
                  <span className="metric-change positive">
                    <FaArrowUp /> +1.5%
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Charts Section */}
            <div className="charts-grid">
              <motion.div 
                className="chart-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="chart-header">
                  <h3>Monthly Income vs Expenses</h3>
                  <FaChartBar />
                </div>
                <div className="chart-content">
                  <div className="bar-chart">
                    {monthlyTrends.map((data, index) => (
                      <div key={data.month} className="bar-group">
                        <div className="bar-labels">
                          <span className="bar-month">{data.month}</span>
                        </div>
                        <div className="bars">
                          <div 
                            className="bar income-bar"
                            style={{ height: `${(data.income / 10000) * 100}%` }}
                            title={`Income: $${data.income}`}
                          />
                          <div 
                            className="bar expense-bar"
                            style={{ height: `${(data.expenses / 10000) * 100}%` }}
                            title={`Expenses: $${data.expenses}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="chart-legend">
                    <div className="legend-item">
                      <span className="legend-color income"></span>
                      <span>Income</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color expense"></span>
                      <span>Expenses</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="chart-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="chart-header">
                  <h3>Expense Categories</h3>
                  <FaChartPie />
                </div>
                <div className="chart-content">
                  <div className="pie-chart">
                    <div className="pie-chart-visual">
                      {/* Simplified pie chart representation */}
                      <div className="pie-center">
                        <span className="pie-total">$5,200</span>
                        <span className="pie-label">Total</span>
                      </div>
                    </div>
                    <div className="pie-legend">
                      {expenseCategories.map((category, index) => (
                        <div key={category.name} className="pie-legend-item">
                          <span 
                            className="pie-legend-color"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="pie-legend-name">{category.name}</span>
                          <span className="pie-legend-value">${category.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div 
              className="quick-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button className="action-btn">
                  <FaCreditCard />
                  <span>Add Transaction</span>
                </button>
                <button className="action-btn">
                  <FaHome />
                  <span>Property Analysis</span>
                </button>
                <button className="action-btn">
                  <FaCar />
                  <span>Vehicle Insights</span>
                </button>
                <button className="action-btn">
                  <FaGraduationCap />
                  <span>Education Planning</span>
                </button>
              </div>
            </motion.div>
          </>
        )
  };

  return (
    <>
      <Header />
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="page-title">
            <h1>Financial Dashboard</h1>
            <p>Your complete financial overview and insights</p>
          </div>
        </div>

      {/* Floating Chat Button */}
      {!isChatOpen && (
        <button
          className="floating-chat-btn"
          onClick={toggleChat}
          title="Open AI Assistant"
        >
          <FaRobot />
        </button>
      )}

      <div className={`dashboard-content ${isChatOpen ? 'chat-open' : ''}`}>
        <div className="dashboard-main">
          {renderContent()}
        </div>

        {/* Chatbot Container */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              className={`chat-container ${isFullscreen ? 'fullscreen' : ''}`}
              initial={{ x: 'calc(100% - 60px)', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 'calc(100% - 60px)', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="chat-header">
                <div className="chat-title">
                  <FaUser />
                  <span>AI Financial Assistant</span>
                </div>
                <div className="chat-controls">
                  <button 
                    className="chat-control-btn"
                    onClick={toggleFullscreen}
                    title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                  >
                    {isFullscreen ? <FaCompress /> : <FaExpand />}
                  </button>
                  <button 
                    className="chat-control-btn"
                    onClick={toggleChat}
                    title="Close Chat"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              <div className="chat-messages">
                <div className="chat-message bot-message">
                  <div className="message-avatar">
                    <FaUser />
                  </div>
                  <div className="message-content">
                    <p>Hello! I'm your AI financial assistant. I can help you analyze your spending patterns, suggest investment strategies, and answer questions about your financial data. How can I assist you today?</p>
                  </div>
                </div>
              </div>

              <div className="chat-input">
                <div className="input-container">
                  <textarea
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about your finances..."
                    rows={1}
                  />
                  <button 
                    className="send-btn"
                    onClick={handleSendMessage}
                    disabled={!chatMessage.trim()}
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
