const path = require('path');
const express = require('express');

const router = express.Router();

const rootDir = require('../util/path');

router.get('/contactUs', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'contact.html'));
})

router.post('/contactUs', (req, res, next) => {
    console.log(req.body);
    res.redirect('/success');
})

module.exports = router;