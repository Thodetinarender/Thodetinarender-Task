const Sequelize = require('sequelize');
const sequelize = require('../utils/db'); // Your Sequelize instance
const User = require('./user'); // Import User model
const Slot = require('./slot'); // Import Slot model
const Booking = require('./booking'); // Import Booking model

// Define associations after models are loaded
User.hasMany(Booking, { foreignKey: 'user_id' });
Slot.hasMany(Booking, { foreignKey: 'slot_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });
Booking.belongsTo(Slot, { foreignKey: 'slot_id' });

module.exports = { User, Slot, Booking }; // Export models
