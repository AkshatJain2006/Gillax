/**
 * Thumbnail utility functions
 * Handles extraction, generation, and fallback logic for video thumbnails
 */

/**
 * Extract YouTube video ID from various YouTube URL formats
 * @param {string} url - YouTube URL in any supported format
 * @returns {string|null} - Extracted video ID or null
 */
export const extractYouTubeId = (url) => {
  if (!url || typeof url !== 'string') {
    console.warn('[ThumbnailUtils] Invalid URL provided:', url);
    return null;
  }

  let videoId = '';

  // Handle standard watch URL format
    // Handle YouTube Shorts format (10 char IDs)
    if (url.includes('/shorts/')) {
      videoId = url.split('/shorts/')[1]?.split('?')[0]?.split('#')[0];
    }
    // Handle standard watch URL format
    else if (url.includes('watch?v=')) {
    videoId = url.split('watch?v=')[1]?.split('&')[0]?.split('#')[0];
  }
  // Handle shortened youtu.be format
  else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split('?')[0]?.split('#')[0];
  }
  // Handle embed format
  else if (url.includes('/embed/')) {
    videoId = url.split('/embed/')[1]?.split('?')[0]?.split('#')[0];
  }

  // Validate video ID (should be 11 characters alphanumeric, dash, underscore)
  // YouTube Shorts use 10 chars, regular videos use 11 chars
  if (videoId && /^[a-zA-Z0-9_-]{10,11}$/.test(videoId)) {
    console.log('[ThumbnailUtils] Successfully extracted video ID:', videoId);
    return videoId;
  }

  console.warn('[ThumbnailUtils] Failed to extract valid video ID from:', url);
  return null;
};

/**
 * Get YouTube thumbnail URL with quality level
 * @param {string} videoId - YouTube video ID
 * @param {string} quality - Quality level: 'maxres', 'hq', 'sd', 'mq', 'default'
 * @returns {string} - YouTube thumbnail URL
 */
export const getYouTubeThumbnailUrl = (videoId, quality = 'maxres') => {
  const qualityMap = {
    maxres: 'maxresdefault.jpg',
    hq: 'hqdefault.jpg',
    sd: 'sddefault.jpg',
    mq: 'mqdefault.jpg',
    default: 'default.jpg'
  };

  const filename = qualityMap[quality] || 'maxresdefault.jpg';
  const url = `https://img.youtube.com/vi/${videoId}/${filename}`;
  console.log(`[ThumbnailUtils] Generated thumbnail URL (${quality}):`, url);
  return url;
};

/**
 * Get all thumbnail URLs in fallback order
 * @param {string} videoId - YouTube video ID
 * @returns {string[]} - Array of thumbnail URLs in priority order
 */
export const getYouTubeThumbnailFallbacks = (videoId) => {
  return [
    getYouTubeThumbnailUrl(videoId, 'maxres'),
    getYouTubeThumbnailUrl(videoId, 'hq'),
    getYouTubeThumbnailUrl(videoId, 'sd'),
    getYouTubeThumbnailUrl(videoId, 'mq'),
    getYouTubeThumbnailUrl(videoId, 'default')
  ];
};

/**
 * Validate if URL is a YouTube URL
 * @param {string} url - URL to check
 * @returns {boolean} - True if URL is from YouTube
 */
export const isYouTubeUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  return url.includes('youtube.com') || url.includes('youtu.be');
};

/**
 * Validate if URL is a Google Drive URL
 * @param {string} url - URL to check
 * @returns {boolean} - True if URL is from Google Drive
 */
export const isGoogleDriveUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  return url.includes('drive.google.com');
};

/**
 * Create error handler for image loading
 * @param {string} videoId - YouTube video ID
 * @param {string} title - Video title for logging
 * @param {string[]} fallbacks - Array of fallback URLs
 * @param {number} currentIndex - Current fallback index
 * @returns {function} - Error handler function
 */
export const createImageErrorHandler = (videoId, title, fallbacks, currentIndex = 0) => {
  return (e) => {
    if (!e || !e.target) return;

    const nextIndex = currentIndex + 1;
    if (nextIndex < fallbacks.length) {
      console.warn(`[ThumbnailUtils] Thumbnail failed, trying fallback ${nextIndex}:`, fallbacks[nextIndex]);
      e.target.src = fallbacks[nextIndex];
      e.target.onerror = createImageErrorHandler(videoId, title, fallbacks, nextIndex);
    } else {
      console.error(`[ThumbnailUtils] All thumbnail fallbacks exhausted for "${title}"`);
      e.target.src = `https://via.placeholder.com/800x450/1f2937/ffffff?text=${encodeURIComponent(title)}`;
    }
  };
};

export default {
  extractYouTubeId,
  getYouTubeThumbnailUrl,
  getYouTubeThumbnailFallbacks,
  isYouTubeUrl,
  isGoogleDriveUrl,
  createImageErrorHandler
};
