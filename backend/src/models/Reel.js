const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Reel = sequelize.define('Reel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  youtubeVideoId: {
    type: DataTypes.STRING,
    allowNull: false // Los reels necesitan video ID
  },
  youtubeShortsUrl: {
    type: DataTypes.STRING,
    allowNull: true // URL completa del YouTube Short
  },
  thumbnailUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  duration: {
    type: DataTypes.INTEGER, // en segundos (reels son cortos)
    allowNull: true
  },
  viewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  likeCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  publishedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  category: {
    type: DataTypes.ENUM('funny', 'highlights', 'behind-scenes', 'community', 'other'),
    defaultValue: 'highlights'
  }
}, {
  tableName: 'reels',
  timestamps: true
});

module.exports = Reel;
