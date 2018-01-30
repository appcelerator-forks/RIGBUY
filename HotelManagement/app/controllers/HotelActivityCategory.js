// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
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

	if(args.length>0){
		$.HotelActivityCategory.title = args[0].type;
	}else{
		$.HotelActivityCategory.title = Alloy.Globals.langConvert("hotel_activity");
	}
	if (lang == "ar") {
		$.HotelActivityCategory.leftNavButton = notificationBtn;
		$.HotelActivityCategory.rightNavButton = btnVW;
	} else {
		$.HotelActivityCategory.leftNavButton = btnVW;
		$.HotelActivityCategory.rightNavButton = notificationBtn;
	}
	btnVW.addEventListener('click', function(e) {
		$.HotelActivityCategory.close();
	});
	notificationBtn.addEventListener("click", function(e) {

		var mycart = Alloy.createController("MyCart").getView();
		Alloy.Globals.navWin.openWindow(mycart);
		mycart.oldWin = $.HotelActivityCategory;
		Alloy.Globals.currentWindow = mycart;

	});
}

$.fg.init({
	columns : 2,
	space : 0,
	gridBackgroundColor : '#fff',
	itemHeightDelta : 0,
	itemBackgroundColor : '#eee',
	itemBorderColor : 'transparent',
	itemBorderWidth : 0,
	itemBorderRadius : 0
});

var items = [];
var menu_data = [];

function renderHomeGrid(sample_data) {
	items = [];
	for (var x = 0; x < sample_data.length; x++) {
		Ti.API.info('--------');
		//CREATES A VIEW WITH OUR CUSTOM LAYOUT
		var view = Ti.UI.createView({

		});

		if (lang == "ar") {
			if (x == 4) {
				view.backgroundColor = "white";

			} else {
				var img = Ti.UI.createImageView({
					image : "http://myhotelsapp.com/hotel/uploads/activity/"+sample_data[x].image,
					width : Ti.UI.FILL,
					height : Ti.UI.FILL
				});
				view.add(img);
				var titleVW = Ti.UI.createView({
					backgroundColor : "#dc0474",
					height : 40 * Alloy.Globals.scaleFactor,
					bottom : 0
				});
				view.add(titleVW);
				var title = Ti.UI.createLabel({
					textAlign : "center",
					font : {
						fontSize : 13 * Alloy.Globals.scaleFactor,
					},
					text : sample_data[x].title,
					color : "white"
				});
				titleVW.add(title);
			}
		} else {
			var img = Ti.UI.createImageView({
				image : "http://myhotelsapp.com/hotel/uploads/activity/"+sample_data[x].image,
				width : Ti.UI.FILL,
				height : Ti.UI.FILL
			});
			view.add(img);
			var titleVW = Ti.UI.createView({
				backgroundColor : "#dc0474",
				height : 40 * Alloy.Globals.scaleFactor,
				bottom : 0
			});
			view.add(titleVW);
			var title = Ti.UI.createLabel({
				textAlign : "center",
				font : {
					fontSize : 13 * Alloy.Globals.scaleFactor,
				},
				text : sample_data[x].title,
				color : "white"
			});
			titleVW.add(title);
		}

		//THIS IS THE DATA THAT WE WANT AVAILABLE FOR THIS ITEM WHEN onItemClick OCCURS
		var values = {
			title : sample_data[x].title,
			//image : sample_data[x].image
		};

		//NOW WE PUSH TO THE ARRAY THE VIEW AND THE DATA
		items.push({
			view : view,
			data : sample_data[x]
		});
	};
	$.fg.addGridItems(items);
	$.fg.setOnItemClick(function(e) {
		Ti.API.info('e' + JSON.stringify(e.source.data));

		var mycart = Alloy.createController("HotelActivityCategoryDetail", e.source.data).getView();
		Alloy.Globals.navWin.openWindow(mycart);
		mycart.oldWin = $.HotelActivityCategory;
		Alloy.Globals.currentWindow = mycart;

	});
}

renderHomeGrid(args); 