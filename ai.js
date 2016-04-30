var AlchemyApi = require("./alchemyapi");
var alchemyapi = new AlchemyApi();

function getSentiment(text, callback) {
	alchemyapi.sentiment('text', text, {}, function(response) {
		return callback(response['docSentiment'].type);
	});
}

function getText(text, callback) {
	alchemyapi.concepts('text', text, { 'showSourceText':1 }, function(response) {
    return callback(response['concepts'][0].text);
	});
}

var analyzeSentiment = function (input, callback) {
  getSentiment(input, function(sentiment){
    getText(input, function(text){
      var response = {};

      // Sentiment
      response.sentiment = sentiment;

      // Text
      response.text = "You sound "
      if(sentiment === "negative"){
        response.text += "sad, "
      } else if(sentiment === "positive") {
        response.text += "happy, "
      }
      response.text += "tell me more about " + text + ".";

      // Image
      response.image = "https://www.health-first.org/images/icon_wong_faces_for_pain.gif"

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
