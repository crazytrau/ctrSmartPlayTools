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
      res.render('room', {
        title: 'chatroom',
        username:req.session.username,
        listRoom:result
      });
    });
  }else {
    res.redirect('/login');
  }
});

router.get('/addRoom', function(req, res, next) {
  if (req.session.username){
    var nUserName = req.session.username;
    var newRoom = new Room({
       users:[nUserName]
    });

    Room.create(newRoom, function (err, small) {
      if (err) return handleError(err);
      console.log("create room successfully"  + small);
      res.redirect("/");
    });
  }else {
    res.redirect('/login');
  }
});

router.get('/:room', function(req, res, next) {
  var room = req.params.room;
  if (req.session.username){
    Room.findOne({_id: req.params.room}, function(err, result) {
  	  if (err) res.status(500).send(err);
        var haveUser = false;
        for (var i=0;i<result.users.length;++i){
          console.log(result.users[i]+"==========>"+req.session.username);
            if (result.users[i] == req.session.username){
              haveUser = true;
            }
        }
      if(haveUser == false){
        Room.findOneAndUpdate({_id: result._id},
            {$push: {"users": req.session.username}},
            {safe: true, upsert: true},
            function(err, model) {
                console.log(err);
            }
        );
      }
      var message = result==null?{}:result.message;
      res.render('room', {
        title: 'room',
        username:req.session.username,
        _id:req.params.room,
        message:message
      });
	   });
  }else {
    res.redirect('/login');
  }
});

module.exports = router;
