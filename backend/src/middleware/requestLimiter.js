const timeout = require('connect-timeout');

// Request timeout middleware to prevent long-running requests
const requestTimeout = (timeoutMs = 30000) => {
  return [
    timeout(timeoutMs),
    (req, res, next) => {
      if (!req.timedout) next();
    },
    (err, req, res, next) => {
      if (req.timedout) {
        console.warn('⏰ Request timeout:', {
          path: req.path,
          method: req.method,
          ip: req.ip,
          userAgent: req.get('User-Agent')
        });
        
        res.status(408).json({
          error: 'Request timeout',
          message: 'The request took too long to process'
        });
      } else {
        next(err);
      }
    }
  ];
};

// Connection limiter to prevent too many concurrent connections
const connectionLimiter = (maxConnections = 50) => {
  let activeConnections = 0;
  
  return (req, res, next) => {
    if (activeConnections >= maxConnections) {
      console.warn('🚫 Connection limit reached:', {
        active: activeConnections,
        max: maxConnections,
        path: req.path,
        ip: req.ip
      });
      
      return res.status(503).json({
        error: 'Service temporarily unavailable',
        message: 'Too many active connections. Please try again later.',
        retryAfter: 30
      });
    }
    
    activeConnections++;
    
    res.on('finish', () => {
      activeConnections--;
    });
    
    res.on('close', () => {
      activeConnections--;
    });
    
    next();
  };
};

module.exports = {
  requestTimeout,
  connectionLimiter
};
