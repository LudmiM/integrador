'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Freelancer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Freelancer.belongsTo(models.Specialty, { foreignKey: 'idSpecialty' });
      Freelancer.belongsTo(models.Knowledge, { foreignKey: 'idKnowledge' });
      Freelancer.belongsTo(models.User, { foreignKey: 'idUser' });
      Freelancer.belongsToMany(models.Individual, {
        through: models.Application,
        foreignKey: 'idFreelancer'
      });
      Freelancer.belongsToMany(models.Skill, {
        through: 'FreelancerSkill',
        foreignKey: 'idFreelancer',
        as: 'skills'
      });
      Freelancer.hasMany(models.Favorite, { foreignKey: 'idFreelancer' })
      
    }
  }
  Freelancer.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    country: DataTypes.STRING,
    mainImage: DataTypes.STRING,
    phoneCode: DataTypes.INTEGER,
    phone: DataTypes.INTEGER,
    about: DataTypes.TEXT,
    hourValue: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER,
    idSpecialty: DataTypes.INTEGER,
    idKnowledge: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Freelancer',
    timestamps: false, 
  });
  return Freelancer;
};