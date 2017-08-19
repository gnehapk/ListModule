(function() {
    "use strict";

    angular
        .module("GitProjectsModule")
        .component("header", {

            restrict: "E",
            templateUrl: "/modules/header/header.html",
            bindings: { },
            controller: headerController,
            controllerAs: "header"
        });

    /*@ngInject*/
    function headerController($rootScope, $state, $scope, AuthManager, utils) {

        var vm = this;

        vm.logout = logout;

        /**
         * @name logout
         * @desc do logout and  perform all the post operations 
         * @memberOf headerController
         */
        function logout(){
            AuthManager.logout()
            .then(function (data) {
                AuthManager.setFlags();
            })
            .then(function () {
                $state.go("login");
            })
            .catch(function (e) {
                AuthManager.isUserLoggedIn = true;
                console.log("Logout Error: Logout Not Successful");
            });
        }

    }

})();