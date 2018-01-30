// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.descLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.descLbl.text = args.description;
$.tourImage.image = "http://myhotelsapp.com/hotel/uploads/places/" + args.image;
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

	$.TouristicPlaceDetail.title = args.title;
	if (lang == "ar") {
		$.TouristicPlaceDetail.leftNavButton = notificationBtn;
		$.TouristicPlaceDetail.rightNavButton = btnVW;
	} else {
		$.TouristicPlaceDetail.leftNavButton = btnVW;
		$.TouristicPlaceDetail.rightNavButton = notificationBtn;
	}
	btnVW.addEventListener('click', function(e) {
		$.TouristicPlaceDetail.close();
	});
	notificationBtn.addEventListener("click", function(e) {

		var mycart = Alloy.createController("MyCart").getView();
		Alloy.Globals.navWin.openWindow(mycart);
		mycart.oldWin = $.TouristicPlaceDetail;
		Alloy.Globals.currentWindow = mycart;

	});
}
