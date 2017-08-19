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

        /**
         * @name setAuthHeader
         * @desc sets authorization header
         * @memberOf AuthManager
         */
        function setAuthHeader() {
            $http.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(localStorage.getItem("userInfo")).accessToken;
        }

        /**
         * @name globalUser
         * @desc return the logged in user
         * @memberOf AuthManager
         */
        function globalUser() {
            return {
                "userId": null,
                "accessToken": null,
                "name": null
            };
        }

        /**
         * @name setUserInfo
         * @desc set details of logged in user to localStorage
         * @memberOf AuthManager
         */
        function setUserInfo(user, accesstoken, name) {
            authApiFactory.globalUser.userId = user.username;
            authApiFactory.globalUser.accessToken = accesstoken;
            authApiFactory.globalUser.name = name;
            localStorage.setItem("userInfo", JSON.stringify(authApiFactory.globalUser));
        }

        /**
         * @name getUserInfo
         * @desc get details of logged in user
         * @memberOf AuthManager
         */
        function getUserInfo() {
            return JSON.parse(localStorage.getItem("userInfo"));
        }

        /**
         * @name clearCredentials
         * @desc remove all details of logged in user from localStorage
         * @memberOf AuthManager
         */
        function clearCredentials() {
            authApiFactory.globalUser.userId = null;
            authApiFactory.globalUser.accessToken = null;
            authApiFactory.globalUser.name = null;
            localStorage.clear("userInfo");
            authApiFactory.isUserLoggedIn = false;
        }

        /**
         * @name clearCredentials
         * @desc mocked the logout http call
         * @memberOf AuthManager
         */
        function logout() {
            var deferred = $q.defer();

            authApiFactory.clearCredentials();
            $http.defaults.headers.common["Authorization"] = "";
            deferred.resolve();
            authApiFactory.clearCredentials();
            return deferred.promise;
        }

        /**
         * @name authenticate
         * @desc mocked the login http call
         * @memberOf AuthManager
         */
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

        /**
         * @name setFlags
         * @desc set isUserLoggedIn flag
         * @memberOf AuthManager
         */
        function setFlags() {
            $rootScope.isUserLoggedIn = false;
        }

        return authApiFactory;
    }

})();
