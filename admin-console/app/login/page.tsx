'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const data = await response.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Animated Background */}
        <div className="bg-animation">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>

        {/* Login Card */}
        <div className="login-card glass">
          {/* Logo Section */}
          <div className="login-header">
            <div className="logo-large">🤖</div>
            <h1 className="login-title">Discord Copilot</h1>
            <p className="login-subtitle">Admin Control Center</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="alert alert-error">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="username" className="form-label">
                <span className="label-icon">👤</span>
                Username
              </label>
              <input
                id="username"
                type="text"
                className="form-input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <span className="label-icon">🔒</span>
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-login"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Logging in...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Login
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="login-footer">
            <p className="footer-text">
              Default credentials: <code>admin</code> / <code>admin123</code>
            </p>
            <p className="footer-hint">
              💡 Change your password after first login
            </p>
          </div>
        </div>

        {/* Info Card */}
        <div className="info-card glass">
          <h3 className="info-title">✨ Features</h3>
          <ul className="feature-list">
            <li>
              <span className="feature-icon">⚙️</span>
              <span>Configure AI system instructions</span>
            </li>
            <li>
              <span className="feature-icon">📢</span>
              <span>Manage Discord channels</span>
            </li>
            <li>
              <span className="feature-icon">💭</span>
              <span>View conversation history</span>
            </li>
            <li>
              <span className="feature-icon">📚</span>
              <span>Upload PDF knowledge base</span>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .bg-animation {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          z-index: 0;
        }

        .circle {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          opacity: 0.1;
          filter: blur(60px);
          animation: float 20s ease-in-out infinite;
        }

        .circle-1 {
          width: 400px;
          height: 400px;
          top: -200px;
          left: -200px;
          animation-delay: 0s;
        }

        .circle-2 {
          width: 300px;
          height: 300px;
          bottom: -150px;
          right: -150px;
          animation-delay: 7s;
        }

        .circle-3 {
          width: 250px;
          height: 250px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 14s;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .login-container {
          position: relative;
          z-index: 1;
          display: flex;
          gap: 24px;
          max-width: 900px;
          width: 100%;
        }

        .login-card {
          flex: 1;
          max-width: 450px;
          padding: 48px 40px;
          border-radius: 24px;
          animation: slideUp 0.6s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .login-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .logo-large {
          font-size: 72px;
          margin-bottom: 16px;
          animation: float 3s ease-in-out infinite;
        }

        .login-title {
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 8px 0;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .login-subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          margin: 0;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .label-icon {
          font-size: 16px;
        }

        .form-input {
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 15px;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 4px rgba(var(--primary-rgb), 0.1);
        }

        .form-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-login {
          margin-top: 8px;
          padding: 16px;
          font-size: 16px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .login-footer {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }

        .footer-text {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0 0 8px 0;
        }

        .footer-text code {
          padding: 2px 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          font-family: 'Courier New', monospace;
          color: var(--primary);
        }

        .footer-hint {
          font-size: 12px;
          color: var(--text-secondary);
          margin: 0;
          opacity: 0.7;
        }

        .info-card {
          flex: 1;
          max-width: 350px;
          padding: 32px;
          border-radius: 24px;
          animation: slideUp 0.6s ease-out 0.2s both;
        }

        .info-title {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 24px 0;
          color: var(--text-primary);
        }

        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .feature-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .feature-list li:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateX(4px);
        }

        .feature-icon {
          font-size: 20px;
          flex-shrink: 0;
        }

        .feature-list li span:last-child {
          font-size: 14px;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
            align-items: center;
          }

          .login-card,
          .info-card {
            max-width: 100%;
          }

          .login-card {
            padding: 32px 24px;
          }

          .logo-large {
            font-size: 56px;
          }

          .login-title {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
}
