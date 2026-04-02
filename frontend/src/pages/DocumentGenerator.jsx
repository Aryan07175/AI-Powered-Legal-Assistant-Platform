import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const docTypes = [
  { value: 'NDA', label: 'Non-Disclosure Agreement', icon: '🔒' },
  { value: 'Rent Agreement', label: 'Rent Agreement', icon: '🏠' },
  { value: 'Employment Contract', label: 'Employment Contract', icon: '💼' },
  { value: 'Service Agreement', label: 'Service Agreement', icon: '🤝' },
];

function DocumentGenerator() {
  const [formData, setFormData] = useState({ title: '', type: 'NDA', details: '' });
  const [generatedDoc, setGeneratedDoc] = useState('');
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="animate-fade-in-up opacity-0">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center shadow-lg shadow-purple-500/20">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Document Generator</h1>
          <p className="text-sm text-slate-400">AI-powered legal document creation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
        {/* Left: Form */}
        <div className="glass-strong p-8 rounded-2xl flex flex-col relative overflow-hidden shadow-xl shadow-black/10">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none" />

          <form onSubmit={handleGenerate} className="flex flex-col gap-5 flex-1 relative z-10">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium uppercase tracking-wider">Document Title</label>
              <input
                required type="text" placeholder="e.g. Employment Agreement for Acme Corp"
                className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-white text-sm input-focus transition-all placeholder:text-slate-500"
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium uppercase tracking-wider">Document Type</label>
              <div className="grid grid-cols-2 gap-3">
                {docTypes.map(dt => (
                  <button
                    key={dt.value} type="button"
                    onClick={() => setFormData({ ...formData, type: dt.value })}
                    className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium border transition-all text-left ${
                      formData.type === dt.value
                        ? 'bg-purple-600/20 border-purple-500/50 text-purple-300'
                        : 'bg-slate-800/40 border-slate-700/40 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <span className="text-lg">{dt.icon}</span>
                    <span>{dt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <label className="block text-xs text-slate-400 mb-1.5 font-medium uppercase tracking-wider">Terms & Details</label>
              <textarea
                required
                className="w-full flex-1 min-h-[120px] bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-white text-sm input-focus transition-all resize-none placeholder:text-slate-500"
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
        <div className="glass-strong p-6 rounded-2xl flex flex-col shadow-xl shadow-black/10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              Preview
            </h2>
            {generatedDoc && (
              <button onClick={downloadPDF} className="flex items-center gap-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-600/40 px-4 py-2 rounded-lg text-xs font-semibold transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download PDF
              </button>
            )}
          </div>

          <div className="flex-1 bg-white rounded-xl overflow-y-auto p-8 shadow-inner">
            {generatedDoc ? (
              <div className="text-gray-800 font-serif text-sm leading-relaxed whitespace-pre-wrap">{generatedDoc}</div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-30 mb-4"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <p className="text-sm font-sans">Your generated document will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentGenerator;
