var express = require('express');
var router = express.Router();
var config = require('../keys.json');
var Bluebox = require('bluebox-ng'),
    bluebox = new Bluebox({});
var whois = require('whois-json');
var dns = require('dns');

router.get('/whois', getWhoIs);
router.get('/shodanHost', getShodanHost);
router.get('/geolocation', getGeolocation);

//console.log('Modules info:');
//console.log(JSON.stringify(bluebox.getModulesInfo(), null, 2));

// Récupérer des informations sur le posseceur du domaine
function getWhoIs(req, res, next) {
    whois(req.query.domain, function (err, result) {
        if (err) {
            console.log('ERROR:');
            console.log(err);
            res.send(err);
        }
        else {
            console.log('RESULT:');
            console.log(JSON.stringify(result, null, 2))

            res.json(result);
        }
    })
}

function getShodanHost(req, res, next) {
    var moduleOptions = {
        target : req.query.domain
    };

    // SHODAN KEY
    bluebox.shodanKey = config.shodanKey;

    bluebox.runModule('shodanHost', moduleOptions, function (err, result) {
        if (err) {
            console.log('ERROR:');
            console.log(err);
            res.send(err);
        } else {
            console.log('RESULT:');
            console.log(result);

            res.json(result);
        }
    });
}

// Récupère l'addresse ip d'un serveur selon un nom de domaine donné
function getDnsResolve(domain, res, callback) {
    dns.resolve(domain, 'A', function (err, addresses) {
        if (err)
            res.send(err);
        else {
            console.log("IP RESULT : " + addresses)
            callback(addresses);
        }
    });
}

//Récupère la location du serveur selon un nom de domaine donné
function getGeolocation(req, res, next) {
    getDnsResolve(req.query.domain, res, function (serveurIps) {
        getMultipleGeolocation(serveurIps, function (finalResult) {
            res.send(finalResult);
        });
    });
}

function getMultipleGeolocation(serveurIps, callback) {
    var finalResult = [];
    for (var i in serveurIps) {
        var moduleOptions = {
            target: serveurIps[i]
        };
        bluebox.runModule('geolocation', moduleOptions, function (err, result) {
            if (err) {
                console.log('ERROR:');
                console.log(err);
                res.send(err);
            } else {
                console.log('RESULT:');
                console.log(result);
                finalResult.push(result);
            }
        });
    }
    callback(finalResult);
}

module.exports = router;