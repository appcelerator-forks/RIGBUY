// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

//get the language of the application
var lang = Titanium.App.Properties.getString('locale');
var interval = null;

$.nextBtn.font = {
	fontSize : 16 * Alloy.Globals.scaleFactor
};
$.skipBtn.font = {
	fontSize : 16 * Alloy.Globals.scaleFactor
};
var enArray = [{
	title : Alloy.Globals.langConvert("food_menu"),
	color : "#009688",
	desc : Alloy.Globals.langConvert("slide_one_desc"),
	image : '/images/image_1.jpg',

}, {
	title : Alloy.Globals.langConvert("slide_two_title"),
	color : "#795548",
	desc : Alloy.Globals.langConvert("slide_two_desc"),
	image : '/images/image_2.jpg',

}, {
	title : Alloy.Globals.langConvert("slide_three_title"),
	color : "#8BC34A",
	desc : Alloy.Globals.langConvert("slide_three_desc"),
	image : '/images/image_3.jpg',

}, {
	title : Alloy.Globals.langConvert("slide_four_title"),
	color : "#3F51B5",
	desc : Alloy.Globals.langConvert("slide_four_desc"),
	image : '/images/image_2.jpg',

}];

function closeHelpScreen() {
	if (interval) {
		clearInterval(interval);
		interval = null;
	}
	$.helpScreen.close();

}

function nextFunc(e) {
	$.scrollableView.moveNext();
	var ind = $.scrollableView.getCurrentPage();
	Ti.API.info(ind);
	// ind = ind +1;
	if (ind == 2) {
		$.nextBtn.title = Alloy.Globals.langConvert("start");
		$.skipBtn.visible = false;

	} else if (ind == 3) {
		if (interval) {
			clearInterval(interval);
			interval = null;
		}
		$.helpScreen.close();
	} else {
		$.scrollableView.moveNext();
		$.nextBtn.title = Alloy.Globals.langConvert("next");
		$.skipBtn.visible = true;
	}
}

function skipFunc(e) {
	$.helpScreen.close();
}

var vwContainerArray = [];
function addView(data) {
	vwContainerArray = [];
	$.scrollableView.views = vwContainerArray;
	for (var i = 0; i < data.length; i++) {
		var vw = Ti.UI.createView({
			height : Ti.UI.FILL,
			backgroundColor : data[i].color
		});
		var Imgvw = Ti.UI.createImageView({
			top : "20%",
			height : 120 * Alloy.Globals.scaleFactor,
			width : 120 * Alloy.Globals.scaleFactor,
			image : data[i].image
		});
		vw.add(Imgvw);
		var titleLbl = Ti.UI.createLabel({
			top : "45%",
			text : data[i].title,
			font : {
				fontSize : 22 * Alloy.Globals.scaleFactor,
				fontWeight : "bold"

			},
			color : "white"
		});
		vw.add(titleLbl);
		var descLbl = Ti.UI.createLabel({
			top : "54%",
			text : data[i].desc,
			font : {
				fontSize : 15 * Alloy.Globals.scaleFactor
			},
			width : "90%",
			color : "white",
			textAlign : "center"
		});
		vw.add(descLbl);
		var sepLine = Ti.UI.createView({
			height : 1,
			backgroundColor : "white",
			top : "88%"
		});
		vw.add(sepLine);
		vwContainerArray.push(vw);
	};

	$.scrollableView.views = vwContainerArray;

	openFun();
}

addView(enArray);
Ti.App.Properties.setString("isHelpScreenOpen", 1);
function openFun() {

	$.scrollableView.animate({
		opacity : 1,
		duration : 700
	});
}

$.nextBtn.title = Alloy.Globals.langConvert("next");
$.skipBtn.title = Alloy.Globals.langConvert("skip");

try {
	var ar = $.scrollableView.getViews();
	var t = 0;

	interval = setInterval(function(e) {
		t = $.scrollableView.getCurrentPage();

		if (t == 2) {
			$.nextBtn.title = Alloy.Globals.langConvert("start");
			$.skipBtn.visible = false;
		} else {
			$.nextBtn.title = Alloy.Globals.langConvert("next");
			$.skipBtn.visible = true;
		}
		if ((t + 1) >= ar.length) {
			t = 0;

			$.scrollableView.scrollToView(t);
		} else {
			$.scrollableView.moveNext();
		}
	}, 5000);
} catch(e) {
}

function openFun() {
	$.scrollableView.animate({
		opacity : 1,
		duration : 700
	});
}

function closeFunc(e) {
	if (interval) {
		clearInterval(interval);
		interval = null;
	}
}

function scrollFun(e) {
	Ti.API.info('PAGE ' + e.currentPage);
	if (e.currentPage == 3) {
		$.nextBtn.title = Alloy.Globals.langConvert("start");
		$.skipBtn.visible = false;
	} else {
		$.nextBtn.title = Alloy.Globals.langConvert("next");
		$.skipBtn.title = Alloy.Globals.langConvert("skip");
		$.skipBtn.visible = true;
	}
}
