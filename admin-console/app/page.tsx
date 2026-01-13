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
        <div className="grid-overlay"></div>
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo">
            <span className="logo-icon">🤖</span>
            <span className="logo-text">Discord Copilot</span>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => router.push('/login')}
          >
            <span>🚀</span>
            Admin Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Your AI-Powered
              <br />
              <span className="gradient-text">Discord Assistant</span>
            </h1>
            <p className="hero-subtitle">
              Intelligent bot with RAG knowledge base, conversation memory, 
              and customizable AI responses. Powered by Groq & Supabase.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary btn-large"
                onClick={() => router.push('/login')}
              >
                <span>🎯</span>
                Get Started
              </button>
              <button 
                className="btn btn-secondary btn-large"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>✨</span>
                Learn More
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card glass">
              <div className="card-header">
                <div className="status-dot active"></div>
                <span>Bot Online</span>
              </div>
              <div className="card-content">
                <div className="message-preview">
                  <div className="message user">
                    <span className="avatar">👤</span>
                    <span>How do I deploy this?</span>
                  </div>
                  <div className="message bot">
                    <span className="avatar">🤖</span>
                    <span>I can help! Based on the docs...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-subtitle">Everything you need to manage your AI Discord bot</p>
          </div>

          <div className="features-grid">
            <div className="feature-card glass">
              <div className="feature-icon">⚙️</div>
              <h3 className="feature-title">Custom Instructions</h3>
              <p className="feature-description">
                Configure AI behavior with custom system instructions. 
                Define personality, tone, and response style.
              </p>
            </div>

            <div className="feature-card glass">
              <div className="feature-icon">📢</div>
              <h3 className="feature-title">Channel Management</h3>
              <p className="feature-description">
                Control which Discord channels the bot responds to. 
                Easy allow-list configuration.
              </p>
            </div>

            <div className="feature-card glass">
              <div className="feature-icon">💭</div>
              <h3 className="feature-title">Conversation Memory</h3>
              <p className="feature-description">
                View full conversation history and context. 
                Reset memory per channel when needed.
              </p>
            </div>

            <div className="feature-card glass">
              <div className="feature-icon">📚</div>
              <h3 className="feature-title">RAG Knowledge Base</h3>
              <p className="feature-description">
                Upload PDFs for the bot to reference. 
                Powered by Supabase pgvector for fast retrieval.
              </p>
            </div>

            <div className="feature-card glass">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-description">
                Powered by Groq's Llama 3.3 70B. 
                10x faster than traditional AI models.
              </p>
            </div>

            <div className="feature-card glass">
              <div className="feature-icon">💰</div>
              <h3 className="feature-title">100% Free</h3>
              <p className="feature-description">
                Uses free tiers: Groq, Hugging Face, Supabase. 
                Zero monthly costs for hosting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="tech-stack">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Built with Modern Tech</h2>
            <p className="section-subtitle">Powered by industry-leading technologies</p>
          </div>

          <div className="tech-grid">
            <div className="tech-item">
              <div className="tech-badge">🚀</div>
              <span>Groq AI</span>
            </div>
            <div className="tech-item">
              <div className="tech-badge">🗄️</div>
              <span>Supabase</span>
            </div>
            <div className="tech-item">
              <div className="tech-badge">🤗</div>
              <span>Hugging Face</span>
            </div>
            <div className="tech-item">
              <div className="tech-badge">⚛️</div>
              <span>Next.js 14</span>
            </div>
            <div className="tech-item">
              <div className="tech-badge">💬</div>
              <span>Discord.js</span>
            </div>
            <div className="tech-item">
              <div className="tech-badge">🔷</div>
              <span>TypeScript</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-card glass">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-subtitle">
              Deploy your AI Discord bot in minutes
            </p>
            <button 
              className="btn btn-primary btn-large"
              onClick={() => router.push('/login')}
            >
              <span>🎯</span>
              Access Admin Panel
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="footer-text">
            Discord Copilot © 2026 • Built with ❤️ using free & open-source technologies
          </p>
        </div>
      </footer>

      <style jsx>{`
        .landing-page {
          min-height: 100vh;
          background: var(--bg-primary);
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
          background: linear-gradient(135deg, var(--primary), var(--accent));
          opacity: 0.08;
          filter: blur(80px);
          animation: float 25s ease-in-out infinite;
        }

        .circle-1 {
          width: 500px;
          height: 500px;
          top: -250px;
          left: -250px;
        }

        .circle-2 {
          width: 400px;
          height: 400px;
          bottom: -200px;
          right: -200px;
          animation-delay: 8s;
        }

        .circle-3 {
          width: 350px;
          height: 350px;
          top: 40%;
          right: 10%;
          animation-delay: 16s;
        }

        .grid-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 50px 50px;
          opacity: 0.5;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -50px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }

        .navbar {
          position: relative;
          z-index: 10;
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
          animation: float 3s ease-in-out infinite;
        }

        .logo-text {
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero {
          position: relative;
          z-index: 1;
          padding: 100px 0 120px;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .hero-title {
          font-size: 56px;
          font-weight: 800;
          line-height: 1.1;
          margin: 0 0 24px 0;
          color: var(--text-primary);
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--primary), var(--accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 20px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0 0 40px 0;
          max-width: 500px;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-large {
          padding: 16px 32px;
          font-size: 16px;
          font-weight: 600;
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .floating-card {
          width: 100%;
          max-width: 400px;
          padding: 24px;
          border-radius: 20px;
          animation: floatCard 4s ease-in-out infinite;
        }

        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          font-weight: 600;
          color: var(--success);
        }

        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--success);
          animation: pulse 2s ease-in-out infinite;
        }

        .message-preview {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .message {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          font-size: 14px;
          animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .avatar {
          font-size: 20px;
          flex-shrink: 0;
        }

        .features {
          position: relative;
          z-index: 1;
          padding: 80px 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title {
          font-size: 42px;
          font-weight: 700;
          margin: 0 0 16px 0;
          color: var(--text-primary);
        }

        .section-subtitle {
          font-size: 18px;
          color: var(--text-secondary);
          margin: 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .feature-card {
          padding: 32px;
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .feature-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .feature-title {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 12px 0;
          color: var(--text-primary);
        }

        .feature-description {
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0;
        }

        .tech-stack {
          position: relative;
          z-index: 1;
          padding: 80px 0;
          background: rgba(255, 255, 255, 0.02);
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
        }

        .tech-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 24px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .tech-item:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-4px);
        }

        .tech-badge {
          font-size: 32px;
        }

        .tech-item span {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .cta {
          position: relative;
          z-index: 1;
          padding: 80px 0;
        }

        .cta-card {
          text-align: center;
          padding: 60px 40px;
          border-radius: 24px;
        }

        .cta-title {
          font-size: 36px;
          font-weight: 700;
          margin: 0 0 16px 0;
          color: var(--text-primary);
        }

        .cta-subtitle {
          font-size: 18px;
          color: var(--text-secondary);
          margin: 0 0 32px 0;
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
          color: var(--text-secondary);
          margin: 0;
        }

        @media (max-width: 968px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .hero-title {
            font-size: 42px;
          }

          .hero-visual {
            order: -1;
          }

          .section-title {
            font-size: 32px;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
