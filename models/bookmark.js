const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bookmark = sequelize.define('Bookmark', {
  // ...原有字段保持不变
});

// 添加关联关系
Bookmark.belongsTo(require('./category'));

const Bookmark = sequelize.define('Bookmark', {
  // ...原有字段保持不变
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

// 在字段定义后添加关联关系
Bookmark.belongsTo(require('./user')); // ✅新增此行

module.exports = Bookmark;
