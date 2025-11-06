import React from 'react';
import { motion } from 'framer-motion';
import { SiAdobepremierepro, SiAdobeaftereffects, SiAdobephotoshop, SiBlender, SiAdobeillustrator, SiDavinciresolve } from 'react-icons/si';
import { FaVideo, FaPalette, FaCube } from 'react-icons/fa';
import { BiMoviePlay } from 'react-icons/bi';

const ServicesPage = () => {
  const services = [
    {
      title: "Video Editor",
      description: "Professional video editing for all your content needs",
      icon: <SiAdobepremierepro className="w-12 h-12 text-blue-400" />
    },
    {
      title: "Motion Graphics",
      description: "Dynamic animations that bring your ideas to life",
      icon: <SiAdobeaftereffects className="w-12 h-12 text-blue-400" />
    },
    {
      title: "Graphic Designer",
      description: "Stunning visual designs for your brand",
      icon: <SiAdobephotoshop className="w-12 h-12 text-blue-400" />
    },
    {
      title: "3D Animation",
      description: "Immersive 3D experiences and animations",
      icon: <SiBlender className="w-12 h-12 text-blue-400" />
    },
    {
      title: "Thumbnail Design",
      description: "Eye-catching thumbnails that get clicks",
      icon: <SiAdobeillustrator className="w-12 h-12 text-blue-400" />
    },
    {
      title: "Gaming & Education Videos",
      description: "Smooth, engaging content for gaming and educational channels",
      icon: <SiDavinciresolve className="w-12 h-12 text-blue-400" />
    }
  ];

  return (
    <div className="py-20 px-8 bg-black min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-20 bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent premium-font drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Our Services
        </motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="premium-card p-8 rounded-2xl relative overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15, type: "spring" }}
              whileHover={{ 
                scale: 1.05,
                y: -10
              }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.4 }}
              />
              <div className="absolute top-0 right-0 w-20 h-20 gold-accent opacity-10 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <div className="mb-4">{service.icon}</div>
                <motion.h3 
                  className="text-2xl font-semibold mb-4 text-white group-hover:text-blue-400 transition-all duration-300 premium-font"
                  whileHover={{ x: 5 }}
                >{service.title}</motion.h3>
                <motion.p 
                  className="text-gray-300 group-hover:text-white transition-all duration-300"
                  whileHover={{ x: 5 }}
                >{service.description}</motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;