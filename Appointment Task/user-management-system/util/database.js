// util/database.js
const Sequelize = require('sequelize');

// Create a Sequelize instance to connect to MySQL database

const sequelize = new Sequelize('node-complete', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3307
  });

module.exports = sequelize;
