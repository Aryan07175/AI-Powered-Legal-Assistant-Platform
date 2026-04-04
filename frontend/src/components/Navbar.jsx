import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const navLink = (to, label, icon) => (
    <Link
      to={to}
      className={`relative px-1 py-2 text-sm font-medium transition-all duration-300 flex items-center gap-1.5 group ${
        isActive(to)
          ? 'text-blue-400'
          : 'text-slate-400 hover:text-white'
      }`}
    >
      <span className="opacity-60 group-hover:opacity-100 transition-opacity">{icon}</span>
      {label}
      {isActive(to) && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
      )}
    </Link>
  );

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'glass-strong shadow-2xl shadow-black/30 border-b border-slate-700/30'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl gradient-blue flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all group-hover:scale-105">
              LA
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#050a18] animate-pulse" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Lex<span className="text-blue-400">Assist</span>
            <span className="text-[10px] ml-1 text-slate-500 font-normal tracking-wider uppercase">AI</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7">
          {user ? (
            <>
              {navLink('/dashboard', 'Dashboard',
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
              )}
              {navLink('/chatbot', 'AI Chat',
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/><line x1="10" y1="22" x2="14" y2="22"/></svg>
              )}
              {navLink('/generate-document', 'Documents',
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              )}
              {navLink('/lawyers', 'Find Lawyer',
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              )}
            </>
          ) : (
            <>
              {navLink('/', 'Home',
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              )}
              {navLink('/lawyers', 'Browse Lawyers',
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              )}
            </>
          )}
        </div>

        {/* Auth Area */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {/* Notification Bell */}
              <button className="relative w-9 h-9 rounded-lg bg-slate-800/60 border border-slate-700/40 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center border-2 border-[#050a18]">3</span>
              </button>

              {/* User Menu */}
              <div className="flex items-center gap-2.5 bg-slate-800/40 border border-slate-700/30 rounded-xl px-3 py-1.5 hover:border-slate-600/50 transition-all">
                <div className="w-7 h-7 rounded-lg gradient-blue flex items-center justify-center text-white text-[11px] font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="hidden lg:block">
                  <p className="text-xs font-medium text-white leading-none">{user.name}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 capitalize">{user.role}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="text-xs text-slate-400 hover:text-red-400 font-medium transition-all duration-200 border border-slate-700/50 hover:border-red-500/30 hover:bg-red-500/5 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm text-slate-300 hover:text-white font-medium transition-colors px-4 py-2">
                Sign In
              </Link>
              <Link to="/login?mode=signup" className="btn-primary text-sm text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-800/50 transition-all"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? (
              <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
            ) : (
              <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="17" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-slate-700/50 px-6 py-5 space-y-1 animate-fade-in-down">
          {user ? (
            <>
              {/* User info in mobile */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-700/50">
                <div className="w-10 h-10 rounded-xl gradient-blue flex items-center justify-center text-white font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{user.name}</p>
                  <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                </div>
              </div>
              <Link to="/dashboard" className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800/50 py-2.5 px-3 rounded-lg transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
                Dashboard
              </Link>
              <Link to="/chatbot" className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800/50 py-2.5 px-3 rounded-lg transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/></svg>
                AI Chat
              </Link>
              <Link to="/generate-document" className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800/50 py-2.5 px-3 rounded-lg transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Documents
              </Link>
              <Link to="/lawyers" className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800/50 py-2.5 px-3 rounded-lg transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                Find Lawyer
              </Link>
              <div className="pt-3 mt-3 border-t border-slate-700/50">
                <button onClick={handleLogout} className="flex items-center gap-3 text-red-400 hover:text-red-300 py-2.5 px-3 rounded-lg w-full text-left transition-all hover:bg-red-500/5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800/50 py-2.5 px-3 rounded-lg transition-all">Sign In</Link>
              <Link to="/login?mode=signup" className="block btn-primary text-white text-center py-2.5 rounded-xl mt-2 font-semibold">Get Started</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
