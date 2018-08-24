var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://prich:foxwoodrd1@ds159997.mlab.com:59997/prich_sandboxdb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {  console.log("connected yea yea"); });

var vSchema = new mongoose.Schema;
vSchema.add({uid: String ,title: String,lines: String});
var Verse = mongoose.model('verses', vSchema);


/* GET users listing. */
router.get('/', function(req, res, next) {

  res.json('must respond with a resource');
});



/////////////////////////////////////////
// POST method route C / U
router.post('/save', function (req, res, next) {
  //save to DB new or overwrite if exsits
  Verse.findOne({'title': req.body.title},  function(err, test){
  console.log('test');
  console.log(test);
    if (test == null) {
      Verse.create({uid: req.body.uid, title: req.body.title, lines: req.body.lines},function (err, verse) {
            res.json(verse);
      });
    } else {
        res.json(false);
    }
  });
});

router.post('/update', function (req, res, next) {
  Verse.updateOne({_id:req.body.vid},{uid: req.body.uid, title: req.body.title, lines: req.body.lines}, function(err, verse){
      res.json(verse);
  });
});

// GET method route loading all verses
router.post('/load/all', function (req, res, next) {
  console.log(req.body);
  Verse.find({uid: req.body.uid}, function(err, allVerses){
    console.log(allVerses);
    res.json(allVerses);
  });
});

// GET method route loading songs
router.post('/load', function (req, res, next) {
  console.log(req.body);
  Verse.findOne({_id: req.body._id}, function(err, oneVerse){
    console.log(oneVerse);
    res.json(oneVerse);
  });
});


// POST method route D
router.post('/delete', function (req, res, next) {
  Verse.deleteOne({_id: req.body.vid}, function(err, oneVerse){
    console.log(oneVerse);
    res.json(oneVerse);
  });
});




module.exports = router;
