// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var Communicator = Alloy.Globals.Communicator;
var DOMAIN_URL = Alloy.Globals.Constants.DOMAIN_URL;
var chatInterval = null;

function openFunc(e) {

	if (OS_ANDROID) {

		if (this.getActivity()) {
			// need to explicitly use getXYZ methods
			var actionBar = this.getActivity().getActionBar();

			if (actionBar) {
				// Now we can do stuff to the actionbar
				actionBar.setTitle('Chat');

				actionBar.setDisplayHomeAsUp(true);
				// show an angle bracket next to the home icon,
				// indicating to users that the home icon is tappable

				// toggle the left window when the home icon is selected
				actionBar.setOnHomeIconItemSelected(function() {
					$.Chat.close();
				});
			}
		}
	}
	chatInterval = setInterval(function() {
		getChatHistroyService();
	}, 6000);
}
function closeFunc(){
	if (chatInterval) {
		clearInterval(chatInterval);
		chatInterval = null;
	}
	$.Chat.close();
}
var chatTV;
var homeButtonSize = 50;
var adWindowHeight = 30;
var padding = 0.2;
var titleSize = 14;
var col_title = "black";
var col_back = "#ffD";
var is_android = true;
var titleColor = "#fff";
var deviceWidth = Ti.Platform.displayCaps.platformWidth;
var imageSize = 60;
var descSize = 12;
var card_color = "#333";
var card_opacity = 0.5;
var rowMargin = 10;
var chatBoxTF;
function openChatWindow() {
	var chatContainer;
	if (OS_ANDROID) {
		chatContainer = Ti.UI.createView({
			top : 0,
			bottom : 0,
			left : 0,
			width : '100%',
			touchEnabled : true,
			backgroundColor : 'transparent'
		});
	} else {
		chatContainer = Ti.UI.createScrollView({
			top : 10,
			bottom : 0,
			left : 0,
			width : '100%',
			touchEnabled : true,
			backgroundColor : 'transparent',
			zIndex : 99,
		});
	}

	chatTV = Ti.UI.createScrollView({
		top : 0,
		left : 0,
		bottom : 60,
		right : 0,
		backgroundColor : 'white',
		width : '100%',
		layout : 'vertical',
		scrollType : "vertical"
	});
	chatContainer.add(chatTV);
	var viewTF = Ti.UI.createView({
		bottom : 0,
		left : 10,
		right : 10,
		height : 60,

		zIndex : 99,
	});
	chatContainer.add(viewTF);

	var tfVW = Ti.UI.createView({

		width : '78%',
		left : 0,
		height : homeButtonSize - 10,
		opacity : 0.6,
		backgroundColor : 'white',
		borderColor : "gray",
		paddingLeft : 10,
		borderRadius : (OS_IOS) ? 20 : 25,

	});
	viewTF.add(tfVW);

	chatBoxTF = Ti.UI.createTextField({

		left : 10,
		right : 10,
		height : Ti.UI.FILL,

		hintText : "Type a message",
		hintTextColor : "gray",
		color : "black",
		paddingLeft : 10,
		backgroundColor : 'white',
		font : {
			fontSize : 14
		},
		returnKeyType : Titanium.UI.RETURNKEY_DONE
	});
	tfVW.add(chatBoxTF);

	var sendBtn = Ti.UI.createButton({
		title : 'Send',
		backgroundColor : 'transparent',
		right : 0,
		height : homeButtonSize - 10,
		width : '20%',
		color : titleColor,
		borderRadius : (OS_IOS) ? 20 : 25,
		backgroundColor : "#BE3422",
	});
	viewTF.add(sendBtn);

	viewTF.addEventListener('click', function(e) {
		Ti.API.info("viewTF");
	});

	sendBtn.addEventListener('click', function(e) {
		Ti.API.info("Send button Clicked ");
		if (chatBoxTF.value == '') {
			// chatBoxTF.value = ' ';
			// chatBoxTF.hintText = 'You must enter message';
		}
		if (chatBoxTF.value != null && chatBoxTF.value.trim().length > 0) {

			//var date = new Date();
			//var dateLabel = date.format("mmm d, HH:MM");

			sendMessageService();
			// chatBoxTF.value = '';
		}
	});

	$.Chat.add(chatContainer);

}

openChatWindow();

function addRow(message, userName, date_val, emailId, config) {

	Ti.API.info("email : + " + email + " config : " + config);
	var email;
	userName = (userName == "" || userName == undefined || userName == null) ? "No Name" : userName;
	// if(emailId != null)
	// {
	// email = ((emailId).trim()).toLowerCase();
	// }

	//var md_data = Titanium.Utils.md5HexDigest(email);
	//var gravatarUrl = "http://www.gravatar.com/avatar/" + md_data + "?s=100&r=g&d=404";
	//Ti.API.info("email : + "+ email);

	var row = Ti.UI.createView({

		backgroundColor : "transparent",
		height : Titanium.UI.SIZE,
		touchEnabled : false,
	});
	var cardViewBack = Ti.UI.createView({
		top : 5,
		height : Ti.UI.SIZE,
		width : (config && OS_ANDROID) ? "68%" : "85%",
		borderRadius : 5,
		layout : "vertical"

	});

	if (config) {
		//cardViewBack.left = deviceWidth / 10;
		cardViewBack.right = 10;
		cardViewBack.backgroundColor = "#BE3422";

	} else {
		cardViewBack.left = 10;
		//cardViewBack.right = deviceWidth / 10;
		cardViewBack.backgroundColor = "#E8E8E8";

	}
	row.add(cardViewBack);

	// var profileView = Ti.UI.createView({
	// width : imageSize / 1.4,
	// height : imageSize / 1.4,
	// borderRadius : (imageSize / 1.4) / 2,
	//
	// top : 5,
	// bottom : 5,
	// left : 10,
	// zIndex : 99,
	// backgroundColor : (config) ? "#6d1004" : "#303030",
	// });
	// cardViewBack.add(profileView);

	// var lblFL = Ti.UI.createLabel({
	// text :"A",
	// font : {
	// fontWeight : 'bold',
	// fontSize : descSize * 2
	// },
	// color : '#fff',
	// });
	// profileView.add(lblFL);
	// var cardView = Ti.UI.createView({
	// height : Ti.UI.SIZE,
	// width : "90%",
	// borderRadius : padding / 2,
	// layout : 'vertical',
	// // left : profileView.width+10,
	// left:10
	// });
	// cardViewBack.add(cardView);

	var cardTopView = Ti.UI.createView({
		top : 0,
		height : 5,

	});
	cardViewBack.add(cardTopView);

	var msgLbl = Ti.UI.createLabel({
		top : 0,
		left : 10 * Alloy.Globals.scaleFactor,
		//bottom : padding,
		height : Titanium.UI.SIZE,
		textAlign : 'left',
		text : message,
		font : {
			fontWeight : 'bold',
			fontSize : 13 * Alloy.Globals.scaleFactor
		},
		color : (config) ? 'white' : 'black'
	});
	cardViewBack.add(msgLbl);

	var cardBottomView = Ti.UI.createView({
		top : 0,
		height : 5,
	});
	cardViewBack.add(cardBottomView);

	// adjust the GUI possition
	// if (config) {
	//
	// profileView.right = 5;
	//
	// } else {
	//
	// profileView.left = 5;
	//
	// }

	chatTV.add(row);
	chatTV.scrollToBottom();
}

function getChatHistroyService() {

	if (args.from == "chatList") {
		var obj = {};
		obj.toId = args.data.toId;
		obj.fromId = args.data.fromId;
		obj.itemId = args.data.itemId;
	} else {
		var obj = {};
		obj.toId = args.owner_id;
		obj.fromId = Ti.App.Properties.getString("userid");
		obj.itemId = args.id;
	}
	if (Ti.App.Properties.getString("date")) {
		obj.date = Ti.App.Properties.getString("date");
	} else {
		obj.date = "";
	}

	Ti.API.info('JSON : ' + JSON.stringify(obj));
	if (Ti.Network.online) {
		//Alloy.Globals.LoadingScreen.open();
		Communicator.post("http://rigbuy.com/webservices/index.php?action=chat&actionMethod=chatHistory", getChatHistroyServiceCallback, obj);

	} else {

		Alloy.Globals.Alert("Please check your internet connection and try again.");

	}
};

function getChatHistroyServiceCallback(e) {

	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.chatHistory = ' + JSON.stringify(response));
				if (response.status == "1") {

					for (var i = 0; i < response.result.length; i++) {
						if (Ti.App.Properties.getString("userid") == response.result[i].fromId) {
							addRow(response.result[i].msg, "", "", "", true);
						} else {
							addRow(response.result[i].msg, "", "", "", false);
						}
					};

				} else {
					///Alloy.Globals.Alert("No chat history found, please start new conversation");
				}

			} else {
				//Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_NO_DATA);

			}
		} catch(e) {
			Ti.API.info('Error chatHistory :: ' + e.message);

		}

	} else {
		//Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_STATUS_CODE);

	}
	//	Alloy.Globals.LoadingScreen.close();
}

function sendMessageService() {
	if (args.from == "chatList") {
		var obj = {};
		obj.toId = args.data.toId;
		obj.fromId = args.data.fromId;
		obj.itemId = args.data.itemId;
	} else {
		var obj = {};
		obj.toId = args.owner_id;
		obj.fromId = Ti.App.Properties.getString("userid");
		obj.itemId = args.id;
	}
	obj.msg = chatBoxTF.value;
	Ti.API.info('JSON : ' + JSON.stringify(obj));
	if (Ti.Network.online) {
		Alloy.Globals.LoadingScreen.open();
		Communicator.post("http://rigbuy.com/webservices/index.php?action=chat&actionMethod=saveMsg", sendMessageServiceCallback, obj);

	} else {

		Alloy.Globals.Alert("Please check your internet connection and try again.");

	}
};

function sendMessageServiceCallback(e) {

	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.chatHistory = ' + JSON.stringify(response));
				if (response.status == "1") {
					if (chatBoxTF) {
						addRow(chatBoxTF.value, "", "", "", true);
						chatBoxTF.value = "";
					}

				} else {
					Alloy.Globals.Alert("Please try again");
				}

			} else {
				Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_NO_DATA);

			}
		} catch(e) {
			Ti.API.info('Error chatHistory :: ' + e.message);

		}

	} else {
		Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_STATUS_CODE);

	}
	Alloy.Globals.LoadingScreen.close();
}