const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');
const User = require('../models/User');
const UserSession = require('../models/UserSession');
const { 
  generateTokens, 
  authenticate, 
  authorize,
  requireEmailVerification 
} = require('../middleware/auth');
const { 
  sendVerificationEmail, 
  sendPasswordResetEmail, 
  sendAccountLockedEmail,
  sendWelcomeEmail 
} = require('../services/emailService');
const { 
  generateVerificationCode, 
  sendVerificationSMS, 
  isValidPhoneNumber,
  isSMSServiceAvailable 
} = require('../services/smsService');

const router = express.Router();

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 5 : 50, // Much more flexible in development
  message: {
    error: 'Too many authentication attempts, please try again later.',
    retryAfter: 15 * 60
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const strictAuthLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: process.env.NODE_ENV === 'production' ? 3 : 30, // Much more flexible in development
  message: {
    error: 'Too many requests for this operation, please try again later.',
    retryAfter: 60 * 60
  }
});

// Validation rules
const registerValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  body('firstName').trim().isLength({ min: 1, max: 50 }).withMessage('First name is required'),
  body('lastName').trim().isLength({ min: 1, max: 50 }).withMessage('Last name is required'),
  body('phone').optional()
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

// Helper function to get base URL
const getBaseUrl = (req) => {
  return process.env.API_BASE_URL || `${req.protocol}://${req.get('host')}`;
};

// Helper function to get client info
const getClientInfo = (req) => {
  return {
    ipAddress: req.ip || req.connection.remoteAddress,
    userAgent: req.get('User-Agent'),
    device: req.get('User-Agent') ? req.get('User-Agent').split(' ')[0] : 'Unknown'
  };
};

// Register endpoint
router.post('/register', authLimiter, registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { email, password, firstName, lastName, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        error: 'User already exists with this email',
        code: 'USER_EXISTS'
      });
    }

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      phone: phone || null,
      emailVerificationToken,
      emailVerificationExpires
    });

    // Send verification email
    const baseUrl = getBaseUrl(req);
    const emailResult = await sendVerificationEmail(user, emailVerificationToken, baseUrl);

    if (!emailResult.success) {
      console.error('Failed to send verification email:', emailResult.error);
    }

    res.status(201).json({
      message: 'User registered successfully. Please check your email to verify your account.',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified
      },
      emailSent: emailResult.success
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: 'Registration failed',
      message: 'An error occurred during registration'
    });
  }
});

// Login endpoint
router.post('/login', authLimiter, loginValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { email, password } = req.body;
    const clientInfo = getClientInfo(req);

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Check if account is locked
    if (user.isAccountLocked()) {
      return res.status(423).json({
        error: 'Account temporarily locked due to multiple failed login attempts',
        code: 'ACCOUNT_LOCKED',
        lockUntil: user.lockUntil
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        error: 'Account is deactivated',
        code: 'ACCOUNT_INACTIVE'
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      await user.incrementLoginAttempts();
      
      // Send account locked email if account gets locked
      if (user.isAccountLocked()) {
        await sendAccountLockedEmail(user);
      }
      
      return res.status(401).json({
        error: 'Invalid credentials',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Reset login attempts on successful login
    await user.resetLoginAttempts();

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id);

    // Create session
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const session = await UserSession.create({
      userId: user.id,
      token: accessToken,
      refreshToken,
      expiresAt,
      refreshExpiresAt,
      ...clientInfo
    });

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
        avatar: user.avatar
      },
      tokens: {
        accessToken,
        refreshToken,
        expiresAt,
        refreshExpiresAt
      },
      sessionId: session.id
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Login failed',
      message: 'An error occurred during login'
    });
  }
});

// Refresh token endpoint
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        error: 'Refresh token is required',
        code: 'REFRESH_TOKEN_MISSING'
      });
    }

    // Find session with refresh token
    const session = await UserSession.findOne({
      where: { 
        refreshToken,
        isRevoked: false
      },
      include: [{ model: User, as: 'user' }]
    });

    if (!session || session.isRefreshExpired()) {
      return res.status(401).json({
        error: 'Invalid or expired refresh token',
        code: 'REFRESH_TOKEN_INVALID'
      });
    }

    const user = await User.findByPk(session.userId);
    if (!user || !user.isActive) {
      return res.status(401).json({
        error: 'User not found or inactive',
        code: 'USER_INACTIVE'
      });
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user.id);

    // Update session
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await session.update({
      token: accessToken,
      refreshToken: newRefreshToken,
      expiresAt,
      refreshExpiresAt,
      lastActivity: new Date()
    });

    res.json({
      message: 'Tokens refreshed successfully',
      tokens: {
        accessToken,
        refreshToken: newRefreshToken,
        expiresAt,
        refreshExpiresAt
      }
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({
      error: 'Token refresh failed',
      message: 'An error occurred during token refresh'
    });
  }
});

// Logout endpoint
router.post('/logout', authenticate, async (req, res) => {
  try {
    // Revoke current session
    await req.session.revoke(req.user.id);

    res.json({
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      error: 'Logout failed',
      message: 'An error occurred during logout'
    });
  }
});

// Logout from all devices
router.post('/logout-all', authenticate, async (req, res) => {
  try {
    // Revoke all sessions for the user
    await UserSession.update(
      { 
        isRevoked: true, 
        revokedAt: new Date(),
        revokedBy: req.user.id
      },
      { 
        where: { 
          userId: req.user.id,
          isRevoked: false
        }
      }
    );

    res.json({
      message: 'Logged out from all devices successfully'
    });
  } catch (error) {
    console.error('Logout all error:', error);
    res.status(500).json({
      error: 'Logout failed',
      message: 'An error occurred during logout'
    });
  }
});

// Verify email endpoint
router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        error: 'Verification token is required',
        code: 'TOKEN_MISSING'
      });
    }

    // Find user with verification token
    const user = await User.findOne({
      where: {
        emailVerificationToken: token,
        emailVerificationExpires: {
          [require('sequelize').Op.gt]: new Date()
        }
      }
    });

    if (!user) {
      return res.status(400).json({
        error: 'Invalid or expired verification token',
        code: 'TOKEN_INVALID'
      });
    }

    // Update user verification status
    await user.update({
      isEmailVerified: true,
      emailVerificationToken: null,
      emailVerificationExpires: null
    });

    // Send welcome email
    await sendWelcomeEmail(user);

    res.json({
      message: 'Email verified successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      error: 'Email verification failed',
      message: 'An error occurred during email verification'
    });
  }
});

// Resend verification email
router.post('/resend-verification', authLimiter, [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      // Don't reveal if user exists or not
      return res.json({
        message: 'If an account with this email exists and is not verified, a verification email has been sent.'
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        error: 'Email is already verified',
        code: 'EMAIL_ALREADY_VERIFIED'
      });
    }

    // Generate new verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await user.update({
      emailVerificationToken,
      emailVerificationExpires
    });

    // Send verification email
    const baseUrl = getBaseUrl(req);
    const emailResult = await sendVerificationEmail(user, emailVerificationToken, baseUrl);

    res.json({
      message: 'If an account with this email exists and is not verified, a verification email has been sent.',
      emailSent: emailResult.success
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({
      error: 'Failed to resend verification email',
      message: 'An error occurred while resending verification email'
    });
  }
});

module.exports = router;
