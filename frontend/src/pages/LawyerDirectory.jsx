import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const specializations = ['All', 'Corporate', 'Criminal', 'Civil', 'Family', 'General'];

function LawyerDirectory() {
  const [lawyers, setLawyers] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLawyers();
  }, [activeFilter]);

  const fetchLawyers = async () => {
    try {
      const query = activeFilter === 'All' ? '' : activeFilter;
      const res = await axios.get(`http://localhost:5000/api/lawyers?specialization=${query}`);
      setLawyers(res.data);
    } catch (err) {
      console.error(err);
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

  return (
    <div className="animate-fade-in-up opacity-0 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Find a Lawyer</h1>
          <p className="text-slate-400 text-sm">Browse verified attorneys and book a consultation</p>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {specializations.map(spec => (
          <button
            key={spec}
            onClick={() => setActiveFilter(spec)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
              activeFilter === spec
                ? 'bg-blue-600/20 border-blue-500/50 text-blue-400 shadow-lg shadow-blue-500/10'
                : 'bg-slate-800/40 border-slate-700/40 text-slate-400 hover:border-slate-600 hover:text-slate-300'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Lawyers Grid */}
      {lawyers.length === 0 ? (
        <div className="glass-strong rounded-2xl p-16 text-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-4 text-slate-600"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <p className="text-slate-400">No lawyers found matching your criteria.</p>
          <p className="text-slate-500 text-sm mt-1">Try adjusting your filter or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {lawyers.map((lawyer, i) => (
            <div key={lawyer._id} className={`glass p-6 rounded-2xl card-hover group animate-fade-in-up opacity-0 stagger-${(i % 5) + 1} relative overflow-hidden`}>
              {/* Glow on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/0 group-hover:bg-blue-500/10 blur-[40px] rounded-full transition-all duration-500 pointer-events-none" />

              <div className="flex items-start gap-4 mb-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                  {lawyer.user?.name?.charAt(0) || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white truncate">{lawyer.user?.name}</h3>
                  <p className="text-blue-400 text-sm font-medium">{lawyer.specialization} Law</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-4">{renderStars(lawyer.rating)}<span className="text-slate-400 text-xs ml-1">({lawyer.rating})</span></div>

              <div className="space-y-2 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Experience</span>
                  <span className="text-slate-200 font-medium">{lawyer.experience} years</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Hourly Rate</span>
                  <span className="text-emerald-400 font-semibold">${lawyer.hourlyRate}/hr</span>
                </div>
              </div>

              <button
                onClick={() => bookConsultation(lawyer._id)}
                className="w-full py-2.5 rounded-xl text-sm font-semibold border transition-all bg-blue-600/10 border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-500"
              >
                Book Consultation →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LawyerDirectory;
