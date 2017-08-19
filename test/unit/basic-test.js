"use strict";

describe("Common tests", function() {

    var gitModule;

    beforeEach(function() {
         gitModule = module("GitProjectsModule");
    });

    it("GitProjectsModule should be registered", function() {
    	expect(gitModule).not.to.equal(null);
    });

});