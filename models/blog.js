'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  blog.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    Node_JS: DataTypes.BOOLEAN,
    React_JS: DataTypes.BOOLEAN,
    Next_JS: DataTypes.BOOLEAN,
    Typescript: DataTypes.BOOLEAN,

  }, {
    sequelize,
    modelName: 'blog',
  });
  return blog;
};