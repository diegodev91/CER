const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { sequelize } = require('./config/database');
const { resourceMonitor, startMemoryMonitoring } = require('./middleware/resourceMonitor');
const { requestTimeout, connectionLimiter } = require('./middleware/requestLimiter');
const { circuitBreakerMiddleware } = require('./middleware/circuitBreaker');

// Import routes
const episodeRoutes = require('./routes/episodes');
const newsRoutes = require('./routes/news');
const shopRoutes = require('./routes/shop');
const commentRoutes = require('./routes/comments');
const adminRoutes = require('./routes/admin');
const reelRoutes = require('./routes/reels');

const app = express();
const PORT = process.env.PORT || 5001;

// Rate limiting - More restrictive for free tier
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Reduced from 100 to 50 requests per 15 minutes
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: 15 * 60 // seconds
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
});

// Stricter rate limiting for resource-intensive endpoints
const strictLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // 10 requests per 5 minutes for uploads/admin
  message: {
    error: 'Rate limit exceeded for this operation. Please try again later.',
    retryAfter: 5 * 60
  }
});

// CORS configuration for Azure deployment
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://www.cuidandoelrancho.com',
    'https://cuidandoelrancho.com',
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
app.use(connectionLimiter(parseInt(process.env.MAX_CONCURRENT_REQUESTS) || 50));
app.use(circuitBreakerMiddleware);
app.use(...requestTimeout(parseInt(process.env.REQUEST_TIMEOUT) || 30000));
app.use(resourceMonitor); // Add resource monitoring
app.use(limiter);
app.use(express.json({ limit: '5mb' })); // Reduced from 10mb to 5mb
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Health check endpoint with resource info
app.get('/api/health', (req, res) => {
  const { checkMemoryUsage } = require('./middleware/resourceMonitor');
  const memoryUsage = checkMemoryUsage();
  
  res.json({ 
    status: 'OK', 
    message: 'CER API is running',
    memory: memoryUsage,
    uptime: process.uptime(),
    nodeVersion: process.version,
    circuitBreaker: req.circuitBreakerState || 'N/A',
    resourceLimits: {
      maxMemoryMB: process.env.MAX_MEMORY_MB || 400,
      maxConcurrentRequests: process.env.MAX_CONCURRENT_REQUESTS || 50,
      requestTimeout: process.env.REQUEST_TIMEOUT || 30000
    }
  });
});

// Routes with rate limiting
app.use('/api/episodes', episodeRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin', strictLimiter, adminRoutes); // Apply strict limits to admin routes
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
      
      // Start memory monitoring
      startMemoryMonitoring();
      console.log('📊 Resource monitoring started');
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
