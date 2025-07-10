const process = require('process');

// Resource monitoring middleware
const resourceMonitor = (req, res, next) => {
  const startTime = Date.now();
  const startMemory = process.memoryUsage();

  // Override res.end to capture metrics
  const originalEnd = res.end;
  res.end = function(...args) {
    const endTime = Date.now();
    const endMemory = process.memoryUsage();
    
    const metrics = {
      duration: endTime - startTime,
      memoryDelta: endMemory.heapUsed - startMemory.heapUsed,
      totalMemory: endMemory.heapUsed,
      path: req.path,
      method: req.method,
      timestamp: new Date().toISOString()
    };

    // Log high resource usage
    if (metrics.duration > 5000 || metrics.memoryDelta > 50 * 1024 * 1024) { // 5s or 50MB
      console.warn('⚠️ High resource usage detected:', {
        path: metrics.path,
        method: metrics.method,
        duration: `${metrics.duration}ms`,
        memoryDelta: `${Math.round(metrics.memoryDelta / 1024 / 1024)}MB`,
        totalMemory: `${Math.round(metrics.totalMemory / 1024 / 1024)}MB`
      });
    }

    // Set resource usage headers for monitoring
    res.set({
      'X-Response-Time': `${metrics.duration}ms`,
      'X-Memory-Usage': `${Math.round(metrics.totalMemory / 1024 / 1024)}MB`
    });

    originalEnd.apply(this, args);
  };

  next();
};

// Memory usage checker
const checkMemoryUsage = () => {
  const usage = process.memoryUsage();
  const usageInMB = {
    rss: Math.round(usage.rss / 1024 / 1024),
    heapTotal: Math.round(usage.heapTotal / 1024 / 1024),
    heapUsed: Math.round(usage.heapUsed / 1024 / 1024),
    external: Math.round(usage.external / 1024 / 1024)
  };

  // Warning if memory usage is high (adjust threshold based on your plan)
  if (usageInMB.heapUsed > 400) { // 400MB threshold for free tier
    console.warn('🚨 High memory usage detected:', usageInMB);
  }

  return usageInMB;
};

// Periodic memory monitoring
const startMemoryMonitoring = () => {
  setInterval(() => {
    checkMemoryUsage();
  }, 60000); // Check every minute
};

module.exports = {
  resourceMonitor,
  checkMemoryUsage,
  startMemoryMonitoring
};
