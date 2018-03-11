var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var db = mongoose.connection;

// room
console.log("register room");
var roomSchema = new Schema({
  users: [String],
  message:[{message:String, username:String}]
});

var Room = mongoose.model('room', roomSchema);

// admin
var adminSchema = new Schema({
  username: String,
  password: String
});

var Admin = mongoose.model('admin', adminSchema);
