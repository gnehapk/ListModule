(function() {
    "use strict";

    angular
        .module("GitProjectsModule")
        .service("projectFactory", projectFactory);

    /*@ngInject*/
    function projectFactory($http) {
        var vm = this;

        vm.getProjectList = function() {
            var url = "",
                getProjectListRequest,
                request;

            //mocking the API
            url = "/api/GetProjectList.json";

            //actual api call will look like /:username/projects

            getProjectListRequest = {
                method: "GET",
                url: url
            };

            request = angular.copy(getProjectListRequest);
            return $http(request).then(function(response) {
                return response.data;
            }, function(e) {
                console.log("Error Occurred: while fetching getting project list");
            });
        };

        vm.getReadme = function(name) {
            var url = "",
                getReadmeRequest,
                request;

            //mocking the single API call get readme for all projects
            url = "/api/GetProjectsReadme.json";

            //actual api call will look like /:username/project/:name
            //and separate API call will be there for each project

            getReadmeRequest = {
                method: "GET",
                url: url
            };

            request = angular.copy(getReadmeRequest);
            return $http(request).then(function(response) {
                return response.data[name];
            }, function(e) {
                console.log("Error Occurred: while fetching getting project list");
            });
        };

    }

})();
