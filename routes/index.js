var express = require('express');
var router = express.Router();

function getRandomNumber(max) {
  return Math.floor((Math.random() * max) + 1);
}

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/api/test', function(req, res, next) {
  res.json({
    text : "some immediate response and a random number: " + getRandomNumber(1000)
  });
});

router.get('/api/poll',  function(req, res, next) {
  res.json({
    text : "here's a random number: " + getRandomNumber(100)
  });
});

router.get('/api/longpoll',  function(req, res, next) {
  var timeout = getRandomNumber(20) + 10;
  setTimeout(function() {
    res.json({
      text : 'I had to think for ' + timeout + 's about that'
    });
  }, timeout * 1000);
});

router.get('/api/push',  function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var chunks = getRandomNumber(5) + 3;
  var timeout = getRandomNumber(10) + 5;
  var interval = setInterval(function() {
    res.write('chunk #' + chunks);
    res.flush();
    chunks--;    
    if (chunks === 0) {
      clearInterval(interval);
      res.write("done");
      res.end();
    }
  }, timeout * 1000);
});

module.exports = router;
