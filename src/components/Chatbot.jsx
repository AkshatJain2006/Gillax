import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hey there! 👋 Welcome to GillaX! We make visuals move. Whether you need video editing, motion graphics, 3D animation, or stunning designs - our team's got you covered! What brings you here today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    "What services do you offer?",
    "Show me your work", 
    "Pricing information",
    "How can I contact you?"
  ];

  const handleQuickReply = (reply) => {
    handleSendMessage(reply);
  };

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('service') || msg.includes('what do you do')) {
      return "We specialize in:\n• Video Editing (Reels, Long-form content)\n• Motion Graphics & Explainers\n• 3D Animation\n• Graphic Design\n• Thumbnail Design\n• Gaming & Education video editing\n\nWhich one interests you most?";
    }
    
    if (msg.includes('price') || msg.includes('cost') || msg.includes('budget')) {
      return "Our packages start from:\n🎬 Reels & Shorts: Rs.1200\n🧠 Long Format: Rs.4000\n⚡ Motion Graphics: Rs.5000\n🎯 3D Animation: Rs.5000\n\nWant a custom quote? Just tell us about your project!";
    }
    
    if (msg.includes('portfolio') || msg.includes('work') || msg.includes('sample')) {
      return "Check out our work on YouTube: https://youtube.com/@GillaXStudio\n\nWe've worked with gaming channels, educational creators, tech reviewers, and lifestyle brands. Want to see something specific?";
    }
    
    if (msg.includes('contact') || msg.includes('reach') || msg.includes('get in touch')) {
      return "Let's connect! 🚀\n📧 contact@gillax.com\n📱 +91-XXXXXXXXXX\n🌐 https://gillax.com/contact\n\nOr fill out our contact form and we'll get back to you within 24 hours!";
    }
    
    if (msg.includes('gaming') || msg.includes('smooth edit')) {
      return "Gaming edits are our specialty! 🎮 We create smooth, on-beat montages with:\n• Perfect sync with music\n• Dynamic transitions\n• Color grading for that cinematic look\n• Custom effects and overlays\n\nReady to make your gameplay look epic?";
    }
    
    return "That's a great question! Our team specializes in making visuals that truly move people. Whether it's a quick reel or a full production, we've got the skills to bring your vision to life. Want to tell us more about your project?";
  };

  const handleSendMessage = (message = inputValue) => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', text: message }]);
    setInputValue('');
    
    setTimeout(() => {
      const botResponse = getBotResponse(message);
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg z-50 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        <span className="text-white text-2xl">{isOpen ? '×' : '💬'}</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-96 h-96 bg-black/90 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl z-40 flex flex-col"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">G</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">GillaX Studio</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 text-xs">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`max-w-xs p-3 rounded-2xl ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                      : 'bg-white/10 text-white'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="p-2 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <motion.button
                      key={index}
                      className="px-3 py-1 bg-white/10 text-white text-xs rounded-full hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleQuickReply(reply)}
                    >
                      {reply}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                />
                <motion.button
                  onClick={() => handleSendMessage()}
                  className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-white">→</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;