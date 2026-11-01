const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ilovefemboyz12345', // Put your MySQL password here
    database: 'custom_cake_ordering_system'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }
    console.log('MySQL connected successfully!');
});

module.exports = db;