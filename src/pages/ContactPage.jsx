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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ApiService.createContact(formData);
      alert('Thanks for reaching out! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="py-20 px-8 bg-black min-h-screen">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2 
          className="text-6xl font-bold text-center mb-20 bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent premium-font drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Let's Create Together
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h3 
              className="text-2xl font-light italic mb-6 text-white"
              whileHover={{ color: '#6C63FF', x: 10 }}
            >Get in Touch</motion.h3>
            <div className="space-y-4">
              {[
                { label: 'Email:', value: 'contact@gillax.com' },
                { label: 'Phone:', value: '+91-XXXXXXXXXX' },
                { label: 'Website:', value: 'https://gillax.com/contact' },
                { label: 'YouTube:', value: 'https://youtube.com/@GillaXStudio' }
              ].map((item, i) => (
                <motion.div 
                  key={item.label}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                >
                  <span className="text-primary font-light italic">{item.label}</span>
                  <span className="text-white">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.02 }}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 bg-black border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:outline-none transition-all"
                required
              />
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }}>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 bg-black border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:outline-none transition-all"
                required
              />
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }}>
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone (Optional)"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-4 bg-black border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:outline-none transition-all"
              />
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }}>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-4 bg-black border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:outline-none transition-all"
                required
              />
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }}>
              <textarea
                name="message"
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full p-4 bg-black border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:outline-none resize-none transition-all"
                required
              />
            </motion.div>
            
            <motion.button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-light italic relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 10px 30px rgba(108, 99, 255, 0.4)'
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">Send Message</span>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;