
const express = require('express');
const router = express.Router();
const db = require('./db');

// GET all cake designs with category names
router.get('/', (req, res) => {
    const sql = `
        SELECT
            Cake_Design.design_id,
            Cake_Design.name,
            Cake_Design.image,
            Cake_Design.color,
            Cake_Design.pattern,
            Cake_Design.texture,
            Cake_Design.shape,
            Cake_Design.icing_type,
            Cake_Design.base_price,
            Cake_Design.category_id,
            Category.category_name
        FROM Cake_Design
        LEFT JOIN Category
        ON Cake_Design.category_id = Category.category_id
    `;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
});

// GET one cake design
router.get('/:id', (req, res) => {
    db.query(
        'SELECT * FROM Cake_Design WHERE design_id = ?',
        [req.params.id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    message: 'Cake design not found'
                });
            }

            res.json(results[0]);
        }
    );
});

// POST: Add cake design
router.post('/', (req, res) => {
    const {
        name,
        image,
        color,
        pattern,
        texture,
        shape,
        icing_type,
        base_price,
        category_id
    } = req.body;

    if (!name || base_price == null || Number(base_price) < 0) {
        return res.status(400).json({
            message: 'Valid cake design name and price are required.'
        });
    }

    const sql = `
        INSERT INTO Cake_Design
        (
            name,
            image,
            color,
            pattern,
            texture,
            shape,
            icing_type,
            base_price,
            category_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            name,
            image || null,
            color || null,
            pattern || null,
            texture || null,
            shape || null,
            icing_type || null,
            base_price,
            category_id || null
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: 'Cake design added successfully!',
                design_id: result.insertId
            });
        }
    );
});

// PUT: Update cake design
router.put('/:id', (req, res) => {
    const {
        name,
        image,
        color,
        pattern,
        texture,
        shape,
        icing_type,
        base_price,
        category_id
    } = req.body;

    const { id } = req.params;

    if (!name || base_price == null || Number(base_price) < 0) {
        return res.status(400).json({
            message: 'Valid cake design name and price are required.'
        });
    }

    const sql = `
        UPDATE Cake_Design
        SET
            name = ?,
            image = ?,
            color = ?,
            pattern = ?,
            texture = ?,
            shape = ?,
            icing_type = ?,
            base_price = ?,
            category_id = ?
        WHERE design_id = ?
    `;

    db.query(
        sql,
        [
            name,
            image || null,
            color || null,
            pattern || null,
            texture || null,
            shape || null,
            icing_type || null,
            base_price,
            category_id || null,
            id
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Cake design not found'
                });
            }

            res.json({
                message: 'Cake design updated successfully!'
            });
        }
    );
});

// DELETE: Delete cake design
router.delete('/:id', (req, res) => {
    db.query(
        'DELETE FROM Cake_Design WHERE design_id = ?',
        [req.params.id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Cake design not found'
                });
            }

            res.json({
                message: 'Cake design deleted successfully!'
            });
        }
    );
});

module.exports = router;
