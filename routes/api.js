var express = require('express');
var router = express.Router();

router.use('/items', require('./items'));
router.use('/users', require('./users'));
router.use('/payment', require('./payment'));
router.use('/bids', require('./bids'));
// router.use('/auth', require('./auth'));

module.exports = router;
