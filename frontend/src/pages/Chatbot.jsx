import React, { useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Chatbot() {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'ai', text: 'Hello! I\'m your AI Legal Assistant. I can help you understand legal concepts, review situations, and provide general guidance.\n\nPlease note: My advice is for informational purposes only and does not substitute professional legal counsel.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const suggestions = [
    { text: 'What are my tenant rights?', icon: '🏠' },
    { text: 'Explain NDA basics', icon: '📄' },
    { text: 'Can I break a contract early?', icon: '📝' },
    { text: 'What is intellectual property?', icon: '💡' },
    { text: 'Employee termination laws', icon: '⚖️' },
    { text: 'How to file a complaint?', icon: '📋' },
  ];

  const sendMessage = async (text) => {
    const question = text || input;
    if (!question.trim() || !user) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage = { sender: 'user', text: question, time: now };
    setChatHistory(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/ai/chat', { question });
      setChatHistory(prev => [...prev, {
        sender: 'ai',
        text: res.data.answer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch {
      setChatHistory(prev => [...prev, {
        sender: 'ai',
        text: 'I apologize, but I encountered an error processing your request. Please try again.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e) => { e.preventDefault(); sendMessage(); };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setChatHistory([
      { sender: 'ai', text: 'Chat cleared. How can I help you today?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-120px)] flex flex-col animate-fade-in-up opacity-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20 animate-scale-pulse">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/><line x1="10" y1="22" x2="14" y2="22"/></svg>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#050a18]" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">AI Legal Assistant</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-slate-400">Online • GPT powered</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="badge badge-blue hidden sm:inline-flex">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            {chatHistory.length} messages
          </span>
          <button
            onClick={clearChat}
            className="w-9 h-9 rounded-lg bg-slate-800/60 border border-slate-700/40 flex items-center justify-center text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all tooltip-wrapper"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            <span className="tooltip-text">Clear chat</span>
          </button>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 glass-ultra rounded-2xl overflow-hidden flex flex-col shadow-2xl shadow-black/20">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
              <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white'
                    : 'bg-gradient-to-br from-emerald-500 to-teal-400 text-white'
                }`}>
                  {msg.sender === 'user' ? user?.name?.charAt(0) || 'U' : 'AI'}
                </div>
                {/* Bubble */}
                <div className="flex flex-col">
                  <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-sm shadow-lg shadow-blue-600/20'
                      : 'bg-slate-800/80 text-slate-200 rounded-tl-sm border border-slate-700/50'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  <span className={`text-[10px] text-slate-600 mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start animate-fade-in-up">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-xs font-bold text-white shadow-md">AI</div>
                <div className="bg-slate-800/80 rounded-2xl rounded-tl-sm px-5 py-3.5 border border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                    </div>
                    <span className="text-[11px] text-slate-500 ml-1">Analyzing...</span>
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
            <p className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-wider flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              Suggested questions
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s.text)}
                  className="text-xs bg-slate-800/60 border border-slate-700/50 text-slate-300 px-3 py-2.5 rounded-xl hover:bg-blue-600/15 hover:border-blue-500/30 hover:text-blue-300 transition-all text-left flex items-center gap-2 group"
                >
                  <span className="text-base group-hover:scale-110 transition-transform">{s.icon}</span>
                  <span>{s.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700/30 bg-slate-900/50 flex gap-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a legal question..."
              className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-5 py-3.5 text-white text-sm input-focus transition-all placeholder:text-slate-500 pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-600 hidden sm:block">↵ Enter</span>
          </div>
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="btn-primary px-5 py-3.5 rounded-xl font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 min-w-[52px] justify-center"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </form>
      </div>

      {/* Disclaimer */}
      <p className="text-[10px] text-slate-600 text-center mt-3 flex items-center justify-center gap-1">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        AI responses are informational only and do not constitute legal advice. Consult a licensed attorney for legal matters.
      </p>
    </div>
  );
}

export default Chatbot;
