var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Crawler = require("crawler");

router.post('/', crawlPost);
router.get('/', crawlGet);


function crawlPost(req, res, next) {
   	
	var c = new Crawler({
	    maxConnections : 10,
	    callback : function (error, result, $) {
	       /* $('a').each(function(index, a) {
	            var toQueueUrl = $(a).attr('href');
	            c.queue(toQueueUrl);
	        });*/
	        //var r = {"headers" : result.headers, "request" : result.request};
	        res.json(result);
	    }
	});
	c.queue(req.body.url);
	// Queue a list of URLs
	//c.queue(['http://jamendo.com/','http://tedxparis.com']);
/*	c.queue({ uri: googleSearch('adacis') });*/
}

function crawlGet(req, res, next){
	var c = new Crawler({
	    maxConnections : 10,
	    callback : function (error, result, $) { res.json(result); }
	});
	c.queue(req.query.url);
}

module.exports = router;
