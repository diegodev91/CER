// Emergency circuit breaker to protect against resource exhaustion
class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.timeout = options.timeout || 60000; // 1 minute
    this.resetTimeout = options.resetTimeout || 300000; // 5 minutes
    
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.failureCount = 0;
    this.nextAttempt = Date.now();
    this.lastFailureTime = null;
  }

  async call(operation) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.state = 'HALF_OPEN';
    }

    try {
      const result = await Promise.race([
        operation(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Operation timeout')), this.timeout)
        )
      ]);
      
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
    this.nextAttempt = 0;
  }

  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.resetTimeout;
      
      console.error('🚨 Circuit breaker OPENED - too many failures', {
        failureCount: this.failureCount,
        nextAttempt: new Date(this.nextAttempt).toISOString()
      });
    }
  }

  getState() {
    return {
      state: this.state,
      failureCount: this.failureCount,
      nextAttempt: this.nextAttempt
    };
  }
}

// Global circuit breaker for database operations
const dbCircuitBreaker = new CircuitBreaker({
  failureThreshold: 3,
  timeout: 10000,
  resetTimeout: 60000
});

// Middleware to check circuit breaker state
const circuitBreakerMiddleware = (req, res, next) => {
  // Add circuit breaker info to health endpoint
  if (req.path === '/api/health') {
    req.circuitBreakerState = dbCircuitBreaker.getState();
  }
  
  // Block requests if circuit breaker is open
  if (dbCircuitBreaker.state === 'OPEN' && req.path !== '/api/health') {
    return res.status(503).json({
      error: 'Service temporarily unavailable',
      message: 'System is experiencing high load. Please try again later.',
      circuitBreaker: dbCircuitBreaker.getState()
    });
  }
  
  next();
};

module.exports = {
  CircuitBreaker,
  dbCircuitBreaker,
  circuitBreakerMiddleware
};
