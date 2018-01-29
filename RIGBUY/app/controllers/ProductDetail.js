// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.productImg.image = args.product_image;
$.nameLbl.text = args.owner_name;
$.dateLbl.text = "Posted On "+args.created_date;
$.amtLbl.text = args.price;
$.locationLbl.text = args.address;
$.configLbl.text = args.features;
$.descLbl.text = args.product_description;
if (args.status == "1") {
	$.statusLbl.text = "Sell";
} else {
	$.statusLbl.text = "Rent";
}
function openFunc(e) {
	if (OS_ANDROID) {
		if (this.getActivity()) {
			// need to explicitly use getXYZ methods
			var actionBar = this.getActivity().getActionBar();

			if (actionBar) {
				// Now we can do stuff to the actionbar
				actionBar.setTitle('Product Details');

				actionBar.setDisplayHomeAsUp(true);
				// show an angle bracket next to the home icon,
				// indicating to users that the home icon is tappable

				// toggle the left window when the home icon is selected
				actionBar.setOnHomeIconItemSelected(function() {
					$.ProductDetail.close();
				});
			}
		}
	}
}

// $.agentLbl.font = {
// fontSize : 11 * Alloy.Globals.scaleFactor
// };
$.dateLbl.font = {
	fontSize : 11 * Alloy.Globals.scaleFactor
};
// $.contactLbl.font = {
// fontSize : 9 * Alloy.Globals.scaleFactor
// };
$.nameLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
// $.viewContactBtn.font = {
// fontSize : 9 * Alloy.Globals.scaleFactor
// };
$.propertyLbl.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
$.amtLbl.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor
};
$.amtstaticLbl.font = {
	fontSize : 11 * Alloy.Globals.scaleFactor
};
$.amtstaticLbl.height = 20 * Alloy.Globals.scaleFactor;
// $.viewContactBtn.height = 35 * Alloy.Globals.scaleFactor;
// $.amtLbl.height = 30 * Alloy.Globals.scaleFactor;
$.locationLbl.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor
};
$.locationstaticLbl.font = {
	fontSize : 11 * Alloy.Globals.scaleFactor
};

$.descStaticLbl.font = {
	fontSize : 11 * Alloy.Globals.scaleFactor
};
$.descLbl.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor
};
$.descStaticLbl.height = 20 * Alloy.Globals.scaleFactor;
$.locationstaticLbl.height = 20 * Alloy.Globals.scaleFactor;
// $.locationLbl.height = 30 * Alloy.Globals.scaleFactor;

$.configLbl.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor
};
$.configstaticLbl.font = {
	fontSize : 11 * Alloy.Globals.scaleFactor
};
$.configstaticLbl.height = 20 * Alloy.Globals.scaleFactor;
// $.configLbl.height = 30 * Alloy.Globals.scaleFactor;

$.statusLbl.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor
};
$.statusstaticLbl.font = {
	fontSize : 11 * Alloy.Globals.scaleFactor
};
$.statusstaticLbl.height = 20 * Alloy.Globals.scaleFactor;
// $.statusLbl.height = 30 * Alloy.Globals.scaleFactor;
$.nameLbl.height = 18 * Alloy.Globals.scaleFactor;

function openEnquiryScreen(e) {
	var enquiryScreen = Alloy.createController("Enquiry",args.id).getView();
	if (OS_IOS) {
		Alloy.Globals.navWin.openWindow(enquiryScreen);
	} else {
		enquiryScreen.open();
	}
	enquiryScreen.oldWin = $.ProductDetail;
	Alloy.Globals.currentWindow = enquiryScreen;
}

function openChatScreen(e) {
	Alloy.Globals.productDetailObj = $.ProductDetail;

	if (Ti.App.Properties.getBool("isLogin")) {
		var chatScreen = Alloy.createController("Chat").getView();
		if (OS_IOS) {
			Alloy.Globals.navWin.openWindow(chatScreen);
		} else {
			chatScreen.open();
		}
		chatScreen.oldWin = $.ProductDetail;
		Alloy.Globals.currentWindow = chatScreen;
	} else {
		var regScreen = Alloy.createController("Login", "chatDetail").getView();
		regScreen.open();
	}
}
