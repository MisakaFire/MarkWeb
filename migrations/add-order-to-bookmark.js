'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Bookmarks', 'order', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });
    
    // 初始化现有数据的order值
    await queryInterface.sequelize.query(`
      UPDATE Bookmarks 
      SET order = id
      WHERE order IS NULL
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Bookmarks', 'order');
  }
};
