var express = require('express');
var router = express.Router();
var keys = require('../keys.json');
var http = require('http');

router.get('/', getBuiltwith);

function getBuiltwith(req, res, next) {

    var options = {
        host: 'api.builtwith.com',
        path: '/v9/api.json?key=' + keys.builtwithKey + '&lookup=' + req.query.domain,
        method: 'GET',
        port: 80
    };

    http.get(options, function(result) {

        var body = '';

        result.on('data', function (chunk) {
            body += chunk;
        });

        result.on('end', function() {
            var jsonBody = JSON.parse(body);
            res.json(jsonBody);
        });
    });

}

module.exports = router;