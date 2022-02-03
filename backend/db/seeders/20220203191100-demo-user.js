'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'Demo-Uno',
        email: 'user1@demo.com',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        username: 'Demogorgon',
        email: 'user2@demo.com',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        username: 'Demoniac',
        email: 'user3@demo.com',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-Uno', 'Demogorgon', 'Demoniac'] }
    }, {});
  }
};
