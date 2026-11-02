const db = require('./db');

db.connect((err) => {
    if (err) {
        console.error('Connection failed:', err.message);
        return;
    }

    console.log('Successfully connected to MySQL!');

    db.query('SELECT DATABASE() AS database_name', (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
        }

        db.end();
    });
});