
const express = require('express');
const router = express.Router();
const db = require('../db');

// ===================================
// CUSTOM ORDERS
// ===================================

// Get all orders
router.get('/orders', (req, res) => {
    const sql = 'SELECT * FROM Custom_Order ORDER BY order_id DESC';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
});

// Add an order
router.post('/orders', (req, res) => {
    const {
        customer_id,
        employee_id,
        delivery_date,
        status
    } = req.body;

    if (!customer_id) {
        return res.status(400).json({ error: 'Customer ID is required.' });
    }

    const sql = `
        INSERT INTO Custom_Order
        (customer_id, employee_id, delivery_date, status)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            customer_id,
            employee_id || null,
            delivery_date || null,
            status || 'Pending'
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: 'Order successfully saved!',
                order_id: result.insertId
            });
        }
    );
});


// ===================================
// ORDER DETAILS
// ===================================

// Get all order details
router.get('/order-details', (req, res) => {
    const sql = 'SELECT * FROM Order_Detail ORDER BY detail_id DESC';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
});

// Add order details
router.post('/order-details', (req, res) => {
    const {
        order_id,
        design_id,
        flavor_id,
        size_id,
        message_on_cake,
        quantity
    } = req.body;

    if (!order_id || !design_id || !flavor_id || !size_id || !quantity) {
        return res.status(400).json({
            error: 'Please complete all required order detail fields.'
        });
    }

    const sql = `
        INSERT INTO Order_Detail
        (order_id, design_id, flavor_id, size_id, message_on_cake, quantity)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            order_id,
            design_id,
            flavor_id,
            size_id,
            message_on_cake || null,
            quantity
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: 'Order details successfully saved!',
                detail_id: result.insertId
            });
        }
    );
});


// ===================================
// PAYMENTS
// ===================================

// Get all payments
router.get('/payments', (req, res) => {
    const sql = 'SELECT * FROM Payment ORDER BY payment_id DESC';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
});

// Add a payment
router.post('/payments', (req, res) => {
    const {
        order_id,
        total_amount,
        method,
        downpayment
    } = req.body;

    if (!order_id || total_amount === undefined || total_amount === '' || !method) {
        return res.status(400).json({
            error: 'Order ID, total amount, and payment method are required.'
        });
    }

    const total = Number(total_amount);
    const down = Number(downpayment || 0);

    if (!Number.isFinite(total) || !Number.isFinite(down) ||
        total <= 0 || down < 0 || down > total) {
        return res.status(400).json({
            error: 'Please enter valid payment amounts.'
        });
    }

    const sql = `
        INSERT INTO Payment
        (order_id, total_amount, method, downpayment)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [order_id, total, method, down],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: 'Payment successfully saved!',
                payment_id: result.insertId
            });
        }
    );
});

module.exports = router;
