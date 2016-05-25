var express = require('express');
var router = express.Router();

var Bid = require('../models/bid');

//   POST /api/payment
router.post('/', (req, res) => {

  var token = req.body.token;
  // var bidId = req.body.bidId;
  var bidId = '574395cb31b8e1d4045cb683';

  console.log('bidId', bidId);

  Bid.findById(bidId, (err, bid) => {

    // console.log('Router token', typeof token);
    console.log('bid', bid);

    if(err || !bid) {
      return res.status(400).send(err || { error: 'Bid not found.' })
    }

    // console.log('bid', bid);
    // console.log('token', token);

    bid.purchase(token, (err, charge) => {
      console.log('charge:', charge);
      // if(err) return res.status(400).send(err);

      // res.send(charge);
    });


  });
});

module.exports = router;
