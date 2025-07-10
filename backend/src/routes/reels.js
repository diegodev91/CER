const express = require('express');
const router = express.Router();
const Reel = require('../models/Reel');

// GET /api/reels - Obtener todos los reels
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 12, category, featured } = req.query;
    const offset = (page - 1) * limit;
    
    const whereClause = { isPublished: true };
    
    if (category) {
      whereClause.category = category;
    }
    
    if (featured === 'true') {
      whereClause.isFeatured = true;
    }

    const reels = await Reel.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['publishedAt', 'DESC'], ['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: reels.rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(reels.count / limit),
        totalItems: reels.count,
        hasNextPage: offset + parseInt(limit) < reels.count,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching reels:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los reels',
      error: error.message
    });
  }
});

// GET /api/reels/featured - Obtener reels destacados
router.get('/featured', async (req, res) => {
  try {
    const featuredReels = await Reel.findAll({
      where: { 
        isPublished: true,
        isFeatured: true 
      },
      order: [['publishedAt', 'DESC']],
      limit: 6
    });

    res.json({
      success: true,
      data: featuredReels
    });
  } catch (error) {
    console.error('Error fetching featured reels:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los reels destacados',
      error: error.message
    });
  }
});

// GET /api/reels/categories - Obtener categorías disponibles
router.get('/categories', async (req, res) => {
  try {
    const categories = [
      { value: 'funny', label: 'Divertidos', emoji: '😂' },
      { value: 'highlights', label: 'Mejores Momentos', emoji: '⭐' },
      { value: 'behind-scenes', label: 'Detrás de Cámaras', emoji: '🎬' },
      { value: 'community', label: 'Comunidad CerRanos', emoji: '👥' },
      { value: 'other', label: 'Otros', emoji: '📺' }
    ];

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener las categorías',
      error: error.message
    });
  }
});

// GET /api/reels/:id - Obtener un reel específico
router.get('/:id', async (req, res) => {
  try {
    const reel = await Reel.findByPk(req.params.id);
    
    if (!reel) {
      return res.status(404).json({
        success: false,
        message: 'Reel no encontrado'
      });
    }

    if (!reel.isPublished) {
      return res.status(404).json({
        success: false,
        message: 'Reel no disponible'
      });
    }

    // Incrementar contador de vistas
    await reel.increment('viewCount');

    res.json({
      success: true,
      data: reel
    });
  } catch (error) {
    console.error('Error fetching reel:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener el reel',
      error: error.message
    });
  }
});

// POST /api/reels - Crear nuevo reel (admin)
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      youtubeVideoId,
      youtubeShortsUrl,
      thumbnailUrl,
      duration,
      category,
      tags,
      isFeatured,
      publishedAt
    } = req.body;

    const newReel = await Reel.create({
      title,
      description,
      youtubeVideoId,
      youtubeShortsUrl,
      thumbnailUrl,
      duration,
      category,
      tags,
      isFeatured: isFeatured || false,
      publishedAt: publishedAt || new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Reel creado exitosamente',
      data: newReel
    });
  } catch (error) {
    console.error('Error creating reel:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear el reel',
      error: error.message
    });
  }
});

module.exports = router;
