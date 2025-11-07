import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! I can help you with pricing information. What type of video editing do you need?' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const pricingInfo = {
    'reels': '$120 - Short form content (up to 60 seconds)',
    'shorts': '$120 - Short form content (up to 60 seconds)', 
    'long': '$350 - Long format videos (10-15 minutes)',
    'youtube': '$350 - Long format videos (10-15 minutes)',
    'motion': '$400 - Motion graphics and animations',
    'graphics': '$400 - Motion graphics and animations',
    '3d': '$500 - 3D animations and modeling',
    'animation': '$500 - 3D animations and modeling'
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const userMessage = { type: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    
    // Simple keyword matching for pricing
    const lowerInput = inputValue.toLowerCase();
    let botResponse = "I can help with pricing for:\n• Reels/Shorts: $120\n• Long format: $350\n• Motion graphics: $400\n• 3D animation: $500\n\nWhat specific service interests you?";
    
    for (const [key, price] of Object.entries(pricingInfo)) {
      if (lowerInput.includes(key)) {
        botResponse = `${price}\n\nWould you like to know about any other services?`;
        break;
      }
    }
    
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 500);
    
    setInputValue('');
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? '×' : '💬'}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-white font-semibold">Pricing Assistant</h3>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg text-sm ${
                      message.type === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    {message.text.split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about pricing..."
                  className="flex-1 p-2 bg-gray-700 text-white rounded text-sm"
                />
                <button
                  onClick={handleSend}
                  className="px-4 py-2 bg-primary text-white rounded text-sm hover:bg-secondary"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;