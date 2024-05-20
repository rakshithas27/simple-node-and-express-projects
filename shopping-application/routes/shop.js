//const path = require('path');
const express = require('express');

const router = express.Router();

const productController = require('../controllers/products');

router.get('/', productController.getShopPage);
//
router.get('/products', productController.getProducts);

module.exports = router;

