var express = require('express');
var router = express.Router();
var whois = require('whois-json');

router.get('/', getWhoIs);

function getWhoIs(req, res, next) {
    whois(req.query.domain, function (err, result) {
        if (err) res.send(err);
        else res.json(result);
    })
}

module.exports = router;