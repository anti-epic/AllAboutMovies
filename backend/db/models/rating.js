'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Rating extends Model { /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) { // define association here
            Rating.belongsTo(models.User, { foreignKey: 'userId' });
            Rating.belongsTo(models.Movie, {foreignKey: 'id'})
        }
    } Rating.init({
        stars: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 10
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        movieId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {sequelize, modelName: 'Rating'});
    return Rating;
};
