// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var Communicator = Alloy.Globals.Communicator;
var DOMAIN_URL = Alloy.Globals.Constants.DOMAIN_URL;

var product_id = args;
function winClick(e) {
	if (e.source.name != "tf") {
		$.nameTF.blur();
		$.emailTF.blur();
		$.phoneTF.blur();
		$.descTF.blur();
	}
}

function openFunc(e) {
	if (OS_ANDROID) {
		if (this.getActivity()) {
			// need to explicitly use getXYZ methods
			var actionBar = this.getActivity().getActionBar();

			if (actionBar) {
				// Now we can do stuff to the actionbar
				actionBar.setTitle('Enquiry');

				actionBar.setDisplayHomeAsUp(true);
				// show an angle bracket next to the home icon,
				// indicating to users that the home icon is tappable

				// toggle the left window when the home icon is selected
				actionBar.setOnHomeIconItemSelected(function() {
					$.Enquiry.close();
				});
			}
		}
	}
}

$.fullnameLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.nameTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};
$.emailLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.emailTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};
$.phoneLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.phoneTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};

$.descLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.descTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};
if (OS_IOS) {
	$.descHintTextLbl.font = {
		fontSize : 15 * Alloy.Globals.scaleFactor
	};
}

function nameReturnFunc(e) {
	if (OS_IOS)
		$.emailTF.focus();
}

function emailReturnFunc(e) {
	if (OS_IOS)
		$.phoneTF.focus();
}

function phoneReturnFunc(e) {
	if (OS_IOS)
		$.descTF.focus();
}

function descDoneFunc(e) {
	$.descTF.blur();
}

function submitFunc(e) {
	if ($.enquirySubmitBtn.focusable == false) {
		return;
	}
	$.enquirySubmitBtn.focusable == false;
	if ($.nameTF.value != null && $.nameTF.value.trim().length > 0) {
		if ($.emailTF.value != null && $.emailTF.value.trim().length > 0) {
			if (Alloy.Globals.validateCaseSensitiveEmail($.emailTF.value)) {
				if (contactValidate()) {
					if ($.phoneTF.value > 0) {

						if ($.descTF.value != null && $.descTF.value.trim().length > 0) {
							addEnquiryService();
						} else {
							Alloy.Globals.Alert("Please enter description for enquiry");
						}

					} else {
						Alloy.Globals.Alert("Please enter valid contact number");
					}
				} else {
					//Alloy.Globals.Alert("Please enter contact number");
				}
			} else {
				Alloy.Globals.Alert("Please enter valid email address");

			}
		} else {
			Alloy.Globals.Alert("Please enter your email address");
		}
	} else {
		Alloy.Globals.Alert("Please enter your name");
	}
	setTimeout(function(e) {
		$.enquirySubmitBtn.focusable == true;
	}, 1000);
}

function changeFunc(e) {
	if (e.source.value.length > 0) {
		$.descHintTextLbl.visible = false;
	} else {
		$.descHintTextLbl.visible = true;
	}
}

/*
 * Function for Login web service in this defined the login parameter
 * API URL
 *
 */
function addEnquiryService() {
	var obj = {};
	obj.productId = product_id;
	obj.name = $.nameTF.value;
	obj.email = $.emailTF.value;
	obj.contact = $.phoneTF.value;
	obj.description = $.descTF.value;
	if (Ti.App.Properties.getBool("isLogin")) {
		obj.userId = Ti.App.Properties.getString("userid");
	}
	// var a = 'productId=' + product_id;
	// a = a + 'name=' + $.nameTF.value;
	// a = a + 'email=' + $.emailTF.value;
	// a = a + 'contact=' + $.phoneTF.value;
	// a = a + 'description=' + $.descTF.value;

	Ti.API.info("enquiry response : " + JSON.stringify(obj));

	if (Ti.Network.online) {
		Alloy.Globals.LoadingScreen.open();
		Communicator.post("http://rigbuy.com/webservices/index.php?action=product&actionMethod=addEnquiry", addEnquiryServiceCallback, obj);

	} else {

		Alloy.Globals.Alert("Please check your internet connection and try again.");

	}
}

/*
 * Callback function for login in this we are getting response from the server and navigate to HomeScreen from openHome function.
 */

function addEnquiryServiceCallback(e) {
	Ti.API.info("addEnquiryServiceCallback response : " + JSON.stringify(e));
	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.status == "1") {
					$.Enquiry.close();
					Alloy.Globals.Alert(response.msg);
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
		Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_STATUS_CODE);

	}

	Alloy.Globals.LoadingScreen.close();

}

function contactValidate() {

	if ($.phoneTF.value != '' && $.phoneTF.value.trim().length > 0) {
		if ($.phoneTF.value.trim().length >= 10 && $.phoneTF.value.trim().length <= 15) {
			var phoneno = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
			if (phoneno.test($.phoneTF.value)) {
				Ti.API.info("ALERT2");
				return true;
			} else {
				Alloy.Globals.Alert("Please enter valid contact number");
				return false;
			}
		} else {
			Alloy.Globals.Alert("Phone number can not less 8 characters and exceed 15 characters in length");

			return false;
		}
	} else {

		Alloy.Globals.Alert("Please enter contact number");

		return false;
	}
}