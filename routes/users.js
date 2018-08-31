var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://prich:foxwoodrd1@ds159997.mlab.com:59997/prich_sandboxdb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected users");
});

var userSchema = new mongoose.Schema;
userSchema.add({
  uid: Number,
  username: String,
  password: String,
  level: Number
});
var User = mongoose.model('users', userSchema);



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('must respond with a resource');
});


// POST method route Login
router.post('/login', function(req, res, next) {
  User.findOne({
    username: req.body.user
  }).exec(function(err, user) {
if (err) {
  res.json('error login')
}
    if (user == null) {

      res.json("bad username");
    } else {
      if (bcrypt.compareSync(req.body.pass, user.password)) {
        res.json(user._id);
      } else {
        res.json("bad password");
      }
    }
  });
});


// POST method route Register
router.post('/register', function(req, res, next) {
  User.findOne({
    username: req.body.user
  }).exec(function(err, user) {
    if (user == null) {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(req.body.pass, salt);

      User.create({
        username: req.body.user,
        password: hash,
        level: 0
      }, function(err, uid) {
        res.json(uid);
      });

    } else {
      res.json("already a user");
    }
  });
});




module.exports = router;
