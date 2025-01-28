// models/user.js
const Sequelize = require('sequelize');
const sequelize = require('../utils/db');
const Booking = require('./booking'); // Adjust path if necessary


const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING
});
// User Model
User.hasMany(Booking, { foreignKey: 'user_id' });

module.exports = User;
