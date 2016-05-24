'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var request = require('request');
var qs = require('querystring');

const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET');
}

var userSchema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
  github: String  // github user id
});

// IT'S MIDDLEWARE!!
userSchema.statics.isLoggedIn = function(req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.header('Authorization').split(' ')[1];

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if(err) return res.status(401).send({error: 'Must be authenticated.'});

    User
      .findById(payload._id)
      .select({password: false})
      .exec((err, user) => {
        if(err || !user) {
          return res.status(400).send(err || {error: 'User not found.'});
        }

        req.user = user;
        next();
      });
  });
};

userSchema.statics.register = function(userObj, cb) {
  console.log('userObj:', userObj);
  User.findOne({email: userObj.email}, (err, dbUser) => {
    console.log(err, dbUser);
    if(err || dbUser) return cb(err || { error: 'Email not available.' })

    bcrypt.hash(userObj.password, 12, (err, hash) => {
      if(err) return cb(err);

      var user = new User({
        email: userObj.email,
        password: hash
      });

      console.log('user to save:', user);

      user.save(cb);
    });
  });
};

userSchema.statics.authenticate = function(userObj, cb) {
  this.findOne({email: userObj.email}, (err, dbUser) => {
    if(err || !dbUser) return cb(err || { error: 'Login failed. Email or password incorrect.' });

    bcrypt.compare(userObj.password, dbUser.password, (err, isGood) => {
      if(err || !isGood) return cb(err || { error: 'Login failed. Email or password incorrect.' });

      var token = dbUser.makeToken();

      cb(null, token);
    });
  });
};


userSchema.statics.github = function(userObj, cb) {
  var accessTokenUrl = 'https://github.com/login/oauth/access_token';
  var userApiUrl = 'https://api.github.com/user';

  var params = {
    code: userObj.code,
    client_id: userObj.clientId,
    redirect_uri: userObj.redirectUri,
    client_secret: process.env.GITHUB_SECRET
  };

  // use code to request access token
  request.get({ url: accessTokenUrl, qs: params }, (err, response, body) => {
    if(err) return cb(err);

    var accessToken = qs.parse(body);
    var headers = { 'User-Agent': 'satellizer' };

    //  use access token to request user profile
    request.get({ url: userApiUrl, qs: accessToken, headers: headers, json: true }, (err, response, profile) => {
      if(err) return cb(err);

      User.findOne({ github: profile.id }, (err, existingUser) => {
        if(err) return cb(err);

        if(existingUser) {
          var token = existingUser.makeToken();
          cb(null, token);

        } else {
          var user = new User();
          user.github = profile.id;
          user.save((err, savedUser) => {
            if(err) return cb(err);
            var token = savedUser.makeToken();
            cb(null, token);
          });
        }
      });
    });
  });
}

userSchema.methods.makeToken = function() {
  var token = jwt.sign({
    _id: this._id,
    exp: moment().add(1, 'day').unix() // in seconds
  }, JWT_SECRET);
  return token;
};

var User = mongoose.model('User', userSchema);

module.exports = User;



// 'use strict';
//
// var mongoose = require('mongoose');
//
// var userSchema = new mongoose.Schema({
//   biography: { type: String, required: true },
//   etc: { type: String, required: true }
// });
//
// var User = mongoose.model('User', userSchema);
// module.exports = User;
