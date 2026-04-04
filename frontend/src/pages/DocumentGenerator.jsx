import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const docTypes = [
  { value: 'NDA', label: 'Non-Disclosure Agreement', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, color: 'blue' },
  { value: 'Rent Agreement', label: 'Rent Agreement', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, color: 'emerald' },
  { value: 'Employment Contract', label: 'Employment Contract', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>, color: 'purple' },
  { value: 'Service Agreement', label: 'Service Agreement', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, color: 'amber' },
];

const colorMap = {
  blue: { active: 'bg-blue-600/20 border-blue-500/50 text-blue-400', hover: 'hover:border-blue-500/30', icon: 'text-blue-400' },
  emerald: { active: 'bg-emerald-600/20 border-emerald-500/50 text-emerald-400', hover: 'hover:border-emerald-500/30', icon: 'text-emerald-400' },
  purple: { active: 'bg-purple-600/20 border-purple-500/50 text-purple-400', hover: 'hover:border-purple-500/30', icon: 'text-purple-400' },
  amber: { active: 'bg-amber-600/20 border-amber-500/50 text-amber-400', hover: 'hover:border-amber-500/30', icon: 'text-amber-400' },
};

function DocumentGenerator() {
  const [formData, setFormData] = useState({ title: '', type: 'NDA', details: '' });
  const [generatedDoc, setGeneratedDoc] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/ai/generate-document', formData);
      setGeneratedDoc(res.data.content);
      await axios.post('http://localhost:5000/api/documents', {
        title: formData.title, type: formData.type, content: res.data.content
      });
    } catch {
      alert('Error generating document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica');
    doc.setFontSize(11);
    const splitText = doc.splitTextToSize(generatedDoc, 175);
    doc.text(splitText, 18, 20);
    doc.save(`${formData.title.replace(/\s+/g, '_')}.pdf`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedDoc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = generatedDoc ? generatedDoc.split(/\s+/).length : 0;

  return (
    <div className="animate-fade-in-up opacity-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-purple-400 border-2 border-[#050a18]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Document Generator</h1>
            <p className="text-sm text-slate-400 flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              AI-powered legal document creation
            </p>
          </div>
        </div>
        {generatedDoc && (
          <span className="badge badge-purple hidden sm:inline-flex">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            {wordCount} words
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
        {/* Left: Form */}
        <div className="glass-ultra p-8 rounded-2xl flex flex-col relative overflow-hidden shadow-xl shadow-black/10">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/8 rounded-full blur-[60px] pointer-events-none" />

          <form onSubmit={handleGenerate} className="flex flex-col gap-5 flex-1 relative z-10">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium uppercase tracking-wider flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Document Title
              </label>
              <input
                required type="text" placeholder="e.g. Employment Agreement for Acme Corp"
                className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-white text-sm input-focus transition-all placeholder:text-slate-600"
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
                Document Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {docTypes.map(dt => {
                  const colors = colorMap[dt.color];
                  return (
                    <button
                      key={dt.value} type="button"
                      onClick={() => setFormData({ ...formData, type: dt.value })}
                      className={`flex items-center gap-3 p-3.5 rounded-xl text-sm font-medium border transition-all text-left group ${
                        formData.type === dt.value
                          ? `${colors.active} shadow-lg`
                          : `bg-slate-800/40 border-slate-700/40 text-slate-400 ${colors.hover}`
                      }`}
                    >
                      <span className={`${formData.type === dt.value ? colors.icon : 'text-slate-500'} group-hover:scale-110 transition-transform`}>
                        {dt.icon}
                      </span>
                      <span className="text-xs leading-tight">{dt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <label className="block text-xs text-slate-400 mb-1.5 font-medium uppercase tracking-wider flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>
                Terms & Details
              </label>
              <textarea
                required
                className="w-full flex-1 min-h-[120px] bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-white text-sm input-focus transition-all resize-none placeholder:text-slate-600"
                placeholder="Enter party names, dates, specific clauses, key terms..."
                onChange={e => setFormData({ ...formData, details: e.target.value })}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"/><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Generating with AI...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  Generate Document
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right: Preview */}
        <div className="glass-ultra p-6 rounded-2xl flex flex-col shadow-xl shadow-black/10 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />

          <div className="flex justify-between items-center mb-4 relative z-10">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              Preview
            </h2>
            {generatedDoc && (
              <div className="flex items-center gap-2">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 border border-slate-700/40 hover:border-slate-600 px-3 py-2 rounded-lg text-xs font-medium transition-all"
                >
                  {copied ? (
                    <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Copied!</>
                  ) : (
                    <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy</>
                  )}
                </button>
                <button onClick={downloadPDF} className="flex items-center gap-1.5 bg-emerald-600/15 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-600/30 px-4 py-2 rounded-lg text-xs font-semibold transition-all">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download PDF
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 bg-white rounded-xl overflow-y-auto p-8 shadow-inner relative z-10">
            {generatedDoc ? (
              <div className="text-gray-800 font-serif text-sm leading-relaxed whitespace-pre-wrap">{generatedDoc}</div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-5">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-40"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <p className="text-sm font-sans font-medium text-gray-500 mb-1">No document generated yet</p>
                <p className="text-xs font-sans text-gray-400">Fill out the form and click generate</p>
              </div>
            )}
          </div>

          {/* Status bar */}
          {generatedDoc && (
            <div className="flex items-center justify-between mt-3 text-[10px] text-slate-500 relative z-10">
              <span className="flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Document generated successfully
              </span>
              <span>{wordCount} words • {formData.type}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DocumentGenerator;
