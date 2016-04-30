var AlchemyApi = require("./alchemyapi");
var alchemyapi = new AlchemyApi();

function getSentiment(text, callback) {
	alchemyapi.sentiment('text', text, {}, function(response) {
    if(response['docSentiment'] && response['docSentiment'].type){
      return callback(response['docSentiment'].type);
    } else {
      return callback(null);
    }
	});
}

function getText(text, callback) {
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
      if(!sentiment || !text){
        sentiment = "neutral"
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
      response.image = "https://image.freepik.com/free-icon/smiling-emoticon-square-face_318-58645.jpg"

      callback(response);

    })
  })
}

var getResponse = function (input, callback){
  var output = analyzeSentiment(input, callback);

  return output;
}

module.exports = {
  getResponse: getResponse
}
