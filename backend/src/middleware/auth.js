const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserSession = require('../models/UserSession');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error('JWT_SECRET and JWT_REFRESH_SECRET must be set in environment variables');
}

// Generate JWT tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId, type: 'access' },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
  );
  
  const refreshToken = jwt.sign(
    { userId, type: 'refresh' },
    JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );
  
  return { accessToken, refreshToken };
};

// Verify JWT token
const verifyToken = (token, secret = JWT_SECRET) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

// Authentication middleware
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Access token required',
        code: 'TOKEN_MISSING'
      });
    }
    
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    if (!decoded || decoded.type !== 'access') {
      return res.status(401).json({
        error: 'Invalid or expired token',
        code: 'TOKEN_INVALID'
      });
    }
    
    // Check if session exists and is valid
    const session = await UserSession.findOne({
      where: {
        token,
        isRevoked: false
      },
      include: [{
        model: User,
        as: 'user'
      }]
    });
    
    if (!session || session.isExpired()) {
      return res.status(401).json({
        error: 'Session expired or invalid',
        code: 'SESSION_EXPIRED'
      });
    }
    
    const user = await User.findByPk(decoded.userId);
    
    if (!user || !user.isActive) {
      return res.status(401).json({
        error: 'User not found or inactive',
        code: 'USER_INACTIVE'
      });
    }
    
    // Update session activity
    await session.updateActivity();
    
    req.user = user;
    req.session = session;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({
      error: 'Authentication failed',
      code: 'AUTH_ERROR'
    });
  }
};

// Optional authentication middleware (doesn't require authentication)
const optionalAuthenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(); // Continue without authentication
    }
    
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    if (decoded && decoded.type === 'access') {
      const user = await User.findByPk(decoded.userId);
      if (user && user.isActive) {
        req.user = user;
      }
    }
    
    next();
  } catch (error) {
    // Continue without authentication on error
    next();
  }
};

// Authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required',
        code: 'AUTH_REQUIRED'
      });
    }
    
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Insufficient permissions',
        code: 'INSUFFICIENT_PERMISSIONS',
        required: roles,
        current: req.user.role
      });
    }
    
    next();
  };
};

// Permission-based authorization
const can = (action, resource = null) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required',
        code: 'AUTH_REQUIRED'
      });
    }
    
    if (!req.user.canPerform(action, resource)) {
      return res.status(403).json({
        error: 'Permission denied',
        code: 'PERMISSION_DENIED',
        action,
        resource
      });
    }
    
    next();
  };
};

// Email verification required middleware
const requireEmailVerification = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      error: 'Authentication required',
      code: 'AUTH_REQUIRED'
    });
  }
  
  if (!req.user.isEmailVerified) {
    return res.status(403).json({
      error: 'Email verification required',
      code: 'EMAIL_VERIFICATION_REQUIRED'
    });
  }
  
  next();
};

// Account lock check middleware
const checkAccountLock = async (req, res, next) => {
  if (!req.user) {
    return next();
  }
  
  if (req.user.isAccountLocked()) {
    return res.status(423).json({
      error: 'Account temporarily locked due to multiple failed login attempts',
      code: 'ACCOUNT_LOCKED',
      lockUntil: req.user.lockUntil
    });
  }
  
  next();
};

module.exports = {
  generateTokens,
  verifyToken,
  authenticate,
  optionalAuthenticate,
  authorize,
  can,
  requireEmailVerification,
  checkAccountLock,
  JWT_SECRET,
  JWT_REFRESH_SECRET
};
