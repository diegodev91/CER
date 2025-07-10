const express = require('express');
const { body, validationResult } = require('express-validator');
const News = require('../models/News');
const Comment = require('../models/Comment');

const router = express.Router();

// Get all published news
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    const whereClause = { isPublished: true };
    if (category) {
      whereClause.category = category;
    }

    const news = await News.findAndCountAll({
      where: whereClause,
      order: [['publishedAt', 'DESC'], ['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: offset
    });

    res.json({
      news: news.rows,
      totalCount: news.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(news.count / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single news by ID
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findOne({
      where: { 
        id: req.params.id,
        isPublished: true 
      }
    });

    if (!news) {
      return res.status(404).json({ error: 'News article not found' });
    }

    // Increment view count
    await news.increment('viewCount');

    // Get approved comments for this news
    const comments = await Comment.findAll({
      where: { 
        contentType: 'news',
        contentId: news.id,
        isApproved: true
      },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      news,
      comments
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get news by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const news = await News.findOne({
      where: { 
        slug: req.params.slug,
        isPublished: true 
      }
    });

    if (!news) {
      return res.status(404).json({ error: 'News article not found' });
    }

    // Increment view count
    await news.increment('viewCount');

    // Get approved comments for this news
    const comments = await Comment.findAll({
      where: { 
        contentType: 'news',
        contentId: news.id,
        isApproved: true
      },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      news,
      comments
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get news categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = [
      { value: 'general', label: 'General' },
      { value: 'behind-scenes', label: 'Behind the Scenes' },
      { value: 'cast', label: 'Cast' },
      { value: 'announcements', label: 'Announcements' }
    ];

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
