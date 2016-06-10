(function() {
    'use strict';

    angular
        .module('ncwatch')
        .controller('WhoIsController', WhoIsController);


    /** @ngInject */
    function WhoIsController($mdToast, WhoIsService, ToolsService, HowToMessages, InfosMessages) {

        var vm = this;

        vm.whois = whois;
        vm.exportData = exportData;
        vm.WHOIS_HOW_TO = HowToMessages.whois;
        vm.WHOIS_MESSAGE_INFO = InfosMessages.whois;

        function whois(){
            var domain = vm.domain;
            vm.saveDomain = domain;
            vm.isMap = false;

            WhoIsService.whois(domain).success(function(res) {
                vm.whoIsResult = res;
                var addressSiegeSocial = null;
                // On ajoute l'adresse d siège social si elle existe
                if (vm.whoIsResult.adminStreet && vm.whoIsResult.adminCity && vm.whoIsResult.adminPostalCode) {
                    addressSiegeSocial = vm.whoIsResult.adminStreet + " "
                        + vm.whoIsResult.adminCity + " "
                        + vm.whoIsResult.adminPostalCode
                }
                // Si on a une adresse de siège social, on affiche la map
                if (addressSiegeSocial != null) {
                    vm.isMap = true;
                    L.mapbox.accessToken = 'pk.eyJ1IjoiY2JvdXJyYXQiLCJhIjoiY2lvbzM4ZGYwMDAwcHhxbTBzNHRqZ2J6bCJ9.YrIsnLc70m-rU1rQ8M8aAA';
                    var mapboxTiles = L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
                        attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    });

                    vm.map = L.map('map')
                        .addLayer(mapboxTiles);

                    getGeocode("Siège Social", addressSiegeSocial, 9);
                }
                vm.iswhois = true;
            });
        }

        function exportData() {
            ToolsService.exportDataInFile('whois', vm.saveDomain, vm.whoIsResult)
                .success(function() {
                    showSimpleToast('Les résultats de Who Is ont bien été exportés (dossier export de l\'application) !')
                });
        }

        function showSimpleToast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('bottom')
                    .hideDelay(3000)
            );
        }

        function getGeocode(name, address, zoom) {
            WhoIsService.geocode(address).success(function(data) {
                if (data.status == 'OK') {
                    var lat = data.results[0].geometry.location.lat;
                    var long = data.results[0].geometry.location.lng;
                    var marker = L.marker([lat, long])
                        .addTo(vm.map);
                    marker.bindPopup(name + " " + address).openPopup();
                    vm.map.setView([lat, long], zoom);
                }
            });
        }
    }
})();