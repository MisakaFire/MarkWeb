'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      email: { type: Sequelize.STRING, unique: true },
      password: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    await queryInterface.addColumn('Bookmarks', 'UserId', {
      type: Sequelize.INTEGER,
      references: { model: 'Users', key: 'id' }
    });

    await queryInterface.addColumn('Categories', 'UserId', {
      type: Sequelize.INTEGER,
      references: { model: 'Users', key: 'id' }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Bookmarks', 'UserId');
    await queryInterface.removeColumn('Categories', 'UserId');
    await queryInterface.dropTable('Users');
  }
};
