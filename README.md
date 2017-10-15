# Bamazon

## Instructions for my Bamazon application

### I created an app that stores items in a database and prompts a user to select and *purchase* those items. 


### In the command line the user enters **node bamazonCustomer.js**, the app will display what is currently in stock and available to purchase. 

* The user enters the item *ID* that they would like to purchase.
* The application will prompt the user to enter the *quantity* of the item they would like to purchase.
* The application will sum the total and display how much that purchase costs.
* The app will then prompt the user if they would like to make another purchase.

![bamazonCustomer.js in action gif](https://media.giphy.com/media/xT9IglFq465IMJKqnC/giphy.gif)


## The user may also enter the manager program and check inventory levels, as well as add new inventory items or order more of what is currently available.

### The user is prompted to select which manager *function* to run. If the **Show Full Counts** is selected the app will display the items currently listed. Unlike the customer view this will display items out of stock as well.  

![bamazonManager.js show full counts gif](https://media.giphy.com/media/xT9IgsgCwWk8UiRb5C/giphy.gif)

### The **Menu** will reload and prompt the user to enter a new *function*. 

### If the **Show Low Counts** is selected the app will display the items that currently have *5 or less* in stock.

![bamazonManager.js show low counts gif](https://media.giphy.com/media/l378dbtVzlKKo6W6k/giphy.gif)

### The **Menu** will reload and prompt the user to enter a new *function*. If the **Add Items** is selected the app will run through a series of prompts that asks the user which item ID they want to restock and the quantity of that item they want to add.

![bamazonManager.js add items gif](https://media.giphy.com/media/3ohhwDF5qFk6AVjCms/giphy.gif)

### The **Menu** will reload and prompt the user to enter a new *function*. If the **Add New Products** is selected the app will run through a series of prompts asking the user to enter the name of the new item: 

![bamazonManager.js add new item name gif](https://media.giphy.com/media/xT9IgK6GL7gVc9Os3m/giphy.gif)

### A ***sub menu*** that asks which department the item belongs in:

![bamazonManager.js add new item department gif](https://media.giphy.com/media/l1J9KHr8yf6u5VA6Q/giphy.gif)

### An are to enter a brief description: 

![bamazonManager.js add new item description gif](https://media.giphy.com/media/3ohhwjoipQVqdNAHVS/giphy.gif)

### How many to stock of the item:

![bamazonManager.js add new item quantity gif](https://media.giphy.com/media/3ohhwvSMkBuG2Jhxcc/giphy.gif)

### And the cost of the item:

![bamazonManager.js add new item price gif](https://media.giphy.com/media/l1J9vgBT61aafn1cs/giphy.gif)

### The **Menu** will reload and if the user selects ***quit*** the application will log out a message and disconect from the database. 

![bamazonManager.js quit gif](https://media.giphy.com/media/3ohhwGm6ihRpPgdmvK/giphy.gif)






