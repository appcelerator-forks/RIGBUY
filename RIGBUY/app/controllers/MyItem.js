// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var Communicator = Alloy.Globals.Communicator;
var DOMAIN_URL = Alloy.Globals.Constants.DOMAIN_URL;

function openFunc(e) {
	Alloy.Globals.getMyItemListervice();
	if (OS_ANDROID) {
		if (this.getActivity()) {
			// need to explicitly use getXYZ methods
			var actionBar = this.getActivity().getActionBar();

			if (actionBar) {
				// Now we can do stuff to the actionbar
				actionBar.setTitle('Add Products');

				actionBar.setDisplayHomeAsUp(true);
				// show an angle bracket next to the home icon,
				// indicating to users that the home icon is tappable

				// toggle the left window when the home icon is selected
				actionBar.setOnHomeIconItemSelected(function() {
					$.MyItem.close();
				});
			}
		}
	}
}




function openAddItemScreen(e) {
	var obj = {};
	obj.from = "add";
	var addItemWin = Alloy.createController("AddItem", obj).getView();
	if (OS_IOS) {
		Alloy.Globals.navWin.openWindow(addItemWin);
	} else {
		addItemWin.open();
	}
	addItemWin.oldWin = $.MyItem;
	Alloy.Globals.currentWindow = addItemWin;
}

var rowIndex = 0;
function tableClickFunc(e) {

	if (e.source.name == "edit") {
		Ti.API.info('Edit');
		var obj = {};
		obj.from = "edit";
		obj.data = e.row.detail;
		var MyWhishlist = Alloy.createController("AddItem", obj).getView();
		if (OS_IOS) {
			Alloy.Globals.navWin.openWindow(MyWhishlist);
		} else {
			MyWhishlist.open();
		}
		MyWhishlist.oldWin = $.MyItem;
		Alloy.Globals.currentWindow = MyWhishlist;
	} else if (e.source.name == "delete") {
		var dialog = Ti.UI.createAlertDialog({
			cancel : 1,
			buttonNames : ['No', 'Yes'],
			message : 'Would you like to delete the selected item?',
			title : 'Delete'
		});
		dialog.addEventListener('click', function(k) {
			if (k.index === 0) {
				Ti.API.info('The cancel button was clicked');
			} else {
				rowIndex = e.index;
				deleteItemService(e.row.detail.id);

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
			image : detail[i].product_image
		}));

		//0-1
		tableRow.getChildren()[0].add(Ti.UI.createView({
			height : 34 * Alloy.Globals.scaleFactor,
			width : 34 * Alloy.Globals.scaleFactor,
			borderRadius : 17 * Alloy.Globals.scaleFactor,
			backgroundColor : "#565656",
			name : "fav",
			left : "3%",
			top : "4%",
		}));  
		
		tableRow.getChildren()[0].getChildren()[1].add(Ti.UI.createImageView({
			name : "fav",
			image : (detail[i].fav == 0) ? "/images/unfavorites.png" : "/images/add-to-favorites.png",
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
			image : (detail[i].currency == "INR") ? "/images/rupees.png" : "/images/dollar.png",
		}));
		
		tableRow.getChildren()[0].getChildren()[2].add(Ti.UI.createLabel({
			left : 2,
			width : "65%",

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
			width : "32%",
			height : (OS_ANDROID) ? 35 * Alloy.Globals.scaleFactor : 30 * Alloy.Globals.scaleFactor,
			bottom : 0,
			name : "edit",
			title : "Edit",
			borderColor : "#f54224",
			borderWidth : 1,
			// backgroundColor:"#f54224",
			color : "#f54224",
			selectedColor : "black",
			font : {
				fontSize : 12 * Alloy.Globals.scaleFactor
			},
			backgroundImage : "none"
		}));
		tableRow.getChildren()[0].add(Ti.UI.createButton({
			right : 0,
			width : "32%",
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

Alloy.Globals.getMyItemListervice = function(from) {
	var obj = {};
	obj.userId = Ti.App.Properties.getString("userid");
	if (Ti.Network.online) {

		Alloy.Globals.LoadingScreen.open();

		Communicator.post("http://rigbuy.com/webservices/index.php?action=product&actionMethod=listProduct", getProductListerviceCallback, obj);

	} else {

		Alloy.Globals.Alert("Please check your internet connection and try again.");

	}
};

function getProductListerviceCallback(e) {

	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.status == "1") {
					productRow(response.record);
					productListArray = response.record;

				} else {
					Alloy.Globals.Alert("No item found");
				}

			} else {
				Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_NO_DATA);

			}
		} catch(e) {
			Ti.API.info('Error getCategoryerviceCallback :: ' + e.message);

		}

	} else {
		Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_STATUS_CODE);

	}
	if (Alloy.Globals.LoadingScreen) {

		Alloy.Globals.LoadingScreen.close();
	}

}

function deleteItemService(productId) {
	var obj = {};
	obj.userId = Ti.App.Properties.getString("userid");
	obj.productId = productId;
	if (Ti.Network.online) {
		Alloy.Globals.LoadingScreen.open();
		Communicator.post("http://rigbuy.com/webservices/index.php?action=product&actionMethod=deleteProductById", deleteItemServiceCallback, obj);
	} else {
		Alloy.Globals.Alert("Please check your internet connection and try again.");
	}
};

function deleteItemServiceCallback(e) {

	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.status == "1") {
					$.myItemTable.deleteRow(rowIndex, true);
					Alloy.Globals.getMyItemListervice();
					//Alloy.Globals.getProductListervice("wishList");
				} else {
					Alloy.Globals.Alert("No item found");
				}

			} else {
				Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_NO_DATA);

			}
		} catch(e) {
			Ti.API.info('Error getCategoryerviceCallback :: ' + e.message);

		}

	} else {
		Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_STATUS_CODE);

	}
	if (Alloy.Globals.LoadingScreen) {

		Alloy.Globals.LoadingScreen.close();
	}

}