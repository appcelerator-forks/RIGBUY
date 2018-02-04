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
				actionBar.setTitle('My Enquiry');

				actionBar.setDisplayHomeAsUp(true);
				// show an angle bracket next to the home icon,
				// indicating to users that the home icon is tappable

				// toggle the left window when the home icon is selected
				actionBar.setOnHomeIconItemSelected(function() {
					$.MyEnquiry.close();
				});
			}
		}
	}
}

var index = 0;
function tableClickFunc(e) {

	if (e.source.name == "delete") {
		index = e.index;
		Ti.API.info('e ' + JSON.stringify(e.source));
		var dialog = Ti.UI.createAlertDialog({
			cancel : 1,
			buttonNames : ['No', 'Yes'],
			message : 'Would you like to delete the enquiry of product '+e.row.detail.product_name+' item?',
			title : 'RIGBUY'
		});
		dialog.addEventListener('click', function(k) {
			if (k.index === 0) {
				Ti.API.info('The cancel button was clicked');
			} else {
				index = e.index;
				removeEnquiryService(e.row.detail.id);

			}

		});
		dialog.show();
	}
}

var productRow = function(detail) {
	tableData = [];
	Ti.API.info('Detail : ' + JSON.stringify(detail));
	for (var i = 0; i < detail.length; i++) {

		var tableRow = Ti.UI.createTableViewRow({
			touchEnabled : true,
			width : "100%",
			height : Ti.UI.SIZE,
			backgroundColor : "white",
			detail : detail[i],
			selectedBackgroundColor : "#F8F8F9"
		});
		tableRow.add(Ti.UI.createView({
			left : 10,
			right : 70 * Alloy.Globals.scaleFactor,
			height : Ti.UI.SIZE,
			layout : "vertical",
		}));

		tableRow.getChildren()[0].add(Ti.UI.createLabel({
			top : 6,
			left : 10,
			right : 0,
			text : detail[i].product_name,
			color : "black",
			font : {
				fontSize : 15 * Alloy.Globals.scaleFactor
			},
			textAlign : "left",
		}));

		tableRow.getChildren()[0].add(Ti.UI.createLabel({
			top : 6,

			left : 10,
			right : 0,
			text : detail[i].email,
			color : "gray",
			font : {
				fontSize : 12 * Alloy.Globals.scaleFactor
			},

			textAlign : "left",

		}));
		tableRow.getChildren()[0].add(Ti.UI.createLabel({
			top : 6,
			left : 10,
			right : 0,
			text : detail[i].contact,
			color : "gray",
			font : {
				fontSize : 12 * Alloy.Globals.scaleFactor
			},
			textAlign : "left",
		}));
		tableRow.getChildren()[0].add(Ti.UI.createLabel({
			top : 6,
			left : 10,
			right : 0,
			text : detail[i].description,
			color : "gray",
			font : {
				fontSize : 12 * Alloy.Globals.scaleFactor
			},
			textAlign : "left",
		}));
		tableRow.getChildren()[0].add(Ti.UI.createLabel({
			top : 6,
			text : "",
			height : 0

		}));
		tableRow.add(Ti.UI.createButton({
			right : 8,
			image : "/images/deleteIcon.png",
			width : 50 * Alloy.Globals.scaleFactor,
			height : 50 * Alloy.Globals.scaleFactor,
			name : "delete",
			backgroundImage:"none"
		}));
		tableData.push(tableRow);
	}
	$.myEnquiryTable.setData(tableData);
};
productRow(args);

function removeEnquiryService(id) {
	var obj = {};
	obj.userId = Ti.App.Properties.getString("userid");
	obj.id = id;
	Ti.API.info('OBJ : ' + JSON.stringify(obj));
	if (Ti.Network.online) {
		Alloy.Globals.LoadingScreen.open();
		Communicator.post("http://rigbuy.com/webservices/index.php?action=product&actionMethod=deleteEnquiry", removeEnquiryServiceCallback, obj);
		
	} else {

		Alloy.Globals.Alert("Please check your internet connection and try again.");

	}
};

function removeEnquiryServiceCallback(e) {

	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.status == "1") {
					//Alloy.Globals.getProductListervice();
					$.myEnquiryTable.deleteRow(index, true);
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

