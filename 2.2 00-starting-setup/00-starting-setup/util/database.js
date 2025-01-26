const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3307,  
    user:'root',
    database: 'node-complete',
    password: 'root'
});

module.exports = pool.promise();