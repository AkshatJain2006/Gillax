import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApiService from '../services/api';

const OtherWorkPage = () => {
  const [works, setWorks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [hoveredWork, setHoveredWork] = useState(null);
  const [selectedWork, setSelectedWork] = useState(null);

  useEffect(() => {
    loadWorks();
  }, []);

  const loadWorks = async () => {
    try {
      const worksData = await ApiService.getWorks();
      setWorks(worksData);
      
      // Extract unique categories from works
      const uniqueCategories = [...new Set(worksData.map(work => work.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Failed to load works:', error);
      // Fallback to default categories
      setCategories(['gaming', 'education', 'branding', 'music', 'commercial', 'social']);
    }
  };

  const categoryOptions = [
    { id: 'all', name: 'All Work' },
    ...categories.map(cat => ({
      id: cat,
      name: cat.charAt(0).toUpperCase() + cat.slice(1)
    }))
  ];

  const filteredWorks = selectedCategory === 'all' 
    ? works 
    : works.filter(work => work.category === selectedCategory);

  return (
    <div className="py-20 px-8 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent premium-font"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Other Work & Projects
        </motion.h1>
        
        <motion.p 
          className="text-center text-gray-400 mb-16 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Diverse projects across multiple industries and platforms
        </motion.p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categoryOptions.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all border ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white border-primary'
                  : 'bg-black text-white border-white/20 hover:border-primary hover:text-primary'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Works Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorks.map((work, index) => (
            <motion.div
              key={work._id || work.id}
              className="premium-card rounded-2xl overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              {/* Image */}
              <div 
                className="aspect-video relative overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredWork(work)}
                onMouseLeave={() => setHoveredWork(null)}
                onClick={() => {
                  console.log('Clicked work:', work);
                  setSelectedWork(work);
                }}
              >
                {(() => {
                  // Check if it's a YouTube URL and generate thumbnail
                  if (work.image && (work.image.includes('youtube.com') || work.image.includes('youtu.be'))) {
                    let videoId = '';
                    if (work.image.includes('watch?v=')) {
                      videoId = work.image.split('watch?v=')[1]?.split('&')[0];
                    } else if (work.image.includes('youtu.be/')) {
                      videoId = work.image.split('youtu.be/')[1]?.split('?')[0];
                    } else if (work.image.includes('/embed/')) {
                      videoId = work.image.split('/embed/')[1]?.split('?')[0];
                    }
                    
                    if (videoId) {
                      return (
                        <img
                          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                          alt={work.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                          onError={(e) => {
                            if (e.target.src.includes('maxresdefault')) {
                              e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                            } else if (!e.target.src.includes('sddefault')) {
                              e.target.src = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
                            } else {
                              e.target.src = `https://via.placeholder.com/800x450/1f2937/ffffff?text=${encodeURIComponent(work.title)}`;
                            }
                          }}
                        />
                      );
                    }
                  }
                  
                  // Use custom thumbnail if provided, otherwise use image
                  const thumbnailSrc = work.thumbnail || work.image;
                  return (
                    <img 
                      src={thumbnailSrc} 
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/800x450/1f2937/ffffff?text=${encodeURIComponent(work.title)}`;
                      }}
                    />
                  );
                })()}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-2 mx-auto">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-white text-sm font-medium">Click to view</p>
                  </div>
                </div>
                

                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-blue-500/80 backdrop-blur-sm rounded-full text-white text-sm font-medium capitalize">
                  {work.category}
                </div>
                
                {/* Stats Badge */}
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full text-blue-400 text-sm font-medium">
                  {work.stats}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {work.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {work.description}
                </p>
                <div className="text-xs text-gray-500">
                  {new Date(work.date).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredWorks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No works found in this category.</p>
          </div>
        )}
      </div>
      
      {/* Work Modal */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedWork(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl bg-gray-900 rounded-lg overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedWork(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="aspect-video relative bg-gray-800">
                {(() => {
                  // Check if it's a YouTube URL
                  if (selectedWork.image && (selectedWork.image.includes('youtube.com') || selectedWork.image.includes('youtu.be'))) {
                    let videoId = '';
                    if (selectedWork.image.includes('watch?v=')) {
                      videoId = selectedWork.image.split('watch?v=')[1]?.split('&')[0];
                    } else if (selectedWork.image.includes('youtu.be/')) {
                      videoId = selectedWork.image.split('youtu.be/')[1]?.split('?')[0];
                    }
                    
                    if (videoId) {
                      return (
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      );
                    }
                  }
                  
                  // Check if it's a Google Drive URL
                  if (selectedWork.image && selectedWork.image.includes('drive.google.com') && selectedWork.image.includes('/d/')) {
                    const fileId = selectedWork.image.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
                    if (fileId) {
                      return (
                        <iframe
                          src={`https://drive.google.com/file/d/${fileId}/preview`}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="autoplay"
                        />
                      );
                    }
                  }
                  
                  // Check if it's a direct video file
                  if (selectedWork.image && (selectedWork.image.includes('.mp4') || selectedWork.image.includes('.mov') || selectedWork.image.includes('.avi'))) {
                    return (
                      <video
                        src={selectedWork.image}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                      />
                    );
                  }
                  
                  // Default to image
                  return (
                    <img
                      src={selectedWork.image}
                      alt={selectedWork.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/800x450/1f2937/ffffff?text=${encodeURIComponent(selectedWork.title)}`;
                      }}
                    />
                  );
                })()
                }
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-500 rounded-full text-white text-sm font-medium capitalize">
                    {selectedWork.category}
                  </span>
                  <span className="text-blue-400 font-medium">{selectedWork.stats}</span>
                </div>
                <h3 className="text-white text-2xl font-semibold mb-3">{selectedWork.title}</h3>
                <p className="text-gray-300 leading-relaxed mb-4">{selectedWork.description}</p>
                <div className="text-sm text-gray-500">
                  {new Date(selectedWork.date).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OtherWorkPage;