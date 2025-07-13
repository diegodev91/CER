const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');
const User = require('../models/User');
const UserSession = require('../models/UserSession');
const { 
  authenticate, 
  authorize, 
  can,
  requireEmailVerification 
} = require('../middleware/auth');
const { 
  sendPasswordResetEmail 
} = require('../services/emailService');
const { 
  generateVerificationCode, 
  sendVerificationSMS, 
  isValidPhoneNumber,
  isSMSServiceAvailable 
} = require('../services/smsService');

const router = express.Router();

// Rate limiting for sensitive operations
const sensitiveOperationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 attempts per hour
  message: {
    error: 'Too many requests for this operation, please try again later.',
    retryAfter: 60 * 60
  }
});

const phoneVerificationLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 3, // 3 SMS per 10 minutes
  message: {
    error: 'Too many SMS verification requests, please try again later.',
    retryAfter: 10 * 60
  }
});

// Validation rules
const updateProfileValidation = [
  body('firstName').optional().trim().isLength({ min: 1, max: 50 }).withMessage('First name must be 1-50 characters'),
  body('lastName').optional().trim().isLength({ min: 1, max: 50 }).withMessage('Last name must be 1-50 characters'),
  body('phone').optional().custom((value) => {
    if (value && !isValidPhoneNumber(value)) {
      throw new Error('Invalid phone number format');
    }
    return true;
  }),
  body('bio').optional().isLength({ max: 500 }).withMessage('Bio must be less than 500 characters')
];

const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
];

// Get current user profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password', 'emailVerificationToken', 'phoneVerificationCode', 'passwordResetToken'] }
    });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
        avatar: user.avatar,
        bio: user.bio,
        preferences: user.preferences,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      error: 'Failed to get profile',
      message: 'An error occurred while fetching profile'
    });
  }
});

// Update user profile
router.put('/profile', authenticate, updateProfileValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { firstName, lastName, phone, bio, preferences } = req.body;
    const updateData = {};

    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (bio !== undefined) updateData.bio = bio;
    
    // Handle phone number update
    if (phone !== undefined) {
      if (phone !== req.user.phone) {
        updateData.phone = phone;
        updateData.isPhoneVerified = false; // Reset phone verification if phone changed
        updateData.phoneVerificationCode = null;
        updateData.phoneVerificationExpires = null;
      }
    }

    // Handle preferences update
    if (preferences !== undefined) {
      updateData.preferences = {
        ...req.user.preferences,
        ...preferences
      };
    }

    const [updatedRowsCount] = await User.update(updateData, {
      where: { id: req.user.id }
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    const updatedUser = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password', 'emailVerificationToken', 'phoneVerificationCode', 'passwordResetToken'] }
    });

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phone: updatedUser.phone,
        role: updatedUser.role,
        isEmailVerified: updatedUser.isEmailVerified,
        isPhoneVerified: updatedUser.isPhoneVerified,
        avatar: updatedUser.avatar,
        bio: updatedUser.bio,
        preferences: updatedUser.preferences,
        lastLogin: updatedUser.lastLogin,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      error: 'Failed to update profile',
      message: 'An error occurred while updating profile'
    });
  }
});

// Change password
router.put('/change-password', authenticate, sensitiveOperationLimiter, changePasswordValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { currentPassword, newPassword } = req.body;

    // Verify current password
    const user = await User.findByPk(req.user.id);
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        error: 'Current password is incorrect',
        code: 'INVALID_CURRENT_PASSWORD'
      });
    }

    // Update password
    await user.update({ password: newPassword });

    // Revoke all sessions except current one
    await UserSession.update(
      { 
        isRevoked: true, 
        revokedAt: new Date(),
        revokedBy: user.id
      },
      { 
        where: { 
          userId: user.id,
          id: { [require('sequelize').Op.ne]: req.session.id },
          isRevoked: false
        }
      }
    );

    res.json({
      message: 'Password changed successfully. You have been logged out from all other devices.'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      error: 'Failed to change password',
      message: 'An error occurred while changing password'
    });
  }
});

// Send password reset email
router.post('/forgot-password', sensitiveOperationLimiter, [
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
        message: 'If an account with this email exists, a password reset email has been sent.'
      });
    }

    // Generate password reset token
    const passwordResetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await user.update({
      passwordResetToken,
      passwordResetExpires
    });

    // Send password reset email
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const emailResult = await sendPasswordResetEmail(user, passwordResetToken, baseUrl);

    res.json({
      message: 'If an account with this email exists, a password reset email has been sent.',
      emailSent: emailResult.success
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      error: 'Failed to send password reset email',
      message: 'An error occurred while sending password reset email'
    });
  }
});

// Reset password with token
router.post('/reset-password', sensitiveOperationLimiter, [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { token, newPassword } = req.body;

    // Find user with reset token
    const user = await User.findOne({
      where: {
        passwordResetToken: token,
        passwordResetExpires: {
          [require('sequelize').Op.gt]: new Date()
        }
      }
    });

    if (!user) {
      return res.status(400).json({
        error: 'Invalid or expired reset token',
        code: 'TOKEN_INVALID'
      });
    }

    // Update password and clear reset token
    await user.update({
      password: newPassword,
      passwordResetToken: null,
      passwordResetExpires: null,
      loginAttempts: 0, // Reset login attempts
      lockUntil: null    // Clear any account lock
    });

    // Revoke all sessions for security
    await UserSession.update(
      { 
        isRevoked: true, 
        revokedAt: new Date(),
        revokedBy: user.id
      },
      { 
        where: { 
          userId: user.id,
          isRevoked: false
        }
      }
    );

    res.json({
      message: 'Password reset successfully. Please log in with your new password.'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      error: 'Failed to reset password',
      message: 'An error occurred while resetting password'
    });
  }
});

// Send phone verification SMS
router.post('/send-phone-verification', authenticate, phoneVerificationLimiter, async (req, res) => {
  try {
    if (!req.user.phone) {
      return res.status(400).json({
        error: 'Phone number not found in profile',
        code: 'PHONE_NOT_FOUND'
      });
    }

    if (req.user.isPhoneVerified) {
      return res.status(400).json({
        error: 'Phone number is already verified',
        code: 'PHONE_ALREADY_VERIFIED'
      });
    }

    if (!isSMSServiceAvailable()) {
      return res.status(503).json({
        error: 'SMS service is currently unavailable',
        code: 'SMS_SERVICE_UNAVAILABLE'
      });
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const phoneVerificationExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save verification code
    await req.user.update({
      phoneVerificationCode: verificationCode,
      phoneVerificationExpires
    });

    // Send SMS
    const smsResult = await sendVerificationSMS(req.user.phone, verificationCode);

    if (!smsResult.success) {
      return res.status(500).json({
        error: 'Failed to send verification SMS',
        code: 'SMS_SEND_FAILED',
        details: smsResult.error
      });
    }

    res.json({
      message: 'Verification code sent to your phone number',
      expiresAt: phoneVerificationExpires
    });
  } catch (error) {
    console.error('Send phone verification error:', error);
    res.status(500).json({
      error: 'Failed to send phone verification',
      message: 'An error occurred while sending phone verification'
    });
  }
});

// Verify phone number
router.post('/verify-phone', authenticate, [
  body('code').isLength({ min: 6, max: 6 }).withMessage('Verification code must be 6 digits')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { code } = req.body;

    if (!req.user.phoneVerificationCode || !req.user.phoneVerificationExpires) {
      return res.status(400).json({
        error: 'No verification code found. Please request a new one.',
        code: 'NO_VERIFICATION_CODE'
      });
    }

    if (new Date() > req.user.phoneVerificationExpires) {
      return res.status(400).json({
        error: 'Verification code has expired. Please request a new one.',
        code: 'CODE_EXPIRED'
      });
    }

    if (req.user.phoneVerificationCode !== code) {
      return res.status(400).json({
        error: 'Invalid verification code',
        code: 'INVALID_CODE'
      });
    }

    // Update user verification status
    await req.user.update({
      isPhoneVerified: true,
      phoneVerificationCode: null,
      phoneVerificationExpires: null
    });

    res.json({
      message: 'Phone number verified successfully',
      user: {
        id: req.user.id,
        phone: req.user.phone,
        isPhoneVerified: true
      }
    });
  } catch (error) {
    console.error('Verify phone error:', error);
    res.status(500).json({
      error: 'Failed to verify phone number',
      message: 'An error occurred while verifying phone number'
    });
  }
});

// Get user sessions
router.get('/sessions', authenticate, async (req, res) => {
  try {
    const sessions = await UserSession.findAll({
      where: { 
        userId: req.user.id,
        isRevoked: false
      },
      attributes: ['id', 'ipAddress', 'userAgent', 'device', 'location', 'lastActivity', 'createdAt'],
      order: [['lastActivity', 'DESC']]
    });

    const sessionsWithCurrent = sessions.map(session => ({
      ...session.toJSON(),
      isCurrent: session.id === req.session.id
    }));

    res.json({
      sessions: sessionsWithCurrent
    });
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({
      error: 'Failed to get sessions',
      message: 'An error occurred while fetching sessions'
    });
  }
});

// Revoke specific session
router.delete('/sessions/:sessionId', authenticate, async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (sessionId === req.session.id) {
      return res.status(400).json({
        error: 'Cannot revoke current session. Use logout instead.',
        code: 'CANNOT_REVOKE_CURRENT_SESSION'
      });
    }

    const session = await UserSession.findOne({
      where: {
        id: sessionId,
        userId: req.user.id,
        isRevoked: false
      }
    });

    if (!session) {
      return res.status(404).json({
        error: 'Session not found',
        code: 'SESSION_NOT_FOUND'
      });
    }

    await session.revoke(req.user.id);

    res.json({
      message: 'Session revoked successfully'
    });
  } catch (error) {
    console.error('Revoke session error:', error);
    res.status(500).json({
      error: 'Failed to revoke session',
      message: 'An error occurred while revoking session'
    });
  }
});

// Delete account
router.delete('/account', authenticate, requireEmailVerification, sensitiveOperationLimiter, [
  body('password').notEmpty().withMessage('Password is required for account deletion'),
  body('confirmText').equals('DELETE MY ACCOUNT').withMessage('Confirmation text must be "DELETE MY ACCOUNT"')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { password } = req.body;

    // Verify password
    const isPasswordValid = await req.user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({
        error: 'Invalid password',
        code: 'INVALID_PASSWORD'
      });
    }

    // Soft delete - deactivate account instead of hard delete
    await req.user.update({
      isActive: false,
      email: `deleted_${Date.now()}_${req.user.email}`, // Preserve email uniqueness
      phone: null,
      firstName: 'Deleted',
      lastName: 'User',
      bio: null,
      avatar: null
    });

    // Revoke all sessions
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
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      error: 'Failed to delete account',
      message: 'An error occurred while deleting account'
    });
  }
});

module.exports = router;
