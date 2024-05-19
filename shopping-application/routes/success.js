//const path = require('path');
const express = require('express');

const router = express.Router();

const productController = require('../controllers/products');

router.get('/success', productController.getSuccess);
router.post('/success', productController.postSuccess);

module.exports = router;