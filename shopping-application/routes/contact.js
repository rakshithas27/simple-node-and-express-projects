//const path = require('path');
const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products');

router.get('/contactUs', productsController.getContact);
router.post('/contactUs', productsController.postContacts);

module.exports = router;