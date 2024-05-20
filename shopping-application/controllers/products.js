const path = require('path');
const rootDir = require('../util/path');

const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
}

exports.postAddProduct = (req, res, next) => {
    console.log(req.body);
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getShopPage = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.json(products);
    }); 
    //res.sendFile(path.join(rootDir, 'views', 'shop.html'));
}

exports.getContact = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'contact.html'));
}

exports.postContacts = (req, res, next) => {
    console.log(req.body);
    res.redirect('/success');
}

exports.getSuccess = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'success.html'));
}

exports.postSuccess = (req, res, next) => {
    res.redirect('/');
}

