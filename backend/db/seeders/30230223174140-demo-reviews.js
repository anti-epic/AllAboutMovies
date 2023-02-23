'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        "movieId": 315162,
        "userId": 1,
        "body": "1good movie--- from user 1(boots movie)"
      },
      {
        "movieId": 76600,
        "userId": 2,
        "body": "2movie--- from user 2(avatar movie)"
      },
      {
        "movieId": 76600,
        "userId": 1,
        "body": "3good--- from user 1 (avatar movie)"
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
