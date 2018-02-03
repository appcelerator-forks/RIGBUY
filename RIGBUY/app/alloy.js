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
(function() {
	var ACS = require('ti.cloud'),
	    env = Ti.App.deployType.toLowerCase() === 'production' ? 'production' : 'development',
	    username = Ti.App.Properties.getString('acs-username-' + env),
	    password = Ti.App.Properties.getString('acs-password-' + env);

	// if not configured, just return
	if (!env || !username || !password) {
		return;
	}
	/**
	 * Appcelerator Cloud (ACS) Admin User Login Logic
	 *
	 * fires login.success with the user as argument on success
	 * fires login.failed with the result as argument on error
	 */
	ACS.Users.login({
		login : username,
		password : password,
	}, function(result) {
		if (env === 'development') {
			Ti.API.info('ACS Login Results for environment `' + env + '`:');
			Ti.API.info(result);
		}
		if (result && result.success && result.users && result.users.length) {
			Ti.App.fireEvent('login.success', result.users[0], env);
		} else {
			Ti.App.fireEvent('login.failed', result, env);
		}
	});

})();
Alloy.Globals.ImageFactory = require("ti.imagefactory");
var toast = Alloy.createWidget('nl.fokkezb.toast', 'global', {
	// defaults
});

Alloy.Globals.toast = toast.show;
// same as toast.info
Alloy.Globals.error = toast.error;

Alloy.Globals.validateCaseSensitiveEmail = function(email) {
	var reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
	if (reg.test(email)) {
		return true;
	} else {
		return false;
	}
};

//-----platform and sizing variables
Alloy.Globals.Communicator = require('Communicator');
Alloy.Globals.Constants = require('Constants');
Alloy.Globals.Measurement = require('alloy/measurement');
if (OS_IOS) {
	defaultWidth = 320;

	//the base size of standard handset iphone (that apps were designed for)
	deviceWidth = Titanium.Platform.displayCaps.platformWidth;
	Alloy.Globals.scaleFactor = deviceWidth / defaultWidth;
} else {
	Alloy.Globals.abx = require('com.alcoapps.actionbarextras');
	// defaultWidth = 400;
	//the base size of standard handset iphone (that apps were designed for)
	deviceWidth = Alloy.Globals.Measurement.pxToDP(Titanium.Platform.displayCaps.platformWidth) * 0.0028;
	Ti.API.info("*******" + deviceWidth);
	Alloy.Globals.scaleFactor = deviceWidth;
}

Alloy.Globals.Alert = function(message) {
	if (OS_IOS) {
		var dialog = Ti.UI.createAlertDialog({
			title : "RIGBUY",
		});
		dialog.ok = "OK";
		dialog.message = message;
		dialog.show();
	} else {
		var toast = Ti.UI.createNotification({
			message : message,
			duration : Ti.UI.NOTIFICATION_DURATION_LONG
		});
		toast.show();
	}

};
if (OS_IOS) {
	Alloy.Globals.LoadingScreen = Alloy.createWidget('Loader').getView();
} else {
	Alloy.Globals.LoadingScreen = Alloy.createWidget('Loader');

}

Alloy.Globals.androidVersion = Ti.Platform.version.split('.');

Alloy.Globals.goToHome = function(win) {

	if (win == null) {
		return;
	}
	if (win.oldWin != null) {
		Alloy.Globals.goToHome(win.oldWin);
	}
	if (OS_ANDROID) {
		if (win.name == "setting" || win.name == "about" || win.name == "contact"|| win.name == "terms"|| win.name == "privacy") {
			Alloy.Globals.mainVW.remove(win);
		} else {
			win.close();
		}

	} else {
		win.close({
			animated : false
		});
	}
	try {
		// Alloy.Globals.refreshItem.visible = true;
		// Alloy.Globals.searchItem.visible = true;
	} catch(e) {
	}
};
