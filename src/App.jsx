import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import TopNavbar from './components/TopNavbar';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PackagesPage from './pages/PackagesPage';
import ContactPage from './pages/ContactPage';
import OtherWorkPage from './pages/OtherWorkPage';
import Portfolio from './components/Portfolio';
import TrustIndicators from './components/TrustIndicators';
import Testimonials from './components/Testimonials';
import OtherWork from './components/OtherWork';
import ClientReviews from './components/ClientReviews';
import PremiumEffects from './components/PremiumEffects';
import Chatbot from './components/Chatbot';
import ScrollProgress from './components/ScrollProgress';
import AdminPanel from './components/AdminPanel';

const MainApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [showAdmin, setShowAdmin] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setShowAdmin(true);
      }
    };
    
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);
  
  if (showAdmin) {
    return <AdminPanel />;
  }

  return (
    <div className="animated-bg min-h-screen relative bg-black">
      {/* Optimized Particles */}
      <div className="floating-particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${2 + i % 3}px`,
              height: `${2 + i % 3}px`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${20 + i * 2}s`,
              background: i % 2 === 0 ? 'rgba(108, 99, 255, 0.2)' : 'rgba(166, 107, 255, 0.2)'
            }}
          />
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <PremiumEffects />
        {location.pathname !== '/admin' && !showAdmin && (
          <>
            <TopNavbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <ScrollProgress />
          </>
        )}
        
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/*" element={
            <div className="pt-20">
              {currentPage === 'home' && (
                <>
                  <HomePage />
                  <TrustIndicators />
                  <Testimonials />
                </>
              )}
              {currentPage === 'services' && <ServicesPage />}
              {currentPage === 'packages' && <PackagesPage />}
              {currentPage === 'contact' && <ContactPage />}
              {currentPage === 'otherwork' && <OtherWorkPage />}
              
              <Portfolio />
              <ClientReviews />
              <Chatbot />
              
              {/* Admin Access Button */}
              <motion.div 
                className="fixed bottom-4 right-4 z-30"
                initial={{ opacity: 0.1 }}
                whileHover={{ opacity: 1 }}
              >
                <a 
                  href="#admin"
                  onClick={() => window.location.hash = 'admin'}
                  className="text-xs px-2 py-1 bg-black/60 border border-white/20 text-gray-400 rounded backdrop-blur-sm"
                >
                  Admin
                </a>
              </motion.div>
            </div>
          } />
        </Routes>
      </motion.div>
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden">
        {/* Particle Background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
        
        <motion.div 
          className="text-8xl font-bold text-silver relative z-10"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ 
            opacity: [1, 1, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 2.5,
            times: [0, 0.8, 1],
            ease: "easeInOut" 
          }}
        >
          GillaX
        </motion.div>
      </div>
    );
  }

  return (
    <Router>
      {loading ? (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden">
          {/* Particle Background */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
          
          <motion.div 
            className="text-8xl font-bold text-silver relative z-10"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ 
              opacity: [1, 1, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2.5,
              times: [0, 0.8, 1],
              ease: "easeInOut" 
            }}
          >
            GillaX
          </motion.div>
        </div>
      ) : (
        <MainApp />
      )}
    </Router>
  );
}

export default App;