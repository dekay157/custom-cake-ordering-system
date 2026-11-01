
const express = require('express');
const router = express.Router();
const db = require('./db');

// GET: Display all flavors
router.get('/', (req, res) => {
    db.query('SELECT * FROM Flavor', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
});

// GET: Display one flavor
router.get('/:id', (req, res) => {
    db.query(
        'SELECT * FROM Flavor WHERE flavor_id = ?',
        [req.params.id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'Flavor not found' });
            }

            res.json(results[0]);
        }
    );
});

// POST: Add a flavor
router.post('/', (req, res) => {
    const { name, price_add, image } = req.body;

    if (!name || price_add == null || Number(price_add) < 0) {
        return res.status(400).json({
            message: 'Valid flavor name and additional price are required.'
        });
    }

    db.query(
        'INSERT INTO Flavor (name, price_add, image) VALUES (?, ?, ?)',
        [name, price_add, image || null],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: 'Flavor added successfully!',
                flavor_id: result.insertId
            });
        }
    );
});

// PUT: Update a flavor
router.put('/:id', (req, res) => {
    const { name, price_add, image } = req.body;

    if (!name || price_add == null || Number(price_add) < 0) {
        return res.status(400).json({
            message: 'Valid flavor name and additional price are required.'
        });
    }

    db.query(
        'UPDATE Flavor SET name = ?, price_add = ?, image = ? WHERE flavor_id = ?',
        [name, price_add, image || null, req.params.id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Flavor not found' });
            }

            res.json({ message: 'Flavor updated successfully!' });
        }
    );
});

// DELETE: Delete a flavor
router.delete('/:id', (req, res) => {
    db.query(
        'DELETE FROM Flavor WHERE flavor_id = ?',
        [req.params.id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Flavor not found' });
            }

            res.json({ message: 'Flavor deleted successfully!' });
        }
    );
});

module.exports = router;
