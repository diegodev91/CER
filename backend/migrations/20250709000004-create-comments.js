'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create Comments table
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      authorName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      authorEmail: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contentType: {
        type: Sequelize.ENUM('episode', 'news'),
        allowNull: false
      },
      contentId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      isApproved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      ipAddress: {
        type: Sequelize.STRING,
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

    // Add indexes
    await queryInterface.addIndex('comments', ['contentType', 'contentId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comments');
  }
};
