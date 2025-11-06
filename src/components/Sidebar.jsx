import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', page: 'home', icon: '●' },
    { name: 'Services', page: 'services', icon: '◆' },
    { name: 'Packages', page: 'packages', icon: '▲' },
    { name: 'Contact', page: 'contact', icon: '★' }
  ];

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <motion.button
        className="fixed top-6 left-6 z-50 md:hidden w-12 h-12 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="text-white text-xl"
        >
          {isOpen ? '×' : '☰'}
        </motion.div>
      </motion.button>

      {/* Sidebar */}
      <motion.nav
        className={`fixed left-0 top-0 h-full w-1/4 bg-black/95 backdrop-blur-sm border-r border-white/10 z-40 flex flex-col items-center py-8 overflow-hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } transition-transform duration-300`}
      >
        {/* Logo */}
        <motion.div
          className="mb-16"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-center">
            <div className="text-4xl font-light italic text-white mb-2">GillaX</div>
            <div className="text-sm text-gray-400 italic">Creative Studio</div>
          </div>
        </motion.div>

        {/* Navigation Items */}
        <div className="flex flex-col space-y-8 flex-1 w-full px-8">
          {navItems.map((item, index) => (
            <motion.button
              key={item.name}
              onClick={() => handleNavClick(item.page)}
              className={`group relative flex items-center space-x-4 transition-colors text-left w-full ${
                currentPage === item.page ? 'text-primary' : 'text-white/60 hover:text-white'
              }`}
              whileHover={{ x: 10 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <span className="text-2xl text-primary">{item.icon}</span>
              <span className="text-lg font-light italic">{item.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Social Links */}
        <div className="mt-8 px-8 w-full">
          <motion.a
            href="https://youtube.com/@GillaXStudio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-white/60 hover:text-white transition-all"
            whileHover={{ x: 10 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-xl text-primary">▶</span>
            <span className="font-light italic">YouTube</span>
          </motion.a>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;