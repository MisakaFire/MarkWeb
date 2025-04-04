const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('password', bcrypt.hashSync(value, 10));
    }
  }
});

User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

User.prototype.updatePreferences = function(key, value) {
  const prefs = this.prefs || {};
  prefs[key] = value;
  return this.update({ prefs });
};

module.exports = User;
