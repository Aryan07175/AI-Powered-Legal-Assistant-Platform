import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';

function Login() {
  const [searchParams] = useSearchParams();
  const initMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';

  const [mode, setMode] = useState(initMode);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleToggle = () => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
      } else {
        await register(formData);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 relative">
      {/* Background Ambient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/6 rounded-full blur-[150px] pointer-events-none animate-morph" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none animate-morph" style={{ animationDelay: '3s' }} />

      <div className="animate-fade-in-up opacity-0 w-full max-w-md">
        <div className="glass-ultra p-10 rounded-3xl shadow-2xl shadow-black/40 relative overflow-hidden">
          {/* Decorative Corner Gradient */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-500/15 to-purple-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-br from-emerald-500/8 to-cyan-500/8 rounded-full blur-3xl pointer-events-none" />

          {/* Decorative ring */}
          <div className="absolute top-6 right-6 w-16 h-16 rounded-full border border-blue-500/10 animate-spin-slow pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <Link to="/" className="inline-block">
              <div className="w-16 h-16 rounded-2xl gradient-blue flex items-center justify-center text-white font-bold text-xl mx-auto mb-5 shadow-xl shadow-blue-500/25 hover:scale-105 transition-transform animate-scale-pulse">
                LA
              </div>
            </Link>
            <h2 className="text-2xl font-bold text-white mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
            </h2>
            <p className="text-slate-400 text-sm">
              {mode === 'login' ? 'Sign in to access your legal dashboard' : 'Join the future of legal assistance'}
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-6 animate-fade-in-up flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </span>
                    <input
                      type="text" placeholder="John Doe" required
                      className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl pl-11 pr-4 py-3 text-white text-sm input-focus transition-all placeholder:text-slate-600"
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium uppercase tracking-wider">I am a</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['user', 'lawyer'].map(role => (
                      <button
                        key={role} type="button"
                        onClick={() => setFormData({ ...formData, role })}
                        className={`py-3 rounded-xl text-sm font-semibold border transition-all flex items-center justify-center gap-2 ${
                          formData.role === role
                            ? 'bg-blue-600/20 border-blue-500/50 text-blue-400 shadow-lg shadow-blue-500/10'
                            : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:border-slate-600'
                        }`}
                      >
                        {role === 'user' ? (
                          <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Client</>
                        ) : (
                          <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> Lawyer</>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium uppercase tracking-wider">Email</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </span>
                <input
                  type="email" placeholder="you@example.com" required
                  className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl pl-11 pr-4 py-3 text-white text-sm input-focus transition-all placeholder:text-slate-600"
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium uppercase tracking-wider">Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
                <input
                  type="password" placeholder="••••••••" required
                  className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl pl-11 pr-4 py-3 text-white text-sm input-focus transition-all placeholder:text-slate-600"
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            {mode === 'login' && (
              <div className="flex justify-end">
                <button type="button" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit" disabled={loading}
              className="btn-primary w-full py-3.5 rounded-xl text-white font-semibold mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"/><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Processing...
                </>
              ) : mode === 'login' ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                  Sign In
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6 relative z-10">
            <div className="flex-1 h-px bg-slate-700/50" />
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-medium">or</span>
            <div className="flex-1 h-px bg-slate-700/50" />
          </div>

          {/* Social Login Placeholder */}
          <div className="grid grid-cols-2 gap-3 relative z-10">
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800/40 border border-slate-700/40 text-slate-400 hover:text-white hover:border-slate-600 transition-all text-sm font-medium">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800/40 border border-slate-700/40 text-slate-400 hover:text-white hover:border-slate-600 transition-all text-sm font-medium">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </button>
          </div>

          <div className="mt-6 text-center relative z-10">
            <p className="text-slate-500 text-sm">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button onClick={handleToggle} className="text-blue-400 hover:text-blue-300 font-semibold underline-offset-4 hover:underline transition-all">
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-500">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Protected by 256-bit SSL encryption
        </div>
      </div>
    </div>
  );
}

export default Login;
