'use strict';

// Define a model for employee table
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('products', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdOn: {
      type: DataTypes.DATE,
      allowNull: false
    },
    expriedDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    availability: {
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
    tableName: 'products'
  });
  // Adding a class level method.
  Model.associate = function (models) {
    this.categoryId = this.belongsTo(models.categories);
  };

  return Model;
};