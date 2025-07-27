import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getSession, clearSession } from '../config/api';
import { fiMcpAuthService } from '../services/fiMcpAuth';
import './Header.css';

interface HeaderProps {
  onLoginClick?: () => void;
}

const Header: React.FC<HeaderProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const session = getSession();
    if (session) {
      setIsLoggedIn(true);
      setUserInfo(session);
    }
  }, []);

  const handleLoginClick = async () => {
    try {
      setIsLoading(true);
      
      // Use the Fi auth service to open Fi authentication
      await fiMcpAuthService.openFiAuth();
      
    } catch (error) {
      console.error('Authentication failed:', error);
      alert('Failed to open Fi authentication. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    clearSession();
    setIsLoggedIn(false);
    setUserInfo(null);
    window.location.href = '/';
  };

  return (
    <motion.header 
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container">
        <div className="header-content">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="logo-text">FlexiFi</span>
            <span className="logo-badge">AI</span>
          </motion.div>

          <nav className="nav">
            <a href="/" className="nav-link">Home</a>
            <a href="/dashboard" className="nav-link">Dashboard</a>
            <a href="/future-planner" className="nav-link">Goal Planner</a>
            <a href="/stock-insights" className="nav-link">Stock Insights</a>
          </nav>

          {isLoggedIn ? (
            <div className="user-menu">
              <span className="user-info">
                Welcome, {userInfo?.phoneNumber || 'User'}
              </span>
              <motion.button
                className="logout-btn"
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span>Logout</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16,17 21,12 16,7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </motion.button>
            </div>
          ) : (
            <motion.button
              className="login-btn"
              onClick={handleLoginClick}
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.05 } : {}}
              whileTap={!isLoading ? { scale: 0.95 } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span>{isLoading ? 'Opening Fi Auth...' : 'Login with Fi'}</span>
              {!isLoading && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10,17 15,12 10,7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
