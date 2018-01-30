// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var lang = Titanium.App.Properties.getString('locale');

//Set the commmunicator and constant class for Web service calling
var Communicator = Alloy.Globals.Communicator;
var DOMAIN_URL = Alloy.Globals.Constants.DOMAIN_URL;

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
	$.TouristicPlaces.title = Alloy.Globals.langConvert("touristic_places");
	if (lang == "ar") {
		$.TouristicPlaces.leftNavButton = notificationBtn;
		$.TouristicPlaces.rightNavButton = btnVW;

	} else {
		$.TouristicPlaces.leftNavButton = btnVW;
		$.TouristicPlaces.rightNavButton = notificationBtn;
	}

	btnVW.addEventListener('click', toggleLeftView);

	notificationBtn.addEventListener("click", function(e) {

		var mycart = Alloy.createController("MyCart").getView();
		Alloy.Globals.navWin.openWindow(mycart);
		mycart.oldWin = $.TouristicPlaces;
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
		$.TouristicPlaces.close();

	}
}

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
var menu_data = [];

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
					image : "http://myhotelsapp.com/hotel/uploads/places/"+sample_data[x].image,
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
					top : 0,
					height : "48%",
					ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
					font : {
						fontSize : 12 * Alloy.Globals.scaleFactor,
					},
					text : sample_data[x].title,
					color : "white"
				});
				titleVW.add(title);
				var locationLbl = Ti.UI.createLabel({
					textAlign : "center",
					bottom : 0,
					height : "48%",
					width : "40%",
					ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
					font : {
						fontSize : 12 * Alloy.Globals.scaleFactor,
						fontWeight : "bold"
					},
					text : Alloy.Globals.langConvert("location"),
					color : "white",
					right : 0,
				});
				titleVW.add(locationLbl);

				var placeLbl = Ti.UI.createLabel({
					textAlign : "center",
					bottom : 0,
					height : "48%",
					left : 0,
					width : "60%",
					ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
					font : {
						fontSize : 12 * Alloy.Globals.scaleFactor,
					},
					text : sample_data[x].location,
					color : "white"
				});
				titleVW.add(placeLbl);
			}
		} else {
			var img = Ti.UI.createImageView({
				image : "http://myhotelsapp.com/hotel/uploads/places/"+sample_data[x].image,
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
				top : 0,
				height : "48%",
				ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
				font : {
					fontSize : 12 * Alloy.Globals.scaleFactor,
				},
				text : sample_data[x].title,
				color : "white"
			});
			titleVW.add(title);

			var locationLbl = Ti.UI.createLabel({
				textAlign : "center",
				bottom : 0,
				height : "48%",
				width : "40%",
				ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
				font : {
					fontSize : 12 * Alloy.Globals.scaleFactor,
					fontWeight : "bold"
				},
				text : Alloy.Globals.langConvert("location"),
				color : "white",
				left : 0,
			});
			titleVW.add(locationLbl);

			var placeLbl = Ti.UI.createLabel({
				textAlign : "center",
				bottom : 0,
				height : "48%",
				right : 0,
				width : "60%",
				ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
				font : {
					fontSize : 12 * Alloy.Globals.scaleFactor,
				},
				text : sample_data[x].location,
				color : "white"
			});
			titleVW.add(placeLbl);
		}

		//THIS IS THE DATA THAT WE WANT AVAILABLE FOR THIS ITEM WHEN onItemClick OCCURS
		var values = {
			title : sample_data[x].title,
			//image : sample_data[x].image
		};

		//NOW WE PUSH TO THE ARRAY THE VIEW AND THE DATA
		items.push({
			view : view,
			data : sample_data[x]
		});
	};
	$.fg.addGridItems(items);
	$.fg.setOnItemClick(function(e) {
		Ti.API.info('e' + JSON.stringify(e.source.data));

		var mycart = Alloy.createController("TouristicPlaceDetail",e.source.data).getView();
		Alloy.Globals.navWin.openWindow(mycart);
		mycart.oldWin = $.TouristicPlaces;
		Alloy.Globals.currentWindow = mycart;

	});
}

function TouristicPlacesService() {

	if (Ti.Network.online) {
		Alloy.Globals.LoadingScreen.open();
		Communicator.get("http://myhotelsapp.com/api/api.php?action=GetTouristicPlaces&" + "language=" + Ti.App.Properties.getString("locale") + "&hotel_id=" + Ti.App.Properties.getString("hotel_id"), TouristicPlacesServiceCallback);
		Ti.API.info('URL : ' + "http://myhotelsapp.com/api/api.php?action=GetTouristicPlaces&" + "language=" + lang + "&hotel_id=" + Ti.App.Properties.getString("hotel_id"));
	} else {

		Alloy.Globals.Alert(Alloy.Globals.langConvert("internat_connection_message"));

	}
}

/*
 * Callback function for login in this we are getting response from the server and navigate to HomeScreen from openHome function.
 */

function TouristicPlacesServiceCallback(e) {
	Ti.API.info("foodMenService Callback response : " + JSON.stringify(e));
	if (e.success) {
		try {
			// Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response["Tour Detail"]));
				if (response.success == '1') {
					renderHomeGrid(response["Tour Detail"]);
					// /Alloy.Globals.openHome(response.userdetails);
					//Ti.App.Properties.setString("hotel_id", response.userdetails.hotel_id);
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

function openFunc(e) {
	TouristicPlacesService();
}

