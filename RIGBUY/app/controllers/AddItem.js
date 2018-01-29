// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
Ti.API.info('PRODUCT DETAIL : ' + JSON.stringify(args));
var Communicator = Alloy.Globals.Communicator;
var DOMAIN_URL = Alloy.Globals.Constants.DOMAIN_URL;
var categoryIndex=-1,
    countryIndex=-1,
    cityIndex=-1,
    stateIndex=-1,
    categoryCheck,
    countryCheck,
    stateCheck,
    cityCheck;
var categoryArray,
    countryArray,
    cityArray,
    stateArray = [];
var selectedImage = null;
if (args.from == "add") {
	selectedImage = null;
} else {
	selectedImage = "";
	$.nameTF.value = args.data.product_name;
	$.featureTF.value = args.data.features;
	$.descTF.value = args.data.product_description;
	$.categoryTF.value = args.data.category_name;
	$.categoryTF.category_id = args.data.category_id;

	$.priceTF.value = args.data.price;
	$.typeTF.value = args.data.product_type;
	if (args.data.product_type == "Rent") {
		$.typeTF.product_id = 2;
	} else {
		$.typeTF.product_id = 1;
	}

	$.addressTF.value = args.data.address;
	$.currencyTF.value = args.data.currency;
	$.countryTF.country_id = args.data.country_id;
	$.countryTF.value = args.data.country_name;
	$.stateTF.value = args.data.state_name;
	$.stateTF.state_id = args.data.state_id;
	$.cityTF.value = args.data.city_name;
	$.cityTF.city_id = args.data.city_id;
	$.statusTF.value = args.data.status;
	if (args.data.status == "Activated") {
		$.statusTF.status_id = "1";
	} else { 
		$.statusTF.status_id = "0";
	}
	if (OS_IOS)
		$.descHintTextLbl.visible = false;
}

$.nameVW.height = 60 * Alloy.Globals.scaleFactor;
$.featuresVW.height = 60 * Alloy.Globals.scaleFactor;
$.priceVW.height = 60 * Alloy.Globals.scaleFactor;
$.categoryVW.height = 60 * Alloy.Globals.scaleFactor;
$.productTypeVW.height = 60 * Alloy.Globals.scaleFactor;
$.descVW.height = 100 * Alloy.Globals.scaleFactor;
$.imgVW.height = 60 * Alloy.Globals.scaleFactor;
$.btnVW.height = 40 * Alloy.Globals.scaleFactor;

$.currencyVW.height = 60 * Alloy.Globals.scaleFactor;
$.countryVW.height = 60 * Alloy.Globals.scaleFactor;
$.stateVW.height = 60 * Alloy.Globals.scaleFactor;
$.cityVW.height = 60 * Alloy.Globals.scaleFactor;
$.statusVW.height = 60 * Alloy.Globals.scaleFactor;
$.addressVW.height = 60 * Alloy.Globals.scaleFactor;

function openFunc(e) {
	categoryCheck = 0;
	countryCheck = 0;
	stateCheck = 0;
	cityCheck = 0;
	getCategoryService();
	getCountryService();
}

function doMenuClick(e) {
	$.AddItem.close();
}

function winClick(e) {
	if (e.source.name != "tf") {
		$.nameTF.blur();
		$.featureTF.blur();
		$.descTF.blur();
		$.categoryTF.blur();
		$.priceTF.blur();
		$.typeTF.blur();
		$.addressTF.blur();

	}
}

$.fullnameLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.nameTF.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
$.featureLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.featureTF.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};

$.descLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.descTF.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
if (OS_IOS) {
	$.descHintTextLbl.font = {
		fontSize : 14 * Alloy.Globals.scaleFactor
	};
}

$.priceLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.priceTF.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
$.categoryLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.categoryTF.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
$.typeLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.typeTF.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
$.currencyLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};

$.currencyTF.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
$.countryLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};

$.countryTF.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
$.stateLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};

$.stateTF.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
$.cityLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};

$.cityTF.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
$.addItemSubmitBtn.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.cancelBtn.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};

$.imageButton.font = {
	fontSize : 10 * Alloy.Globals.scaleFactor
};
$.imagenameLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.imageLbl.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor
};

$.statusLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.statusTF.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};

$.addressLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.addressTF.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};

function nameReturnFunc(e) {
	if (OS_IOS)
		$.featureTF.focus();
}

function featureReturnFunc(e) {
	if (OS_IOS)
		$.priceTF.focus();
}

function priceReturnFunc(e) {
	$.priceTF.blur();
}

function addressReturnFunc(e) {
	if (OS_IOS)
		$.descTF.focus();
}

var currencyArray = ["USD", "INR"];
var currencyIndex = -1;
function currencyClickFunc() {
	$.featureTF.blur();
	$.descTF.blur();
	$.nameTF.blur();
	$.priceTF.blur();
	$.addressTF.blur();
	Alloy.createWidget('danielhanold.pickerWidget', {
		id : 'currency',
		outerView : $.AddItem,
		hideNavBar : false,
		type : 'single-column',
		selectedValues : currencyIndex,
		pickerValues : currencyArray,
		onDone : function(e) {

			Ti.API.info("yes " + JSON.stringify(e.data));

			if (!e.cancel) {
				$.currencyTF.value = e.data.title;
				currencyIndex = e.data.index;

			}
		},
	});
}

function categoryClickFunc(e) {
	if ($.categoryVW.focusable == false) {
		return;
	}
	$.categoryVW.focusable = false;
	$.featureTF.blur();
	$.descTF.blur();
	$.nameTF.blur();
	$.priceTF.blur();
	$.addressTF.blur();
	if (categoryArray.length > 0 && categoryArray != undefined && categoryArray != null) {
		categoryCheck = 0;

		Alloy.createWidget('danielhanold.pickerWidget', {
			id : 'category',
			outerView : $.AddItem,
			hideNavBar : false,
			type : 'single-column',
			selectedValues : categoryIndex,
			pickerValues : categoryArray,
			onDone : function(e) {

				Ti.API.info("yes " + JSON.stringify(e.data));

				if (!e.cancel) {
					$.categoryTF.value = e.data.title;
					categoryIndex = e.data.index;
					$.categoryTF.category_id = e.data.category_id;

				}
			},
		});
	} else {
		if (Ti.Network.online) {
			categoryCheck = 1;
			getCategoryService();
		} else {
			Alloy.Globals.Alert("Please check your internet connection and try again.");
		}
	}
	setTimeout(function() {
		$.categoryVW.focusable = true;
	}, 1000);
}

var productArray = ["Sell", "Rent"];
var productIndex = -1;
function productTypeClickFunc(e) {
	$.featureTF.blur();
	$.descTF.blur();
	$.nameTF.blur();
	$.priceTF.blur();
	$.addressTF.blur();
	Alloy.createWidget('danielhanold.pickerWidget', {
		id : 'currency',
		outerView : $.AddItem,
		hideNavBar : false,
		type : 'single-column',
		selectedValues : productIndex,
		pickerValues : productArray,
		onDone : function(e) {

			Ti.API.info("yes " + JSON.stringify(e.data));

			if (!e.cancel) {
				$.typeTF.value = e.data.title;
				if ($.typeTF.value == "Rent") {
					$.typeTF.product_id = 2;
				} else {
					$.typeTF.product_id = 1;
				}
				productIndex = e.data.index;

			}
		},
	});
}

var statusArray = ["Activated", "DeActivated"],
    statusIndex = -1;

function selectstatusFunc(e) {
	$.featureTF.blur();
	$.descTF.blur();
	$.nameTF.blur();
	$.priceTF.blur();
	$.addressTF.blur();
	Alloy.createWidget('danielhanold.pickerWidget', {
		id : 'currency',
		outerView : $.AddItem,
		hideNavBar : false,
		type : 'single-column',
		selectedValues : statusIndex,
		pickerValues : statusArray,
		onDone : function(e) {

			Ti.API.info("yes " + JSON.stringify(e.data));

			if (!e.cancel) {
				$.statusTF.value = e.data.title;
				if ($.statusTF.value == "Activated") {
					$.statusTF.status_id = "1";
				} else {
					$.statusTF.status_id = "0";
				}

				statusIndex = e.data.index;

			}
		},
	});
}

function selectCountryFunc(e) {
	if ($.countryVW.focusable == false) {
		return;
	}
	$.countryVW.focusable = false;
	$.featureTF.blur();
	$.descTF.blur();
	$.nameTF.blur();
	$.priceTF.blur();
	$.addressTF.blur();
	if (countryArray.length > 0 && countryArray != undefined && countryArray != null) {
		countryCheck = 0;

		Alloy.createWidget('danielhanold.pickerWidget', {
			id : 'country',
			outerView : $.AddItem,
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

function selectStateFunc(e) {
	if ($.stateVW.focusable == false) {
		return;
	}
	$.stateVW.focusable = false;
	$.featureTF.blur();
	$.descTF.blur();
	$.nameTF.blur();
	$.priceTF.blur();
	$.addressTF.blur();
	if ($.countryTF.value != "" || $.countryTF.value.trim().length > 0) {
		if (stateArray.length > 0 && stateArray != undefined && stateArray != null) {
			stateCheck = 0;

			Alloy.createWidget('danielhanold.pickerWidget', {
				id : 'state',
				outerView : $.AddItem,
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

function selectCityFunc(e) {
	if ($.cityVW.focusable == false) {
		return;
	}
	$.cityVW.focusable = false;
	$.featureTF.blur();
	$.descTF.blur();
	$.nameTF.blur();
	$.priceTF.blur();
	$.addressTF.blur();
	if ($.countryTF.value != "" || $.countryTF.value.trim().length > 0) {
		if ($.stateTF.value != "" || $.stateTF.value.trim().length > 0) {
			Ti.API.info('cityArray ' + cityArray);
			if (cityArray != undefined && cityArray != null && cityArray.length > 0) {
				cityCheck = 0;

				Alloy.createWidget('danielhanold.pickerWidget', {
					id : 'city',
					outerView : $.AddItem,
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

function typeReturnFunc(e) {
	if (OS_IOS)
		$.descTF.focus();
}

function descDoneFunc(e) {
	$.descTF.blur();
}

function submitFunc(e) {
	if ($.addItemSubmitBtn.focusable == false) {
		return;
	}
	$.addItemSubmitBtn.focusable == false;
	if ($.nameTF.value != null && $.nameTF.value.trim().length > 0) {
		if ($.featureTF.value != null && $.featureTF.value.trim().length > 0) {
			if ($.priceTF.value != null && $.priceTF.value.trim().length > 0) {
				if ($.priceTF.value > 0) {
					if ($.currencyTF.value != null && $.currencyTF.value.trim().length > 0) {
						if ($.categoryTF.value != null && $.categoryTF.value.trim().length > 0) {
							if ($.typeTF.value != null && $.typeTF.value.trim().length > 0) {
								if ($.statusTF.value != null && $.statusTF.value.trim().length > 0) {
									if ($.countryTF.value != null && $.countryTF.value.trim().length > 0) {
										if ($.stateTF.value != null && $.stateTF.value.trim().length > 0) {
											if ($.cityTF.value != null && $.cityTF.value.trim().length > 0) {
												if ($.addressTF.value != null && $.addressTF.value.trim().length > 0) {
													if ($.descTF.value != null && $.descTF.value.trim().length > 0) {
														if (selectedImage != null) {
															addProductService();

														} else {
															Alloy.Globals.Alert("Please select product image");
														}

													} else {
														Alloy.Globals.Alert("Please enter product description");
													}
												} else {
													Alloy.Globals.Alert("Please enter address of property");
												}
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
									Alloy.Globals.Alert("Please select product status");
								}
							} else {
								Alloy.Globals.Alert("Please select product type");
							}

						} else {
							Alloy.Globals.Alert("Please select product category");
						}
					} else {
						Alloy.Globals.Alert("Please select currency type");
					}
				} else {
					Alloy.Globals.Alert("Please enter valid product price");
				}
			} else {
				Alloy.Globals.Alert("Please enter product price");

			}
		} else {
			Alloy.Globals.Alert("Please enter product features");
		}
	} else {
		Alloy.Globals.Alert("Please enter your product name");
	}
	setTimeout(function(e) {
		$.addItemSubmitBtn.focusable == true;
	}, 1000);
}

function changeFunc(e) {
	Ti.API.info(1 + " " + e.source.value.length);
	if (e.source.value == "") {
		$.descHintTextLbl.visible = true;
	}
	if (e.source.value.length > 0 && e.source.value != "") {
		$.descHintTextLbl.visible = false;
	} else {
		$.descHintTextLbl.visible = true;
	}
}

function cancelFunc(e) {
	var dialog = Ti.UI.createAlertDialog({
		cancel : 1,
		buttonNames : ['No', 'Yes'],
		message : 'Are you sure want to reset all fields?',
		title : "RIGBUY",
	});
	dialog.addEventListener('click', function(k) {
		if (k.index === 0) {
			Ti.API.info('The cancel button was clicked');
		} else {
			$.nameTF.value = "";
			$.featureTF.value = "";
			$.priceTF.value = "";
			$.categoryTF.value = "";
			$.descTF.value = "";
			$.typeTF.value = "";
		}

	});
	dialog.show();

}

function addProductService() {
	var obj = {};
	obj.userId = Ti.App.Properties.getString("userid");
	obj.categoryId = $.categoryTF.category_id;
	obj.productType = $.typeTF.product_id;
	obj.name = $.nameTF.value;
	obj.description = $.descTF.value;
	obj.price = $.priceTF.value;
	obj.currency = $.currencyTF.value;
	obj.features = $.featureTF.value;
	obj.countryId = $.countryTF.country_id;
	obj.stateId = $.stateTF.state_id;
	obj.cityId = $.cityTF.city_id;
	obj.lat = Alloy.Globals.latitude;
	obj.long = Alloy.Globals.longitude;
	obj.address = $.addressTF.value;
	obj.image = selectedImage;
	obj.status = $.statusTF.status_id;
	if (args.from == "edit") {
		obj.productId = args.data.id;
	}

	Ti.API.info("enquiry response : " + JSON.stringify(obj));

	if (Ti.Network.online) {
		Alloy.Globals.LoadingScreen.open();
		Communicator.post("http://rigbuy.com/webservices/index.php?action=product&actionMethod=addProduct", addProductServiceCallback, obj);

	} else {

		Alloy.Globals.Alert("Please check your internet connection and try again.");

	}
}

/*
 * Callback function for login in this we are getting response from the server and navigate to HomeScreen from openHome function.
 */

function addProductServiceCallback(e) {
	Ti.API.info("addProductServiceCallback response : " + JSON.stringify(e));
	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.status == "1") {
					$.AddItem.close();
					Alloy.Globals.getMyItemListervice("AddItem");
					Alloy.Globals.getProductListervice("wishList");
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

function getCategoryService() {

	if (Ti.Network.online) {

		Communicator.get("http://rigbuy.com/webservices/index.php?action=product&actionMethod=getCategory", getCategoryServiceCallback);
		Ti.API.info('URL ' + "http://rigbuy.com/webservices/index.php?action=product&actionMethod=getCategory");
	} else {

		//Alloy.Globals.Alert("Please check your internet connection and try again.");

	}
}

function getCategoryServiceCallback(e) {

	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.status == "1") {
					categoryArray = response.data;
					if (categoryCheck == 1) {
						categoryClickFunc();
					}

				} else {

					Ti.API.info("No category found");
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

					Ti.API.info("No category found");
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

					Ti.API.info("No state found");
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

					Ti.API.info("No city found for selected state.");
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

function uploadPhotoFunc(e) {

	$.nameTF.blur();
	$.addressTF.blur();
	$.descTF.blur();
	$.priceTF.blur();
	$.featureTF.blur();

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
					Ti.API.info('PATH ' + JSON.stringify(event));

					var newBlob = Alloy.Globals.ImageFactory.compress((event.media), 0.25);

					selectedImage = "" + Titanium.Utils.base64encode(newBlob);

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

						var blob = Alloy.Globals.ImageFactory.compress(image, 0.25);

						// var blob = newBlob.imageAsResized(300, 300);
						// $.userPic.image = newBlob;

					} else {

						// $.userPic.image = (event.media).imageAsResized(300, 300);
						var blob = event.media;
					}
					selectedImage = "" + Titanium.Utils.base64encode(blob);

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