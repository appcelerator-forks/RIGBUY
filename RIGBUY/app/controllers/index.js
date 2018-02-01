// var login = Alloy.createController("Login").getView();
// login.open();

/*
 * function for open the Home Screen
 */
Ti.API.info(Ti.Platform.name);
Alloy.Globals.openHome = function(response, loginObj) {
	if (OS_IOS) {
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

		var homeScreen = Alloy.createController("ProductList", response);
		Alloy.Globals.homeObj = homeScreen;
		Alloy.Globals.drawer = NappSlideMenu.createSlideMenuWindow({
			centerWindow : homeScreen.navWin,
			backgroundColor : "#fff"
		});

		if (Alloy.isTablet) {
			Alloy.Globals.drawer.leftLedge = ledge;
		}
		Alloy.Globals.drawer.leftWindow = homeScreen.leftWindow;
		Alloy.Globals.drawer.rightWindow = null;

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
	} else {
		//Alloy.Globals.abx = require('com.alcoapps.actionbarextras');
		var abx = require('com.alcoapps.actionbarextras');
		var homeScreen = Alloy.createController("ProductList").getView();
		var drawerWidth = Alloy.Globals.Measurement.pxToDP(Titanium.Platform.displayCaps.platformWidth) * 0.8;
		var NappDrawerModule = require('dk.napp.drawer');

		Alloy.Globals.centerView = homeScreen.getChildren()[0];
		Alloy.Globals.drawer = NappDrawerModule.createDrawer({
			fullscreen : false,
			theme : "Theme.NoActionBar",
			leftWindow : homeScreen.getChildren()[1],
			centerWindow : homeScreen.getChildren()[0],
			fading : 0.2, // 0-1
			parallaxAmount : 0.2, //0-1
			exitOnClose : false,
			shadowWidth : "40dp",
			leftDrawerWidth : drawerWidth,
			backgroundColor : "white",
			opacity : 1,
			hamburgerIcon : true,
			backgroundColor : "white",
			// animationMode : NappDrawerModule.ANIMATION_SCALE,
			closeDrawerGestureMode : NappDrawerModule.CLOSE_MODE_MARGIN,
			openDrawerGestureMode : NappDrawerModule.OPEN_MODE_ALL,
			orientationModes : [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
		});

		Alloy.Globals.drawer.addEventListener("didChangeOffset", function(e) {
			//Ti.API.info("didChangeOffset: " + e.offset);
		});
		Alloy.Globals.drawer.addEventListener("android:back", function(e) {
			Ti.API.info("didChangeOffset: " + e.offset);
			var dialog = Ti.UI.createAlertDialog({
				cancel : 1,
				buttonNames : ['Yes', 'No'],
				message : 'Are you sure want to quit?',
				title : 'RIGBUY'
			});
			dialog.addEventListener('click', function(e) {
				if (e.index === e.source.cancel) {
					Ti.API.info('The cancel button was clicked');
				} else {
					Alloy.Globals.drawer.exitOnClose = true;
					Alloy.Globals.drawer.close();
					Alloy.Globals.drawer = null;
				}
			});
			dialog.show();
		});

		Alloy.Globals.drawer.addEventListener("windowDidOpen", function(e) {
			if (e.window == NappDrawerModule.LEFT_WINDOW) {
				Ti.API.info("windowDidOpen - LEFT DRAWER");
			} else if (e.window == NappDrawerModule.RIGHT_WINDOW) {
				Ti.API.info("windowDidOpen - RIGHT DRAWER");
			}
		});
		Alloy.Globals.drawer.addEventListener('open', onNavDrawerWinOpen);
		function onNavDrawerWinOpen(evt) {
			//Alloy.Globals.drawer.getActivity().actionBar.hide();
			// Alloy.Globals.drawer.animate({
			// opacity : 1,
			// duration : 500
			// });
			var activity = Alloy.Globals.drawer.getActivity();
			if (activity) {
				var actionbar = activity.actionBar;
				actionbar.displayHomeAsUp = true;
				abx.setTitle("Product List");
				actionbar.onHomeIconItemSelected = function() {
					Alloy.Globals.drawer.toggleLeftWindow();
				};
				abx.setHomeAsUpIcon("/images/menu.png");

				activity.onCreateOptionsMenu = function(e) {
					Alloy.Globals.menu = e.menu;
					
					Alloy.Globals.refreshItem = e.menu.add({ 
						title : "Refresh",
						showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
						icon : "/images/refresh.png",
					});
					Alloy.Globals.refreshItem.addEventListener("click", function(e) {
						Alloy.Globals.filterSelectionObj = null;
						Alloy.Globals.getProductListervice("", "", "");
					});
					Alloy.Globals.searchItem = e.menu.add({
						title : "Advanced Search",
						showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
						icon : "/images/filter1.png",
					});
					Alloy.Globals.searchItem.addEventListener("click", function(e) {
						if (Ti.Network.online) {
							var advancedSearch = Alloy.createController("AdvancedSearch").getView();
							if (OS_IOS) {
								Alloy.Globals.navWin.openWindow(advancedSearch);
							} else {
								advancedSearch.open();
							}
							Alloy.Globals.currentWindow = advancedSearch;
						} else {
							Alloy.Globals.Alert("Please check your internet connection and try again.");

						}
					});
					
				};
				activity.invalidateOptionsMenu();
			}
			Alloy.Globals.filterSelectionObj = null;
			Alloy.Globals.getProductListervice("", "", "");

		}

		// lets open it
		Alloy.Globals.drawer.open();
		Alloy.Globals.LoadingScreen.close();

	}

};

Alloy.Globals.openHome();




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
			alert(e);
		} catch(e) {

		}
		
		

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
	alert(e);

});
// Ti.UI.iOS.setAppBadge(0);
