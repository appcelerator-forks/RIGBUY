// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var tableData = [];
Alloy.Globals.isCart =true;
function closeFunc(e) {
	Alloy.Globals.isCart = false;
}

//Set the commmunicator and constant class for Web service calling
var Communicator = Alloy.Globals.Communicator;
var DOMAIN_URL = Alloy.Globals.Constants.DOMAIN_URL;
var lang = Titanium.App.Properties.getString('locale');

if (OS_IOS) {

	var btnVW = Titanium.UI.createView({
		width : 40,
		height : 40,

	});

	var toggleBtn = Titanium.UI.createButton({
		backgroundImage : "none",
	});
	btnVW.add(toggleBtn);

	if (lang == "ar") {
		toggleBtn.right = 0;
		toggleBtn.image = "/images/barrow_ar.png";
	} else {
		toggleBtn.left = 0;
		toggleBtn.image = "/images/back.png";
	}

	$.MyCart.title = Alloy.Globals.langConvert("mycart");
	if (lang == "ar") {
		$.MyCart.rightNavButton = btnVW;

	} else {
		$.MyCart.leftNavButton = btnVW;
	}
	btnVW.addEventListener('click', function(e) {
		$.MyCart.close();
	});

}

Alloy.Globals.createNewsRow = function(detail) {
	tableData = [];
	for (var i = 0; i < detail.length; i++) {

		var tableRow = Ti.UI.createTableViewRow({
			touchEnabled : true,
			//left : "2%",
			width : "100%",
			height : "30%",
			detail : detail[i],
			selectedBackgroundColor : "#F8F8F9"
		});
		if (OS_IOS) {
			///	tableRow.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.NONE;
		}

		tableRow.add(Ti.UI.createView({
			height : "96%",
			width : "96%",
			backgroundColor : "white",
		}));

		//0
		tableRow.getChildren()[0].add(Ti.UI.createImageView({
			image : "http://myhotelsapp.com/hotel/uploads/food/" + detail[i].image,
			height : "100%",
			width : "26%",
		}));

		//1
		tableRow.getChildren()[0].add(Ti.UI.createLabel({
			top : 10 * Alloy.Globals.scaleFactor,
			height : 20 * Alloy.Globals.scaleFactor,
			Color : 'black',
			ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
			text : detail[i].title,
			maxLines : 1,
			font : {
				fontSize : 16 * Alloy.Globals.scaleFactor,
				fontFamily : "Roboto-Bold"
			},
		}));

		//2
		tableRow.getChildren()[0].add(Ti.UI.createLabel({
			top : 40 * Alloy.Globals.scaleFactor,
			height : 70 * Alloy.Globals.scaleFactor,
			Color : 'black',
			ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
			text : detail[i].description,
			font : {
				fontSize : 13 * Alloy.Globals.scaleFactor,
				fontFamily : "Roboto-Light"
			},
		}));

		//2
		tableRow.getChildren()[0].add(Ti.UI.createLabel({
			top : 120 * Alloy.Globals.scaleFactor,
			Color : 'black',

			ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
			text : "$. " + detail[i].price,
			maxLines : 1,
			font : {
				fontSize : 11 * Alloy.Globals.scaleFactor,
				fontFamily : "Roboto-Bold"

			},

		}));
		//2
		var qty = Alloy.Globals.langConvert("quantity") + ". " + detail[i].qty;
		tableRow.getChildren()[0].add(Ti.UI.createLabel({
			top : 120 * Alloy.Globals.scaleFactor,
			Color : 'black',

			ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
			text : qty,
			maxLines : 1,
			font : {
				fontSize : 11 * Alloy.Globals.scaleFactor,
				fontFamily : "Roboto-Bold"

			},
		}));

		if (lang == 'ar') {
			tableRow.getChildren()[0].getChildren()[0].right = 0;
			tableRow.getChildren()[0].getChildren()[1].right = "30%";
			tableRow.getChildren()[0].getChildren()[1].left = 5;
			tableRow.getChildren()[0].getChildren()[1].textAlign = "right";
			tableRow.getChildren()[0].getChildren()[2].right = "30%";
			tableRow.getChildren()[0].getChildren()[2].left = 5;
			tableRow.getChildren()[0].getChildren()[2].textAlign = "right";
			tableRow.getChildren()[0].getChildren()[3].right = "30%";
			tableRow.getChildren()[0].getChildren()[3].textAlign = "right";
			tableRow.getChildren()[0].getChildren()[4].left = 5;
			tableRow.getChildren()[0].getChildren()[4].textAlign = "left";

		} else {

			tableRow.getChildren()[0].getChildren()[0].left = 0;
			tableRow.getChildren()[0].getChildren()[1].left = "30%";
			tableRow.getChildren()[0].getChildren()[1].right = 5;
			tableRow.getChildren()[0].getChildren()[1].textAlign = "left";
			tableRow.getChildren()[0].getChildren()[2].left = "30%";
			tableRow.getChildren()[0].getChildren()[2].right = 5;
			tableRow.getChildren()[0].getChildren()[2].textAlign = "left";
			tableRow.getChildren()[0].getChildren()[3].left = "30%";
			tableRow.getChildren()[0].getChildren()[3].textAlign = "left";
			tableRow.getChildren()[0].getChildren()[4].right = 5;
			tableRow.getChildren()[0].getChildren()[4].textAlign = "right";
		}
		tableData.push(tableRow);
	}
	$.cartTableView.setData(tableData);
};

function openFunc() {
	exports.mycartService();
}

exports.mycartService=function() {

	if (Ti.Network.online) {
		Alloy.Globals.LoadingScreen.open();
		Communicator.get("http://myhotelsapp.com/api/api.php?action=VisitorCart&" + "language=" + Ti.App.Properties.getString("locale") + "&hotel_id=" + Ti.App.Properties.getString("hotel_id") + "&visitor_code=" + Ti.App.Properties.getString("visitor_code"), mycartServiceCallback);
		Ti.API.info('URL : ' + "http://myhotelsapp.com/api/api.php?action=AboutUs&" + "language=" + Ti.App.Properties.getString("locale") + "&hotel_id=" + Ti.App.Properties.getString("hotel_id"));
	} else {
		Alloy.Globals.Alert(Alloy.Globals.langConvert("internat_connection_message"));

	}
};

function mycartServiceCallback(e) {
	Ti.API.info("mycartServiceCallback Callback response : " + JSON.stringify(e));
	if (e.success) {
		try {
			// Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.success == '1') {
					Alloy.Globals.createNewsRow(response["Cart details"]);
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
