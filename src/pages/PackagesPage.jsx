import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    if (packages.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % packages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [packages.length]);
  
  useEffect(() => {
    const savedPackages = localStorage.getItem('packages');
    if (savedPackages) {
      setPackages(JSON.parse(savedPackages));
    } else {
      // Default packages if none exist
      const defaultPackages = [
        {
          id: 1,
          title: "Reels & Shorts",
          duration: "Up to 60 seconds",
          features: [
            "Snappy cuts + on-beat pacing",
            "Dynamic captions & trendy effects", 
            "Basic color grade + sound polish",
            "2 revision rounds",
            "Default Raw file export"
          ],
          description: "Perfect for creators who want scroll-stopping short-form edits."
        },
        {
          id: 2,
          title: "Long Format",
          subtitle: "(YouTube / Interviews / Podcasts)",
          duration: "Up to 10–15 minutes",
          features: [
            "Multi-cam sync & clean transitions",
            "Color correction & light grading", 
            "Audio cleanup + background music",
            "2–3 revisions",
            "Thumbnail included (optional)"
          ],
          description: "For creators who want polished storytelling that holds attention."
        },
        {
          id: 3,
          title: "Motion Graphics / Explainers", 
          features: [
            "Logo animations / lower thirds / infographics",
            "Text animations & visual effects",
            "Sound design + music sync", 
            "2–3 revisions",
            "4K export quality"
          ],
          description: "Ideal for brands and creators who want their visuals to pop."
        }
      ];
      setPackages(defaultPackages);
      localStorage.setItem('packages', JSON.stringify(defaultPackages));
    }
  }, []);

  return (
    <div className="py-20 px-8 bg-black min-h-screen">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-primary/5 to-secondary/5"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2 
          className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent premium-font drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Packages
        </motion.h2>
        
        <motion.p 
          className="text-center text-white/80 mb-16 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Professional video editing with 4+ years of experience
        </motion.p>

        <div className="relative h-[600px] max-w-5xl mx-auto flex items-center justify-center">
            {packages.map((pkg, index) => {
              const isCenter = index === activeIndex;
              const isPopular = pkg.mostPopular;
              const offset = (index - activeIndex) * 320;
              
              return (
                <motion.div
                  key={pkg.id || index}
                  className={`absolute bg-black/90 backdrop-blur-sm border rounded-3xl p-6 overflow-hidden group transition-all duration-1000 ${
                    isCenter
                      ? 'w-80 h-[550px] border-blue-500/50 shadow-2xl shadow-blue-500/30 z-10' 
                      : 'w-64 h-[450px] border-white/20 z-0'
                  } ${
                    isPopular && isCenter ? 'border-blue-500/70' : ''
                  }`}
                  style={{
                    transform: `translateX(${offset}px) scale(${isCenter ? 1.1 : 0.9})`,
                    opacity: isCenter ? 1 : 0.6,
                    left: '50%',
                    marginLeft: '-160px'
                  }}
                >
                {/* Floating background elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-secondary/10 rounded-full blur-lg"></div>
                
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 ${
                    isPopular ? 'opacity-30' : 'opacity-0'
                  } group-hover:opacity-100`}
                  transition={{ duration: 0.3 }}
                />
              
                <div className="relative z-10 h-full flex flex-col">
                  <h3 className={`font-light italic text-white mb-2 ${
                    isPopular ? 'text-3xl' : 'text-2xl'
                  }`}>{pkg.title}</h3>
                {pkg.subtitle && (
                  <p className="text-sm text-gray-400 mb-4">{pkg.subtitle}</p>
                )}
                
                {pkg.duration && (
                  <div className="mb-6">
                    <p className="text-gray-400">{pkg.duration}</p>
                  </div>
                )}

                  <ul className="space-y-3 mb-6 flex-1">
                    {pkg.features.map((feature, i) => (
                      <li 
                        key={i}
                        className={`text-gray-300 flex items-start ${
                          isPopular ? 'text-base' : 'text-sm'
                        }`}
                      >
                        <span className="text-primary mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <p className="text-gray-400 text-sm mb-6 italic">
                    → "{pkg.description}"
                  </p>

                  <motion.button 
                    className={`w-full bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-light italic ${
                      isPopular ? 'py-4 text-lg' : 'py-3'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.location.href = '/contact'}
                  >
                    {isPopular ? 'Most Popular - Contact Us' : 'Contact Us'}
                  </motion.button>
                </div>
                {(isPopular && isCenter) && (
                  <motion.div 
                    className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-30"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    <span className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full text-sm font-semibold shadow-2xl border border-white/20">
                      ⭐ Most Popular
                    </span>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>



        <motion.div 
          className="mt-16 text-center bg-black border border-white/20 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold text-white mb-6 premium-font">Why Choose GillaX?</h3>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Experience</span>
              <span>4+ years experience in professional editing</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Adobe Suite</span>
              <span>Expert in Adobe After Effects, Premiere Pro & Photoshop</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Gaming</span>
              <span>Specializes in gaming smooth edits</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Versatile</span>
              <span>Skilled in all types of edits (cinematic, reels, social media)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PackagesPage;