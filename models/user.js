'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  // username: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  // image: { type: String, required: true },
  biography: { type: String, required: true },
  etc: { type: String, required: true }
});

var User = mongoose.model('User', userSchema);
module.exports = User;
