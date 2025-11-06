import React from 'react';
import { motion } from 'framer-motion';

const OtherWork = () => {
  const otherProjects = [
    {
      title: "Minecraft Server Trailer",
      description: "Epic cinematic trailer for a popular Minecraft server with custom shaders and smooth camera movements",
      category: "Gaming",
      thumbnail: "https://via.placeholder.com/400x225/4CAF50/white?text=Minecraft+Server",
      stats: "2M+ Views"
    },
    {
      title: "Educational Animation Series",
      description: "Animated explainer videos for online learning platform covering complex topics in simple visuals",
      category: "Education",
      thumbnail: "https://via.placeholder.com/400x225/2196F3/white?text=Education+Series",
      stats: "500K+ Students"
    },
    {
      title: "Brand Identity Package",
      description: "Complete visual identity including logo animation, brand guidelines, and marketing materials",
      category: "Branding",
      thumbnail: "https://via.placeholder.com/400x225/FF9800/white?text=Brand+Identity",
      stats: "15+ Brands"
    },
    {
      title: "Music Video Production",
      description: "High-energy music video with synchronized effects, color grading, and creative transitions",
      category: "Music",
      thumbnail: "https://via.placeholder.com/400x225/E91E63/white?text=Music+Video",
      stats: "1M+ Streams"
    },
    {
      title: "Product Demo Videos",
      description: "Professional product showcases with 3D animations and detailed feature explanations",
      category: "Commercial",
      thumbnail: "https://via.placeholder.com/400x225/9C27B0/white?text=Product+Demo",
      stats: "50+ Products"
    },
    {
      title: "Social Media Content",
      description: "Viral-ready short-form content optimized for Instagram Reels, TikTok, and YouTube Shorts",
      category: "Social Media",
      thumbnail: "https://via.placeholder.com/400x225/00BCD4/white?text=Social+Content",
      stats: "10M+ Reach"
    }
  ];

  return (
    <section className="py-20 px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent premium-font drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Other Work & Projects
        </motion.h2>
        
        <motion.p 
          className="text-center text-gray-400 mb-16 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Diverse projects across multiple industries and platforms
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherProjects.map((project, index) => (
            <motion.div
              key={index}
              className="premium-card rounded-2xl overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              {/* Thumbnail */}
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-blue-500/80 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  {project.category}
                </div>
                
                {/* Stats Badge */}
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full text-blue-400 text-sm font-medium">
                  {project.stats}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button 
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-semibold text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Full Portfolio
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default OtherWork;