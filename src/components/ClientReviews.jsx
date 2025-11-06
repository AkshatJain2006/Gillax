import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ClientReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Load existing reviews from localStorage
    const savedReviews = localStorage.getItem('clientReviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      // Set default reviews if none exist
      const defaultReviews = [
        {
          id: 1,
          name: "Alex Johnson",
          role: "Gaming Content Creator",
          review: "GillaX completely transformed my channel. Their editing style is exactly what modern gaming content needs - fast, smooth, and engaging.",
          rating: 5,
          platform: "YouTube",
          avatar: "AJ"
        },
        {
          id: 2,
          name: "Sarah Chen", 
          role: "Educational YouTuber",
          review: "The way they handle educational content is amazing. Complex topics become visually appealing and easy to understand.",
          rating: 5,
          platform: "YouTube", 
          avatar: "SC"
        },
        {
          id: 3,
          name: "Mike Rodriguez",
          role: "Tech Reviewer", 
          review: "Professional quality that rivals big tech channels. My reviews now have that premium look that keeps viewers engaged.",
          rating: 5,
          platform: "Twitch",
          avatar: "MR"
        }
      ];
      setReviews(defaultReviews);
      localStorage.setItem('clientReviews', JSON.stringify(defaultReviews));
    }
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    role: '',
    review: '',
    rating: 5,
    platform: ''
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.review) {
      const avatar = newReview.name.split(' ').map(n => n[0]).join('').toUpperCase();
      const reviewWithId = { 
        ...newReview, 
        avatar, 
        id: Date.now(),
        date: new Date().toISOString()
      };
      const updatedReviews = [...reviews, reviewWithId];
      setReviews(updatedReviews);
      
      // Save to localStorage for admin access
      localStorage.setItem('clientReviews', JSON.stringify(updatedReviews));
      
      setNewReview({ name: '', role: '', review: '', rating: 5, platform: '' });
      setShowForm(false);
    }
  };

  return (
    <section className="py-20 px-8 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent premium-font"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Client Reviews
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-black/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02, borderColor: "rgba(59, 130, 246, 0.4)" }}
            >
              <div className="text-blue-400 text-6xl opacity-20 absolute top-4 right-4">"</div>
              
              <p className="text-gray-300 mb-6 relative z-10 italic">
                "{review.review}"
              </p>

              <div className="flex space-x-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{review.name}</div>
                    <div className="text-gray-400 text-xs">{review.role}</div>
                  </div>
                </div>
                <div className="text-xs text-blue-400 font-medium">{review.platform}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            onClick={() => setShowForm(!showForm)}
            className="group relative px-10 py-5 overflow-hidden rounded-2xl transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 20px 60px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
              initial={{ x: '-100%', skewX: -15 }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.8 }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
            <span className="relative z-10 text-white font-semibold text-lg tracking-wide">
              {showForm ? 'Cancel' : 'Add Your Review'}
            </span>
          </motion.button>
        </motion.div>

        {showForm && (
          <motion.div
            className="mt-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <form onSubmit={handleSubmitReview} className="bg-black/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Share Your Experience</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={newReview.name}
                  onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                  required
                />
                <input
                  type="text"
                  placeholder="Your Role/Title"
                  value={newReview.role}
                  onChange={(e) => setNewReview({...newReview, role: e.target.value})}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                />
              </div>
              
              <input
                type="text"
                placeholder="Platform (YouTube, Instagram, etc.)"
                value={newReview.platform}
                onChange={(e) => setNewReview({...newReview, platform: e.target.value})}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 mb-4"
              />
              
              <textarea
                placeholder="Write your review..."
                value={newReview.review}
                onChange={(e) => setNewReview({...newReview, review: e.target.value})}
                rows="4"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 mb-4"
                required
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-white">Rating:</span>
                  {[1,2,3,4,5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({...newReview, rating: star})}
                      className={`text-2xl ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                
                <motion.button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit Review
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ClientReviews;