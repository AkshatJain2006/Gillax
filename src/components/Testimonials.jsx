import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const [showAll, setShowAll] = useState(false);
  
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Gaming Content Creator",
      content: "GillaX transformed my gaming videos completely. The editing quality is exceptional and delivery is always on time. My Minecraft series went viral thanks to their smooth editing!",
      rating: 5,
      avatar: "AJ",
      platform: "YouTube",
      comment: "Best editor I've worked with. Period."
    },
    {
      name: "Sarah Chen",
      role: "Educational YouTuber",
      content: "Professional service with amazing attention to detail. My subscriber count doubled after working with GillaX. They understand educational content perfectly.",
      rating: 5,
      avatar: "SC",
      platform: "YouTube",
      comment: "They made learning fun through visuals!"
    },
    {
      name: "Mike Rodriguez",
      role: "Tech Reviewer",
      content: "The motion graphics and transitions are top-notch. Highly recommend for anyone serious about video content. My tech reviews look so professional now.",
      rating: 5,
      avatar: "MR",
      platform: "Twitch",
      comment: "Incredible attention to detail in every frame."
    },
    {
      name: "Emma Wilson",
      role: "Brand Manager",
      content: "Outstanding work on our promotional videos. GillaX delivered exactly what we envisioned and more. Our brand engagement increased by 250%.",
      rating: 5,
      avatar: "EW",
      platform: "LinkedIn",
      comment: "They brought our brand vision to life perfectly."
    },
    {
      name: "David Kim",
      role: "Indie Game Developer",
      content: "The 3D animations for our game trailer were incredible. Professional quality at reasonable prices. Our Steam wishlist exploded after the trailer release!",
      rating: 5,
      avatar: "DK",
      platform: "Steam",
      comment: "Made our indie game look AAA quality."
    },
    {
      name: "Lisa Thompson",
      role: "Fitness Influencer",
      content: "Amazing thumbnail designs that increased my click-through rate by 300%. Highly recommended! My fitness content never looked better.",
      rating: 5,
      avatar: "LT",
      platform: "Instagram",
      comment: "Thumbnails that actually get clicks!"
    },
    {
      name: "Ryan Parker",
      role: "Minecraft YouTuber",
      content: "GillaX made my Minecraft builds look absolutely stunning with their cinematic camera work and smooth transitions. My building tutorials are now the most watched on my channel!",
      rating: 5,
      avatar: "RP",
      platform: "YouTube",
      comment: "They understand Minecraft content like no other!"
    },
    {
      name: "Jessica Martinez",
      role: "Lifestyle Blogger",
      content: "The aesthetic they created for my vlogs is exactly what I wanted. Clean, modern, and engaging. My audience retention went up by 40%!",
      rating: 5,
      avatar: "JM",
      platform: "TikTok",
      comment: "Perfect aesthetic for lifestyle content."
    },
    {
      name: "Tom Anderson",
      role: "Music Producer",
      content: "Their music video editing is phenomenal. The sync with beats, color grading, and effects made my tracks stand out. Got featured on Spotify playlists!",
      rating: 5,
      avatar: "TA",
      platform: "Spotify",
      comment: "Music videos that match the vibe perfectly."
    }
  ];

  return (
    <div className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2 
          className="text-4xl font-bold text-center mb-20 bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent premium-font drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Our Happy Clients
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(showAll ? testimonials : testimonials.slice(0, 6)).map((testimonial, index) => (
            <motion.div
              key={index}
              className="premium-card rounded-2xl p-6 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.02, y: -3 }}
            >
              {/* Quote Icon */}
              <div className="text-primary text-4xl mb-4 gold-accent bg-clip-text text-transparent">"</div>
              <div className="absolute top-4 right-4 w-8 h-8 gold-accent opacity-20 rounded-full blur-sm"></div>
              
              {/* Content */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                {testimonial.content}
              </p>

              {/* Rating */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <div className="text-xs text-blue-400 font-medium">{testimonial.platform}</div>
              </div>
              

            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        {!showAll && testimonials.length > 6 && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
            >
              View More Reviews ({testimonials.length - 6} more)
            </button>
          </motion.div>
        )}
        
        {showAll && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              onClick={() => setShowAll(false)}
              className="px-6 py-3 bg-gray-500/20 border border-gray-500/30 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-colors"
            >
              Show Less
            </button>
          </motion.div>
        )}

        {/* Trust Badge */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="inline-flex items-center space-x-2 text-gray-400">
            <span className="text-green-500">✓</span>
            <span>100% Client Satisfaction Rate</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;