const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gillax', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Models
const Review = require('./models/Review');
const Project = require('./models/Project');
const Work = require('./models/Work');

// Routes
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/works', require('./routes/works'));
const { router: authRouter } = require('./routes/auth');
app.use('/api/auth', authRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'GillaX Backend is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});