const express = require('express');
const { body, query, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const User = require('../models/User');
const UserSession = require('../models/UserSession');
const { authenticate, authorize, can } = require('../middleware/auth');

const router = express.Router();

// Get all users (admin only)
router.get('/users', authenticate, can('users.read'), [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('search').optional().isLength({ max: 100 }).withMessage('Search term too long'),
  query('role').optional().isIn(['user', 'moderator', 'admin', 'super_admin']).withMessage('Invalid role'),
  query('status').optional().isIn(['active', 'inactive', 'verified', 'unverified']).withMessage('Invalid status'),
  query('sortBy').optional().isIn(['createdAt', 'lastLogin', 'email', 'firstName', 'lastName']).withMessage('Invalid sort field'),
  query('sortOrder').optional().isIn(['ASC', 'DESC']).withMessage('Invalid sort order')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const {
      page = 1,
      limit = 20,
      search,
      role,
      status,
      sortBy = 'createdAt',
      sortOrder = 'DESC'
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Build where conditions
    const whereConditions = {};

    if (search) {
      whereConditions[Op.or] = [
        { firstName: { [Op.like]: `%${search}%` } },
        { lastName: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } }
      ];
    }

    if (role) {
      whereConditions.role = role;
    }

    if (status) {
      switch (status) {
        case 'active':
          whereConditions.isActive = true;
          break;
        case 'inactive':
          whereConditions.isActive = false;
          break;
        case 'verified':
          whereConditions.isEmailVerified = true;
          break;
        case 'unverified':
          whereConditions.isEmailVerified = false;
          break;
      }
    }

    const { count, rows: users } = await User.findAndCountAll({
      where: whereConditions,
      attributes: { 
        exclude: ['password', 'emailVerificationToken', 'phoneVerificationCode', 'passwordResetToken'] 
      },
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset
    });

    const totalPages = Math.ceil(count / parseInt(limit));

    res.json({
      users,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalUsers: count,
        limit: parseInt(limit),
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      error: 'Failed to get users',
      message: 'An error occurred while fetching users'
    });
  }
});

// Get user by ID (admin only)
router.get('/users/:userId', authenticate, can('users.read'), async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      attributes: { 
        exclude: ['password', 'emailVerificationToken', 'phoneVerificationCode', 'passwordResetToken'] 
      }
    });

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // Get user sessions
    const sessions = await UserSession.findAll({
      where: { 
        userId: user.id,
        isRevoked: false
      },
      attributes: ['id', 'ipAddress', 'userAgent', 'device', 'location', 'lastActivity', 'createdAt'],
      order: [['lastActivity', 'DESC']]
    });

    res.json({
      user: {
        ...user.toJSON(),
        activeSessions: sessions.length
      },
      sessions
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      error: 'Failed to get user',
      message: 'An error occurred while fetching user'
    });
  }
});

// Update user (admin only)
router.put('/users/:userId', authenticate, can('users.update'), [
  body('firstName').optional().trim().isLength({ min: 1, max: 50 }).withMessage('First name must be 1-50 characters'),
  body('lastName').optional().trim().isLength({ min: 1, max: 50 }).withMessage('Last name must be 1-50 characters'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('role').optional().isIn(['user', 'moderator', 'admin', 'super_admin']).withMessage('Invalid role'),
  body('isActive').optional().isBoolean().withMessage('isActive must be boolean'),
  body('isEmailVerified').optional().isBoolean().withMessage('isEmailVerified must be boolean'),
  body('isPhoneVerified').optional().isBoolean().withMessage('isPhoneVerified must be boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { userId } = req.params;
    const { 
      firstName, 
      lastName, 
      email, 
      role, 
      isActive, 
      isEmailVerified, 
      isPhoneVerified 
    } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // Prevent super_admin from being demoted unless by another super_admin
    if (user.role === 'super_admin' && role && role !== 'super_admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({
        error: 'Only super admins can modify super admin roles',
        code: 'INSUFFICIENT_PERMISSIONS'
      });
    }

    // Prevent admin from promoting to super_admin unless they are super_admin
    if (role === 'super_admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({
        error: 'Only super admins can assign super admin role',
        code: 'INSUFFICIENT_PERMISSIONS'
      });
    }

    // Prevent self-demotion for admins
    if (user.id === req.user.id && role && role !== user.role) {
      return res.status(400).json({
        error: 'Cannot change your own role',
        code: 'CANNOT_CHANGE_OWN_ROLE'
      });
    }

    // Check if email is already taken by another user
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({
          error: 'Email already exists',
          code: 'EMAIL_EXISTS'
        });
      }
    }

    const updateData = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (email !== undefined) updateData.email = email;
    if (role !== undefined) updateData.role = role;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (isEmailVerified !== undefined) updateData.isEmailVerified = isEmailVerified;
    if (isPhoneVerified !== undefined) updateData.isPhoneVerified = isPhoneVerified;

    await user.update(updateData);

    // If user is deactivated, revoke all sessions
    if (isActive === false) {
      await UserSession.update(
        { 
          isRevoked: true, 
          revokedAt: new Date(),
          revokedBy: req.user.id
        },
        { 
          where: { 
            userId: user.id,
            isRevoked: false
          }
        }
      );
    }

    const updatedUser = await User.findByPk(userId, {
      attributes: { 
        exclude: ['password', 'emailVerificationToken', 'phoneVerificationCode', 'passwordResetToken'] 
      }
    });

    res.json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      error: 'Failed to update user',
      message: 'An error occurred while updating user'
    });
  }
});

// Delete user (admin only)
router.delete('/users/:userId', authenticate, can('users.delete'), async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // Prevent deletion of super_admin unless by another super_admin
    if (user.role === 'super_admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({
        error: 'Only super admins can delete super admin accounts',
        code: 'INSUFFICIENT_PERMISSIONS'
      });
    }

    // Prevent self-deletion
    if (user.id === req.user.id) {
      return res.status(400).json({
        error: 'Cannot delete your own account',
        code: 'CANNOT_DELETE_SELF'
      });
    }

    // Soft delete - deactivate account
    await user.update({
      isActive: false,
      email: `deleted_${Date.now()}_${user.email}`,
      phone: null
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
          userId: user.id,
          isRevoked: false
        }
      }
    );

    res.json({
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      error: 'Failed to delete user',
      message: 'An error occurred while deleting user'
    });
  }
});

// Revoke user sessions (admin only)
router.post('/users/:userId/revoke-sessions', authenticate, can('users.update'), async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // Revoke all sessions for the user
    const result = await UserSession.update(
      { 
        isRevoked: true, 
        revokedAt: new Date(),
        revokedBy: req.user.id
      },
      { 
        where: { 
          userId: user.id,
          isRevoked: false
        }
      }
    );

    res.json({
      message: `Successfully revoked ${result[0]} sessions for user ${user.email}`
    });
  } catch (error) {
    console.error('Revoke user sessions error:', error);
    res.status(500).json({
      error: 'Failed to revoke user sessions',
      message: 'An error occurred while revoking user sessions'
    });
  }
});

// Get user statistics (admin only)
router.get('/statistics', authenticate, can('users.read'), async (req, res) => {
  try {
    const [
      totalUsers,
      activeUsers,
      verifiedUsers,
      adminUsers,
      moderatorUsers,
      recentUsers,
      activeSessions
    ] = await Promise.all([
      User.count(),
      User.count({ where: { isActive: true } }),
      User.count({ where: { isEmailVerified: true } }),
      User.count({ where: { role: { [Op.in]: ['admin', 'super_admin'] } } }),
      User.count({ where: { role: 'moderator' } }),
      User.count({ 
        where: { 
          createdAt: { 
            [Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
          }
        }
      }),
      UserSession.count({ where: { isRevoked: false } })
    ]);

    // Get registration trends (last 7 days)
    const registrationTrend = await User.findAll({
      attributes: [
        [require('sequelize').fn('DATE', require('sequelize').col('createdAt')), 'date'],
        [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'count']
      ],
      where: {
        createdAt: {
          [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      },
      group: [require('sequelize').fn('DATE', require('sequelize').col('createdAt'))],
      order: [[require('sequelize').fn('DATE', require('sequelize').col('createdAt')), 'ASC']]
    });

    res.json({
      statistics: {
        totalUsers,
        activeUsers,
        inactiveUsers: totalUsers - activeUsers,
        verifiedUsers,
        unverifiedUsers: totalUsers - verifiedUsers,
        adminUsers,
        moderatorUsers,
        regularUsers: totalUsers - adminUsers - moderatorUsers,
        recentUsers,
        activeSessions
      },
      trends: {
        registrations: registrationTrend
      }
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({
      error: 'Failed to get statistics',
      message: 'An error occurred while fetching statistics'
    });
  }
});

// Bulk user operations (admin only)
router.post('/users/bulk-update', authenticate, can('users.update'), [
  body('userIds').isArray({ min: 1 }).withMessage('User IDs array is required'),
  body('userIds.*').isUUID().withMessage('Invalid user ID format'),
  body('action').isIn(['activate', 'deactivate', 'verify_email', 'unverify_email']).withMessage('Invalid action'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { userIds, action } = req.body;

    // Prevent bulk operations on own account
    if (userIds.includes(req.user.id)) {
      return res.status(400).json({
        error: 'Cannot perform bulk operations on your own account',
        code: 'CANNOT_BULK_UPDATE_SELF'
      });
    }

    const updateData = {};
    const sessionUpdate = {};

    switch (action) {
      case 'activate':
        updateData.isActive = true;
        break;
      case 'deactivate':
        updateData.isActive = false;
        sessionUpdate.isRevoked = true;
        sessionUpdate.revokedAt = new Date();
        sessionUpdate.revokedBy = req.user.id;
        break;
      case 'verify_email':
        updateData.isEmailVerified = true;
        break;
      case 'unverify_email':
        updateData.isEmailVerified = false;
        break;
    }

    const [updatedCount] = await User.update(updateData, {
      where: {
        id: { [Op.in]: userIds }
      }
    });

    // Revoke sessions if deactivating users
    if (action === 'deactivate') {
      await UserSession.update(sessionUpdate, {
        where: {
          userId: { [Op.in]: userIds },
          isRevoked: false
        }
      });
    }

    res.json({
      message: `Successfully updated ${updatedCount} users`,
      action,
      updatedCount
    });
  } catch (error) {
    console.error('Bulk update error:', error);
    res.status(500).json({
      error: 'Failed to perform bulk update',
      message: 'An error occurred while performing bulk update'
    });
  }
});

module.exports = router;
