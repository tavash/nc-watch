var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');

router.post('/', saveInFile);

// On exporte les données dans un fichier
function saveInFile(req, res) {
    var tool = req.query.tool;
    var data = req.body;
    var currentDate = getDateTime();
    var file = '../export/' + tool + '_' + currentDate + '.json';

    jsonfile.writeFile(file, data, {spaces: 2}, function (err) {
        if(err != null)
            console.error(err);
    });
    res.json(data);
}

function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return day + month + year + "_" + hour + min + sec;
}

module.exports = router;