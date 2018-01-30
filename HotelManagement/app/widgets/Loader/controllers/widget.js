if (OS_IOS) {
	Alloy.Globals.loadingLbl = $.loadingLabel;
} else {
	Alloy.Globals.loadingLbl = $.activityIndicatorAnd;
}
var lang = Ti.App.Properties.getString("locale");
if (OS_IOS) {

	Alloy.Globals.loadingLbl.text = "Please wait...";

}
if (OS_IOS) {
	$.activityIndicator.show();
}

exports.open = function() {

	$.activityIndicatorAnd.show();
};

exports.close = function() {

	$.activityIndicatorAnd.hide();

};

