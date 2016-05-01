var express = require('express');
var bodyParser = require('body-parser');
var ai = require('./ai.js');
var path    = require("path");
var app = express();

app.use('/assets', express.static(__dirname + '/assets'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/fonts', express.static(__dirname + '/fonts'));

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
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/presentation', function (req, res) {
  res.sendFile(path.join(__dirname+'/presentation.html'));
});

app.post('/api', function (req, res) {
    var input = req.rawBody;
    console.log("Recieved POST:" + input);
    ai.getResponse(input, function(output){
        res.send(output);
    });
});

app.post('/api1', function (req, res) {
    var input = req.rawBody;
    console.log("Recieved POST:" + input );
    ai.getResponse(input, function(output){
        res.send(output);
    });
});

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
    console.log("Node app is running on port:" + app.get('port'));
});
