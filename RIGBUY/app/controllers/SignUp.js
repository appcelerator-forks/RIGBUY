// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

/*
 * Variable defined for the services
 */
var Communicator = Alloy.Globals.Communicator;
var DOMAIN_URL = Alloy.Globals.Constants.DOMAIN_URL;

if (OS_IOS) {
	var height = Ti.Platform.displayCaps.platformHeight;
} else {
	var height = Alloy.Globals.Measurement.pxToDP(Ti.Platform.displayCaps.platformHeight);
}

height = height * 0.1496;
$.imgVWContainer.height = height;
$.imgVWContainer.width = height;
$.imgVWContainer.borderRadius = height / 2;

var selectedImage = "null";

$.staticLbl.font = {
	fontSize : (OS_IOS) ? 15 * Alloy.Globals.scaleFactor : 18 * Alloy.Globals.scaleFactor,
	fontWeight : "bold"
};
$.fullnameLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.nameTF.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};

$.emailLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.emailTF.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
$.phoneLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.phoneTF.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
$.pwdLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.passwordTF.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
$.cancelBtn.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};
$.signupBtn.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};

function uploadPhotoFunc(e) {

	$.nameTF.blur();
	$.emailTF.blur();
	$.phoneTF.blur();
	$.passwordTF.blur();

	var opts = {
		title : 'Choose Photo'
	};
	opts.options = ['Gallery', 'Camera', 'Cancel'];
	var dialog = Ti.UI.createOptionDialog(opts);
	dialog.show();

	try {
		dialog.addEventListener('click', function(e) {
			if (e.index == 0) {
				// 			from gallery

				if (OS_IOS) {
					openGallery();
				} else {
					if (Alloy.Globals.androidVersion[0] >= 6) {
						var hasStoragePermissions = Titanium.Filesystem.hasStoragePermissions();

						if (hasStoragePermissions) {
							openGallery();
							return;
						}
						Ti.Filesystem.requestStoragePermissions(function(e) {
							if (e.success) {
								openGallery();
							} else if (OS_ANDROID) {
								//alert('You donot have the required uses-permissions in tiapp.xml or you denied it forever before.');
							} else {
								//alert('You denied permission.');
							}
						});
					} else {
						openGallery();
					}
				}

			} else if (e.index == 1) {
				if (OS_IOS) {
					openCamera();
				} else {
					if (Alloy.Globals.androidVersion[0] >= 6) {
						var hasCameraPermissions = Ti.Media.hasCameraPermissions();

						if (hasCameraPermissions) {
							openCamera();
							return;
						}
						Ti.Media.requestCameraPermissions(function(e) {
							if (e.success) {
								openCamera();
							} else if (OS_ANDROID) {
								//alert('You donot have the required uses-permissions in tiapp.xml or you denied it forever before.');
							} else {
								//alert('You denied permission.');
							}
						});
					} else {
						openCamera();
					}
				}

			} else if (e.index == 2) {
			}

		});
	} catch(e) {
		Ti.API.info("Error " + e.message);
	}

}

function openGallery(media) {
	Titanium.Media.openPhotoGallery({

		success : function(event) {

			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				try {

					var newBlob = Alloy.Globals.ImageFactory.compress((event.media), 0.25);
					var galleryImg = Alloy.Globals.ImageFactory.imageAsResized(newBlob, {
						width : 300,
						height : 300
					});

					$.userPic.image = galleryImg;
					selectedImage = "" + Titanium.Utils.base64encode($.userPic.image);

				} catch(event) {
					Ti.API.info(event.message);
					//Alloy.Globals.Alert("Network is down. Please try again later");
				}

			}
		},
		cancel : function() {
		},
		mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
		saveToPhotoGallery : false,
		allowEditing : true,
	});
}

function openCamera() {
	Titanium.Media.showCamera({
		success : function(event) {
			var image = event.media;

			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {

				try {

					if (image.length >= 512000) {

						var newBlob = Alloy.Globals.ImageFactory.compress(image, 0.25);

						var blob = newBlob.imageAsResized(300, 300);
						$.userPic.image = blob;

					} else {

						$.userPic.image = (event.media).imageAsResized(300, 300);
						var blob = event.media;
					}
					selectedImage = "" + Titanium.Utils.base64encode($.userPic.image);

				} catch(event) {
					Ti.API.info(event.message);

				}
			}
		},
		cancel : function() {
		},
		error : function(error) {
			var a = Titanium.UI.createAlertDialog({
				title : 'Camera'
			});
			if (error.code == Titanium.Media.NO_CAMERA) {
				a.setMessage('Please run this test on device');
			} else {
				a.setMessage('Unexpected error: ' + error.code);
			}
			a.show();
		},
		saveToPhotoGallery : false,
		allowEditing : true,
		mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
	});
}

function winClick(e) {
	if (e.source.name != "tf") {
		$.nameTF.blur();
		$.phoneTF.blur();
		$.emailTF.blur();
		$.passwordTF.blur();
	}
}

function signUpFunc(e) {
	if ($.signupBtn.focusable == false) {
		return;
	}
	$.signupBtn.focusable == false;
	if ($.nameTF.value != null && $.nameTF.value.trim().length > 0) {
		if ($.emailTF.value != null && $.emailTF.value.trim().length > 0) {
			if (Alloy.Globals.validateCaseSensitiveEmail($.emailTF.value)) {
				///	Ti.API.info('VALUNE '+ contactValidate());
				if (contactValidate()) {
					if ($.passwordTF.value != null && $.passwordTF.value.trim().length > 0) {
						if ($.passwordTF.value != null && $.passwordTF.value.trim().length > 0) {
							signUpService();
						} else {
							Alloy.Globals.Alert("Password should be 6 character long");

						}

					} else {
						Alloy.Globals.Alert("Please enter password");
					}
				} else {
					//Alloy.Globals.Alert("Please enter valid registred email address");

				}
			} else {
				Alloy.Globals.Alert("Please enter valid registred email address");

			}
		} else {
			Alloy.Globals.Alert("Please enter email address");
		}
	} else {
		Alloy.Globals.Alert("Please enter your name");
	}
	setTimeout(function(e) {
		$.signupBtn.focusable == true;
	}, 1000);
}

function contactValidate() {
	Ti.API.info("ALERT");
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
		$.passwordTF.focus();
}

function backFunc(e) {
	$.signUpWin.close();
}

function openFunc(e) {

	$.containerVW.animate({
		opacity : 1,
		duration : 550
	});

}

/*
 * Function for Login web service in this defined the login parameter
 * API URL
 *
 */
function signUpService() {
	var a = 'email=' + $.emailTF.value.trim();
	a = a + '&password=' + $.passwordTF.value.trim();
	a = a + '&contact=' + $.phoneTF.value.trim();
	a = a + '&name=' + $.nameTF.value.trim();
	a = a + '&user_img=' + selectedImage;
	a = a + '&deviceType=' + Titanium.Platform.osname;
	a = a + '&deviceToken=' + "1";
	a = a + '&lat=' + Alloy.Globals.latitude;
	a = a + '&long=' + Alloy.Globals.longitude;

	var SERVICE_USER_SIGNUP = Alloy.Globals.Constants.SERVICE_USER_SIGNUP;
	if (Ti.Network.online) {
		Alloy.Globals.LoadingScreen.open();
		Communicator.post(DOMAIN_URL + SERVICE_USER_SIGNUP, signUpServiceCallback, a);
		Ti.API.info('URL ' + DOMAIN_URL + SERVICE_USER_SIGNUP);
	} else {
		$.signupBtn.focusable = true;
		Alloy.Globals.Alert("Please check your internet connection and try again.");

	}
}

/*
 * Callback function for login in this we are getting response from the server and navigate to HomeScreen from openHome function.
 */

function signUpServiceCallback(e) {
	Ti.API.info("signUpServiceCallback response : " + JSON.stringify(e));
	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.status == "1") {
					if (args) {
						args.close();
					}
					Ti.App.Properties.setString("email", response.records.email);
					Ti.App.Properties.setString("userid", response.records.userId);
					Ti.App.Properties.setString("password", $.passwordTF.value.trim());
					Ti.App.Properties.setBool("isLogin", true);
					Ti.App.Properties.setBool("socialLogin", false);
					$.signUpWin.close();
					Alloy.Globals.logoutRow.remove(Alloy.Globals.loginLbl);
					Alloy.Globals.logoutRow.add(Alloy.Globals.loginLbl);
					Alloy.Globals.loginLbl.text = "Logout";

					if (OS_IOS) {
						Alloy.Globals.logoutImg.leftImage = "/images/logout.png";
					} else {
						Alloy.Globals.logoutImg.image = "/images/logout.png";
					}
					if (OS_IOS) {
							Alloy.Globals.openLeft();
						} else {
							Alloy.Globals.drawer.toggleLeftWindow();
						}
					Alloy.Globals.Alert("Welcome "+$.nameTF.value.trim()+", Registration has done successfully");
				} else {
					Alloy.Globals.Alert(response.msg);
				}

			} else {
				Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_NO_DATA);
				$.signupBtn.focusable = true;
				//Alloy.Globals.isHome = 0;
			}
		} catch(e) {
			Ti.API.info('Error social Login List :: ' + e.message);
			$.signupBtn.focusable = true;
			//Alloy.Globals.isHome = 0;
		}

	} else {
		Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_STATUS_CODE);
		$.signupBtn.focusable = true;
		//Alloy.Globals.isHome = 0;
	}
	$.signupBtn.focusable = true;
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