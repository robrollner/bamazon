var AsciiTable = require('ascii-table');
var mysql = require('mysql');
var fs = require('fs');
var colors = require('colors');
var inquirer = require('inquirer');
// var inventory = require('./inventory.json');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'Miag1rl321',
    database: 'bamazon'
});


customerInquiry();


function customerInquiry() {
    let table = new AsciiTable();
    table.setHeading('ID', 'Item', 'Description', 'Price', 'Quantity');

    connection.query('SELECT * FROM products', (err, res) => {
        console.log(`\n       See what's in stock below!`.red);
        res.forEach((inventory) => {
            table.addRow(inventory.id, inventory.item, inventory.itemDesc, inventory.price, inventory.quantity);
        })
        console.log(`${table.toString().green}\n`);

        setTimeout(purchase, 700);
    });
}

function purchase(item) {
    inquirer.prompt([{
        name: 'id',
        message: 'Please enter the id # for the item you would like to purchase'.red,
        validate: (value) => !isNaN(value)
    }, {
        name: 'quota',
        message: 'How many of this item would you like to purchase?'.yellow,
        validate: (value) => !isNaN(value)
    }]).then((result) => {
        checkout(result.id, result.quota);
    })

}

function checkout(id, quota) {
    connection.query(`SELECT * FROM products WHERE id= ${id}`, function(err, res) {
        if (err) throw err;
        // exit();

        if (quota > res[0].quantity) {
            console.log("We're sorry, we currently do not have the stock to fill your order.");
            customerInquiry();
        } else {
            var total = quota * res[0].price;
            console.log(`Great choice! Your purchase costs ${total}`);
            setTimeout(exit, 1500);
        }
    })
}


function exit() {


    console.log("Thank you for shopping with RobCo, please come again");
    connection.end();
}