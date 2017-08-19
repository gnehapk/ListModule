(function() {
    "use strict";

    angular
        .module("GitProjectsModule")
        .component("login", {

            restrict: "E",
            templateUrl: "/modules/login/login.html",
            bindings: {},
            controller: LoginController,
            controllerAs: "loginCntrl"
        });

    /*@ngInject*/
    function LoginController($state, $rootScope, $interval, AuthManager) {

        /* Controller instance */
        var vm = this;

        vm.user = {};
        vm.showPassword = "password";
        vm.errorMsg = "";
        vm.login = login;

        if (AuthManager.isUserLoggedIn) {
            $state.go("list");
        }

        /**
         * @name login
         * @desc do login and  perform all the post operations 
         * @memberOf LoginController
         */
        function login() {

            vm.formSubmitInProgress = true;

            if (validateUiFields()) {

                AuthManager.authenticateUser(vm.user)
                    .then(function(data) {
                        AuthManager.isUserLoggedIn = true;
                        AuthManager.setAuthHeader();
                    })
                    .then(function() {
                        $rootScope.isUserLoggedIn = true;
                        $state.go("list", {userId: vm.user.username});
                    })
                    .catch(function() {
                        AuthManager.isUserLoggedIn = false;
                        vm.errorMsg = "The username or password you entered does not match our records. Please try again.";
                        vm.user.password = "";
                    })
                    .finally(function() {
                        vm.formSubmitInProgress = false;
                    });
            } else {
                vm.formSubmitInProgress = false;
            }
        }

        /**
         * @name login
         * @desc validates the login page fields 
         * @memberOf LoginController
         */
        function validateUiFields() {
            var isFormValid = true,
                form = vm.signInForm;

            if (form.username.$invalid) {
                vm.invalidFormMessage = "Please specify valid email id.";
                isFormValid = false;
            } else if (form.password.$invalid) {
                vm.invalidFormMessage = "Please specify valid password.";
                isFormValid = false;
            }

            return isFormValid;

        }
    }

})();
