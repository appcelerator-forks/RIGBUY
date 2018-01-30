// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var lang = Titanium.App.Properties.getString('locale');

//Set the commmunicator and constant class for Web service calling
var Communicator = Alloy.Globals.Communicator;
var DOMAIN_URL = Alloy.Globals.Constants.DOMAIN_URL;

Ti.API.info('ARGS : ' + JSON.stringify(args));
$.titleLbl.text = args.data.title;
$.foodImg.image = "http://myhotelsapp.com/hotel/uploads/food/" + args.data.image;
$.descLbl.text = args.data.desc;
$.priceLbl.text = "$. " + args.data.price;
$.cancelBtn.height = 26 * Alloy.Globals.scaleFactor;

$.foodItemStaticLbl.font ={
	fontSize: 13 * Alloy.Globals.scaleFactor
};

var finalPrice = parseInt(args.data.price);
var price = args.data.price;

$.foodItemStaticLbl.text = Alloy.Globals.langConvert("foodItem");
$.cancelBtn.title = Alloy.Globals.langConvert("cancel");
if (lang == "ar") {
	$.leftVW.right = 0;
	$.bookBtn.left = 0;
	$.foodItemStaticLbl.textAlign = "right";
	$.foodItemStaticLbl.right = 0;
	$.cancelBtn.left = 0;
} else {
	$.leftVW.left = 0;
	$.bookBtn.right = 0;
	$.foodItemStaticLbl.textAlign = "left";
	$.foodItemStaticLbl.left = 0;
	$.cancelBtn.right = 0;

}
$.foodItemStaticLbl.font = {
	fontSize : 16 * Alloy.Globals.scaleFactor
};
$.titleLbl.font = {
	fontSize : 16 * Alloy.Globals.scaleFactor
};
$.descLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.priceLbl.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
$.minusBtn.width = 40 * Alloy.Globals.scaleFactor;
$.plusBtn.width = 40 * Alloy.Globals.scaleFactor;
function openFunc(e) {
	$.popupWin.animate({
		duration : 500,
		opacity : 1,
	});
}

function closeWin(){
	$.popupWin.animate({
			duration : 500,
			opacity : 0,
		});
		setTimeout(function(e) {
			$.popupWin.close();
		}, 500);
}
function winClickFunc(e) {
	if (e.source.id == "outerVW") {
		$.popupWin.animate({
			duration : 500,
			opacity : 0,
		});
		setTimeout(function(e) {
			$.popupWin.close();
		}, 500);
	}

}

try {

	Ti.API.info('Alloy.Globals.myCartArray ' + JSON.stringify(Alloy.Globals.myCartArray));
	Ti.API.info('args.food_id ' + args.data.food_id);
	if (Alloy.Globals.myCartArray.length > 0) {
		for (var i = 0; i < Alloy.Globals.myCartArray.length; i++) {
			if (Alloy.Globals.myCartArray[i].food_id == args.data.food_id) {
				Ti.API.info('1');
				$.leftVW.visible = false;
				$.goToCartBtn.visible = true;
				break;
			} else {
				Ti.API.info('2');
				$.leftVW.visible = true;
				$.goToCartBtn.visible = false;
			}
		};
	} else {
		Ti.API.info('3');
		$.leftVW.visible = true;
		$.goToCartBtn.visible = false;
	}
} catch(e) {
	Ti.API.info('Calcultaion : ' + e.message);
}

function minusFunc(e) {
	if ($.qtyLbl.text > 1) {
		$.qtyLbl.text = parseInt($.qtyLbl.text) - 1;
		$.priceLbl.text = "$. " + parseInt(price) * parseInt($.qtyLbl.text);
		Ti.API.info("MINUS __ " + $.qtyLbl.text);
		finalPrice = parseInt(price) * parseInt($.qtyLbl.text);
	}
}

function plusFunc(e) {
	$.qtyLbl.text = parseInt($.qtyLbl.text) + 1;
	$.priceLbl.text = "$. " + parseInt(price) * parseInt($.qtyLbl.text);
	Ti.API.info("PLUS __ " + $.qtyLbl.text);
	finalPrice = parseInt(price) * parseInt($.qtyLbl.text);

}

function goToCart(e) {
	$.popupWin.animate({
		duration : 500,
		opacity : 0,
	});
	setTimeout(function(e) {
		$.popupWin.close();
	}, 500);
	var mycart = Alloy.createController("MyCart").getView();
	Alloy.Globals.navWin.openWindow(mycart);
	mycart.oldWin = args.winObj;
	Alloy.Globals.currentWindow = mycart;

}

function bookOrderFunc(e) {
	Ti.API.info('Price :' + finalPrice);
	Ti.API.info('qty :' + $.qtyLbl.text);
	Ti.API.info('food_id :' + args.data.food_id);
	bookOrderedService(args.data.food_id, $.qtyLbl.text, finalPrice);

}

function bookOrderedService(food_id, qty, price) {
	var params = "language=" + Ti.App.Properties.getString("locale") + "&hotel_id=" + Ti.App.Properties.getString("hotel_id") + "&food_id=" + food_id + "&visitor_code=" + Ti.App.Properties.getString("visitor_code") + "&qty=" + qty + "&price=" + price;
	Ti.API.info('PARAMS  ' + params);
	if (Ti.Network.online) {
		Alloy.Globals.LoadingScreen.open();
		Communicator.get("http://myhotelsapp.com/api/api.php?action=VisitorOrder&" + params, bookOrderedServiceCallback);
		Ti.API.info('URL : ' + "http://myhotelsapp.com/api/api.php?action=VisitorOrder&" + params);
	} else {
		Alloy.Globals.Alert(Alloy.Globals.langConvert("internat_connection_message"));
	}

}

/*
 * Callback function for login in this we are getting response from the server and navigate to HomeScreen from openHome function.
 */

function bookOrderedServiceCallback(e) {
	Ti.API.info("bookOrderedServiceCallback Callback response : " + JSON.stringify(e));
	if (e.success) {
		try {
			// Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.success == '1') {
					$.popupWin.animate({
						duration : 500,
						opacity : 0,
					});
					setTimeout(function(e) {
						$.popupWin.close();
					}, 300);
					var mycart = Alloy.createController("MyCart").getView();
					Alloy.Globals.navWin.openWindow(mycart);
					mycart.oldWin = args.winObj;
					Alloy.Globals.currentWindow = mycart;

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
