import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import AuthCallback from './components/AuthCallback';
import Dashboard from './components/Dashboard';
import FuturePlanner from './components/FuturePlanner';
import StockInsights from './components/StockInsights';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAuthModalOpen(false);
  };

  const HomePage = () => (
    <>
      <Header onLoginClick={handleLoginClick} />
      <Hero />
      <Features />
      <About />
      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseModal} />
    </>
  );

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/future-planner" element={<FuturePlanner />} />
          <Route path="/stock-insights" element={<StockInsights />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
