(function () {
    'use strict';

    angular
        .module('ncwatch')
        .controller('GoogleDorksController', GoogleDorksController);

    /** @ngInject */
    function GoogleDorksController($window, GoogleDorksService) {
        var vm = this;
        var googleLink = "https://www.google.com/webhp?ie=utf-8&oe=utf-8gfe_rd=cr&ei=ILFGV6GTL7Ss8wer_7igAw#safe=off&q=";
        var googleGroupsLink = "https://groups.google.com/forum/#!search/";

        vm.dorkSelected = '';
        var dorksList = [];
        vm.dorksList = [
            {dork: googleLink + 'filetype:pdf site:', name: 'PDFs'},
            {dork: googleLink + 'filetype:xls OR filetype:xlsx site:', name: 'Excels'},
            {dork: googleLink + '', name: 'Emails'}, // TO DO
            {dork: googleGroupsLink, name: 'Google Groupes'},
            {dork: googleLink + 'filetype:ppt OR filetype:pptx site:', name: 'PowerPoint'},
            {dork: googleLink + 'filetype:doc OR filetype:docx site:', name: 'Words'},
            {dork: googleLink + 'filetype:xls OR filetype:ppt OR filetype:doc site:', name: 'Office 2003'},
            {dork: googleLink + 'filetype:xlsx OR filetype:pptx OR filetype:docx site:', name: 'Office 2007'},
            {dork: googleLink + 'filetype:rtf site:', name: 'RTF'},
            {dork: googleLink + '', name: 'Recherche'}, // TO DO
            {dork: googleLink + 'filetype:txt site:', name: 'TXTs'}
        ];

        vm.search = search;

        function search() {
            var toFind = vm.toFind;
            var dorkSelected = vm.dorkSelected;
            dorkSelected=JSON.parse(dorkSelected);

            if (dorkSelected.name == "Emails")
                dorkSelected.dork = googleLink + '"@' + toFind + '" -www. ';
            else if (dorkSelected.name == "Recherche")
                dorkSelected.dork = googleLink+"site:"+toFind+" -www.";

            $window.open(dorkSelected.dork + toFind);
        }
    }
})();