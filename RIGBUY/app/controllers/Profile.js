// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var Communicator = Alloy.Globals.Communicator;
var DOMAIN_URL = Alloy.Globals.Constants.DOMAIN_URL;
var categoryIndex = -1,
    countryIndex = -1,
    cityIndex = -1,
    stateIndex = -1,
    categoryCheck,
    countryCheck,
    stateCheck,
    cityCheck;
var categoryArray,
    countryArray,
    cityArray,
    stateArray = [];
if (OS_IOS) {
	var deviceHeight = Titanium.Platform.displayCaps.platformHeight;
} else {
	var deviceHeight = Alloy.Globals.Measurement.pxToDP(Titanium.Platform.displayCaps.platformHeight);
}

$.logoVW.top = deviceHeight * 0.01;
$.deviceVW.top = deviceHeight * 0.10;
$.adminEmailVW.top = deviceHeight * 0.14;
$.nameStaticLbl.top = deviceHeight * 0.197;
$.imgVWContainer.top = deviceHeight * 0.1654;
$.personalVW.top = deviceHeight * 0.40;
$.mainVW.top = deviceHeight * 0.45;
$.nameVW.height = deviceHeight * 0.11;
$.phoneVW.height = deviceHeight * 0.11;
$.emailVW.height = deviceHeight * 0.11;
$.locationVW.height = deviceHeight * 0.11;
$.countryVW.height = deviceHeight * 0.11;
$.stateVW.height = deviceHeight * 0.11;
$.cityVW.height = deviceHeight * 0.11;
var selectedImage = "";

var Communicator = Alloy.Globals.Communicator;
var DOMAIN_URL = Alloy.Globals.Constants.DOMAIN_URL;
function openFunc(e) {
	if (OS_ANDROID) {
		if (this.getActivity()) {
			// need to explicitly use getXYZ methods
			var actionBar = this.getActivity().getActionBar();

			if (actionBar) {
				// Now we can do stuff to the actionbar
				actionBar.setTitle('Profile');

				actionBar.setDisplayHomeAsUp(true);
				// show an angle bracket next to the home icon,
				// indicating to users that the home icon is tappable

				// toggle the left window when the home icon is selected
				actionBar.setOnHomeIconItemSelected(function() {
					$.Profile.close();
				});
			}
		}
	}
	getCountryService();
}

$.nameStaticLbl.text = args.first_name;
$.emailStaticLbl.text = args.email;
$.contactStaticLbl.text = args.mobile_phone;
$.nameTF.value = args.first_name;
$.phoneTF.value = args.mobile_phone;
$.emailTF.value = args.email;
$.locationTF.value = args.address;
$.countryTF.value = args.country_name;
$.stateTF.value = args.state_name;
$.cityTF.value = args.city_name;
$.countryTF.country_id = args.country;
$.stateTF.state_id = args.state;
$.cityTF.city_id = args.city;
$.profileImage.image = args.image_url;
$.profileImage.backgroundColor = "white";
function doMenuClick(e) {
	$.Profile.close();
}

if (OS_IOS) {
	var height = Ti.Platform.displayCaps.platformHeight;
} else {
	var height = Alloy.Globals.Measurement.pxToDP(Ti.Platform.displayCaps.platformHeight);
}

height = height * 0.1496;
$.imgVWContainer.height = height;
$.imgVWContainer.width = height;
$.imgVWContainer.borderRadius = height / 2;
$.contactStaticLbl.font = {
	fontSize : 10 * Alloy.Globals.scaleFactor
};
$.emailStaticLbl.font = {
	fontSize : 10 * Alloy.Globals.scaleFactor
};
$.nameStaticLbl.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor,
	fontWeight : "bold"
};
$.infoLbl.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor,
};
$.nameLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor,
};
$.nameTF.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor,
};
$.phoneLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor,
};
$.phoneTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor,
};
$.emailLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor,
};
$.emailTF.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor,
};
$.locationLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor,
};
$.locationTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor,
};
$.countryLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor,
};
$.countryTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor,
};
$.stateLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor,
};
$.stateTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor,
};
$.cityLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor,
};
$.cityTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor,
};
var isSave = false;

function editFunc(e) {
	if ($.editBtn.focusable == false) {
		return;
	}
	$.editBtn.focusable == false;
	if (isSave == false) {
		$.nameTF.editable = true;
		$.phoneTF.editable = true;
		// $.emailTF.editable = true;
		$.locationTF.editable = true;
		if (OS_IOS) {
			$.editBtn.image = "/images/save.png";
		} else {
			$.editBtn.icon = "/images/save.png";
		}

		isSave = true;
	} else {

		if ($.nameTF.value != null && $.nameTF.value.trim().length > 0) {
			if (contactValidate()) {
				// if ($.emailTF.value != null && $.emailTF.value.trim().length > 0) {
				// if (Alloy.Globals.validateCaseSensitiveEmail($.emailTF.value)) {
				if ($.locationTF.value != null && $.locationTF.value.trim().length > 0) {
					if ($.countryTF.value != null && $.countryTF.value.trim().length > 0) {
						if ($.stateTF.value != null && $.stateTF.value.trim().length > 0) {
							if ($.cityTF.value != null && $.cityTF.value.trim().length > 0) {

								updateProfileService();

							} else {
								Alloy.Globals.Alert("Please select city");
							}
						} else {
							Alloy.Globals.Alert("Please select state");
						}
					} else {
						Alloy.Globals.Alert("Please select country");
					}

				} else {
					Alloy.Globals.Alert("Please enter address");
				}
				// } else {
				// Alloy.Globals.Alert("Please enter valid registred email address");
				//
				// }
				// } else {
				// Alloy.Globals.Alert("Please enter email address");
				// }
			} else {
				//Alloy.Globals.Alert("Please enter valid phone number");
			}
		} else {
			Alloy.Globals.Alert("Please enter your name");
		}

	}
	setTimeout(function(e) {
		$.editBtn.focusable == true;
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

function uploadPhotoFunc(e) {
	if (isSave != false) {

		$.nameTF.blur();
		$.emailTF.blur();
		$.phoneTF.blur();
		$.locationTF.blur();

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

					$.profileImage.image = galleryImg;
					selectedImage = "" + Titanium.Utils.base64encode($.profileImage.image);
					Ti.API.info('BASE- ' + selectedImage);

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
						$.profileImage.image = blob;

					} else {

						$.profileImage.image = (event.media).imageAsResized(300, 300);
						var blob = event.media;
					}
					selectedImage = "" + Titanium.Utils.base64encode($.profileImage.image);

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

function winClickFunc(e) {
	if (e.source.name != "tf") {
		$.nameTF.blur();
		$.phoneTF.blur();
		$.emailTF.blur();
		$.locationTF.blur();
	}
}

function nameReturn(e) {
	if (OS_IOS)
		$.phoneTF.focus();
}

function phoneReturn(e) {
	if (OS_IOS)
		$.emailTF.focus();
}

function emailReturn(e) {
	if (OS_IOS)
		$.locationTF.focus();
}

function menuFunc(e) {
	$.Profile.close();
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

function selectCountryFunc(e) {
	if (isSave) {
		if ($.countryVW.focusable == false) {
			return;
		}
		$.countryVW.focusable = false;
		$.nameTF.blur();
		$.phoneTF.blur();
		$.emailTF.blur();
		$.locationTF.blur();
		if (countryArray.length > 0 && countryArray != undefined && countryArray != null) {
			countryCheck = 0;

			Alloy.createWidget('danielhanold.pickerWidget', {
				id : 'country',
				outerView : $.Profile,
				hideNavBar : false,
				type : 'single-column',
				selectedValues : countryIndex,
				pickerValues : countryArray,
				onDone : function(e) {

					Ti.API.info("yes " + JSON.stringify(e.data));

					if (!e.cancel) {
						$.countryTF.value = e.data.title;
						countryIndex = e.data.index;
						$.countryTF.country_id = e.data.country_id;
						$.stateTF.value = "";
						$.stateTF.state_id = "";
						$.cityTF.value = "";
						$.cityTF.city_id = "";
						cityArray = [];
						stateArray = [];
						getStateService(e.data.country_id);

					}
				},
			});
		} else {
			if (Ti.Network.online) {
				countryCheck = 1;
				getCountryService();
			} else {
				Alloy.Globals.Alert("Please check your internet connection and try again.");
			}
		}
		setTimeout(function() {
			$.countryVW.focusable = true;
		}, 1000);
	}
}

function selectStateFunc(e) {
	if (isSave) {
		if ($.stateVW.focusable == false) {
			return;
		}
		$.stateVW.focusable = false;
		$.nameTF.blur();
		$.phoneTF.blur();
		$.emailTF.blur();
		$.locationTF.blur();
		if ($.countryTF.value != "" || $.countryTF.value.trim().length > 0) {
			if (stateArray.length > 0 && stateArray != undefined && stateArray != null) {
				stateCheck = 0;

				Alloy.createWidget('danielhanold.pickerWidget', {
					id : 'state',
					outerView : $.Profile,
					hideNavBar : false,
					type : 'single-column',
					selectedValues : stateIndex,
					pickerValues : stateArray,
					onDone : function(e) {

						Ti.API.info("yes " + JSON.stringify(e.data));

						if (!e.cancel) {
							$.stateTF.value = e.data.title;
							stateIndex = e.data.index;
							$.stateTF.state_id = e.data.state_id;
							$.cityTF.value = "";
							$.cityTF.city_id = "";
							cityArray = [];
							getCityService($.stateTF.state_id);
						}
					},
				});
			} else {
				if (Ti.Network.online) {
					stateCheck = 1;
					getStateService($.countryTF.country_id);
				} else {
					Alloy.Globals.Alert("Please check your internet connection and try again.");
				}
			}
		} else {
			Alloy.Globals.Alert("Please select country first");
			$.stateVW.focusable = true;
		}
		setTimeout(function() {
			$.stateVW.focusable = true;
		}, 1000);
	}
}

function selectCityFunc(e) {
	if (isSave) {
		if ($.cityVW.focusable == false) {
			return;
		}
		$.cityVW.focusable = false;
		$.nameTF.blur();
		$.phoneTF.blur();
		$.emailTF.blur();
		$.locationTF.blur();
		if ($.countryTF.value != "" || $.countryTF.value.trim().length > 0) {
			if ($.stateTF.value != "" || $.stateTF.value.trim().length > 0) {
				if (cityArray != undefined && cityArray != null && cityArray.length > 0) {
					cityCheck = 0;

					Alloy.createWidget('danielhanold.pickerWidget', {
						id : 'city',
						outerView : $.Profile,
						hideNavBar : false,
						type : 'single-column',
						selectedValues : cityIndex,
						pickerValues : cityArray,
						onDone : function(e) {

							Ti.API.info("yes " + JSON.stringify(e.data));

							if (!e.cancel) {
								$.cityTF.value = e.data.title;
								cityIndex = e.data.index;
								$.cityTF.city_id = e.data.city_id;

							}
						},
					});
				} else {
					if (Ti.Network.online) {
						cityCheck = 1;
						getCityService($.stateTF.state_id);
					} else {
						Alloy.Globals.Alert("Please check your internet connection and try again.");
					}
				}
			} else {
				Alloy.Globals.Alert("Please select state first");
				$.cityVW.focusable = true;
			}
		} else {
			Alloy.Globals.Alert("Please select country first");
			$.cityVW.focusable = true;
		}

		setTimeout(function() {
			$.cityVW.focusable = true;
		}, 1000);
	}
}

function getCountryService() {

	if (Ti.Network.online) {

		Communicator.get("http://rigbuy.com/webservices/index.php?action=userprofile&actionMethod=getCountry", getCountryServiceCallback);
	} else {
	}
}

function getCountryServiceCallback(e) {

	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.status == "1") {
					countryArray = response.data;
					if (countryCheck == 1) {
						selectCountryFunc();
					}

				} else {

					Ti.API.info("No country found");
				}

			} else {

				Ti.API.info('MSGCODE: ' + Alloy.Globals.Constants.MSG_NO_DATA);

			}
		} catch(e) {
			Ti.API.info('Error getCategoryerviceCallback :: ' + e.message);

		}

	} else {
		//	Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_STATUS_CODE);
		Ti.API.info('MSGCODE: ' + Alloy.Globals.Constants.MSG_STATUS_CODE);

	}

}

function getStateService(state_id) {

	if (Ti.Network.online) {

		Communicator.get("http://rigbuy.com/webservices/index.php?action=userprofile&actionMethod=getStateByCountryId&countryId=" + state_id, getStateServiceCallback);
	} else {
	}
}

function getStateServiceCallback(e) {

	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.status == "1") {
					stateArray = response.data;
					if (stateCheck == 1) {
						selectStateFunc();
					}

				} else {

					Alloy.Globals.Alert("No state found");
					$.countryTF.value = "";
					countryIndex = 0;
					$.countryTF.country_id = "";

					$.stateTF.value = "";
					$.stateTF.state_id = "";
					$.cityTF.value = "";
					$.cityTF.city_id = "";
				}

			} else {

				Ti.API.info('MSGCODE: ' + Alloy.Globals.Constants.MSG_NO_DATA);

			}
		} catch(e) {
			Ti.API.info('Error getCategoryerviceCallback :: ' + e.message);

		}

	} else {
		$.countryTF.value = "";
		countryIndex = 0;
		$.countryTF.country_id = "";

		$.stateTF.value = "";
		$.stateTF.state_id = "";
		$.cityTF.value = "";
		$.cityTF.city_id = "";
		Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_STATUS_CODE);
		Ti.API.info('MSGCODE: ' + Alloy.Globals.Constants.MSG_STATUS_CODE);

	}

}

function getCityService(state_id) {

	if (Ti.Network.online) {

		Communicator.get("http://rigbuy.com/webservices/index.php?action=userprofile&actionMethod=getCityByStateId&stateId=" + state_id, getCityServiceCallback);
	} else {
	}
}

function getCityServiceCallback(e) {

	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.status == "1") {
					cityArray = response.data;
					if (cityCheck == 1) {
						selectCityFunc();
					}

				} else {

					Alloy.Globals.Alert("No city found");
					$.stateTF.value = "";
					$.stateTF.state_id = "";
				}

			} else {

				Ti.API.info('MSGCODE: ' + Alloy.Globals.Constants.MSG_NO_DATA);

			}
		} catch(e) {
			Ti.API.info('Error getCategoryerviceCallback :: ' + e.message);

		}

	} else {
		$.stateTF.value = "";
		$.stateTF.state_id = "";
		Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_STATUS_CODE);
		Ti.API.info('MSGCODE: ' + Alloy.Globals.Constants.MSG_STATUS_CODE);

	}

}

function updateProfileService() {
	var obj = {};
	obj.userId = Ti.App.Properties.getString("userid");
	obj.name = $.nameTF.value;
	obj.contact = $.phoneTF.value;

	obj.email = $.emailTF.value;
	obj.country = $.countryTF.country_id;
	obj.state = $.stateTF.state_id;
	obj.city = $.cityTF.city_id;
	obj.lat = Alloy.Globals.latitude;
	obj.long = Alloy.Globals.longitude;
	obj.address = $.locationTF.value;
	obj.image_url = selectedImage;

	Ti.API.info("enquiry response : " + JSON.stringify(obj));

	if (Ti.Network.online) {
		Alloy.Globals.LoadingScreen.open();
		Communicator.post("http://rigbuy.com/webservices/index.php?action=userprofile&actionMethod=updateUserProfile", updateProfileServiceCallback, obj);

	} else {

		Alloy.Globals.Alert("Please check your internet connection and try again.");

	}
}

/*
 * Callback function for login in this we are getting response from the server and navigate to HomeScreen from openHome function.
 */

function updateProfileServiceCallback(e) {
	Ti.API.info("updateProfileServiceCallback response : " + JSON.stringify(e));
	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.status == "1") {
					if (OS_IOS) {
						$.editBtn.image = "/images/edt.png";
					} else {
						$.editBtn.icon = "/images/edt.png";
					}

					$.nameTF.editable = false;
					$.phoneTF.editable = false;
					// $.emailTF.editable = false;
					$.locationTF.editable = false;
					isSave = false;
					$.emailStaticLbl.text = response.email;
					$.nameStaticLbl.text = response.name;
					$.contactStaticLbl.text = response.mobile_phone;

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