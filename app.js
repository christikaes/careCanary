var express = require('express');
var bodyParser = require('body-parser');
var ai = require('./ai.js');
var alchemy = require('./alchemy');

var app = express();

app.use(function(req, res, next) {
  req.rawBody = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk) {
    req.rawBody += chunk;
  });
  req.on('end', function() {
    next();
  });
});
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/alchemy', function (req, res) {
  alchemy.analyzeSentiment(req,res);
});

app.post('/api', function (req, res) {
    var input = req.rawBody;
    console.log("Recieved POST:" + input);
    var output = ai.getResponse(input);
    res.send(output);
});

app.set('port', (process.env.PORT || 80));
app.listen(app.get('port'), function() {
    console.log("Node app is running on port:" + app.get('port'));
});
