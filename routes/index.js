const express = require('express');
const router = express.Router();
const socket = require('../socketapi');
const {userJoin,getCurrentUser} = require('../utils/users');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});
router.get('/chat', function(req, res, next) {
  res.render('chat.ejs');
});
router.post('/chat', function(req, res, next) {
  res.render('chat.ejs');
  console.log(req.body.username)
});

module.exports = router;
