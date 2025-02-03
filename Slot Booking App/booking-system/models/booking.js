
const Sequelize = require('sequelize');
const sequelize = require('../utils/db');

const Booking = sequelize.define('booking', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  slot_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
});


module.exports = Booking;
