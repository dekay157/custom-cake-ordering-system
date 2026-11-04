
const express = require('express');
const path = require('path');
const db = require('../db');

const app = express();
const PORT = process.env.PORT || 3000;

const transactionsRoutes = require('./database/routes/transactions');


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/transactions', transactionsRoutes);

// Serve frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Test database connection
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }

    console.log('Connected to MySQL database!');
});

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Transactions API is working!' });
});



// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
