var AlchemyApi = require("./alchemyapi");
var alchemyapi = new AlchemyApi();

var getSentiment = function(text, callback) {
	alchemyapi.sentiment('text', text, {}, function(response) {
    if(response['docSentiment'] && response['docSentiment'].type){
      return callback(response['docSentiment'].type);
    } else {
      return callback(null);
    }
	});
}

var getText = function(text, callback) {
	alchemyapi.concepts('text', text, { 'showSourceText':1 }, function(response) {
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
      response.text = hackText(input);

      callback(response);

    })
  })
}

var hackText = function (input) {
  if(input.includes("cooking")){
    return "What was your favorite part of cooking?"
  } else if(input.includes("husband")){
    return "What did you like about cooking with your husband?"
  } else if(input.includes("joke")){
    return "[joke] Next time you cook, think of a joke."
  } else if(input.includes("thanks")){
    return "Great. Have a nice day."
  } else {
    return input
  }
}

var getResponse = function (input, callback){
  var output = analyzeSentiment(input, callback);

  return output;
}

module.exports = {
  getResponse: getResponse
}
