import React from 'react';
import { motion } from 'framer-motion';

const PackagesPage = () => {
  const packages = [
    {
      title: "Reels & Shorts",
      price: "₹1,200",
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
      title: "Long Format",
      subtitle: "(YouTube / Interviews / Podcasts)",
      price: "₹3,500",
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
      title: "Motion Graphics / Explainers", 
      price: "₹2,000",
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

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              className="bg-black border border-white/20 rounded-2xl p-8 relative overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(108, 99, 255, 0.4)",
                boxShadow: "0 20px 40px rgba(108, 99, 255, 0.2)"
              }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-light italic text-white mb-2">{pkg.title}</h3>
                {pkg.subtitle && (
                  <p className="text-sm text-gray-400 mb-4">{pkg.subtitle}</p>
                )}
                
                <div className="mb-6">
                  <span className="text-3xl font-light italic text-primary">Starting from</span>
                  <div className="text-4xl font-light italic text-white mt-2">{pkg.price}</div>
                  {pkg.duration && (
                    <p className="text-gray-400 mt-2">{pkg.duration}</p>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, i) => (
                    <motion.li 
                      key={i}
                      className="text-gray-300 flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <span className="text-primary mr-2">•</span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <p className="text-gray-400 text-sm mb-6 italic">
                  → "{pkg.description}"
                </p>

                <motion.button 
                  className="w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-light italic"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get a Quote
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center bg-black border border-white/20 rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
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