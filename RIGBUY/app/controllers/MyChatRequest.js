// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var Communicator = Alloy.Globals.Communicator;
var DOMAIN_URL = Alloy.Globals.Constants.DOMAIN_URL;
function openFunc(e) {
	if (OS_ANDROID) {
		if (this.getActivity()) {
			// need to explicitly use getXYZ methods
			var actionBar = this.getActivity().getActionBar();

			if (actionBar) {
				// Now we can do stuff to the actionbar
				actionBar.setTitle('My Chat Request');

				actionBar.setDisplayHomeAsUp(true);
				// show an angle bracket next to the home icon,
				// indicating to users that the home icon is tappable

				// toggle the left window when the home icon is selected
				actionBar.setOnHomeIconItemSelected(function() {
					$.MyChatRequest.close();
				});
			}
		}
	}
}
var index = 0;
function tableClickFunc(e) {

}

var productRow = function(detail) {
	tableData = [];
	Ti.API.info('Detail : ' + JSON.stringify(detail));
	for (var i = 0; i < 2; i++) {

		var tableRow = Ti.UI.createTableViewRow({
			touchEnabled : true,
			width : "100%",
			height : Ti.UI.SIZE,
			layout : "vertical",
			//backgroundColor : "green",
			//detail : detail[i],
			selectedBackgroundColor : "#F8F8F9"
		});

		tableRow.add(Ti.UI.createLabel({
			top : 6,
			left : 10,
			right : 10,

			text : "Person Name",
			color : "black",
			font : {
				fontSize : 15 * Alloy.Globals.scaleFactor
			},

			textAlign : "left",

		}));

		tableRow.add(Ti.UI.createLabel({
			top : 6,

			left : 10,
			right : 10,
			text : "Product Name",
			color : "black",
			font : {
				fontSize : 13 * Alloy.Globals.scaleFactor
			},

			textAlign : "left",

		}));
		tableRow.add(Ti.UI.createLabel({
			top : 6,

			left : 10,
			right : 10,
			text : "Message",
			color : "black",
			font : {
				fontSize : 12 * Alloy.Globals.scaleFactor
			},

			textAlign : "left",

		}));
		
		tableRow.add(Ti.UI.createView({
			top : 6,
			left : 10,
			right : 10,
			height : (OS_ANDROID) ? 35 * Alloy.Globals.scaleFactor : 30 * Alloy.Globals.scaleFactor,

		}));
		//3-0
		
		tableRow.getChildren()[3].add(Ti.UI.createButton({
			left : 0,
			width : "42%",
			name : "delete",
			height :Ti.UI.FILL,
			title : "Accept",
			visible:false,
			borderColor : "#f54224",
			borderWidth : 1,
			font : {
				fontSize : 12 * Alloy.Globals.scaleFactor
			},
			color : "#f54224",
			selectedColor : "black",
			backgroundImage : "none"
		}));
		//3-1
		tableRow.getChildren()[3].add(Ti.UI.createButton({
			right : 0,
			width : "42%",
			name : "delete",
			height :Ti.UI.FILL,
			visible:false,
			title : "Declined",
			borderColor : "#f54224",
			borderWidth : 1,
			font : {
				fontSize : 12 * Alloy.Globals.scaleFactor
			},
			color : "#f54224",
			selectedColor : "black",
			backgroundImage : "none"
		}));
		
		//3-2
		tableRow.getChildren()[3].add(Ti.UI.createButton({
			left : 0,
			width : "100%",
			name : "chat",
			visible:true,
			height :Ti.UI.FILL,
			title : "Chat",
			borderColor : "#f54224",
			borderWidth : 1,
			font : {
				fontSize : 12 * Alloy.Globals.scaleFactor
			},
			color : "#f54224",
			selectedColor : "black",
			backgroundImage : "none"
		}));
		tableData.push(tableRow);
		tableRow.add(Ti.UI.createLabel({
			top : 6,
			text : "",
			height:0

		}));
		tableData.push(tableRow);
	}
	$.myEnquiryTable.setData(tableData);
};
productRow(args);

function removeWishListService(productId) {
	var obj = {};
	obj.userId = Ti.App.Properties.getString("userid");
	obj.productId = productId;
	Ti.API.info('OBJ : ' + JSON.stringify(obj));
	if (Ti.Network.online) {
		Alloy.Globals.LoadingScreen.open();
		Communicator.post("http://rigbuy.com/webservices/index.php?action=product&actionMethod=removeProductInWishlist", removeWishListServiceCallback, obj);
		Ti.API.info('URL ' + "http://rigbuy.com/webservices/index.php?action=product&actionMethod=removeProductInWishlist");
	} else {

		Alloy.Globals.Alert("Please check your internet connection and try again.");

	}
};

function removeWishListServiceCallback(e) {

	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.status == "1") {
					//Alloy.Globals.getProductListervice();
					$.myItemTable.deleteRow(index, true);
					Alloy.Globals.Alert("Product removed successfully");
				} else {
					Alloy.Globals.Alert("Can't remove this product, Please try again");
				}

			} else {
				Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_NO_DATA);

			}
		} catch(e) {
			Ti.API.info('Error removeWishListService :: ' + e.message);

		}

	} else {
		Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_STATUS_CODE);

	}

	Alloy.Globals.LoadingScreen.close();

}

