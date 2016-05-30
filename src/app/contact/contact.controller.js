(function() {
	'use strict';

	angular.module('ncwatch')
	.controller('ContactController', ContactController);

	/** @ngInject */
	function ContactController() {
		var vm = this;

		vm.contacts = [
			{'name': 'Robin BOBO', 'email': 'rho.bain.beaubeau@gmail.com', 'telephone': '06 57 43 93 23', 
			 'avatar': 'https://avatars3.githubusercontent.com/u/9933732?v=3&s=400',
			 'facebook': 'https://www.facebook.com/robin.bobo?fref=ts',
			 'linkedin': 'https://fr.linkedin.com/in/robin-bobo-52a36810a',
			 'github': 'https://github.com/RobinBobo'
			},
			{'name': 'Cécile BOURRAT', 'email': 'cescils@gmail.com', 'telephone': '06 57 43 93 23', 
			 'avatar': 'https://media.licdn.com/media/AAEAAQAAAAAAAASoAAAAJDJjYWNiYTY0LTY3ZTQtNGY5MC05NjMxLWMxM2QxYmI4ZTY4Zg.jpg',
			 'facebook': 'https://www.facebook.com/robin.bobo?fref=ts',
			 'linkedin': 'https://fr.linkedin.com/in/robin-bobo-52a36810a',
			 'github': 'https://github.com/cbourrat'
			},
			{'name': 'Sylvain CASTAING', 'email': 'sile20@gmail.com', 'telephone': '06 57 43 93 23', 
			 'avatar': 'https://scontent-cdg2-1.xx.fbcdn.net/t31.0-8/13147693_10209113994517043_2572348541746878816_o.jpg',
			 'facebook': 'https://www.facebook.com/robin.bobo?fref=ts',
			 'linkedin': 'https://fr.linkedin.com/in/robin-bobo-52a36810a',
			 'github': 'https://github.com/sylcastaing'
			},
			{'name': 'Fabien LE FLANCHEC', 'email': 'fab1.le.flanc.cheque@gmail.com', 'telephone': '06 57 43 93 23', 
			 'avatar': 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/10268715_776480792365229_7444468018800502239_n.jpg?oh=3518a6f23374b7d5f4d58f94d2c3877a&oe=57D6A4E9',
			 'facebook': 'https://www.facebook.com/robin.bobo?fref=ts',
			 'linkedin': 'https://fr.linkedin.com/in/robin-bobo-52a36810a',
			 'github': 'https://github.com/Atoutprix'
			},
			{'name': 'Florian PUSSACQ', 'email': 'flot.riz.on@gmail.com', 'telephone': '06 57 43 93 23', 
			 'avatar': 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/524141_3738132413570_304542193_n.jpg?oh=41e83d9c8ad94f5d83268dcb8c4e4a23&oe=57C1C86D',
			 'facebook': 'https://www.facebook.com/robin.bobo?fref=ts',
			 'linkedin': 'https://fr.linkedin.com/in/robin-bobo-52a36810a',
			 'github': 'https://github.com/florian2412'
			},
			{'name': 'Tavahiura SANG', 'email': 'tavash.songs@gmail.com', 'telephone': '06 57 43 93 23', 
			 'avatar': 'https://scontent-cdg2-1.xx.fbcdn.net/t31.0-8/10321031_10204503038075179_8792692438382031990_o.jpg',
			 'facebook': 'https://www.facebook.com/robin.bobo?fref=ts',
			 'linkedin': 'https://fr.linkedin.com/in/robin-bobo-52a36810a',
			 'github': 'https://github.com/Tavash'
			}
		];
		
	}
})();
