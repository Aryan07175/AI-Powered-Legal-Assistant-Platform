import React, { useEffect, useRef, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { AuthContext } from '../context/AuthContext';

const socket = io('http://localhost:5000');

function VideoCallRoom() {
  const { roomId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [stream, setStream] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callerSignal, setCallerSignal] = useState(null);
  const [callEnded, setCallEnded] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const timerRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      setStream(currentStream);
      if (myVideo.current) myVideo.current.srcObject = currentStream;
    }).catch(() => {
      console.error('Could not access media devices.');
    });

    socket.emit('join_room', roomId);

    socket.on('call_user', (data) => {
      setCallerSignal(data.signal);
    });

    return () => { socket.disconnect(); };
  }, [roomId]);

  // Call timer
  useEffect(() => {
    if (callAccepted && !callEnded) {
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [callAccepted, callEnded]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const callUser = async () => {
    try {
      const { default: SimplePeer } = await import('simple-peer/simplepeer.min.js');
      const peer = new SimplePeer({ initiator: true, trickle: false, stream });
      peer.on('signal', (data) => {
        socket.emit('call_user', { userToCall: roomId, signalData: data, from: socket.id, name: user?.name });
      });
      peer.on('stream', (currentStream) => {
        if (userVideo.current) userVideo.current.srcObject = currentStream;
      });
      socket.on('call_accepted', (signal) => { setCallAccepted(true); peer.signal(signal); });
      connectionRef.current = peer;
    } catch (e) { console.error(e); }
  };

  const answerCall = async () => {
    try {
      const { default: SimplePeer } = await import('simple-peer/simplepeer.min.js');
      setCallAccepted(true);
      const peer = new SimplePeer({ initiator: false, trickle: false, stream });
      peer.on('signal', (data) => { socket.emit('answer_call', { signal: data, to: roomId }); });
      peer.on('stream', (currentStream) => { if (userVideo.current) userVideo.current.srcObject = currentStream; });
      peer.signal(callerSignal);
      connectionRef.current = peer;
    } catch (e) { console.error(e); }
  };

  const leaveCall = () => {
    setCallEnded(true);
    if (connectionRef.current) connectionRef.current.destroy();
    if (stream) stream.getTracks().forEach(t => t.stop());
    if (timerRef.current) clearInterval(timerRef.current);
    navigate('/dashboard');
  };

  const toggleMic = () => {
    if (stream) { stream.getAudioTracks().forEach(t => t.enabled = !t.enabled); setMicOn(!micOn); }
  };
  const toggleCam = () => {
    if (stream) { stream.getVideoTracks().forEach(t => t.enabled = !t.enabled); setCamOn(!camOn); }
  };

  const ControlButton = ({ onClick, active, activeIcon, inactiveIcon, label, danger }) => (
    <div className="tooltip-wrapper">
      <button
        onClick={onClick}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
          active
            ? 'bg-slate-700/50 text-white hover:bg-slate-600/60 border border-slate-600/30'
            : danger
            ? 'bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30'
            : 'bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30'
        }`}
      >
        {active ? activeIcon : inactiveIcon}
      </button>
      <span className="tooltip-text">{label}</span>
    </div>
  );

  return (
    <div className="animate-fade-in-up opacity-0 flex flex-col items-center max-w-6xl mx-auto">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Video Consultation</h1>
            <p className="text-slate-400 text-sm flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Room: {roomId?.substring(0, 8)}...
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {callAccepted && !callEnded && (
            <span className="badge badge-amber font-mono">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {formatTime(callDuration)}
            </span>
          )}
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${callAccepted ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-pulse'}`} />
            <span className="text-xs text-slate-400 font-medium">{callAccepted ? 'Connected' : 'Waiting'}</span>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* My stream */}
        <div className="relative glass-ultra rounded-2xl overflow-hidden aspect-video bg-slate-900">
          {stream ? (
            <video playsInline muted ref={myVideo} autoPlay className="w-full h-full object-cover" />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-2">
              <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"/><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              <span className="text-xs">Initializing camera...</span>
            </div>
          )}
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5 border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> You
          </div>
          {/* Mic/Cam indicators */}
          <div className="absolute top-3 right-3 flex gap-1.5">
            {!micOn && (
              <span className="w-7 h-7 rounded-lg bg-red-600/80 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12"/></svg>
              </span>
            )}
            {!camOn && (
              <span className="w-7 h-7 rounded-lg bg-red-600/80 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.5 7.5L23 7v10"/></svg>
              </span>
            )}
          </div>
        </div>

        {/* Remote stream */}
        <div className="relative glass-ultra rounded-2xl overflow-hidden aspect-video bg-slate-900/80 border border-slate-700/30">
          {callAccepted && !callEnded ? (
            <video playsInline ref={userVideo} autoPlay className="w-full h-full object-cover" />
          ) : (
            <div className="h-full flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-slate-800/60 flex items-center justify-center border border-slate-700/50">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-500">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div className="text-center">
                <p className="text-slate-400 text-sm font-medium mb-1">Waiting for other party</p>
                <p className="text-slate-600 text-xs">They'll appear here once connected</p>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-blue-400/60 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                <span className="w-2 h-2 bg-blue-400/60 rounded-full animate-bounce" style={{animationDelay: '200ms'}} />
                <span className="w-2 h-2 bg-blue-400/60 rounded-full animate-bounce" style={{animationDelay: '400ms'}} />
              </div>
            </div>
          )}
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold text-white border border-white/5">
            Other Party
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="glass-ultra p-5 rounded-2xl flex items-center gap-4 shadow-2xl shadow-black/25">
        <ControlButton
          onClick={toggleMic}
          active={micOn}
          label={micOn ? 'Mute' : 'Unmute'}
          activeIcon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>}
          inactiveIcon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2c0 .76-.13 1.49-.35 2.17"/><line x1="12" y1="19" x2="12" y2="23"/></svg>}
        />

        <ControlButton
          onClick={toggleCam}
          active={camOn}
          label={camOn ? 'Turn off camera' : 'Turn on camera'}
          activeIcon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>}
          inactiveIcon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16.5 7.5L23 7v10l-6.5-.5"/><line x1="1" y1="1" x2="23" y2="23"/><path d="M8.4 4H14a2 2 0 012 2v7.5"/><path d="M2 8.4V17a2 2 0 002 2h10.6"/></svg>}
        />

        <div className="w-px h-10 bg-slate-700/50 mx-1" />

        {!callAccepted && !callerSignal && (
          <button onClick={callUser} className="btn-primary px-7 py-3.5 rounded-xl text-sm font-semibold flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Start Call
          </button>
        )}
        {callerSignal && !callAccepted && (
          <button onClick={answerCall} className="bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-3.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 animate-scale-pulse">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Answer Incoming Call
          </button>
        )}
        {callAccepted && !callEnded && (
          <button onClick={leaveCall} className="bg-red-600 hover:bg-red-500 text-white px-7 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-red-500/20 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/><line x1="23" y1="1" x2="1" y2="23"/></svg>
            End Call
          </button>
        )}

        <div className="w-px h-10 bg-slate-700/50 mx-1" />

        {/* Back button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="w-14 h-14 rounded-2xl bg-slate-700/30 text-slate-400 hover:text-white hover:bg-slate-700/50 flex items-center justify-center transition-all border border-slate-600/20 tooltip-wrapper"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          <span className="tooltip-text">Back to Dashboard</span>
        </button>
      </div>

      {/* Encryption notice */}
      <p className="text-[10px] text-slate-600 text-center mt-4 flex items-center justify-center gap-1">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        End-to-end encrypted • Your consultation is private and secure
      </p>
    </div>
  );
}

export default VideoCallRoom;
