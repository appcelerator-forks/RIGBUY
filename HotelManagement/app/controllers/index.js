/*
 *This function for close the all the child windows
 */
Alloy.Globals.isLogin = false;
Alloy.Globals.isCart =false;
Alloy.Globals.goToHome = function(win) {
	Ti.API.info('Name--------' + "  " + win);
	if (win == null) {
		return;
	}
	if (win.oldWin != null) {
		Alloy.Globals.goToHome(win.oldWin);
	}
	if (OS_ANDROID) {
		Alloy.Globals.mainVW.remove(win);
	} else {
		win.close({
			animated : false
		});
	}
};
/*
 * Function for open the Home Screen
 */
var lang = Titanium.App.Properties.getString('locale');
Alloy.Globals.openHome = function(response, loginObj, loginBtn) {
	try {
		var NappSlideMenu = require('dk.napp.slidemenu');
		var ledge = 90;

		if (Ti.Platform.displayCaps.platformHeight == 568) {
			ledge = 90;
			Alloy.Globals.homedrawerWidth = Ti.Platform.displayCaps.platformWidth - ledge;
		} else if (Ti.Platform.displayCaps.platformHeight == 736) {
			ledge = 94;
			Alloy.Globals.homedrawerWidth = Ti.Platform.displayCaps.platformWidth - ledge;
		} else if (Ti.Platform.displayCaps.platformHeight == 667) {
			ledge = 94;
			Alloy.Globals.homedrawerWidth = Ti.Platform.displayCaps.platformWidth - ledge;
		} else if (Ti.Platform.displayCaps.platformHeight == 480) {
			ledge = 90;
			Alloy.Globals.homedrawerWidth = Ti.Platform.displayCaps.platformWidth - ledge;
		} else {
			if (Alloy.isTablet) {
				ledge = 150;
				Alloy.Globals.homedrawerWidth = Ti.Platform.displayCaps.platformWidth - ledge;

			} else {
				ledge = 95;
				Alloy.Globals.homedrawerWidth = Ti.Platform.displayCaps.platformWidth - ledge;
			}
		}
		Alloy.Globals.ledge = ledge;
		var lang = Titanium.App.Properties.getString('locale');

		var homeScreen = Alloy.createController("Home", response);
		Alloy.Globals.homeObj = homeScreen;
		Alloy.Globals.drawer = NappSlideMenu.createSlideMenuWindow({
			centerWindow : homeScreen.navWindow,
			backgroundColor : "#fff"
		});
		if (lang == "ar") {
			if (Alloy.isTablet) {
				Alloy.Globals.drawer.rightLedge = ledge;
			}
			Alloy.Globals.drawer.leftWindow = null;
			Alloy.Globals.drawer.rightWindow = homeScreen.rightWindow;

		} else {
			if (Alloy.isTablet) {
				Alloy.Globals.drawer.leftLedge = ledge;
			}
			Alloy.Globals.drawer.leftWindow = homeScreen.leftWindow;
			Alloy.Globals.drawer.rightWindow = null;
		}

		Alloy.Globals.openLeft = function() {
			Alloy.Globals.drawer.setCenterhiddenInteractivity("TouchDisabledWithTapToClose");
			Alloy.Globals.drawer.toggleLeftView();
		};
		Alloy.Globals.openRight = function() {
			Alloy.Globals.drawer.setCenterhiddenInteractivity("TouchDisabledWithTapToClose");
			Alloy.Globals.drawer.toggleRightView();
		};
		Alloy.Globals.drawer.addEventListener("open", function(e) {
			this.setPanningMode("FullViewPanning");
			this.setCenterhiddenInteractivity("TouchDisabledWithTapToClose");

		});

		Alloy.Globals.drawer.open();
		if (loginObj) {
			loginBtn.focusable = true;
			loginObj.close();
			loginObj = null;
		}
	} catch(e) {
		Ti.API.info('MESS : ' + e.message);
	}

};
Ti.API.info('**************************** ' + Ti.App.Properties.getString("hotel_id"));
if (Ti.App.Properties.getString("hotel_id") != "" && Ti.App.Properties.getString("hotel_id") != null && Ti.App.Properties.getString("hotel_id") != undefined) {
	Alloy.Globals.openHome("", null, null);
} else {
	Titanium.App.Properties.setString('locale', "en");
	var loginwin = Alloy.createController("Login").getView();
	loginwin.open();
}

Alloy.Globals.registerPushNotification = function(pushCallback) {

	if (Ti.Platform.model === 'Simulator' || Ti.Platform.model.indexOf('sdk') !== -1) {

		if (pushCallback) {
			pushCallback(null);
			return;
		}
	}
	// Check if the device is running iOS 8 or later
	if (Ti.Platform.name == "iPhone OS" && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {

		// Wait for user settings to be registered before registering for push notifications
		Ti.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {

			// Remove event listener once registered for push notifications
			Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush);

			Ti.Network.registerForPushNotifications({
				success : deviceTokenSuccess,
				error : deviceTokenError,
				callback : receivePush
			});
		});

		// Register notification types to use
		Ti.App.iOS.registerUserNotificationSettings({
			types : [Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND, Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE]
		});
	}

	// For iOS 7 and earlier
	else {
		Ti.Network.registerForPushNotifications({
			// Specifies which notifications to receive
			types : [Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND],
			success : deviceTokenSuccess,
			error : deviceTokenError,
			callback : receivePush
		});
	}
	// Process incoming push notifications
	function receivePush(e) {
		try {
			if (Alloy.Globals.isLogin) {
				if (e.inBackground) {
					var mycart = Alloy.createController("MyCart").getView();
					Alloy.Globals.navWin.openWindow(mycart);
					setTimeout(function() {
						if (Alloy.Globals.currentWindow) {
							Alloy.Globals.goToHome(Alloy.Globals.currentWindow);
						}
						Alloy.Globals.currentWindow = mycart;
					}, 300);
				} else {
					var msg = e.data.alert;
					var dialog = Ti.UI.createAlertDialog({
						title : 'Order Notification',
						message : msg,
						cancel : 1,
						buttonNames : ["Show", "Cancel"],

					});
					dialog.show();
					dialog.addEventListener('click', function(k) {
						if (k.index === k.source.cancel) {
							Ti.API.info('The cancel button was clicked');
						} else {

							var mycart = Alloy.createController("MyCart").getView();
							Alloy.Globals.navWin.openWindow(mycart);
							setTimeout(function(e) {
								if (Alloy.Globals.currentWindow) {
									Alloy.Globals.goToHome(Alloy.Globals.currentWindow);
								}
								Alloy.Globals.currentWindow = mycart;
							}, 300);

						}
					});
				}
				Ti.UI.iOS.setAppBadge(0);
			}
		} catch(e) {

		}
		
		//alert(1 + " " + e.inBackground + "  " + Alloy.Globals.isLogin);
		// if (Alloy.Globals.isLogin) {
		//alert(2 + " " + e.inBackground + "  " + Alloy.Globals.isLogin);

		// try {

		// if (e.inBackground == true) {
		// alert(1);
		// var mycart = Alloy.createController("MyCart").getView();
		// Alloy.Globals.navWin.openWindow(mycart);
		// setTimeout(function() {
		// if (Alloy.Globals.currentWindow) {
		// Alloy.Globals.goToHome(Alloy.Globals.currentWindow);
		// }
		// Alloy.Globals.currentWindow = mycart;
		// }, 300);
		//
		// }
		// if (e.inBackground == false) {
		// alert(2 + " " + dialog + "  " + e.aps.alert);
		//
		// // if (dialog) {
		// // dialog.hide();
		// // dialog = null;
		// // }
		// var dialog = Ti.UI.createAlertDialog({
		// cancel : 1,
		// buttonNames : ["Show", "Cancel"],
		// message : e.aps.alert,
		// title : "Order Notification",
		// });
		// dialog.addEventListener('click', function(k) {
		// if (k.index === k.source.cancel) {
		// Ti.API.info('The cancel button was clicked');
		// } else {
		//
		// var mycart = Alloy.createController("MyCart").getView();
		// Alloy.Globals.navWin.openWindow(mycart);
		// setTimeout(function(e) {
		// if (Alloy.Globals.currentWindow) {
		// Alloy.Globals.goToHome(Alloy.Globals.currentWindow);
		// }
		// Alloy.Globals.currentWindow = mycart;
		// }, 300);
		//
		// }
		// });
		// dialog.show();
		// Ti.UI.iOS.setAppBadge(0);
		//
		// }
		// } catch(e) {
		//
		// }
		// }

	}

	// Save the device token for subsequent API calls
	function deviceTokenSuccess(e) {
		Alloy.Globals.deviceToken = e.deviceToken;
		//alert("deviceToken " + Alloy.Globals.deviceToken);
		if (pushCallback) {
			pushCallback(e.deviceToken);
			return;
		}
	}

	function deviceTokenError(e) {
		Ti.API.info('Failed to register for push notifications! ' + e.error);
		if (pushCallback) {
			pushCallback(null);
			return;
		}
	}

};

//Call function for getting the device Token
Alloy.Globals.registerPushNotification(function(e) {
	Ti.API.info("PUSH :: " + e);
	Ti.App.Properties.setString("token", e);
	Alloy.Globals.deviceToken = e;

});
// Ti.UI.iOS.setAppBadge(0);
