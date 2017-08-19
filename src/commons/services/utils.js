(function() {
    "use strict";

    angular
        .module("GitProjectsModule")
        .service("utils", utils);

    /*@ngInject*/
    function utils() {

        /* Cache the reference to this pointer */
        var vm = this;

        vm.formatName = function(name) {
            var str;

            str = name.split("_").join(" ");
            str = str.charAt(0).toUpperCase() + str.slice(1);

            return str;

        };
    };
})();
