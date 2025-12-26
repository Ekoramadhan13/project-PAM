'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('users', [{
      name: 'Admin',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('admin123', 10),
      role: 'ADMIN',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('users', { email: 'admin@gmail.com' });
  }
};
