var express = require('express');
var router = express.Router();
var async = require("async");
var mongoose = require('mongoose');

var Room = mongoose.model('room');
var Admin = mongoose.model('admin');

router.get('/pvp', function(req, res, next) {
  if (req.session.username){
    //res.redirect('/room/591d5c6afe1b2ca2c0b4116a');
    Room.find({}, function(err, result) {
      res.render('tictactoe/pvp', {
        title: 'tictactoes',
        username:req.session.username,
        listRoom:result
      });
    });
  }else {
    res.redirect('/login');
  }
});

module.exports = router;
