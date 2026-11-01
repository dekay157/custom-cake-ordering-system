
const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

// Serve public files, including the images folder
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const sizeRoutes = require('./Size');
const flavorRoutes = require('./Flavor');
const cakeDesignRoutes = require('./cake_design');

// API routes
app.use('/api/sizes', sizeRoutes);
app.use('/api/flavors', flavorRoutes);
app.use('/api/cake-designs', cakeDesignRoutes);

// Homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
