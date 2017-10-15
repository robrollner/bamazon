var AsciiTable = require('ascii-table');
var mysql = require('mysql');
var fs = require('fs');
var colors = require('colors');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});

inventory();

function inventory() {
    inquirer.prompt([{
        name: 'inventory',
        message: 'Please select what you would like to do.'.cyan,
        type: 'list',
        choices: ['Show Full Counts'.green, 'Show Low Counts'.blue, 'Add Items'.red, 'Add New Products'.yellow, 'Quit'.grey]
    }]).then((result) => {
        switch (result.inventory) {

            case 'Show Full Counts'.green:
                setTimeout(showInventory, 750)
                break; //done

            case 'Show Low Counts'.blue:
                setTimeout(showLow, 750)
                break; //done

            case 'Add Items'.red:
                setTimeout(addItemPrompt, 750)
                break; //done

            case 'Add New Products'.yellow:
                setTimeout(newProduct, 750)
                break;

            case 'Quit'.grey:
                setTimeout(exit, 250)
                break;
        }
    })
}


function showInventory() {
    let table = new AsciiTable();
    table.setHeading('ID', 'Item', 'Department', 'Description', 'Price', 'Quantity');

    connection.query('SELECT * FROM products order by department', (err, res) => {
        console.log(`\n       This is what currently is available`.red);
        res.forEach((stock) => {
            table.addRow(stock.id, stock.item, stock.department, stock.itemDesc, stock.price, stock.quantity);
        })
        console.log(`${table.toString().magenta}\n`);
        setTimeout(inventory, 3000);
    });
}

function showLow() {
    let table = new AsciiTable();
    table.setHeading('ID', 'Item', 'Department', 'Description', 'Price', 'Quantity');

    connection.query('SELECT * FROM products WHERE Quantity <= 5', (err, res) => {
        console.log(`\n       This is what currently is available`.red);
        res.forEach((stock) => {
            table.addRow(stock.id, stock.item, stock.department, stock.itemDesc, stock.price, stock.quantity);
        })

        console.log(`${table.toString().cyan}\n`);
        setTimeout(inventory, 3000);
    });
}

function addItemPrompt() {
    inquirer.prompt([

        {
            name: 'newId',
            message: 'Please enter the Id # of the item you would like to order'.green,
            type: 'input',
            validate: (value) => !isNaN(value)
        },

        {
            name: 'newQuantityAdded',
            message: 'How many would you like to order?'.red,
            type: 'input',
            validate: (value) => !isNaN(value)

        }

    ]).then((stock) => {
        addItem(stock.newId, stock.newQuantityAdded);
    })
}

function addItem(newId, newQuantityAdded) {


    connection.query(`SELECT id, item, itemDesc, quantity, price FROM products WHERE id = ${newId}`, (err, result) => {
        if (err) throw err;
        var selectedItem = result[0].item;
        var quantity = result[0].quantity;

        var newQuantity = parseInt(quantity) + parseInt(newQuantityAdded);

        connection.query(`UPDATE products SET quantity = ${newQuantity} WHERE id = ${newId}`, (err, result) => {
            if (err) throw err;
            console.log(`\n\nInventory Updated!\n`.green);

            setTimeout(inventory, 1500);
        });
    });
}


function newProduct() {
    inquirer.prompt([

        {
            name: 'item',
            message: 'What product would you like to sell?'.green,
            type: 'input'
        },

        {
            name: 'department',
            message: `What department will this item be sold?`.yellow,
            type: 'list',
            choices: ['grocery', 'electronics', 'clothing']
        },

        {
            name: 'itemDesc',
            message: `Please briefly describe this item`.green,
            type: 'input'
        },

        {
            name: 'quantity',
            message: `How much this item do you want to stock?`.yellow,
            type: 'input',
            validate: (value) => !isNaN(value)
        },

        {
            name: 'price',
            message: `How much will this item cost?`.cyan,
            type: `input`,
            validate: (value) => !isNaN(value)
        }

    ]).then((ans) => {
        addProduct(ans.item, ans.department, ans.itemDesc, ans.quantity, ans.price);
    })
}

function addProduct(item, department, itemDesc, quantity, price) {
    let table = new AsciiTable();
    table.setHeading('ID', 'Item', 'Department', 'Description', 'Price', 'Quantity');

    connection.query(`INSERT INTO products (item, department, itemDesc, quantity, price) VALUES ('${item}', '${department}', '${itemDesc}', ${quantity}, '${price}')`, (err, res) => {
        if (err) throw err;
        setTimeout(inventory, 2500);

    })
}


function exit() {
    inquirer.prompt([{
        name: 'endProgram',
        message: 'Do you want to exit the program?'.red,
        type: 'confirm'
    }]).then((res) => {
        if (res.endProgram !== true) {
            setTimeout(inventory, 750)
        } else {
            console.log("Nice work boss!".cyan.bgWhite);
            connection.end();
        }
    })

}