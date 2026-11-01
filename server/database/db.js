const mysql = require('mysql2');
const path = require('path');

require('dotenv').config({
    path: path.resolve(__dirname, '../../.env')
});

console.log('Host:', Boolean(process.env.DB_HOST));
console.log('User:', Boolean(process.env.DB_USER));
console.log('Password:', Boolean(process.env.DB_PASSWORD));
console.log('Database:', Boolean(process.env.DB_NAME));

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT)
});

module.exports = db;