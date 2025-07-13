const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UserSession = sequelize.define('UserSession', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  refreshExpiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: true
  },
  userAgent: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  device: {
    type: DataTypes.STRING,
    allowNull: true
  },
  location: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const value = this.getDataValue('location');
      if (!value) return null;
      try {
        return typeof value === 'string' ? JSON.parse(value) : value;
      } catch (error) {
        return null;
      }
    },
    set(value) {
      this.setDataValue('location', value ? JSON.stringify(value) : null);
    }
  },
  isRevoked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  revokedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  revokedBy: {
    type: DataTypes.UUID,
    allowNull: true
  },
  lastActivity: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'user_sessions',
  timestamps: true,
  indexes: [
    {
      fields: ['userId']
    },
    {
      unique: true,
      fields: ['token']
    },
    {
      unique: true,
      fields: ['refreshToken']
    },
    {
      fields: ['expiresAt']
    },
    {
      fields: ['isRevoked']
    }
  ]
});

// Instance methods
UserSession.prototype.isExpired = function() {
  return this.expiresAt < new Date();
};

UserSession.prototype.isRefreshExpired = function() {
  return this.refreshExpiresAt < new Date();
};

UserSession.prototype.revoke = function(revokedBy = null) {
  return this.update({
    isRevoked: true,
    revokedAt: new Date(),
    revokedBy
  });
};

UserSession.prototype.updateActivity = function() {
  return this.update({
    lastActivity: new Date()
  });
};

module.exports = UserSession;
