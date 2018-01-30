/*--------------------------------------------------------
 * Initialization.
 *-------------------------------------------------------*/
var args = arguments[0] || {};
var outerView = args.outerView;

// Placeholder for picker data.
var pickerData = [];

// Placeholder for keeping track of key/value pairs.
var pickerValueArray = [];

// For single-picker columns on Android, use an option dialog.
var androidSpecificTypes = ['single-column'];
var androidSpecific = (OS_ANDROID && _.contains(androidSpecificTypes, args.type));

// Placeholder elements.
var pickerView;
var picker;
var optionsDialog;

/*--------------------------------------------------------
* Initialization.
*-------------------------------------------------------*/

// On iOS, hide the nav bar if requested.
if (OS_IOS && args.hideNavBar === true) {
	outerView.hideNavBar();
}

// If specific UI elements are used on Android, don't create picker views.
if (androidSpecific) {
	switch (args.type) {
	case 'single-column':
		// Use option dialog for single-column pickers on Android.
		populateOptionsDialog();
		break;
	}
} else {
	var overlay = Widget.createController('overlay').getView();
	// Create the controller for the picker view.
	// Pass callback functions to controller.
	var pickerController = Widget.createController('pickerView', {
		type : args.type,
		pickerParams : args.pickerParams,
		parentFunctions : {
			close : close,
			done : done
		}
	});
	pickerView = pickerController.getView('pickerView');
	picker = pickerController.getView('picker');

	outerView.add(overlay);
	outerView.add(pickerView);
	pickerView.animate({
		opacity : 1,
		duration : 500
	});
	// Populate picker.
	populatePicker();
}

/*--------------------------------------------------------
* Function.
*-------------------------------------------------------*/

/**
 * Generate and populate the optionsDialog.
 */
function populateOptionsDialog() {
	try {
		//var selectedIndex = undefined;
		var lang = Titanium.App.Properties.getString('locale');
		// Convert the object into array pairs.
		pickerValueArray = args.pickerValues;
		Ti.API.info("PAIR : " + JSON.stringify(pickerValueArray));
		// Iterate over all pairs and add the original
		// value (pair[1]) as a picker row.
		// _.each(pickerValueArray, function(pair, index) {
		// Ti.API.info("pair[1] : " + pair[1]);
		// pickerData.push(pair[1]);
		// });
		if (args.id == "country") {
			for (var i = 0; i < pickerValueArray.length; i++) {

				var pickerRow = Ti.UI.createPickerRow({
					title : pickerValueArray[i].country_name,
					country_id : pickerValueArray[i].country_id,
					index : i,

				});
				pickerData.push(pickerRow);
			};
		} else if (args.id == "state") {
			Ti.API.info('my picker array ' + JSON.stringify(pickerValueArray));
			for (var i = 0; i < pickerValueArray.length; i++) {

				var pickerRow = Ti.UI.createPickerRow({
					title : pickerValueArray[i].state_name,
					state_id : pickerValueArray[i].state_id,
					index : i,

				});
				pickerData.push(pickerRow);
			};
		} else if (args.id == "city") {
			for (var i = 0; i < pickerValueArray.length; i++) {
				var pickerRow = Ti.UI.createPickerRow({
					title : pickerValueArray[i].city_name,
					city_id : pickerValueArray[i].city_id,
					index : i
				});
				pickerData.push(pickerRow);
			};
		} else if (args.id == "category") {
			for (var i = 0; i < pickerValueArray.length; i++) {
				var pickerRow = Ti.UI.createPickerRow({
					title : pickerValueArray[i].category_name,
					category_id : pickerValueArray[i].id,
					index : i
				});
				pickerData.push(pickerRow);
			};
		} else if (args.id == "currency") {
			for (var i = 0; i < pickerValueArray.length; i++) {
				var pickerRow = Ti.UI.createPickerRow({
					title : pickerValueArray[i],

					index : i
				});
				pickerData.push(pickerRow);
			};
		} else if (args.id == "subcategory") {
			for (var i = 0; i < pickerValueArray.length; i++) {
				var pickerRow = Ti.UI.createPickerRow({
					title : pickerValueArray[i].subcategory_name,
					category_id : pickerValueArray[i].id,
					index : i
				});
				pickerData.push(pickerRow);
			};
		} else if (args.id == "SelectCompanyList") {
			for (var i = 0; i < pickerValueArray.length; i++) {
				var pickerRow = Ti.UI.createPickerRow({
					title : pickerValueArray[i].company_name,
					id : pickerValueArray[i].id,
					index : i
				});
				pickerData.push(pickerRow);
			};
		} else if (args.id == "SelectSitelist") {
			for (var i = 0; i < pickerValueArray.length; i++) {
				var pickerRow = Ti.UI.createPickerRow({
					title : pickerValueArray[i].branch_name,
					branch_id : pickerValueArray[i].branch_id,
					index : i
				});
				pickerData.push(pickerRow);
			};
		} else if (args.id == "review") {
			for (var i = 0; i < pickerValueArray.length; i++) {
				var pickerRow = Ti.UI.createPickerRow({
					title : pickerValueArray[i].service,
					emp_id : pickerValueArray[i].id,
					type : pickerValueArray[i].type,
					index : i

				});
				pickerData.push(pickerRow);
			};
		} else if (args.id == "request") {
			for (var i = 0; i < pickerValueArray.length; i++) {
				var pickerRow = Ti.UI.createPickerRow({
					title : (lang == "en") ? pickerValueArray[i].RequestDesc_en : pickerValueArray[i].RequestDesc_ar,
					index : i
				});
				pickerData.push(pickerRow);
			};
		} else if (args.id == "reqtypeintroductiontyp") {
			for (var i = 0; i < pickerValueArray.length; i++) {
				var pickerRow = Ti.UI.createPickerRow({
					title : (lang == "en") ? pickerValueArray[i].Desc_en : pickerValueArray[i].Desc_ar,
					index : i
				});
				pickerData.push(pickerRow);
			};
		} else if (args.id == "acedmictyp") {
			for (var i = 0; i < pickerValueArray.length; i++) {
				var pickerRow = Ti.UI.createPickerRow({
					title : (lang == "en") ? pickerValueArray[i].Desc_en : pickerValueArray[i].Desc_ar,
					index : i
				});
				pickerData.push(pickerRow);
			};
		} else if (args.id == "transportlist") {
			for (var i = 0; i < pickerValueArray.length; i++) {
				var pickerRow = Ti.UI.createPickerRow({
					title : (lang == "en") ? pickerValueArray[i].Desc_en : pickerValueArray[i].Desc_ar,
					index : i
				});
				pickerData.push(pickerRow);
			};
		} else if (args.id == "citylist") {
			for (var i = 0; i < pickerValueArray.length; i++) {
				var pickerRow = Ti.UI.createPickerRow({
					title : pickerValueArray[i].CityName,
					code : pickerValueArray[i].CityCode,
					index : i
				});
				pickerData.push(pickerRow);
			};
		} else if (args.id == "fromcitylist") {
			for (var i = 0; i < pickerValueArray.length; i++) {
				var pickerRow = Ti.UI.createPickerRow({
					title : pickerValueArray[i].CityName,
					code : pickerValueArray[i].CityCode,
					index : i
				});
				pickerData.push(pickerRow);
			};
		} else if (args.id == "perchasingcitylist") {
			for (var i = 0; i < pickerValueArray.length; i++) {
				var pickerRow = Ti.UI.createPickerRow({
					title : (lang == "en") ? pickerValueArray[i].City_en : pickerValueArray[i].City_ar,
					index : i

				});
				pickerData.push(pickerRow);
			};
		} else if (args.id == "tickettypelist") {
			for (var i = 0; i < pickerValueArray.length; i++) {
				var pickerRow = Ti.UI.createPickerRow({
					title : (lang == "en") ? pickerValueArray[i].Type_en : pickerValueArray[i].Type_ar,
					index : i

				});
				pickerData.push(pickerRow);
			};
		} else if (args.id == "examlevel") {
			for (var i = 0; i < pickerValueArray.length; i++) {
				var pickerRow = Ti.UI.createPickerRow({
					title : (lang == "en") ? pickerValueArray[i].Level_en : pickerValueArray[i].Level_ar,
					index : i
				});
				pickerData.push(pickerRow);
			};
		} else if (args.id == "examtyp") {
			for (var i = 0; i < pickerValueArray.length; i++) {
				var pickerRow = Ti.UI.createPickerRow({
					title : (lang == "en") ? pickerValueArray[i].ExamType_en : pickerValueArray[i].ExamType_ar,
					index : i
				});
				pickerData.push(pickerRow);
			};
		} else {
			for (var i = 0; i < pickerValueArray.length; i++) {
				var pickerRow = Ti.UI.createPickerRow({
					title : pickerValueArray[i],
					index : i
				});
				pickerData.push(pickerRow);
			};
		}

		// Determine the selected index.
		// if (_.isArray(args.selectedValues) && !_.isEmpty(args.selectedValues)) {
		// selectedIndex = getKeyIndexFromPairs(args.selectedValues);
		// }

		// Create an options dialog.

		//		var cancellang = Alloy.Globals.langConvert("forgotpassword_cancel");

		optionsDialog = Ti.UI.createOptionDialog({
			options : pickerData,

			buttonNames : ["Cancel"],
			selectedIndex : (args.selectedValues) ? args.selectedValues : 0
		});
		optionsDialog.show();
		optionsDialog.addEventListener('click', done);
	} catch(e) {
		Ti.API.info('populateOptionsDialog Error - ');
	}
}

/**
 * Populate the picker with data.
 */
function populatePicker() {
	try {
		var lang = Titanium.App.Properties.getString('locale');
		switch (args.type) {
		case 'single-column':
			// Convert the object into array pairs.
			pickerValueArray = args.pickerValues;
			Ti.API.info("PAIR111 : " + JSON.stringify(pickerValueArray));
			// Iterate over all pairs and add the original
			// value (pair[1]) as a picker row.
			if (args.id == "country") {
				for (var i = 0; i < pickerValueArray.length; i++) {
					var pickerRow = Ti.UI.createPickerRow({
						title : pickerValueArray[i].country_name,
						country_id : pickerValueArray[i].country_id,
						index : i
					});
					pickerData.push(pickerRow);
				};
			} else if (args.id == "state") {
				Ti.API.info('my picker array ' + JSON.stringify(pickerValueArray));
				for (var i = 0; i < pickerValueArray.length; i++) {
					var pickerRow = Ti.UI.createPickerRow({
						title : pickerValueArray[i].state_name,
						state_id : pickerValueArray[i].state_id,

						index : i
					});
					pickerData.push(pickerRow);
				};
			} else if (args.id == "city") {
				for (var i = 0; i < pickerValueArray.length; i++) {
					var pickerRow = Ti.UI.createPickerRow({
						title : pickerValueArray[i].city_name,
						city_id : pickerValueArray[i].city_id,
						index : i
					});
					pickerData.push(pickerRow);
				};
			} else if (args.id == "category") {
				for (var i = 0; i < pickerValueArray.length; i++) {
					var pickerRow = Ti.UI.createPickerRow({
						title : pickerValueArray[i].category_name,
						category_id : pickerValueArray[i].id,
						index : i
					});
					pickerData.push(pickerRow);
				};
			} else if (args.id == "currency") {
				for (var i = 0; i < pickerValueArray.length; i++) {
					var pickerRow = Ti.UI.createPickerRow({
						title : pickerValueArray[i],

						index : i
					});
					pickerData.push(pickerRow);
				};
			} else if (args.id == "subcategory") {
				for (var i = 0; i < pickerValueArray.length; i++) {
					var pickerRow = Ti.UI.createPickerRow({
						title : pickerValueArray[i].subcategory_name,
						category_id : pickerValueArray[i].id,
						index : i
					});
					pickerData.push(pickerRow);
				};
			} else if (args.id == "SelectCompanyList") {
				for (var i = 0; i < pickerValueArray.length; i++) {
					var pickerRow = Ti.UI.createPickerRow({
						title : pickerValueArray[i].company_name,
						id : pickerValueArray[i].id,
						index : i
					});
					pickerData.push(pickerRow);
				};
			} else if (args.id == "SelectSitelist") {
				for (var i = 0; i < pickerValueArray.length; i++) {
					var pickerRow = Ti.UI.createPickerRow({
						title : pickerValueArray[i].branch_name,
						branch_id : pickerValueArray[i].branch_id,
						index : i
					});
					pickerData.push(pickerRow);
				};
			} else if (args.id == "review") {
				for (var i = 0; i < pickerValueArray.length; i++) {
					var pickerRow = Ti.UI.createPickerRow({
						title : pickerValueArray[i].service,
						emp_id : pickerValueArray[i].id,
						type : pickerValueArray[i].type,
						index : i

					});
					pickerData.push(pickerRow);
				};
			} else if (args.id == "Supervisor" || args.id == "Guard") {
				for (var i = 0; i < pickerValueArray.length; i++) {
					var pickerRow = Ti.UI.createPickerRow({
						title : pickerValueArray[i].name,
						emp_id : (args.id == "Supervisor") ? pickerValueArray[i].supervisor_id : pickerValueArray[i].guard_id,
						index : i
					});
					pickerData.push(pickerRow);
				};
			} else if (args.id == "reqtypeintroductiontyp") {
				for (var i = 0; i < pickerValueArray.length; i++) {
					var pickerRow = Ti.UI.createPickerRow({
						title : (lang == "en") ? pickerValueArray[i].Desc_en : pickerValueArray[i].Desc_ar,
						index : i
					});
					pickerData.push(pickerRow);
				};
			} else if (args.id == "acedmictyp") {
				for (var i = 0; i < pickerValueArray.length; i++) {
					var pickerRow = Ti.UI.createPickerRow({
						title : (lang == "en") ? pickerValueArray[i].Desc_en : pickerValueArray[i].Desc_ar,
						index : i
					});
					pickerData.push(pickerRow);
				};
			} else if (args.id == "transportlist") {
				for (var i = 0; i < pickerValueArray.length; i++) {
					var pickerRow = Ti.UI.createPickerRow({
						title : (lang == "en") ? pickerValueArray[i].Desc_en : pickerValueArray[i].Desc_ar,
						index : i
					});
					pickerData.push(pickerRow);
				};
			} else if (args.id == "citylist") {
				for (var i = 0; i < pickerValueArray.length; i++) {
					var pickerRow = Ti.UI.createPickerRow({
						title : pickerValueArray[i].CityName,
						code : pickerValueArray[i].CityCode,
						index : i

					});
					pickerData.push(pickerRow);
				};
			} else if (args.id == "fromcitylist") {
				for (var i = 0; i < pickerValueArray.length; i++) {
					var pickerRow = Ti.UI.createPickerRow({
						title : pickerValueArray[i].CityName,
						code : pickerValueArray[i].CityCode,
						index : i
					});
					pickerData.push(pickerRow);
				};
			} else if (args.id == "perchasingcitylist") {
				for (var i = 0; i < pickerValueArray.length; i++) {
					var pickerRow = Ti.UI.createPickerRow({
						title : (lang == "en") ? pickerValueArray[i].City_en : pickerValueArray[i].City_ar,
						index : i
					});
					pickerData.push(pickerRow);
				};
			} else if (args.id == "tickettypelist") {
				for (var i = 0; i < pickerValueArray.length; i++) {
					var pickerRow = Ti.UI.createPickerRow({
						title : (lang == "en") ? pickerValueArray[i].Type_en : pickerValueArray[i].Type_ar,
						index : i
					});
					pickerData.push(pickerRow);
				};
			} else if (args.id == "examlevel") {
				for (var i = 0; i < pickerValueArray.length; i++) {
					var pickerRow = Ti.UI.createPickerRow({
						title : (lang == "en") ? pickerValueArray[i].Level_en : pickerValueArray[i].Level_ar,
						index : i
					});
					pickerData.push(pickerRow);
				};
			} else if (args.id == "examtyp") {
				for (var i = 0; i < pickerValueArray.length; i++) {
					var pickerRow = Ti.UI.createPickerRow({
						title : (lang == "en") ? pickerValueArray[i].ExamType_en : pickerValueArray[i].ExamType_ar,
						index : i
					});
					pickerData.push(pickerRow);
				};
			} else {
				for (var i = 0; i < pickerValueArray.length; i++) {
					var pickerRow = Ti.UI.createPickerRow({
						title : pickerValueArray[i],
						index : i
					});
					pickerData.push(pickerRow);
				};
			}

			//Ti.API.info("PAIR : " + pair[1]);

			// Add the picker data to the picker.
			picker.add(pickerData);

			// Set the defaults.
			// if (_.isArray(args.selectedValues) && !_.isEmpty(args.selectedValues)) {
			// var rowIndex = getKeyIndexFromPairs(args.selectedValues);

			picker.setSelectedRow(0, args.selectedValues, false);
			// }
			break;

		case 'age-range':
			// Set defaults for age range.
			args.pickerParams = args.pickerParams || {};
			args.pickerParams.min = args.pickerParams.min || 18;
			args.pickerParams.max = args.pickerParams.max || 100;

			var minAge = args.pickerParams.min;
			var maxAge = args.pickerParams.max;

			// Create 2 picker columns.
			var columnParams = {
				width : (OS_ANDROID) ? 100 : undefined
			};
			var pickerColumns = [Ti.UI.createPickerColumn(columnParams), Ti.UI.createPickerColumn(columnParams)];

			// Create an array with all ages.
			var agesArray = _.range(minAge, (maxAge + 1), 1);

			// Fill each column with the full age range.
			_.each(pickerColumns, function(column, index) {
				_.each(agesArray, function(age) {
					pickerColumns[index].addRow(Ti.UI.createPickerRow({
						title : String(age)
					}));
				});
			});

			// Set columns data.
			picker.setColumns(pickerColumns);

			// On iOS, reload columns to ensure they show up correctly.
			if (OS_IOS) {
				_.each(pickerColumns, function(column) {
					picker.reloadColumn(column);
				});
			}

			// Set the defaults.
			// if (_.isArray(args.selectedValues) && !_.isEmpty(args.selectedValues)) {
			// _.each(args.selectedValues, function(value, columnIndex) {
			// var rowIndex = _.indexOf(agesArray, Number(value));
			picker.setSelectedRow(0, args.selectedValues, false);
			// });
			//}
			break;

		case 'date-picker':
			// On Android, the picker type can't bet set after
			// the picker is created.
			// On iOS, the picker type can be set after the picker
			// is created. On iOS 8+, there are intermittent issues
			// if the picker type is set after the picker is created.
			// @see https://github.com/danielhanold/danielhanold.pickerwidget/issues/8
			//
			// To circumvent both issues, set values on creation.
			// See pickerView.js
			break;
		case 'time-picker':
			// On Android, the picker type can't bet set after
			// the picker is created.
			// On iOS, the picker type can be set after the picker
			// is created. On iOS 8+, there are intermittent issues
			// if the picker type is set after the picker is created.
			// @see https://github.com/danielhanold/danielhanold.pickerwidget/issues/8
			//
			// To circumvent both issues, set values on creation.
			// See pickerView.js
			break;
		}
	} catch(e) {
		Ti.API.info('populateOptionsDialog Error - ');
	}
}

/**
 * Get the value from a selected row.
 *
 * @param index
 *   Index for the picker column. Defaults to 0.
 */
function getSelectedRowTitle(index) {
	try {
		index = index || 0;
		if (args.id == "country") {
			var obj = {};
			obj.title = picker.getSelectedRow(index).title;
			obj.country_id = picker.getSelectedRow(index).country_id;
			obj.index = picker.getSelectedRow(index).index;
			// Ti.API.info("Yes "+JSON.stringify(obj));
			return obj;
		} else if (args.id == "state") {
			Ti.API.info('----------------------');
			var obj = {};
			obj.title = picker.getSelectedRow(index).title;
			obj.state_id = picker.getSelectedRow(index).state_id;

			obj.index = picker.getSelectedRow(index).index;
			// Ti.API.info("Yes "+JSON.stringify(obj));
			return obj;
		} else if (args.id == "city") {
			var obj = {};
			obj.title = picker.getSelectedRow(index).title;
			obj.city_id = picker.getSelectedRow(index).city_id;

			obj.index = picker.getSelectedRow(index).index;
			return obj;
		} else if (args.id == "category") {
			var obj = {};
			obj.title = picker.getSelectedRow(index).title;
			obj.category_id = picker.getSelectedRow(index).category_id;
			obj.index = picker.getSelectedRow(index).index;
			return obj;
		} else if (args.id == "currency") {
			var obj = {};
			obj.title = picker.getSelectedRow(index).title;
			obj.index = picker.getSelectedRow(index).index;
			return obj;
		} else if (args.id == "subcategory") {
			var obj = {};
			obj.title = picker.getSelectedRow(index).title;
			obj.category_id = picker.getSelectedRow(index).category_id;
			obj.index = picker.getSelectedRow(index).index;
			return obj;
		} else if (args.id == "SelectCompanyList") {
			var obj = {};
			obj.title = picker.getSelectedRow(index).title;
			obj.id = picker.getSelectedRow(index).id;
			obj.index = picker.getSelectedRow(index).index;
			return obj;
		} else if (args.id == "SelectSitelist") {
			var obj = {};
			obj.title = picker.getSelectedRow(index).title;
			obj.branch_id = picker.getSelectedRow(index).branch_id;
			obj.index = picker.getSelectedRow(index).index;
			return obj;
		} else if (args.id == "review") {
			var obj = {};
			obj.title = picker.getSelectedRow(index).title;
			obj.id = picker.getSelectedRow(index).emp_id;
			obj.index = picker.getSelectedRow(index).index;
			obj.type = picker.getSelectedRow(index).type;
			return obj;
		} else if (args.id == "Supervisor" || args.id == "Guard") {
			var obj = {};
			obj.title = picker.getSelectedRow(index).title;
			obj.id = picker.getSelectedRow(index).emp_id;
			obj.index = picker.getSelectedRow(index).index;
			return obj;
		} else if (args.id == "examtyp") {
			var obj = {};
			obj.title = picker.getSelectedRow(index).title;
			// obj.code = picker.getSelectedRow(index).code;
			obj.index = picker.getSelectedRow(index).index;
			return obj;
		} else if (args.id == "examlevel") {
			var obj = {};
			obj.title = picker.getSelectedRow(index).title;
			// obj.code = picker.getSelectedRow(index).code;
			obj.index = picker.getSelectedRow(index).index;
			return obj;
		} else {
			var obj = {};
			obj.title = picker.getSelectedRow(index).title;
			obj.index = picker.getSelectedRow(index).index;
			return obj;

		}
	} catch(e) {
		Ti.API.info("Error Widget");
	}

}

/**
 * Get index for key from pairs.
 *
 */
function getKeyIndexFromPairs(pairs, key) {
	// pairs = pairs || [];
	// key = key || null;
	// var rowIndex = null;
	//
	// // Determine index.
	// _.each(pairs, function(pair, index) {
	// if (key == pair[0]) {
	// rowIndex = index;
	// return;
	// }
	// });

	return rowIndex;
}

/**
 * Determine the the key of the pair in this array.
 *
 * @param pairs
 *   Array of pairs.
 * @param title
 *   Title that is currently selected.
 */
function getKeyFromPairs(pairs, title) {
	pairs = pairs || [];
	title = title || null;
	var key = null;

	// Determine key.
	_.each(pairs, function(pair) {
		if (title == pair[1]) {
			key = pair[0];
			return;
		}
	});

	return key;
}

/**
 * User clicks done.
 */
function done(e) {
	// Return data.
	try {

		var data = null;

		// Boolean for cancel data.
		var cancel = false;

		switch (args.type) {
		case 'single-column':
			if (OS_IOS) {
				// Determine key and value from actual picker on iOS.
				var value = getSelectedRowTitle(0);
				Ti.API.info('E ' + value);
				var key = getKeyFromPairs(pickerValueArray, value);
				if (args.id == "setting" || args.id == "request" || args.id == "reqtypeintroductiontyp" || args.id == "acedmictyp" || args.id == 'transportlist' || args.id == 'perchasingcitylist' || args.id == 'tickettypelist') {
					var data = value.title;
				} else if (args.id == "request") {
					var data = value.title;
				} else {
					var data = value;
				}

			}

			if (OS_ANDROID) {
				// Set the data from the picker on Android.
				e = e || {};
				e.source = e.source || {};
				e.source.options = e.source.options || [];
				Ti.API.info('option' + JSON.stringify(e.source.options));

				// Determine if the user clicked cancel.
				if (e.button === true) {

					cancel = true;
				} else {
					if (args.id == "country") {
						var obj = {};
						obj.title = e.source.options[e.index].title;
						obj.country_id = e.source.options[e.index].country_id;
						obj.index = e.source.options[e.index].index;
						var data = obj;
					} else if (args.id == "state") {
						var obj = {};
						Ti.API.info('*******************');
						obj.title = e.source.options[e.index].title;
						obj.state_id = e.source.options[e.index].state_id;
						obj.index = e.source.options[e.index].index;
						var data = obj;
					} else if (args.id == "city") {
						var obj = {};
						obj.title = e.source.options[e.index].title;
						obj.city_id = e.source.options[e.index].city_id;
						obj.index = e.source.options[e.index].index;

						var data = obj;
					} else if (args.id == "category") {
						var obj = {};
						obj.title = e.source.options[e.index].title;
						obj.category_id = e.source.options[e.index].category_id;
						obj.index = e.source.options[e.index].index;

						var data = obj;
					} else if (args.id == "currency") {
						var obj = {};
						obj.title = e.source.options[e.index].title;

						obj.index = e.source.options[e.index].index;

						var data = obj;
					} else if (args.id == "subcategory") {
						var obj = {};
						obj.title = e.source.options[e.index].title;
						obj.category_id = e.source.options[e.index].category_id;
						obj.index = e.source.options[e.index].index;

						var data = obj;
					} else if (args.id == "SelectCompanyList") {
						var obj = {};
						obj.title = e.source.options[e.index].title;
						obj.id = e.source.options[e.index].id;
						obj.index = e.source.options[e.index].index;

						var data = obj;
					} else if (args.id == "SelectSitelist") {
						var obj = {};
						obj.title = e.source.options[e.index].title;
						obj.branch_id = e.source.options[e.index].branch_id;
						obj.index = e.source.options[e.index].index;

						var data = obj;
					} else if (args.id == "review") {
						var obj = {};
						obj.title = e.source.options[e.index].title;
						obj.id = e.source.options[e.index].emp_id;
						obj.index = e.source.options[e.index].index;
						obj.type = picker.getSelectedRow(index).type;
						var data = obj;
					} else if (args.id == "Supervisor" || args.id == "Guard") {
						var obj = {};
						obj.title = e.source.options[e.index].title;
						obj.id = e.source.options[e.index].emp_id;
						obj.index = e.source.options[e.index].index;

						var data = obj;
					} else if (args.id == "examtyp") {
						var obj = {};
						obj.title = e.source.options[e.index].title;
						// obj.code = picker.getSelectedRow(index).code;
						obj.index = e.source.options[e.index].index;
						var data = obj;
					} else if (args.id == "examlevel") {
						var obj = {};
						obj.title = e.source.options[e.index].title;
						// obj.code = picker.getSelectedRow(index).code;
						obj.index = e.source.options[e.index].index;
						var data = obj;
					} else {
						var data = e.source.options[e.index].title;
					}

				}
			}
			break;

		case 'age-range':
			// Get the numbers.
			var numberLow = Number(picker.getSelectedRow(0).title);
			var numberHigh = Number(picker.getSelectedRow(1).title);

			// Validation: Ensure high number is higher than low.
			if (numberLow >= numberHigh) {
				var alertDialog = Ti.UI.createAlertDialog({
					title : "RIGBUY",
					message : 'Please pick a valid age range',
					buttonNames : ['Ok']
				}).show();
				return;
			}

			// Validation: If minDifference is set, ensure age
			// difference is large enough.
			if (_.isNumber(args.pickerParams.minDifference)) {
				if ((numberHigh - numberLow) < Number(args.pickerParams.minDifference)) {
					var alertDialog = Ti.UI.createAlertDialog({
						title : "RIGBUY",
						message : 'Ages must be ' + String(args.pickerParams.minDifference) + ' years apart.',
						buttonNames : ['Ok']
					}).show();
					return;
				}
			}

			// If validation is passed, set the numbers.
			data = {
				low : numberLow,
				high : numberHigh
			};
			break;

		case 'date-picker':
			var lang = Titanium.App.Properties.getString('locale');
			// Determine the selected date.
			Ti.API.info('im date picker');
			if (OS_IOS) {
				var selectedDate = picker.getValue();
			}

			data = {
				date : selectedDate.toDateString(),

			};
			break;
		case 'time-picker':
			// Determine the selected date.
			Ti.API.info('im time picker');
			if (OS_IOS) {
				var selectedDate = picker.getValue();
			}

			// @see http://stackoverflow.com/questions/4060004/calculate-age-in-javascript

			// var unixMilliseconds = Math.round(selectedDate.getTime());
			// var unixSeconds = Math.round(selectedDate.getTime() / 1000);
			data = {
				date : selectedDate,
				// age : age,
				// unixMilliseconds : unixMilliseconds,
				// unixSeconds : unixSeconds
			};
			break;

		}

		// Close the view.
		if (args.id == "myDatePicker") {

			close({
				type : args.type,
				data : data,
				//index : (OS_IOS) ? value.index : e.source.selectedIndex,
				cancel : cancel
			});
		} else if (args.id == "myTimePicker") {

			close({
				type : args.type,
				data : data,
				//index : (OS_IOS) ? value.index : e.source.selectedIndex,
				cancel : cancel
			});
		} else {
			close({
				type : args.type,
				data : data,
				index : (OS_IOS) ? value.index : e.source.selectedIndex,
				cancel : cancel
			});
		}

	} catch(e) {
		Ti.API.info("Error on Done");
	}

}

/**
 * Close the window.
 */
function close(_callbackParams) {
	_callbackParams = _callbackParams || {};
	_callbackParams.type = args.type;
	_callbackParams.id = args.id || null;
	_callbackParams.data = _callbackParams.data || null;
	//_callbackParams.index = _callbackParams.index || null;
	_callbackParams.cancel = _callbackParams.cancel || false;

	// If the navbar was supposed to be hidden, show it again.
	if (OS_IOS && args.hideNavBar === true) {
		outerView.showNavBar();
	}

	// Remove elements from views.
	if (androidSpecific === false) {
		outerView.remove(overlay);
		outerView.remove(pickerView);
	}
	// Execute callback function if one is set.
	if (_.isFunction(args.onDone)) {
		args.onDone(_callbackParams);
	}

	// Null out elements.
	overlay = null;
	pickerView = null;
	picker = null;
	optionsDialog = null;
}