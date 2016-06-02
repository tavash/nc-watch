var express = require('express');
var router = express.Router();
var ssllabs = require("node-ssllabs");

router.get('/scan', scan);
router.get('/analyze', analyze);


function scan(req,res,next){
	var options = {
		"host": req.query.domain,
		"fromCache": true,
		"maxAge": 24
	};
	ssllabs.scan(options, function (err, host) { res.json(host); });
}

function analyze(req, res, next){
	var options = {
		"host": req.query.domain,
		"publish": true,
		"startNew": true,
		"all": "done",
		"ignoreMismatch": true
	};
	ssllabs.analyze(options, function (err, host) { res.json(host); });
}

module.exports = router;