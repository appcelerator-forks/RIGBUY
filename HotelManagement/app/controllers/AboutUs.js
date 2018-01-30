// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var lang = Titanium.App.Properties.getString('locale');

//Set the commmunicator and constant class for Web service calling
var Communicator = Alloy.Globals.Communicator;
var DOMAIN_URL = Alloy.Globals.Constants.DOMAIN_URL;

$.AboutUsLbl.font = {
	fontSize : 24 * Alloy.Globals.scaleFactor
};
$.webview.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};

// Create the left and Right navigation Button and set the Home screen title with language
if (OS_IOS) {

	var btnVW = Titanium.UI.createView({
		width : 40,
		height : 40,
		
	});

	var toggleBtn = Titanium.UI.createButton({
		backgroundImage : "none",
	});
	btnVW.add(toggleBtn);
	if (args == "menu") {

		Ti.API.info('111111111');
		toggleBtn.image = "/images/menu.png";
		if (lang == "ar") {
			toggleBtn.right = 0;

		} else {
			toggleBtn.left = 0;
		}
	} else {

		Ti.API.info('2222');
		if (lang == "ar") {
			toggleBtn.right = 0;
			toggleBtn.image = "/images/barrow_ar.png";
		} else {
			toggleBtn.left = 0;
			toggleBtn.image = "/images/back.png";
		}

	}

	var notificationBtn = Titanium.UI.createButton({
		backgroundImage : "none",
		image : "/images/notification.png",
		visible : true

	});
	$.AboutUs.title = Alloy.Globals.langConvert("about_us");
	$.AboutUsLbl.text = Alloy.Globals.langConvert("about_us");
	if (lang == "ar") {
		$.AboutUs.leftNavButton = notificationBtn;
		$.AboutUs.rightNavButton = btnVW;

	} else {
		$.AboutUs.leftNavButton = btnVW;
		$.AboutUs.rightNavButton = notificationBtn;
	}

	btnVW.addEventListener('click', toggleLeftView);

	notificationBtn.addEventListener("click", function(e) {

		var mycart = Alloy.createController("MyCart").getView();
		Alloy.Globals.navWin.openWindow(mycart);
		mycart.oldWin = $.AboutUs;
		Alloy.Globals.currentWindow = mycart;

	});
}

/*
 * Function for open left drawer menu from home screen
 */
function toggleLeftView() {
	if (args == "menu") {

		if (lang == "ar") {
			Ti.API.info("langtoggle1 " + lang);
			Alloy.Globals.openRight();

		} else {
			Ti.API.info("langtoggle2 " + lang);
			Alloy.Globals.openLeft();
		}

	} else {
		$.AboutUs.close();

	}
}

function openFunc(e) {
	aboutUsService();
}

function aboutUsService() {

	if (Ti.Network.online) {
		Alloy.Globals.LoadingScreen.open();
		Communicator.get("http://myhotelsapp.com/api/api.php?action=AboutUs&" + "language=" + Ti.App.Properties.getString("locale") + "&hotel_id=" + Ti.App.Properties.getString("hotel_id"), aboutUsServiceCallback);
		Ti.API.info('URL : ' + "http://myhotelsapp.com/api/api.php?action=AboutUs&" + "language=" + Ti.App.Properties.getString("locale") + "&hotel_id=" + Ti.App.Properties.getString("hotel_id"));
	} else {
		Alloy.Globals.Alert(Alloy.Globals.langConvert("internat_connection_message"));

	}
}

function aboutUsServiceCallback(e) {
	Ti.API.info("aboutUsServiceCallback Callback response : " + JSON.stringify(e));
	if (e.success) {
		try {
			// Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.success == '1') {
					// $.webview.data = response.content;
					var html2as = require('nl.fokkezb.html2as');

					html2as(response.content, function(err, as) {

						if (err) {
							console.error(err);

						} else {

							$.webview.attributedString = as;
							

						}
					});
				} else {
					Alloy.Globals.Alert(response.msg);
				}

			} else {
				Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_NO_DATA);

			}
		} catch(e) {
			Ti.API.info('Error social Login List :: ' + e.message);

		}

	} else {
		Alloy.Globals.Alert(Alloy.Globals.langConvert("network_validation"));

	}

	Alloy.Globals.LoadingScreen.close();

}
