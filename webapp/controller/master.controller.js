sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("demo.ZMasterDetailDemo.controller.master", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf demo.ZMasterDetailDemo.view.master
		 */
		onInit: function () {
			var oModel = new sap.ui.model.odata.ODataModel("/OData_Org/V2/(S(wori2zc4wrpwhokcjtsumppw))/OData/OData.svc/", true);
			this.getView().setModel(oModel);
			
			
		/*	var oList = this.getView().byId("productList");
			oList.attachUpdateFinished(function (oEvent) {

				oEvent.getSource().getItems()[0].firePress();
			});*/

		},
		
		onSearch: function (oEvent) {
			var sQuery = oEvent.getParameter("query");

			var oFilter = new sap.ui.model.Filter({
				// two filters
				filters: [
					new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sQuery), // filter for value 1
					new sap.ui.model.Filter("Description", sap.ui.model.FilterOperator.Contains, sQuery) // filter for value 2
				]
			});
			var oBinding = this.byId("productList").getBinding("items");
			oBinding.filter(oFilter, sap.ui.model.FilterType.Application);
		},
		
			onSortProductByPrice: function (oEvent) {

			/*	var oList = this.getView().byId("list123");
				var oBinding = oList.getBinding("items");*/
			var oListBinding = this.byId("productList").getBinding("items");
			var SORTKEY = "Price";

			var flag = this.flagval;
			var DESCENDING = "";
			if (this.flagval === 0 || this.flagval === undefined) {
				DESCENDING = true;
				this.flagval = 1;
			} else if (flag === 1) {
				DESCENDING = false;
				this.flagval = 0;
			}

			var GROUP = false;
			var aSorter = [];
			aSorter.push(new sap.ui.model.Sorter(SORTKEY, DESCENDING, GROUP));
			oListBinding.sort(aSorter);

		},
		
			onGrouping: function (oEvent) {
			var oListBinding = this.byId("productList").getBinding("items");
			var SORTKEY = "Rating";

			var flag = this.flagval;
			var GROUPING = "";
			if (this.flagval === 0 || this.flagval === undefined) {
				GROUPING = true;
				this.flagval = 1;
			} else if (flag === 1) {
				GROUPING = false;
				this.flagval = 0;
			}

			var DESCENDING = false;
			var aSorter = [];
			aSorter.push(new sap.ui.model.Sorter(SORTKEY, DESCENDING, GROUPING));
			oListBinding.sort(aSorter);

		},
		
			getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
/*
		onItemPress: function (oEvent) {

			var obj = oEvent.getSource().getBindingContext().getObject();
			//Get the Model. 
			this.getRouter().navTo("detail", {
				ID: obj.ID
			});
		},*/
		
		onItemPress : function(oEvent){
		var selectedItemTitle = oEvent.getSource().getTitle();
		this.getOwnerComponent().getRouter().navTo("detail", {title : selectedItemTitle});
	},

	onAdd: function () {
			this.getRouter().navTo("DetailDetail", {}, true);
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf demo.ZMasterDetailDemo.view.master
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf demo.ZMasterDetailDemo.view.master
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf demo.ZMasterDetailDemo.view.master
		 */
		//	onExit: function() {
		//
		//	}

	});

});