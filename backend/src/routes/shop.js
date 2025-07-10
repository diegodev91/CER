const express = require('express');
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');

const router = express.Router();

// Get all active products
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * limit;
    
    const whereClause = { isActive: true };
    if (category) {
      whereClause.category = category;
    }

    const products = await Product.findAndCountAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: offset
    });

    res.json({
      products: products.rows,
      totalCount: products.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(products.count / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { 
        id: req.params.id,
        isActive: true 
      }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = [
      { value: 'clothing', label: 'Clothing' },
      { value: 'accessories', label: 'Accessories' },
      { value: 'collectibles', label: 'Collectibles' },
      { value: 'media', label: 'Media' }
    ];

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get featured products
router.get('/featured/list', async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { 
        isActive: true,
        stockQuantity: { [Op.gt]: 0 }
      },
      order: [['createdAt', 'DESC']],
      limit: 6
    });

    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
