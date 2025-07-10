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
    allowNull: false, // Los reels necesitan video ID
    field: 'youtube_video_id'
  },
  youtubeShortsUrl: {
    type: DataTypes.STRING,
    allowNull: true, // URL completa del YouTube Short
    field: 'youtube_shorts_url'
  },
  thumbnailUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'thumbnail_url'
  },
  duration: {
    type: DataTypes.INTEGER, // en segundos (reels son cortos)
    allowNull: true
  },
  viewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'view_count'
  },
  likeCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'like_count'
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_published'
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_featured'
  },
  publishedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'published_at'
  },
  tags: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '[]',
    get() {
      const value = this.getDataValue('tags');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue('tags', JSON.stringify(value || []));
    }
  },
  category: {
    type: DataTypes.ENUM('funny', 'highlights', 'behind-scenes', 'community', 'other'),
    defaultValue: 'highlights'
  }
}, {
  tableName: 'reels',
  timestamps: true,
  underscored: true
});

module.exports = Reel;
