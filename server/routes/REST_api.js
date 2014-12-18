var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var wiki = mongoose.model('wiki');

/* GET A wiki From The DataBase */
router.get('/wiki', function(req, res) {
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+" To get the list of wikiPages here, make sure the database are set-up on a fex test users (see model-->db.js for instructions)");
    return;
  }
  wiki.find({}, function (err, wiki) {
    if (err) {
      res.status(err.status || 400);
      res.end(JSON.stringify({error: err.toString()}));
      return;
    }
    res.header("Content-type","application/json");
    res.end(JSON.stringify(wiki));
  });
});

module.exports = router;

