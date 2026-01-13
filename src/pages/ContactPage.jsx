import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ApiService from '../services/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      await ApiService.createContact(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Quick contact buttons
  const quickActions = [
    { 
      label: 'WhatsApp', 
      action: () => window.open('https://wa.me/919646028153?text=Hi! I\'m interested in your video editing services.', '_blank'),
      icon: '💬',
      gradient: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      shadow: 'shadow-green-500/25'
    },
    { 
      label: 'Email', 
      action: () => window.open('mailto:gillaxediting@gmail.com?subject=Video Editing Inquiry', '_blank'),
      icon: '📧',
      gradient: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      shadow: 'shadow-blue-500/25'
    },
    { 
      label: 'Instagram', 
      action: () => window.open('https://www.instagram.com/gilla_edit/reels/', '_blank'),
      icon: '📸',
      gradient: 'from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700',
      shadow: 'shadow-pink-500/25'
    }
  ];

  return (
    <div className="py-20 px-8 bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent premium-font"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Let's Create Together
        </motion.h2>
        
        <motion.p 
          className="text-center text-gray-400 mb-8 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Ready to bring your vision to life? Get in touch with us today.
        </motion.p>
        
        {/* Quick Contact Actions */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {quickActions.map((action, index) => (
            <motion.button
              key={action.label}
              onClick={action.action}
              className={`bg-gradient-to-r ${action.gradient} ${action.shadow} shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 rounded-full text-white font-semibold flex items-center space-x-3 backdrop-blur-sm border border-white/10 hover:border-white/20 transform hover:-translate-y-1`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <span className="text-xl">{action.icon}</span>
              <span className="text-base">{action.label}</span>
            </motion.button>
          ))}
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-white">Get in Touch</h3>
            <div className="space-y-6">
              {[
                { label: 'Email', value: 'gillaxediting@gmail.com' },
                { label: 'Instagram', value: 'Gilla_x' },
                { label: 'Website', value: 'https://gillax.onrender.com/' },
                { label: 'YouTube', value: '@Gilla_x' }
              ].map((item, i) => (
                <div 
                  key={item.label}
                  className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">{item.label}</div>
                    <div className="text-white font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h4 className="text-blue-400 font-semibold mb-2">Quick Response</h4>
              <p className="text-gray-300 text-sm">We typically respond within 2-4 hours during business hours.</p>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-white">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✅ Message sent successfully! We'll get back to you soon.
                </motion.div>
              )}
              
              {submitStatus === 'error' && (
                <motion.div
                  className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ❌ Failed to send message. Please try again or use WhatsApp.
                </motion.div>
              )}
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Email *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    required
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Phone (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Project Type *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    required
                  >
                    <option value="">Select Project Type</option>
                    <option value="Reels & Shorts">Reels & Shorts</option>
                    <option value="Long Format Video">Long Format Video</option>
                    <option value="Motion Graphics">Motion Graphics</option>
                    <option value="3D Animation">3D Animation</option>
                    <option value="Gaming Edit">Gaming Edit</option>
                    <option value="Educational Content">Educational Content</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2 font-medium">Project Details *</label>
                <textarea
                  name="message"
                  placeholder="Tell us about your project:\n• What type of content?\n• Timeline/deadline?\n• Budget range?\n• Any specific requirements?"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none transition-all"
                  required
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-lg text-white font-semibold relative overflow-hidden transition-all ${
                  isSubmitting 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800'
                }`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span>📤</span>
                    </>
                  )}
                </span>
              </motion.button>
              
              <p className="text-center text-gray-500 text-sm">
                Or reach us instantly via WhatsApp for faster response! 🚀
              </p>
            </form>
          </motion.div>
        </div>
        
        {/* Additional Info */}
        <motion.div
          className="mt-12 text-center bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <div className="w-6 h-6 bg-blue-400 rounded-sm"></div>
              </div>
              <h4 className="text-white font-semibold mb-1">Fast Turnaround</h4>
              <p className="text-gray-400 text-sm">Quick delivery without compromising quality</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <div className="w-6 h-6 bg-green-400 rounded-full"></div>
              </div>
              <h4 className="text-white font-semibold mb-1">Custom Solutions</h4>
              <p className="text-gray-400 text-sm">Tailored editing to match your vision</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <div className="w-6 h-6 bg-purple-400 rounded-lg transform rotate-45"></div>
              </div>
              <h4 className="text-white font-semibold mb-1">Premium Quality</h4>
              <p className="text-gray-400 text-sm">Professional-grade editing and effects</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;