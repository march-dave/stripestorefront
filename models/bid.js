'use strict';

var mongoose = require('mongoose');
var stripe = require('stripe')(process.env.STRIPE_API_SECRET);

var bidSchema = new mongoose.Schema({
  name: {type: String},
  bidding: {type: Number},
  biddingTime: {type: Date},
  itemref: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
  userref: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

bidSchema.methods.purchase = function(token, cb) {

  // console.log('token.id', token.id);

  stripe.charges.create({
    amount: this.value * 100,
    currency: "usd",
    source: token.id, // obtained with Stripe.js
    description: "description field"
    // description: `Charge for ${token.email}: ${this.variety}`
  }, cb);
};

var Bid = mongoose.model('Bid', bidSchema);
module.exports = Bid;
