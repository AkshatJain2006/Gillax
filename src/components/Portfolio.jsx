import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApiService from '../services/api';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  
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
                <div 
                  className="aspect-video relative overflow-hidden bg-gray-800 cursor-pointer" 
                  onMouseEnter={() => setHoveredVideo(project)}
                  onMouseLeave={() => setHoveredVideo(null)}
                  onClick={() => setSelectedVideo(project)}
                >
                  {hoveredVideo && hoveredVideo._id === project._id ? (
                    // Show video preview on hover
                    (() => {
                      // Helper function to extract YouTube video ID
                      const extractYouTubeId = (url) => {
                        if (!url) return null;
                        let videoId = '';
                        if (url.includes('watch?v=')) {
                          videoId = url.split('watch?v=')[1]?.split('&')[0];
                        } else if (url.includes('youtu.be/')) {
                          videoId = url.split('youtu.be/')[1]?.split('?')[0];
                        } else if (url.includes('/embed/')) {
                          videoId = url.split('/embed/')[1]?.split('?')[0];
                        }
                        return videoId || null;
                      };

                      // YouTube videos
                      if (project.youtubeLink && (project.youtubeLink.includes('youtube.com') || project.youtubeLink.includes('youtu.be'))) {
                        const videoId = extractYouTubeId(project.youtubeLink);
                        
                        if (videoId) {
                          return (
                            <iframe
                              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}`}
                              className="w-full h-full"
                              frameBorder="0"
                              allow="autoplay; encrypted-media"
                            />
                          );
                        }
                      }
                      // Google Drive videos
                      else if (project.youtubeLink && project.youtubeLink.includes('drive.google.com')) {
                        const fileId = project.youtubeLink.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1] || project.youtubeLink.match(/[?&]id=([a-zA-Z0-9-_]+)/)?.[1];
                        return (
                          <video
                            src={`https://drive.google.com/uc?export=view&id=${fileId}`}
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                          />
                        );
                      }
                      // Direct video files
                      else {
                        return (
                          <video
                            src={project.youtubeLink}
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                          />
                        );
                      }
                    })()
                  ) : (
                    // Show thumbnail when not hovered
                    (() => {
                      // Helper function to extract YouTube video ID
                      const extractYouTubeId = (url) => {
                        if (!url) return null;
                        let videoId = '';
                        if (url.includes('watch?v=')) {
                          videoId = url.split('watch?v=')[1]?.split('&')[0];
                        } else if (url.includes('youtu.be/')) {
                          videoId = url.split('youtu.be/')[1]?.split('?')[0];
                        } else if (url.includes('/embed/')) {
                          videoId = url.split('/embed/')[1]?.split('?')[0];
                        }
                        return videoId || null;
                      };

                      // Use custom thumbnail if provided
                      if (project.thumbnail) {
                        console.log(`[${project.title}] Using custom thumbnail:`, project.thumbnail);
                        return (
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            onError={(e) => {
                              console.error(`[${project.title}] Custom thumbnail failed to load`);
                              e.target.src = `https://via.placeholder.com/800x450/1f2937/ffffff?text=${encodeURIComponent(project.title)}`;
                            }}
                          />
                        );
                      }
                      // Check if it's a YouTube URL
                      else if (project.youtubeLink && (project.youtubeLink.includes('youtube.com') || project.youtubeLink.includes('youtu.be'))) {
                        const videoId = extractYouTubeId(project.youtubeLink);
                        console.log(`[${project.title}] YouTube URL detected, extracted ID:`, videoId);
                        
                        if (videoId) {
                          const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                          console.log(`[${project.title}] Loading YouTube thumbnail:`, thumbnailUrl);
                          return (
                            <img
                              src={thumbnailUrl}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                              onError={(e) => {
                                console.warn(`[${project.title}] Thumbnail load failed, trying fallback...`);
                                if (e.target.src.includes('maxresdefault')) {
                                  const hdUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                                  console.log(`[${project.title}] Trying hqdefault:`, hdUrl);
                                  e.target.src = hdUrl;
                                } else if (!e.target.src.includes('sddefault')) {
                                  const sdUrl = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
                                  console.log(`[${project.title}] Trying sddefault:`, sdUrl);
                                  e.target.src = sdUrl;
                                } else {
                                  console.error(`[${project.title}] All YouTube thumbnails failed, using placeholder`);
                                  e.target.src = `https://via.placeholder.com/800x450/1f2937/ffffff?text=${encodeURIComponent(project.title)}`;
                                }
                              }}
                            />
                          );
                        }
                      }
                      // Google Drive placeholder
                      else if (project.youtubeLink.includes('drive.google.com')) {
                        return (
                          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center relative">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                                <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                              <h3 className="text-white font-medium text-lg mb-1">{project.title}</h3>
                              <p className="text-gray-400 text-sm">Hover to preview</p>
                            </div>
                          </div>
                        );
                      }
                      // Direct image/video URLs
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
                  )
                  }
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-2 mx-auto">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <p className="text-white text-sm font-medium">Click to expand</p>
                    </div>
                  </div>
                  
                  {/* Video preview indicator */}
                  {hoveredVideo && hoveredVideo._id === project._id && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span>LIVE PREVIEW</span>
                    </div>
                  )}
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
                // Helper function to extract YouTube video ID
                const extractYouTubeId = (url) => {
                  if (!url) return null;
                  let videoId = '';
                  if (url.includes('watch?v=')) {
                    videoId = url.split('watch?v=')[1]?.split('&')[0];
                  } else if (url.includes('youtu.be/')) {
                    videoId = url.split('youtu.be/')[1]?.split('?')[0];
                  } else if (url.includes('/embed/')) {
                    videoId = url.split('/embed/')[1]?.split('?')[0];
                  }
                  return videoId || null;
                };

                // YouTube videos
                if (selectedVideo.youtubeLink && (selectedVideo.youtubeLink.includes('youtube.com') || selectedVideo.youtubeLink.includes('youtu.be'))) {
                  const videoId = extractYouTubeId(selectedVideo.youtubeLink);
                  
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