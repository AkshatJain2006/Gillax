const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const https = require('https');

// Helper to test a URL via HEAD request
const urlExists = (url) => {
  return new Promise((resolve) => {
    try {
      const req = https.request(url, { method: 'HEAD' }, (res) => {
        resolve(res.statusCode === 200);
      });
      req.on('error', () => resolve(false));
      req.end();
    } catch (err) {
      resolve(false);
    }
  });
};

// Extract video id from various YouTube URL formats (supports shorts)
const extractYouTubeId = (url) => {
  if (!url) return null;
  let id = null;
  if (url.includes('/shorts/')) id = url.split('/shorts/')[1]?.split('?')[0]?.split('#')[0];
  else if (url.includes('watch?v=')) id = url.split('watch?v=')[1]?.split('&')[0]?.split('#')[0];
  else if (url.includes('youtu.be/')) id = url.split('youtu.be/')[1]?.split('?')[0]?.split('#')[0];
  else if (url.includes('/embed/')) id = url.split('/embed/')[1]?.split('?')[0]?.split('#')[0];
  if (id && /^[a-zA-Z0-9_-]{10,11}$/.test(id)) return id;
  return null;
};

const getYouTubeFallbacks = (id) => {
  return [
    `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${id}/sddefault.jpg`,
    `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
    `https://img.youtube.com/vi/${id}/default.jpg`
  ];
};

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    // Augment response with a computedThumbnail when thumbnail not provided
    const projectsWithThumbnails = await Promise.all(projects.map(async (p) => {
      const proj = p.toObject();
      if (!proj.thumbnail && proj.youtubeLink && (proj.youtubeLink.includes('youtube.com') || proj.youtubeLink.includes('youtu.be') || proj.youtubeLink.includes('/embed/') || proj.youtubeLink.includes('/shorts/'))) {
        const id = extractYouTubeId(proj.youtubeLink);
        if (id) {
          const fallbacks = getYouTubeFallbacks(id);
          for (const url of fallbacks) {
            // Check if URL exists
            // Prefer the first that returns HTTP 200
            // Note: network HEAD requests can add latency; it's acceptable for most APIs
            // Alternatively, we could cache results in DB when creating/updating projects
            // but here we return computedThumbnail on the fly.
            // eslint-disable-next-line no-await-in-loop
            const ok = await urlExists(url);
            if (ok) {
              proj.computedThumbnail = url;
              break;
            }
          }
        }
      }
      return proj;
    }));

    res.json(projectsWithThumbnails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new project
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update project
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;