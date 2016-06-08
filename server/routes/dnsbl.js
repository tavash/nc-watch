var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var lookup = require('dnsbl-lookup');

router.get('/', getDnsBl);

function getDnsBl(req, res, next) {
	if (req.query.domain) {
		var dnsbl = new lookup.dnsbl(req.query.domain);
		var hasResult = false;
		var finalResult = '{"result":['
		dnsbl.on('error',function(error,blocklist){});
		dnsbl.on('data',function(result,blocklist){
			hasResult = true;
			finalResult+='{"status":"'+result.status+'", "zone":"'+blocklist.zone+ '"},'
		});
		dnsbl.on('done', function(){
			if (hasResult) {
				finalResult = finalResult.slice(0, -1);
				finalResult += "]}"
				res.json({success:true, data: JSON.parse(finalResult)});
			}
			else {
				res.json({success: false, message: "Undefined domain name"});
			}
		});

	} else {
		res.send("Error");
	}
}

module.exports = router;