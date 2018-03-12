var express = require('express');
var router = express.Router();
var async = require("async");
var mongoose = require('mongoose');

var Room = mongoose.model('room');
var Admin = mongoose.model('admin');

router.get('/', function(req, res, next) {
  if (req.session.username){
    //res.redirect('/room/591d5c6afe1b2ca2c0b4116a');
    Room.find({}, function(err, result) {
      res.render('index', {
        title: 'chatroom',
        username:req.session.username,
        listRoom:result
      });
    });
  }else {
    res.redirect('/login');
  }
});

router.get('/login', function(req, res, next) {
  	if (req.session.username){
      res.redirect('/');
    }else{
      res.render('login', { title: 'ctr' });
    }
});
router.post('/login', function(req, res, next) {
  if (req.session.username){
    res.redirect('login');
  }else{
    Admin.findOne({username: req.body.username}, function(err, result) {
  	  if (err) res.status(500).send(err);
      console.log(result)
  	  if (result && req.body.password == result.password){
        req.session.username = req.body.username;
        req.session._id = result._id;
        res.redirect('/');
      }
  	  else{
        res.redirect('/login');
      }
	   });
  }
});


module.exports = router;
