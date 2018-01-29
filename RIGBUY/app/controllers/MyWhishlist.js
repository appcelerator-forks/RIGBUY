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
				actionBar.setTitle('My WishList');

				actionBar.setDisplayHomeAsUp(true);
				// show an angle bracket next to the home icon,
				// indicating to users that the home icon is tappable

				// toggle the left window when the home icon is selected
				actionBar.setOnHomeIconItemSelected(function() {
					$.MyWhishlist.close();
				});
			}
		}
	}
}

var index = 0;
function tableClickFunc(e) {
	if(e.source.name == "delete") {
		var dialog = Ti.UI.createAlertDialog({
			cancel : 1,
			buttonNames : ['No', 'Yes'],
			message : 'Would you like to delete the selected item?',
			title : 'RIGBUY'
		});
		dialog.addEventListener('click', function(k) {
			if (k.index === 0) {
				Ti.API.info('The cancel button was clicked');
			} else {
				index = e.index;
				removeWishListService(e.row.detail.id);

			}

		});
		dialog.show();
	}
}

if (OS_IOS) {
	var rowHeight = Titanium.Platform.displayCaps.platformHeight * 0.2887;
} else {
	var rowHeight = Alloy.Globals.Measurement.pxToDP(Titanium.Platform.displayCaps.platformHeight) * 0.2887;
}

var productRow = function(detail) {
	tableData = [];
	for (var i = 0; i < detail.length; i++) {

		var tableRow = Ti.UI.createTableViewRow({
			touchEnabled : true,
			width : "100%",
			height : rowHeight,
			detail : detail[i],
			selectedBackgroundColor : "#F8F8F9"
		});
		// if (OS_IOS) {
		// //tableRow.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.NONE;
		// }

		tableRow.add(Ti.UI.createView({
			top : 2,
			bottom : 2,
			left : "1%",
			right : "1%"
		}));
		//0-0
		tableRow.getChildren()[0].add(Ti.UI.createImageView({
			//layout : "center",
			height : "100%",
			width : "30%",
			defaultImage : "/images/defaultImage.png",
			left : 0,
			image:detail[i].product_image
		}));
		
		//0-1
		tableRow.getChildren()[0].add(Ti.UI.createButton({
			height : 34 * Alloy.Globals.scaleFactor,
			width : 34 * Alloy.Globals.scaleFactor,
			borderRadius : 17 * Alloy.Globals.scaleFactor,
			backgroundColor : "#565656",
			name : "fav",
			image : "/images/unfavorites.png", //add-to-favorites@3x
			backgroundImage : "none",
			left : "3%",
			maxLines : 1,
			top : "4%",
			borderColor : "white",
			borderWidth : 1
		}));
		//0-2
		tableRow.getChildren()[0].add(Ti.UI.createView({
			top : 0,
			left : "32%",
			right : 0,
			height : 18 * Alloy.Globals.scaleFactor,
			layout : "horizontal"
		}));
		tableRow.getChildren()[0].getChildren()[2].add(Ti.UI.createImageView({
			left : 0,
			image : (detail[i].currency == "INR")?"/images/rupees.png":"/images/dollar.png",
		}));
		//
		tableRow.getChildren()[0].getChildren()[2].add(Ti.UI.createLabel({
			left : 2,
			width : "40%",

			text : detail[i].price,
			color : "black",
			font : {
				fontSize : 14 * Alloy.Globals.scaleFactor
			},
			ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
			height : "100%",
			textAlign : "left",
			maxLines : 1
		}));
		tableRow.getChildren()[0].getChildren()[2].add(Ti.UI.createView({
			height : "80%",
			width : 0.6,
			backgroundColor : "gray",
			left : 0
		}));
		tableRow.getChildren()[0].getChildren()[2].add(Ti.UI.createImageView({
			left : 5,
			image :(detail[i].currency == "INR")?"/images/rupees.png":"/images/dollar.png",
		}));
		tableRow.getChildren()[0].getChildren()[2].add(Ti.UI.createLabel({
			left : 2,
			width : "40%",

			text : "12,000",
			color : "black",
			font : {
				fontSize : 14 * Alloy.Globals.scaleFactor
			},
			maxLines : 1,
			ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
			height : "100%",
			textAlign : "left"
		}));
		tableRow.getChildren()[0].add(Ti.UI.createLabel({
			top : 20 * Alloy.Globals.scaleFactor,
			width : "26%",
			left : "38%",
			text : "Rent",
			color : "black",
			maxLines : 1,
			font : {
				fontSize : 8 * Alloy.Globals.scaleFactor
			},
			textAlign : "left"
		}));
		tableRow.getChildren()[0].add(Ti.UI.createLabel({
			top : 20 * Alloy.Globals.scaleFactor,
			width : "28%",
			right : 0,
			text : "Deposit",
			color : "black",

			font : {
				fontSize : 8 * Alloy.Globals.scaleFactor
			},
			maxLines : 1,
			textAlign : "left"
		}));

		tableRow.getChildren()[0].add(Ti.UI.createLabel({
			left : "32%",
			right : 0,
			height : 18 * Alloy.Globals.scaleFactor,
			top : 40 * Alloy.Globals.scaleFactor,
			text : detail[i].product_name,
			color : "gray",
			font : {
				fontSize : 13 * Alloy.Globals.scaleFactor
			},
			ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
			maxLines : 1,
			textAlign : "left"
		}));

		tableRow.getChildren()[0].add(Ti.UI.createLabel({
			left : "32%",
			right : 0,
			height : 13 * Alloy.Globals.scaleFactor,
			top : 66 * Alloy.Globals.scaleFactor,
			text : detail[i].features,
			color : "gray",
			font : {
				fontSize : 11 * Alloy.Globals.scaleFactor
			},
			ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
			maxLines : 1,
			textAlign : "left"
		}));
		tableRow.getChildren()[0].add(Ti.UI.createLabel({
			left : "32%",
			right : 0,
			height : 37 * Alloy.Globals.scaleFactor,
			top : 86 * Alloy.Globals.scaleFactor,

			text : detail[i].product_description,
			color : "gray",
			font : {
				fontSize : 10 * Alloy.Globals.scaleFactor
			},
			ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
			maxLines : 3,
			textAlign : "left"
		}));

		tableRow.getChildren()[0].add(Ti.UI.createButton({
			left : "32%",
			right : 0,
			name : "delete",
			height : (OS_ANDROID) ? 35 * Alloy.Globals.scaleFactor : 30 * Alloy.Globals.scaleFactor,
			bottom : 0,
			title : "Delete",
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
	}
	$.myItemTable.setData(tableData);
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
					Alloy.Globals.getProductListervice();
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

