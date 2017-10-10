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

connection.connect(function(err) {
    if (err) throw err;
    console.log('connected as ID'.green + connection.threadId);
    customerInquiry();
});
//connection works

function customerInquiry() {
    inquirer.prompt([{
        type: 'list',
        message: 'Which department is your item located?'.america,
        choices: ['grocery'.bgCyan.yellow, 'electronics'.bgYellow.cyan, 'clothing'.bgCyan.yellow, 'exit'.bgYellow.cyan],
        name: 'departments'
    }]).then((dept) => {
        switch (dept.departments) {
            case "grocery":
                grocery();
                break;

            case 'electronics':
                electronics();
                break;

            case 'clothing':
                clothing();
                break;

            case 'exit':
                exit();
                break;
        }
    })
}

function grocery() {
    inquirer.prompt([{
        name: "food",
        type: 'list',
        message: "How can we help you?",
        choices: ['ice cream', 'wine', 'whiskey', 'amaro']
    }]).then((answer) => {

        // var items = answer;
        // var query = `SELECT * FROM products WHERE ?`;
        // connection.query(query, { food: answer.food }, function(err, res) {
        //         for (var i = 0; i < res.length; i++) {
        //             console.log(`see if it works`);
        //         }
        //     })
        //item in ('${items}')

    })
    logIt();
}

function electronics() {
    inquirer.prompt([{

    }])

    logIt();
}

function clothing() {
    inquirer.prompt([{

    }])
    logIt();
}

function exit() {
    // if (err) throw err;
    logIt();
    console.log("Thank you for shopping with RobCo, please come again".italic.cyan);
}


connection.end(); //end of connection

function logIt(buyerResults) {
    console.log(buyerResults);
    var now = new Date();
    fs.appendFile('inventory.json', "\n" + now + ": " + buyerResults, function(err, data) {
        if (err) throw err;
    });
}