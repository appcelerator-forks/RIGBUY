/**
 * Communicator.js
 *
 * This file handles all the complexity related to network communication. It connects to the server and returns the response.
 * It also checks for the internet connection, errors in response and handles them gracefully.
 */

//var Constants = Alloy.Globals.Constants;

/**
 * This is a generic function for performing GET requests
 */
exports.get = function(url, callback) {
	if (Titanium.Network.online) {
		// Create an HTTPClient.
		var httpClient = Ti.Network.createHTTPClient();
		httpClient.setTimeout(40000);

		// Define the callback.
		httpClient.onload = function(e) {
			if (e.success) {
				if (this.status == 200) {
					if (this.responseText != null && this.responseText.trim().length > 0) {
						var result = {};
						result.success = true;
						result.response = this.responseText;
						//Ti.API.info("result.response = " + result.response);
						// Alloy.Globals.Alert("result.response");
						//Ti.API.info(result);
						callback(result);
					} else {
						var result = {};
						result.success = false;
						var MSG_NO_DATA = Alloy.Globals.Constants.MSG_NO_DATA;
						result.message = MSG_NO_DATA;
						callback(result);
					}
				} else {
					var result = {};
					result.success = false;
					var MSG_STATUS_CODE = Alloy.Globals.Constants.MSG_STATUS_CODE;
					result.message = MSG_STATUS_CODE + this.status;
					callback(result);
				}
			} else {
				var result = {};
				result.success = false;
				result.message = e.error;
				callback(result);
			}
		};
		httpClient.onerror = function(e) {
			var result = {};
			result.success = false;
			result.message = e.error;
			callback(result);
		};

		// Send the request data.
		try {
			httpClient.open('GET', url);
			Ti.API.info('URL ' + url);
			httpClient.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			httpClient.send();
		} catch(e) {
			Alloy.Globals.Alert(e.message);
		}

	} else {
		var result = {};
		result.success = false;
		var MSG_NO_NETWORK = Alloy.Globals.Constants.MSG_NO_NETWORK;
		result.message = MSG_NO_NETWORK;
		callback(result);
	}
};

/**
 * This is a generic function for performing POST requests
 */
exports.post = function(url, callback, data) {
	if (Titanium.Network.online) {
		// Create an HTTPClient.
		var httpClient = Ti.Network.createHTTPClient();
		httpClient.setTimeout(40000);

		// Define the callback.
		httpClient.onload = function(e) {

			if (e.success) {
				if (this.status == 200) {
					if (this.responseText != null && this.responseText.trim().length > 0) {

						var result = {};
						result.success = true;
						result.response = this.responseText;
						try {
							var res = JSON.parse(this.responseText);
							if (res.ResponseCode == 2) {
								
							}
						} catch(e) {
							Ti.API.info("Communicator : ");
						}
						callback(result);
					} else {
						var result = {};
						result.success = false;
						var MSG_NO_DATA = Alloy.Globals.Constants.MSG_NO_DATA;
						result.message = MSG_NO_DATA;
						callback(result);
					}
				} else {
					var result = {};
					result.success = false;
					var MSG_STATUS_CODE = Alloy.Globals.Constants.MSG_STATUS_CODE;
					result.message = MSG_STATUS_CODE + this.status;
					callback(result);
				}
			} else {
				var result = {};
				result.success = false;
				result.message = e.error;
				callback(result);
			}
		};
		httpClient.onerror = function(e) {
			var result = {};
			result.success = false;
			result.message = e.error;
			callback(result);
		};

		// Send the request data.
		try {
			Ti.API.info('URL ' + url);
			httpClient.open('POST', url);
			httpClient.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			httpClient.send(data);
		} catch(e) {
			Alloy.Globals.Alert("Network is down. Please try again later");
		}

	} else {
		var result = {};
		result.success = false;
		var MSG_NO_NETWORK = Alloy.Globals.Constants.MSG_NO_NETWORK;
		result.message = MSG_NO_NETWORK;
		callback(result);
	}
};

/*
 * This function only for post the Video or Image in the multi-parts
 */
exports.postProfileImage = function(url, data, ProfileImage, thumbImage, callback) {
	Ti.API.info("DATA : " + JSON.stringify(data));
	//Ti.API.info("ProfileImage : "+ProfileImage);
	//Ti.API.info("thumbImage : "+thumbImage);
	if (Titanium.Network.online) {
		// Create an HTTPClient.
		var httpClient = Ti.Network.createHTTPClient();
		httpClient.setTimeout(40000);

		// Define the callback.
		httpClient.onload = function(e) {
			//Ti.API.info('*****************web service response - timestamp: ' + new Date() + '*********************');
			if (e.success) {
				if (this.status == 200) {

					if (this.responseText != null && this.responseText.trim().length > 0) {
						var result = {};
						result.success = true;
						result.response = this.responseText;
						try {
							var res = JSON.parse(this.responseText);
							if (res.ResponseCode == 2) {
								
							}
						} catch(e) {
							Ti.API.info("Communicator 2: ");
						}
						callback(result);
					} else {
						var result = {};
						result.success = false;
						var MSG_NO_DATA = Alloy.Globals.Constants.MSG_NO_DATA;
						result.message = MSG_NO_DATA;
						callback(result);
					}
				} else {
					var result = {};
					result.success = false;
					var MSG_STATUS_CODE = Alloy.Globals.Constants.MSG_STATUS_CODE;
					result.message = MSG_STATUS_CODE + this.status;
					callback(result);
				}
			} else {
				var result = {};
				result.success = false;
				result.message = e.error;
				callback(result);
			}
		};
		httpClient.onerror = function(e) {
			var result = {};
			result.success = false;
			Ti.API.info('e.error ' + e.error);
			if (e.error == 'HTTP error') {
				result.message = Alloy.Globals.Constants.UNABLE_TO_CONNECT;
			} else {
				result.message = e.error;
			}
			callback(result);
		};

		// Send the request data.
		try {
			httpClient.open('POST', url);

			//Ti.API.info('*****************web service call - timestamp: ' + new Date() + '*********************');

			httpClient.send({
				LoginToken : data.LoginToken,
				Language : data.Language,
				subject_type : data.subject_type,
				subject : data.subject,
				content : data.content,
				user_id : data.user_id,
				type : data.type,
				upload_type : data.upload_type,
				name : data.name,
				subjectType_id : data.subjectType_id,
				show_staff : data.show_staff,
				attachment : ProfileImage,
				thumb_image : thumbImage

			});
		} catch(e) {
			//Alloy.Globals.toast(e.message);
		}

	} else {

		var result = {};
		result.success = false;
		var MSG_NO_NETWORK = Alloy.Globals.Constants.MSG_NO_NETWORK;
		result.message = MSG_NO_NETWORK;
		callback(result);

	}
};
