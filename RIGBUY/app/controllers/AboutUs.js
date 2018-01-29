// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var Communicator = Alloy.Globals.Communicator;
var DOMAIN_URL = Alloy.Globals.Constants.DOMAIN_URL;

//Set the commmunicator and constant class for Web service calling
// var Communicator = Alloy.Globals.Communicator;
// var DOMAIN_URL = Alloy.Globals.Constants.DOMAIN_URL;

$.webview.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};

// Create the left and Right navigation Button and set the Home screen title with language

/*
 * Function for open left drawer menu from home screen
 */
function openMenu() {

	if (OS_IOS) {
		Alloy.Globals.openLeft();
	} else {
		Alloy.Globals.drawer.toggleLeftWindow();
	}

}


var html2as = require('nl.fokkezb.html2as');

function openFunc(e) {
	aboutUsService();
}
if(OS_ANDROID){
	 aboutUsService();
}

//AboutUs Service

function aboutUsService() {

	if (Ti.Network.online) {
		Alloy.Globals.LoadingScreen.open();
		Communicator.get("http://rigbuy.com/webservices/index.php?action=product&actionMethod=getAboutUs", aboutUsSrviceCallback);
		Ti.API.info('URL ' + "http://rigbuy.com/webservices/index.php?action=product&actionMethod=getAboutUs");
	} else {

		Alloy.Globals.Alert("Please check your internet connection and try again.");

	}
}

function aboutUsSrviceCallback(e) {

	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.status == "1") {
					html2as(response.content, function(err, as) {

						if (err) {
							console.error(err);

						} else {

							$.webview.attributedString = as;

						}
					});
				} else {
					Alloy.Globals.Alert("No details found");
				}

			} else {
				Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_NO_DATA);

			}
		} catch(e) {
			Ti.API.info('Error aboutUs :: ' + e.message);

		}

	} else {
		Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_STATUS_CODE);

	}

	Alloy.Globals.LoadingScreen.close();

}
