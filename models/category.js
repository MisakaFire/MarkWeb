const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: '#666666'
  }
});

// models/category.js
Category.addHook('beforeDestroy', async (category) => {
  // 将关联书签设置为默认分类
  await Bookmark.update(
    { CategoryId: 1 }, // 假设存在默认分类
    { where: { CategoryId: category.id } }
  );
});

// 在字段定义后添加关联关系
Category.belongsTo(require('./user')); // ✅新增此行

module.exports = Category;
