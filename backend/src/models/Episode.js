const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Episode = sequelize.define('Episode', {
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
  season: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  episodeNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  youtubeVideoId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  thumbnailUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  duration: {
    type: DataTypes.INTEGER, // in minutes
    allowNull: true
  },
  airDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  viewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  tags: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '[]',
    get() {
      const value = this.getDataValue('tags');
      if (!value) return [];
      try {
        return typeof value === 'string' ? JSON.parse(value) : value;
      } catch (error) {
        return [];
      }
    },
    set(value) {
      this.setDataValue('tags', JSON.stringify(value || []));
    }
  }
}, {
  tableName: 'episodes',
  timestamps: true
});

module.exports = Episode;
