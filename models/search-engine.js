const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SearchEngine = sequelize.define('SearchEngine', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  baseUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  icon: {
    type: DataTypes.STRING
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

// 关联用户
SearchEngine.belongsTo(require('./user'));

module.exports = SearchEngine;
