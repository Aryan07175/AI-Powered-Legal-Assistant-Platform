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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`relative px-1 py-2 text-sm font-medium transition-colors duration-300 ${
        isActive(to)
          ? 'text-blue-400'
          : 'text-slate-400 hover:text-white'
      }`}
    >
      {label}
      {isActive(to) && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
      )}
    </Link>
  );

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'glass-strong shadow-2xl shadow-black/20'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg gradient-blue flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
            LA
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Lex<span className="text-blue-400">Assist</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {user ? (
            <>
              {navLink('/dashboard', 'Dashboard')}
              {navLink('/chatbot', 'AI Chat')}
              {navLink('/generate-document', 'Documents')}
              {navLink('/lawyers', 'Find Lawyer')}
            </>
          ) : (
            <>
              {navLink('/lawyers', 'Browse Lawyers')}
            </>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full gradient-blue flex items-center justify-center text-white text-xs font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-slate-300 font-medium">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-slate-400 hover:text-red-400 font-medium transition-colors duration-200 border border-slate-700 hover:border-red-500/30 px-4 py-1.5 rounded-lg"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm text-slate-300 hover:text-white font-medium transition-colors px-4 py-2">
                Sign In
              </Link>
              <Link to="/login?mode=signup" className="btn-primary text-sm text-white font-semibold px-5 py-2 rounded-lg">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-slate-300 hover:text-white p-2"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? (
              <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
            ) : (
              <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-slate-700/50 px-6 py-4 space-y-3 animate-fade-in-up">
          {user ? (
            <>
              <Link to="/dashboard" className="block text-slate-300 hover:text-white py-2">Dashboard</Link>
              <Link to="/chatbot" className="block text-slate-300 hover:text-white py-2">AI Chat</Link>
              <Link to="/generate-document" className="block text-slate-300 hover:text-white py-2">Documents</Link>
              <Link to="/lawyers" className="block text-slate-300 hover:text-white py-2">Find Lawyer</Link>
              <button onClick={handleLogout} className="block text-red-400 py-2 w-full text-left">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-slate-300 hover:text-white py-2">Sign In</Link>
              <Link to="/login?mode=signup" className="block btn-primary text-white text-center py-2 rounded-lg">Get Started</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
