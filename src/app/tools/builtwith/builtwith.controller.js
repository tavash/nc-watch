(function() {
    'use strict';

    angular
        .module('ncwatch')
        .controller('BuiltwithController', BuiltwithController);

    /** @ngInject */
    function BuiltwithController(BuiltwithService, HowToMessages, InfosMessages) {
        var vm = this;

        vm.builtwith = builtwith;
        vm.isLoad = false;
				vm.BUILTWITH_HOW_TO = HowToMessages.buildwith;
				vm.BUILTWITH_MESSAGE_INFO = InfosMessages.buildwith;


        function builtwith(){
          
            BuiltwithService.builtwith(vm.domain)
                .success(function(res){
                    vm.builtwithResult = res;

                    // On récupère seulement les technologies trouvées et utilisées
                    vm.builtwithTechnologiesResult = res.Results[0].Result.Paths[0].Technologies;

                    var tagsName = [];
                    for(var i = 0; i < vm.builtwithTechnologiesResult.length; i++) {
                        if(tagsName.indexOf(vm.builtwithTechnologiesResult[i].Tag) === -1)
                            tagsName.push(vm.builtwithTechnologiesResult[i].Tag);
                    }

                    var techByTag = sortTechnologiesByTag(tagsName, vm.builtwithTechnologiesResult);

                    vm.techByTag = techByTag;
                    vm.isLoad = true;
                });
        }

        function sortTechnologiesByTag(tagsName, technologies) {

            var techByTag = getRealTagsName(tagsName);

            for(var i = 0; i < technologies.length; i++) {
                var indexOfTag = arrayObjectIndexOf(techByTag, technologies[i].Tag, 'shortTagName');
                if (indexOfTag != -1)
                    techByTag[indexOfTag].technologies.push(technologies[i]);
            }
            return techByTag;
        }

        function getRealTagsName(tagsName) {
            var realTagsName = [];
            for(var i = 0; i < tagsName.length; i++) {
                var data;
                switch (tagsName[i]) {
                    case 'hosting':
                        data = {
                            shortTagName: tagsName[i],
                            realTagName: "Hosting Providers",
                            technologies: []
                        };
                        realTagsName.push(data);
                        break;
                    case 'Web Server':
                        data = {
                            shortTagName: tagsName[i],
                            realTagName: "Web Server",
                            technologies: []
                        };
                        realTagsName.push(data);
                        break;
                    case 'Server':
                        data = {
                            shortTagName: tagsName[i],
                            realTagName: "Operating Systems and Servers",
                            technologies: []
                        };
                        realTagsName.push(data);
                        break;
                    case 'ssl':
                        data = {
                            shortTagName: tagsName[i],
                            realTagName: "SSL Certificate",
                            technologies: []
                        };
                        realTagsName.push(data);
                        break;
                    case 'ns':
                        data = {
                            shortTagName: tagsName[i],
                            realTagName: "Name Server",
                            technologies: []
                        };
                        realTagsName.push(data);
                        break;
                    case 'widgets':
                        data = {
                            shortTagName: tagsName[i],
                            realTagName: "Widgets",
                            technologies: []
                        };
                        realTagsName.push(data);
                        break;
                    case 'javascript':
                        data = {
                            shortTagName: tagsName[i],
                            realTagName: "JavaScript Libraries",
                            technologies: []
                        };
                        realTagsName.push(data);
                        break;
                    case 'cms':
                        data = {
                            shortTagName: tagsName[i],
                            realTagName: "Content Management Systems",
                            technologies: []
                        };
                        realTagsName.push(data);
                        break;
                    case 'analytics':
                        data = {
                            shortTagName: tagsName[i],
                            realTagName: "Analytics and Tracking",
                            technologies: []
                        };
                        realTagsName.push(data);
                        break;
                    case 'framework':
                        data = {
                            shortTagName: tagsName[i],
                            realTagName: "Frameworks",
                            technologies: []
                        };
                        realTagsName.push(data);
                        break;
                    case 'feeds':
                        data = {
                            shortTagName: tagsName[i],
                            realTagName: "Aggregation Functionality",
                            technologies: []
                        };
                        realTagsName.push(data);
                        break;
                    case 'cdn':
                        data = {
                            shortTagName: tagsName[i],
                            realTagName: "Content Delivery Network",
                            technologies: []
                        };
                        realTagsName.push(data);
                        break;
                    case 'mx':
                        data = {
                            shortTagName: tagsName[i],
                            realTagName: "Email Hosting Providers",
                            technologies: []
                        };
                        realTagsName.push(data);
                        break;
                    default:
                        data = {
                            shortTagName: tagsName[i],
                            realTagName: "Other",
                            technologies: []
                        };
                        realTagsName.push(data);
                        break;
                }
            }
            return realTagsName;
        }

        function arrayObjectIndexOf(myArray, searchTerm, property) {
            for(var i = 0, len = myArray.length; i < len; i++) {
                if (myArray[i][property] === searchTerm) return i;
            }
            return -1;
        }

    }
})();