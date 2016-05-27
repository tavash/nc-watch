var express = require('express');
var router = express.Router();
//var config = require('../keys.json');
var Bluebox = require('bluebox-ng'),
    bluebox = new Bluebox({});
var whois = require('whois-json');
var dns = require('dns');
var async = require("async");

router.get('/whois', getWhoIs);
router.get('/shodanHost', getShodanHost);
router.get('/geolocation', getGeolocation);

//console.log('Modules info:');
//console.log(JSON.stringify(bluebox.getModulesInfo(), null, 2));

// Récupérer des informations sur le possesseur du domaine
function getWhoIs(req, res, next) {
    whois(req.query.domain, function (err, result) {
        if (err) {
            console.log('ERROR:');
            console.log(err);
            res.send(err);
        }
        else {

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

//Récupère les localisations des serveur selon un nom de domaine donné
function getGeolocation(req, res, next) {
    getDnsResolve(req.query.domain, res, function (serveurIps) {
        getMultipleGeolocation(serveurIps, res, function (finalResult) {
            var result ='{ "geolocationTab":[';
            result+=finalResult;
            result+="]}";
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
                console.log('ERROR:');
                console.log(err);
                res.send(err);
            } else {
                console.log('RESULT:');
                console.log(result);
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