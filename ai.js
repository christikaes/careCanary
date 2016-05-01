var AlchemyApi = require("./alchemyapi");
var alchemyapi = new AlchemyApi();
var pos = require('pos');


var getSentiment = function(text, callback) {
	alchemyapi.sentiment('text', text, {}, function(response) {
		// console.log(response);
    if(response['docSentiment'] && response['docSentiment'].type){
      return callback(response['docSentiment'].type);
    } else {
      return callback(null);
    }
	});
}

var getText = function(text, callback) {
	alchemyapi.concepts('text', text, { 'showSourceText':1 }, function(response) {
		console.log(response)
    if(response['concepts'] && response['concepts'][0] && response['concepts'].text){
      return callback(response['concepts'][0].text);
    } else {
      return callback(null);
    }
	});
}

var analyzeSentiment = function (input, callback) {
  getSentiment(input, function(sentiment){
    getText(input, function(text){
      if(!sentiment){
        sentiment = "neutral"
      }
      if (!text) {
        text = "it."
      }
      var response = {};

      // Sentiment
      response.sentiment = sentiment;

      // Text
      response.text = ""
      if(sentiment === "negative"){
        response.text += "You sound sad, "
      } else if(sentiment === "positive") {
        response.text += "You sound happy, "
      }
      response.text += "tell me more about " + text + ".";

      // Image
      response.image = "https://i.imgur.com/t8L6Iw4.png"
      if(sentiment === "negative"){
          response.image = "https://i.imgur.com/9ccCPJc.png"
      }

      // HACK text for the demo
      response.text = hackText(input, response.text);

      callback(response);

    })
  })
}

var hackText = function (input, text) {
  var x = input;
  var decomposedPos = getPos(x);
  vbg = decomposedPos.subject;
  if(input.indexOf("ing") > 0){
		return "What was your favorite part of cooking?"
		// return "What was your favorite part of "+vbg+"?"
  } else if(input.indexOf("husband") > 0 ){
		return "What did you like about cooking with your husband?"
		// return "What did you like about "+vbg+" with your husband?"
  } else if(input.indexOf("joke") > 0 ){
    return "Why does the Mushroom always get invited to the party? . . . Because he is a fun-guy.  Next time you cook, think of a joke."
  } else if(input.indexOf("thanks") > 0){
    return "Great. Have a nice day."
  } else {
    return text
  }
}

var getResponse = function (input, callback){
  var output = analyzeSentiment(input, callback);

  return output;
}

module.exports = {
  getResponse: getResponse
}

var getPos = function( text ) {
	var output = {};

	var words = new pos.Lexer().lex(text);
	var tagger = new pos.Tagger();
	var taggedWords = tagger.tag(words);
	var response = {};
	for ( i in taggedWords) {
		var taggedWord = taggedWords[i];
		var word = taggedWord[0];
		var tag = taggedWord[1];
		if( tag == "VBG" ) {
			response.subject = word;
		}
		console.log(word+" /"+tag);
	}
	return( response );
}
