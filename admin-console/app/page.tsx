'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Navbar animation
      gsap.from('.navbar', {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Hero animations with timeline
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      heroTl
        .from('.hero-title', {
          y: 80,
          opacity: 0,
          duration: 1,
        })
        .from('.hero-description', {
          y: 40,
          opacity: 0,
          duration: 0.8,
        }, '-=0.5')
        .from('.hero-btn', {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2,
        }, '-=0.4');

      // Feature cards with scroll trigger
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });

      // CTA animation
      gsap.from('.cta-content', {
        scrollTrigger: {
          trigger: '.cta',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.2)',
      });

      // Floating animation for icons
      gsap.to('.feature-icon', {
        y: -10,
        duration: 2,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="landing-page" ref={containerRef}>
      {/* Animated Background */}
      <div className="bg-animation">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="grid-pattern"></div>
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo">
            <span className="logo-icon">🤖</span>
            <span className="logo-text">Figmenta Copilot</span>
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
              Transform your Discord server with AI-powered conversations, intelligent knowledge retrieval, 
              and seamless automation. Built for modern communities.
            </p>
            <div className="hero-actions">
              <button 
                className="btn btn-primary btn-large hero-btn"
                onClick={() => window.open('https://discord.com/api/oauth2/authorize?client_id=1460267725149700209&permissions=2048&scope=bot', '_blank')}
              >
                <span>💬</span>
                Add to Discord
              </button>
              <button 
                className="btn btn-glass btn-large hero-btn"
                onClick={() => router.push('/login')}
              >
                <span>⚙️</span>
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-subtitle">Everything you need for an intelligent Discord bot</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">⚙️</div>
              </div>
              <h3 className="feature-title">Custom Instructions</h3>
              <p className="feature-text">
                Define personality, tone, and behavior. Make your bot truly yours with custom AI instructions.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">📚</div>
              </div>
              <h3 className="feature-title">Knowledge Base</h3>
              <p className="feature-text">
                Upload PDFs and documents. Your bot retrieves accurate information from your knowledge base.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">💭</div>
              </div>
              <h3 className="feature-title">Conversation Memory</h3>
              <p className="feature-text">
                Maintains context across conversations for natural, flowing interactions with users.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">📢</div>
              </div>
              <h3 className="feature-title">Channel Control</h3>
              <p className="feature-text">
                Choose exactly which channels your bot responds to. Full control over bot behavior.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">⚡</div>
              </div>
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-text">
                Powered by cutting-edge AI technology for instant, intelligent responses every time.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">🎯</div>
              </div>
              <h3 className="feature-title">Easy Setup</h3>
              <p className="feature-text">
                Get started in minutes with our intuitive admin dashboard. No coding required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Server?</h2>
            <p className="cta-text">
              Join communities already using Figmenta Copilot for smarter, more engaging conversations
            </p>
            <button 
              className="btn btn-primary btn-large"
              onClick={() => window.open('https://discord.com/api/oauth2/authorize?client_id=1460267725149700209&permissions=2048&scope=bot', '_blank')}
            >
              <span>🚀</span>
              Get Started Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="footer-text">
            Figmenta Copilot © 2026 • Powered by AI
          </p>
        </div>
      </footer>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .landing-page {
          min-height: 100vh;
          background: #0a0e1a;
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
          background: radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent 70%);
          filter: blur(80px);
          animation: float 25s ease-in-out infinite;
        }

        .circle-1 {
          width: 800px;
          height: 800px;
          top: -400px;
          left: -200px;
        }

        .circle-2 {
          width: 600px;
          height: 600px;
          bottom: -300px;
          right: -100px;
          animation-delay: 8s;
        }

        .circle-3 {
          width: 500px;
          height: 500px;
          top: 40%;
          right: 10%;
          animation-delay: 16s;
        }

        .grid-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(80px, -80px) scale(1.1); }
          66% { transform: translate(-40px, 40px) scale(0.9); }
        }

        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 24px 0;
          backdrop-filter: blur(20px);
          background: rgba(10, 14, 26, 0.8);
          border-bottom: 1px solid rgba(99, 102, 241, 0.1);
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
          font-size: 36px;
          filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.5));
        }

        .logo-text {
          font-size: 26px;
          font-weight: 800;
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
        }

        .hero {
          position: relative;
          z-index: 1;
          padding: 140px 0 120px;
        }

        .hero-content {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .hero-title {
          font-size: 80px;
          font-weight: 900;
          line-height: 1.1;
          margin: 0 0 32px 0;
          color: #ffffff;
          letter-spacing: -2px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
        }

        .hero-description {
          font-size: 22px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.75);
          margin: 0 0 56px 0;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-actions {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 14px 28px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
        }

        .btn-sm {
          padding: 12px 24px;
          font-size: 14px;
        }

        .btn-large {
          padding: 20px 40px;
          font-size: 17px;
          font-weight: 700;
        }

        .btn-primary {
          background: linear-gradient(135deg, #6366f1, #a855f7);
          color: white;
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
        }

        .btn-glass {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: white;
        }

        .btn-glass:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-3px);
        }

        .features {
          position: relative;
          z-index: 1;
          padding: 100px 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: 48px;
          font-weight: 800;
          margin: 0 0 16px 0;
          color: white;
          letter-spacing: -1px;
        }

        .section-subtitle {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .feature-card {
          padding: 48px 36px;
          border-radius: 24px;
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: center;
        }

        .feature-card:hover {
          transform: translateY(-12px);
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(99, 102, 241, 0.3);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
        }

        .feature-icon-wrapper {
          width: 90px;
          height: 90px;
          margin: 0 auto 28px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15));
          border-radius: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(99, 102, 241, 0.2);
        }

        .feature-icon {
          font-size: 44px;
        }

        .feature-title {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 16px 0;
          color: white;
        }

        .feature-text {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
        }

        .cta {
          position: relative;
          z-index: 1;
          padding: 100px 0 120px;
        }

        .cta-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 80px 60px;
          border-radius: 32px;
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(99, 102, 241, 0.2);
          text-align: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .cta-title {
          font-size: 44px;
          font-weight: 800;
          margin: 0 0 20px 0;
          color: white;
          letter-spacing: -1px;
        }

        .cta-text {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 48px 0;
          line-height: 1.6;
        }

        .footer {
          position: relative;
          z-index: 1;
          padding: 50px 0;
          border-top: 1px solid rgba(99, 102, 241, 0.1);
        }

        .footer-text {
          text-align: center;
          font-size: 15px;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 52px;
          }

          .hero-description {
            font-size: 18px;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 36px;
          }

          .cta-title {
            font-size: 32px;
          }

          .cta-content {
            padding: 60px 40px;
          }

          .hero-actions {
            flex-direction: column;
            width: 100%;
          }

          .btn-large {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
