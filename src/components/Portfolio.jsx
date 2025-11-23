import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApiService from '../services/api';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await ApiService.getProjects();
        console.log('Loaded projects:', data);
        setProjects(data);
      } catch (error) {
        console.error('Failed to load projects:', error);
        // Fallback to default projects if API fails
        setProjects([
          {
            _id: 1,
            title: "Gaming Montage",
            category: "gaming",
            youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            _id: 2,
            title: "Educational Explainer",
            category: "education",
            youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    loadProjects();
  }, []);

  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'education', name: 'Education' },
    { id: 'motion', name: 'Motion Graphics' },
    { id: '3d', name: '3D Animation' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="portfolio" className="py-20 px-8 bg-black min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2 
          className="text-4xl font-bold text-center mb-20 bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent premium-font drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          Our Portfolio
        </motion.h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
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
        
        {loading ? (
          <div className="text-center text-white">Loading projects...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center text-white">No projects found. Add some videos in the admin panel!</div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
            {Array.isArray(filteredProjects) && filteredProjects.map((project, index) => (
              <motion.div 
                key={project._id} 
                className="premium-card rounded-2xl overflow-hidden group w-full max-w-md mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5
                }}
              >
                <div className="aspect-video relative overflow-hidden bg-gray-800 cursor-pointer" onClick={() => setSelectedVideo(project)}>
                  {(() => {
                    // Use custom thumbnail if provided
                    if (project.thumbnail) {
                      return (
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/800x450/1f2937/ffffff?text=${encodeURIComponent(project.title)}`;
                          }}
                        />
                      );
                    }
                    // Check if it's a YouTube URL
                    else if (project.youtubeLink.includes('youtube.com') || project.youtubeLink.includes('youtu.be')) {
                      let videoId = '';
                      
                      // Extract video ID from different YouTube URL formats
                      if (project.youtubeLink.includes('watch?v=')) {
                        videoId = project.youtubeLink.split('watch?v=')[1]?.split('&')[0];
                      } else if (project.youtubeLink.includes('youtu.be/')) {
                        videoId = project.youtubeLink.split('youtu.be/')[1]?.split('?')[0];
                      } else if (project.youtubeLink.includes('/embed/')) {
                        videoId = project.youtubeLink.split('/embed/')[1]?.split('?')[0];
                      } else if (project.youtubeLink.includes('/v/')) {
                        videoId = project.youtubeLink.split('/v/')[1]?.split('?')[0];
                      }
                      
                      if (videoId) {
                        return (
                          <img
                            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            onError={(e) => {
                              if (e.target.src.includes('maxresdefault')) {
                                e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                              } else {
                                e.target.src = `https://via.placeholder.com/800x450/1f2937/ffffff?text=${encodeURIComponent(project.title)}`;
                              }
                            }}
                          />
                        );
                      }
                    }
                    // Check if it's a Google Drive URL
                    else if (project.youtubeLink.includes('drive.google.com')) {
                      const fileId = project.youtubeLink.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1] || project.youtubeLink.match(/[?&]id=([a-zA-Z0-9-_]+)/)?.[1];
                      if (fileId) {
                        return (
                          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center relative">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                                <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                              <h3 className="text-white font-medium text-lg mb-1">{project.title}</h3>
                              <p className="text-gray-400 text-sm">Click to play video</p>
                            </div>
                            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                              Google Drive
                            </div>
                          </div>
                        );
                      }
                    }
                    // For direct image/video URLs or other platforms
                    else {
                      return (
                        <img
                          src={project.youtubeLink}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/800x450/1f2937/ffffff?text=${encodeURIComponent(project.title)}`;
                          }}
                        />
                      );
                    }
                  })()
                  }
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-light italic text-white group-hover:text-primary transition-colors">{project.title}</h3>
                </div>
              </motion.div>
            )) || <div className="text-white text-center">No projects available</div>}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      
      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {(() => {
                // YouTube videos
                if (selectedVideo.youtubeLink.includes('youtube.com') || selectedVideo.youtubeLink.includes('youtu.be')) {
                  let videoId = '';
                  if (selectedVideo.youtubeLink.includes('watch?v=')) {
                    videoId = selectedVideo.youtubeLink.split('watch?v=')[1]?.split('&')[0];
                  } else if (selectedVideo.youtubeLink.includes('youtu.be/')) {
                    videoId = selectedVideo.youtubeLink.split('youtu.be/')[1]?.split('?')[0];
                  } else if (selectedVideo.youtubeLink.includes('/embed/')) {
                    videoId = selectedVideo.youtubeLink.split('/embed/')[1]?.split('?')[0];
                  }
                  
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
                // Google Drive videos
                else if (selectedVideo.youtubeLink.includes('drive.google.com')) {
                  const fileId = selectedVideo.youtubeLink.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1] || selectedVideo.youtubeLink.match(/[?&]id=([a-zA-Z0-9-_]+)/)?.[1];
                  return (
                    <iframe
                      src={`https://drive.google.com/file/d/${fileId}/preview`}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="autoplay"
                    />
                  );
                }
                // Direct video files
                else {
                  return (
                    <video
                      src={selectedVideo.youtubeLink}
                      className="w-full h-full"
                      controls
                      autoPlay
                    />
                  );
                }
              })()
              }
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-xl font-semibold mb-2">{selectedVideo.title}</h3>
                <p className="text-gray-300 text-sm">{selectedVideo.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;