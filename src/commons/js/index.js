//# sourceURL=list-git-projects.js
(function() {
    "use strict";

    angular
        .module("GitProjectsModule", ["ui.router", "ui.bootstrap"])
        .config(function($stateProvider, $locationProvider) {

            $stateProvider
                .state("login", {
                    url: "/",
                    template: "<login></login>"
                })
                .state("list", {
                    url: "/:userId",
                    template: "<project-list></project-list>"
                })
                .state("view", {
                    url: "/:userId/:projectName",
                    template: "<view-project></view-project>"
                });

            $locationProvider.html5Mode(true);
        })
        .run(function($rootScope, $state, AuthManager) {
            
            /*check whether the localStorage has user info when user refresh the page.
              If localStorage doesn't has user info, it takes the user to login page*/
            if (JSON.parse(localStorage.getItem("userInfo")) && JSON.parse(localStorage.getItem("userInfo")).userId && JSON.parse(localStorage.getItem("userInfo")).accessToken) {
                AuthManager.isUserLoggedIn = true;
                AuthManager.setAuthHeader();
                $rootScope.isUserLoggedIn = true;
            } else {
                AuthManager.isUserLoggedIn = false;
                $rootScope.isUserLoggedIn = false;
                $state.go("login");
            }
        });

}());
