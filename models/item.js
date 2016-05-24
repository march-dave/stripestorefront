'use strict';

var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  image: {type: String},
  title: {type: String},
  detail: {type: String},
  bidtime: {type: Date},
  startingbid: {type: Number}
});

var Item = mongoose.model('Item', itemSchema);
module.exports = Item;
