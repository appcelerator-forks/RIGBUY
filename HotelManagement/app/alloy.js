// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

// added during app creation. this will automatically login to
// ACS for your application and then fire an event (see below)
// when connected or errored. if you do not use ACS in your
// application as a client, you should remove this block

/**
 * Appcelerator Cloud (ACS) Admin User Login Logic
 *
 * fires login.success with the user as argument on success
 * fires login.failed with the result as argument on error
 */
Alloy.Globals.Communicator = require('Communicator');
Alloy.Globals.Constants = require('Constants');
Alloy.Globals.Measurement = require('alloy/measurement');

if (OS_IOS) {
	Alloy.Globals.LoadingScreen = Alloy.createWidget('Loader').getView();

} else {
	Alloy.Globals.LoadingScreen = Alloy.createWidget('Loader');

}

Alloy.Globals.iPhoneTall = (OS_IOS && Ti.Platform.osname == "iphone" && Ti.Platform.displayCaps.platformHeight == 480);
Alloy.Globals.iPhone5s = (OS_IOS && Ti.Platform.osname == "iphone" && Ti.Platform.displayCaps.platformHeight == 568);
Alloy.Globals.iPhoneIpad = (Ti.Platform.osname == "ipad");

Alloy.Globals.iPhoneSixPlus = (OS_IOS && Ti.Platform.osname == "iphone" && Ti.Platform.displayCaps.platformHeight == 736);

Alloy.Globals.iPhoneSix = (OS_IOS && Ti.Platform.osname == "iphone" && Ti.Platform.displayCaps.platformHeight == 667);

Alloy.Globals.iPhoneTallSixPlus = (OS_IOS && Ti.Platform.osname == "iphone" && Ti.Platform.displayCaps.platformHeight == 736 || Ti.Platform.displayCaps.platformHeight == 667);
String.prototype.capitalize = function() {
	try {
		return this.charAt(0).toUpperCase() + this.slice(1);
	} catch(e) {
		Ti.API.info('Error Fun : capitalize ');
	}
};
Alloy.Globals.langConvert = function L(text) {
	//	if (Ti.App.languageXML === undefined || Ti.App.languageXML === null) {
	try {
		var lang = Titanium.App.Properties.getString('locale');
		if (lang) {
			file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "strings" + lang.toUpperCase()+ ".xml");
		} else {
			file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "stringsEN.xml");
		}
		// Ti.API.info('LANG  + '+ file.nativePath);

		// Get the corresponding file from i18n
		if (!file.exists()) {
			var langFile = "en";
		}
		var xmltext = file.read().text;
		var xmldata = Titanium.XML.parseString(xmltext);
		// Parse the xml
		Ti.App.languageXML = xmldata;
		//}
		// Get the localised string from xml file
		var xpath = "/resources/string[@name='" + text + "']/text()";
		var result = Ti.App.languageXML.evaluate(xpath).item(0);
		if (result) {
			return result.text;
		} else {
			return text;
		}
	} catch(e) {
		Ti.API.info("Error langConvert "+e.message);
	}

};

Alloy.Globals.Alert = function(message) {
	var dialog = Ti.UI.createAlertDialog({
		title : Alloy.Globals.langConvert("app_name"),
	});
	dialog.ok = Alloy.Globals.langConvert("ok");
	dialog.message = message;
	dialog.show();

};

Alloy.Globals.padding = (Ti.Platform.displayCaps.platformWidth) * 0.0580;
Alloy.Globals.padding1 = (Alloy.Globals.padding * 2) + Alloy.Globals.padding;
Alloy.Globals.androidVersion = Ti.Platform.version.split('.');
Ti.API.info('Alloy.Globals.androidVersion ' + Alloy.Globals.padding + " Alloy.Globals.padding1 " + Alloy.Globals.padding1);

Alloy.Globals.padding_search_img = Alloy.Globals.padding + 10;

Alloy.Globals.normalpadding = (Ti.Platform.displayCaps.platformWidth) * 0.036;
Ti.API.info(" Alloy.Globals.normalpadding " + Alloy.Globals.normalpadding);

//-----platform and sizing variables
defaultWidth = 320;
//the base size of standard handset iphone (that apps were designed for)

deviceWidth = Titanium.Platform.displayCaps.platformWidth;
Alloy.Globals.scaleFactor = deviceWidth / defaultWidth;

// if (Alloy.Globals.languageEn) {
Alloy.Globals.loadingLbl.text = "Please wait...";
// } else if (Alloy.Globals.languageAr) {
//Alloy.Globals.loadingLbl.text = "أرجو الإنتظار...";
// }


//Code for show notification on search result success
Alloy.Globals.Notifier = Alloy.createWidget('ti.notifications', {
	message : 'Notification Test', // the message to display.
	duration : 2000, // time after go away. Valid for iOS7+ and Android
	//  icon: '/appicon.png', // icon to display on the left
	style : 'notification', // 'info', 'success', 'error', 'warn',  notification background blue, green, red or amber.
	elasticity : 0.5, // iOS7+ only
	pushForce : 30, // iOS7+ only
	usePhysicsEngine : true, // disable if you don't want on iOS7+
	animationDuration : 200, // animation sliding duration
});
