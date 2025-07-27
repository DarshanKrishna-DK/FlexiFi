import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaChartBar, 
  FaBrain, 
  FaMicrophone, 
  FaChartLine, 
  FaCogs,
  FaEye,
  FaRocket,
  FaShieldAlt
} from 'react-icons/fa';
import './Features.css';

const Features: React.FC = () => {
  const features = [
    {
      icon: <FaChartBar />,
      title: "Asset Visualizations",
      description: "Interactive dashboards that transform your financial data into beautiful, easy-to-understand visualizations.",
      color: "#8B5CF6"
    },
    {
      icon: <FaBrain />,
      title: "AI-Powered Insights",
      description: "Get deep insights about your assets and finances powered by advanced machine learning algorithms.",
      color: "#A855F7"
    },
    {
      icon: <FaMicrophone />,
      title: "Voice & Text Prompts",
      description: "Generate custom visualizations and analysis simply by describing what you need in natural language.",
      color: "#EC4899"
    },
    {
      icon: <FaChartLine />,
      title: "Investment Analysis",
      description: "Comprehensive analysis and predictions for stocks, SIPs, mutual funds, and other investment instruments.",
      color: "#06B6D4"
    },
    {
      icon: <FaCogs />,
      title: "Tool Integration",
      description: "Seamlessly integrate with your existing financial tools and platforms for a unified experience.",
      color: "#10B981"
    },
    {
      icon: <FaEye />,
      title: "Real-time Monitoring",
      description: "Stay updated with real-time market data and portfolio performance tracking.",
      color: "#F59E0B"
    }
  ];



  return (
    <section id="features" className="features section">
      <div className="container">
        <div className="features-header">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-subtitle">
            Discover how FlexiFi revolutionizes financial management with cutting-edge AI technology
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
            >
              <div
                className="feature-icon"
                style={{ background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)` }}
              >
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="features-cta">
          <div className="cta-content">
            <FaRocket className="cta-icon" />
            <h3>Ready to Transform Your Financial Journey?</h3>
            <p>Join thousands of users who are already making smarter financial decisions with FlexiFi</p>
            <button className="btn btn-primary">
              <FaShieldAlt />
              Get Started Securely
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
