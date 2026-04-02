import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Chatbot from './pages/Chatbot';
import DocumentGenerator from './pages/DocumentGenerator';
import LawyerDirectory from './pages/LawyerDirectory';
import VideoCallRoom from './pages/VideoCallRoom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col items-center">
          <Navbar />
          <main className="w-full max-w-7xl px-4 pt-20 flex-grow pb-8">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/generate-document" element={<DocumentGenerator />} />
              <Route path="/lawyers" element={<LawyerDirectory />} />
              <Route path="/call/:roomId" element={<VideoCallRoom />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
