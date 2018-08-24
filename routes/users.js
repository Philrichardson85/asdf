var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://prich:foxwoodrd1@ds159997.mlab.com:59997/prich_sandboxdb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {  console.log("connected yea yea"); });

var userSchema = new mongoose.Schema;
userSchema.add({uid: Number, username: String, password: String, level: Number});
var User = mongoose.model('users', userSchema);



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('must respond with a resource');
});


// POST method route Login
router.post('/login', function (req, res, next) {
  User.findOne({ username: req.body.user, password:req.body.pass, }).exec(function (err, user) {
        res.json(user);
  });
});


// POST method route Register
router.post('/register', function (req, res, next) {
  User.findOne({ username: req.body.user }).exec(function (err, user) {
    if (user == null) {
      User.create({ username: req.body.user, password:req.body.pass, level: 0 },function(err, uid){
        res.json(uid);
      });
    } else {
      res.json(null);
    }
  });
});




module.exports = router;
