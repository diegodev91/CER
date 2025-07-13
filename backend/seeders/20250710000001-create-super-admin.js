'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('SuperAdmin123!', 12);
    
    await queryInterface.bulkInsert('users', [{
      id: '00000000-0000-0000-0000-000000000001',
      email: 'admin@cuidandoelrancho.com',
      password: hashedPassword,
      firstName: 'Super',
      lastName: 'Admin',
      role: 'super_admin',
      isEmailVerified: true,
      isPhoneVerified: false,
      isActive: true,
      preferences: JSON.stringify({
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
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: 'admin@cuidandoelrancho.com'
    }, {});
  }
};
