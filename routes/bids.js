var express = require('express');
var router = express.Router();

var Bid = require('../models/bid');
var Item = require('../models/item');
var User = require('../models/user');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.route('/')
    .get((req, res) => {
      Bid.find({}, (err, bids) => {
          if(err) {
            res.status(400).send(err);
          } else {
            res.send(bids);
          }
        });
    })
    .post((req, res) => {
      var bid = new Bid(req.body);
      bid.save((err, savedBid) => {
        res.status(err ? 400 : 200).send(err || savedBid);
      });
  });

  // router.put('/addBid', (req, res) => {
  router.put('/:userref/addBid/:itemref', (req, res) => {

      var bid = new Bid();
      bid.itemref = req.params.userref;
      bid.userref = req.params.itemref;
      bid.bidding = req.body;
      bid.name = 'test Name';

      bid.save((err, savedBid) => {
        res.status(err ? 400 : 200).send(err);
      });
  });

  router.post('/addBid', (req, res) => {
      var bid = new Bid(req.body);

      console.log('req.body', bid);

      bid.save((err, savedBid) => {
        res.status(err ? 400 : 200).send(err);
      });
  });

module.exports = router;
