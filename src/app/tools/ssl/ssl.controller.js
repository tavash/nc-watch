(function() {
	'use strict';

	angular
	.module('ncwatch')
	.filter('range', function() {
		return function(input, params) {
			var begin = parseInt(params.begin);
			var end = parseInt(params.end);
			var res=[]
			for(var i in input) {
				if(i>= begin && i <= end) {
					res.push(input[i]);
				}
			}
			return res;
		};
	})
	.filter('altNamesFilter', function() {
		return function(input) {
			var res=[]
			for(var i in input) {
				if(i<20) {
					res.push(input[i]);
				}
			}
			return res;
		};
	})
	.filter('validationTypeFilter', function() {
		return function(input) {
			return (input=='E')?"Extended":"no";
		}
	})
	.filter('renegSupportFilter', function() {
		return function(input) {
			var res = "";
			switch(input) {
				case 0:
				res = "insecure client-initiated renegotiation is supported"
				break;
				case 2:
				res = "secure renegotiation is supported"
				break;
				case 4:
				res = "secure client-initiated renegotiation is supported"
				break;
				case 8:
				res = "the server requires secure renegotiation support"
				break;
				default:
				res = "test failed"
			};
			return res;
		}
	})
	.filter('issuesFilter', function() {
		return function(input) {
			var res = "";
			switch(input) {
				case 1:
				res = "no chain of trust"
				break;
				case 2:
				res = "not before"
				break;
				case 4:
				res = "not after"
				break;
				case 8:
				res = "hostname mismatch"
				break;
				case 16:
				res = "revoked"
				break;
				case 32:
				res = "bad common name"
				break;
				case 64:
				res = "self-signed"
				break;
				case 128:
				res = "blacklisted"
				break;
				case 256:
				res = "insecure signature"
				break;
				default:
				res = "test failed"
			};
			return res;
		}
	})
	.filter('vulnBeastFilter', function() {
		return function(input) {
			return (input)?"vulnerable":"not vulnerable";
		}
	})
	.filter('poddleFilter', function() {
		return function(input) {
			return (input)?"vulnerable":"not vulnerable";
		}
	})
	.filter('poddleTlsFilter', function() {
		return function(input) {
			var res = "";
			switch(input) {
				case -3:
				res = "timeout"
				break;
				case -2:
				res = "TLS not supported"
				break;
				case -1:
				res = "test failed"
				break;
				case 0:
				res = "unknown"
				break;
				case 1:
				res = "not vulnerable"
				break;
				case 2:
				res = "vulnerable"
				break;
				default:
				res = "test failed"
			};
			return res;
		}
	})
	.filter('fallbackScsvFilter', function() {
		return function(input) {
			return (input)?"TLS_FALLBACK_SCSV supported":"TLS_FALLBACK_SCSV not supported";
		} 
	})
	.filter('compressionMethodsFilter', function() {
		return function(input) {
			return (input==1)?"yes":"no";
		} 
	})
	.filter('yesNowithBooleanFilter', function() {
		return function(input) {
			return (input)?"yes":"no";
		} 
	})
	.filter('openSslCcsFilter', function() {
		return function(input) {
			var res = "";
			switch(input) {
				case -1:
				res = "test failed"
				break;
				case 0:
				res = "unknown"
				break;
				case 1:
				res = "not vulnerable"
				break;
				case 2:
				res = "possibly vulnerable, but not exploitable"
				break;
				case 3:
				res = "vulnerable and exploitable"
				break;
				default:
				res = "test failed"
			};
			return res;
		}
	})
	.filter('forwardSecrecyFilter', function() {
		return function(input) {
			var res = "";
			switch(input) {
				case 1:
				res = "at least one browser from our simulations negotiated a Forward Secrecy suite"
				break;
				case 2:
				res = "FS is achieved with modern clients (based on Simulator results)"
				break;
				case 4:
				res = "all simulated clients achieve FS"
				break;
				default:
				res = "test failed"
			};
			return res;
		}
	})
	.filter('sessionResumptionFilter', function() {
		return function(input) {
			var res = "";
			switch(input) {
				case 0:
				res = "session resumption is not enabled and we're seeing empty session IDs"
				break;
				case 1:
				res = "endpoint returns session IDs, but sessions are not resumed"
				break;
				case 2:
				res = "session resumption is enabled"
				break;
				default:
				res = "test failed"
			};
			return res;
		}
	})
	.filter('sessionTicketsFilter', function() {
		return function(input) {
			var res = "";
			switch(input) {
				case 1:
				res = "supported"
				break;
				case 2:
				res = "implementation is faulty [not implemented]"
				break;
				case 4:
				res = "server is intolerant to the extension"
				break;
				default:
				res = "test failed"
			};
			return res;
		}
	})
	.filter('dhUsesKnownPrimesFilter', function() {
		return function(input) {
			var res = "";
			switch(input) {
				case 0:
				res = "no"
				break;
				case 1:
				res = "yes, but they're not weak"
				break;
				case 2:
				res = "yes and they're weak"
				break;
				default:
				res = "test failed"
			};
			return res;
		}
	})
	.filter('handshakeCompatibilityFilter', function() {
		return function(input) {
			return (input)?"no":"yes";;
		}
	})
	.filter('revocationStatusFilter', function() {
		return function(input) {
			var res = "";
			switch(input) {
				case 0:
				res = "not checked"
				break;
				case 1:
				res = "certificate revoked"
				break;
				case 2:
				res = "certificate not revoked"
				break;
				case 3:
				res = "revocation check error"
				break;
				case 4:
				res = "no revocation information"
				break;
				case 5:
				res = "internal error"
				break;
				default:
				res = "test failed"
			};
			return res;
		}
	})
	.controller('SslController', SslController);

	/** @ngInject */
	function SslController(SslService) {
		var vm = this;
		vm.getSsl = getSsl;

		function getSsl(){
			vm.isSsl = false;
			SslService.getSsl(vm.domain).success(function(res){
				vm.sslResult = res;
				vm.isSsl = true;
			});
		}

	}
})();
