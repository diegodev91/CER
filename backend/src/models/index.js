const User = require('./User');
const UserSession = require('./UserSession');
const Comment = require('./Comment');
const Episode = require('./Episode');
const News = require('./News');
const Product = require('./Product');
const Reel = require('./Reel');

// Define associations
User.hasMany(UserSession, { 
  foreignKey: 'userId', 
  as: 'sessions',
  onDelete: 'CASCADE' 
});
UserSession.belongsTo(User, { 
  foreignKey: 'userId', 
  as: 'user' 
});

User.hasMany(Comment, { 
  foreignKey: 'userId', 
  as: 'comments',
  onDelete: 'SET NULL' 
});
Comment.belongsTo(User, { 
  foreignKey: 'userId', 
  as: 'user' 
});

// Export all models
module.exports = {
  User,
  UserSession,
  Comment,
  Episode,
  News,
  Product,
  Reel
};
