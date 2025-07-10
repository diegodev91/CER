const express = require('express');
const Episode = require('../models/Episode');
const News = require('../models/News');
const Product = require('../models/Product');
const Comment = require('../models/Comment');

const router = express.Router();

// Dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const stats = await Promise.all([
      Episode.count(),
      Episode.count({ where: { isPublished: true } }),
      News.count(),
      News.count({ where: { isPublished: true } }),
      Product.count(),
      Product.count({ where: { isActive: true } }),
      Comment.count(),
      Comment.count({ where: { isApproved: false } })
    ]);

    res.json({
      totalEpisodes: stats[0],
      publishedEpisodes: stats[1],
      totalNews: stats[2],
      publishedNews: stats[3],
      totalProducts: stats[4],
      activeProducts: stats[5],
      totalComments: stats[6],
      pendingComments: stats[7]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all episodes (admin view)
router.get('/episodes', async (req, res) => {
  try {
    const episodes = await Episode.findAll({
      order: [['season', 'DESC'], ['episodeNumber', 'DESC']]
    });

    res.json({ episodes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all news (admin view)
router.get('/news', async (req, res) => {
  try {
    const news = await News.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.json({ news });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products (admin view)
router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get pending comments
router.get('/comments/pending', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { isApproved: false },
      order: [['createdAt', 'DESC']]
    });

    res.json({ comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
