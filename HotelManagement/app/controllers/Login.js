// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
Alloy.Globals.loginObj = $.Login;
Alloy.Globals.loadingLbl.text = "Please wait...";
Alloy.Globals.isLogin =false;
//Set the commmunicator and constant class for Web service calling
var Communicator = Alloy.Globals.Communicator;
var DOMAIN_URL = Alloy.Globals.Constants.DOMAIN_URL;

$.registrationLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor,
	fontWeight : 'bold'
};
$.registrationTF.font = {
	fontSize : 16 * Alloy.Globals.scaleFactor,
	fontFamily : "HelveticaNeue-Regular",
};
$.roomLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor,
	fontWeight : 'bold'
};
$.roomTF.font = {
	fontSize : 16 * Alloy.Globals.scaleFactor,
	fontFamily : "HelveticaNeue-Regular",
};
function winClickFunc(e){
	if(e.source.name !="tf"){
		$.registrationTF.blur();
		$.roomTF.blur();
	}
}

function registrationReturnFunc(e){
	$.roomTF.focus();
}
var flag = true;
function maskHideFunc(e) {

	if (flag) {

		$.roomTF.passwordMask = false;
		$.eyeBtn.image = "/images/eyeClose.png";
		flag = false;
	} else {
		$.eyeBtn.image = "/images/eye.png";
		$.roomTF.passwordMask = true;
		flag = true;
	}
}

function loginFunc(e) {
	if ($.loginBtn.focusable == false) {
		return;
	}
	$.loginBtn.focusable == false;
	if ($.registrationTF.value != null && $.registrationTF.value.trim().length > 0) {

		if ($.roomTF.value != null && $.roomTF.value.trim().length > 0) {
			loginService();
		} else {
			Alloy.Globals.Alert("Please enter valid room number");
		}
	} else {
		Alloy.Globals.Alert("Please enter valid registration number");
	}
	setTimeout(function(e) {
		$.loginBtn.focusable == true;
	}, 1000);
}

function changeRegistrationFunc(e) {
	if (e.source.value.length > 0) {
		$.registrationLbl.animate({
			duration : 500,
			opacity : 1
		});
	} else {
		$.registrationLbl.animate({
			duration : 500,
			opacity : 0
		});
	}

}

function changeRoomFunc(e) {
	if (e.source.value.length > 0) {
		$.roomLbl.animate({
			duration : 500,
			opacity : 1
		});
	} else {
		$.roomLbl.animate({
			duration : 500,
			opacity : 0
		});
	}

}

function loginService() {

	if (Ti.Network.online) {
		Alloy.Globals.LoadingScreen.open();
		Communicator.get("http://myhotelsapp.com/api/api.php?action=UserLogin&" + "registartion_number=" + $.registrationTF.value + "&room_number=" + $.roomTF.value+ "&device_type=ios"+ "&device_id=" + Alloy.Globals.deviceToken, loginServiceCallback);
		Ti.API.info('URL : ' + "http://myhotelsapp.com/api/api.php?action=UserLogin&" + "registartion_number=" + $.registrationTF.value + "&room_number=" + $.roomTF.value+ "&device_type=ios"+ "&device_id=" + Alloy.Globals.deviceToken);
	} else {
		$.loginBtn.focusable = true;
		Alloy.Globals.Alert(Alloy.Globals.langConvert("internat_connection_message"));

	}
}

/*
 * Callback function for login in this we are getting response from the server and navigate to HomeScreen from openHome function.
 */

function loginServiceCallback(e) {
	Ti.API.info("loginServiceCallback response : " + JSON.stringify(e));
	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				// Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.success == '1') {
					
					Ti.App.Properties.setString("hotel_id", response.userdetails.hotel_id);
					Ti.App.Properties.setString("visitor_code", response.userdetails.visitor_code);
					Ti.App.Properties.setString("locale", response.userdetails.language.toLowerCase());
					Ti.App.Properties.setString("room_number", response.userdetails.room_number);
					Alloy.Globals.openHome(response.userdetails,$.Login, $.loginBtn);
				} else {
					Alloy.Globals.Alert(response.msg); 
					$.loginBtn.focusable = true;
				}

			} else {
				Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_NO_DATA);
				$.loginBtn.focusable = true;
				//Alloy.Globals.isHome = 0;
			}
		} catch(e) {
			Ti.API.info('Error social Login List :: ' + e.message);
			$.loginBtn.focusable = true;
			//Alloy.Globals.isHome = 0;
		}

	} else {
		Alloy.Globals.Alert(Alloy.Globals.langConvert("network_validation"));
		$.loginBtn.focusable = true;
		//Alloy.Globals.isHome = 0;
	}
	$.loginBtn.focusable = true;
	Alloy.Globals.LoadingScreen.close();

}




