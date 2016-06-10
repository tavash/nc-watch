var express = require('express');
var router = express.Router();
var google = require('google');

router.get('/', googleSearchResult);

function googleSearchResult(req, res, next){
    google.resultsPerPage = 25;
    //google.lang = 'fr';
    var nextCounter = 0;
    var result, results = [];
  
    google(req.query.query, res, function (err, r){
        if (err) next(err);

        for (var i = 0; i < r.links.length; ++i) {
            var link = r.links[i];
            result = {'title': link.title, 'href': link.href, 'description': link.description};
            results.push(result);         
        }
        res.json(results);

        if (nextCounter < 4) {
            nextCounter += 1;
            if (res.next) res.next();
        }

    });
}

module.exports = router;