import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const quickLinks = [
  { label: 'AI Chatbot', desc: 'Ask legal questions', icon: '🤖', link: '/chatbot', gradient: 'from-blue-500 to-cyan-400' },
  { label: 'Generate Docs', desc: 'Create legal documents', icon: '📄', link: '/generate-document', gradient: 'from-purple-500 to-pink-400' },
  { label: 'Find Lawyer', desc: 'Book a consultation', icon: '⚖️', link: '/lawyers', gradient: 'from-emerald-500 to-teal-400' },
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
      <svg className="animate-spin h-8 w-8 text-blue-500" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"/><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
    </div>
  );

  const statusColor = {
    pending: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    confirmed: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    completed: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
    cancelled: 'text-red-400 bg-red-500/10 border-red-500/20',
  };

  return (
    <div className="animate-fade-in-up opacity-0 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">
          Welcome back, <span className="gradient-text">{user.name}</span>
        </h1>
        <p className="text-slate-400 text-sm">
          {user.role === 'lawyer' ? 'Manage your appointments and clients' : 'Your legal assistant dashboard'}
        </p>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {quickLinks.map((ql, i) => (
          <Link
            key={i} to={ql.link}
            className="glass p-5 rounded-2xl card-hover group flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ql.gradient} flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform`}>
              {ql.icon}
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm group-hover:text-blue-300 transition-colors">{ql.label}</h3>
              <p className="text-slate-400 text-xs">{ql.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments Panel */}
        <div className="glass-strong p-6 rounded-2xl shadow-xl shadow-black/10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Appointments
            </h2>
            <span className="text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20 font-medium">{appointments.length} total</span>
          </div>

          {appointments.length === 0 ? (
            <div className="py-12 text-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-3 text-slate-600"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <p className="text-slate-400 text-sm">No appointments scheduled</p>
              <Link to="/lawyers" className="text-blue-400 text-xs hover:underline mt-1 inline-block">Book your first consultation →</Link>
            </div>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {appointments.map(apt => (
                <div key={apt._id} className="bg-slate-800/40 p-4 rounded-xl flex items-center justify-between gap-4 border border-slate-700/30 hover:border-slate-600/50 transition-colors">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white text-sm truncate">
                      {user.role === 'user' ? apt.lawyerId?.user?.name || 'Lawyer' : apt.userId?.name || 'Client'}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{apt.date} • {apt.time}</p>
                    <span className={`inline-block mt-1.5 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusColor[apt.status] || statusColor.pending}`}>
                      {apt.status}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/call/${apt.meetingLink}`)}
                    className="flex-shrink-0 w-9 h-9 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white flex items-center justify-center transition-all border border-emerald-600/30"
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
          <div className="glass-strong p-6 rounded-2xl shadow-xl shadow-black/10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Documents
              </h2>
              <Link to="/generate-document" className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors">+ New</Link>
            </div>

            {documents.length === 0 ? (
              <div className="py-12 text-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-3 text-slate-600"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <p className="text-slate-400 text-sm">No documents generated</p>
                <Link to="/generate-document" className="text-blue-400 text-xs hover:underline mt-1 inline-block">Create your first document →</Link>
              </div>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                {documents.map(doc => (
                  <div key={doc._id} className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/30 hover:border-slate-600/50 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-white text-sm truncate">{doc.title}</h3>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20 inline-block mt-1">{doc.type}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 flex-shrink-0">{new Date(doc.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed">{doc.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Lawyer-specific: Earnings placeholder */}
        {user.role === 'lawyer' && (
          <div className="glass-strong p-6 rounded-2xl shadow-xl shadow-black/10">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Earnings Overview
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-emerald-400">${appointments.filter(a => a.status === 'completed').length * 100}</p>
                <p className="text-xs text-slate-400 mt-1">Total Earned</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-amber-400">{appointments.filter(a => a.status === 'pending').length}</p>
                <p className="text-xs text-slate-400 mt-1">Pending</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
