const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  stats: { type: String, required: true },
  image: { type: String, required: true },
  thumbnail: { type: String, default: null }
}, {
  timestamps: true
});

module.exports = mongoose.model('Work', workSchema);