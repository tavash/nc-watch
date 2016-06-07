var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Crawler = require("crawler");
var Robots = require("robots");

router.post('/', analyzerPost);
router.get('/robots', getRobots);

function analyzerPost(req, res, next) {
	if (req.body.url) {
		var c = new Crawler({
			maxConnections : 3,
			callback : function (error, result, $) {
				if (error) {
					res.json({
						err: 'Impossible d\'accéder au site'
					});
				} else {
					res.json(result);
				}
			}
		});
		c.queue(req.body.url);
	} else {
		res.json({
			err: 'Aucune url spécifée'
		});
	}
}

function getRobots(req, res, next) {
	if (req.query.url) {
		var parser = new Robots.RobotsParser();
		parser.setUrl(req.query.url + '/robots.txt', function(parser, success) {
			if(success) {
				res.json(parser);
			}
			else {
				res.json({
					err: 'Aucun robots.txt n\'a été trouvé'
				})
			}
		});
	} else {
		res.json({});
	}
}

module.exports = router;
