var express = require('express');
var router = express.Router();
var async = require("async");
var mongoose = require('mongoose');

var Room = mongoose.model('room');
var Admin = mongoose.model('admin');

router.get('/add/:username/:password', function(req, res, next) {
  console.log("add");
  var newAdmin = new Admin({
     username: req.params.username,
     password: req.params.password
  });

  Admin.create(newAdmin, function (err, small) {
  if (err) return handleError(err);
   console.log("Post saved successfully");
  });
});

module.exports = router;
