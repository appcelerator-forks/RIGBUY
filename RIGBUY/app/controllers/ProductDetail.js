// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
// $.productImg.image = args.product_image;
var imageArray = [];
imageArray = args.images;
$.nameLbl.text = args.owner_name;
$.dateLbl.text = "Posted On " + args.created_date;
$.amtLbl.text = args.price;
$.locationLbl.text = args.address;
$.configLbl.text = args.features;
$.descLbl.text = args.product_description;
if (args.status == "1") {
	$.statusLbl.text = "Sell";
} else {
	$.statusLbl.text = "Rent";
}
function openFunc(e) {
	if (OS_ANDROID) {
		if (this.getActivity()) {
			// need to explicitly use getXYZ methods
			var actionBar = this.getActivity().getActionBar();

			if (actionBar) {
				// Now we can do stuff to the actionbar
				actionBar.setTitle('Product Details');

				actionBar.setDisplayHomeAsUp(true);
				// show an angle bracket next to the home icon,
				// indicating to users that the home icon is tappable

				// toggle the left window when the home icon is selected
				actionBar.setOnHomeIconItemSelected(function() {
					$.ProductDetail.close();
				});
			}
		}
	}
}

// $.agentLbl.font = {
// fontSize : 11 * Alloy.Globals.scaleFactor
// };
$.dateLbl.font = {
	fontSize : 11 * Alloy.Globals.scaleFactor
};
// $.contactLbl.font = {
// fontSize : 9 * Alloy.Globals.scaleFactor
// };
$.nameLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
// $.viewContactBtn.font = {
// fontSize : 9 * Alloy.Globals.scaleFactor
// };
$.propertyLbl.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
$.amtLbl.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor
};
$.amtstaticLbl.font = {
	fontSize : 11 * Alloy.Globals.scaleFactor
};
$.amtstaticLbl.height = 20 * Alloy.Globals.scaleFactor;
// $.viewContactBtn.height = 35 * Alloy.Globals.scaleFactor;
// $.amtLbl.height = 30 * Alloy.Globals.scaleFactor;
$.locationLbl.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor
};
$.locationstaticLbl.font = {
	fontSize : 11 * Alloy.Globals.scaleFactor
};

$.descStaticLbl.font = {
	fontSize : 11 * Alloy.Globals.scaleFactor
};
$.descLbl.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor
};
$.descStaticLbl.height = 20 * Alloy.Globals.scaleFactor;
$.locationstaticLbl.height = 20 * Alloy.Globals.scaleFactor;
// $.locationLbl.height = 30 * Alloy.Globals.scaleFactor;

$.configLbl.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor
};
$.configstaticLbl.font = {
	fontSize : 11 * Alloy.Globals.scaleFactor
};
$.configstaticLbl.height = 20 * Alloy.Globals.scaleFactor;
// $.configLbl.height = 30 * Alloy.Globals.scaleFactor;

$.statusLbl.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor
};
$.statusstaticLbl.font = {
	fontSize : 11 * Alloy.Globals.scaleFactor
};
$.statusstaticLbl.height = 20 * Alloy.Globals.scaleFactor;
// $.statusLbl.height = 30 * Alloy.Globals.scaleFactor;
$.nameLbl.height = 18 * Alloy.Globals.scaleFactor;

function openEnquiryScreen(e) {
	var enquiryScreen = Alloy.createController("Enquiry", args.id).getView();
	if (OS_IOS) {
		Alloy.Globals.navWin.openWindow(enquiryScreen);
	} else {
		enquiryScreen.open();
	}
	enquiryScreen.oldWin = $.ProductDetail;
	Alloy.Globals.currentWindow = enquiryScreen;
}

function openChatScreen(e) {
	Alloy.Globals.productDetailObj = $.ProductDetail;

	if (Ti.App.Properties.getBool("isLogin")) {
		var chatScreen = Alloy.createController("Chat").getView();
		if (OS_IOS) {
			Alloy.Globals.navWin.openWindow(chatScreen);
		} else {
			chatScreen.open();
		}
		chatScreen.oldWin = $.ProductDetail;
		Alloy.Globals.currentWindow = chatScreen;
	} else {
		var regScreen = Alloy.createController("Login", "chatDetail").getView();
		regScreen.open();
	}
}

function loadImages(images) {
	Imagedata = [];
	if (images.length > 0) {

		for (var i = 0; i < images.length; i++) {
			var view = Ti.UI.createView({
				height : Ti.UI.FILL,
				width : Ti.UI.FILL,
				top : 0,
				image : images[i]
			});
			var img = Ti.UI.createImageView({
				hires : true,
				height : Ti.UI.FILL,
				width : Ti.UI.FILL,
				defaultImage : "/images/Detail_no_Img.png",
				image : images[i]
			});

			// if (images[i] == null) {
			// img.image("/images/Detail_no_Img.png");
			// } else {
			// img.image(images[i]);
			// };
			// view.add(img.viewProxy);
			view.add(img);
			Imagedata.push(view);
		}
	} else {
		Ti.API.info('No IMage ');
		imageShare = "";
		var view = Ti.UI.createView({
			height : Ti.UI.FILL,
			width : Ti.UI.FILL,
			image : ""
		});
		var img = Ti.UI.createImageView({
			height : Ti.UI.FILL,
			width : Ti.UI.FILL,
			//hires : true
		});

		img.image = "/images/Detail_no_Img.png";
		view.add(img);
		Imagedata.push(view);

	}
	$.slideImage.views = Imagedata;

	if (OS_ANDROID) {

		/*
		 * Scrollable view for multiple images if there in android
		 */
		var scrollableView = $.slideImage;
		var pageController = pagingControl(scrollableView);
		pageController.setBottom(0);
		$.SlideimageVW.add(pageController);
		function pagingControl(scrollableView) {
			Ti.API.info('******* ' + images.length);
			var container = Titanium.UI.createView({
				height : '20dp',
				backgroundColor : "black",
				opacity : 0.6
			});

			var bulletContainer = Ti.UI.createView({
				height : Ti.UI.SIZE,
				width : Ti.UI.SIZE,
				layout : "horizontal"

			});
			container.add(bulletContainer);

			var pages = [];
			if (images.length > 0) {
				Ti.API.info("1 " + images.length);

				for (var i = 0; i < images.length; i++) {
					Ti.API.info("5 " + images.length);

					var page = Titanium.UI.createView({

						width : 8,
						height : 8,
						borderRadius : 4,
						borderWidth : 1,
						left : 8,
						backgroundColor : "white"
					});
					pages.push(page);
					// Add it to the container
					bulletContainer.add(page);
				}
			} else {
				Ti.API.info("2");
				var page = Titanium.UI.createView({
					width : 8,
					height : 8,
					borderRadius : 4,
					borderWidth : 1,
					left : 0,
					backgroundColor : "#fff",
				});
				pages.push(page);
				// Add it to the container
				bulletContainer.add(page);

			}

			// Mark the initial selected page
			if (pages.length > 0) {
				pages[scrollableView.getCurrentPage()].setBackgroundColor("#f54224");
			}

			if (pages.length == 1) {
				//imageLeftArrow.image = '/leftGrayArrow.png';
				//imageRightArrow.image = '/rightGrayArrow.png';
				// viewLeftArrow.selected = false;
				// viewRightArrow.selected = false;
			} else {
				// imageLeftArrow.image = '/leftGrayArrow.png';
				// imageRightArrow.image = '/rightBlueArrow.png';
				// viewLeftArrow.selected = false;
				// viewRightArrow.selected = true;
			}
			// viewLeftArrow.addEventListener('click', function(e) {
			// if (this.selected) {
			// scrollableView.currentPage -= 1;
			// }
			// });
			// viewRightArrow.addEventListener('click', function(e) {
			// if (this.selected) {
			// scrollableView.currentPage += 1;
			// }
			// });
			// Callbacks
			onScroll = function(event) {

			};

			onScrollEnd = function(event) {
				Ti.API.info("GET :" + event);
				if (event) {
					imageShare = event.view.image;
					Ti.API.info("PAGE : " + JSON.stringify(event.currentPage));
					if (event.currentPage || event.currentPage == 0) {
						// Go through each and reset it's color
						if (images.length>0) {

							pages[Alloy.Globals.count].setBackgroundColor("#ffffff");

						} else {
							pages[0].setBackgroundColor("#ffffff");
						}

						// Bump the Color of the new current page
						if (pages.length > 0) {
							pages[event.currentPage].setBackgroundColor("#f54224");
						}
						Alloy.Globals.count = event.currentPage;
					}
				} else {
					Ti.API.info("NOT GET :" + JSON.stringify(event));
				}
			};
			// Attach the scroll event to this scrollableView, so we know when to update things
			scrollableView.addEventListener("scroll", onScroll);
			scrollableView.addEventListener("scrollend", onScrollEnd);
			return container;
		};

	}
}

function scrollFun(e) {

	Alloy.Globals.count = e.source.currentPage;
	//Ti.API.info("Scroll : " + JSON.stringify(e));
	imageShare = e.view.image;
	//Ti.API.info("imageShare : " + imageShare);

}

loadImages(imageArray);
