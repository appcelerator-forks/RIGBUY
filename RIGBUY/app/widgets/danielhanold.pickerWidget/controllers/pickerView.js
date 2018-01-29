var args = arguments[0] || {};
var pickerParams = args.pickerParams || {};

// Specify custom parameters for Android date pickers,
// as date picker values on Android can't be edit
// after they picker is created.

if (args.type === 'date-picker') {
	// Set picker type to "Date Picker".
	$.picker.type = Ti.UI.PICKER_TYPE_DATE;

	// Hide the visual selection indicator.
	// On iOS 7 and later, the picker indicator is always shown and you cannot control it.
	// On iOS 6 and prior, hide the blue bar that is displayed to indicate the current selection.
	$.picker.selectionIndicator = false;

	// Set additional options for Android.
	if (OS_ANDROID) {
		$.picker.useSpinner = false;
		$.picker.visibleItems = undefined;
	}

	// Set the minimum and maximum date.
	if (_.isDate(pickerParams.minDate)) {
		$.picker.minDate = pickerParams.minDate;
	}
	if (_.isDate(pickerParams.maxDate)) {
		$.picker.maxDate = pickerParams.maxDate;
	}

	// Set the default value.
	if (_.isDate(pickerParams.value)) {
		$.picker.value = pickerParams.value;
	}
} else if (args.type === 'time-picker') {
	// Set picker type to "Date Picker".
	$.picker.type = Ti.UI.PICKER_TYPE_TIME;

	// Hide the visual selection indicator.
	// On iOS 7 and later, the picker indicator is always shown and you cannot control it.
	// On iOS 6 and prior, hide the blue bar that is displayed to indicate the current selection.
	$.picker.selectionIndicator = false;

	// Set additional options for Android.
	if (OS_ANDROID) {
		$.picker.useSpinner = false;
		$.picker.visibleItems = undefined;
	}

	// Set the minimum and maximum date.
	if (_.isDate(pickerParams.minDate)) {
		$.picker.minDate = pickerParams.minDate;
	}
	if (_.isDate(pickerParams.maxDate)) {
		$.picker.maxDate = pickerParams.maxDate;
	}

	// Set the default value.
	if (_.isDate(pickerParams.value)) {
		$.picker.value = pickerParams.value;
	}
}
function onCancel() {
	$.buttonDone.focusable = false;
	if ($.buttonCancel.focusable == false) {
		return;
	}
	$.buttonCancel.focusable = false;
	args.parentFunctions.close({
		cancel : true
	});
	setTimeout(function(e) {
		$.buttonDone.focusable = true;
		$.buttonCancel.focusable = true;

	}, 1000);
}

function onDone() {
	$.buttonCancel.focusable = false;
	if ($.buttonDone.focusable == false) {
		return;
	}
	$.buttonDone.focusable = false;
	args.parentFunctions.done();
	setTimeout(function(e) {
		$.buttonDone.focusable = true;
		$.buttonCancel.focusable = true;

	}, 1000);
}