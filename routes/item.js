const express = require('express');

const Item = require('../models/item');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Item get endpoint reached succesfully'
    });
});

module.exports = router;