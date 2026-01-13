'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="landing-page">
      {/* Animated Background */}
      <div className="bg-animation">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>

      {/* Navigation */}
      <nav className="navbar glass-nav">
        <div className="container nav-content">
          <div className="logo">
            <span className="logo-icon">🤖</span>
            <span className="logo-text">Discord Copilot</span>
          </div>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => router.push('/login')}
          >
            Admin Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Your Intelligent
              <br />
              <span className="gradient-text">Discord Assistant</span>
            </h1>
            <p className="hero-description">
              AI-powered bot with knowledge base, conversation memory, and customizable responses. 
              Enhance your Discord server with intelligent automation.
            </p>
            <div className="hero-actions">
              <button 
                className="btn btn-primary btn-large"
                onClick={() => window.open('https://discord.com/api/oauth2/authorize?client_id=1460267725149700209&permissions=2048&scope=bot', '_blank')}
              >
                <span>💬</span>
                Add to Discord
              </button>
              <button 
                className="btn btn-glass btn-large"
                onClick={() => router.push('/login')}
              >
                <span>⚙️</span>
                Admin Panel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card glass">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">⚙️</div>
              </div>
              <h3 className="feature-title">Custom Instructions</h3>
              <p className="feature-text">
                Define your bot's personality and behavior with custom system instructions
              </p>
            </div>

            <div className="feature-card glass">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">📚</div>
              </div>
              <h3 className="feature-title">Knowledge Base</h3>
              <p className="feature-text">
                Upload PDFs and documents for intelligent context-aware responses
              </p>
            </div>

            <div className="feature-card glass">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">💭</div>
              </div>
              <h3 className="feature-title">Conversation Memory</h3>
              <p className="feature-text">
                Maintains context across conversations for natural interactions
              </p>
            </div>

            <div className="feature-card glass">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">📢</div>
              </div>
              <h3 className="feature-title">Channel Control</h3>
              <p className="feature-text">
                Choose which channels the bot responds to with easy management
              </p>
            </div>

            <div className="feature-card glass">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">⚡</div>
              </div>
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-text">
                Powered by advanced AI for instant, intelligent responses
              </p>
            </div>

            <div className="feature-card glass">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">🎯</div>
              </div>
              <h3 className="feature-title">Easy Setup</h3>
              <p className="feature-text">
                Get started in minutes with our intuitive admin dashboard
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content glass">
            <h2 className="cta-title">Ready to enhance your Discord server?</h2>
            <p className="cta-text">
              Join servers already using Discord Copilot for smarter conversations
            </p>
            <div className="cta-buttons">
              <button 
                className="btn btn-primary btn-large"
                onClick={() => window.open('https://discord.com/api/oauth2/authorize?client_id=1460267725149700209&permissions=2048&scope=bot', '_blank')}
              >
                <span>💬</span>
                Add to Discord
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="footer-text">
            Discord Copilot © 2026
          </p>
        </div>
      </footer>

      <style jsx>{`
        .landing-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
          position: relative;
          overflow-x: hidden;
        }

        .bg-animation {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
          pointer-events: none;
        }

        .circle {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3));
          filter: blur(100px);
          animation: float 30s ease-in-out infinite;
        }

        .circle-1 {
          width: 600px;
          height: 600px;
          top: -300px;
          left: -200px;
        }

        .circle-2 {
          width: 500px;
          height: 500px;
          bottom: -250px;
          right: -150px;
          animation-delay: 10s;
        }

        .circle-3 {
          width: 400px;
          height: 400px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 20s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(100px, -100px) scale(1.1); }
          66% { transform: translate(-50px, 50px) scale(0.9); }
        }

        .glass-nav {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 20px 0;
        }

        .nav-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon {
          font-size: 32px;
        }

        .logo-text {
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .btn-sm {
          padding: 10px 20px;
          font-size: 14px;
        }

        .hero {
          position: relative;
          z-index: 1;
          padding: 120px 0 100px;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .hero-title {
          font-size: 72px;
          font-weight: 800;
          line-height: 1.1;
          margin: 0 0 32px 0;
          color: white;
        }

        .gradient-text {
          background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 20px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 48px 0;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-large {
          padding: 18px 36px;
          font-size: 16px;
          font-weight: 600;
        }

        .btn-glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
        }

        .btn-glass:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .features {
          position: relative;
          z-index: 1;
          padding: 80px 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .feature-card {
          padding: 40px 32px;
          border-radius: 24px;
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: center;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .feature-icon-wrapper {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2));
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .feature-icon {
          font-size: 40px;
        }

        .feature-title {
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 12px 0;
          color: white;
        }

        .feature-text {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        .cta {
          position: relative;
          z-index: 1;
          padding: 80px 0 100px;
        }

        .cta-content {
          max-width: 700px;
          margin: 0 auto;
          padding: 60px 40px;
          border-radius: 32px;
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }

        .cta-title {
          font-size: 40px;
          font-weight: 700;
          margin: 0 0 16px 0;
          color: white;
        }

        .cta-text {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 40px 0;
        }

        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
        }

        .footer {
          position: relative;
          z-index: 1;
          padding: 40px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-text {
          text-align: center;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 48px;
          }

          .hero-description {
            font-size: 18px;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .cta-title {
            font-size: 32px;
          }

          .hero-actions,
          .cta-buttons {
            flex-direction: column;
          }

          .btn-large {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
