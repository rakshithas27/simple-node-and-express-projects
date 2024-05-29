const db = require('../util/database');
const Cart = require('./cart');




module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  /*save() {
    return db.execute('INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
  [this.title, this.price, this.description, this.imageUrl])
  }*/

  save() {
    // Check if the product already has an ID (indicating it exists in the database)
    if (this.id) {
      // If the product has an ID, execute an UPDATE statement
      return db.execute('UPDATE products SET title = ?, price = ?, description = ?, imageUrl = ? WHERE id = ?',
        [this.title, this.price, this.description, this.imageUrl, this.id]);
    } else {
      // If the product does not have an ID, execute an INSERT statement
      return db.execute('INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
        [this.title, this.price, this.description, this.imageUrl]);
    }
  }
  

  static deleteById(id) {
    return db.execute('DELETE FROM products WHERE products.id = ?', [id])
    
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products')
  }

  static findById(id) {
   return db.execute('SELECT * FROM products WHERE products.id = ?',[id])
  }
};
