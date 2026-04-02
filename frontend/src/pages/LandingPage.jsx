import React from 'react';
import { Link } from 'react-router-dom';

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
    link: '/chatbot'
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
    link: '/generate-document'
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
    link: '/lawyers'
  }
];

const stats = [
  { value: '10K+', label: 'Legal Queries Resolved' },
  { value: '500+', label: 'Verified Lawyers' },
  { value: '99.9%', label: 'Uptime Guarantee' },
  { value: '4.9★', label: 'User Rating' }
];

function LandingPage() {
  return (
    <div className="relative dot-pattern overflow-hidden">
      {/* Ambient Background Orbs */}
      <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[200px] right-[-150px] w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[100px] left-[20%] w-[350px] h-[350px] bg-emerald-600/6 rounded-full blur-[100px] pointer-events-none" />

      {/* ===== Hero Section ===== */}
      <section className="relative flex flex-col items-center justify-center pt-24 pb-20 text-center px-4">
        {/* Badge */}
        <div className="animate-fade-in-up opacity-0 mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Powered by GPT AI
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up opacity-0 stagger-1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-6 max-w-5xl">
          <span className="text-white">Legal Help,</span>
          <br />
          <span className="gradient-text">Reimagined by AI</span>
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
            className="btn-primary px-8 py-3.5 rounded-xl text-white font-semibold text-base shadow-xl shadow-blue-500/20"
          >
            Start Free Consultation →
          </Link>
          <Link
            to="/lawyers"
            className="glass px-8 py-3.5 rounded-xl text-slate-300 hover:text-white font-semibold text-base card-hover"
          >
            Browse Lawyers
          </Link>
        </div>

        {/* Stats Bar */}
        <div className="animate-fade-in-up opacity-0 stagger-4 mt-20 w-full max-w-3xl glass rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-extrabold text-white mb-1">{s.value}</div>
              <div className="text-xs text-slate-400 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything You Need</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Three powerful tools working together to make legal services accessible, affordable, and instant.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Link
              to={f.link}
              key={i}
              className={`group glass p-8 rounded-2xl card-hover animate-fade-in-up opacity-0 stagger-${i + 1} relative overflow-hidden`}
            >
              {/* Hover glow */}
              <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-10 blur-[60px] rounded-full transition-opacity duration-500 pointer-events-none`} />

              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white mb-5 shadow-lg ${f.glow} group-hover:scale-110 transition-transform duration-300`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Learn more
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-slate-400">Get legal assistance in three simple steps</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Describe Your Issue', desc: 'Tell our AI chatbot about your legal question or situation in plain language.' },
            { step: '02', title: 'Get AI Analysis', desc: 'Receive instant analysis, document drafts, or get matched with the right lawyer.' },
            { step: '03', title: 'Take Action', desc: 'Download generated documents as PDF, or book a video call with a verified attorney.' }
          ].map((item, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              <div className="text-6xl font-black text-blue-500/10 mb-4">{item.step}</div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.desc}</p>
              {i < 2 && <div className="hidden md:block absolute top-10 -right-4 w-8 text-slate-600">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA Banner ===== */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">Ready to Get Started?</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto relative z-10">Join thousands of users who trust LexAssist AI for their legal needs.</p>
          <Link
            to="/login?mode=signup"
            className="relative z-10 inline-block btn-primary px-10 py-4 rounded-xl text-white font-bold text-base shadow-xl shadow-blue-500/20"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-slate-800 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md gradient-blue flex items-center justify-center text-white font-bold text-xs">LA</div>
            <span className="text-sm text-slate-400">LexAssist AI © 2026. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
