import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const LandingPage = ({ onStartSession }) => {
  const [showModal, setShowModal] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    setError('');

    if (!roomName.trim() || !userName.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/rooms', {
        roomName: roomName.trim(),
        creatorName: userName.trim()
      });

      const { roomId } = response.data;
      const userId = `user-${Date.now()}`;

      onStartSession({
        roomId,
        roomName: roomName.trim(),
        userName: userName.trim(),
        userId
      });
    } catch (err) {
      console.error('Error creating room:', err);
      setError('Failed to create room. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fibonacciCards = [1, 2, 3, 5, 8, 13];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <motion.section
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <motion.h1
            className="hero-title"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ESTIMATE SMARTER.<br />DELIVER BETTER.
          </motion.h1>
          
          <motion.p
            className="hero-subtitle"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Bias-free • AI-powered • Built for Agile Teams
          </motion.p>

          <motion.button
            className="cta-button"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
          >
            Start Planning Session
          </motion.button>
        </div>

        {/* Mockup Display */}
        <motion.div
          className="mockup-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {/* Laptop Mockup */}
          <div className="laptop-mockup">
            <div className="laptop-screen">
              <div className="poker-board-preview">
                <div className="preview-header">
                  <div className="preview-dot"></div>
                  <div className="preview-dot"></div>
                  <div className="preview-dot"></div>
                </div>
                <div className="preview-content">
                  <div className="preview-cards">
                    {fibonacciCards.map((value, index) => (
                      <motion.div
                        key={value}
                        className="preview-card"
                        animate={{
                          y: [0, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          delay: index * 0.1,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        {value}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Mockup */}
          <motion.div
            className="mobile-mockup"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="mobile-screen">
              <div className="mobile-cards">
                {[3, 5, 8].map((value) => (
                  <div key={value} className="mobile-card">{value}</div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Floating AI Insight Panel */}
          <motion.div
            className="floating-panel ai-preview"
            animate={{
              y: [0, -10, 0],
              rotate: [-1, 1, -1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="panel-header">
              <span className="panel-icon">🤖</span>
              <span className="panel-title">AI Insight</span>
            </div>
            <div className="panel-content">
              <div className="suggested-estimate">5</div>
              <div className="confidence-label">Confidence: 89%</div>
            </div>
          </motion.div>

          {/* Floating Analytics Panel */}
          <motion.div
            className="floating-panel analytics-preview"
            animate={{
              y: [0, 10, 0],
              rotate: [1, -1, 1]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="panel-header">
              <span className="panel-icon">📊</span>
              <span className="panel-title">Analytics</span>
            </div>
            <div className="mini-chart">
              <div className="chart-bar" style={{ height: '40%' }}></div>
              <div className="chart-bar" style={{ height: '60%' }}></div>
              <div className="chart-bar" style={{ height: '80%' }}></div>
              <div className="chart-bar" style={{ height: '100%' }}></div>
            </div>
          </motion.div>

          {/* Team Member Avatars */}
          <motion.div
            className="floating-avatars"
            animate={{
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {['#00d9ff', '#b794f6', '#ffd93d'].map((color, index) => (
              <div key={index} className="avatar-preview" style={{ backgroundColor: color }}>
                <div className="avatar-status"></div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="features-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="features-title">Why Teams Choose Us</h2>
        <div className="features-grid">
          {[
            {
              icon: '⚡',
              title: 'Real-time Collaboration',
              description: 'Synchronize estimates instantly across all team members with WebSocket technology'
            },
            {
              icon: '🤖',
              title: 'AI-Powered Insights',
              description: 'Get intelligent estimation suggestions based on historical data and patterns'
            },
            {
              icon: '📈',
              title: 'Advanced Analytics',
              description: 'Track team performance, velocity trends, and estimation accuracy over time'
            },
            {
              icon: '🎮',
              title: 'Gamified Experience',
              description: 'Earn badges and achievements while maintaining engagement and motivation'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Create Room Modal */}
      {showModal && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title">Create Planning Room</h2>
            <form onSubmit={handleCreateRoom}>
              <div className="form-group">
                <label htmlFor="roomName">Room Name</label>
                <input
                  type="text"
                  id="roomName"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="e.g., Sprint 24 Planning"
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="userName">Your Name</label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g., John Doe"
                  disabled={loading}
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowModal(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Room'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default LandingPage;
