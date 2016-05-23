var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Bluebox = require('bluebox-ng'),
    bluebox = new Bluebox({});

router.get('/whois', getWhoIs);

//console.log('Modules info:');
//console.log(JSON.stringify(bluebox.getModulesInfo(), null, 2));

function getWhoIs(req, res, next) {
   var moduleOptions = {
        domain : req.query.domain
    };
    bluebox.runModule('whois', moduleOptions, function (err, result) {
        if (err) {
            console.log('ERROR:');
            console.log(err);
            res.send(err);
        } else {
            console.log('RESULT:');
            console.log(result);
            result = result.replace(/\n/g,"");
            result = result.replace(/\r\r/g,"");
            result = result.split("\r");
            result = result.slice(0, result.length-16);

            var resultString = "{";
            for (var i in result) {
                result[i] = result[i].split(": ");
                resultString += '"' + result[i][0] + '":"' + result[i][1] + '",';
            }
            resultString = resultString.slice(0, -1);
            resultString += "}";          
            res.send(JSON.parse(resultString));
        }
    });
}
module.exports = router;