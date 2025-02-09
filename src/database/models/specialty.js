'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Specialty.belongsTo(models.Category, { foreignKey: 'idCategory' });
    }
  }
  Specialty.init({
    name: DataTypes.STRING,
    idCategory: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Specialty', 
  });
  return Specialty;
};