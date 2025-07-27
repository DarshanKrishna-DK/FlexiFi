import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaBullseye,
  FaCheck,
  FaStar,
  FaRobot,
  FaPaperPlane,
  FaUser
} from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
import { geminiService, GeminiMessage } from '../services/geminiService';
import './FuturePlanner.css';



interface FinancialPlan {
  id: string;
  title: string;
  description: string;
  goalAmount: string;
  timeframe: string;
  tasks: FinancialTask[];
  priority: 'high' | 'medium' | 'low';
  category: string;
  recommended?: boolean;
}

interface FinancialTask {
  id: string;
  description: string;
  amount?: string;
  deadline?: string;
  completed: boolean;
  type: 'save' | 'limit' | 'invest' | 'loan' | 'budget' | 'goal';
}

const FuturePlanner: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [chatMessages, setChatMessages] = useState<GeminiMessage[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your Financial Planning Assistant. I can help you create personalized financial plans, analyze your goals, and provide investment advice. What would you like to plan for today?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [chatMessage, setChatMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Mock AI-generated financial plans
  const financialPlans: FinancialPlan[] = [
    {
      id: 'plan-a',
      title: 'Emergency Fund Builder',
      description: 'Build a solid financial foundation with emergency savings and expense management.',
      goalAmount: '₹3,00,000',
      timeframe: '12 months',
      category: 'Savings',
      priority: 'high',
      recommended: true,
      tasks: [
        {
          id: 'task-1',
          description: 'Set monthly expenditure limit to ₹25,000',
          amount: '₹25,000',
          type: 'limit',
          completed: false
        },
        {
          id: 'task-2',
          description: 'Save ₹25,000 every month in emergency fund',
          amount: '₹25,000',
          deadline: 'Monthly',
          type: 'save',
          completed: false
        },
        {
          id: 'task-3',
          description: 'Reduce dining out budget to ₹3,000 per month',
          amount: '₹3,000',
          type: 'budget',
          completed: false
        },
        {
          id: 'task-4',
          description: 'Open high-yield savings account for emergency fund',
          type: 'goal',
          completed: false
        },
        {
          id: 'task-5',
          description: 'Review and optimize monthly subscriptions (target: save ₹2,000)',
          amount: '₹2,000',
          type: 'budget',
          completed: false
        }
      ]
    },
    {
      id: 'plan-b',
      title: 'Investment Growth Strategy',
      description: 'Accelerate wealth building through strategic investments and loan optimization.',
      goalAmount: '₹15,00,000',
      timeframe: '24 months',
      category: 'Investment',
      priority: 'medium',
      tasks: [
        {
          id: 'task-6',
          description: 'Invest ₹40,000 monthly in diversified mutual funds',
          amount: '₹40,000',
          deadline: 'Monthly',
          type: 'invest',
          completed: false
        },
        {
          id: 'task-7',
          description: 'Take personal loan of ₹5,00,000 for 3 years at 12% interest',
          amount: '₹5,00,000',
          deadline: '3 years',
          type: 'loan',
          completed: false
        },
        {
          id: 'task-8',
          description: 'Limit monthly expenses to ₹35,000 (excluding EMIs)',
          amount: '₹35,000',
          type: 'limit',
          completed: false
        },
        {
          id: 'task-9',
          description: 'Allocate ₹15,000 monthly to equity investments',
          amount: '₹15,000',
          type: 'invest',
          completed: false
        },
        {
          id: 'task-10',
          description: 'Set up SIP for ₹20,000 in large-cap funds',
          amount: '₹20,000',
          type: 'invest',
          completed: false
        },
        {
          id: 'task-11',
          description: 'Create separate budget for loan EMI: ₹16,500 monthly',
          amount: '₹16,500',
          type: 'budget',
          completed: false
        }
      ]
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(selectedPlan === planId ? null : planId);
  };

  const handleToggleTask = (taskId: string) => {
    setCompletedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const getTaskIcon = (type: FinancialTask['type']) => {
    switch (type) {
      case 'save':
        return '💰';
      case 'limit':
        return '🚫';
      case 'invest':
        return '📈';
      case 'loan':
        return '🏦';
      case 'budget':
        return '📊';
      case 'goal':
        return '🎯';
      default:
        return '✅';
    }
  };

  const getPriorityColor = (priority: FinancialPlan['priority']) => {
    switch (priority) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;

    const userMessage: GeminiMessage = {
      role: 'user',
      content: chatMessage,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatMessage('');
    setIsTyping(true);

    try {
      const response = await geminiService.sendMessage(chatMessage);
      const assistantMessage: GeminiMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString()
      };
      setChatMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: GeminiMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <Header />
      <div className="future-planner">
        <div className="planner-header">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>
              <FaBullseye className="header-icon" />
              Financial Goal Planner
            </h1>
            <p>AI-generated personalized financial roadmaps to achieve your goals</p>
          </motion.div>
        </div>

        <div className="planner-content">
          {/* Chatbot Section */}
          <motion.section
            className="chatbot-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="chatbot-container">
              <div className="chatbot-header">
                <FaRobot className="chatbot-icon" />
                <h3>Financial Planning Assistant</h3>
                <p>Ask me anything about your financial goals and planning strategies</p>
              </div>

              <div className="chat-messages">
                {chatMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    className={`message ${message.role}`}
                    initial={{ opacity: 0, x: message.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="message-avatar">
                      {message.role === 'user' ? <FaUser /> : <FaRobot />}
                    </div>
                    <div className="message-content">
                      <p>{message.content}</p>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    className="message assistant typing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="message-avatar">
                      <FaRobot />
                    </div>
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="chat-input-container">
                <input
                  type="text"
                  className="chat-input"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about investment strategies, savings goals, budgeting tips..."
                />
                <button
                  className="send-button"
                  onClick={handleSendMessage}
                  disabled={!chatMessage.trim() || isTyping}
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </motion.section>

        {/* Financial Plans Section */}
        <motion.section
          className="financial-plans-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="section-title">Your Personalized Financial Plans</h2>
          <div className="plans-grid">
            {financialPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                className={`financial-plan-card ${selectedPlan === plan.id ? 'expanded' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                {plan.recommended && (
                  <div className="recommended-badge">
                    <FaStar />
                    Recommended
                  </div>
                )}

                <div className="plan-header">
                  <div className="plan-meta">
                    <span
                      className="priority-indicator"
                      style={{ backgroundColor: getPriorityColor(plan.priority) }}
                    >
                      {plan.priority.toUpperCase()}
                    </span>
                    <span className="plan-category">{plan.category}</span>
                  </div>
                  <h3>{plan.title}</h3>
                  <p className="plan-description">{plan.description}</p>
                </div>

                <div className="plan-summary">
                  <div className="summary-item">
                    <span className="label">Target Amount</span>
                    <span className="value">{plan.goalAmount}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Timeframe</span>
                    <span className="value">{plan.timeframe}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Tasks</span>
                    <span className="value">{plan.tasks.length} items</span>
                  </div>
                </div>

                <div className="plan-progress">
                  <div className="progress-header">
                    <span>Progress</span>
                    <span>{Math.round((plan.tasks.filter(task => completedTasks.has(task.id)).length / plan.tasks.length) * 100)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${(plan.tasks.filter(task => completedTasks.has(task.id)).length / plan.tasks.length) * 100}%`
                      }}
                    />
                  </div>
                </div>

                {/* Action Plan - Always Visible */}
                <div className="plan-tasks">
                  <h4>Action Plan</h4>
                  <div className="tasks-list">
                    {plan.tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`task-item ${completedTasks.has(task.id) ? 'completed' : ''}`}
                      >
                        <button
                          className="task-checkbox"
                          onClick={() => handleToggleTask(task.id)}
                        >
                          {completedTasks.has(task.id) ? <FaCheck /> : ''}
                        </button>
                        <div className="task-content">
                          <div className="task-header">
                            <span className="task-icon">{getTaskIcon(task.type)}</span>
                            <span className="task-description">{task.description}</span>
                          </div>
                          <div className="task-details">
                            {task.amount && (
                              <span className="task-amount">{task.amount}</span>
                            )}
                            {task.deadline && (
                              <span className="task-deadline">Due: {task.deadline}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="plan-actions">
                  <button
                    className="choose-plan-btn"
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    Choose Plan
                  </button>
                  <button
                    className="talk-agent-btn"
                    onClick={() => console.log('Talk to FutureAgent for plan:', plan.id)}
                  >
                    Talk to FutureAgent
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FuturePlanner;
