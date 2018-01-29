// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var Communicator = Alloy.Globals.Communicator;
var DOMAIN_URL = Alloy.Globals.Constants.DOMAIN_URL;
Ti.API.info('DATA : 1' + JSON.stringify(Alloy.Globals.filterSelectionObj));
$.categoryTF.category_id = "";
$.subcategoryTF.category_id = "";
$.stateTF.state_id = "";
$.countryTF.country_id = "";
$.cityTF.city_id = "";
$.categoryTF.value = "";
$.subcategoryTF.value = "";
$.stateTF.value = "";
$.countryTF.value = "";
$.cityTF.value = "";
if (Alloy.Globals.filterSelectionObj != null && Alloy.Globals.filterSelectionObj != undefined) {
	$.categoryTF.category_id = Alloy.Globals.filterSelectionObj.categoryId;
	$.stateTF.state_id = Alloy.Globals.filterSelectionObj.stateId;
	$.countryTF.country_id = Alloy.Globals.filterSelectionObj.countryId;
	$.cityTF.city_id = Alloy.Globals.filterSelectionObj.cityId;
	$.categoryTF.value = Alloy.Globals.filterSelectionObj.category;
	$.stateTF.value = Alloy.Globals.filterSelectionObj.state;
	$.countryTF.value = Alloy.Globals.filterSelectionObj.country;
	$.cityTF.value = Alloy.Globals.filterSelectionObj.city;
	Ti.API.info('DATA 2: ' + JSON.stringify(Alloy.Globals.filterSelectionObj));

}

function winClickFunc(e) {
	if (e.source.name != "tf") {
		$.priceTF.blur();
	}
}

function openFunc(e) {

	if (OS_ANDROID) {
		if (this.getActivity()) {
			// need to explicitly use getXYZ methods
			var actionBar = this.getActivity().getActionBar();

			if (actionBar) {
				// Now we can do stuff to the actionbar
				actionBar.setDisplayHomeAsUp(true);
				// toggle the left window when the home icon is selected
				actionBar.setOnHomeIconItemSelected(function() {
					$.AdvancedSearch.close();
				});
			}
		}
	}
	getCategoryService();
	getCountryService();

}

$.countryLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.countryTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};

$.stateLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.stateTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};
$.categoryLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.categoryTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};
$.subcategoryLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.subcategoryTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};
$.cityLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.cityTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};
$.priceLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.priceTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};
$.searchSubmitBtn.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
// $.cancelBtn.font = {
// fontSize : 13 * Alloy.Globals.scaleFactor
// };

function nameReturnFunc(e) {
	if (OS_IOS)
		$.countryTF.focus();
}

function featureReturnFunc(e) {
	if (OS_IOS)
		$.stateTF.focus();
}

function priceReturnFunc(e) {
	if (OS_IOS)
		$.cityTF.focus();
}

function categoryReturnFunc(e) {
	if (OS_IOS)
		$.priceTF.focus();
}

function typeReturnFunc(e) {
	if (OS_IOS)
		$.descTF.focus();
}

function submitFunc(e) {
	if ($.searchSubmitBtn.focusable == false) {
		return;
	}
	$.searchSubmitBtn.focusable == false;
	$.AdvancedSearch.close();
	var obj = {};
	obj.category = $.categoryTF.value;
	obj.categoryId = $.categoryTF.category_id;
	obj.subcategory = $.subcategoryTF.value;
	obj.subcategoryId = $.subcategoryTF.category_id;
	obj.productType = "";
	obj.price = $.priceTF.value;
	obj.countryId = $.countryTF.country_id;
	obj.stateId = $.stateTF.state_id;
	obj.cityId = $.cityTF.city_id;
	obj.country = $.countryTF.value;
	obj.state = $.stateTF.value;
	obj.city = $.cityTF.value;
	
	Alloy.Globals.getProductListervice("filter", obj);

	setTimeout(function(e) {
		$.searchSubmitBtn.focusable == true;
	}, 1000);
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
			$.countryTF.value = "";
			$.stateTF.value = "";
			$.categoryTF.value = "";
			$.descTF.value = "";
			$.typeTF.value = "";
		}

	});
	dialog.show();

}

var categoryIndex = -1,
    subcategoryIndex = -1,
    countryIndex = -1,
    cityIndex = -1,
    stateIndex = -1,
    categoryCheck,
    subcategoryCheck,
    countryCheck,
    stateCheck,
    cityCheck;
var categoryArray,
    subcategoryArray,
    countryArray,
    cityArray,
    stateArray = [];

function categoryClickFunc(e) {
	if ($.categoryVW.focusable == false) {
		return;
	}
	$.categoryVW.focusable = false;

	$.priceTF.blur();

	if (categoryArray != undefined && categoryArray != null && categoryArray.length > 0) {
		categoryCheck = 0;

		Alloy.createWidget('danielhanold.pickerWidget', {
			id : 'category',
			outerView : $.AdvancedSearch,
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
					getsubCategoryService(e.data.category_id);

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

function subcategoryClickFunc(e) {
	if ($.subcategoryVW.focusable == false) {
		return;
	}
	$.subcategoryVW.focusable = false;

	$.priceTF.blur();
	if ($.categoryTF.value != "" || $.categoryTF.value.trim().length > 0) {
		if (subcategoryArray != undefined && subcategoryArray != null && subcategoryArray.length > 0) {
			subcategoryCheck = 0;

			Alloy.createWidget('danielhanold.pickerWidget', {
				id : 'category',
				outerView : $.AdvancedSearch,
				hideNavBar : false,
				type : 'single-column',
				selectedValues : subcategoryIndex,
				pickerValues : subcategoryArray,
				onDone : function(e) {

					Ti.API.info("yes " + JSON.stringify(e.data));

					if (!e.cancel) {
						$.subcategoryTF.value = e.data.title;
						subcategoryIndex = e.data.index;
						$.subcategoryTF.category_id = e.data.category_id;

					}
				},
			});
		} else {
			if (Ti.Network.online) {
				subcategoryCheck = 1;
				getsubCategoryService($.categoryTF.category_id);
			} else {
				Alloy.Globals.Alert("Please check your internet connection and try again.");
			}
		}
	} else {
		Alloy.Globals.Alert("Please select category first");
	}
	setTimeout(function() {
		$.subcategoryVW.focusable = true;
	}, 1000);
}

function selectCountryFunc(e) {
	if ($.countryVW.focusable == false) {
		return;
	}
	$.countryVW.focusable = false;
	$.priceTF.blur();
	if (countryArray.length > 0 && countryArray != undefined && countryArray != null) {
		countryCheck = 0;

		Alloy.createWidget('danielhanold.pickerWidget', {
			id : 'country',
			outerView : $.AdvancedSearch,
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
	$.priceTF.blur();
	if ($.countryTF.value != "" || $.countryTF.value.trim().length > 0) {
		if (stateArray.length > 0 && stateArray != undefined && stateArray != null) {
			stateCheck = 0;

			Alloy.createWidget('danielhanold.pickerWidget', {
				id : 'state',
				outerView : $.AdvancedSearch,
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
	$.priceTF.blur();
	if ($.countryTF.value != "" || $.countryTF.value.trim().length > 0) {
		if ($.stateTF.value != "" || $.stateTF.value.trim().length > 0) {
			Ti.API.info('cityArray ' + cityArray);
			if (cityArray != undefined && cityArray != null && cityArray.length > 0) {
				cityCheck = 0;

				Alloy.createWidget('danielhanold.pickerWidget', {
					id : 'city',
					outerView : $.AdvancedSearch,
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

function getsubCategoryService(id) {

	if (Ti.Network.online) {

		Communicator.get("http://rigbuy.com/webservices/index.php?action=product&actionMethod=getcategoryById&categoryId=" + id, getsubCategoryServiceCallback);

	} else {

		//Alloy.Globals.Alert("Please check your internet connection and try again.");

	}
}

function getsubCategoryServiceCallback(e) {

	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.status == "1") {
					subcategoryArray = response.data;
					if (subcategoryCheck == 1) {
						subcategoryClickFunc();
					}

				} else {

					Ti.API.info("No sub category found");
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
					Alloy.Globals.Alert("No city found");
					$.stateTF.value = "";
					$.stateTF.state_id = "";

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