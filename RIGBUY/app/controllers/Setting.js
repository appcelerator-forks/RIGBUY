// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var Communicator = Alloy.Globals.Communicator;
var DOMAIN_URL = Alloy.Globals.Constants.DOMAIN_URL;

if (Ti.App.Properties.getBool("socialLogin")) {
	var listArray = ["Profile", "My Item", "My WishList", "My Enquiry", "My Chat Request"];
} else {

	var listArray = ["Profile", "My Item", "My WishList", "My Enquiry", "My Chat Request", "Change Password"];
}

function tableClickFunc(e) {
	switch(e.index) {
	case 0:
		getProfileService();

		break;
	case 1:
		if (Ti.Network.online) {
			var myItemWin = Alloy.createController("MyItem").getView();
			if (OS_IOS) {
				Alloy.Globals.navWin.openWindow(myItemWin);
			} else {
				myItemWin.open();
			}
			myItemWin.oldWin = $.settingWin;
			Alloy.Globals.currentWindow = myItemWin;
		} else {
			Alloy.Globals.Alert("Please check your internet connection and try again.");
		}

		break;
	case 2:
		getWishListService();

		break;
	case 3:
		getEnquiryService();

		break;
	case 4:
		getChatRequestService();

		break;
	case 5:

		var changePwd = Alloy.createController("ChangePassword").getView();
		if (OS_IOS) {
			Alloy.Globals.navWin.openWindow(changePwd);
		} else {
			changePwd.open();
		}
		changePwd.oldWin = $.settingWin;
		Alloy.Globals.currentWindow = changePwd;
		break;
	}
}

function openFunc(e) {
	$.menuBtn.image = "/images/menu.png";

}

function openMenu(e) {
	if (OS_IOS) {
		Alloy.Globals.openLeft();
	} else {
		Alloy.Globals.drawer.toggleLeftWindow();
	}

}

var tableData = [];
var settingRow = function(detail) {
	tableData = [];
	for (var i = 0; i < detail.length; i++) {
		var tableRow = Ti.UI.createTableViewRow({
			touchEnabled : true,
			width : "100%",
			selectedBackgroundColor : "#F8F8F9",
			height : 56 * Alloy.Globals.scaleFactor,
		});
		if (OS_IOS) {
			tableRow.hasChild = true;
		} else {
			tableRow.rightImage = "/images/Arrow.png";
		}

		tableRow.add(Ti.UI.createLabel({
			left : "5%",
			zIndex : 100,
			color : "gray",
			text : detail[i],
			font : {
				fontSize : 16 * Alloy.Globals.scaleFactor
			}

		}));

		tableData.push(tableRow);
	}
	$.settingTable.setData(tableData);
};
settingRow(listArray);

function getProfileService() {

	if (Ti.Network.online) {
		Alloy.Globals.LoadingScreen.open();
		Communicator.get("http://rigbuy.com/webservices/index.php?action=userprofile&actionMethod=getUserInformation&userId=" + Ti.App.Properties.getString("userid"), getProfileServiceCallback);
		Ti.API.info('URL ' + "http://rigbuy.com/webservices/index.php?action=product&actionMethod=getContactUs");
	} else {

		Alloy.Globals.Alert("Please check your internet connection and try again.");

	}
}

function getProfileServiceCallback(e) {

	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.status == "1") {
					var profile = Alloy.createController("Profile", response).getView();
					if (OS_IOS) {
						Alloy.Globals.navWin.openWindow(profile);
					} else {
						profile.open();
					}
					profile.oldWin = $.settingWin;
					Alloy.Globals.currentWindow = profile;
				} else {
					Alloy.Globals.Alert("No details found");
				}

			} else {
				Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_NO_DATA);

			}
		} catch(e) {
			Ti.API.info('Error getProfile :: ' + e.message);

		}

	} else {
		Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_STATUS_CODE);

	}

	Alloy.Globals.LoadingScreen.close();

}

function getWishListService() {
	var obj = {};
	obj.userId = Ti.App.Properties.getString("userid");

	if (Ti.Network.online) {
		Alloy.Globals.LoadingScreen.open();
		Communicator.post("http://rigbuy.com/webservices/index.php?action=product&actionMethod=getWishlist", getWishListServiceCallback, obj);
		Ti.API.info('URL ' + "http://rigbuy.com/webservices/index.php?action=product&actionMethod=getWishlist");
	} else {

		Alloy.Globals.Alert("Please check your internet connection and try again.");

	}
};

function getWishListServiceCallback(e) {

	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.status == "1") {
					var myWishList = Alloy.createController("MyWhishlist", response.data).getView();
					if (OS_IOS) {
						Alloy.Globals.navWin.openWindow(myWishList);
					} else {
						myWishList.open();
					}
					myWishList.oldWin = $.settingWin;
					Alloy.Globals.currentWindow = myWishList;
				} else {
					Alloy.Globals.Alert("No data found");
				}

			} else {
				Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_NO_DATA);

			}
		} catch(e) {
			Ti.API.info('Error getWishList :: ' + e.message);

		}

	} else {
		Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_STATUS_CODE);

	}

	Alloy.Globals.LoadingScreen.close();

}

function getEnquiryService() {
	var obj = {};
	obj.userId = Ti.App.Properties.getString("userid");

	if (Ti.Network.online) {
		Alloy.Globals.LoadingScreen.open();
		Communicator.post("http://rigbuy.com/webservices/index.php?action=product&actionMethod=getEnquiryList", getEnquiryServiceCallback, obj);

	} else {

		Alloy.Globals.Alert("Please check your internet connection and try again.");

	}
};

function getEnquiryServiceCallback(e) {
Ti.API.info('E '+JSON.stringify(e));
	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.status == "1") {
					var enquiryWin = Alloy.createController("MyEnquiry", response.data).getView();
					if (OS_IOS) {
						Alloy.Globals.navWin.openWindow(enquiryWin);
					} else {
						enquiryWin.open();
					}
					enquiryWin.oldWin = $.settingWin;
					Alloy.Globals.currentWindow = enquiryWin;

				} else {
					Alloy.Globals.Alert("No enquiry found");
				}

			} else {
				Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_NO_DATA);

			}
		} catch(e) {
			Ti.API.info('Error getEnquiryService :: ' + e.message);

		}

	} else {
		Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_STATUS_CODE);

	}

	Alloy.Globals.LoadingScreen.close();

}

function getChatRequestService() {
	var obj = {};
	obj.user_id = Ti.App.Properties.getString("userid");

	if (Ti.Network.online) {
		Alloy.Globals.LoadingScreen.open();
		Communicator.post("http://rigbuy.com/webservices/index.php?action=chat&actionMethod=myChatRequest", getChatRequestServiceCallback, obj);

	} else {

		Alloy.Globals.Alert("Please check your internet connection and try again.");

	}
};

function getChatRequestServiceCallback(e) {

	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.status == "1") {
					var chatRequestWin = Alloy.createController("MyChatRequest",response.result).getView();
					if (OS_IOS) {
						Alloy.Globals.navWin.openWindow(chatRequestWin);
					} else {
						chatRequestWin.open();
					}
					chatRequestWin.oldWin = $.settingWin;
					Alloy.Globals.currentWindow = chatRequestWin;

				} else {
					Alloy.Globals.Alert("No chat request found");
				}

			} else {
				Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_NO_DATA);

			}
		} catch(e) {
			Ti.API.info('Error getChatRequestService :: ' + e.message);

		}

	} else {
		Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_STATUS_CODE);

	}

	Alloy.Globals.LoadingScreen.close();

}

