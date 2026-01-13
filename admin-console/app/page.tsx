'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo">
            <span className="logo-icon">◆</span>
            <span className="logo-text">Figmenta Copilot</span>
          </div>
          <button 
            className="btn btn-outline"
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
              Intelligent Discord Assistant
            </h1>
            <p className="hero-description">
              AI-powered bot with knowledge base, conversation memory, and customizable responses. 
              Built for modern Discord communities.
            </p>
            <div className="hero-actions">
              <button 
                className="btn btn-primary"
                onClick={() => window.open('https://discord.com/api/oauth2/authorize?client_id=1460267725149700209&permissions=2048&scope=bot', '_blank')}
              >
                Add to Discord
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => router.push('/login')}
              >
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-number">01</div>
              <h3 className="feature-title">Custom Instructions</h3>
              <p className="feature-text">
                Define your bot's personality and behavior with custom system instructions
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">02</div>
              <h3 className="feature-title">Knowledge Base</h3>
              <p className="feature-text">
                Upload PDFs and documents for intelligent context-aware responses
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">03</div>
              <h3 className="feature-title">Conversation Memory</h3>
              <p className="feature-text">
                Maintains context across conversations for natural interactions
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">04</div>
              <h3 className="feature-title">Channel Control</h3>
              <p className="feature-text">
                Choose which channels the bot responds to with easy management
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">05</div>
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-text">
                Powered by advanced AI for instant, intelligent responses
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">06</div>
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
          <div className="cta-content">
            <h2 className="cta-title">Ready to get started?</h2>
            <p className="cta-text">
              Transform your Discord server with intelligent automation
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => window.open('https://discord.com/api/oauth2/authorize?client_id=1460267725149700209&permissions=2048&scope=bot', '_blank')}
            >
              Add to Discord
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p className="footer-text">Figmenta Copilot © 2026</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .landing-page {
          min-height: 100vh;
          background: #000000;
          color: #ffffff;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Navigation */
        .navbar {
          border-bottom: 1px solid #1a1a1a;
          padding: 24px 0;
          position: sticky;
          top: 0;
          background: #000000;
          z-index: 100;
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
          font-size: 24px;
          color: #ffffff;
        }

        .logo-text {
          font-size: 20px;
          font-weight: 600;
          letter-spacing: -0.5px;
        }

        /* Buttons */
        .btn {
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: inherit;
        }

        .btn-outline {
          background: transparent;
          border: 1px solid #333333;
          color: #ffffff;
        }

        .btn-outline:hover {
          border-color: #ffffff;
        }

        .btn-primary {
          background: #ffffff;
          color: #000000;
          border: 1px solid #ffffff;
        }

        .btn-primary:hover {
          background: #f5f5f5;
        }

        .btn-secondary {
          background: transparent;
          border: 1px solid #333333;
          color: #ffffff;
        }

        .btn-secondary:hover {
          border-color: #ffffff;
        }

        /* Hero */
        .hero {
          padding: 120px 0;
          border-bottom: 1px solid #1a1a1a;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .hero-title {
          font-size: 64px;
          font-weight: 600;
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -2px;
        }

        .hero-description {
          font-size: 20px;
          line-height: 1.6;
          color: #999999;
          margin-bottom: 48px;
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

        /* Features */
        .features {
          padding: 120px 0;
          border-bottom: 1px solid #1a1a1a;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1px;
          background: #1a1a1a;
          border: 1px solid #1a1a1a;
        }

        .feature-card {
          padding: 48px 32px;
          background: #000000;
          transition: background 0.2s ease;
        }

        .feature-card:hover {
          background: #0a0a0a;
        }

        .feature-number {
          font-size: 14px;
          color: #666666;
          margin-bottom: 24px;
          font-weight: 500;
        }

        .feature-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }

        .feature-text {
          font-size: 15px;
          line-height: 1.6;
          color: #999999;
        }

        /* CTA */
        .cta {
          padding: 120px 0;
          border-bottom: 1px solid #1a1a1a;
        }

        .cta-content {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }

        .cta-title {
          font-size: 48px;
          font-weight: 600;
          margin-bottom: 16px;
          letter-spacing: -1px;
        }

        .cta-text {
          font-size: 18px;
          color: #999999;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        /* Footer */
        .footer {
          padding: 48px 0;
        }

        .footer-content {
          text-align: center;
        }

        .footer-text {
          font-size: 14px;
          color: #666666;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 40px;
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

          .hero-actions {
            flex-direction: column;
            width: 100%;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
