var express = require('express');
var router = express.Router();
var keys = require('../keys.json');
var Bluebox = require('bluebox-ng'),
    bluebox = new Bluebox({});
var whois = require('whois-json');
var dns = require('dns');
var async = require('async');
var http = require('http');
var querystring = require('querystring');

router.get('/whois', getWhoIs);
router.get('/shodanHost', getShodanHost);
router.get('/geolocation', getGeolocation);
router.get('/buildwith', getBuildwith);

// Récupérer des informations sur le possesseur du domaine
function getWhoIs(req, res, next) {
    whois(req.query.domain, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(result);
        }
    })
}

function getShodanHost(req, res, next) {
    getDnsResolve(req.query.domain, res, function (serveurIps) {
        if(serveurIps.length > 0) {
            var moduleOptions = {
                target: serveurIps[0]
            };

            // SHODAN KEY
            bluebox.shodanKey = keys.shodanKey;

            bluebox.runModule('shodanHost', moduleOptions, function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(result);
                }
            });
        }
    });
}

function getBuildwith(req, res, next) {

    var options = {
        host: 'api.builtwith.com',
        path: '/v9/api.json?key=' + keys.buildwithKey + '&lookup=' + req.query.domain,
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


// Récupère l'addresse ip d'un serveur selon un nom de domaine donné
function getDnsResolve(domain, res, callback) {
    dns.resolve(domain, 'A', function (err, addresses) {
        if (err)
            res.send(err);
        else {
            callback(addresses);
        }
    });
}

//Récupère les localisations des serveur selon un nom de domaine donné
function getGeolocation(req, res, next) {
    getDnsResolve(req.query.domain, res, function (serveurIps) {
        getMultipleGeolocation(serveurIps, res, function (finalResult) {
            var result = '{ "geolocationTab":[';
            result += finalResult;
            result += "]}";
            res.json(JSON.parse(result));
        });
    });
}

function getMultipleGeolocation(serveurIps, res, callback) {
    var finalResult = [];
    var itemsProcessed = 0;
    // Pour chaque addresse ip de serveurs trouvés
    for (var i in serveurIps) {
        var moduleOptions = {
            target: serveurIps[i]
        };
        bluebox.runModule('geolocation', moduleOptions, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                finalResult.push(JSON.stringify(result));
                itemsProcessed++;
                if (itemsProcessed === serveurIps.length) {
                    //Quand on a fini de récupérer la localisation de chaque serveur on envoie la réponse
                    callback(finalResult);
                }
            }
        });
    }
}

module.exports = router;