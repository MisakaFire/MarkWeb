const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const BackupConfig = sequelize.define('BackupConfig', {
  provider: {
    type: DataTypes.ENUM('webdav', 'dropbox', 'google'),
    defaultValue: 'webdav'
  },
  endpoint: DataTypes.STRING,
  username: DataTypes.STRING,
  encryptedPassword: DataTypes.TEXT,
  frequency: {
    type: DataTypes.ENUM('daily', 'weekly', 'monthly'),
    defaultValue: 'daily'
  },
  lastBackup: DataTypes.DATE
});

BackupConfig.belongsTo(User);
User.hasOne(BackupConfig);
