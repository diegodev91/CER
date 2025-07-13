'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('comments', 'userId', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    // Add index for userId
    await queryInterface.addIndex('comments', ['userId']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('comments', 'userId');
  }
};
