'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        { name: 'Alex', email: '1@1', hashpass: bcrypt.hashSync('1', 10) },
        { name: 'Bob', email: '2@2', hashpass: bcrypt.hashSync('2', 10) },
        { name: 'Charlie', email: '3@3', hashpass: bcrypt.hashSync('3', 10) },
      ],
      {},
    );

    const resp = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await resp.json();
    await queryInterface.bulkInsert(
      'Posts',
      posts.map(({ title, body, userId }) => ({
        title,
        body,
        userId: (userId % 3) + 1,
      })),
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  },
};
