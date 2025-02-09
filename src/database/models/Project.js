'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
    
    Project.belongsToMany(models.Category, {
      through: 'ProjectCategory',
      foreignKey: 'idProject',
      as: 'categories'
    });
    */
     static associate(models) {
      Project.belongsTo(models.Status, { foreignKey: 'idStatus' });  
      Project.belongsToMany(models.Skill, {
        through: 'ProjectSkill',
        foreignKey: 'idProject',
        as: 'skills'
      });      
      Project.hasMany(models.Individual, { foreignKey: 'idProject' });
      Project.hasMany(models.Favorite, { foreignKey: 'idProject' });
      Project.belongsTo(models.Company, { foreignKey: 'idCompany' });
    }

  }
  Project.init(
    {
    title: { type : DataTypes.STRING,
    allownull : false },
    description: { type : DataTypes.TEXT,
      allowNull : true },
    createdAt: {type : DataTypes.DATE,
      allowNull : false  },
    updatedAt:{ type : DataTypes.DATE,
      allownull : false  },
    idStatus: { type : DataTypes.INTEGER,
      allowNull : true  },
    idCompany: { type : DataTypes.INTEGER,
      allowNull : true },
     }, {
    sequelize,
    modelName: 'Project',
  }
  );
  return Project;
};