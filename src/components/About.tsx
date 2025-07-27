import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaShieldAlt, 
  FaLightbulb, 
  FaRocket,
  FaCheckCircle,
  FaStar
} from 'react-icons/fa';
import './About.css';

const About: React.FC = () => {
  const values = [
    {
      icon: <FaShieldAlt />,
      title: "Security First",
      description: "Your financial data is protected with bank-grade encryption and security protocols."
    },
    {
      icon: <FaLightbulb />,
      title: "Innovation",
      description: "We continuously innovate to bring you the latest in AI-powered financial technology."
    },
    {
      icon: <FaUsers />,
      title: "User-Centric",
      description: "Every feature is designed with our users' needs and feedback at the center."
    },
    {
      icon: <FaRocket />,
      title: "Performance",
      description: "Lightning-fast analysis and real-time insights to keep you ahead of the market."
    }
  ];

  const achievements = [
    { number: "50,000+", label: "Active Users" },
    { number: "₹10,000+ Cr", label: "Assets Managed" },
    { number: "99.9%", label: "Uptime" },
    { number: "4.9/5", label: "User Rating" }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Investment Analyst",
      content: "FlexiFi has transformed how I analyze my portfolio. The AI insights are incredibly accurate and have helped me make better investment decisions.",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "Entrepreneur",
      content: "The voice command feature is a game-changer. I can get complex financial analysis just by asking questions naturally.",
      rating: 5
    },
    {
      name: "Anita Patel",
      role: "Financial Advisor",
      content: "My clients love the visual dashboards. It makes explaining complex financial concepts so much easier.",
      rating: 5
    }
  ];

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about-header">
          <h2 className="section-title">About FlexiFi</h2>
          <p className="section-subtitle">
            We're on a mission to democratize financial intelligence through AI,
            making sophisticated financial analysis accessible to everyone.
          </p>
        </div>

        <div className="about-content">
          <div className="about-story">
            <h3>Our Story</h3>
            <p>
              FlexiFi was born from the vision of making financial analysis as simple as having a conversation. 
              Our team of AI experts, financial analysts, and UX designers came together to create a platform 
              that bridges the gap between complex financial data and actionable insights.
            </p>
            <p>
              By leveraging the power of Fi MCP (Model Context Protocol), we've built an intelligent system 
              that understands your financial goals and provides personalized recommendations to help you 
              achieve them.
            </p>
            <div className="story-highlights">
              <div className="highlight">
                <FaCheckCircle />
                <span>AI-powered financial analysis</span>
              </div>
              <div className="highlight">
                <FaCheckCircle />
                <span>Natural language processing</span>
              </div>
              <div className="highlight">
                <FaCheckCircle />
                <span>Real-time market insights</span>
              </div>
            </div>
          </div>

          <div className="about-values">
            <h3>Our Values</h3>
            <div className="values-grid">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="value-card"
                >
                  <div className="value-icon">{value.icon}</div>
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="achievements">
          <h3>Our Achievements</h3>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="achievement-card"
              >
                <div className="achievement-number">{achievement.number}</div>
                <div className="achievement-label">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="testimonials">
          <h3>What Our Users Say</h3>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card"
              >
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
                <div className="testimonial-author">
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-role">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
