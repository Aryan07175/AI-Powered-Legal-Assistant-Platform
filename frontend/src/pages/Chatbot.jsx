import React, { useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Chatbot() {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'ai', text: 'Hello! I\'m your AI Legal Assistant. I can help you understand legal concepts, review situations, and provide general guidance.\n\nPlease note: My advice is for informational purposes only and does not substitute professional legal counsel.' }
  ]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const suggestions = [
    'What are my tenant rights?',
    'Explain NDA basics',
    'Can I break a contract early?',
    'What is intellectual property?'
  ];

  const sendMessage = async (text) => {
    const question = text || input;
    if (!question.trim() || !user) return;

    const userMessage = { sender: 'user', text: question };
    setChatHistory(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/ai/chat', { question });
      setChatHistory(prev => [...prev, { sender: 'ai', text: res.data.answer }]);
    } catch {
      setChatHistory(prev => [...prev, { sender: 'ai', text: 'I apologize, but I encountered an error processing your request. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => { e.preventDefault(); sendMessage(); };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-120px)] flex flex-col animate-fade-in-up opacity-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/><line x1="10" y1="22" x2="14" y2="22"/></svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">AI Legal Assistant</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-slate-400">Online • GPT powered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 glass-strong rounded-2xl overflow-hidden flex flex-col shadow-2xl shadow-black/20">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
              <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white'
                    : 'bg-gradient-to-br from-emerald-500 to-teal-400 text-white'
                }`}>
                  {msg.sender === 'user' ? user?.name?.charAt(0) || 'U' : 'AI'}
                </div>
                {/* Bubble */}
                <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-sm'
                    : 'bg-slate-800/80 text-slate-200 rounded-tl-sm border border-slate-700/50'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-xs font-bold text-white">AI</div>
                <div className="bg-slate-800/80 rounded-2xl rounded-tl-sm px-4 py-3 border border-slate-700/50">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggestions */}
        {chatHistory.length <= 1 && (
          <div className="px-6 pb-4">
            <p className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wider">Suggested questions</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s)}
                  className="text-xs bg-slate-800/60 border border-slate-700/50 text-slate-300 px-3 py-1.5 rounded-full hover:bg-blue-600/20 hover:border-blue-500/30 hover:text-blue-300 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700/50 bg-slate-900/50 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask a legal question..."
            className="flex-1 bg-slate-800/60 border border-slate-700/50 rounded-xl px-5 py-3 text-white text-sm input-focus transition-all placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="btn-primary px-6 py-3 rounded-xl font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;
