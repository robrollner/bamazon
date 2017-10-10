var mysql = require('mysql');
var colors = require('colors');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'Miag1rl321',
    database: 'bamazon'
});

connection.connect(function(err) {
        if (err) throw err;
        console.log('connected as ID'.green + connection.threadId);
    }) //connection works



connection.end(); //end of connection