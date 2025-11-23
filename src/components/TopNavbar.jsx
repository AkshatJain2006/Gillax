import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavAuth from './NavAuth';

const TopNavbar = ({ currentPage, setCurrentPage, currentUser, onLogin, onLogout, onAdminAccess }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', page: 'home' },
    { name: 'Services', page: 'services' },
    { name: 'Packages', page: 'packages' },
    { name: 'Other Work', page: 'otherwork' },
    { name: 'Contact', page: 'contact' }
  ];

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-blue-500/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-16 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="GillaX Logo" 
                  className="w-12 h-8 object-cover"
                />
              </div>
              <h1 className="text-xl font-bold text-white premium-font">
                GillaX
              </h1>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                className="relative cursor-pointer group"
                onClick={() => setCurrentPage(item.page)}
                whileHover={{ y: -2 }}
              >
                <span className={`text-sm font-medium transition-colors duration-300 ${
                  currentPage === item.page ? 'text-blue-400' : 'text-gray-300 group-hover:text-white'
                }`}>
                  {item.name}
                </span>
                
                {/* Animated underline */}
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600"
                  initial={{ width: 0 }}
                  animate={{ width: currentPage === item.page ? '100%' : 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Floating dots animation */}
                {currentPage === item.page && (
                  <motion.div
                    className="absolute -top-2 left-1/2 w-1 h-1 bg-blue-400 rounded-full"
                    animate={{ 
                      y: [-4, -8, -4],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  />
                )}
              </motion.div>
            ))}
            
            {/* Auth Component */}
            <NavAuth 
              currentUser={currentUser}
              onLogin={onLogin}
              onLogout={onLogout}
              onAdminAccess={onAdminAccess}
            />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div className="space-y-1.5">
              <motion.div 
                className="w-5 h-0.5 bg-blue-400"
                animate={{ 
                  rotate: isMenuOpen ? 45 : 0, 
                  y: isMenuOpen ? 4 : 0,
                  scaleX: isMenuOpen ? 1.2 : 1
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="w-5 h-0.5 bg-blue-400"
                animate={{ 
                  opacity: isMenuOpen ? 0 : 1,
                  x: isMenuOpen ? 10 : 0
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.div 
                className="w-5 h-0.5 bg-blue-400"
                animate={{ 
                  rotate: isMenuOpen ? -45 : 0, 
                  y: isMenuOpen ? -4 : 0,
                  scaleX: isMenuOpen ? 1.2 : 1
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden mt-4 space-y-3 overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMenuOpen ? 'auto' : 0, 
            opacity: isMenuOpen ? 1 : 0 
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              className="relative"
              initial={{ x: -50, opacity: 0 }}
              animate={{ 
                x: isMenuOpen ? 0 : -50, 
                opacity: isMenuOpen ? 1 : 0 
              }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <button
                onClick={() => {
                  setCurrentPage(item.page);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-all relative ${
                  currentPage === item.page 
                    ? 'text-blue-400 bg-blue-950/30' 
                    : 'text-gray-300 hover:text-white hover:bg-blue-950/20'
                }`}
              >
                {item.name}
                {currentPage === item.page && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400 rounded-r"
                    layoutId="mobile-active-indicator"
                  />
                )}
              </button>
            </motion.div>
          ))}
          
          {/* Mobile Auth */}
          <div className="mt-4 pt-4 border-t border-gray-700">
            <NavAuth 
              currentUser={currentUser}
              onLogin={onLogin}
              onLogout={onLogout}
              onAdminAccess={onAdminAccess}
            />
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default TopNavbar;