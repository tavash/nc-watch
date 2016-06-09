(function() {
    'use strict';

    angular
        .module('ncwatch')
        .controller('AnalyzerController', AnalyzerController);

    /** @ngInject */
    function AnalyzerController(AnalyzerService, ToolsService, $mdDialog, $mdToast, HowToMessages, InfosMessages) {
        var vm = this;
        vm.analyzer = analyzer;
        vm.exportData = exportData;
        vm.prefixeSelected = 'http://';
        vm.ANALYZER_HOW_TO = HowToMessages.analyzer;
        vm.ANALYZER_MESSAGE_INFO = InfosMessages.analyzer;

        vm.isAnalyzer = false;
        vm.isRobots = false;
        vm.isHtaccess = false;
        vm.isSitemap = false;

        vm.analyzerResult = {};
        vm.robotsTxtResult = {};
        vm.htaccess = '';
        vm.sitemap = '';

        function analyzer() {
            var url = vm.prefixeSelected + vm.url;
            vm.saveDomain = vm.url;
            vm.isAnalyzer = false;
            vm.isRobots = false;
            vm.isHtaccess = false;
            vm.isSitemap = false;

            // Analyzer de l'index du site
            AnalyzerService.analyzer(url).success(function(res){
                if (res.err) {
                    vm.isAnalyzer = false;
                    vm.analyzerResult = {};
                    showErreurDialog(res.err);
                } else {
                    getSitemap(url);
                    getRobots(url);
                    getHtaccess(url);
                    vm.analyzerResult = res;
                    vm.saveAnalyzerResult = res;
                    delete vm.analyzerResult.body;
                    vm.isAnalyzer = true;
                }
            });
        }

        function exportData() {
            ToolsService.exportDataInFile('analyzer', vm.saveDomain, vm.saveAnalyzerResult);
            ToolsService.exportDataInFile('robots', vm.saveDomain, vm.robotsTxtResult);
        }

        function getSitemap(url) {

            var sitemapUrl = url + '/sitemap.xml';
            vm.sitemap = '';

            AnalyzerService.analyzer(sitemapUrl).success(function(res){
                if (res.err) {
                    vm.isSitemap = false;
                } else {
                    if (res.statusCode == 200) {
                        if (sitemapUrl == res.request.uri.href) {
                            vm.sitemap = 'Sitemap <b>trouvé</b> à l\'adresse <a href="' + sitemapUrl + '" target="_blank">' + sitemapUrl + '</a>';
                        } else {
                            vm.sitemap = 'Sitemap <b>trouvé</b> à l\'adresse <a href="' + res.request.uri.href + '" target="_blank">' + res.request.uri.href + '</a>';
                        }

                    } else {
                        vm.sitemap = 'Sitemap <b>introuvable</b> à l\'adresse <a href="' + sitemapUrl + '" target="_blank">' + sitemapUrl + '</a>';
                    }
                    vm.isSitemap = true;
                }
            });
        }

        // Récupération du Robots.txt
        function getRobots(url) {
            AnalyzerService.getRobots(url).success(function(res) {
                if (res.err) {
                    vm.isRobots = false;
                    vm.robotsTxtResult = {};
                    showToastRobotsErreur();
                } else {
                    vm.robotsTxtResult = res;
                    vm.isRobots = true;
                }
            });
        }

        // Récupération du Htaccess
        function getHtaccess(url) {
            vm.htaccess = '';
            var urlHtaccess = url + '/.htaccess';
            AnalyzerService.analyzer(urlHtaccess).success(function(res) {
                if (!res.err) {
                    vm.isHtaccess = true;
                    switch (res.statusCode) {
                        case 403:
                            vm.htaccess = 'Forbidden';
                            break;
                        case 404:
                            vm.htaccess = 'Not Found';
                            break;
                        case 200:
                            if (urlHtaccess == res.request.uri.href) {
                                vm.htaccess = 'Accessible';
                            } else {
                                vm.htaccess = 'Forbidden';
                            }
                            break;
                    }
                }
            });
        }

        function showErreurDialog(err) {
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Erreur')
                    .textContent(err + ' ' + vm.prefixeSelected + vm.url)
                    .ok('Fermer')
            );
        }

        function showToastRobotsErreur() {
            $mdToast.show(
                $mdToast.simple().position('top')
                    .textContent('Aucun Robots.txt n\'a été trouvé'));
        }
    }

    angular.module('ncwatch').filter('decodeURL', function() {
        return function(input) {
            if (input) {
                return decodeURIComponent(input);
            } else {
                return '';
            }
        }
    });

    angular.module('ncwatch').filter('join', function() {
        return function(input) {
            if (input) {
                return input.join(', ');
            } else {
                return '';
            }
        }
    });
})();
