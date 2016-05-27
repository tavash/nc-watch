(function() {
	'use strict';

	angular
	.module('ncwatch')
	.controller('WhoIsController', WhoIsController);


	/** @ngInject */
	function WhoIsController(WhoIsService) {

		var vm = this;

		L.mapbox.accessToken = 'pk.eyJ1IjoiY2JvdXJyYXQiLCJhIjoiY2lvbzM4ZGYwMDAwcHhxbTBzNHRqZ2J6bCJ9.YrIsnLc70m-rU1rQ8M8aAA';
		var mapboxTiles = L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
			attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		});

		vm.map = L.map('map')
		.addLayer(mapboxTiles);

		getGeocode("5 FERREAU SUD BAYAS 33230", true, 10);

		vm.whois = whois;

		function whois(){
			var domain = vm.domain;

			WhoIsService.whois(domain).success(function(res) {
				vm.whoIsResult = res;
			});
		}

		function getGeocode(address, marker, zoom) {
			WhoIsService.geocode(address).success(function(data) {
				if (data.status == 'OK') {
					var lat = data.results[0].geometry.location.lat;
					var long = data.results[0].geometry.location.lng;
					if (marker) {
						L.marker([lat, long]).addTo(vm.map);
					}
					vm.map.setView([lat, long], zoom);
				}
			});
		}
	}
})();