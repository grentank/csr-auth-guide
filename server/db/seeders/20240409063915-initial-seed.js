const { hashSync } = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        { email: '1@1', password: hashSync('1', 10), name: 'Alex' },
        { email: '2@2', password: hashSync('2', 10), name: 'Bob' },
        { email: '3@3', password: hashSync('3', 10), name: 'Carl' },
      ],
      {},
    );

    const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
      res.json(),
    );

    await queryInterface.bulkInsert(
      'Posts',
      posts.map((post) => ({
        title: post.title,
        body: post.body,
        userId: (post.userId % 3) + 1,
      })),
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Posts', null, {});
  },
};
