import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { handleAuthCallback } from '../config/api';
import './AuthCallback.css';

const AuthCallback: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error');

        if (error) {
          throw new Error(`Authentication failed: ${error}`);
        }

        if (!code || !state) {
          throw new Error('Missing authorization code or state parameter');
        }

        // Exchange code for token
        await handleAuthCallback(code, state);
        
        setStatus('success');
        setMessage('Authentication successful! Redirecting...');
        
        // Redirect to dashboard or home page after success
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);

      } catch (err) {
        console.error('Auth callback error:', err);
        setStatus('error');
        setMessage(err instanceof Error ? err.message : 'Authentication failed');
        
        // Redirect to home page after error
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      }
    };

    processCallback();
  }, []);

  const getIcon = () => {
    switch (status) {
      case 'loading':
        return <FaSpinner className="spinner" />;
      case 'success':
        return <FaCheckCircle className="success-icon" />;
      case 'error':
        return <FaExclamationTriangle className="error-icon" />;
      default:
        return <FaSpinner className="spinner" />;
    }
  };

  const getStatusClass = () => {
    switch (status) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      default:
        return 'loading';
    }
  };

  return (
    <div className="auth-callback">
      <div className="auth-callback-container">
        <motion.div
          className={`auth-callback-card ${getStatusClass()}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-callback-icon">
            {getIcon()}
          </div>
          
          <motion.h2
            className="auth-callback-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {status === 'loading' && 'Authenticating...'}
            {status === 'success' && 'Welcome to FlexiFi!'}
            {status === 'error' && 'Authentication Failed'}
          </motion.h2>
          
          <motion.p
            className="auth-callback-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {message}
          </motion.p>

          {status === 'error' && (
            <motion.button
              className="retry-btn"
              onClick={() => window.location.href = '/'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Return to Home
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthCallback;
