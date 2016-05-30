(function () {
    'use strict';

    angular
        .module('ncwatch')
        .controller('GoogleDorksController', GoogleDorksController);

    /** @ngInject */
    function GoogleDorksController($window, GoogleDorksService) {
        var vm = this;

        vm.search = search;
        //var googleLink = https://www.google.com/webhp?ie=utf-8&oe=utf-8gfe_rd=cr&ei=ILFGV6GTL7Ss8wer_7igAw#safe=off&q=";
        var googleGroupsLink = "https://groups.google.com/forum/#!search/";

        vm.dorkSelected = '';
        vm.dorksList = [
            {dork: 'filetype:pdf site:', name: 'PDFs'},
            {dork: 'filetype:xls OR filetype:xlsx site:', name: 'Excels'},
            {dork: '', name: 'Emails'}, // TO DO
            {dork: googleGroupsLink, name: 'Google Groupes'},
            {dork: 'filetype:ppt OR filetype:pptx site:', name: 'PowerPoint'},
            {dork: 'filetype:doc OR filetype:docx site:', name: 'Words'},
            {dork: 'filetype:xls OR filetype:ppt OR filetype:doc site:', name: 'Office 2003'},
            {dork: 'filetype:xlsx OR filetype:pptx OR filetype:docx site:', name: 'Office 2007'},
            {dork: 'filetype:rtf site:', name: 'RTF'},
            {dork: '', name: 'Recherche'}, // TO DO
            {dork: 'filetype:txt site:', name: 'TXTs'}
        ];

        function search() {
            var domain = vm.domain;
            var dorkSelected = JSON.parse(vm.dorkSelected);
            var query;
            
            switch (dorkSelected.name){
                case 'Emails': query = '"@' + domain + '" -www. ' + domain; break;
                case 'Recherche': query = "site:" + domain + " -www." + domain; break;
                case 'Google Groupes': $window.open(dorkSelected.dork + domain); break;
                default: query = dorkSelected.dork + domain; break;
            }
            if(dorkSelected.name != 'Google Groupes'){
                GoogleDorksService.googleSearch(query).success(function(res){
                    var desc;
                    var word = vm.domain;
                    
                    for (var i = res.length - 1; i >= 0; i--) {
                        res[i].description = makeBold(word, res[i].description);
                        res[i].title = makeBold(word, res[i].title);
                    }

                    if(res.length>0){
                        vm.googleSearchResult = res;
                        vm.hasResult = true;
                    } else vm.hasResult = false;
                    
                }).error(function(err){console.log(err);});
            }
        }

        function makeBold(toBold, phrase){
            var reg = new RegExp("(" + toBold + ")", "gi");
            return phrase.replace(reg, "<b>$1</b>");
        }
    }
})();