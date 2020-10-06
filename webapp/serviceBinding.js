function initModel() {
	var sUrl = "/OData_Org/V2/(S(wori2zc4wrpwhokcjtsumppw))/OData/OData.svc/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}