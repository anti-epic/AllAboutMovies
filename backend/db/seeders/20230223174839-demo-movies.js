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
        "id": 315162

      },
      {
        "id": 436270
      },
      {
        "id": 76600
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
