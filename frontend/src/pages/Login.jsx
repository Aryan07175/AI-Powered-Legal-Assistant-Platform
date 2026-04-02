import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="animate-fade-in-up opacity-0 w-full max-w-md">
        <div className="glass-strong p-10 rounded-3xl shadow-2xl shadow-black/30 relative overflow-hidden">
          {/* Decorative Corner Gradient */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="w-14 h-14 rounded-2xl gradient-blue flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 shadow-lg shadow-blue-500/20">
              LA
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
            </h2>
            <p className="text-slate-400 text-sm">
              {mode === 'login' ? 'Sign in to access your legal dashboard' : 'Join the future of legal assistance'}
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-6 animate-fade-in-up">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium uppercase tracking-wider">Full Name</label>
                  <input
                    type="text" placeholder="John Doe" required
                    className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-white text-sm input-focus transition-all placeholder:text-slate-500"
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium uppercase tracking-wider">I am a</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['user', 'lawyer'].map(role => (
                      <button
                        key={role} type="button"
                        onClick={() => setFormData({ ...formData, role })}
                        className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                          formData.role === role
                            ? 'bg-blue-600/20 border-blue-500/50 text-blue-400'
                            : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:border-slate-600'
                        }`}
                      >
                        {role === 'user' ? '👤 Client' : '⚖️ Lawyer'}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium uppercase tracking-wider">Email</label>
              <input
                type="email" placeholder="you@example.com" required
                className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-white text-sm input-focus transition-all placeholder:text-slate-500"
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium uppercase tracking-wider">Password</label>
              <input
                type="password" placeholder="••••••••" required
                className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-white text-sm input-focus transition-all placeholder:text-slate-500"
                onChange={e => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="btn-primary w-full py-3.5 rounded-xl text-white font-semibold mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"/><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Processing...
                </span>
              ) : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center relative z-10">
            <p className="text-slate-500 text-sm">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button onClick={handleToggle} className="text-blue-400 hover:text-blue-300 font-semibold underline-offset-4 decoration-transparent hover:underline transition-all">
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
