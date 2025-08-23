
// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import bgvideo from './assets/bg-video.mp4';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

import RoleSelection from './pages/RoleSelection';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardExpert from './pages/DashboardExpert';
import DashboardUser from './pages/DashboardUser';
import ReportSighting from './pages/ReportSighting';
import ReportIncident from './pages/ReportIncident';
import Trip from './pages/Trip';
import Species from './pages/Species';
import Sightings from './pages/Sightings';
import Profile from './pages/Profile';
import TripHistory from './pages/TripHistory';
import RuleGuideTraveller from './pages/RuleGuideTraveller';
import RuleGuideExpert from './pages/RuleGuideExpert';
import Crimes from './pages/Crimes';
import RoleVerification from './pages/RoleVerification';
import Analytics from './pages/Analytics';
import MediaGallery from './pages/MediaGallery';
import OfflineQueue from './pages/OfflineQueue';
import BookingTours from './pages/BookingTours';
import BookingDiving from './pages/BookingDiving';
import BookingFlights from './pages/BookingFlights';
import Feed from './pages/Feed';
import NewPost from './pages/NewPost';
import License from './pages/License';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

import PrivateRoute from './auth/PrivateRoute';
import RoleGate from './auth/RoleGate';
import ProtectedRoute from './auth/ProtectedRoute';
import { useAuth } from './auth/AuthContext';

const MainInfo = () => (
  <motion.section 
    initial={{ opacity: 0, y: 60 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="max-w-6xl mx-auto my-16 px-6 py-12 relative"
  >
    {/* Decorative Elements */}
    <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-xl"></div>
    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-teal-400/20 to-cyan-500/20 rounded-full blur-xl"></div>
    
    {/* Main Card */}
    <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
      {/* Top Gradient Bar */}
      <div className="h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-500"></div>
      
      {/* Content */}
      <div className="p-8 md:p-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-800 to-blue-800 bg-clip-text text-transparent">
            The Fight Against Whale Hunting
          </h2>
        </div>
        
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <p className="text-xl text-gray-600 mb-6 font-light">
            Join our global mission to protect marine life and preserve ocean ecosystems for future generations.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-3 flex-shrink-0"></div>
                <p>Advanced monitoring systems to track whale populations and migration patterns</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                <p>Real-time incident reporting for immediate conservation response</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-3 flex-shrink-0"></div>
                <p>Expert collaboration network for marine protection strategies</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-3 flex-shrink-0"></div>
                <p>Educational resources and conservation guidelines for travelers</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-3 flex-shrink-0"></div>
                <p>Data analytics for tracking conservation impact and trends</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-3 flex-shrink-0"></div>
                <p>Community-driven platform for marine life enthusiasts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.section>
);

export default function App() {
  const { user } = useAuth();
  const location = useLocation();
  const [showCard, setShowCard] = useState(false);
  const [cardType, setCardType] = useState(null);

  useEffect(() => {
    if (['/login', '/register'].includes(location.pathname)) {
      setShowCard(true);
      setCardType(location.pathname === '/login' ? 'login' : 'register');
    } else {
      setShowCard(false);
    }
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Enhanced Background Video */}
      <div className="fixed inset-0 z-[-2] overflow-hidden">
        <video
          src={bgvideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-110 brightness-75 blur-[2px] transition-all duration-1000"
        />
        {/* Additional overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 via-blue-900/10 to-teal-900/20"></div>
      </div>
      
      {/* Enhanced Glass Overlay */}
      <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-3xl" />
      
      {/* Floating particles effect */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-teal-400/20 rounded-full animate-pulse delay-2000"></div>
      </div>

      <Navbar />

      <AnimatePresence mode="wait">
        {!user && !showCard && (
          <motion.div
            key="hero"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Hero />
            <MainInfo />
          </motion.div>
        )}
        {!user && showCard && (
          <motion.div
            key="auth-card"
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-md"
          >
            {/* Enhanced Auth Card */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 max-w-md w-full mx-4"
            >
              {/* Decorative top bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-500 rounded-t-3xl"></div>
              
              {/* Close button */}
              <button
                onClick={() => {
                  window.history.pushState({}, '', '/');
                  setShowCard(false);
                  setCardType(null);
                }}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200 hover:scale-110"
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Floating background elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-teal-400/20 to-cyan-500/20 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                {cardType === 'login' ? <Login /> : <Register />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Main Content */}
      <main className="flex-1 pt-24 px-2 sm:px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/role-selection" element={<RoleSelection />} />
            <Route path="/login" element={null} />
            <Route path="/register" element={null} />

            <Route
              path="/dashboard-expert"
              element={
                <PrivateRoute role="expert">
                  <RoleGate allowedRoles={['expert']}>
                    <DashboardExpert />
                  </RoleGate>
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard-user"
              element={<PrivateRoute role="tourist"><DashboardUser /></PrivateRoute>}
            />

            <Route path="/trip" element={<PrivateRoute><Trip /></PrivateRoute>} />
            <Route path="/species" element={<PrivateRoute><Species /></PrivateRoute>} />
            <Route path="/sightings" element={<PrivateRoute><Sightings /></PrivateRoute>} />
            <Route path="/report-sighting" element={<PrivateRoute><ReportSighting /></PrivateRoute>} />
            <Route path="/report-incident" element={<PrivateRoute><ReportIncident /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/trip-history" element={<PrivateRoute><TripHistory /></PrivateRoute>} />

            <Route path="/rule-guide-traveller" element={<RuleGuideTraveller />} />
            <Route path="/rule-guide-expert" element={<RuleGuideExpert />} />
            <Route path="/crimes" element={<PrivateRoute role="expert"><Crimes /></PrivateRoute>} />
            <Route path="/verify-role" element={<RoleVerification />} />

            <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
            <Route path="/media" element={<PrivateRoute><MediaGallery /></PrivateRoute>} />
            <Route path="/offline-queue" element={<PrivateRoute><OfflineQueue /></PrivateRoute>} />

            <Route path="/book/tours" element={<BookingTours />} />
            <Route path="/book/diving" element={<BookingDiving />} />
            <Route path="/book/flights" element={<BookingFlights />} />

            <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
            <Route path="/feed/new" element={<ProtectedRoute><NewPost/></ProtectedRoute>} />

            <Route path="/license" element={<License />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}