import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaRobot, FaPlay, FaStar, FaArrowRight, FaShieldAlt } from 'react-icons/fa';
import './Hero.css';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate('/dashboard');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="hero">
      {/* Animated Background Elements */}
      <div className="hero-bg-elements">
        <motion.div className="floating-element element-1" variants={floatingVariants} animate="animate" />
        <motion.div className="floating-element element-2" variants={floatingVariants} animate="animate" />
        <motion.div className="floating-element element-3" variants={floatingVariants} animate="animate" />
      </div>

      <div className="container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-main">
            <motion.div className="hero-badge" variants={itemVariants}>
              <FaRobot className="badge-icon" />
              <span>Next-Gen AI Financial Platform</span>
              <div className="badge-glow"></div>
            </motion.div>

            <motion.h1 className="hero-title" variants={itemVariants}>
              Your AI-Powered
              <br />
              <span className="gradient-text">Financial Assistant</span>
              <br />
              is Here
            </motion.h1>

            <motion.p className="hero-subtitle" variants={itemVariants}>
              Transform complex financial data into actionable insights with our advanced AI.
              Get personalized recommendations, real-time analysis, and intelligent forecasting
              through simple conversations.
            </motion.p>

            <motion.div className="hero-actions" variants={itemVariants}>
              <button className="btn btn-primary hero-cta" onClick={handleStartJourney}>
                <FaChartLine />
                <span>Start Your Journey</span>
                <FaArrowRight className="btn-arrow" />
              </button>
              <button className="btn btn-secondary hero-demo">
                <FaPlay />
                <span>Watch Demo</span>
              </button>
            </motion.div>

            <motion.div className="hero-trust" variants={itemVariants}>
              <div className="trust-badges">
                <div className="trust-item">
                  <FaShieldAlt />
                  <span>Bank-Grade Security</span>
                </div>
                <div className="trust-item">
                  <FaStar />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="trust-item">
                  <span className="user-count">50K+ Users</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="dashboard-showcase">
              <div className="dashboard-window">
                <div className="window-header">
                  <div className="window-controls">
                    <span className="control red"></span>
                    <span className="control yellow"></span>
                    <span className="control green"></span>
                  </div>
                  <div className="window-title">FlexiFi AI Dashboard</div>
                </div>

                <div className="dashboard-body">
                  <div className="chat-section">
                    <div className="chat-messages">
                      <div className="chat-message user">
                        "Show me my portfolio performance"
                      </div>
                      <div className="chat-message ai">
                        <div className="ai-avatar">
                          <FaRobot />
                        </div>
                        <div className="message-content">
                          Your portfolio is up 12.5% this month!
                          <div className="quick-chart">
                            <div className="chart-mini">
                              <div className="mini-bar" style={{ height: '40%' }}></div>
                              <div className="mini-bar" style={{ height: '60%' }}></div>
                              <div className="mini-bar" style={{ height: '80%' }}></div>
                              <div className="mini-bar" style={{ height: '65%' }}></div>
                              <div className="mini-bar" style={{ height: '90%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className="chat-input-preview">
                      <div className="input-preview">
                        <span className="input-placeholder">Ask me anything about your finances...</span>
                        <div className="send-icon">→</div>
                      </div>
                    </div>
                  </div>

                  <div className="metrics-preview">
                    <div className="metric-card">
                      <div className="metric-icon">₹</div>
                      <div className="metric-info">
                        <div className="metric-value">2.4L</div>
                        <div className="metric-label">Total Value</div>
                      </div>
                      <div className="metric-trend positive">+12.5%</div>
                    </div>

                    <div className="metric-card">
                      <div className="metric-icon">📈</div>
                      <div className="metric-info">
                        <div className="metric-value">8.2%</div>
                        <div className="metric-label">Annual Return</div>
                      </div>
                      <div className="metric-trend positive">+2.1%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
