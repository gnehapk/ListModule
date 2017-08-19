(function() {
    //"use strict";

    angular
        .module("GitProjectsModule")
        .component("viewProject", {

            restrict: "E",
            templateUrl: "/modules/project-readme/project-readme.html",
            bindings: {},
            controller: viewController,
            controllerAs: "viewCntrl"
        });

    /*@ngInject*/
    function viewController($state, $stateParams, projectFactory, utils) {

        /* Controller instance */
        var vm = this;

        vm.projectName = utils.formatName($stateParams.projectName);

        init();

        /**
         * @name init
         * @desc contains the initialisation logic
         * @memberOf viewController
         */
        function init() {
            projectFactory.getReadme($stateParams.projectName)
                .then(function(data) {
                    console.log(data);
                    vm.readme = data.readme;
                });

        }

    }

})();
