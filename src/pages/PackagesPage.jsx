import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const PackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [centerPackageIndex, setCenterPackageIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (packages.length > 0) {
        setCenterPackageIndex(prev => (prev + 1) % packages.length);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [packages.length]);

  const handleScroll = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      const delta = e.deltaX;
      const newPosition = Math.max(0, Math.min(scrollPosition + delta, (packages.length - 1) * 450));
      setScrollPosition(newPosition);
      setCenterPackageIndex(Math.round(newPosition / 450));
    }
  };
  
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

        <div 
          ref={containerRef} 
          className="relative h-[700px] overflow-x-auto overflow-y-hidden"
          onWheel={handleScroll}
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#3b82f6 #1f2937'
          }}
        >
          <motion.div 
            className="flex gap-8 h-full items-center transition-transform duration-500"
            style={{ transform: `translateX(-${scrollPosition}px)`, minWidth: `${packages.length * 450}px` }}
          >
            {packages.map((pkg, index) => {
              const isMiddle = pkg.mostPopular || index === centerPackageIndex;
              return (
                <motion.div
                  key={pkg.id || index}
                  className={`bg-black border rounded-2xl p-8 relative overflow-hidden group flex-shrink-0 ${
                    isMiddle 
                      ? 'w-[450px] h-[600px] border-blue-500/50 shadow-2xl shadow-blue-500/20 scale-105' 
                      : 'w-[400px] h-[550px] border-white/20'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: isMiddle ? 1.15 : 1.05,
                    borderColor: "rgba(108, 99, 255, 0.4)",
                    boxShadow: "0 20px 40px rgba(108, 99, 255, 0.25)"
                  }}
                >
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 ${
                  isMiddle ? 'opacity-30' : 'opacity-0'
                } group-hover:opacity-100`}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10 h-full flex flex-col">
                <h3 className={`font-light italic text-white mb-2 ${
                  isMiddle ? 'text-3xl' : 'text-2xl'
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
                        isMiddle ? 'text-base' : 'text-sm'
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
                    isMiddle ? 'py-4 text-lg' : 'py-3'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isMiddle ? 'Most Popular - Contact Us' : 'Contact Us'}
                </motion.button>
              </div>
              {isMiddle && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
            </motion.div>
          );
          })}
          </motion.div>
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