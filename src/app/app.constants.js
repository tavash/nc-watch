/* global malarkey:false, moment:false */
(function () {
    'use strict';

    angular
        .module('ncwatch')
        .constant('moment', moment)
        .constant('HowToMessages', {
            googleDorks: 'Veuillez entrer un nom de domaine de type <domain.com> et choisir un google dorks à appliquer',
            buildwith: 'Veuillez entrer un nom de domaine valide de type <domaine.com>',
            analyzer: 'Veuillez choisir un préfixe et entrer une URL de type <www.domaine.com>',
            haveIBeenPwend: 'Veuillez entrer une adresse email valide de type <mail@domaine>',
            shodan: 'Veuillez entrer un nom de domaine valide de type <domaine.com>',
            ssl: 'Veuillez entrer un nom de domaine valide de type <domaine.com>',
            whois: 'Veuillez entrer un nom de domaine valide de type <domaine.com>',
            dnsbl: 'Veuillez entrer un nom de domaine valide de type <domaine.com>'
        })
        .constant('InfosMessages', {
            googleDorks: 'Cet outil permet d\'effectuer des recherches spécifiques sur Google. Il utilise des opérateurs de Google',
            buildwith: 'Cet outil permet de lister la liste des technologies utilisées pour développer le site web sélectionné.',
            analyzer: 'Cet outil permet de faire l\'analyse syntaxique d\'une page web comme elle téléchargée de manière asynchrone.',
            haveIBeenPwend: 'Cet outil permet de savoir si un des sites, où l\'adresse mail donnée a été utilisée pour créer un compte, a été hacké.',
            shodan: 'Cet outil est un moteur de recherche basé sur l\'API SHODAN. Il référence le résultat de balayages de ports massifs effectués sur le réseau Internet.',
            ssl: 'Cet outil permet de récupérer les informations fournies par SSLLabs. SSLLabs un site qui permet de tester et de valider principalement la configuration SSL/TLS d\'un serveur Web mais aussi celle des navigateurs. A la fin du test, une note allant de A+ à F est attribuée ainsi qu\'un rapport détaillé permettant de remédier à certains problèmes le cas échéant.',
            whois: 'Cet outil est un service de recherche fourni par les registres Internet, par exemple les Registres Internet régionaux (RIR) ou bien les registres de noms de domaine permettant d\'obtenir des informations sur une adresse IP ou un nom de domaine. Ces informations ont des usages très variés, que ce soit la coordination entre ingénieurs réseaux pour résoudre un problème technique, ou bien la recherche du titulaire d\'un nom de domaine par une société qui souhaiterait l\'obtenir.',
            dnsbl: 'Cet outil permet de savoir si le nom de domaine entré est présent dans une liste noire d\'émetteurs de courrier électronique grâce au protocole DNS.'
        })})()