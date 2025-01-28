const Sequelize = require('sequelize');
const sequelize = require('../utils/db');
const Booking = require('./booking'); // Ensure Booking is properly imported

const Slot = sequelize.define('slot', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  slot_time: Sequelize.DATE
});

// Define the association between Slot and Booking after models are defined
Slot.hasMany(Booking, { foreignKey: 'slot_id' });

module.exports = Slot;
