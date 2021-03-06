/*
 *GoogleService
 *
 * CommonJS module for Google
 * Uses OAuth2 for authentication/authorization
 *
 * Ayorinde Adesugba
 * SISC
 */

var clientId;
var clientSecret;
var redirectUri;
var responseType = 'code';
var accessType = 'offline';
var scope = 'https://www.googleapis.com/auth/userinfo.email';
//https://developers.google.com/accounts/docs/OAuth2Login
var state;
var devKey;

var ACCESS_TOKEN = null;
var REFRESH_TOKEN = null;
var xhr = null;
var OAUTH_URL = 'https://accounts.google.com/o/oauth2/';
var API_URL = 'https://www.googleapis.com/';
var success_callback = null;
var window = null;

var inSimulator = Ti.Platform.model.indexOf('Simulator') !== -1 || Ti.Platform.model == "x86_64" || Ti.Platform.model == "google_sdk";

var self;

/*
 * Module Initialization
 *
 * Sets @clientId, @clientSecret, @redirectUri and @devKey
 *
 */
function GoogleService(args) {
	self = this;

	clientId = args.clientId;
	clientSecret = args.clientSecret;
	redirectUri = args.redirectUri;
	devKey = args.devKey;

	Ti.API.debug("GoogleService object initialized");
};

/*
 * Getter got Google ACCESS_TOKEN
 */
GoogleService.prototype.accessToken = function() {
	return Ti.App.Properties.getString("GG_ACCESS_TOKEN");
};

/*
 * Google ACCESS_TOKEN in invalidated after a predefined period
 * REFRESH_TOKEN is used to callout to API for new ACCESS_TOKEN
 *
 */
GoogleService.prototype.refreshToken = function(callback) {
	if (REFRESH_TOKEN) {
		var args = {
			call : 'token',
			method : 'POST',
			params : {
				client_id : clientId,
				client_secret : clientSecret,
				refresh_token : REFRESH_TOKEN,
				grant_type : 'refresh_token',
			}
		};

		self.callMethod(args, function(e) {
			Ti.API.info('[refreshToken] ' + JSON.stringify(e));
			if (e.success) {
				Ti.API.info('[refreshToken] ' + JSON.parse(e.data).access_token);
				ACCESS_TOKEN = JSON.parse(e.data).access_token;
				Ti.App.Properties.setString("GG_ACCESS_TOKEN", ACCESS_TOKEN);
				callback({
					success : true,
					token : ACCESS_TOKEN
				});
			} else {
				Ti.API.error('Error getting tokens');
				callback({
					success : false,
					token : null
				});
			}
		}, true);
	} else {
		return null;
	}
};

GoogleService.prototype.logout = function() {
	Ti.App.Properties.setString("GG_ACCESS_TOKEN", null);
	Ti.App.Properties.setString("GG_REFRESH_TOKEN", null);
};

/*
 * OAuth2 Login
 *
 * Displays Google login page
 */
GoogleService.prototype.login = function(authSuccess_callback) {
	ACCESS_TOKEN = Ti.App.Properties.getString("GG_ACCESS_TOKEN");
	REFRESH_TOKEN = Ti.App.Properties.getString("GG_REFRESH_TOKEN");
	Ti.API.info("GoogleService login " + ACCESS_TOKEN);

	// if the property is save then user is logged in already... move on
	if (ACCESS_TOKEN !== null) {
		ACCESS_TOKEN = Ti.App.Properties.getString("GG_ACCESS_TOKEN");
		success_callback = authSuccess_callback;
		authSuccess_callback(true);
		return;
	} else {
		if (authSuccess_callback !== undefined) {
			success_callback = authSuccess_callback;
		}
		var url = String.format(OAUTH_URL + 'auth?client_id=%s&redirect_uri=%s&scope=%s&response_type=%s&access_type=%s', clientId, redirectUri, scope, responseType, accessType);
		showAuthorizeUI(url);
	}
	return;
};

/** ------------------------------------------------------------------------------
 *
 * ------------------------------------------------------------------------------ */
GoogleService.prototype.callMethod = function(args, callback, getToken) {

	var params = args.params;
	var method = args.method;
	var call = args.call;

	var paramsString = "";
	try {
		// if (!xhr){
		xhr = Titanium.Network.createHTTPClient();
		// }

		if (params && method === "GET") {
			for (var a in params) {
				paramsString += '&' + Titanium.Network.encodeURIComponent(a) + '=' + Titanium.Network.encodeURIComponent(params[a]);
			}
			Ti.API.info(call);
			var url = API_URL + "oauth2/v1/" + call + "?access_token=" + ACCESS_TOKEN + '&alt=json';
			Ti.API.info('URLA ' + url);
			xhr.open("GET", url);
		} else if (method === "POST") {
			if (getToken) {
				Ti.API.info("--------URL-------" + OAUTH_URL + call);
				xhr.open("POST", OAUTH_URL + call);
			} else {
				Ti.API.info("--------URL-------" + (API_URL + call + "?alt=json&v=2&access_token=" + ACCESS_TOKEN + '&key=' + devKey));
				xhr.open("POST", API_URL + call + "?alt=json&v=2&access_token=" + ACCESS_TOKEN + '&key=' + devKey);
			}
		}

		xhr.onerror = function(e) {
			Ti.API.error("GoogleService ERROR " + e.error);
			Ti.API.error("GoogleService ERROR " + this.status);
			if (callback) {
				callback({
					error : e,
					success : false
				});
			}
		};

		xhr.onload = function(_xhr) {
			if (callback) {
				callback({
					error : null,
					success : true,
					data : xhr.responseText,

				});
			}
		};
		if (method === "POST") {
			xhr.send(params);
		} else {
			xhr.send();
		}
	} catch(err) {
		Titanium.UI.createAlertDialog({
			title : "Error",
			message : String(err),
			buttonNames : ['OK']
		}).show();
	}
};

/*
 * Display login UI
 */

function showAuthorizeUI(pUrl) {
	window = Ti.UI.createWindow({
		modal : true,
		//fullscreen : true,
		theme : (OS_ANDROID) ? "Theme.Titanium" : "",
		width : '100%',
		backgroundColor : "white"
	});

	// var topBar = createTopBar();
	// topBar.children[0].text = 'GOOGLE';
	//
	// window.add(topBar);
	// var homeBtn = createHomeButton();
	// topBar.add(homeBtn);
	//
	// homeBtn.addEventListener('click', function() {
	// setView(VIDEOLIST_VIEW);
	// });

	closeLabel = Ti.UI.createButton({
	//	backgroundColor :  (OS_IOS) ? "transparent" : "#2941AE",

		image :"/images/cancle.png",
		backgroundImage : "none" ,
		width : "50dp",
		//borderRadius : 20,
		height : "40dp",
		top : (OS_IOS) ? 20 : 5,
		right : 10

	});

	webView = Ti.UI.createWebView({
		top : 60,
		width : '100%',
		url : pUrl,
		autoDetect : [Ti.UI.AUTODETECT_NONE]
	});
	webView.addEventListener('beforeload', function(e) {
		Ti.API.info('Preload: ' + e.url + ' : ' + e.url.indexOf(redirectUri));
		if (e.url.indexOf('http://localhost/?') === 0) {
			webView.stopLoading();
			authorizeUICallback(e);
		} else if (e.url.indexOf('https://accounts.google.com/Logout') !== -1) {
			authorizeUICallback(e);
		}
	});

	webView.addEventListener('load', function(e) {
		Ti.API.info('Load: ' + e.url + ' : ' + e.url.indexOf(redirectUri));
		if (e.url.indexOf('approval') !== -1) {
			authorizeUICallback(e);
		}
	});
	//webView.addEventListener('error', authorizeUICallback);

	closeLabel.addEventListener('click', destroyAuthorizeUI);
	window.add(closeLabel);

	window.add(webView);

	window.open();

};

/*
 * unloads the UI used to have the user authorize the application
 */
function destroyAuthorizeUI() {

	// if the window doesn't exist, exit
	if (window == null) {
		return;
	}

	// remove the UI
	try {
		webView.removeEventListener('load', authorizeUICallback);
		window.remove(webView);
		webView = null;
		window.hide();
		window.close();
	} catch(ex) {
		Ti.API.error('Cannot destroy the authorize UI. Ignoring.');
	}
};

/*
 * Gets the temporary token for OAuth2
 */
function getTokens(tempToken, callback) {
	var args = {
		call : 'token',
		method : 'POST',
		params : {
			client_id : clientId,
			client_secret : clientSecret,
			redirect_uri : redirectUri,
			grant_type : 'authorization_code',
			code : tempToken
		}
	};

	self.callMethod(args, function(e) {
		Ti.API.info('google++' + e);
		if (e.success) {
			callback(e.data);
		} else {
			Ti.API.error('Error getting tokens');
		}
	}, true);

}

/** ------------------------------------------------------------------------------
 * fires event when login fails
 * app:google_access_denied
 *
 * fires event when login successful
 * app:google_token
 *
 * executes callback if specified when creating object
 * ------------------------------------------------------------------------------ */
function authorizeUICallback(e) {
	try {

		Ti.API.info('authorizeUILoaded ' + e.type);
		var status;
		var tokenReturned = false;

		if (e.url.indexOf('http://localhost/?') === 0) {
			Ti.API.info(e.url);
			var token = e.url.split("=")[1];
			tokenReturned = true;
			Ti.API.info('Temp Token: ' + token);
		} else if (e.url.indexOf('approval') !== -1) {
			Ti.API.info(e.url);
			//Extract code from title
			var title = webView.evalJS("document.title");
			var token = title.split("=")[1];
			tokenReturned = true;
			Ti.API.info('Temp Token: ' + token);
		} else if (e.url.indexOf('https://accounts.google.com/Logout') === 0) {
			Ti.App.fireEvent('app:google_logout', {});
			destroyAuthorizeUI();
			Ti.App.Properties.setString("GG_ACCESS_TOKEN", null);
			Ti.App.Properties.setString("GG_REFRESH_TOKEN", null);
			success_callback(false);
		}

		if (tokenReturned) {
			if (token === "access_denied") {
				Ti.App.fireEvent('app:google_access_denied', {});
				status = false;
				Ti.App.Properties.setString("GG_ACCESS_TOKEN", null);
				Ti.App.Properties.setString("GG_REFRESH_TOKEN", null);
				if (success_callback != undefined) {
					success_callback(status);
				}
			} else {
				getTokens(token, function(e) {
					var res = JSON.parse(e);
					Ti.API.debug(res);
					Ti.API.debug('Setting ACCESS_TOKEN: ' + res.access_token);
					Ti.API.debug('Setting REFRESH_TOKEN: ' + res.refresh_token);
					ACCESS_TOKEN = res.access_token;
					REFRESH_TOKEN = res.refresh_token;
					status = true;
					Ti.App.Properties.setString("GG_ACCESS_TOKEN", ACCESS_TOKEN);
					Ti.App.Properties.setString("GG_REFRESH_TOKEN", REFRESH_TOKEN);
					Ti.App.fireEvent('app:google_token', {
						access_token : ACCESS_TOKEN,
						refresh_token : REFRESH_TOKEN
					});
					if (success_callback != undefined) {
						success_callback(status);
					}
				});
			}

			destroyAuthorizeUI();
		}
	} catch(e) {
		Ti.API.info('Google Error .js ' + e.error);
	}
};

exports.GoogleService = GoogleService;

// GOOGLE.Apple=function(){
// destroyAuthorizeUI();
// }
