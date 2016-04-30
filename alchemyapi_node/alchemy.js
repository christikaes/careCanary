var AlchemyApi = require('./alchemyapi');
var alchemyapi = new AlchemyApi();

var demo_text = 'Yesterday dumb Bob destroyed my fancy iPhone in beautiful Denver, Colorado. I guess I will have to head over to the Apple Store and buy a new one.';
var demo_url = 'http://www.npr.org/2013/11/26/247336038/dont-stuff-the-turkey-and-other-tips-from-americas-test-kitchen';
var demo_html = '<html><head><title>Node.js Demo | AlchemyAPI</title></head><body><h1>Did you know that AlchemyAPI works on HTML?</h1><p>Well, you do now.</p></body></html>';


var analyzeSentiment1 = function( req, res ) {
  analyzeSentiment( 'Apple sucks', function( output ) {
	res.send(output);
});
}

var analyzeSentiment = function( test, cb ) {
	var output = {};
	entities('', cb, output);
}


function example(req, res) {
	var output = {};

	//Start the analysis chain
	entities(req, res, output);
}


var entities = function (req, res, output) {
	alchemyapi.entities('text', demo_text,{ 'sentiment':1 }, function(response) {
		output['entities'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['entities'] };
		keywords(req, res, output);
	});
}


function keywords(req, res, output) {
	alchemyapi.keywords('text', demo_text, { 'sentiment':1 }, function(response) {
		output['keywords'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['keywords'] };
		concepts(req, res, output);
	});
}


function concepts(req, res, output) {
	alchemyapi.concepts('text', demo_text, { 'showSourceText':1 }, function(response) {
		output['concepts'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['concepts'] };
		sentiment(req, res, output);
	});
}


function sentiment(req, res, output) {
	alchemyapi.sentiment('html', demo_html, {}, function(response) {
		output['sentiment'] = { html:demo_html, response:JSON.stringify(response,null,4), results:response['docSentiment'] };
		text(req, res, output);
	});
}


function text(req, res, output) {
	alchemyapi.text('url', demo_url, {}, function(response) {
		output['text'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
		author(req, res, output);
	});
}


function author(req, res, output) {
	alchemyapi.author('url', demo_url, {}, function(response) {
		output['author'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
		language(req, res, output);
	});
}


function language(req, res, output) {
	alchemyapi.language('text', demo_text, {}, function(response) {
		output['language'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response };
		title(req, res, output);
	});
}


function title(req, res, output) {
	alchemyapi.title('url', demo_url, {}, function(response) {
		output['title'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
		relations(req, res, output);
	});
}


function relations(req, res, output) {
	alchemyapi.relations('text', demo_text, {}, function(response) {
		output['relations'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['relations'] };
		category(req, res, output);
	});
}


function category(req, res, output) {
	alchemyapi.category('text', demo_text, {}, function(response) {
		output['category'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response };
		feeds(req, res, output);
	});
}


function feeds(req, res, output) {
	alchemyapi.feeds('url', demo_url, {}, function(response) {
		output['feeds'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response['feeds'] };
		microformats(req, res, output);
	});
}


function microformats(req, res, output) {
	alchemyapi.microformats('url', demo_url, {}, function(response) {
		output['microformats'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response['microformats'] };
		taxonomy(req, res, output);
	});
}


function taxonomy(req, res, output) {
	alchemyapi.taxonomy('url', demo_url, {}, function(response) {
		output['taxonomy'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
		combined(req, res, output);
	});
}

function combined(req, res, output) {
	alchemyapi.combined('url', demo_url, {}, function(response) {
		output['combined'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
		image(req, res, output);
	});
}

function image(req, res, output) {
	alchemyapi.image('url', demo_url, {}, function(response) {
		output['image'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
		image_keywords(req, res, output);
	});
}

function image_keywords(req, res, output) {
	alchemyapi.image_keywords('url', demo_url, {}, function(response) {
		output['image_keywords'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
        console.log('output = ' +JSON.stringify( output));
	});
}

module.exports = {
  analyzeSentiment: analyzeSentiment
}

