var getSentimentAnalysis = function (input) {
  mockResponse = {
                 "status": "OK",
                 "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html",
                 "url": "",
                 "totalTransactions": "2",
                 "language": "english",
                 "entities": [
                     {
                         "type": "FieldTerminology",
                         "relevance": "0.884345",
                         "sentiment": {
                             "type": "negative",
                             "score": "-0.582727"
                         },
                         "count": "1",
                         "text": "Apple Store"
                     },
                     {
                         "type": "Technology",
                         "relevance": "0.728395",
                         "sentiment": {
                             "type": "negative",
                             "score": "-0.508233"
                         },
                         "count": "1",
                         "text": "iPhone"
                     },
                     {
                         "type": "City",
                         "relevance": "0.624176",
                         "sentiment": {
                             "type": "negative",
                             "score": "-0.508233"
                         },
                         "count": "1",
                         "text": "Denver",
                         "disambiguated": {
                             "subType": [
                                 "AdministrativeDivision",
                                 "PlaceWithNeighborhoods",
                                 "USCounty"
                             ],
                             "name": "Denver",
                             "website": "http://www.denvergov.org",
                             "dbpedia": "http://dbpedia.org/resource/Denver",
                             "freebase": "http://rdf.freebase.com/ns/m.02cl1"
                         }
                     },
                     {
                         "type": "Person",
                         "relevance": "0.617745",
                         "sentiment": {
                             "type": "negative",
                             "score": "-0.508233"
                         },
                         "count": "1",
                         "text": "Bob"
                     },
                     {
                         "type": "StateOrCounty",
                         "relevance": "0.533694",
                         "sentiment": {
                             "type": "neutral"
                         },
                         "count": "1",
                         "text": "Colorado"
                     }
                 ]
              }

  return mockResponse;
}

var analyzeSentiment = function (input) {
    var sentimentAnalysis = getSentimentAnalysis(input);
    var data = sentimentAnalysis.entities[0];
    var text = data.text;
    var sentiment = data.sentiment.type;

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

    return response;
}


var getResponse = function (input){
  var output = analyzeSentiment(input);

  return output;
}

module.exports = {
  getResponse: getResponse
}