// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
Alloy.Globals.loginLbl = $.rowLbl5;
var isLoading = false;
var position = 0;
var count = 0;
var totalRecords = 0;
Alloy.Globals.page = 1;
var Communicator = Alloy.Globals.Communicator;
var DOMAIN_URL = Alloy.Globals.Constants.DOMAIN_URL;
if (OS_ANDROID) {
	Alloy.Globals.logoutImg = $.logoutImg;
	Alloy.Globals.logoutRow = $.row5;
} else {
	Alloy.Globals.logoutImg = $.logoutRow;
}

if (Ti.App.Properties.getBool("isLogin")) {
	$.rowLbl5.text = "Logout";
	if (OS_IOS) {
		$.logoutRow.leftImage = "/images/logout.png";
	} else {
		$.logoutImg.image = "/images/logout.png";
	}
} else {
	$.rowLbl5.text = "Login";
	if (OS_IOS) {
		$.logoutRow.leftImage = "/images/login.png";
	} else {
		$.logoutImg.image = "/images/login.png";
	}
}
if (OS_IOS) {
	$.img.height = 140 * Alloy.Globals.scaleFactor;
	$.img.width = 140 * Alloy.Globals.scaleFactor;

	Alloy.Globals.navWin = $.navWin;

	$.rowLbl1.font = {
		fontSize : 14 * Alloy.Globals.scaleFactor
	};
	$.rowLbl2.font = {
		fontSize : 14 * Alloy.Globals.scaleFactor
	};
	$.rowLbl3.font = {
		fontSize : 14 * Alloy.Globals.scaleFactor
	};
	$.rowLbl4.font = {
		fontSize : 14 * Alloy.Globals.scaleFactor
	};
	$.rowLbl5.font = {
		fontSize : 14 * Alloy.Globals.scaleFactor
	};
} else {
	Alloy.Globals.mainVW = $.mainVW;
}

function openFunc(e) {
	$.productWin.animate({
		duration : 500,
		opacity : 1
	});
	Alloy.Globals.filterSelectionObj = null;
	Alloy.Globals.getProductListervice("", "", "");
}

function refreshFunc(e) {
	Alloy.Globals.filterSelectionObj = null;
	Alloy.Globals.getProductListervice("", "", "");
}

var productListArray = [];

if (OS_IOS) {
	var rowHeight = Titanium.Platform.displayCaps.platformHeight * 0.2428;
} else {
	var rowHeight = Alloy.Globals.Measurement.pxToDP(Titanium.Platform.displayCaps.platformHeight) * 0.2428;
}
var count = 0;
var productRow = function(detail) {
	tableData = [];
	count += detail.length;
	for (var i = 0; i < detail.length; i++) {

		var tableRow = Ti.UI.createTableViewRow({
			touchEnabled : true,
			width : "100%",
			height : rowHeight,
			detail : detail[i],
			selectedBackgroundColor : "#F8F8F9"
		});
		if (OS_IOS) {
			//tableRow.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.NONE;
		}
		// tableRow.add(Ti.UI.createView({
		// height : "100%",
		// width : "100%",
		//
		// zIndex : 1
		// }));
		//0-0
		tableRow.add(Ti.UI.createImageView({
			height : Ti.UI.FILL,
			width : Ti.UI.FILL,
			defaultImage : "/images/Detail_no_Img.png",
			image : detail[i].product_image,
			zIndex : 1
		}));

		tableRow.add(Ti.UI.createImageView({
			image : "/images/sh.png",
			height : "100%",
			width : "100%",
			zIndex : 10
		}));
		tableRow.add(Ti.UI.createImageView({
			right : 0,
			top : 0,

			zIndex : 30,
			color : "white",

		}));

		tableRow.add(Ti.UI.createLabel({
			right : 2,
			top : 8,
			zIndex : 30,
			color : "white",

			font : {
				fontSize : 10 * Alloy.Globals.scaleFactor
			}
			// backgroundColor:"green"
		}));

		if (detail[i].product_type == "Rent") {
			tableRow.getChildren()[2].image = "/images/re-back.png";
			tableRow.getChildren()[3].text = "Rent";
		} else {
			tableRow.getChildren()[2].image = "/images/by-back.png";
			tableRow.getChildren()[3].text = "Sell";
		}

		//1
		tableRow.add(Ti.UI.createLabel({
			top : 10 * Alloy.Globals.scaleFactor,
			height : 20 * Alloy.Globals.scaleFactor,
			left : 10 * Alloy.Globals.scaleFactor,
			width : "80%",
			color : 'white',
			ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
			text : detail[i].product_name,
			maxLines : 1,
			font : {
				fontSize : 15 * Alloy.Globals.scaleFactor,
				fontWeight : "bold"
			},
			zIndex : 30,
		}));
		//1
		tableRow.add(Ti.UI.createLabel({
			top : 30 * Alloy.Globals.scaleFactor,
			height : 16 * Alloy.Globals.scaleFactor,
			left : 10 * Alloy.Globals.scaleFactor,
			width : "80%",
			color : 'white',
			ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
			text : detail[i].address,
			maxLines : 1,
			font : {
				fontSize : 10 * Alloy.Globals.scaleFactor,
				fontWeight : "bold"
			},
			zIndex : 30,
		}));

		tableRow.add(Ti.UI.createLabel({
			bottom : 0,
			height : 35 * Alloy.Globals.scaleFactor,
			left : 10 * Alloy.Globals.scaleFactor,

			width : "70%",
			color : 'white',
			ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
			wordWrap : true,
			verticalAlign : Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
			text : detail[i].currency + " " + detail[i].price,
			maxLines : 2,
			font : {
				fontSize : 12 * Alloy.Globals.scaleFactor,
				fontWeight : "bold"
			},
			zIndex : 30,
		}));

		tableRow.add(Ti.UI.createButton({
			bottom : 8 * Alloy.Globals.scaleFactor,
			height : 34 * Alloy.Globals.scaleFactor,
			width : 34 * Alloy.Globals.scaleFactor,
			right : 44 * Alloy.Globals.scaleFactor,
			backgroundImage : "none",
			name : "favBtn",
			color : "white",
			image : (detail[i].fav == 0) ? "/images/unfavorites.png" : "/images/add-to-favorites.png",
			zIndex : 30,
			toggle : false,
			favId : detail[i].id
		}));

		tableRow.add(Ti.UI.createButton({
			bottom : 8 * Alloy.Globals.scaleFactor,
			height : 34 * Alloy.Globals.scaleFactor,
			width : 34 * Alloy.Globals.scaleFactor,
			right : 5 * Alloy.Globals.scaleFactor,
			backgroundImage : "none",
			color : "white",
			name : "chatBtn",
			image : "/images/chat.png",
			zIndex : 30
		}));

		tableData.push(tableRow);
	}
	$.productTable.appendRow(tableData);
};

// cross-platform event listener for lazy tableview loading
function lazyLoad(_evt) {
	$.search.blur();
	if (OS_IOS) {

		if ((position && _evt.contentOffset.y > position) && (_evt.contentOffset.y + _evt.size.height > _evt.contentSize.height)) {
			if (isLoading)
				return;
			isLoading = true;

			$.actInd.show();

			$.actInd.message = "Loading...";
			Ti.API.info(totalRecords + "    " + count);
			if (totalRecords > count) {
				Alloy.Globals.page++;
				Alloy.Globals.getProductListervice(Alloy.Globals.isFilter, Alloy.Globals.filterSelectionObj, "loading");
			} else {
				$.actInd.hide();
				$.msgLbl.visible = true;
				$.msgLbl.text = "No more to load";
				isLoading = false;
			}

		}

		position = _evt.contentOffset.y;
	} else {

		if (position && _evt.firstVisibleItem >= position && _evt.totalItemCount <= (_evt.firstVisibleItem + _evt.visibleItemCount)) {
			if (isLoading)
				return;
			isLoading = true;

			$.actInd.show();
			$.actInd.message = "Loading...";
			//Ti.API.info(totalRecords+  "    "+count)
			if (totalRecords > count) {
				Alloy.Globals.page++;
				Alloy.Globals.getProductListervice(Alloy.Globals.isFilter, Alloy.Globals.filterSelectionObj, "loading");
			} else {
				$.actInd.hide();
				$.msgLbl.visible = true;
				$.msgLbl.text = "No more to load";
				isLoading = false;
			}

		}
		position = _evt.firstVisibleItem;
	}
}

function changeFunc(e) {
	var searchTxt = e.source.value;
	var newArr = [];

	if (productListArray) {
		for (var i = 0; i < productListArray.length; i++) {

			var rest = productListArray[i].product_name;
			if (rest.toLowerCase().indexOf(searchTxt.toLowerCase()) != -1) {
				newArr.push(productListArray[i]);
			} else {

			}
		}
	}

	productRow(newArr);
}

var favBtnSource;
function tableClickFunc(e) {
	$.search.blur();
	Ti.API.info(e.source.name);
	if (e.source.name == "favBtn") {
		favBtnSource = e.source;
		if (Ti.App.Properties.getBool("isLogin")) {

			Alloy.Globals.addFavService();
		} else {
			var regScreen = Alloy.createController("Login", "fav").getView();
			regScreen.open();
		}

	} else if (e.source.name == "chatBtn") {
		if (Ti.App.Properties.getBool("isLogin")) {
			var productDetail = Alloy.createController("Chat").getView();
			if (OS_IOS) {
				Alloy.Globals.navWin.openWindow(productDetail);
			} else {
				productDetail.open();
			}
			Alloy.Globals.currentWindow = productDetail;
		} else {
			var regScreen = Alloy.createController("Login", "chat").getView();
			regScreen.open();
		}
	} else {
		var productDetail = Alloy.createController("ProductDetail", e.row.detail).getView();
		if (OS_IOS) {
			Alloy.Globals.navWin.openWindow(productDetail);
		} else {
			productDetail.open();
		}
		Alloy.Globals.currentWindow = productDetail;
	}

}

if (OS_IOS) {
	$.topview.width = Alloy.Globals.homedrawerWidth + 30;
	$.rightTable.rowHeight = 48 * Alloy.Globals.scaleFactor;
} else {
	$.row1.height = 50 * Alloy.Globals.scaleFactor;
	$.row2.height = 50 * Alloy.Globals.scaleFactor;
	$.row3.height = 50 * Alloy.Globals.scaleFactor;
	$.row4.height = 50 * Alloy.Globals.scaleFactor;
	$.row5.height = 50 * Alloy.Globals.scaleFactor;
	$.topview.height = 230 * Alloy.Globals.scaleFactor;
}

function filterFunc(e) {
	var filterScreen = Alloy.createController("Filter").getView();
	if (OS_IOS) {
		Alloy.Globals.navWin.openWindow(filterScreen);
	} else {
		filterScreen.open();
	}
	Alloy.Globals.currentWindow = filterScreen;
}

function openMenu(e) {
	$.search.blur();
	if (OS_IOS) {
		Alloy.Globals.openLeft();
	} else {
		Alloy.Globals.drawer.toggleLeftWindow();
	}

}

/*
 * Function for opening windows from left drawer
 */
function leftMenuOptionSelected(e) {

	if ($.rightTable.focusable == false) {
		return;
	}
	$.rightTable.focusable = false;

	switch(e.index) {
	case 0:

		if (Alloy.Globals.currentWindow != null) {

			Alloy.Globals.goToHome(Alloy.Globals.currentWindow);

			Alloy.Globals.currentWindow = null;
		}
		Alloy.Globals.openLeft();

		break;
	case 1:

		if (Alloy.Globals.currentWindow == null || Alloy.Globals.currentWindow.name != "setting") {
			if (Ti.Network.online) {
				if (Ti.App.Properties.getBool("isLogin")) {
					var regScreen = Alloy.createController("Setting").getView();

					Alloy.Globals.navWin.openWindow(regScreen, {
						animated : false
					});

					setTimeout(function(e) {
						Alloy.Globals.goToHome(Alloy.Globals.currentWindow);
						Alloy.Globals.currentWindow = regScreen;
					}, 200);
					Alloy.Globals.openLeft();
				} else {
					var regScreen = Alloy.createController("Login", "setting").getView();
					regScreen.open();
				}
			} else {
				Alloy.Globals.openLeft();
				Alloy.Globals.Alert("Please check your internet connection and try again");

			}
		} else {
			Alloy.Globals.openLeft();
		}
		break;
	case 2:

		if (Alloy.Globals.currentWindow == null || Alloy.Globals.currentWindow.name != "about") {

			if (Ti.Network.online) {
				var regScreen = Alloy.createController("AboutUs", "menu").getView();

				Alloy.Globals.navWin.openWindow(regScreen, {
					animated : false
				});

				setTimeout(function(e) {
					Alloy.Globals.goToHome(Alloy.Globals.currentWindow);
					Alloy.Globals.currentWindow = regScreen;
				}, 200);

			} else {
				Alloy.Globals.Alert("Please check your internet connection and try again");

			}
		}
		Alloy.Globals.openLeft();
		break;
	case 3:
		if (Alloy.Globals.currentWindow == null || Alloy.Globals.currentWindow.name != "contact") {

			if (Ti.Network.online) {
				var regScreen = Alloy.createController("ContactUs", "menu").getView();

				Alloy.Globals.navWin.openWindow(regScreen);

				setTimeout(function(e) {
					Alloy.Globals.goToHome(Alloy.Globals.currentWindow);
					Alloy.Globals.currentWindow = regScreen;
				}, 200);

			} else {
				Alloy.Globals.Alert("Please check your internet connection and try again");

			}
		}
		Alloy.Globals.openLeft();
		break;

	case 4:
		focus = true;
		$.rightTable.focusable = true;
		if (Ti.App.Properties.getBool("isLogin")) {
			logout();
		} else {
			var regScreen = Alloy.createController("Login", "menu").getView();
			regScreen.open();
		}

		break;

	}

	setTimeout(function(e) {
		$.rightTable.focusable = true;
		focus = true;
		$.search.blur();
	}, 500);
}

/*
 * Function for opening windows from left drawer
 */
function leftMenuOptionSelectedAndroid(e) {

	if ($.rightTable.focusable == false) {
		return;
	}
	$.rightTable.focusable = false;

	switch(e.index) {
	case 0:

		if (Alloy.Globals.currentWindow != null) {
			Alloy.Globals.abx.title = "Product List";
			Alloy.Globals.refreshItem.visible = true;
			Alloy.Globals.searchItem.visible = true;

			Alloy.Globals.goToHome(Alloy.Globals.currentWindow);

			Alloy.Globals.currentWindow = null;
		}
		Alloy.Globals.drawer.toggleLeftWindow();

		break;
	case 1:

		if (Alloy.Globals.currentWindow == null || Alloy.Globals.currentWindow.name != "setting") {
			Alloy.Globals.abx.title = "Account Settings";
			Alloy.Globals.refreshItem.visible = false;
			Alloy.Globals.searchItem.visible = false;
			if (Ti.Network.online) {
				if (Ti.App.Properties.getBool("isLogin")) {
					var regScreen = Alloy.createController("Setting").getView();

					if (OS_IOS) {
						Alloy.Globals.navWin.openWindow(regScreen, {
							animated : false
						});
					} else {

						$.mainVW.add(regScreen);

					}

					setTimeout(function(e) {
						Alloy.Globals.goToHome(Alloy.Globals.currentWindow);
						Alloy.Globals.currentWindow = regScreen;
					}, 200);
					Alloy.Globals.drawer.toggleLeftWindow();
				} else {
					var regScreen = Alloy.createController("Login", "setting").getView();
					regScreen.open();
				}
			} else {
				Alloy.Globals.drawer.toggleLeftWindow();
				Alloy.Globals.Alert("Please check your internet connection and try again");

			}
		} else {
			Alloy.Globals.drawer.toggleLeftWindow();
		}
		break;
	case 2:

		if (Alloy.Globals.currentWindow == null || Alloy.Globals.currentWindow.name != "about") {
			Alloy.Globals.abx.title = "About Us";
			//	Alloy.Globals.menu.clear();

			Alloy.Globals.refreshItem.visible = false;
			Alloy.Globals.searchItem.visible = false;

			if (Ti.Network.online) {
				var regScreen = Alloy.createController("AboutUs", "menu").getView();

				if (OS_IOS) {
					Alloy.Globals.navWin.openWindow(regScreen, {
						animated : false
					});
				} else {
					$.mainVW.add(regScreen);
				}

				setTimeout(function(e) {
					Alloy.Globals.goToHome(Alloy.Globals.currentWindow);
					Alloy.Globals.currentWindow = regScreen;
				}, 200);

			} else {

				Alloy.Globals.Alert("Please check your internet connection and try again");

			}
		}
		Alloy.Globals.drawer.toggleLeftWindow();
		break;
	case 3:
		if (Alloy.Globals.currentWindow == null || Alloy.Globals.currentWindow.name != "contact") {
			Alloy.Globals.abx.title = "Contact Us";
			Alloy.Globals.refreshItem.visible = false;
			Alloy.Globals.searchItem.visible = false;
			if (Ti.Network.online) {
				var regScreen = Alloy.createController("ContactUs", "menu").getView();

				if (OS_IOS) {
					Alloy.Globals.navWin.openWindow(regScreen, {
						animated : false
					});
				} else {
					$.mainVW.add(regScreen);
				}

				setTimeout(function(e) {
					Alloy.Globals.goToHome(Alloy.Globals.currentWindow);
					Alloy.Globals.currentWindow = regScreen;
				}, 200);

			} else {
				Alloy.Globals.Alert("Please check your internet connection and try again");

			}
		}
		Alloy.Globals.drawer.toggleLeftWindow();
		break;

	case 4:
		focus = true;
		$.rightTable.focusable = true;
		if (Ti.App.Properties.getBool("isLogin")) {
			logout();
		} else {
			var regScreen = Alloy.createController("Login", "menu").getView();
			regScreen.open();
		}
		// logout();

		break;

	}

	setTimeout(function(e) {
		$.rightTable.focusable = true;
		focus = true;
	}, 500);
}

var row = $.rowLbl5;
var flag = false;
function logout(e) {
	var dialog = Ti.UI.createAlertDialog({
		cancel : 1,
		buttonNames : ['No', 'Yes'],
		message : 'Are you sure want to logout?',
		title : 'RIGBUY'
	});
	dialog.addEventListener('click', function(k) {
		if (k.index === 0) {
			Ti.API.info('The cancel button was clicked');
		} else {
			Ti.App.Properties.setBool("isLogin", false);
			Ti.App.Properties.setString("email", "");
			Ti.App.Properties.setString("userid", "");
			Ti.App.Properties.setString("password", "");

			Alloy.Globals.goToHome(Alloy.Globals.currentWindow);
			Alloy.Globals.currentWindow = null;
			Alloy.Globals.productDetailObj = null;
			Alloy.Globals.isScreen = "";
			Alloy.Globals.socialLogin = false;
			if (Alloy.Globals.google) {
				Alloy.Globals.google.signOut();
			}
			if (OS_ANDROID) {
				Alloy.Globals.drawer.toggleLeftWindow();
			} else {
				Alloy.Globals.openLeft();
			}
			if (OS_IOS) {
				$.logoutRow.leftImage = "/images/login.png";
			} else {
				$.logoutImg.image = "/images/login.png";
			}
			if (OS_ANDROID) {
				$.row5.remove($.rowLbl5);
				$.row5.add($.rowLbl5);
			}

			$.rowLbl5.text = "Login";
			Alloy.Globals.Alert("Logout Successfully");

		}

	});
	dialog.show();
}

function openFilter(e) {
	if ($.filterBtn.focusable == false) {
		return;
	}
	$.filterBtn.focusable = false;
	if (Ti.Network.online) {
		var advancedSearch = Alloy.createController("AdvancedSearch").getView();
		if (OS_IOS) {
			Alloy.Globals.navWin.openWindow(advancedSearch);
		} else {
			advancedSearch.open();
		}
		Alloy.Globals.currentWindow = advancedSearch;
	} else {
		Alloy.Globals.Alert("Please check your internet connection and try again.");
		$.filterBtn.focusable = true;
	}
	setTimeout(function(e) {
		$.filterBtn.focusable = true;
	}, 1000);
}

Alloy.Globals.getProductListervice = function(from, obj, isLoading) {

	if (Ti.Network.online) {

		if (from == "filter") {
			Alloy.Globals.isFilter = "filter";
			if (isLoading != "loading") {
				Alloy.Globals.LoadingScreen.open();
			}

			Alloy.Globals.filterSelectionObj = obj;
			Ti.API.info("DATA : " + JSON.stringify(obj));
			Communicator.post("http://rigbuy.com/webservices/index.php?action=product&actionMethod=listProduct&page=" + page, getProductListerviceCallback, obj);
			Ti.API.info('URL : ' + "http://rigbuy.com/webservices/index.php?action=product&actionMethod=listProduct&page=" + Alloy.Globals.page);
			return;
		} else {
			Alloy.Globals.isFilter = "";
			if (isLoading != "loading") {
				Alloy.Globals.page = 1;
				Alloy.Globals.LoadingScreen.open();
			}

		}

		Communicator.get("http://rigbuy.com/webservices/index.php?action=product&actionMethod=listProduct&page=" + Alloy.Globals.page, getProductListerviceCallback);
		Ti.API.info('URL ' + "http://rigbuy.com/webservices/index.php?action=product&actionMethod=listProduct&page=" + Alloy.Globals.page);
	} else {
		$.actInd.hide();
		$.msgLbl.visible = false;
		isLoading = false;

		Alloy.Globals.Alert("Please check your internet connection and try again.");

	}
};

function getProductListerviceCallback(e) {

	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.status == "1") {
					totalRecords = response.total;
					productRow(response.record);
					productListArray = response.record;

				} else {
					Alloy.Globals.Alert("No product found");
					productListArray = [];
					productRow(productListArray);

				}

			} else {
				Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_NO_DATA);

			}
		} catch(e) {
			Ti.API.info('Error getCategoryerviceCallback :: ' + e.message);

		}

	} else {
		Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_STATUS_CODE);

	}
	$.actInd.hide();
	$.msgLbl.visible = false;
	isLoading = false;
	if (Alloy.Globals.LoadingScreen) {

		Alloy.Globals.LoadingScreen.close();
	}

}

Alloy.Globals.geoCall = function() {
	if (Titanium.Network.online) {

		Titanium.Geolocation.getCurrentPosition(function(locationResult) {
			Ti.API.info("locationResult " + JSON.stringify(locationResult));
			if (locationResult.success && locationResult.coords != null) {
				Ti.API.info("CORD : " + JSON.stringify(locationResult));

				Alloy.Globals.latitude = locationResult.coords.latitude;
				Alloy.Globals.longitude = locationResult.coords.longitude;
			} else {
				Ti.API.info("Network is disabled1");
				Alloy.Globals.latitude = "";
				Alloy.Globals.longitude = "";
			}
		});
	} else {
		Alloy.Globals.Alert('Please check your internet connection');
		Alloy.Globals.latitude = "";
		Alloy.Globals.longitude = "";

	}
};
setTimeout(function(e) {
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
}, 1000);

Alloy.Globals.cropImage = function(e) {
	Ti.API.info("---------------1----------------");
	// if (e.source.isLoaded) {
	e.source.removeEventListener("load", Alloy.Globals.cropImage);
	// return;
	// }

	Ti.API.info('Load image URL: ' + e.source.apiName);

	e.source.isLoaded = true;
	var parentObj = e.source.parent;
	var blobObj = e.source.toBlob();

	if (parentObj.rect.height > 0 && parentObj.rect.width > 0) {
		parentObjWidth = parentObj.rect.width;
		parentObjHeight = parentObj.rect.height;
	}

	var ar = blobObj.width / blobObj.height;
	var w,
	    h;
	if (blobObj.width > blobObj.height) {
		h = parentObjHeight;
		w = h * ar;
	} else {
		w = parentObjWidth;
		h = w / ar;
	}

	if (w < parentObjWidth) {
		w = parentObjWidth;
		h = w / ar;
	}

	if (h < parentObjHeight) {
		h = parentObjHeight;
		w = h * ar;
	}
	e.source.width = w;
	e.source.height = h;
	e.source.opacity = 1;
	Ti.API.info('blobObj Width : ' + blobObj.width + "\n" + "Height: " + blobObj.height);
	Ti.API.info('parentObj.rect.width : ' + parentObj.rect.width + "\n" + "parentObj.rect.height: " + parentObj.rect.height);

};

Alloy.Globals.addFavService = function() {
	var obj = {};
	obj.userId = Ti.App.Properties.getString("userid");
	obj.productId = favBtnSource.favId;
	if (Ti.Network.online) {
		Alloy.Globals.LoadingScreen.open();
		Communicator.post("http://rigbuy.com/webservices/index.php?action=product&actionMethod=addProductInWishlist", addFavServiceCallback, obj);
		Ti.API.info('URL ' + "http://rigbuy.com/webservices/index.php?action=product&actionMethod=addProductInWishlist");
	} else {

		Alloy.Globals.Alert("Please check your internet connection and try again.");

	}
};

/*
 * Callback function for login in this we are getting response from the server and navigate to HomeScreen from openHome function.
 */

function addFavServiceCallback(e) {

	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.action_success = ' + JSON.stringify(response));
				if (response.status == "1") {
					if (favBtnSource.toggle == false) {
						favBtnSource.image = "/images/add-to-favorites.png";
						favBtnSource.toggle = true;
					} else {
						favBtnSource.image = "/images/unfavorites.png";
						favBtnSource.toggle = false;
					}
				} else {
					Alloy.Globals.Alert(response.msg);
				}

			} else {
				Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_NO_DATA);

			}
		} catch(e) {
			Ti.API.info('Error getCategoryerviceCallback :: ' + e.message);

		}

	} else {
		Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_STATUS_CODE);

	}
	$.filterBtn.focusable = true;
	Alloy.Globals.LoadingScreen.close();

}

