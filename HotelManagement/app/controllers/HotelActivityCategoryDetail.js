// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.descLbl.font={
	fontSize:13 * Alloy.Globals.scaleFactor
};
$.descLbl.text = args.description ;
$.tourImage.image = "http://myhotelsapp.com/hotel/uploads/activity/"+args.image;
// Arguments passed into this controller can be accessed via the `$.args` object directly or:

var tableData = [];

var lang = Titanium.App.Properties.getString('locale');

if (OS_IOS) {

	var btnVW = Titanium.UI.createView({
		width : 40,
		height : 40,
		
	});

	var toggleBtn = Titanium.UI.createButton({
		backgroundImage : "none",
	});
	btnVW.add(toggleBtn);

	Ti.API.info('2222');
	if (lang == "ar") {
		toggleBtn.right = 0;
		toggleBtn.image = "/images/barrow_ar.png";
	} else {
		toggleBtn.left = 0;
		toggleBtn.image = "/images/back.png";
	}

	var notificationBtn = Titanium.UI.createButton({
		backgroundImage : "none",
		image : "/images/notification.png",
		visible : true

	});

	// $.HotelActivityCategoryDetail.title = Alloy.Globals.langConvert("hotel_activity");
	$.HotelActivityCategoryDetail.title = args.title;
	if (lang == "ar") {
		$.HotelActivityCategoryDetail.leftNavButton = notificationBtn;
		$.HotelActivityCategoryDetail.rightNavButton = btnVW;
	} else {
		$.HotelActivityCategoryDetail.leftNavButton = btnVW;
		$.HotelActivityCategoryDetail.rightNavButton = notificationBtn;
	}
	btnVW.addEventListener('click', function(e) {
		$.HotelActivityCategoryDetail.close();
	});
	notificationBtn.addEventListener("click", function(e) {

		var mycart = Alloy.createController("MyCart").getView();
		Alloy.Globals.navWin.openWindow(mycart);
		mycart.oldWin = $.HotelActivityCategoryDetail;
		Alloy.Globals.currentWindow = mycart;

	});
}
