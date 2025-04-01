const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bookmark = sequelize.define('Bookmark', {
  // ...原有字段保持不变
});

// 添加关联关系
Bookmark.belongsTo(require('./category'));

module.exports = Bookmark;
