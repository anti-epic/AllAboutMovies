'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {

  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Ratings';
    return queryInterface.bulkInsert(options, [
      {
        "movieId": 436270,
        "userId": 1,
        "stars": 10
      },
      {
        "movieId": 536554,
        "userId": 2,
        "stars": 5
      },
      {
        "movieId": 19995,
        "userId": 1,
        "stars": 1
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Ratings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
