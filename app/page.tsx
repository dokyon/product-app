'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Intersection Observer for reveal animations
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(el => observer.observe(el));

    // Header scroll effect
    const handleScroll = () => {
      const h = document.querySelector('header');
      if (h) {
        h.style.padding = window.scrollY > 60 ? '0.6rem 3rem' : '1rem 3rem';
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Close mobile menu on link click
    document.querySelectorAll('nav a').forEach(a => {
      a.addEventListener('click', () => {
        document.querySelector('nav')?.classList.remove('open');
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    document.querySelector('nav')?.classList.toggle('open');
    document.querySelector('.hamburger')?.classList.toggle('active');
  };

  return (
    <>
      <style jsx global>{`
        :root {
          --bg: #f8f8f6;
          --bg-alt: #ffffff;
          --bg-subtle: #f0efec;
          --text: #1a1a1a;
          --text-secondary: #5a5a5a;
          --text-muted: #8a8a8a;
          --border: #e2e0db;
          --border-light: #eeedea;
          --accent: #c8421e;
          --accent-glow: #e04e22;
          --accent-soft: rgba(200,66,30,0.06);
          --warm: #e88a2e;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        body {
          font-family: 'Noto Sans JP', sans-serif;
          background: var(--bg);
          color: var(--text);
          overflow-x: hidden;
        }

        /* HEADER */
        header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 1rem 3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-light);
          transition: all 0.4s;
        }

        .logo {
          font-family: 'Zen Kaku Gothic New', sans-serif;
          font-weight: 900;
          font-size: 1.5rem;
          letter-spacing: 0.08em;
          color: var(--text);
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-mark {
          width: 42px; height: 42px;
          background: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          font-weight: 900;
          color: white;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }

        nav { display: flex; gap: 2.5rem; align-items: center; }

        nav a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          transition: color 0.3s;
          position: relative;
        }

        nav a::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 0; height: 2px;
          background: var(--accent);
          transition: width 0.3s;
        }

        nav a:hover { color: var(--text); }
        nav a:hover::after { width: 100%; }

        .nav-contact {
          background: var(--accent);
          color: white !important;
          padding: 0.6rem 1.5rem;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          transition: background 0.3s, transform 0.3s !important;
        }

        .nav-contact::after { display: none !important; }
        .nav-contact:hover { background: var(--accent-glow); transform: translateY(-2px); }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: var(--bg-alt);
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 70% 40%, rgba(200,66,30,0.04), transparent),
            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(240,239,236,0.8), transparent),
            linear-gradient(160deg, #ffffff 0%, var(--bg) 100%);
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .hero-lines {
          position: absolute;
          right: -5%;
          top: 10%;
          width: 55%;
          height: 80%;
          opacity: 0.06;
        }

        .hero-lines line {
          stroke: var(--text-muted);
          stroke-width: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          padding: 0 6rem;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }

        .hero-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.3em;
          color: var(--accent);
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          opacity: 0;
          animation: fadeSlideUp 0.8s 0.3s forwards;
        }

        .hero-label::before {
          content: '';
          width: 40px; height: 2px;
          background: var(--accent);
        }

        .hero-title {
          font-family: 'Zen Kaku Gothic New', sans-serif;
          font-weight: 900;
          font-size: clamp(3rem, 6vw, 5.5rem);
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 2rem;
          opacity: 0;
          animation: fadeSlideUp 0.8s 0.5s forwards;
        }

        .hero-title span {
          display: block;
          color: var(--text);
        }

        .hero-title .accent-line {
          background: linear-gradient(135deg, var(--accent) 0%, var(--warm) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-desc {
          font-size: 1.1rem;
          line-height: 2;
          color: var(--text-secondary);
          max-width: 600px;
          margin-bottom: 3rem;
          font-weight: 300;
          opacity: 0;
          animation: fadeSlideUp 0.8s 0.7s forwards;
        }

        .hero-actions {
          display: flex;
          gap: 1.5rem;
          opacity: 0;
          animation: fadeSlideUp 0.8s 0.9s forwards;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--accent);
          color: white;
          padding: 1rem 2.5rem;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
        }

        .btn-primary:hover {
          background: var(--accent-glow);
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(200,66,30,0.2);
        }

        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: transparent;
          color: var(--text);
          padding: 1rem 2.5rem;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          border: 1px solid var(--border);
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
        }

        .btn-outline:hover {
          border-color: var(--text-muted);
          background: rgba(0,0,0,0.02);
        }

        .hero-stats {
          position: absolute;
          bottom: 4rem;
          right: 6rem;
          display: flex;
          gap: 3rem;
          z-index: 2;
          opacity: 0;
          animation: fadeSlideUp 0.8s 1.1s forwards;
        }

        .stat { text-align: center; }

        .stat-num {
          font-family: 'Zen Kaku Gothic New', sans-serif;
          font-size: 2.8rem;
          font-weight: 900;
          color: var(--text);
          line-height: 1;
        }

        .stat-num .unit { font-size: 1.2rem; color: var(--accent); }

        .stat-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          letter-spacing: 0.15em;
          margin-top: 0.5rem;
          font-weight: 500;
        }

        /* SECTION COMMON */
        section {
          padding: 7rem 6rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.3em;
          color: var(--accent);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .section-label::before {
          content: '';
          width: 30px; height: 2px;
          background: var(--accent);
        }

        .section-title {
          font-family: 'Zen Kaku Gothic New', sans-serif;
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 900;
          line-height: 1.3;
          margin-bottom: 1.5rem;
          color: var(--text);
        }

        .section-desc {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.9;
          max-width: 700px;
          font-weight: 300;
        }

        /* ABOUT */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
          margin-top: 3rem;
        }

        .about-visual {
          position: relative;
          height: 480px;
        }

        .about-block {
          position: absolute;
          border: 1px solid var(--border-light);
          background: var(--bg-alt);
        }

        .about-block-1 {
          top: 0; left: 0;
          width: 75%; height: 65%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 30px rgba(0,0,0,0.04);
        }

        .about-block-1 svg { width: 60%; opacity: 0.35; }

        .about-block-2 {
          bottom: 0; right: 0;
          width: 65%; height: 55%;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-left: 3px solid var(--accent);
          box-shadow: 0 4px 30px rgba(0,0,0,0.04);
        }

        .about-block-2 .num {
          font-family: 'Zen Kaku Gothic New', sans-serif;
          font-size: 3rem;
          font-weight: 900;
          color: var(--accent);
          line-height: 1;
        }

        .about-block-2 .text {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-top: 0.75rem;
          line-height: 1.7;
        }

        .about-text p {
          color: var(--text-secondary);
          line-height: 2;
          font-weight: 300;
          margin-bottom: 1.5rem;
        }

        .about-values {
          display: flex;
          gap: 2rem;
          margin-top: 2rem;
        }

        .value-item {
          flex: 1;
          padding: 1.5rem;
          border: 1px solid var(--border-light);
          background: var(--bg-alt);
          transition: all 0.4s;
          box-shadow: 0 2px 12px rgba(0,0,0,0.03);
        }

        .value-item:hover {
          border-color: var(--accent);
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(200,66,30,0.08);
        }

        .value-icon {
          width: 32px; height: 32px;
          color: var(--accent);
          margin-bottom: 0.75rem;
        }

        .value-name {
          font-family: 'Zen Kaku Gothic New', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 0.4rem;
          color: var(--text);
        }

        .value-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        /* SERVICES */
        .services-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), transparent);
          margin: 0 auto;
          max-width: 1400px;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 4rem;
        }

        .service-card {
          padding: 3rem 2.5rem;
          border: 1px solid var(--border-light);
          background: var(--bg-alt);
          position: relative;
          overflow: hidden;
          transition: all 0.5s;
          cursor: default;
          box-shadow: 0 2px 16px rgba(0,0,0,0.03);
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 3px;
          background: linear-gradient(90deg, var(--accent), var(--warm));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s;
        }

        .service-card:hover::before { transform: scaleX(1); }
        .service-card:hover {
          border-color: rgba(200,66,30,0.2);
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.07);
        }

        .service-number {
          font-family: 'Zen Kaku Gothic New', sans-serif;
          font-size: 4rem;
          font-weight: 900;
          color: rgba(0,0,0,0.04);
          line-height: 1;
          margin-bottom: 1rem;
        }

        .service-icon {
          width: 48px; height: 48px;
          margin-bottom: 1.5rem;
          color: var(--accent);
        }

        .service-title {
          font-family: 'Zen Kaku Gothic New', sans-serif;
          font-weight: 700;
          font-size: 1.4rem;
          margin-bottom: 1rem;
          color: var(--text);
        }

        .service-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.9;
          margin-bottom: 1.5rem;
        }

        .service-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }

        .service-tag {
          font-size: 0.68rem;
          padding: 0.3rem 0.75rem;
          border: 1px solid var(--border);
          color: var(--text-secondary);
          letter-spacing: 0.05em;
          font-weight: 500;
          background: var(--bg-subtle);
        }

        /* STRENGTH */
        #strength { background: var(--bg-subtle); border-radius: 0; }

        .strength-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-top: 4rem;
        }

        .strength-item {
          padding: 2.5rem 2rem;
          border: 1px solid var(--border-light);
          background: var(--bg-alt);
          text-align: center;
          transition: all 0.4s;
          box-shadow: 0 2px 12px rgba(0,0,0,0.03);
        }

        .strength-item:hover {
          border-color: rgba(200,66,30,0.2);
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.06);
        }

        .strength-icon {
          width: 40px; height: 40px;
          margin: 0 auto 1.25rem;
          color: var(--accent);
        }

        .strength-name {
          font-family: 'Zen Kaku Gothic New', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 0.75rem;
          color: var(--text);
        }

        .strength-desc {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        /* CONTACT */
        .contact-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          margin-top: 3rem;
        }

        .contact-info-block {
          padding: 3rem;
          border: 1px solid var(--border-light);
          background: var(--bg-alt);
          box-shadow: 0 2px 16px rgba(0,0,0,0.03);
        }

        .contact-row {
          display: flex;
          gap: 1.25rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid var(--border-light);
          align-items: flex-start;
        }

        .contact-row:last-child { border-bottom: none; }

        .contact-row-icon {
          width: 20px; height: 20px;
          color: var(--accent);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .contact-row-label {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          font-weight: 500;
          margin-bottom: 0.4rem;
        }

        .contact-row-value {
          font-size: 1rem;
          font-weight: 500;
          color: var(--text);
        }

        .contact-form {
          padding: 3rem;
          border: 1px solid var(--border-light);
          background: var(--bg-alt);
          box-shadow: 0 2px 16px rgba(0,0,0,0.03);
        }

        .form-title {
          font-family: 'Zen Kaku Gothic New', sans-serif;
          font-weight: 700;
          font-size: 1.3rem;
          margin-bottom: 2rem;
          color: var(--text);
        }

        .form-group { margin-bottom: 1.5rem; }

        .form-group label {
          display: block;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.9rem 1rem;
          background: var(--bg);
          border: 1px solid var(--border);
          color: var(--text);
          font-family: 'Noto Sans JP', sans-serif;
          font-size: 0.9rem;
          transition: border-color 0.3s;
          outline: none;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: var(--accent);
        }

        .form-group textarea { resize: vertical; min-height: 120px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

        /* FOOTER */
        footer {
          border-top: 1px solid var(--border-light);
          padding: 3rem 6rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
        }

        .footer-copy {
          font-size: 0.75rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .footer-links { display: flex; gap: 2rem; }

        .footer-links a {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.75rem;
          transition: color 0.3s;
        }

        .footer-links a:hover { color: var(--text); }

        /* ANIMATIONS */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal.visible { opacity: 1; transform: translateY(0); }

        /* MOBILE MENU */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          z-index: 200;
          background: none;
          border: none;
          padding: 4px;
        }

        .hamburger span {
          width: 24px; height: 2px;
          background: var(--text);
          transition: all 0.3s;
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          header { padding: 1rem 2rem; }
          section { padding: 5rem 2rem; }
          .hero-content { padding: 0 2rem; }
          .hero-stats { right: 2rem; bottom: 3rem; gap: 2rem; }
          .services-grid { grid-template-columns: 1fr; }
          .strength-grid { grid-template-columns: repeat(2, 1fr); }
          .about-grid { grid-template-columns: 1fr; gap: 3rem; }
          .about-visual { height: 350px; }
          .contact-wrapper { grid-template-columns: 1fr; }
          footer { padding: 2rem; flex-direction: column; gap: 1rem; text-align: center; }
        }

        @media (max-width: 768px) {
          nav {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(255,255,255,0.97);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 2rem;
            z-index: 150;
          }
          nav.open { display: flex; }
          nav a { font-size: 1.2rem; color: var(--text); }
          .hamburger { display: flex; }
          .hero-stats {
            position: relative;
            bottom: auto; right: auto;
            margin-top: 3rem;
            justify-content: flex-start;
          }
          .stat-num { font-size: 2rem; }
          .about-values { flex-direction: column; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* HEADER */}
      <header>
        <div className="logo">
          <div className="logo-mark">鬼</div>
          鬼澤工業
        </div>
        <button className="hamburger" onClick={toggleMenu} aria-label="メニュー">
          <span></span><span></span><span></span>
        </button>
        <nav>
          <a href="#about">会社概要</a>
          <a href="#services">事業内容</a>
          <a href="#strength">強み</a>
          <a href="#contact" className="nav-contact">お問い合わせ</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-grid"></div>

        <svg className="hero-lines" viewBox="0 0 600 600" fill="none">
          <line x1="0" y1="50" x2="600" y2="150" /><line x1="0" y1="120" x2="600" y2="220" />
          <line x1="0" y1="190" x2="600" y2="290" /><line x1="0" y1="260" x2="600" y2="360" />
          <line x1="0" y1="330" x2="600" y2="430" /><line x1="0" y1="400" x2="600" y2="500" />
          <line x1="200" y1="0" x2="100" y2="600" /><line x1="350" y1="0" x2="250" y2="600" />
          <line x1="500" y1="0" x2="400" y2="600" />
        </svg>

        <div className="hero-content">
          <div className="hero-label">ONIZAWA INDUSTRIAL CO., LTD.</div>
          <h1 className="hero-title">
            <span>技術と信頼で</span>
            <span className="accent-line">インフラを支える。</span>
          </h1>
          <p className="hero-desc">
            管工事・機械据付・配管工事のプロフェッショナル集団として、<br />
            確かな技術力と豊富な実績でお客様のニーズにお応えします。
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">お問い合わせ →</a>
            <a href="#services" className="btn-outline">事業内容を見る</a>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">50<span className="unit">年+</span></div>
            <div className="stat-label">YEARS OF EXPERIENCE</div>
          </div>
          <div className="stat">
            <div className="stat-num">1,200<span className="unit">件+</span></div>
            <div className="stat-label">COMPLETED PROJECTS</div>
          </div>
          <div className="stat">
            <div className="stat-num">100<span className="unit">%</span></div>
            <div className="stat-label">SAFETY RECORD</div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <div className="services-divider"></div>
      <section id="about">
        <div className="section-label">COMPANY</div>
        <h2 className="section-title reveal">会社概要</h2>
        <div className="about-grid">
          <div className="about-visual reveal">
            <div className="about-block about-block-1">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" stroke="#ccc" strokeWidth="0.5" fill="none"/>
                <circle cx="100" cy="100" r="55" stroke="var(--accent)" strokeWidth="0.5" fill="none" strokeDasharray="4 4"/>
                <line x1="40" y1="100" x2="160" y2="100" stroke="#ccc" strokeWidth="0.3"/>
                <line x1="100" y1="40" x2="100" y2="160" stroke="#ccc" strokeWidth="0.3"/>
                <circle cx="100" cy="100" r="4" fill="var(--accent)"/>
                <path d="M60 80 L100 40 L140 80" stroke="#ccc" strokeWidth="0.5" fill="none"/>
                <rect x="70" y="80" width="60" height="60" stroke="#ccc" strokeWidth="0.5" fill="none" rx="2"/>
                <line x1="85" y1="80" x2="85" y2="140" stroke="#ccc" strokeWidth="0.3"/>
                <line x1="115" y1="80" x2="115" y2="140" stroke="#ccc" strokeWidth="0.3"/>
                <line x1="70" y1="100" x2="130" y2="100" stroke="#ccc" strokeWidth="0.3"/>
                <line x1="70" y1="120" x2="130" y2="120" stroke="#ccc" strokeWidth="0.3"/>
              </svg>
            </div>
            <div className="about-block about-block-2">
              <div className="num">信頼</div>
              <div className="text">長年の実績に裏打ちされた確かな技術力。<br />地域のインフラを守り続けています。</div>
            </div>
          </div>
          <div className="about-text reveal">
            <p>鬼澤工業株式会社は、管工事業・機械据付工事業・配管工事業を主軸に、社会インフラの構築と維持に貢献してまいりました。</p>
            <p>創業以来、安全第一の精神と高い技術力を武器に、工場設備からビル・住宅の配管まで幅広い施工実績を誇ります。資格を持った熟練の技術者が在籍し、設計から施工・メンテナンスまで一貫した対応が可能です。</p>
            <div className="about-values">
              <div className="value-item">
                <svg className="value-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
                <div className="value-name">安全第一</div>
                <div className="value-desc">徹底した安全管理体制</div>
              </div>
              <div className="value-item">
                <svg className="value-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                <div className="value-name">高品質</div>
                <div className="value-desc">妥協なき施工品質</div>
              </div>
              <div className="value-item">
                <svg className="value-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <div className="value-name">人材育成</div>
                <div className="value-desc">次世代への技術継承</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <div className="services-divider"></div>
      <section id="services">
        <div className="section-label">SERVICES</div>
        <h2 className="section-title reveal">事業内容</h2>
        <p className="section-desc reveal">専門性の高い3つの事業領域で、<br />お客様の多様なニーズに対応いたします。</p>

        <div className="services-grid">
          <div className="service-card reveal">
            <div className="service-number">01</div>
            <svg className="service-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="8" y="20" width="32" height="16" rx="2"/><path d="M14 20V14a10 10 0 0120 0v6"/><circle cx="24" cy="28" r="3"/><line x1="24" y1="31" x2="24" y2="33"/>
            </svg>
            <h3 className="service-title">管工事業</h3>
            <p className="service-desc">
              上下水道・空調設備・給排水衛生設備など、建物のライフラインとなる管工事を施工。新築からリニューアルまで、快適な環境づくりを支えます。
            </p>
            <div className="service-tags">
              <span className="service-tag">上下水道</span>
              <span className="service-tag">空調設備</span>
              <span className="service-tag">給排水衛生</span>
              <span className="service-tag">冷暖房設備</span>
            </div>
          </div>

          <div className="service-card reveal">
            <div className="service-number">02</div>
            <svg className="service-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="6" y="28" width="14" height="12" rx="1"/><rect x="28" y="22" width="14" height="18" rx="1"/><path d="M13 28V18l11-8 11 8v4"/><circle cx="35" cy="31" r="3"/>
            </svg>
            <h3 className="service-title">機械据付工事業</h3>
            <p className="service-desc">
              工場・プラントにおける各種産業機械の搬入・据付・試運転調整を行います。精密な位置決めと確実な固定で、稼働後のトラブルを未然に防ぎます。
            </p>
            <div className="service-tags">
              <span className="service-tag">産業機械据付</span>
              <span className="service-tag">プラント設備</span>
              <span className="service-tag">搬入・撤去</span>
              <span className="service-tag">試運転調整</span>
            </div>
          </div>

          <div className="service-card reveal">
            <div className="service-number">03</div>
            <svg className="service-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 36h8v-8H8zm0-16h8V12H8z"/><line x1="16" y1="32" x2="32" y2="32"/><line x1="16" y1="16" x2="32" y2="16"/><path d="M32 36h8v-8h-8zm0-16h8V12h-8"/><line x1="12" y1="20" x2="12" y2="28"/><line x1="36" y1="20" x2="36" y2="28"/>
            </svg>
            <h3 className="service-title">配管工事業</h3>
            <p className="service-desc">
              鋼管・ステンレス管・樹脂管など多種多様な配管の設計・加工・施工に対応。高圧配管から精密配管まで、用途に応じた最適な施工をご提供します。
            </p>
            <div className="service-tags">
              <span className="service-tag">鋼管・SUS配管</span>
              <span className="service-tag">高圧配管</span>
              <span className="service-tag">溶接施工</span>
              <span className="service-tag">設計・加工</span>
            </div>
          </div>
        </div>
      </section>

      {/* STRENGTH */}
      <div className="services-divider"></div>
      <section id="strength">
        <div className="section-label">STRENGTHS</div>
        <h2 className="section-title reveal">鬼澤工業の強み</h2>
        <p className="section-desc reveal">選ばれ続ける理由がここにあります。</p>

        <div className="strength-grid">
          <div className="strength-item reveal">
            <svg className="strength-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>
            <div className="strength-name">有資格者多数</div>
            <div className="strength-desc">管工事施工管理技士をはじめ、各種国家資格保有者が在籍</div>
          </div>
          <div className="strength-item reveal">
            <svg className="strength-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
            </svg>
            <div className="strength-name">一貫対応</div>
            <div className="strength-desc">設計・施工・保守メンテナンスまでワンストップで対応</div>
          </div>
          <div className="strength-item reveal">
            <svg className="strength-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div className="strength-name">迅速な対応</div>
            <div className="strength-desc">緊急時にも柔軟に対応できる体制を整備</div>
          </div>
          <div className="strength-item reveal">
            <svg className="strength-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div className="strength-name">地域密着</div>
            <div className="strength-desc">地元に根差した信頼のネットワーク</div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <div className="services-divider"></div>
      <section id="contact">
        <div className="section-label">CONTACT</div>
        <h2 className="section-title reveal">お問い合わせ</h2>
        <p className="section-desc reveal">お気軽にご相談ください。</p>

        <div className="contact-wrapper">
          <div className="contact-info-block reveal">
            <div className="contact-row">
              <svg className="contact-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              <div>
                <div className="contact-row-label">社名</div>
                <div className="contact-row-value">鬼澤工業株式会社</div>
              </div>
            </div>
            <div className="contact-row">
              <svg className="contact-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <div>
                <div className="contact-row-label">所在地</div>
                <div className="contact-row-value">〒000-0000 ○○県○○市○○町0-0-0</div>
              </div>
            </div>
            <div className="contact-row">
              <svg className="contact-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <div>
                <div className="contact-row-label">電話番号</div>
                <div className="contact-row-value">000-000-0000</div>
              </div>
            </div>
            <div className="contact-row">
              <svg className="contact-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <div className="contact-row-label">営業時間</div>
                <div className="contact-row-value">平日 8:00 〜 17:00</div>
              </div>
            </div>
            <div className="contact-row">
              <svg className="contact-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <div>
                <div className="contact-row-label">メール</div>
                <div className="contact-row-value">info@onizawa-kogyo.co.jp</div>
              </div>
            </div>
          </div>

          <div className="contact-form reveal">
            <div className="form-title">お問い合わせフォーム</div>
            <div className="form-row">
              <div className="form-group">
                <label>お名前</label>
                <input type="text" placeholder="山田 太郎" />
              </div>
              <div className="form-group">
                <label>会社名</label>
                <input type="text" placeholder="○○株式会社" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>電話番号</label>
                <input type="tel" placeholder="000-000-0000" />
              </div>
              <div className="form-group">
                <label>メールアドレス</label>
                <input type="email" placeholder="info@example.com" />
              </div>
            </div>
            <div className="form-group">
              <label>お問い合わせ内容</label>
              <textarea placeholder="ご相談内容をご記入ください"></textarea>
            </div>
            <button className="btn-primary" style={{width: '100%', justifyContent: 'center'}}>送信する →</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-copy">© 2026 鬼澤工業株式会社 All Rights Reserved.</div>
        <div className="footer-links">
          <a href="#about">会社概要</a>
          <a href="#services">事業内容</a>
          <a href="#contact">お問い合わせ</a>
        </div>
      </footer>
    </>
  );
}
