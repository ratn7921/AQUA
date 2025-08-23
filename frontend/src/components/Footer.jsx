

import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {

  return (
    <footer className="w-full bg-white/10 dark:bg-gray-900/10 backdrop-blur-2xl border-t border-white/20 dark:border-gray-700/30 shadow-lg z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Navigation Links with Glass Effect */}
          <nav className="flex gap-6 mb-0 md:mb-0">
            <Link 
              to="/dashboard-user" 
              className="group flex flex-col items-center p-3 rounded-xl bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-800/20 hover:border-white/30 dark:hover:border-gray-600/40 transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="Home Dashboard"
            >
              <span className="text-2xl md:text-3xl mb-1 group-hover:scale-110 transition-transform duration-300">⚓</span>
              <span className="text-xs font-semibold tracking-wide text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">Home</span>
            </Link>
            
            <Link 
              to="/trip" 
              className="group flex flex-col items-center p-3 rounded-xl bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-800/20 hover:border-white/30 dark:hover:border-gray-600/40 transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="Trip Planning"
            >
              <span className="text-2xl md:text-3xl mb-1 group-hover:scale-110 transition-transform duration-300">🗺️</span>
              <span className="text-xs font-semibold tracking-wide text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">Trip</span>
            </Link>
            
            <Link 
              to="/report-sighting" 
              className="group flex flex-col items-center p-3 rounded-xl bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-800/20 hover:border-white/30 dark:hover:border-gray-600/40 transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="Report Sighting"
            >
              <span className="text-2xl md:text-3xl mb-1 group-hover:scale-110 transition-transform duration-300">🐳</span>
              <span className="text-xs font-semibold tracking-wide text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">Sighting</span>
            </Link>
            
            <Link 
              to="/report-incident" 
              className="group flex flex-col items-center p-3 rounded-xl bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-800/20 hover:border-white/30 dark:hover:border-gray-600/40 transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="Report Incident"
            >
              <span className="text-2xl md:text-3xl mb-1 group-hover:scale-110 transition-transform duration-300">🚨</span>
              <span className="text-xs font-semibold tracking-wide text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">Incident</span>
            </Link>
          </nav>

          {/* Legal & Copyright with Glass Container */}
          <div className="text-center md:text-right">
            <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl rounded-xl border border-white/20 dark:border-gray-700/30 p-4 shadow-lg">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-0">
                © {new Date().getFullYear()} AquaWeb. All rights reserved.
              </div>
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 text-xs text-gray-600 dark:text-gray-400">
                <Link 
                  to="/license" 
                  className="px-2 py-1 rounded-lg bg-white/10 dark:bg-gray-700/10 border border-white/20 dark:border-gray-600/20 hover:bg-white/20 dark:hover:bg-gray-700/20 hover:border-white/30 dark:hover:border-gray-500/30 transition-all duration-200 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  License
                </Link>
                <Link 
                  to="/privacy" 
                  className="px-2 py-1 rounded-lg bg-white/10 dark:bg-gray-700/10 border border-white/20 dark:border-gray-600/20 hover:bg-white/20 dark:hover:bg-gray-700/20 hover:border-white/30 dark:hover:border-gray-500/30 transition-all duration-200 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Privacy Policy
                </Link>
                <Link 
                  to="/terms" 
                  className="px-2 py-1 rounded-lg bg-white/10 dark:bg-gray-700/10 border border-white/20 dark:border-gray-600/20 hover:bg-white/20 dark:hover:bg-gray-700/20 hover:border-white/30 dark:hover:border-gray-500/30 transition-all duration-200 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="mt-6 pt-4 border-t border-white/10 dark:border-gray-700/20">
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-400/40 via-blue-500/40 to-cyan-400/40 rounded-full"></div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer