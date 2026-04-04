import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const quickLinks = [
  {
    label: 'AI Chatbot',
    desc: 'Ask legal questions instantly',
    link: '/chatbot',
    gradient: 'from-blue-500 to-cyan-400',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/>
        <line x1="10" y1="22" x2="14" y2="22"/>
      </svg>
    )
  },
  {
    label: 'Generate Docs',
    desc: 'Create contracts & NDAs',
    link: '/generate-document',
    gradient: 'from-purple-500 to-pink-400',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    )
  },
  {
    label: 'Find Lawyer',
    desc: 'Book a consultation now',
    link: '/lawyers',
    gradient: 'from-emerald-500 to-teal-400',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )
  },
];

function Dashboard() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (!loading && !user) navigate('/login');
    if (user) fetchData();
  }, [user, loading, navigate]);

  const fetchData = async () => {
    try {
      const [apptsRes, docsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/appointments'),
        user.role === 'user' ? axios.get('http://localhost:5000/api/documents') : Promise.resolve({ data: [] })
      ]);
      setAppointments(apptsRes.data);
      setDocuments(docsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || !user) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <svg className="animate-spin h-8 w-8 text-blue-500" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"/><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
        <p className="text-slate-500 text-sm">Loading your dashboard...</p>
      </div>
    </div>
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const statusColor = {
    pending: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    confirmed: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    completed: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
    cancelled: 'text-red-400 bg-red-500/10 border-red-500/20',
  };

  const statusIcon = {
    pending: <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>,
    confirmed: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
    completed: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
    cancelled: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  };

  const pendingCount = appointments.filter(a => a.status === 'pending').length;
  const completedCount = appointments.filter(a => a.status === 'completed').length;

  return (
    <div className="animate-fade-in-up opacity-0 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 mb-1">{getGreeting()} 👋</p>
          <h1 className="text-3xl font-bold text-white mb-1.5">
            Welcome back, <span className="gradient-text">{user.name}</span>
          </h1>
          <p className="text-slate-400 text-sm flex items-center gap-2">
            {user.role === 'lawyer' ? (
              <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> Manage your appointments and clients</>
            ) : (
              <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg> Your legal assistant dashboard</>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <span className="badge badge-blue capitalize">{user.role}</span>
          <span className="badge badge-emerald">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Appointments', value: appointments.length, color: 'text-blue-400', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
          { label: 'Pending', value: pendingCount, color: 'text-amber-400', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
          { label: 'Completed', value: completedCount, color: 'text-emerald-400', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> },
          { label: 'Documents', value: documents.length, color: 'text-purple-400', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
        ].map((stat, i) => (
          <div key={i} className="glass p-4 rounded-2xl card-hover group">
            <div className="flex items-center justify-between mb-3">
              <span className={`${stat.color} opacity-60 group-hover:opacity-100 transition-opacity`}>{stat.icon}</span>
            </div>
            <p className={`text-2xl font-bold ${stat.color} mb-0.5`}>{stat.value}</p>
            <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {quickLinks.map((ql, i) => (
          <Link
            key={i} to={ql.link}
            className="glass p-5 rounded-2xl card-hover group flex items-center gap-4 relative overflow-hidden"
          >
            {/* Hover glow */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${ql.gradient} opacity-0 group-hover:opacity-10 blur-[40px] rounded-full transition-opacity duration-500 pointer-events-none`} />
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ql.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
              {ql.icon}
            </div>
            <div className="relative z-10">
              <h3 className="font-semibold text-white text-sm group-hover:text-blue-300 transition-colors">{ql.label}</h3>
              <p className="text-slate-400 text-xs">{ql.desc}</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments Panel */}
        <div className="glass-strong p-6 rounded-2xl shadow-xl shadow-black/10 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/5 rounded-full blur-[40px] pointer-events-none" />

          <div className="flex items-center justify-between mb-5 relative z-10">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Appointments
            </h2>
            <span className="badge badge-blue">{appointments.length} total</span>
          </div>

          {appointments.length === 0 ? (
            <div className="py-14 text-center relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-slate-800/50 border border-slate-700/30 flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-600"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <p className="text-slate-400 text-sm font-medium mb-1">No appointments scheduled</p>
              <Link to="/lawyers" className="text-blue-400 text-xs hover:text-blue-300 transition-colors inline-flex items-center gap-1">
                Book your first consultation
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 relative z-10">
              {appointments.map(apt => (
                <div key={apt._id} className="bg-slate-800/40 p-4 rounded-xl flex items-center justify-between gap-4 border border-slate-700/30 hover:border-slate-600/50 transition-all group">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white text-sm truncate">
                      {user.role === 'user' ? apt.lawyerId?.user?.name || 'Lawyer' : apt.userId?.name || 'Client'}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {apt.date} • {apt.time}
                    </p>
                    <span className={`inline-flex items-center gap-1 mt-2 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${statusColor[apt.status] || statusColor.pending}`}>
                      {statusIcon[apt.status]}
                      {apt.status}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/call/${apt.meetingLink}`)}
                    className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-600/15 hover:bg-emerald-600 text-emerald-400 hover:text-white flex items-center justify-center transition-all border border-emerald-600/25 hover:border-emerald-500 group-hover:shadow-lg group-hover:shadow-emerald-500/10"
                    title="Join Video Call"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Documents Panel (for clients) */}
        {user.role === 'user' && (
          <div className="glass-strong p-6 rounded-2xl shadow-xl shadow-black/10 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-purple-500/5 rounded-full blur-[40px] pointer-events-none" />

            <div className="flex items-center justify-between mb-5 relative z-10">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Documents
              </h2>
              <Link to="/generate-document" className="badge badge-purple hover:bg-purple-500/20 transition-colors cursor-pointer">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                New
              </Link>
            </div>

            {documents.length === 0 ? (
              <div className="py-14 text-center relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/50 border border-slate-700/30 flex items-center justify-center mx-auto mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-600"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <p className="text-slate-400 text-sm font-medium mb-1">No documents generated</p>
                <Link to="/generate-document" className="text-blue-400 text-xs hover:text-blue-300 transition-colors inline-flex items-center gap-1">
                  Create your first document
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 relative z-10">
                {documents.map(doc => (
                  <div key={doc._id} className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/30 hover:border-slate-600/50 transition-all group">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-white text-sm truncate group-hover:text-blue-300 transition-colors">{doc.title}</h3>
                        <span className="badge badge-purple mt-1.5 text-[9px]">{doc.type}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 flex-shrink-0 flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed">{doc.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Lawyer-specific: Earnings */}
        {user.role === 'lawyer' && (
          <div className="glass-strong p-6 rounded-2xl shadow-xl shadow-black/10 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-emerald-500/5 rounded-full blur-[40px] pointer-events-none" />

            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-6 relative z-10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Earnings Overview
            </h2>
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-slate-800/50 rounded-xl p-5 text-center border border-slate-700/30 hover:border-emerald-500/20 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-emerald-600/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <p className="text-2xl font-bold text-emerald-400">${completedCount * 100}</p>
                <p className="text-xs text-slate-400 mt-1">Total Earned</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-5 text-center border border-slate-700/30 hover:border-amber-500/20 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-amber-600/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <p className="text-2xl font-bold text-amber-400">{pendingCount}</p>
                <p className="text-xs text-slate-400 mt-1">Pending</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-6 relative z-10">
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Monthly Goal</span>
                <span className="text-emerald-400">{Math.min(completedCount * 10, 100)}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${Math.min(completedCount * 10, 100)}%` }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
