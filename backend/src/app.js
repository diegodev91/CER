const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { sequelize } = require('./config/database');

// Import routes
const episodeRoutes = require('./routes/episodes');
const newsRoutes = require('./routes/news');
const shopRoutes = require('./routes/shop');
const commentRoutes = require('./routes/comments');
const adminRoutes = require('./routes/admin');
const reelRoutes = require('./routes/reels');

const app = express();
const PORT = process.env.PORT || 5001;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// CORS configuration for Azure deployment
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://www.cuidando-el-rancho.com',
    'https://cuidando-el-rancho.com',
    'https://gray-stone-00b286e10.1.azurestaticapps.net',
    'https://cer-backend.lemonbeach-6b713b41.eastus.azurecontainerapps.io',
    process.env.FRONTEND_URL
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CER API is running' });
});

// Routes
app.use('/api/episodes', episodeRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reels', reelRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Database connection and server start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
    
    // Sync database models
    await sequelize.sync({ force: false });
    console.log('✅ Database models synced');
    
    app.listen(PORT, () => {
      console.log(`🚀 CER Backend server running on port ${PORT}`);
      console.log(`📍 API Health: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
