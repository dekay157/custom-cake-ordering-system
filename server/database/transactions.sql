USE custom_cake_db;

-- 1. CUSTOM ORDER TABLE
CREATE TABLE IF NOT EXISTS custom_order (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    employee_id INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    delivery_date DATETIME,
    status VARCHAR(50) DEFAULT 'Pending'
);

-- 2. ORDER DETAIL TABLE
CREATE TABLE IF NOT EXISTS order_detail (
    detail_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    design_id INT NOT NULL,
    flavor_id INT NOT NULL,
    size_id INT NOT NULL,
    message_on_cake VARCHAR(255),
    quantity INT NOT NULL
);

-- 3. PAYMENT TABLE
CREATE TABLE IF NOT EXISTS payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    method VARCHAR(50) NOT NULL,
    downpayment DECIMAL(10,2) DEFAULT 0.00,
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP
);