const express = require('express');
const { body, validationResult } = require('express-validator');
const Comment = require('../models/Comment');

const router = express.Router();

// Get comments for specific content
router.get('/:contentType/:contentId', async (req, res) => {
  try {
    const { contentType, contentId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    if (!['episode', 'news'].includes(contentType)) {
      return res.status(400).json({ error: 'Invalid content type' });
    }

    const comments = await Comment.findAndCountAll({
      where: { 
        contentType,
        contentId: parseInt(contentId),
        isApproved: true
      },
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: offset
    });

    res.json({
      comments: comments.rows,
      totalCount: comments.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(comments.count / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new comment
router.post('/', [
  body('content').notEmpty().withMessage('Content is required'),
  body('authorName').notEmpty().withMessage('Author name is required'),
  body('authorEmail').isEmail().withMessage('Valid email is required'),
  body('contentType').isIn(['episode', 'news']).withMessage('Invalid content type'),
  body('contentId').isInt().withMessage('Content ID must be an integer'),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content, authorName, authorEmail, contentType, contentId, rating } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;

    const comment = await Comment.create({
      content,
      authorName,
      authorEmail,
      contentType,
      contentId,
      rating,
      ipAddress,
      isApproved: false // Comments need approval by default
    });

    res.status(201).json({ 
      message: 'Comment submitted successfully. It will be visible after approval.',
      comment: {
        id: comment.id,
        content: comment.content,
        authorName: comment.authorName,
        createdAt: comment.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get comment statistics
router.get('/stats/:contentType/:contentId', async (req, res) => {
  try {
    const { contentType, contentId } = req.params;

    if (!['episode', 'news'].includes(contentType)) {
      return res.status(400).json({ error: 'Invalid content type' });
    }

    const stats = await Comment.findAll({
      attributes: [
        [Comment.sequelize.fn('COUNT', Comment.sequelize.col('id')), 'totalComments'],
        [Comment.sequelize.fn('AVG', Comment.sequelize.col('rating')), 'averageRating'],
        [Comment.sequelize.fn('COUNT', Comment.sequelize.col('rating')), 'totalRatings']
      ],
      where: { 
        contentType,
        contentId: parseInt(contentId),
        isApproved: true
      }
    });

    res.json(stats[0] || { totalComments: 0, averageRating: 0, totalRatings: 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
