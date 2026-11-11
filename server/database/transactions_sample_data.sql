USE custom_cake_db;

-- CUSTOM ORDER
INSERT INTO custom_order
(customer_id, employee_id, order_date, delivery_date, status)
VALUES
(1, 1, NOW(), '2026-11-05', 'Pending'),
(2, 2, NOW(), '2026-11-06', 'Baking'),
(3, 1, NOW(), '2026-11-07', 'Done');

-- ORDER DETAIL
INSERT INTO order_detail
(order_id, design_id, flavor_id, size_id, message_on_cake, quantity)
VALUES
(1, 1, 1, 1, 'Happy Birthday!', 1),
(2, 2, 2, 2, 'Congratulations!', 2),
(3, 3, 3, 3, 'Best Wishes!', 1);

-- PAYMENT
INSERT INTO payment
(order_id, total_amount, method, downpayment)
VALUES
(1, 1500.00, 'GCash', 500.00),
(2, 2500.00, 'Cash', 1000.00),
(3, 3500.00, 'GCash', 1500.00);

