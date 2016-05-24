var express = require('express');
var router = express.Router();

var Bid = require('../models/bid');

//   POST /api/payment
router.post('/', (req, res) => {

  var token = req.body.token;
  var bidId = req.body.bidId;

  Bid.findById(bidId, (err, bid) => {
    if(err || !bid) {
      return res.status(400).send(err || { error: 'Bid not found.' })
    }

    brd.purchase(token, (err, charge) => {
      if(err) return res.status(400).send(err);
      console.log('charge:', charge);

      res.send(charge);
    });
  });
});

module.exports = router;
