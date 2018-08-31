var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://prich:foxwoodrd1@ds159997.mlab.com:59997/prich_sandboxdb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {  console.log("connected verses"); });

var vSchema = new mongoose.Schema;
vSchema.add({uid: String ,title: String,lines: String});
var Verse = mongoose.model('verses', vSchema);


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json('must respond with a resource');
});



/////////////////////////////////////////
// POST method route C
router.post('/save', function (req, res, next) {
  //save to DB new or overwrite if exsits
  Verse.findOne({'title': req.body.title, uid: req.body.uid},  function(err, test){
    if (test == null) {
      Verse.create({uid: req.body.uid, title: req.body.title, lines: req.body.lines},function (err, verse) {
            res.json(verse);
      });
    } else {
        res.json("section already saved");
    }
  });
});

// GET method route loading all verses R
router.post('/load/all', function (req, res, next) {
  Verse.find({uid: req.body.uid}, function(err, allVerses){
    res.json(allVerses);
  });
});
// GET method route loading songs R
router.post('/load', function (req, res, next) {
  Verse.findOne({_id: req.body._id}, function(err, oneVerse){
    res.json(oneVerse);
  });
});

// POST method route U
router.post('/update', function (req, res, next) {
  console.log(req.body);

  Verse.update({title: req.body.title, uid: req.body.uid},{$set: {uid: req.body.uid, title: req.body.title, lines: req.body.lines}}, function(err, verse){
      res.json(verse.nModified);
  });
});

// POST method route D
router.post('/delete', function (req, res, next) {
  Verse.deleteOne({_id: req.body.vid}, function(err, oneVerse){
    res.json(oneVerse);
  });
});




module.exports = router;
