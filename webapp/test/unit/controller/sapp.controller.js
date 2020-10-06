/*global QUnit*/

sap.ui.define([
	"demo/ZMasterDetailDemo/controller/sapp.controller"
], function (Controller) {
	"use strict";

	QUnit.module("sapp Controller");

	QUnit.test("I should test the sapp controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});