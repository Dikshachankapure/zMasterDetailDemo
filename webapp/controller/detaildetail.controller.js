sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/m/MessageToast"
	], function (Controller, MessageBox, History, JSONModel, Fragment, Filter, MessageToast) {
	"use strict";

	return Controller.extend("demo.ZMasterDetailDemo.controller.detaildetail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf demo.ZMasterDetailDemo.view.detaildetail
		 */
		onInit: function () {
	this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("detaildetail").attachPatternMatched(this._onDetailMatched, this);

			var oModel = new sap.ui.model.odata.ODataModel("/OData_Org/V2/(S(fzk0cj25vbpedfgpyoup5jtg))/OData/OData.svc/", true);
			this.getView().setModel(oModel);
		},
			getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		OnNavBack: function () {
			this.getRouter().navTo("FirstPage", {}, true);
		},


OnSave: function () {
				var oModel = this.getView().getModel();

			var pId = this.getView().byId("txtProID");
			var pName = this.getView().byId("txtpronm");
			var pProDescp = this.getView().byId("txtProDesc");
			var pRelDate = this.getView().byId("txtRdate");
			var pRating = this.getView().byId("txtRating");
			var pPrice = this.getView().byId("txtPrice");

			if (pId.getValue() === 0 || pId.getValue() === "" || pName.getValue() === "" || pProDescp.getValue() === "" || pRelDate.getValue() ===
				"" || pRating.getValue() === "0" || pPrice.getValue() === "0"	) {
				MessageToast.show("Please fill all  required Data");
			} else {
				// Get the Model in the view 
				var oModelDemo = this.getOwnerComponent().getModel("DemoData");
				this.getView().setModel(oModelDemo);

				var oModel = this.getView().getModel();

				// Get the Number of records in file
			//	var ReqNumber = oModel.getProperty("/DemoList").length;

			//	var NewReqNo = ReqNumber + 1;
			
				var oItems = {};
				var that = this;
				oItems.ID = pId.getValue();
				oItems.Name = pName.getValue();
				oItems.Description = pProDescp.getValue();
				oItems.ReleaseDate = pRelDate.getValue();
				oItems.Rating = pRating.getValue();
				oItems.Price = pPrice.getValue();
				

					oModel.create("/Products", oItems, {
					success: function (res) {
						MessageBox.success("Record Created Successfully", {
							icon: sap.m.MessageBox.Icon.SUCCESS,
							title: "Success",

							onClose: function (oAction) {
								that.OnReset();
							//	oModel.refresh();
							}
						});
					},
					error: function (err) {
						MessageBox.error("Error : " + err);
					}
				});
			}
		}, 

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf demo.ZMasterDetailDemo.view.detaildetail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf demo.ZMasterDetailDemo.view.detaildetail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf demo.ZMasterDetailDemo.view.detaildetail
		 */
		//	onExit: function() {
		//
		//	}

	});

});