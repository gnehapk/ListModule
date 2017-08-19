(function() {
    "use strict";

    angular
        .module("GitProjectsModule")
        .factory("AuthManager", AuthManager);

    /*@ngInject*/
    function AuthManager($http, $q, $state, $rootScope, $timeout) {

        var authApiFactory;

        authApiFactory = {
            authenticateUser: authenticate,
            isUserLoggedIn: false,
            globalUser: globalUser(),
            getUserInfo: getUserInfo,
            clearCredentials: clearCredentials,
            logout: logout,
            setAuthHeader: setAuthHeader,
            setFlags: setFlags
        };

        function setAuthHeader() {
            $http.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(localStorage.getItem("userInfo")).accessToken;
        }

        function globalUser() {
            return {
                "userId": null,
                "accessToken": null
            };
        }

        function setUserInfo(user, accesstoken, name) {
            authApiFactory.globalUser.userId = user.username;
            authApiFactory.globalUser.accessToken = accesstoken;
            authApiFactory.globalUser.name = name;
            localStorage.setItem("userInfo", JSON.stringify(authApiFactory.globalUser));
        }

        function getUserInfo() {
            return JSON.parse(localStorage.getItem("userInfo"));
        }

        function clearCredentials() {
            authApiFactory.globalUser.userId = null;
            authApiFactory.globalUser.accessToken = null;
            authApiFactory.globalUser.name = null;
            localStorage.clear("userInfo");
            authApiFactory.isUserLoggedIn = false;
        }

        function logout() {
            var deferred = $q.defer();

            authApiFactory.clearCredentials();
            $http.defaults.headers.common["Authorization"] = "";
            deferred.resolve();
            authApiFactory.clearCredentials();
            return deferred.promise;
        }


        function authenticate(user) {
            var deferred = $q.defer();

            if (!!user) {

                //mocked the login API behaviour
                if (user.username === "neha_gupta" && user.password === "test") {
                    setUserInfo(user, "123456789", "Neha Gupta");
                    deferred.resolve({ name: "Neha Gupta" });
                } else {
                    deferred.reject({});
                }

                return deferred.promise;
            }
        }

        function setFlags() {
            $rootScope.isUserLoggedIn = false;
        }

        return authApiFactory;
    }

})();
