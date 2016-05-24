'use strict';

var mongoose = require('mongoose');

var bidSchema = new mongoose.Schema({
  name: {type: String},
  bidding: {type: Number},
  biddingTime: {type: Date},
  itemref: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
  userref: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

var Bid = mongoose.model('Bid', bidSchema);
module.exports = Bid;
