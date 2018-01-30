// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
Alloy.Globals.logedin = true;
Ti.UI.iOS.setAppBadge(0);
Alloy.Globals.profileData = args;
Alloy.Globals.isLogin =true;
//get the language of the application

var lang = Titanium.App.Properties.getString('locale');

//Set the commmunicator and constant class for Web service calling
var Communicator = Alloy.Globals.Communicator;
var DOMAIN_URL = Alloy.Globals.Constants.DOMAIN_URL;

//Ti.API.info("JSON : " + JSON.stringify(args));

// This varible use for handling the multiple tapping
var focus = true;

/*
* Set the redirect for remember me
*/

//Create Global varible for the hold the navigation window and use it to open children window form other controllers
Alloy.Globals.navWin = $.navWindow;
Alloy.Globals.mainVW = $.mainVW;

/*
 * Funcation for capatialize First Letter
 */
String.prototype.capitalize = function() {
	try {
		return this.charAt(0).toUpperCase() + this.slice(1);
	} catch(e) {
		Ti.API.info('Error Fun : capitalize ');
	}
};

$.fg.init({
	columns : 2,
	space : 0,
	gridBackgroundColor : '#fff',
	itemHeightDelta : 0,
	itemBackgroundColor : '#eee',
	itemBorderColor : 'transparent',
	itemBorderWidth : 0,
	itemBorderRadius : 0
});

var items = [];
var sample_data = [];
if (lang == "ar") {
	Alloy.Globals.languageAr = true;
	Alloy.Globals.languageEn = false;
	sample_data = [{
		title : Alloy.Globals.langConvert("hotel_activity"),
		image : '/images/image_2.jpg',
		name : "ha"
	}, {
		title : Alloy.Globals.langConvert("food_menu"),
		image : '/images/image_1.jpg',
		name : "fm"
	}, {
		title : Alloy.Globals.langConvert("about_us"),
		image : '/images/image_4.jpg',
		name : "au"
	}, {
		title : Alloy.Globals.langConvert("touristic_places"),
		image : '/images/image_3.jpg',
		name : "tp"
	}, {
		title : "",
		image : 'http://www.lorempixel.com/600/600/',
		name : "white"
	}, {
		title : Alloy.Globals.langConvert("write_to_us"),
		image : '/images/image_5.jpg',
		name : "wu"
	}];
	$.welcomeLbl1.text = Alloy.Globals.langConvert("welcome") + " " + Ti.App.Properties.getString("room_number");
	$.homeRowLbl1.text = Alloy.Globals.langConvert("home");
	$.foodMenuLbl1.text = Alloy.Globals.langConvert("hotel_activity");
	$.hotelActivityLbl1.text = Alloy.Globals.langConvert("hotel_activity");
	$.foodMenuLbl1.text = Alloy.Globals.langConvert("food_menu");
	$.aboutUsLbl1.text = Alloy.Globals.langConvert("about_us");
	$.touristicPlaceLbl1.text = Alloy.Globals.langConvert("touristic_places");
	$.rateUsLbl1.text = Alloy.Globals.langConvert("write_to_us");
	$.logoutLbl1.text = Alloy.Globals.langConvert("logout");
	Alloy.Globals.loadingLbl.text = Alloy.Globals.langConvert("loading");
} else {
	Alloy.Globals.loadingLbl.text = Alloy.Globals.langConvert("loading");
	Alloy.Globals.languageAr = false;
	Alloy.Globals.languageEn = true;
	$.homeRowLbl.text = Alloy.Globals.langConvert("home");
	$.logoutLbl.text = Alloy.Globals.langConvert("logout");
	$.welcomeLbl.text = Alloy.Globals.langConvert("welcome") + " " + Ti.App.Properties.getString("room_number");
	$.foodMenuLbl.text = Alloy.Globals.langConvert("hotel_activity");
	$.hotelActivityLbl.text = Alloy.Globals.langConvert("hotel_activity");
	$.foodMenuLbl.text = Alloy.Globals.langConvert("food_menu");
	$.aboutUsLbl.text = Alloy.Globals.langConvert("about_us");
	$.touristicPlaceLbl.text = Alloy.Globals.langConvert("touristic_places");
	$.rateUsLbl.text = Alloy.Globals.langConvert("write_to_us");
	sample_data = [{
		title : Alloy.Globals.langConvert("food_menu"),
		image : '/images/image_1.jpg',

		name : "fm"
	}, {
		title : Alloy.Globals.langConvert("hotel_activity"),
		image : '/images/image_2.jpg',
		name : "ha"
	}, {
		title : Alloy.Globals.langConvert("touristic_places"),
		image : '/images/image_3.jpg',
		name : "tp"
	}, {
		title : Alloy.Globals.langConvert("about_us"),
		image : '/images/image_4.jpg',
		name : "au"
	}, {
		title : Alloy.Globals.langConvert("write_to_us"),
		image : '/images/image_5.jpg',
		name : "wu"
	}];
}

renderHomeGrid(sample_data);
function renderHomeGrid(sample_data) {
	items = [];
	for (var x = 0; x < sample_data.length; x++) {
		Ti.API.info('--------');
		//CREATES A VIEW WITH OUR CUSTOM LAYOUT
		var view = Ti.UI.createView({

		});

		if (lang == "ar") {
			if (x == 4) {
				view.backgroundColor = "white";

			} else {
				var img = Ti.UI.createImageView({
					image : sample_data[x].image,
					width : Ti.UI.FILL,
					height : Ti.UI.FILL
				});
				view.add(img);
				var titleVW = Ti.UI.createView({
					backgroundColor : "#dc0474",
					height : 40 * Alloy.Globals.scaleFactor,
					bottom : 0
				});
				view.add(titleVW);
				var title = Ti.UI.createLabel({
					textAlign : "center",
					font : {
						fontSize : 13 * Alloy.Globals.scaleFactor,
					},
					text : sample_data[x].title,
					color : "white"
				});
				titleVW.add(title);
			}
		} else {
			var img = Ti.UI.createImageView({
				image : sample_data[x].image,
				width : Ti.UI.FILL,
				height : Ti.UI.FILL
			});
			view.add(img);
			var titleVW = Ti.UI.createView({
				backgroundColor : "#dc0474",
				height : 40 * Alloy.Globals.scaleFactor,
				bottom : 0
			});
			view.add(titleVW);
			var title = Ti.UI.createLabel({
				textAlign : "center",
				font : {
					fontSize : 13 * Alloy.Globals.scaleFactor,
				},
				text : sample_data[x].title,
				color : "white"
			});
			titleVW.add(title);
		}

		//THIS IS THE DATA THAT WE WANT AVAILABLE FOR THIS ITEM WHEN onItemClick OCCURS
		var values = {
			title : sample_data[x].title,
			image : sample_data[x].image,
			name : sample_data[x].name
		};

		//NOW WE PUSH TO THE ARRAY THE VIEW AND THE DATA
		items.push({
			view : view,
			data : values
		});
	};
	$.fg.addGridItems(items);
	$.fg.setOnItemClick(function(e) {
		Ti.API.info('Data ' + e.source.data.name);
		if (e.source.data.name == "fm") {
			var regScreen = Alloy.createController("FoodMenu", "home").getView();
			Alloy.Globals.navWin.openWindow(regScreen);

			Alloy.Globals.currentWindow = regScreen;
		} else if (e.source.data.name == "ha") {
			var regScreen = Alloy.createController("HotelActivity", "home").getView();
			Alloy.Globals.navWin.openWindow(regScreen);

			Alloy.Globals.currentWindow = regScreen;
		} else if (e.source.data.name == "tp") {
			var regScreen = Alloy.createController("TouristicPlaces", "home").getView();
			Alloy.Globals.navWin.openWindow(regScreen);

			Alloy.Globals.currentWindow = regScreen;
		} else if (e.source.data.name == "au") {
			var regScreen = Alloy.createController("AboutUs", "home").getView();
			Alloy.Globals.navWin.openWindow(regScreen);

			Alloy.Globals.currentWindow = regScreen;
		} else if (e.source.data.name == "wu") {
			var regScreen = Alloy.createController("RateUs", "home").getView();
			Alloy.Globals.navWin.openWindow(regScreen);

			Alloy.Globals.currentWindow = regScreen;
		}

	});
}

//ADD ALL THE ITEMS TO THE GRID

// Create the left and Right navigation Button and set the Home screen title with language
if (OS_IOS) {

	var toggleBtn = Titanium.UI.createButton({
		backgroundImage : "none",
		image : "/images/menu.png",
		visible : true
	});

	var notificationBtn = Titanium.UI.createButton({
		backgroundImage : "none",
		image : "/images/notification.png",
		visible : true

	});

	$.homeWin.title = Alloy.Globals.langConvert("home");
	if (lang == "ar") {
		$.homeWin.leftNavButton = notificationBtn;
		$.homeWin.rightNavButton = toggleBtn;

	} else {
		$.homeWin.leftNavButton = toggleBtn;
		$.homeWin.rightNavButton = notificationBtn;
	}

	toggleBtn.addEventListener('click', toggleLeftView);
	//notificationBtn.addEventListener('click', notificationClick);
	if (OS_IOS) {
		$.topview.width = Alloy.Globals.homedrawerWidth + 30;
		$.topview1.width = Alloy.Globals.homedrawerWidth + 30;
	}

	notificationBtn.addEventListener("click", function(e) {

		var mycart = Alloy.createController("MyCart").getView();
		Alloy.Globals.navWin.openWindow(mycart);
		Alloy.Globals.currentWindow = mycart;

	});

}

/*
 * Language Localization
 */
Alloy.Globals.language = lang;

/*
 * Function for open left drawer menu from home screen
 */
function toggleLeftView() {

	if (lang == "ar") {
		Ti.API.info("langtoggle1 " + lang);
		Alloy.Globals.openRight();

	} else {
		Ti.API.info("langtoggle2 " + lang);
		Alloy.Globals.openLeft();
	}

}


/*
 * Function for opening windows from left drawer
 */
function leftMenuOptionSelected(e) {

	if ($.rightTable.focusable == false) {
		return;
	}
	$.rightTable.focusable = false;
	if (e.index != 6) {
		Alloy.Globals.goToHome(Alloy.Globals.currentWindow);
	}

	Ti.API.info('Name1---------' + e.index + "  " + Alloy.Globals.currentWindow);
	switch(e.index) {
	case 0:

		//if (Alloy.Globals.currentWindow != null) {

		//Alloy.Globals.goToHome(Alloy.Globals.currentWindow);

		Alloy.Globals.currentWindow = null;
		//}

		break;
	case 1:

		//	if (Alloy.Globals.currentWindow == null) {
		if (Ti.Network.online) {

			var regScreen = Alloy.createController("FoodMenu", "menu").getView();

			Alloy.Globals.navWin.openWindow(regScreen);

			// Alloy.Globals.goToHome(Alloy.Globals.currentWindow);

			Alloy.Globals.currentWindow = regScreen;
		} else {
			Alloy.Globals.Alert("Please check your internet connection and try again");

		}
		break;
	case 2:

		// if (Alloy.Globals.currentWindow == null) {
		Ti.API.info('Name2---------2 ' + Alloy.Globals.currentWindow);

		if (Ti.Network.online) {
			var regScreen = Alloy.createController("HotelActivity", "menu").getView();

			Alloy.Globals.navWin.openWindow(regScreen);

			// Alloy.Globals.goToHome(Alloy.Globals.currentWindow);

			Alloy.Globals.currentWindow = regScreen;
		} else {
			Alloy.Globals.Alert(Alloy.Globals.langConvert("internat_connection_message"));

			// }
		}
		break;
	case 3:
		//	if (Alloy.Globals.currentWindow == null) {

		if (Ti.Network.online) {
			var regScreen = Alloy.createController("TouristicPlaces", "menu").getView();

			Alloy.Globals.navWin.openWindow(regScreen);

			// Alloy.Globals.goToHome(Alloy.Globals.currentWindow);

			Alloy.Globals.currentWindow = regScreen;
		} else {
			Alloy.Globals.Alert(Alloy.Globals.langConvert("internat_connection_message"));

		}
		//}
		break;
	case 4:
		// if (Alloy.Globals.currentWindow == null) {

		if (Ti.Network.online) {
			var regScreen = Alloy.createController("AboutUs", "menu").getView();

			Alloy.Globals.navWin.openWindow(regScreen);

			// Alloy.Globals.goToHome(Alloy.Globals.currentWindow);

			Alloy.Globals.currentWindow = regScreen;
		} else {
			Alloy.Globals.Alert(Alloy.Globals.langConvert("internat_connection_message"));

		}
		// }
		break;
	case 5:
		// if (Alloy.Globals.currentWindow == null) {

		if (Ti.Network.online) {
			var regScreen = Alloy.createController("RateUs", "menu").getView();

			Alloy.Globals.navWin.openWindow(regScreen);

			// Alloy.Globals.goToHome(Alloy.Globals.currentWindow);

			Alloy.Globals.currentWindow = regScreen;
		} else {
			Alloy.Globals.Alert(Alloy.Globals.langConvert("internat_connection_message"));

		}
		// }
		break;

	case 6:
		focus = true;
		$.rightTable.focusable = true;
		logout();

		break;

	}

	if (lang == "ar") {
		Alloy.Globals.openRight();
		
	} else {
		Alloy.Globals.openLeft();
	}

	setTimeout(function(e) {
		$.rightTable.focusable = true;
		focus = true;
	}, 500);
}

function logout() {
	if (OS_IOS) {
		var dialog = Ti.UI.createAlertDialog({
			cancel : 1,
			buttonNames : [Alloy.Globals.langConvert("ok"), Alloy.Globals.langConvert("cancel")],
			message : Alloy.Globals.langConvert("logout_dialog") + "?",
			title : Alloy.Globals.langConvert("app_name")
		});
		dialog.addEventListener('click', function(e) {
			if (e.index === 0) {
				if (logoutInterval != null) {
					clearInterval(logoutInterval);
					logoutInterval = null;
				}
				if (langInterval != null) {
					clearInterval(langInterval);
					langInterval = null;
				}
				var regScreen = Alloy.createController("Login").getView();
				regScreen.open();
				Alloy.Globals.drawer.close();
				Alloy.Globals.currentWindow = null;
				Ti.App.Properties.setString("hotel_id", "");
				Ti.App.Properties.setString("visitor_code", "");
				Ti.App.Properties.setString("locale", "en");
				Ti.App.Properties.setString("room_number", "");
				Ti.API.info('-------------');
				Alloy.Globals.isLogin =false;

				// Ti.App.Properties.getString("isHelpScreenOpen",null);
			} else {
				Ti.API.info('The cancel button was clicked');
			}
		});
		dialog.show();

	}

}

// This is for set the slid menu width
if (OS_IOS) {
	$.topview.width = Alloy.Globals.homedrawerWidth + 30;
}

/*
 * XML Defined function for the open the Home screen with animation
 */
function openFun(e) {
	$.containerVW.animate({
		opacity : 1,
		duration : 500
	});

	if (!Ti.App.Properties.getString("isHelpScreenOpen")) {
		setTimeout(function(e) {
			Alloy.createController("HelpScreen").getView().open();
		}, 1000);
	}

}

//Globle function to update the home screen data when any changes done for Update Profile screen(English)
Alloy.Globals.updatedata = function(res) {
	if (res.image != "") {
		$.imge1.image = res.image;
		$.imge.image = res.image;
	} else {
		$.imge.image = '/images/user_img.png';
	}
	if (res.UserRole == "Supervisor") {

		$.nameLbl.text = res.first_name_en;
		// + " " + res.middel_name_en + " " + res.last_name_en;
		var text = Alloy.Globals.langConvert("home_header") + ",\n" + res.first_name_en;
		// + " " + res.middel_name_en + " " + res.last_name_en;
		//$.welcomeLbl.text = text;

	} else {
		Ti.API.info('in client lang is ' + lang);

		Ti.API.info('name changed ');
		$.nameLbl.text = res.contact_person_en.capitalize();
		var text = Alloy.Globals.langConvert("home_header") + ",\n" + res.contact_person_en.capitalize();
		//$.welcomeLbl.text = text;

	}

};

//Globle function to update the home screen data when any changes done for Update Profile screen(Arabic)
Alloy.Globals.updatedataAr = function(res) {
	if (res.image != "") {
		$.imge1.image = res.image;
		$.imge.image = res.image;
	} else {
		$.imge1.image = '/images/user_img.png';
	}
	if (res.UserRole == "Supervisor") {
		$.nameLbl1.text = res.first_name_ar;
		// + " " + res.middel_name_ar + " " + res.last_name_ar;
		var text = Alloy.Globals.langConvert("home_header") + ",\n" + res.first_name_ar;
		// + " " + res.middel_name_ar + " " + res.last_name_ar;
		//$.welcomeLblAr.text = text;
	} else {
		Ti.API.info('in client lang is ' + lang);
		Ti.API.info('name changed 45346');
		$.nameLbl1.text = res.contact_person_ar;
		var text = Alloy.Globals.langConvert("home_header") + ",\n" + res.contact_person_ar;
		//$.welcomeLblAr.text = text;
	}

};

var logoutInterval = null;
var langInterval = null;
logoutInterval = setInterval(function() {
	logoutService();
}, 10000);

langInterval = setInterval(function() {
	langService();
}, 10000);

Ti.App.addEventListener('pause', function(e) {

	Ti.API.info("pause......");
	if (logoutInterval) {
		clearInterval(logoutInterval);
		logoutInterval = null;
	}
	if (langInterval) {
		clearInterval(langInterval);
		langInterval = null;
	}

});

Ti.App.addEventListener('resumed', function(e) {

	if (logoutInterval != null) {
		clearInterval(logoutInterval);
		logoutInterval = null;
	}
	if (langInterval != null) {
		clearInterval(langInterval);
		langInterval = null;
	}

	Ti.API.info("Resume......");
	if (logoutInterval == null) {
		logoutInterval = setInterval(function() {
			logoutService();
		}, 10000);
	}
	if (langInterval == null) {
		langInterval = setInterval(function() {
			langService();
		}, 10000);
	}

});

function logoutService() {

	if (Ti.Network.online) {
		Communicator.get("http://myhotelsapp.com/api/api.php?action=GetUserLoginStatus&" + "&visitor_code=" + Ti.App.Properties.getString("visitor_code") + "&hotel_id=" + Ti.App.Properties.getString("hotel_id"), logoutCallback);
		//Ti.API.info('LOGOUT URL ' + "http://myhotelsapp.com/api/api.php?action=GetUserLoginStatus&" + "&visitor_code=" + Ti.App.Properties.getString("visitor_code") + "&hotel_id=" + Ti.App.Properties.getString("hotel_id"));
	}
}

/*
 * Callback function for login in this we are getting response from the server and navigate to HomeScreen from openHome function.
 */

function logoutCallback(e) {
	// Ti.API.info("logoutCallback response : " + JSON.stringify(e));
	if (e.success) {
		try {
			// Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				//Ti.API.info(' -----LOGOUT RESPONSE------ ' + JSON.stringify(response));
				if (response.login_status == '0') {

					if (logoutInterval != null) {
						clearInterval(logoutInterval);
						logoutInterval = null;
					}
					if (langInterval != null) {
						clearInterval(langInterval);
						langInterval = null;
					}

					var regScreen = Alloy.createController("Login").getView();
					regScreen.open();
					Alloy.Globals.drawer.close();
					Alloy.Globals.currentWindow = null;
					Ti.App.Properties.setString("hotel_id", "");
					Ti.App.Properties.setString("visitor_code", "");
					Ti.App.Properties.setString("locale", "en");
					Ti.App.Properties.setString("room_number", "");
				}
			} else {
				//	Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_NO_DATA)
			}
		} catch(e) {
			Ti.API.info('Error social Login List :: ' + e.message);

		}

	} else {
		// Alloy.Globals.Alert(Alloy.Globals.langConvert("network_validation"));

	}

}

function langService() {

	if (Ti.Network.online) {
		Communicator.get("http://myhotelsapp.com/api/api.php?action=GetUserCurrentLanguage&" + "&room_number=" + Ti.App.Properties.getString("room_number") + "&hotel_id=" + Ti.App.Properties.getString("hotel_id"), langCallback);
		//Ti.API.info('LANGUAGE URL ' + "http://myhotelsapp.com/api/api.php?action=GetUserCurrentLanguage&" + "&room_number=" + Ti.App.Properties.getString("room_number") + "&hotel_id=" + Ti.App.Properties.getString("hotel_id"));
	}
}

/*
 * Callback function for login in this we are getting response from the server and navigate to HomeScreen from openHome function.
 */

function langCallback(e) {
	// Ti.API.info("logoutCallback response : " + JSON.stringify(e));
	if (e.success) {
		try {
			//Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
			//	Ti.API.info(' -----LANGUAGE RESPONSE------ ' + JSON.stringify(response));
				if (response.success == '1') {

					if (Titanium.App.Properties.getString('locale')) {
						var chklang = Titanium.App.Properties.getString('locale');
						if (chklang.toUpperCase() != response.language) {
							Titanium.App.Properties.setString('locale', response.language.toLowerCase());
							lang = Titanium.App.Properties.getString('locale');
							changelang();
						}
					}
				}
			} else {
				//	Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_NO_DATA)
			}
		} catch(e) {
			Ti.API.info('Error social Login List :: ' + e.message);

		}

	} else {
		// Alloy.Globals.Alert(Alloy.Globals.langConvert("network_validation"));

	}

}

/*
 * This function for set the Application UI when language change from the setting button.
 */
function changelang() {

	if (lang == "ar") {
		sample_data = [{
			title : Alloy.Globals.langConvert("hotel_activity"),
			image : '/images/image_2.jpg',
			name : "ha"
		}, {
			title : Alloy.Globals.langConvert("food_menu"),
			image : '/images/image_1.jpg',
			name : "fm"
		}, {
			title : Alloy.Globals.langConvert("about_us"),
			image : '/images/image_4.jpg',
			name : "au"
		}, {
			title : Alloy.Globals.langConvert("touristic_places"),
			image : '/images/image_3.jpg',
			name : "tp"
		}, {
			title : "",
			image : '',
			name : "white"
		}, {
			title : Alloy.Globals.langConvert("write_to_us"),
			image : '/images/image_5.jpg',
			name : "wu"
		}];
		renderHomeGrid(sample_data);

		$.homeWin.title = Alloy.Globals.langConvert("home");

		
		$.welcomeLbl1.text = Alloy.Globals.langConvert("welcome") + " " + Ti.App.Properties.getString("room_number");
		$.homeRowLbl1.text = Alloy.Globals.langConvert("home");
		$.foodMenuLbl1.text = Alloy.Globals.langConvert("hotel_activity");
		$.hotelActivityLbl1.text = Alloy.Globals.langConvert("hotel_activity");
		$.foodMenuLbl1.text = Alloy.Globals.langConvert("food_menu");
		$.aboutUsLbl1.text = Alloy.Globals.langConvert("about_us");
		$.touristicPlaceLbl1.text = Alloy.Globals.langConvert("touristic_places");
		$.rateUsLbl1.text = Alloy.Globals.langConvert("write_to_us");
		$.logoutLbl1.text = Alloy.Globals.langConvert("logout");
		$.homeWin.leftNavButton = notificationBtn;
		$.homeWin.rightNavButton = toggleBtn;
		
		
		if(Alloy.Globals.drawer.isAnyViewOpen()){
			Alloy.Globals.drawer.closeOpenView();
		}
		Alloy.Globals.drawer.rightWindow = Alloy.Globals.homeObj.rightWindow;
		Alloy.Globals.drawer.leftWindow = null;
		Alloy.Globals.loadingLbl.text = Alloy.Globals.langConvert("loading");
		Alloy.Globals.goToHome(Alloy.Globals.currentWindow);

	} else {
		Alloy.Globals.loadingLbl.text = Alloy.Globals.langConvert("loading");
		$.homeRowLbl.text = Alloy.Globals.langConvert("home");
		$.logoutLbl.text = Alloy.Globals.langConvert("logout");
		$.welcomeLbl.text = Alloy.Globals.langConvert("welcome") + " " + Ti.App.Properties.getString("room_number");
		$.foodMenuLbl.text = Alloy.Globals.langConvert("hotel_activity");
		$.hotelActivityLbl.text = Alloy.Globals.langConvert("hotel_activity");
		$.foodMenuLbl.text = Alloy.Globals.langConvert("food_menu");
		$.aboutUsLbl.text = Alloy.Globals.langConvert("about_us");
		$.touristicPlaceLbl.text = Alloy.Globals.langConvert("touristic_places");
		$.rateUsLbl.text = Alloy.Globals.langConvert("write_to_us");

		sample_data = [{
			title : Alloy.Globals.langConvert("food_menu"),
			image : '/images/image_1.jpg',

			name : "fm"
		}, {
			title : Alloy.Globals.langConvert("hotel_activity"),
			image : '/images/image_2.jpg',
			name : "ha"
		}, {
			title : Alloy.Globals.langConvert("touristic_places"),
			image : '/images/image_3.jpg',
			name : "tp"
		}, {
			title : Alloy.Globals.langConvert("about_us"),
			image : '/images/image_4.jpg',
			name : "au"
		}, {
			title : Alloy.Globals.langConvert("write_to_us"),
			image : '/images/image_5.jpg',
			name : "wu"
		}];
		renderHomeGrid(sample_data);
		$.homeWin.leftNavButton = toggleBtn;
		$.homeWin.rightNavButton = notificationBtn;

		$.homeWin.title = Alloy.Globals.langConvert("home");
		Alloy.Globals.drawer.leftWindow = Alloy.Globals.homeObj.leftWindow;
		Alloy.Globals.drawer.rightWindow = null;

		if(Alloy.Globals.drawer.isAnyViewOpen()){
			Alloy.Globals.drawer.closeOpenView();
		}
		Alloy.Globals.goToHome(Alloy.Globals.currentWindow);

	}
};
