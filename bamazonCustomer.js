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
    password: '',
    database: 'bamazon'
});


customerInquiry();


function customerInquiry() {
    let table = new AsciiTable();
    table.setHeading('ID', 'Item', 'Department', 'Description', 'Price', 'Quantity');

    connection.query('SELECT * FROM products WHERE quantity > 0', (err, res) => {
        console.log(`\n       See what's in stock below!`.red);
        res.forEach((inventory) => {
            table.addRow(inventory.id, inventory.item, inventory.department, inventory.itemDesc, inventory.price, inventory.quantity);
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
            setTimeout(customerInquiry, 1500);

        } else {
            var total = quota * res[0].price;
            console.log(`Great choice! Your purchase costs $${total}`.magenta);
            buy(id, res[0].quantity, quota, total);
            setTimeout(repurchase, 1500);
        }
    })
}

function buy(id, itemQuota, customerQuota, total) {
    var qty = itemQuota - customerQuota;
    updateInventory(id, qty, total);
};

function updateInventory(id, quota, total) {
    connection.query(`UPDATE products SET quantity=${quota} WHERE id=${id}`, (err, res) => {
        if (err) throw err;
    })
}


function repurchase() {
    inquirer.prompt([{
        name: 'more',
        message: 'Would you like to make another purchase?'.green,
        type: 'confirm'
    }]).then((result) => {
        if (result.more === true) {
            console.log("Awesome!");
            setTimeout(customerInquiry, 750);
        } else {
            setTimeout(exit, 750);
        }
    })
}

function exit() {

    console.log("Thank you for shopping with RobCo, please come again!".cyan);
    connection.end();
}