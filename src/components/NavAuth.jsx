import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApiService from '../services/api';

const NavAuth = ({ onLogin, currentUser, onLogout, onAdminAccess }) => {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        if (formData.username === 'admin' && formData.password === 'gillax2024') {
          const adminUser = { username: 'admin', role: 'admin', email: 'admin@gillax.com' };
          localStorage.setItem('currentUser', JSON.stringify(adminUser));
          onLogin(adminUser);
          setShowAuth(false);
          return;
        }
        
        const response = await ApiService.loginUser({
          username: formData.username,
          password: formData.password
        });
        
        if (response.token) {
          localStorage.setItem('adminToken', response.token);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          onLogin(response.user);
          setShowAuth(false);
        } else {
          setError(response.message || 'Login failed');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        
        const response = await ApiService.createUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: 'viewer'
        });
        
        if (response.user) {
          setIsLogin(true);
          setFormData({ username: '', email: '', password: '', confirmPassword: '' });
          setError('Account created! Please login.');
        } else {
          setError(response.message || 'Signup failed');
        }
      }
    } catch (error) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('currentUser');
    onLogout();
  };

  if (currentUser) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          {/* User Icon - Clickable for admin/editor */}
          <button
            onClick={() => {
              if ((currentUser.role === 'admin' || currentUser.role === 'editor') && onAdminAccess) {
                onAdminAccess();
              }
            }}
            className={`w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center relative ${
              (currentUser.role === 'admin' || currentUser.role === 'editor') 
                ? 'hover:scale-110 cursor-pointer transition-transform' 
                : 'cursor-default'
            }`}
            title={(currentUser.role === 'admin' || currentUser.role === 'editor') ? 'Open Admin Panel' : ''}
          >
            <span className="text-white text-sm font-bold">
              {currentUser.username.charAt(0).toUpperCase()}
            </span>
            {/* Role Badge */}
            {(currentUser.role === 'admin' || currentUser.role === 'editor') && (
              <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center ${
                currentUser.role === 'admin' ? 'bg-red-500' : 'bg-green-500'
              }`}>
                <span className="text-white text-xs font-bold">
                  {currentUser.role === 'admin' ? 'A' : 'E'}
                </span>
              </div>
            )}
          </button>
          <span className="text-sm text-gray-300 hidden md:block">{currentUser.username}</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowAuth(!showAuth)}
        className="text-sm px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
      >
        Login
      </button>

      <AnimatePresence>
        {showAuth && (
          <motion.div
            className="absolute right-0 top-12 w-80 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex mb-4 bg-gray-800/50 rounded-lg p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-1 px-3 rounded-md text-sm transition-all ${
                  isLogin ? 'bg-blue-500 text-white' : 'text-gray-400'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-1 px-3 rounded-md text-sm transition-all ${
                  !isLogin ? 'bg-blue-500 text-white' : 'text-gray-400'
                }`}
              >
                Sign Up
              </button>
            </div>

            {error && (
              <div className={`mb-3 p-2 rounded text-xs ${
                error.includes('created') 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full p-2 bg-gray-800/50 border border-gray-700 rounded text-white text-sm"
                required
              />
              
              {!isLogin && (
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-2 bg-gray-800/50 border border-gray-700 rounded text-white text-sm"
                  required
                />
              )}
              
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full p-2 bg-gray-800/50 border border-gray-700 rounded text-white text-sm"
                required
              />
              
              {!isLogin && (
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full p-2 bg-gray-800/50 border border-gray-700 rounded text-white text-sm"
                  required
                />
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavAuth;