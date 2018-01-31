// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
Alloy.Globals.isScreen = args;
/*
 * Variable defined for the services
 */
var Communicator = Alloy.Globals.Communicator;
var DOMAIN_URL = Alloy.Globals.Constants.DOMAIN_URL;

var height = Ti.Platform.displayCaps.platformHeight;
var btnHeight = height * (7.0 / 100);
var radius = btnHeight / 2;
$.fbBtn.borderRadius = radius;
$.googleBtn.borderRadius = radius;

$.staticLbl.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor
};
$.fbBtn.font = {
	fontSize : 16 * Alloy.Globals.scaleFactor
};
$.googleBtn.font = {
	fontSize : 16 * Alloy.Globals.scaleFactor
};
$.emailTF.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
$.passwordTF.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
$.submitBtn.font = {
	fontSize : 16 * Alloy.Globals.scaleFactor
};
$.signUpBtn.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};

function closeFunc(e) {
	$.Login.close();
}

if (OS_IOS) {

	var Google = require('ti.googlesignin');
	Alloy.Globals.google = Google;

	Google.initialize({
		clientID : (OS_IOS) ? '61069628492-phalp1k382nlam34i2e0pcta25dce23n.apps.googleusercontent.com' : "61069628492-l5skrm8fghkr53s3i66ouob3qkg3vta2.apps.googleusercontent.com"
	});
	if (OS_IOS) {
		var loggedIn = Google.hasAuthInKeychain();
	}

	Google.addEventListener('login', googleResponse);
	function googleResponse(e) {
		Google.removeEventListener('login', googleResponse);
		Ti.API.info('Logged in!');

		Ti.API.info(JSON.stringify(e.user));
		//
		Ti.API.info('Email ' + e.user.profile.email);
		Ti.API.info('Email ' + e.user.profile.name);
		Ti.API.info('Email ' + Google.currentUserImageURLWithSize(200));
		// profilePicture.setImage(Google.currentUserImageURLWithSize(200));
		var obj = {};
		obj.id = e.user.id;
		obj.email = e.user.profile.email;
		obj.name = e.user.profile.name;
		obj.photo = Google.currentUserImageURLWithSize(200);
		loginService("social", obj);
		loggedIn = true;
	}


	Google.addEventListener('disconnect', function(e) {
		Ti.API.info('Disconnected!');
		// The Google SignIn API prefers "diconnect" over "logout"
		Ti.API.info(e.user);
		Alloy.Globals.LoadingScreen.close();
		Google.removeEventListener('login', googleResponse);

		loggedIn = false;

	});

	Google.addEventListener('load', function(e) {
		Ti.API.info('Login UI loaded!');
	});

	Google.addEventListener('cancel', function(e) {
		Ti.API.info('Login UI cancelled: ' + e.message);
		Alloy.Globals.LoadingScreen.close();
	});

	Google.addEventListener('error', function(e) {
		Ti.API.info('Login UI errored: ' + e.message);
		Alloy.Globals.LoadingScreen.close();
	});

	Google.addEventListener('open', function(e) {
		Ti.API.info('Login UI opened!');
	});

	Google.addEventListener('close', function(e) {
		Ti.API.info('Login UI closed!');
		
		
	});

} else {
	var Google = require('ti.googlesignin');
	Alloy.Globals.google = Google;
	Google.initialize({

		clientID : "61069628492-l5skrm8fghkr53s3i66ouob3qkg3vta2.apps.googleusercontent.com", //  Web application client ID, not androidID !!!!
		onLogin : function(res) {
			Ti.API.info("**************   " + JSON.stringify(res));
			var obj = {};
			obj.id = res.id;
			obj.email = res.email;
			obj.name = res.displayName;
			obj.photo = res.photo;
			loginService("social", obj);
		}
	});

	Google.addEventListener('connect', function(e) {
		Ti.API.info(' ***** Connect: ');
	});
	Google.addEventListener('error', function(e) {
		Alloy.Globals.LoadingScreen.close();
		Ti.API.info(' ***** Err0r: ');
	});
	Google.addEventListener('disconnect', function(e) {
		Alloy.Globals.LoadingScreen.close();
		Ti.API.info(' ***** disconnect: ');
	});

	Google.addEventListener('login', function(e) {
		Ti.API.info(' ***** DEBUG: ' + JSON.stringify(e));

	});

}

function loginGoogle(e) {

	if (Ti.Network.online) {

		if ($.googleBtn.focusable == false) {
			return;
		}
		$.googleBtn.focusable == false;
		//Alloy.Globals.google = new Google(ggParams);
		Ti.API.info('Google Response ');
		Alloy.Globals.LoadingScreen.open();
		Google.signIn();
		//Alloy.Globals.google.logout();

	} else {
		$.googleBtn.focusable == true;
		Alloy.Globals.Alert("Please check your internet connection and try again");
	}

}

function windowClick(e) {
	if (e.source.name != "tf") {
		$.emailTF.blur();
	}
}

function submitFunc(e) {
	if ($.submitBtn.focusable == false) {
		return;
	}
	$.submitBtn.focusable == false;
	if ($.emailTF.value != null && $.emailTF.value.trim().length > 0) {
		if (Alloy.Globals.validateCaseSensitiveEmail($.emailTF.value)) {
			if ($.passwordTF.value != null && $.passwordTF.value.trim().length > 0) {
				if ($.passwordTF.value != null && $.passwordTF.value.trim().length > 0) {
					loginService("normal");
				} else {
					Alloy.Globals.Alert("Password should be 6 character long");
				}

			} else {
				Alloy.Globals.Alert("Please enter password");
			}
		} else {
			Alloy.Globals.Alert("Please enter valid registred email address");

		}
	} else {
		Alloy.Globals.Alert("Please enter email address");
	}
	setTimeout(function(e) {
		$.submitBtn.focusable == true;
	}, 1000);
}

function signup(e) {
	if ($.signUpBtn.focusable == false) {
		return;
	}
	$.signUpBtn.focusable == false;
	var signUp = Alloy.createController("SignUp", $.Login).getView();
	signUp.open();
	setTimeout(function(e) {
		$.signUpBtn.focusable == true;
	}, 1000);
}

function openFunc(e) {

	$.containerVW.animate({
		opacity : 1,
		duration : 550
	});

}

/*
 * FB related code
 */

if (Alloy.Globals.fb == null) {
	Alloy.Globals.fb = require('facebook');
	Alloy.Globals.fb.initialize();
	Alloy.Globals.fb.permissions = ["public_profile", "email"];
}

if (OS_ANDROID) {
	$.Login.fbProxy = Alloy.Globals.fb.createActivityWorker({
		lifecycleContainer : $.Login
	});
} else {
	Alloy.Globals.fb.setLoginBehavior(Alloy.Globals.fb.LOGIN_BEHAVIOR_NATIVE);
}

function loginFB(e) {
	if (OS_ANDROID) {
		// Alloy.Globals.Alert("Under Development");
		// return;
	}
	if (Ti.Network.online) {
		if ($.fbBtn.focusable == false) {
			return;
		}
		$.fbBtn.focusable == false;
		Alloy.Globals.LoadingScreen.open();
		if (Alloy.Globals.fb.loggedIn) {
			Alloy.Globals.fb.requestWithGraphPath("me", null, "GET", function(e) {
				Ti.API.info("GRAPH API RESPONSE : " + JSON.stringify(e));
				if (e.success) {

					Ti.API.info("Facebook ID 2: " + Ti.App.Properties.getString("facebookAccessToken"));
					FBLogin(JSON.parse(e.result));
					//loginService("social", JSON.parse(e.result));

				} else {
					try {
						Alloy.Globals.fb.addEventListener('login', fbLoginEvent);
						Alloy.Globals.fb.authorize();
					} catch(e) {
						Alloy.Globals.LoadingScreen.close();
						Ti.API.info('Error Authorization : ' + e.message);
						$.fbBtn.focusable == true;
					}
				}
			});
		} else {
			try {
				Ti.API.info('Login1 : ');
				Alloy.Globals.fb.addEventListener('login', fbLoginEvent);
				Alloy.Globals.fb.authorize();
			} catch(e) {
				Alloy.Globals.LoadingScreen.close();
				Ti.API.info('Error Authorization : ' + e.message);
				$.fbBtn.focusable == true;
			}

		}

	} else {
		$.fbBtn.focusable == true;
		Alloy.Globals.Alert("Please check your internet connection and try again");
	}

	setTimeout(function(e) {
		$.fbBtn.focusable == true;
	}, 1000);
}

var fbLoginEvent = function(e) {
	Ti.API.info('1111 ' + e.success);

	if (Ti.Network.online) {
		if (e.success) {
			Ti.API.info('1111');
			Ti.App.Properties.setString("facebookAccessToken", e.source.accessToken);
			Ti.API.info("Facebook ID : " + Ti.App.Properties.getString("facebookAccessToken"));
			Ti.API.info("data : " +JSON.stringify(e.source));
			var fbData = {};
			fbData.id = e.source.uid;
			fbData.accessToken = e.source.accessToken;
			FBLogin(fbData);
			

		} else if (e.error) {
			$.fbBtn.focusable == true;
			Alloy.Globals.LoadingScreen.close();
			Ti.API.info("e.message : " + e.message);

		} else if (e.cancelled) {
			Alloy.Globals.LoadingScreen.close();
			$.fbBtn.focusable == true;
			Ti.API.info("e.cancelled : " + e.cancelled);

		}
		Alloy.Globals.fb.removeEventListener('login', fbLoginEvent);
	} else {
		$.fbBtn.focusable == true;
		Alloy.Globals.LoadingScreen.close();
		Alloy.Globals.Alert("Please check your internet connection and try again");
	}
};

function FBLogin(detail) {

	var fbID = detail.id;
	var accessToken = Ti.App.Properties.getString("facebookAccessToken");
	Ti.API.info('STEP3');
	if (Ti.Network.online) {
		
		Communicator.get("https://graph.facebook.com/" + fbID + "?fields=name,picture,email&access_token=" + accessToken, FBCallback);
		//Ti.API.info('URL ' + "https://graph.facebook.com/" + fbID + "?fields=name,picture,email&access_token=" + accessToken);
	} else {
		Alloy.Globals.LoadingScreen.close();
		$.fbBtn.focusable == true;
		Alloy.Globals.Alert("Please check your internet connection and try again");
	}
}

/*
 * Callback gunction for FB and Google+ login
 */

function FBCallback(e) {
	Ti.API.info("Signup response : " + JSON.stringify(e));
	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.FBLogin = ' + JSON.stringify(response));
				//getBlob(response.picture.data.url, response, "facebook");
				//socialLogin(response, "facebook");
				var fbData ={};
				fbData.name = response.name;
				fbData.id = response.id;
				fbData.email = response.email;
				fbData.photo = response.picture.data.url;
				loginService("social", fbData);
				
			} else {
				Alloy.Globals.LoadingScreen.close();
				Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_NO_DATA);
				$.fbBtn.focusable == true;
			}
		} catch(e) {

			Ti.API.info('Error News List :: ' + e.message);
			//Alloy.Globals.Alert(e.message);
			Alloy.Globals.LoadingScreen.close();
			$.fbBtn.focusable == true;
		}
	} else {
		Alloy.Globals.LoadingScreen.close();
		Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_STATUS_CODE);
		$.fbBtn.focusable == true;
	}

}

/*
 * Function for Login web service in this defined the login parameter
 * API URL
 *
 */
function loginService(type, fbdata) {
	var obj = {};
	if (type == "normal") {
		obj.email = $.emailTF.value.trim();
		obj.password = $.passwordTF.value.trim();
		obj.deviceToken = "1";
		obj.lat = Alloy.Globals.latitude;
		obj.long = Alloy.Globals.longitude;
		obj.deviceType = Titanium.Platform.osname;
		Ti.App.Properties.setBool("socialLogin", false);
	} else {
		Ti.App.Properties.setBool("socialLogin", true);

		obj.socialId = fbdata.id;
		obj.email = fbdata.email;
		obj.image_url = fbdata.photo;
		obj.name = fbdata.name;
		obj.lat = Alloy.Globals.latitude;
		obj.long = Alloy.Globals.longitude;
		obj.deviceToken = "1";
		obj.deviceType = Titanium.Platform.osname;
	}
	Ti.API.info("Social  response : " + JSON.stringify(fbdata));
	Ti.API.info("Signup response : " + JSON.stringify(obj));
	var SERVICE_USER_LOGIN = Alloy.Globals.Constants.SERVICE_USER_LOGIN;
	if (Ti.Network.online) {
		
		Communicator.post(DOMAIN_URL + SERVICE_USER_LOGIN, loginServiceCallback, obj);
		Ti.API.info('URL ' + DOMAIN_URL + SERVICE_USER_LOGIN);
	} else {
		Alloy.Globals.LoadingScreen.close();
		$.submitBtn.focusable = true;
		Alloy.Globals.Alert("Please check your internet connection and try again.");

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
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.status == "1") {
					Ti.App.Properties.setString("email", response.records.email);
					Ti.App.Properties.setString("userid", response.records.userId);
					Ti.App.Properties.setString("password", $.passwordTF.value.trim());
					Ti.App.Properties.setBool("isLogin", true);
					if (OS_ANDROID) {
						Alloy.Globals.logoutRow.remove(Alloy.Globals.loginLbl);
						Alloy.Globals.logoutRow.add(Alloy.Globals.loginLbl);
					}

					Alloy.Globals.loginLbl.text = "Logout";
					if (OS_IOS) {
						Alloy.Globals.logoutImg.leftImage = "/images/logout.png";
					} else {
						Alloy.Globals.logoutImg.image = "/images/logout.png";
					}
					if (Alloy.Globals.isScreen == "setting") {
						var regScreen = Alloy.createController("Setting").getView();

						if (OS_IOS) {
							Alloy.Globals.navWin.openWindow(regScreen, {
								animated : false
							});
						} else {
							Alloy.Globals.mainVW.add(regScreen);
						}

						setTimeout(function(e) {
							Alloy.Globals.goToHome(Alloy.Globals.currentWindow);
							Alloy.Globals.currentWindow = regScreen;
						}, 200);
						if (OS_IOS) {
							Alloy.Globals.openLeft();
						} else {
							Alloy.Globals.drawer.toggleLeftWindow();
						}
					} else if (Alloy.Globals.isScreen == "chat") {
						var productDetail = Alloy.createController("Chat").getView();
						if (OS_IOS) {
							Alloy.Globals.navWin.openWindow(productDetail);
						} else {
							productDetail.open();
						}
						Alloy.Globals.currentWindow = productDetail;
					} else if (Alloy.Globals.isScreen == "chatDetail") {
						var productDetail = Alloy.createController("Chat").getView();
						if (OS_IOS) {
							Alloy.Globals.navWin.openWindow(productDetail);
						} else {
							productDetail.open();
						}
						productDetail.oldWin = Alloy.Globals.productDetailObj;
						Alloy.Globals.currentWindow = productDetail;
					} else if (Alloy.Globals.isScreen == "fav") {
						Alloy.Globals.addFavService();
					} else {
						if (OS_IOS) {
							Alloy.Globals.openLeft();
						} else {
							Alloy.Globals.drawer.toggleLeftWindow();
						}
					}

					$.Login.close();

				} else {
					Alloy.Globals.Alert(response.msg);
				}

			} else {
				Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_NO_DATA);
				$.submitBtn.focusable = true;
				//Alloy.Globals.isHome = 0;
			}
		} catch(e) {
			Ti.API.info('Error social Login List :: ' + e.message);
			$.submitBtn.focusable = true;
			//Alloy.Globals.isHome = 0;
		}

	} else {
		Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_STATUS_CODE);
		$.submitBtn.focusable = true;
		//Alloy.Globals.isHome = 0;
	}
	$.submitBtn.focusable = true;
	Alloy.Globals.LoadingScreen.close();

}

if (OS_IOS) {
	Alloy.Globals.geoCall();
} else {
	if (Alloy.Globals.androidVersion[0] >= 6) {
		var hasLocationPermissions = Titanium.Geolocation.hasLocationPermissions();

		if (hasLocationPermissions) {
			Alloy.Globals.geoCall();

		}

		Titanium.Geolocation.requestLocationPermissions('', function(e) {
			if (e.success) {
				Alloy.Globals.geoCall();
			} else if (OS_ANDROID) {
			}
		});
	} else {
		Alloy.Globals.geoCall();
	}
}