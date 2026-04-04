import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const specializations = ['All', 'Corporate', 'Criminal', 'Civil', 'Family', 'General'];

const specIcons = {
  All: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>,
  Corporate: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  Criminal: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Civil: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Family: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  General: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
};

function LawyerDirectory() {
  const [lawyers, setLawyers] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingLawyers, setLoadingLawyers] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLawyers();
  }, [activeFilter]);

  const fetchLawyers = async () => {
    setLoadingLawyers(true);
    try {
      const query = activeFilter === 'All' ? '' : activeFilter;
      const res = await axios.get(`http://localhost:5000/api/lawyers?specialization=${query}`);
      setLawyers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLawyers(false);
    }
  };

  const bookConsultation = async (lawyerId) => {
    if (!user) { navigate('/login'); return; }
    const date = window.prompt('Enter Date (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);
    const time = window.prompt('Enter Time (e.g. 10:00 AM):', '10:00 AM');
    if (date && time) {
      try {
        await axios.post('http://localhost:5000/api/appointments', { lawyerId, date, time });
        alert('Consultation booked! Check your dashboard.');
        navigate('/dashboard');
      } catch {
        alert('Failed to book consultation.');
      }
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < Math.round(rating) ? '#facc15' : 'none'} stroke="#facc15" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ));
  };

  const filteredLawyers = lawyers.filter(l =>
    !searchTerm || l.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const avatarGradients = [
    'from-blue-500 to-indigo-500',
    'from-purple-500 to-pink-500',
    'from-emerald-500 to-teal-500',
    'from-amber-500 to-orange-500',
    'from-cyan-500 to-blue-500',
    'from-rose-500 to-pink-500',
  ];

  return (
    <div className="animate-fade-in-up opacity-0 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Find a Lawyer</h1>
              <p className="text-slate-400 text-sm">Browse verified attorneys and book a consultation</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl pl-11 pr-4 py-2.5 text-white text-sm input-focus transition-all placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {specializations.map(spec => (
          <button
            key={spec}
            onClick={() => setActiveFilter(spec)}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${
              activeFilter === spec
                ? 'bg-blue-600/20 border-blue-500/50 text-blue-400 shadow-lg shadow-blue-500/10'
                : 'bg-slate-800/40 border-slate-700/40 text-slate-400 hover:border-slate-600 hover:text-slate-300'
            }`}
          >
            {specIcons[spec]}
            {spec}
          </button>
        ))}
        <span className="badge badge-blue ml-auto self-center">
          {filteredLawyers.length} {filteredLawyers.length === 1 ? 'lawyer' : 'lawyers'}
        </span>
      </div>

      {/* Lawyers Grid */}
      {loadingLawyers ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass p-6 rounded-2xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl skeleton" />
                <div className="flex-1 space-y-2">
                  <div className="w-32 h-4 skeleton" />
                  <div className="w-20 h-3 skeleton" />
                </div>
              </div>
              <div className="space-y-3 mb-5">
                <div className="w-full h-3 skeleton" />
                <div className="w-3/4 h-3 skeleton" />
              </div>
              <div className="w-full h-10 skeleton rounded-xl" />
            </div>
          ))}
        </div>
      ) : filteredLawyers.length === 0 ? (
        <div className="glass-strong rounded-2xl p-16 text-center">
          <div className="w-20 h-20 rounded-2xl bg-slate-800/50 border border-slate-700/30 flex items-center justify-center mx-auto mb-5">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-600"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <p className="text-slate-300 font-medium mb-1">No lawyers found</p>
          <p className="text-slate-500 text-sm">Try adjusting your filter or search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLawyers.map((lawyer, i) => (
            <div key={lawyer._id} className={`glass p-6 rounded-2xl card-hover-lift group animate-fade-in-up opacity-0 stagger-${(i % 5) + 1} relative overflow-hidden`}>
              {/* Glow on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/0 group-hover:bg-blue-500/10 blur-[40px] rounded-full transition-all duration-500 pointer-events-none" />

              {/* Verified badge */}
              <div className="absolute top-5 right-5">
                <span className="badge badge-emerald text-[9px]">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  Verified
                </span>
              </div>

              <div className="flex items-start gap-4 mb-4 relative z-10">
                <div className={`w-13 h-13 rounded-xl bg-gradient-to-br ${avatarGradients[i % avatarGradients.length]} flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`} style={{ width: '52px', height: '52px' }}>
                  {lawyer.user?.name?.charAt(0) || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white truncate group-hover:text-blue-300 transition-colors">{lawyer.user?.name}</h3>
                  <p className="text-blue-400 text-sm font-medium flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    {lawyer.specialization} Law
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-4">{renderStars(lawyer.rating)}<span className="text-slate-400 text-xs ml-1.5 font-medium">({lawyer.rating})</span></div>

              <div className="space-y-2.5 mb-5">
                <div className="flex justify-between text-sm items-center">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    Experience
                  </span>
                  <span className="text-slate-200 font-medium">{lawyer.experience} years</span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    Hourly Rate
                  </span>
                  <span className="text-emerald-400 font-semibold">${lawyer.hourlyRate}/hr</span>
                </div>
              </div>

              <button
                onClick={() => bookConsultation(lawyer._id)}
                className="w-full py-3 rounded-xl text-sm font-semibold border transition-all bg-blue-600/10 border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Book Consultation
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LawyerDirectory;
