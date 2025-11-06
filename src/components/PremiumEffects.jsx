import React from 'react';
import { motion } from 'framer-motion';

const PremiumEffects = () => {
  return (
    <>
      {/* Floating Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full opacity-10"
            style={{
              background: `radial-gradient(circle, ${i % 2 === 0 ? '#6C63FF' : '#A66BFF'} 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(20px)'
            }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -100, 50, 0],
              scale: [1, 1.2, 0.8, 1]
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(108, 99, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(108, 99, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Spotlight Effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle 800px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(108, 99, 255, 0.05) 0%, transparent 50%)'
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </>
  );
};

export default PremiumEffects;