'use strict';

// Define a model for designation table
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('categories', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    modified: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, {
    tableName: 'categories'
  });
  // Adding a class level method.
  Model.associate = function (models) {
    this.products = this.hasMany(models.products);
  };
  return Model;
};