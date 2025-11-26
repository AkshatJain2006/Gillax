require('dotenv').config();
const mongoose = require('mongoose');
const https = require('https');
const Project = require('../models/Project');

// Usage:
// MONGO_URI="your_mongo_uri" node generate-thumbnails.js
// or create a .env file with MONGO_URI and run: node generate-thumbnails.js
// Add --no-check to skip HTTP HEAD checks and just set hqdefault URL.

const MONGO_URI = process.env.MONGO_URI || process.env.REACT_APP_API_URL || process.env.DATABASE_URL;
const noCheck = process.argv.includes('--no-check');

if (!MONGO_URI) {
  console.error('Missing Mongo DB URI. Set MONGO_URI in env or .env file.');
  process.exit(1);
}

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

const getFallbacks = (id) => [
  `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
  `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
  `https://img.youtube.com/vi/${id}/sddefault.jpg`,
  `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
  `https://img.youtube.com/vi/${id}/default.jpg`
];

const urlExists = (url) => new Promise((resolve) => {
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

async function main() {
  console.log('Connecting to DB...');
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected');

  const projects = await Project.find();
  console.log(`Found ${projects.length} projects`);

  for (const p of projects) {
    try {
      const proj = p.toObject();
      if (proj.thumbnail) {
        console.log(`[SKIP] ${proj._id} already has thumbnail`);
        continue;
      }

      const link = proj.youtubeLink || proj.image || '';
      const id = extractYouTubeId(link);
      if (!id) {
        console.warn(`[NOID] ${proj._id} no extractable YouTube ID for link: ${link}`);
        continue;
      }

      const fallbacks = getFallbacks(id);

      let chosen = null;
      if (noCheck) {
        chosen = fallbacks[0];
      } else {
        for (const url of fallbacks) {
          // eslint-disable-next-line no-await-in-loop
          const ok = await urlExists(url);
          if (ok) { chosen = url; break; }
        }
      }

      if (!chosen) {
        console.warn(`[MISS] ${proj._id} no available thumbnail for id ${id}, setting hqfallback`);
        chosen = fallbacks[0];
      }

      // Update project thumbnail field
      await Project.findByIdAndUpdate(p._id, { $set: { thumbnail: chosen } });
      console.log(`[UPDATE] ${proj._id} -> ${chosen}`);
    } catch (err) {
      console.error('Error processing project', p._id, err.message);
    }
  }

  console.log('Done. Disconnecting.');
  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error('Fatal error', err);
  process.exit(1);
});
