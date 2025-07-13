'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_sessions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      refreshToken: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      refreshExpiresAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      ipAddress: {
        type: Sequelize.STRING,
        allowNull: true
      },
      userAgent: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      device: {
        type: Sequelize.STRING,
        allowNull: true
      },
      location: {
        type: Sequelize.JSON,
        allowNull: true
      },
      isRevoked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      revokedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      revokedBy: {
        type: Sequelize.UUID,
        allowNull: true
      },
      lastActivity: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
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
    await queryInterface.addIndex('user_sessions', ['userId']);
    await queryInterface.addIndex('user_sessions', ['token'], { unique: true });
    await queryInterface.addIndex('user_sessions', ['refreshToken'], { unique: true });
    await queryInterface.addIndex('user_sessions', ['expiresAt']);
    await queryInterface.addIndex('user_sessions', ['isRevoked']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_sessions');
  }
};
