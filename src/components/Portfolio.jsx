import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApiService from '../services/api';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
                <div className="aspect-video relative overflow-hidden bg-gray-800 cursor-pointer" onClick={() => window.open(project.youtubeLink, '_blank')}>
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
                      const videoId = project.youtubeLink.split('v=')[1]?.split('&')[0] || project.youtubeLink.split('/').pop();
                      return (
                        <img
                          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          onError={(e) => {
                            e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                          }}
                        />
                      );
                    }
                    // Check if it's a Google Drive URL
                    else if (project.youtubeLink.includes('drive.google.com')) {
                      const fileId = project.youtubeLink.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1] || project.youtubeLink.match(/[?&]id=([a-zA-Z0-9-_]+)/)?.[1];
                      if (fileId) {
                        return (
                          <img
                            src={`https://lh3.googleusercontent.com/d/${fileId}=w800-h450-no`}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            onError={(e) => {
                              e.target.src = `https://drive.google.com/uc?export=view&id=${fileId}`;
                            }}
                          />
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
    </section>
  );
};

export default Portfolio;