import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/>
        <line x1="10" y1="22" x2="14" y2="22"/>
      </svg>
    ),
    title: 'AI Legal Chatbot',
    desc: 'Get instant answers to complex legal questions powered by advanced AI. Understand your rights in plain English.',
    gradient: 'from-blue-500 to-cyan-400',
    glow: 'shadow-blue-500/20',
    link: '/chatbot',
    badge: 'GPT Powered'
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: 'Document Generator',
    desc: 'Create legally-sound NDAs, contracts, and agreements in seconds. Download as PDF instantly.',
    gradient: 'from-purple-500 to-pink-400',
    glow: 'shadow-purple-500/20',
    link: '/generate-document',
    badge: 'Auto Draft'
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"/>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    ),
    title: 'Video Consultation',
    desc: 'Connect face-to-face with verified lawyers via secure, encrypted video calls from anywhere.',
    gradient: 'from-emerald-500 to-teal-400',
    glow: 'shadow-emerald-500/20',
    link: '/lawyers',
    badge: 'Encrypted'
  }
];

const stats = [
  { value: '10K+', label: 'Legal Queries Resolved', icon: '💬' },
  { value: '500+', label: 'Verified Lawyers', icon: '⚖️' },
  { value: '99.9%', label: 'Uptime Guarantee', icon: '🛡️' },
  { value: '4.9★', label: 'User Rating', icon: '⭐' }
];

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Startup Founder',
    text: 'LexAssist saved me thousands in legal fees. The AI chatbot understood my NDA requirements perfectly and generated a solid draft in minutes.',
    rating: 5,
    avatar: 'SM'
  },
  {
    name: 'James Rodriguez',
    role: 'Real Estate Agent',
    text: 'The video consultation feature is seamless. I connected with a top corporate lawyer and resolved my contract dispute within an hour.',
    rating: 5,
    avatar: 'JR'
  },
  {
    name: 'Priya Sharma',
    role: 'Freelance Designer',
    text: 'Finally, legal help that I can actually afford. The document generator created a perfect client agreement that protects my intellectual property.',
    rating: 5,
    avatar: 'PS'
  }
];

const trustedBy = ['TechCorp', 'LegalFlow', 'StartupHub', 'CloudVentures', 'DataSafe'];

function LandingPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative dot-pattern overflow-hidden">
      {/* Ambient Background Orbs */}
      <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none animate-morph" />
      <div className="absolute top-[200px] right-[-150px] w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-[120px] pointer-events-none animate-morph" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[100px] left-[20%] w-[350px] h-[350px] bg-emerald-600/6 rounded-full blur-[100px] pointer-events-none animate-morph" style={{ animationDelay: '4s' }} />

      {/* Floating Particles */}
      <div className="particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
              opacity: 0.2 + Math.random() * 0.3,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
            }}
          />
        ))}
      </div>

      {/* ===== Hero Section ===== */}
      <section className="relative flex flex-col items-center justify-center pt-24 pb-20 text-center px-4">
        {/* Badge */}
        <div className="animate-fade-in-up opacity-0 mb-6">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-border-glow">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Powered by GPT AI — Trusted by 10,000+ Users
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up opacity-0 stagger-1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-6 max-w-5xl">
          <span className="text-white">Legal Help,</span>
          <br />
          <span className="gradient-text animate-text-glow">Reimagined by AI</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up opacity-0 stagger-2 text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10">
          Instant legal advice from AI, professional documents generated in seconds,
          and one-click video consultations with top-rated attorneys.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up opacity-0 stagger-3 flex flex-col sm:flex-row gap-4">
          <Link
            to="/login?mode=signup"
            className="btn-primary px-8 py-4 rounded-xl text-white font-semibold text-base shadow-xl shadow-blue-500/25 flex items-center gap-2 justify-center"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            Start Free Consultation
          </Link>
          <Link
            to="/lawyers"
            className="glass px-8 py-4 rounded-xl text-slate-300 hover:text-white font-semibold text-base card-hover flex items-center gap-2 justify-center btn-ghost"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            Browse Lawyers
          </Link>
        </div>

        {/* Trusted By */}
        <div className="animate-fade-in-up opacity-0 stagger-4 mt-14 mb-6">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-4 font-medium">Trusted by leading organizations</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {trustedBy.map((company, i) => (
              <span key={i} className="text-slate-600 font-bold text-lg tracking-wide hover:text-slate-400 transition-colors cursor-default">{company}</span>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="animate-fade-in-up opacity-0 stagger-5 mt-10 w-full max-w-4xl glass-ultra rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center group cursor-default">
              <div className="text-xl mb-2 group-hover:scale-125 transition-transform">{s.icon}</div>
              <div className="text-2xl md:text-3xl font-extrabold text-white mb-1 group-hover:text-blue-400 transition-colors">{s.value}</div>
              <div className="text-xs text-slate-400 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider my-4" />

      {/* ===== Features Section ===== */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="badge badge-blue mb-4 inline-flex">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            Core Features
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Everything You Need</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">Three powerful tools working together to make legal services accessible, affordable, and instant.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Link
              to={f.link}
              key={i}
              className={`group glass p-8 rounded-2xl card-hover-lift animate-fade-in-up opacity-0 stagger-${i + 1} relative overflow-hidden`}
            >
              {/* Hover glow */}
              <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-10 blur-[60px] rounded-full transition-opacity duration-500 pointer-events-none`} />

              {/* Feature badge */}
              <div className="absolute top-6 right-6">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-800/60 border border-slate-700/40 px-2.5 py-1 rounded-full">
                  {f.badge}
                </span>
              </div>

              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white mb-5 shadow-lg ${f.glow} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{f.desc}</p>
              <div className="flex items-center gap-1 text-sm font-semibold text-blue-400 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                Explore feature
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section className="py-24 px-4 max-w-5xl mx-auto relative">
        {/* Ambient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="text-center mb-16 relative z-10">
          <span className="badge badge-purple mb-4 inline-flex">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            Simple Process
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-slate-400 text-lg">Get legal assistance in three simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[20%] right-[20%] h-px bg-gradient-to-r from-blue-500/20 via-purple-500/30 to-emerald-500/20" />

          {[
            { step: '01', title: 'Describe Your Issue', desc: 'Tell our AI chatbot about your legal question or situation in plain language.', color: 'from-blue-500 to-cyan-400', icon: '💬' },
            { step: '02', title: 'Get AI Analysis', desc: 'Receive instant analysis, document drafts, or get matched with the right lawyer.', color: 'from-purple-500 to-pink-400', icon: '🧠' },
            { step: '03', title: 'Take Action', desc: 'Download generated documents as PDF, or book a video call with a verified attorney.', color: 'from-emerald-500 to-teal-400', icon: '🚀' }
          ].map((item, i) => (
            <div key={i} className={`relative flex flex-col items-center text-center animate-fade-in-up opacity-0 stagger-${i + 1}`}>
              {/* Step circle */}
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl mb-6 shadow-lg transition-transform hover:scale-110 hover:rotate-3`}>
                {item.icon}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Step {item.step}</div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider my-4" />

      {/* ===== Testimonials ===== */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="badge badge-emerald mb-4 inline-flex">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Loved by Thousands</h2>
          <p className="text-slate-400 text-lg">See what our users have to say about LexAssist AI</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`glass p-8 rounded-2xl testimonial-card card-hover animate-fade-in-up opacity-0 stagger-${i + 1} relative`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" strokeWidth="1">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-300 text-sm leading-relaxed mb-6 relative z-10">"{t.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center gap-2 mt-8 md:hidden">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveTestimonial(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeTestimonial === i ? 'bg-blue-400 w-6' : 'bg-slate-600'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ===== CTA Banner ===== */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto glass-ultra rounded-3xl p-16 text-center relative overflow-hidden">
          {/* Decorative gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 pointer-events-none" />
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none animate-morph" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none animate-morph" style={{ animationDelay: '3s' }} />

          {/* Floating rings */}
          <div className="absolute top-10 right-10 w-24 h-24 rounded-full border border-blue-500/10 animate-spin-slow pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full border border-purple-500/10 animate-spin-slow pointer-events-none" style={{ animationDirection: 'reverse' }} />

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl gradient-blue flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-blue-500/25 animate-scale-pulse">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto text-lg">Join thousands of users who trust LexAssist AI for their legal needs. Start for free today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login?mode=signup"
                className="btn-primary px-10 py-4 rounded-xl text-white font-bold text-base shadow-xl shadow-blue-500/25 flex items-center gap-2 justify-center"
              >
                Create Free Account
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link
                to="/chatbot"
                className="btn-ghost px-10 py-4 rounded-xl font-semibold text-base flex items-center gap-2 justify-center"
              >
                Try AI Chat Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default LandingPage;
