const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gillax')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Models
const Review = require('./models/Review');
const Project = require('./models/Project');
const Work = require('./models/Work');
const Contact = require('./models/Contact');
const User = require('./models/User');

// Routes
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/works', require('./routes/works'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/users', require('./routes/users'));
const { router: authRouter } = require('./routes/auth');
app.use('/api/auth', authRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'GillaX Backend is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});