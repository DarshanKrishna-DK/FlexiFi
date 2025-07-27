import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaSearch,
  FaBolt,
  FaEye,
  FaHeart,
  FaCheckCircle,
  FaRocket,
  FaExclamationTriangle
} from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
import './StockInsights.css';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  prediction: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  targetPrice: number;
  riskLevel: 'low' | 'medium' | 'high';
}

const StockInsights: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [watchlist, setWatchlist] = useState<string[]>(['RELIANCE', 'TCS', 'INFY']);

  // Mock stock data - in real implementation, this would come from an API
  const stockData: Stock[] = [
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries Ltd',
      price: 2456.75,
      change: 45.20,
      changePercent: 1.87,
      volume: '2.1M',
      marketCap: '16.6L Cr',
      prediction: 'bullish',
      confidence: 78,
      targetPrice: 2650,
      riskLevel: 'medium'
    },
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services',
      price: 3542.30,
      change: -23.45,
      changePercent: -0.66,
      volume: '1.8M',
      marketCap: '12.9L Cr',
      prediction: 'neutral',
      confidence: 65,
      targetPrice: 3600,
      riskLevel: 'low'
    },
    {
      symbol: 'INFY',
      name: 'Infosys Limited',
      price: 1456.80,
      change: 12.35,
      changePercent: 0.85,
      volume: '3.2M',
      marketCap: '6.1L Cr',
      prediction: 'bullish',
      confidence: 82,
      targetPrice: 1580,
      riskLevel: 'low'
    },
    {
      symbol: 'HDFC',
      name: 'HDFC Bank Limited',
      price: 1678.90,
      change: -8.75,
      changePercent: -0.52,
      volume: '2.7M',
      marketCap: '9.3L Cr',
      prediction: 'bearish',
      confidence: 71,
      targetPrice: 1550,
      riskLevel: 'medium'
    }
  ];

  const filteredStocks = stockData.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleWatchlist = (symbol: string) => {
    setWatchlist(prev =>
      prev.includes(symbol)
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  const getPredictionIcon = (prediction: string) => {
    switch (prediction) {
      case 'bullish': return <FaArrowUp className="bullish" />;
      case 'bearish': return <FaArrowDown className="bearish" />;
      default: return <FaBolt className="neutral" />;
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <FaCheckCircle className="low-risk" />;
      case 'medium': return <FaExclamationTriangle className="medium-risk" />;
      case 'high': return <FaRocket className="high-risk" />;
      default: return <FaCheckCircle />;
    }
  };

  return (
    <>
      <Header />
      <div className="stock-insights">
      <div className="insights-header">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>
            <FaChartLine className="header-icon" />
            Stock Insights
          </h1>
          <p>AI-powered stock predictions and market analysis to maximize your returns</p>
        </motion.div>
      </div>

      <div className="insights-content">
        {/* Search and Filters */}
        <motion.section
          className="search-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search stocks by symbol or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.section>

        {/* Stock List */}
        <motion.section
          className="stock-list"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2>Market Overview</h2>
          <div className="stocks-grid">
            {filteredStocks.map((stock, index) => (
              <motion.div
                key={stock.symbol}
                className={`stock-card ${selectedStock?.symbol === stock.symbol ? 'selected' : ''}`}
                onClick={() => setSelectedStock(stock)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="stock-header">
                  <div className="stock-info">
                    <h3>{stock.symbol}</h3>
                    <p>{stock.name}</p>
                  </div>
                  <button
                    className={`watchlist-btn ${watchlist.includes(stock.symbol) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWatchlist(stock.symbol);
                    }}
                  >
                    <FaHeart />
                  </button>
                </div>
                
                <div className="stock-price">
                  <span className="price">₹{stock.price.toFixed(2)}</span>
                  <span className={`change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                  </span>
                </div>
                
                <div className="stock-metrics">
                  <div className="metric">
                    <span>Volume</span>
                    <span>{stock.volume}</span>
                  </div>
                  <div className="metric">
                    <span>Market Cap</span>
                    <span>{stock.marketCap}</span>
                  </div>
                </div>
                
                <div className="prediction-summary">
                  {getPredictionIcon(stock.prediction)}
                  <span className={`prediction ${stock.prediction}`}>
                    {stock.prediction.toUpperCase()}
                  </span>
                  <span className="confidence">{stock.confidence}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Detailed Analysis */}
        {selectedStock && (
          <motion.section
            className="detailed-analysis"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2>Detailed Analysis - {selectedStock.symbol}</h2>
            <div className="analysis-grid">
              <div className="analysis-card prediction-card">
                <h3>AI Prediction</h3>
                <div className="prediction-details">
                  {getPredictionIcon(selectedStock.prediction)}
                  <div className="prediction-info">
                    <span className={`prediction-label ${selectedStock.prediction}`}>
                      {selectedStock.prediction.toUpperCase()}
                    </span>
                    <span className="confidence-score">
                      Confidence: {selectedStock.confidence}%
                    </span>
                  </div>
                </div>
                <div className="target-price">
                  <span>Target Price: ₹{selectedStock.targetPrice}</span>
                  <span className={`potential ${selectedStock.targetPrice > selectedStock.price ? 'positive' : 'negative'}`}>
                    {((selectedStock.targetPrice - selectedStock.price) / selectedStock.price * 100).toFixed(1)}% potential
                  </span>
                </div>
              </div>
              
              <div className="analysis-card risk-card">
                <h3>Risk Assessment</h3>
                <div className="risk-details">
                  {getRiskIcon(selectedStock.riskLevel)}
                  <div className="risk-info">
                    <span className={`risk-label ${selectedStock.riskLevel}`}>
                      {selectedStock.riskLevel.toUpperCase()} RISK
                    </span>
                    <span className="risk-description">
                      {selectedStock.riskLevel === 'low' && 'Stable investment with lower volatility'}
                      {selectedStock.riskLevel === 'medium' && 'Moderate risk with balanced growth potential'}
                      {selectedStock.riskLevel === 'high' && 'High volatility with significant growth potential'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="analysis-card recommendation-card">
                <h3>Recommendation</h3>
                <div className="recommendation-content">
                  {selectedStock.prediction === 'bullish' && (
                    <div className="recommendation bullish">
                      <FaArrowUp />
                      <div>
                        <strong>BUY</strong>
                        <p>Strong upward momentum expected. Consider adding to portfolio.</p>
                      </div>
                    </div>
                  )}
                  {selectedStock.prediction === 'bearish' && (
                    <div className="recommendation bearish">
                      <FaArrowDown />
                      <div>
                        <strong>SELL/AVOID</strong>
                        <p>Downward pressure expected. Consider reducing exposure.</p>
                      </div>
                    </div>
                  )}
                  {selectedStock.prediction === 'neutral' && (
                    <div className="recommendation neutral">
                      <FaEye />
                      <div>
                        <strong>HOLD/WATCH</strong>
                        <p>Sideways movement expected. Monitor for clearer signals.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </div>
      </div>
      <Footer />
    </>
  );
};

export default StockInsights;
