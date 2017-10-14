DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL auto_increment,
   item VARCHAR(100) NULL,
   department varchar(100) NULL,
   itemDesc VARCHAR(255) NULL,
   quantity INT NULL,
   price DECIMAL(10,2) NULL,
  PRIMARY KEY (id)
);

UPDATE products SET quantity = 50 WHERE id = 1;

UPDATE products SET price = 1600.00 where id = 3;