const express = require('express');
const { body, validationResult } = require('express-validator');
const Episode = require('../models/Episode');
const Comment = require('../models/Comment');

const router = express.Router();

// Get all published episodes
router.get('/', async (req, res) => {
  try {
    const { season, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    const whereClause = { isPublished: true };
    if (season) {
      whereClause.season = season;
    }

    const episodes = await Episode.findAndCountAll({
      where: whereClause,
      order: [['season', 'DESC'], ['episodeNumber', 'DESC']],
      limit: parseInt(limit),
      offset: offset
    });

    // Ensure tags are properly parsed as arrays
    const processedEpisodes = episodes.rows.map(episode => {
      const episodeData = episode.toJSON();
      // Parse tags if they're a string
      if (typeof episodeData.tags === 'string') {
        try {
          episodeData.tags = JSON.parse(episodeData.tags);
        } catch (e) {
          episodeData.tags = [];
        }
      }
      // Ensure tags is always an array
      if (!Array.isArray(episodeData.tags)) {
        episodeData.tags = [];
      }
      return episodeData;
    });

    res.json({
      success: true,
      data: processedEpisodes,
      totalCount: episodes.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(episodes.count / limit)
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single episode by ID
router.get('/:id', async (req, res) => {
  try {
    const episode = await Episode.findOne({
      where: { 
        id: req.params.id,
        isPublished: true 
      }
    });

    if (!episode) {
      return res.status(404).json({ error: 'Episode not found' });
    }

    // Increment view count
    await episode.increment('viewCount');

    // Process episode data to ensure tags are arrays
    const episodeData = episode.toJSON();
    if (typeof episodeData.tags === 'string') {
      try {
        episodeData.tags = JSON.parse(episodeData.tags);
      } catch (e) {
        episodeData.tags = [];
      }
    }
    if (!Array.isArray(episodeData.tags)) {
      episodeData.tags = [];
    }

    // Get approved comments for this episode
    const comments = await Comment.findAll({
      where: { 
        contentType: 'episode',
        contentId: episode.id,
        isApproved: true
      },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      episode: episodeData,
      comments
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get seasons list
router.get('/seasons/list', async (req, res) => {
  try {
    const seasons = await Episode.findAll({
      attributes: ['season'],
      where: { isPublished: true },
      group: ['season'],
      order: [['season', 'DESC']]
    });

    res.json({
      success: true,
      data: seasons.map(s => ({ value: s.season, label: `Temporada ${s.season}` }))
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
