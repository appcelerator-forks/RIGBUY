// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var Communicator = Alloy.Globals.Communicator;
var DOMAIN_URL = Alloy.Globals.Constants.DOMAIN_URL;

function winClick(e) {
	if (e.source.name != "tf") {
		$.currentPasswordTF.blur();
		$.newPwdTF.blur();
		$.confirmPwdTF.blur();
	}
}

function openFunc(e) {
	if (OS_ANDROID) {
		if (this.getActivity()) {
			// need to explicitly use getXYZ methods
			var actionBar = this.getActivity().getActionBar();

			if (actionBar) {
				// Now we can do stuff to the actionbar
				actionBar.setTitle('Change Password');

				actionBar.setDisplayHomeAsUp(true);
				// show an angle bracket next to the home icon,
				// indicating to users that the home icon is tappable

				// toggle the left window when the home icon is selected
				actionBar.setOnHomeIconItemSelected(function() {
					$.ChangePassword.close();
				});
			}
		}
	}
}

$.currentPasswordLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.currentPasswordTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};

$.newPwdLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.newPwdTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};
$.confirmPwdLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.confirmPwdTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};

function changePasswordReturnFunc(e) {
	if (OS_IOS) {
		$.newPwdTF.focus();
	}

}

function newPwdReturnFunc(e) {
	if (OS_IOS) {
		$.confirmPwdTF.focus();
	}

}

function submitFunc(e) {
	if ($.submitBtn.focusable == false) {
		return;
	}
	$.submitBtn.focusable == false;
	if ($.currentPasswordTF.value != null && $.currentPasswordTF.value.trim().length > 0) {
		Ti.API.info('c ' + $.currentPasswordTF.value);
		Ti.API.info('n ' + Ti.App.Properties.getString("password"));
		if ($.currentPasswordTF.value == Ti.App.Properties.getString("password")) {
			if ($.newPwdTF.value != null && $.newPwdTF.value.trim().length > 0) {
				if ($.confirmPwdTF.value != null && $.confirmPwdTF.value.trim().length > 0) {
					if ($.newPwdTF.value == $.confirmPwdTF.value) {
						changePasswordService();
					} else {
						Alloy.Globals.Alert("New password and confirm should be same");
					}

				} else {
					Alloy.Globals.Alert("Please enter confirm password");
				}
			} else {
				Alloy.Globals.Alert("Please enter new password");

			}
		} else {
			Alloy.Globals.Alert("Your entered password does not match to current password. Please enter correct current password");
		}
	} else {
		Alloy.Globals.Alert("Please enter current password");
	}
	setTimeout(function(e) {
		$.submitBtn.focusable == true;
	}, 1000);
}

function changePasswordService() {
	var a = 'userId=' + Ti.App.Properties.getString("userid");
	a = a + '&oldPassword=' + $.currentPasswordTF.value.trim();
	a = a + '&newPassword=' + $.newPwdTF.value.trim();
	;
	var SERVICE_CHANGE_PASSWORD = Alloy.Globals.Constants.SERVICE_CHANGE_PASSWORD;
	if (Ti.Network.online) {
		Alloy.Globals.LoadingScreen.open();
		Communicator.post("http://rigbuy.com/webservices/index.php?action=userprofile&actionMethod=" + SERVICE_CHANGE_PASSWORD, changePasswordServiceCallback, a);
		Ti.API.info('URL ' + "http://rigbuy.com/webservices/index.php?action=userprofile&actionMethod=" + SERVICE_CHANGE_PASSWORD);
	} else {
		Alloy.Globals.LoadingScreen.close();
		$.submitBtn.focusable = true;
		Alloy.Globals.Alert("Please check your internet connection and try again.");

	}
}

/*
 * Callback function for login in this we are getting response from the server and navigate to HomeScreen from openHome function.
 */

function changePasswordServiceCallback(e) {
	Ti.API.info("changePasswordServiceCallback response : " + JSON.stringify(e));
	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.status == "1") {
					Ti.App.Properties.setString("password",$.newPwdTF.value.trim());
					Alloy.Globals.Alert("Password changed successfullly");
					$.ChangePassword.close();
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
	$.submitBtn.focusable = true;
	Alloy.Globals.LoadingScreen.close();

}