var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');

mongoose.connect('mongodb://prich:foxwoodrd1@ds159997.mlab.com:59997/prich_sandboxdb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {  console.log("connected search"); });

var wordsSchema = new mongoose.Schema;
wordsSchema.add({word: String, rhyme: String, related: String, definition: String});
var Words = mongoose.model('words', wordsSchema);


// POST method route Login
  router.post('/rhyme', function (req, res, next) {
  console.log(req.body.word);

  Words.findOne({ word: req.body.word}, function (err, result) {
    if (err) {
        res.json("rhyme error");
     }

    if (!result) {
        console.log("word not found result");

        var wordEntry = {word:'', rhyme:[], related: [], definition: null};

        var foundWords = null;


        /////////////////////////////////////
        // get rhyme
        request("https://api.datamuse.com/words?sl=" + req.body.word + "&max=2000", function (error, response, body) {
                                   console.log("success rhymes");
                                   foundWords = JSON.parse(body);

                                   wordEntry.word = req.body.word;

                                   for (var i = 0; i < foundWords.length; i++) {
                                     wordEntry.rhyme.push(foundWords[i]["word"]);
                                   }


                                   /////////////////////////////////////
                                   // get related
                                   request("https://api.datamuse.com/words?rel_trg=" + req.body.word + "&max=2000", function (error, response, body) {
                                                              console.log("success related");
                                                              foundWords = JSON.parse(body);

                                                              for (var i = 0; i < foundWords.length; i++) {
                                                                wordEntry.related.push(foundWords[i]["word"]);
                                                              }
                                                              /////////////////////////////////////
                                                              // get definition
                                                              request("https://api.datamuse.com/words?sp=" + req.body.word + "&md=d&max=1", function (error, response, body) {
                                                                                         console.log("success related");
                                                                                         foundWords = JSON.parse(body);

                                                                                         for (var i = 0; i < foundWords.length; i++) {
                                                                                           wordEntry.definition = foundWords[i]["defs"];
                                                                                         }
                                                                                         /////////////////////////////////////
                                                                                         // create entry

                                                                                        console.log(wordEntry.rhyme.length);
                                                                                         if (wordEntry.rhyme.length !== 0) {
                                                                                           Words.create({word: wordEntry.word, rhyme: JSON.stringify(wordEntry.rhyme), related: JSON.stringify(wordEntry.related), definition: JSON.stringify(wordEntry.definition)}, function(err, word){
                                                                                             console.log("success rhyme added");
                                                                                            res.json(JSON.parse(word.rhyme));
                                                                                           });
                                                                                         } else {
                                                                                           res.json("no results found");
                                                                                         }
                                                                                });
                                                     });
                          });
    }  else {
      console.log("success rhyme found");
       res.json(JSON.parse(result.rhyme));
    }
});
});

// POST method route Login
router.post('/related', function (req, res, next) {
  console.log(req.body.word);
  Words.findOne({ word: req.body.word}, function (err, result) {
    if (err) {
        res.json("related error");
     }

    if (!result) {
        console.log("word not found result");

        var wordEntry = {word:'', rhyme:[], related: [], definition: null};

        var foundWords = null;


        /////////////////////////////////////
        // get rhyme
        request("https://api.datamuse.com/words?sl=" + req.body.word + "&max=2000", function (error, response, body) {
                                   console.log("success rhymes");
                                   foundWords = JSON.parse(body);

                                   wordEntry.word = req.body.word;

                                   for (var i = 0; i < foundWords.length; i++) {
                                     wordEntry.rhyme.push(foundWords[i]["word"]);
                                   }


                                   /////////////////////////////////////
                                   // get related
                                   request("https://api.datamuse.com/words?rel_trg=" + req.body.word + "&max=2000", function (error, response, body) {
                                                              console.log("success related");
                                                              foundWords = JSON.parse(body);

                                                              for (var i = 0; i < foundWords.length; i++) {
                                                                wordEntry.related.push(foundWords[i]["word"]);
                                                              }
                                                              /////////////////////////////////////
                                                              // get definition
                                                              request("https://api.datamuse.com/words?sp=" + req.body.word + "&md=d&max=1", function (error, response, body) {
                                                                                         console.log("success related");
                                                                                         foundWords = JSON.parse(body);

                                                                                         for (var i = 0; i < foundWords.length; i++) {
                                                                                           wordEntry.definition = foundWords[i]["defs"];
                                                                                         }
                                                                                         /////////////////////////////////////
                                                                                         // create entry

                                                                                        console.log(wordEntry.rhyme.length);
                                                                                         if (wordEntry.rhyme.length !== 0) {
                                                                                           Words.create({word: wordEntry.word, rhyme: JSON.stringify(wordEntry.rhyme), related: JSON.stringify(wordEntry.related), definition: JSON.stringify(wordEntry.definition)}, function(err, word){
                                                                                             console.log("success related added");
                                                                                            res.json(JSON.parse(word.related));
                                                                                           });
                                                                                         } else {
                                                                                           res.json("no results found");
                                                                                         }
                                                                                });
                                                     });
                          });
    }  else {
      console.log("success related found");
       res.json(JSON.parse(result.related));
    }
});

});



// POST method route
router.post('/definition', function (req, res, next) {
  console.log(req.body.word);
  Words.findOne({ word: req.body.word}, function (err, result) {
    if (err) {
        res.json("definition error");
     }

    if (!result) {
        console.log("word not found result");

        var wordEntry = {word:'', rhyme:[], related: [], definition: null};

        var foundWords = null;


        /////////////////////////////////////
        // get rhyme
        request("https://api.datamuse.com/words?sl=" + req.body.word + "&max=2000", function (error, response, body) {
                                   console.log("success rhymes");
                                   foundWords = JSON.parse(body);

                                   wordEntry.word = req.body.word;

                                   for (var i = 0; i < foundWords.length; i++) {
                                     wordEntry.rhyme.push(foundWords[i]["word"]);
                                   }


                                   /////////////////////////////////////
                                   // get related
                                   request("https://api.datamuse.com/words?rel_trg=" + req.body.word + "&max=2000", function (error, response, body) {
                                                              console.log("success related");
                                                              foundWords = JSON.parse(body);

                                                              for (var i = 0; i < foundWords.length; i++) {
                                                                wordEntry.related.push(foundWords[i]["word"]);
                                                              }
                                                              /////////////////////////////////////
                                                              // get definition
                                                              request("https://api.datamuse.com/words?sp=" + req.body.word + "&md=d&max=1", function (error, response, body) {
                                                                                         console.log("success related");
                                                                                         foundWords = JSON.parse(body);

                                                                                         for (var i = 0; i < foundWords.length; i++) {
                                                                                           wordEntry.definition = foundWords[i]["defs"];
                                                                                         }
                                                                                         /////////////////////////////////////
                                                                                         // create entry

                                                                                        console.log(wordEntry.rhyme.length);
                                                                                         if (wordEntry.rhyme.length !== 0) {
                                                                                           Words.create({word: wordEntry.word, rhyme: JSON.stringify(wordEntry.rhyme), related: JSON.stringify(wordEntry.related), definition: JSON.stringify(wordEntry.definition)}, function(err, word){
                                                                                             console.log("success definition added");
                                                                                            res.json(JSON.parse(word.definition));
                                                                                           });
                                                                                         } else {
                                                                                           res.json("no results found");
                                                                                         }
                                                                                });
                                                     });
                          });
    }  else {
      console.log("success definition found");
       res.json(JSON.parse(result.definition));
    }
});

});

module.exports = router;
