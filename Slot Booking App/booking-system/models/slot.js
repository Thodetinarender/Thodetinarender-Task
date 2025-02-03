
const Sequelize = require('sequelize');
const sequelize = require('../utils/db');

const Slot = sequelize.define('slot', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  slot_time: Sequelize.DATE
});

module.exports = Slot;

