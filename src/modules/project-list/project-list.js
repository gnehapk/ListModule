(function() {
    "use strict";

    angular
        .module("GitProjectsModule")
        .component("projectList", {

            restrict: "E",
            templateUrl: "/modules/project-list/project-list.html",
            bindings: {},
            controller: ListController,
            controllerAs: "listCntrl"
        });

    /*@ngInject*/
    function ListController($state, projectFactory, AuthManager, utils) {

        /* Controller instance */
        var vm = this;

        vm.goToReadMe = goToReadMe;
        vm.formatProjectName = utils.formatName;

        init();

        /**
         * @name init
         * @desc contains the initialisation logic
         * @memberOf ListController
         */
        function init() {
            vm.name = AuthManager.getUserInfo().name;

            projectFactory.getProjectList()
                .then(function(data) {
                    vm.projectList = data;
                });

        }

        /**
         * @name goToReadMe
         * @desc takes the user to readme page
         * @memberOf ListController
         */
        function goToReadMe($event, project) {
            $state.go("view", { userId: AuthManager.getUserInfo().userId, projectName: project.name });
        }

    }

})();
