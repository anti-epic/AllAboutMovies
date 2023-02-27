'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {

  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Watchlists';
    return queryInterface.bulkInsert(options, [
      {
        "movieId": 315162,
        "userId": 1
      },
      {
        "movieId": 76600,
        "userId": 2
      },
      {
        "movieId": 76600,
        "userId": 1
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Watchlists';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
