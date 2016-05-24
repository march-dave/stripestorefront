var express = require('express');
var router = express.Router();

var User = require('../models/user');

//  auth.js
//  /auth  router

router.post('/login', (req, res) => {
  User.authenticate(req.body, (err, token) => {
    if(err) return res.status(400).send(err);

    res.send({ token: token });
  });
});

router.post('/signup', (req, res) => {
  User.register(req.body, (err, user) => {
    if(err) return res.status(400).send(err);

    var token = user.makeToken();
    res.send({ token: token });
  });
});

router.post('/github', (req, res) => {
  User.github(req.body, (err, token) => {
    res.send({token: token});
    // res.status(err ? 400 : 200).send(err, {token: token});
  })
});

module.exports = router;
