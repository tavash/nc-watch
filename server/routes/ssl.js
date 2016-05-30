var express = require('express');
var router = express.Router();
var ssllabs = require("node-ssllabs");

router.get('/scan', scan);

function scan(req,res,next){
	var options = {
		"host": req.query.domain,
		"fromCache": true,
		"maxAge": 24
	};
	ssllabs.scan(options, function (err, host) {
		console.log(host);
		res.json(host);
	});
}

module.exports = router;