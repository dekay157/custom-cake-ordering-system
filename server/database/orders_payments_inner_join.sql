USE custom_cake_db;

SELECT
    co.order_id,
    co.customer_id,
    co.order_date,
    co.delivery_date,
    co.status,
    p.payment_id,
    p.total_amount,
    p.method,
    p.downpayment,
    p.payment_date
FROM custom_order AS co
INNER JOIN payment AS p
ON co.order_id = p.order_id;