const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  youtubeLink: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, default: null },
  featured: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);