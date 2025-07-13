const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 50]
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 50]
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role: {
    type: DataTypes.ENUM('user', 'moderator', 'admin', 'super_admin'),
    defaultValue: 'user',
    allowNull: false
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isPhoneVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  emailVerificationToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  emailVerificationExpires: {
    type: DataTypes.DATE,
    allowNull: true
  },
  phoneVerificationCode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phoneVerificationExpires: {
    type: DataTypes.DATE,
    allowNull: true
  },
  passwordResetToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  passwordResetExpires: {
    type: DataTypes.DATE,
    allowNull: true
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  loginAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  lockUntil: {
    type: DataTypes.DATE,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  preferences: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: JSON.stringify({
      notifications: {
        email: true,
        sms: false,
        push: true
      },
      privacy: {
        showEmail: false,
        showPhone: false
      }
    }),
    get() {
      const value = this.getDataValue('preferences');
      if (!value) return null;
      try {
        return typeof value === 'string' ? JSON.parse(value) : value;
      } catch (error) {
        return null;
      }
    },
    set(value) {
      this.setDataValue('preferences', JSON.stringify(value));
    }
  }
}, {
  tableName: 'users',
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 12);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 12);
      }
    }
  },
  indexes: [
    {
      unique: true,
      fields: ['email']
    },
    {
      fields: ['role']
    },
    {
      fields: ['isEmailVerified']
    },
    {
      fields: ['isPhoneVerified']
    },
    {
      fields: ['emailVerificationToken']
    },
    {
      fields: ['passwordResetToken']
    }
  ]
});

// Instance methods
User.prototype.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

User.prototype.isAccountLocked = function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

User.prototype.incrementLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.update({
      loginAttempts: 1,
      lockUntil: null
    });
  }
  
  const updates = { loginAttempts: this.loginAttempts + 1 };
  
  // Lock account after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isAccountLocked()) {
    updates.lockUntil = Date.now() + 2 * 60 * 60 * 1000; // 2 hours
  }
  
  return this.update(updates);
};

User.prototype.resetLoginAttempts = function() {
  return this.update({
    loginAttempts: 0,
    lockUntil: null,
    lastLogin: new Date()
  });
};

User.prototype.canPerform = function(action, resource = null) {
  const permissions = {
    'super_admin': ['*'],
    'admin': [
      'users.read', 'users.update', 'users.delete',
      'episodes.create', 'episodes.update', 'episodes.delete', 'episodes.read',
      'news.create', 'news.update', 'news.delete', 'news.read',
      'products.create', 'products.update', 'products.delete', 'products.read',
      'comments.moderate', 'comments.delete', 'comments.read',
      'reels.create', 'reels.update', 'reels.delete', 'reels.read'
    ],
    'moderator': [
      'episodes.read', 'news.read', 'products.read', 'reels.read',
      'comments.moderate', 'comments.delete', 'comments.read'
    ],
    'user': [
      'episodes.read', 'news.read', 'products.read', 'reels.read',
      'comments.create', 'comments.read'
    ]
  };
  
  const userPermissions = permissions[this.role] || [];
  
  if (userPermissions.includes('*')) {
    return true;
  }
  
  return userPermissions.includes(action);
};

module.exports = User;
