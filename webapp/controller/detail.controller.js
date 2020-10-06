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

	return Controller.extend("demo.ZMasterDetailDemo.controller.detail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf demo.ZMasterDetailDemo.view.detail
		 */
		onInit: function () {
this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("detail").attachPatternMatched(this.onEditMatched, this);
				var oModel = new sap.ui.model.odata.ODataModel("/OData_Org/V2/(S(wori2zc4wrpwhokcjtsumppw))/OData/OData.svc/", true);
			this.getView().setModel(oModel);
			
			
		},
		
			getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		OnNavBack: function () {
			this.getRouter().navTo("FirstPage", {}, true);
		},
		
			onEditMatched: function (oEvent) {
		var oParameters = oEvent.getParameters();
			var pId = this.getView().byId("txtid");
			var pName = this.getView().byId("Txtname");
			var pDesc = this.getView().byId("txtdesc");
			var pRelDate = this.getView().byId("txtdate");
			var pRating = this.getView().byId("txtrate");
			var pPrice = this.getView().byId("txtprice");

			var pNameN = this.getView().byId("txtNAmeN");
			var pDescN = this.getView().byId("txtdescp");

			var pRatingN = this.getView().byId("txtRating");
			var pPriceN = this.getView().byId("txtPrice");
			var that = this;
			var oModel = this.getView().getModel();

			if (oParameters.arguments.ID !== "" || oParameters.arguments.ID !== null) {
				this.ID = oParameters.arguments.ID;

				oModel.read("/Products(" + this.ID + ")", {
					success: function (odata, oResponse) {
						pId.setText(oResponse.data.ID);
						pName.setText(oResponse.data.Name);
						pDesc.setText(oResponse.data.Description);
						pRelDate.setText(oResponse.data.ReleaseDate);
						pRating.setText(oResponse.data.Rating);
						pPrice.setText(oResponse.data.Price);

						pNameN.setText(oResponse.data.Name);
						pDescN.setText(oResponse.data.Description);

						pRatingN.setText(oResponse.data.Rating);
						pPriceN.setText(oResponse.data.Price);
						//	pRelDate.setValue(oResponse.data.Pcity);
					},
					error: function (e) {
						MessageBox.error("error");
					}
				});
			} else {
				MessageBox.error("Please select correct Personal Info Id", {
					icon: sap.m.MessageBox.Icon.ERROR,
					title: "Error",
					onClose: function (oAction) {
						that._onNavBack();
					}
				});
			}
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
				"" || pRating.getValue() === "0" || pPrice.getValue() === "0") {
				MessageToast.show("Please Enter all required of data");
				return false;
			} else {

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
		 * @memberOf demo.ZMasterDetailDemo.view.detail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf demo.ZMasterDetailDemo.view.detail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf demo.ZMasterDetailDemo.view.detail
		 */
		//	onExit: function() {
		//
		//	}

	});

});