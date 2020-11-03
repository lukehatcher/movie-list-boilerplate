const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

connection.connect((err) => {
    if (err) {
        console.log('error connection to mysql');
    } else {
        console.log('connected to mysql :D');
    }
})

// all above found in the npmjs mysql docs

module.exports = connection;


