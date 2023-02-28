'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    options.tableName = 'Movies';
    return queryInterface.bulkInsert(options, [
      {
        "id": 436270,
        title: 'Black Adam',
        image: 'https://image.tmdb.org/t/p/w500/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg'

      },
      {
        "id": 19995,
        title: 'Avatar',
        image: 'https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg'
      },
      {
        "id": 536554,
        title: 'M3GAN',
        image: 'https://image.tmdb.org/t/p/w500/d9nBoowhjiiYc4FBNtQkPY7c11H.jpg'
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Movies';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
