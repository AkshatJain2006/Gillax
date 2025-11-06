import React from 'react';
import { motion } from 'framer-motion';

const TrustIndicators = () => {
  const stats = [
    { number: '500+', label: 'Projects Completed' },
    { number: '4+', label: 'Years Experience' },
    { number: '50+', label: 'Happy Clients' },
    { number: '24/7', label: 'Support Available' }
  ];

  const certifications = [
    'Adobe Certified Expert',
    'Professional Video Editor',
    'Motion Graphics Specialist',
    'Client Satisfaction Guaranteed'
  ];

  return (
    <div className="py-16 bg-gray-900/30">
      <div className="max-w-6xl mx-auto px-6">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div 
                className="text-4xl font-bold text-primary mb-2"
                whileHover={{ scale: 1.1 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-white mb-6">Trusted</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
                whileHover={{ scale: 1.05, borderColor: 'rgba(108, 99, 255, 0.3)' }}
              >
                ✓ {cert}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Badge */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-green-900/20 border border-green-500/30 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Secure & Professional Service</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrustIndicators;