const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if (!err && fileContent.length > 0) {
                cart = JSON.parse(fileContent);
            }

            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            if (existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct]; 
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            
            let cart = {products: [], totalPrice: 0};
            if (fileContent.length > 0) {
                cart = JSON.parse(fileContent);
            }
            const productIndex = cart.products.findIndex(prod => prod.id === id);
            if (productIndex === -1) {
                return;
            }
            const product = cart.products[productIndex];
            const productQty = product.qty;
            cart.products = cart.products.filter(prod => prod.id !== id);
            cart.totalPrice = cart.totalPrice - productPrice * productQty;

            fs.writeFile(p, JSON.stringify(cart), err => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if(err) {
                cb(null);
            } else {
                cb(cart);
            }
        })
    }
};
