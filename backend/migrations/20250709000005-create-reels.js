'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      youtubeVideoId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'youtube_video_id'
      },
      youtubeShortsUrl: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'youtube_shorts_url'
      },
      thumbnailUrl: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'thumbnail_url'
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'Duration in seconds'
      },
      viewCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        field: 'view_count'
      },
      likeCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        field: 'like_count'
      },
      isPublished: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        field: 'is_published'
      },
      isFeatured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        field: 'is_featured'
      },
      publishedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'published_at'
      },
      tags: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: []
      },
      category: {
        type: Sequelize.ENUM('funny', 'highlights', 'behind-scenes', 'community', 'other'),
        defaultValue: 'highlights'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    });

    // Índices para mejorar performance
    await queryInterface.addIndex('reels', ['is_published']);
    await queryInterface.addIndex('reels', ['is_featured']);
    await queryInterface.addIndex('reels', ['category']);
    await queryInterface.addIndex('reels', ['published_at']);
    await queryInterface.addIndex('reels', ['youtube_video_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reels');
  }
};
