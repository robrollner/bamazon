# bamazon

## Instructions for bamazon app

I created an app that stores items in a database and prompts a user to select and *purchase* those items. 


In the command line the user enters **node bamazonCustomer.js**, the app will display what is currently in stock and available to purchase. 

1. The user enters the item *ID* that they would like to purchase.
2. The application will prompt the user to enter the *quantity* of the item they would like to purchase.
3. The application will sum the total and display how much that purchase costs.
4. The app will then prompt the user if they would like to make another purchase.

![bamazonCustomer.js in action gif](https://media.giphy.com/media/xT9IglFq465IMJKqnC/giphy.gif)


The user may also enter the manager program and check inventory levels, as well as add new inventory items or order more of what is currently available.

The user is prompted to select which manager *function* to run. If the **Show Full Counts** is selected the app will display the items currently listed. Unlike the customer view this will display items out of stock as well.  

![bamazonManager.js show full counts gif](https://media.giphy.com/media/xT9IgsgCwWk8UiRb5C/giphy.gif)

The **Menu** will reload and prompt the user to enter a new *function*. If the **Show Low Counts** is selected the app will display the items that currently have *5 or less* in their inventory in stock.




