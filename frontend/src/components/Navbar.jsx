// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Logo from '../assets/logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const drawerRef = useRef(null);

  const primaryLinks = [
    { to: user?.role === 'expert' ? '/dashboard-expert' : '/dashboard-user', label: 'Dashboard' },
    { to: '/species', label: 'Species' },
    { to: '/trip-history', label: 'Trip' },
    { to: '/sightings', label: 'Sightings' },
  ];
  const toolLinks = [
    // { to: '/book/tours', label: 'Book Tours' },
    // { to: '/book/diving', label: 'Book Diving' },
    // { to: '/book/flights', label: 'Book Flights' },
    //  { to: '/feed',       label: 'Community' },    // ← New
  //  { to: '/feed/new',   label: 'New Post' },     // ← New
    { to: '/analytics', label: 'Analytics' },
    { to: '/media', label: 'Media Gallery' },
    { to: '/offline-queue', label: 'Offline Queue' },
    { to: '/crimes', label: 'Crimes', role: 'expert' },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const onClickOutside = e => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  // Toggle dark mode class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  const handleNav = path => () => {
    setMobileOpen(false);
    setToolsOpen(false);
    navigate(path);
  };

  const goHome = () => {
    setMobileOpen(false);
    setToolsOpen(false);
    const dest = user ? (user.role === 'expert' ? '/dashboard-expert' : '/dashboard-user') : '/register';
    navigate(dest);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Avatar URL fallback
  const avatarUrl = user?.avatar?.startsWith('http')
    ? user.avatar
    : '/default-avatar.png';

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-2xl border-b border-white/20 dark:bg-gray-900/10 dark:border-gray-700/20 transition-all duration-300 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={goHome}>
            <motion.img
              src={Logo}
              alt="Aqua Logo"
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 border-white/30 shadow-lg backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
            />
            <h1 className="ml-2 text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white uppercase drop-shadow-lg">
              Aqua
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {primaryLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/20 backdrop-blur-sm"
              >
                {link.label}
              </Link>
            ))}

            <div ref={drawerRef} className="relative">
              <button
                onClick={() => setToolsOpen(o => !o)}
                className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/20 backdrop-blur-sm"
              >
                Tools ▾
              </button>
              <AnimatePresence>
                {toolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl py-3 min-w-[180px] z-[999] border border-white/20 dark:border-gray-700/20"
                  >
                    {toolLinks
                      .filter(t => !t.role || user?.role === t.role)
                      .map(tool => (
                        <Link
                          key={tool.to}
                          to={tool.to}
                          onClick={handleNav(tool.to)}
                          className="block px-4 py-3 text-gray-800 dark:text-white hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-200 rounded-lg mx-2 font-medium"
                        >
                          {tool.label}
                        </Link>
                      ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Desktop Auth / Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <button
              onClick={() => setDarkMode(d => !d)}
              className="text-gray-800 dark:text-white text-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-2 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/20 backdrop-blur-sm"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button> */}

            {user ? (
              <>
                <Link to="/profile" onClick={handleNav('/profile')}>
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-white/30 dark:border-gray-700/30 object-cover hover:scale-110 transition-transform duration-200 shadow-lg"
                    onError={e => (e.target.src = '/default-avatar.png')}
                  />
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-md shadow hover:from-blue-600 hover:to-blue-800 transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? 'Logging out...' : 'Logout'}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleNav('/login')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition-colors duration-200"
                >
                  Login
                </button>
                <button
                  onClick={handleNav('/register')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition-colors duration-200"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800 dark:text-white text-2xl focus:outline-none hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-2 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/20 backdrop-blur-sm"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle mobile menu"
          >
            <motion.span
              animate={{ rotate: mobileOpen ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {mobileOpen ? '✕' : '☰'}
            </motion.span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-y-0 left-0 w-80 max-w-[85vw] z-50 md:hidden flex flex-col bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl text-gray-800 dark:text-white shadow-2xl border-r border-white/20 dark:border-gray-700/20"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20 dark:border-gray-700/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl">
              <div className="flex items-center">
                <img
                  src={Logo}
                  alt="Aqua Logo"
                  className="h-8 w-8 rounded-full border-2 border-white/30 dark:border-gray-700/30 shadow-lg cursor-pointer"
                  onClick={goHome}
                />
                <h2 className="ml-2 text-xl font-bold">Aqua</h2>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-gray-800 dark:text-white text-2xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/20"
              >
                ✕
              </button>
            </div>

            {/* Mobile Navigation Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Primary Links */}
              <nav className="space-y-3 mb-6">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Navigation
                </h3>
                {primaryLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={handleNav(link.to)}
                    className="block w-full text-left px-4 py-3 rounded-xl text-gray-800 dark:text-white font-medium hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200 active:scale-95 backdrop-blur-sm border border-transparent hover:border-white/30 dark:hover:border-gray-700/30"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Tools */}
              <nav className="space-y-3 mb-6">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Tools
                </h3>
                {toolLinks
                  .filter(t => !t.role || user?.role === t.role)
                  .map(tool => (
                    <Link
                      key={tool.to}
                      to={tool.to}
                      onClick={handleNav(tool.to)}
                      className="block w-full text-left px-4 py-3 rounded-xl text-gray-800 dark:text-white font-medium hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200 active:scale-95 backdrop-blur-sm border border-transparent hover:border-white/30 dark:hover:border-gray-700/30"
                    >
                      {tool.label}
                    </Link>
                  ))}
              </nav>
            </div>

            {/* Mobile Footer */}
            <div className="border-t border-white/20 dark:border-gray-700/20 p-4 space-y-4 bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl">
              {/* Dark Mode Toggle */}
              {/* <button
                onClick={() => setDarkMode(d => !d)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-white font-medium hover:bg-blue-700/50 transition-all duration-200"
                aria-label="Toggle Dark Mode"
              >
                <span>Dark Mode</span>
                <span className="text-xl">
                  {darkMode ? <FaSun /> : <FaMoon />}
                </span>
              </button> */}

              {/* User Profile / Auth */}
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={handleNav('/profile')}
                    className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200 backdrop-blur-sm border border-transparent hover:border-white/30 dark:hover:border-gray-700/30"
                  >
                    <img
                      src={avatarUrl}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border-2 border-white/30 dark:border-gray-700/30 object-cover shadow-lg"
                      onError={e => (e.target.src = '/default-avatar.png')}
                    />
                    <div className="flex-1">
                      <span className="text-gray-800 dark:text-white font-medium block">Profile</span>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">{user.email}</span>
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-red-500/80 to-red-600/80 backdrop-blur-xl text-white py-3 rounded-xl shadow-lg hover:from-red-600/90 hover:to-red-700/90 transition-all duration-200 disabled:opacity-50 font-medium border border-white/20"
                  >
                    {loading ? 'Logging out...' : 'Logout'}
                  </button>
                </>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={handleNav('/login')}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleNav('/register')}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 font-medium"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


