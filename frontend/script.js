
// ===================================
// TRANSACTIONS SYSTEM
// ===================================

// Temporary sample data
let orders = [];
let orderDetails = [];
let payments = [];

// Automatically generated IDs
let orderID = 1;
let detailID = 1;
let paymentID = 1;


// ===================================
// CUSTOM ORDERS
// ===================================

const orderForm = document.getElementById("order-form");

orderForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const order = {
        order_id: orderID++,
        customer_id: document.getElementById("customer_id").value,
        employee_id: document.getElementById("employee_id").value,
        order_date: new Date().toLocaleString(),
        delivery_date: document.getElementById("delivery_date").value,
        status: document.getElementById("status").value
    };

    orders.push(order);

    displayOrders();
    updateDashboard();

    orderForm.reset();

    alert("Order successfully added!");
});

function displayOrders() {
    const table = document.getElementById("orders-table");

    table.innerHTML = "";

    orders.forEach(order => {
        table.innerHTML += `
            <tr>
                <td>${order.order_id}</td>
                <td>${order.customer_id}</td>
                <td>${order.employee_id}</td>
                <td>${order.order_date}</td>
                <td>${order.delivery_date || "Not set"}</td>
                <td>${order.status}</td>
            </tr>
        `;
    });
}


// ===================================
// ORDER DETAILS
// ===================================

const detailsForm = document.getElementById("details-form");

detailsForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const detail = {
        detail_id: detailID++,
        order_id: document.getElementById("order_id").value,
        design_id: document.getElementById("design_id").value,
        flavor_id: document.getElementById("flavor_id").value,
        size_id: document.getElementById("size_id").value,
        message_on_cake: document.getElementById("message_on_cake").value,
        quantity: document.getElementById("quantity").value
    };

    orderDetails.push(detail);

    displayOrderDetails();

    detailsForm.reset();

    alert("Order details successfully added!");
});

function displayOrderDetails() {
    const table = document.getElementById("details-table");

    table.innerHTML = "";

    orderDetails.forEach(detail => {
        table.innerHTML += `
            <tr>
                <td>${detail.detail_id}</td>
                <td>${detail.order_id}</td>
                <td>${detail.design_id}</td>
                <td>${detail.flavor_id}</td>
                <td>${detail.size_id}</td>
                <td>${detail.message_on_cake || "None"}</td>
                <td>${detail.quantity}</td>
            </tr>
        `;
    });
}


// ===================================
// PAYMENTS
// ===================================

const paymentForm = document.getElementById("payment-form");

paymentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const payment = {
        payment_id: paymentID++,
        order_id: document.getElementById("payment_order_id").value,
        total_amount: Number(document.getElementById("total_amount").value),
        method: document.getElementById("method").value,
        downpayment: Number(document.getElementById("downpayment").value),
        payment_date: new Date().toLocaleString()
    };

    if (payment.downpayment > payment.total_amount) {
        alert("Downpayment cannot exceed the total amount.");
        return;
    }

    payments.push(payment);

    displayPayments();
    updateDashboard();

    paymentForm.reset();

    alert("Payment successfully recorded!");
});

function displayPayments() {
    const table = document.getElementById("payments-table");

    table.innerHTML = "";

    payments.forEach(payment => {
        table.innerHTML += `
            <tr>
                <td>${payment.payment_id}</td>
                <td>${payment.order_id}</td>
                <td>₱${payment.total_amount.toFixed(2)}</td>
                <td>${payment.method}</td>
                <td>₱${payment.downpayment.toFixed(2)}</td>
                <td>${payment.payment_date}</td>
            </tr>
        `;
    });
}


// ===================================
// DASHBOARD
// ===================================

function updateDashboard() {
    console.log("Total Orders:", orders.length);
    console.log("Total Order Details:", orderDetails.length);
    console.log("Total Payments:", payments.length);
}
