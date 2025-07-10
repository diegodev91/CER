'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create Episodes table
    await queryInterface.createTable('episodes', {
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
      season: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      episodeNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      youtubeVideoId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      thumbnailUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      airDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      isPublished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      viewCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      tags: {
        type: Sequelize.JSON,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('episodes');
  }
};
