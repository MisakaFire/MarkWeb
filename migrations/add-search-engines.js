'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SearchEngines', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: Sequelize.STRING,
      baseUrl: Sequelize.STRING,
      icon: Sequelize.STRING,
      isDefault: Sequelize.BOOLEAN,
      UserId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    // 初始化默认引擎
    await queryInterface.bulkInsert('SearchEngines', [
      {
        name: '百度',
        baseUrl: 'https://www.baidu.com/s?wd={q}',
        icon: 'https://www.baidu.com/favicon.ico',
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '谷歌',
        baseUrl: 'https://www.google.com/search?q={q}',
        icon: 'https://www.google.com/favicon.ico',
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('SearchEngines');
  }
};
