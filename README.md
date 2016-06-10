# NC-WATCH

- Faire l'inventaire / état des lieux des infos publiques sur une entreprise 

- Recherches d'infos sur l'entreprise / salariés (infos publiques, réseaux sociaux, ..) 

- Recherches d'infos sensibles / fuites de données (documents, codes sources, ...) 

- Recherches d'infos succeptibles de nuire à une entreprise (diffamations, e-reputation, ...)

## Pré requis

- Git
- NodeJS

## Cloner le projet

	Dans un répertoire vide, il faut cloner le projet depuis Github : https://github.com/Tavash/NCWatch.git	
	On ne fait cette phase qu’une seule fois, c’est juste pour récupérer le projet quand on ne l’a pas.
	Par défaut, on est sur la branche master du projet.

## Avant l'installation
    1) Dans le répertoire du projet, allez dans le dossier 'server'
    2) Créer un fichier 'keys.json'
    3) Ajouter dans ce fichier les lignes suivantes : 
        {
            "shodanKey" : "",
            "builtwithKey" : ""
        }
    4) Allez sur le site de Shodan (lien en dessous) et créez-vous un compte pour récupérer une key Shodan qu'il faudra renseigner dans le champ du fichier keys.json qui convient entre les guillemets
    5) Allez sur le site de Built With(lien en dessous) et comme précédemment, créez-vous un compte pour récupérer une key valide de Built With et renseignez là dans le fichier keys.json comme pour Shodan

[Création compte Shodan](https://account.shodan.io/register)

[Création compte Built With](https://builtwith.com/login?B=http%3a%2f%2fbuiltwith.com%2f)

## Installation Windows

	## Client (Dans un terminal)
	1) npm install
	2) npm install -g bower
	3) bower install
	4) npm install -g gulp
	5) gulp serve

	## Serveur (Dans un autre terminal)
	6) cd server
	7) npm install
	8) npm start


## Installation Linux
	
	## Client (Dans un terminal)
	1) sudo apt install npm
	2) npm install
	3) sudo ln -s /usr/bin/nodejs /usr/bin/node (facultatif)
	4) sudo npm install -g bower
	5) bower install
	6) sudo npm install -g gulp
	7) gulp serve
	
	## Serveur (Dans un autre terminal)
	6) cd server
	7) npm install
	8) npm start