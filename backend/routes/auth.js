const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Simple admin login
router.post('/login', async (req, res) => {
  try {
    const { password } = req.body;
    
    // Check password (in production, use hashed passwords)
    if (password === 'gillax2024') {
      const token = jwt.sign(
        { admin: true },
        process.env.JWT_SECRET || 'gillax-secret',
        { expiresIn: '24h' }
      );
      
      res.json({ token, message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify token middleware
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }
  
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'gillax-secret');
    req.admin = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = { router, verifyToken };