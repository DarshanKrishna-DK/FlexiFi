import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaShieldAlt, FaSpinner } from 'react-icons/fa';
import { buildApiUrl, getApiHeaders, saveSession, apiConfig, isDevelopment } from '../config/api';
import './AuthModal.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [sessionId, setSessionId] = useState('');

  // Generate a session ID when modal opens
  useEffect(() => {
    if (isOpen) {
      const newSessionId = 'session_' + Math.random().toString(36).substr(2, 9);
      setSessionId(newSessionId);
      setError('');
      setPhoneNumber('');
      setOtp('');
    }
  }, [isOpen]);

  const allowedNumbers = [
    '1111111111', '2222222222', '3333333333', '4444444444', '5555555555',
    '6666666666', '7777777777', '8888888888', '9999999999', '1010101010',
    '1212121212', '1313131313', '1414141414', '1515151515', '1616161616',
    '1717171717', '1818181818', '1919191919', '2020202020', '2121212121',
    '2222222222', '2323232323', '2424242424', '2525252525'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber || !otp) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // In development mode, use demo validation
      if (isDevelopment()) {
        if (!allowedNumbers.includes(phoneNumber)) {
          setError('This phone number is not allowed for demo purposes.');
          setIsLoading(false);
          return;
        }

        // Simulate successful authentication in development
        const mockSession = {
          sessionId,
          phoneNumber,
          token: 'mock_token_' + Date.now(),
          userId: 'user_' + phoneNumber,
          authenticated: true
        };

        saveSession(mockSession);

        setTimeout(() => {
          setIsLoading(false);
          onClose();
        }, 1000);
        return;
      }

      // Production authentication with Fi MCP server
      const authData = {
        sessionId,
        phoneNumber,
        otp
      };

      const response = await fetch(buildApiUrl(apiConfig.endpoints.login), {
        method: 'POST',
        headers: getApiHeaders(),
        body: JSON.stringify(authData),
      });

      if (response.ok) {
        const sessionData = await response.json();
        saveSession(sessionData);

        setTimeout(() => {
          setIsLoading(false);
          onClose();
        }, 1000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Authentication failed');
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err instanceof Error ? err.message : 'Authentication failed. Please try again.');
      setIsLoading(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { 
        duration: 0.2 
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="auth-modal-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="auth-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="auth-modal-header">
              <div className="auth-modal-title">
                <FaShieldAlt className="auth-icon" />
                <div>
                  <h2>Authenticate with Fi</h2>
                  <p>Connect your Fi account to access FlexiFi features</p>
                </div>
              </div>
              <button className="close-btn" onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            <div className="auth-modal-content">
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="otp">OTP</label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    required
                    disabled={isLoading}
                  />
                </div>

                {error && (
                  <div className="error-message">
                    {error}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="auth-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="spinner" />
                      Authenticating...
                    </>
                  ) : (
                    'Authenticate'
                  )}
                </button>
              </form>

              <div className="auth-info">
                <h4>Demo Phone Numbers</h4>
                <p>For demo purposes, use any of these phone numbers:</p>
                <div className="demo-numbers">
                  {allowedNumbers.slice(0, 6).map((number, index) => (
                    <span 
                      key={index} 
                      className="demo-number"
                      onClick={() => setPhoneNumber(number)}
                    >
                      {number}
                    </span>
                  ))}
                </div>
                <p className="demo-note">
                  <strong>Note:</strong> This is a demo environment. OTP validation is bypassed.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
