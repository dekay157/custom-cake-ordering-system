
const express = require('express');
const router = express.Router();
const db = require('./db');

// Display all sizes
router.get('/', (req, res) => {
    db.query('SELECT * FROM Size', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add size
router.post('/', (req, res) => {
    const { name, price } = req.body;

    if (!name || price == null || Number(price) < 0) {
        return res.status(400).json({ message: 'Enter a valid size and price.' });
    }

    db.query(
        'INSERT INTO Size (name, price) VALUES (?, ?)',
        [name, price],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            res.status(201).json({
                message: 'Size added successfully!',
                size_id: result.insertId
            });
        }
    );
});

// Update size
router.put('/:id', (req, res) => {
    const { name, price } = req.body;

    db.query(
        'UPDATE Size SET name = ?, price = ? WHERE size_id = ?',
        [name, price, req.params.id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Size not found.' });
            }

            res.json({ message: 'Size updated successfully!' });
        }
    );
});

// Delete size
router.delete('/:id', (req, res) => {
    db.query(
        'DELETE FROM Size WHERE size_id = ?',
        [req.params.id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Size not found.' });
            }

            res.json({ message: 'Size deleted successfully!' });
        }
    );
});

module.exports = router;
