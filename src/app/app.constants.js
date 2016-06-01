/* global malarkey:false, moment:false */
(function () {
    'use strict';

    angular
        .module('ncwatch')
        .constant('moment', moment)
        .constant('HowToMessages', {
            googleDorks: 'Veuillez entrer un nom de domaine de type "domain.com" et choisir un google dorks à appliquer',
            buildwith: 'Veuillez entrer un nom de domaine valide de type "domaine.com"',
            crawl: 'Veuillez choisir un préfixe et entrer une URL de type "www.domaine.com"',
            haveIBeenPwend: 'Veuillez entrer une adresse email valide de type "mail@domaine"',
            shodan: 'Veuillez entrer un nom de domaine valide de type "domaine.com"',
            ssl: 'Veuillez entrer un nom de domaine valide de type "domaine.com"',
            whois: 'Veuillez entrer un nom de domaine valide de type "domaine.com"'
        })
        .constant('InfosMessage', {
            googleDorks: 'Cet outil permet de',
            buildwith: 'Cet outil permet de lister la liste des technologies utiliser pour développer le site web sélectionné',
            crawl: 'Cet outil permet de',
            haveIBeenPwend: 'Cet outil permet de savoir si un des sites, où l\'adresse mail donnée a été utilisée pour créer un compte, a été hacké.',
            shodan: 'Cet outil permet de',
            ssl: 'Cet outil permet de',
            whois: 'Cet outil permet de récupérer des informations sur'
        })
})();
